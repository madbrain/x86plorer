module Decode exposing (decode)

import Hex
import Array
import Dict
import Bitwise

import X86
import Encode
import Parser
import Syntax exposing(..)
import Utils

type alias PendingOpcodes = { opcodes: List X86.Opcode, instr: X86.Instr }

type DecoderNode
    = MatchOpcodeNode (List (Int, DecoderNode))
    | NextOpcode DecoderNode
    | ExtractReg DecoderNode
    | MatchRegNode (List (Int, DecoderNode))
    | ExtractModRM DecoderNode
    | InstructionNode X86.Instr
    | PrefixNode
    | UnknownNode

decoderRoot = X86.instructions
    |> List.map createPending
    |> List.concatMap extractOpcodes
    |> buildMatchOpcode

createPending: X86.Instr -> PendingOpcodes
createPending instr =
    case instr of
        X86.Instr(opcodes, _, _) -> { opcodes = opcodes, instr = instr }

buildMatchOpcode: List (Int, PendingOpcodes) -> DecoderNode
buildMatchOpcode pendings =
    let
        groups = Utils.groupBy Tuple.first pendings
                |> Dict.toList
                |> List.map (\(i,l) -> (i, List.map Tuple.second l))
    in
        groups |> List.map (\(value, p) -> (value, p |> processGroup)) |> MatchOpcodeNode

processGroup: List PendingOpcodes -> DecoderNode
processGroup group = case group of
    pending::[] -> processOpcodes pending |> Maybe.withDefault UnknownNode
    _ ->
        let
            next = List.map advance group
        in
            if hasAllOpcodes next then
                NextOpcode (List.concatMap extractOpcodes next |> buildMatchOpcode)
            else
                NextOpcode (ExtractModRM (MatchRegNode (List.concatMap extractExtensions next)))

advance pending =
    case pending.opcodes of
        x::tail -> { pending | opcodes = tail }
        _ -> pending

processOpcodes: PendingOpcodes -> Maybe DecoderNode
processOpcodes pending =
    case pending.opcodes of
        [] -> InstructionNode pending.instr |> Just
        X86.O value :: tail -> processGroup [ { pending | opcodes = tail} ] |> NextOpcode |> Just
        X86.O_R value :: tail -> processGroup [ { pending | opcodes = tail} ] |> ExtractReg |> Just
        X86.E value :: tail -> ExtractModRM (MatchRegNode [ (value, processGroup [{ pending | opcodes = tail} ]) ]) |> Just
        X86.MODRM :: tail -> ExtractModRM (processGroup [ { pending | opcodes = tail} ]) |> Just

hasAllOpcodes: List PendingOpcodes -> Bool
hasAllOpcodes pendings =
    let
        matchOne pending = case pending.opcodes of
            X86.O _ :: _ -> True
            _ -> False
    in
        List.all matchOne pendings

extractOpcodes: PendingOpcodes -> List (Int, PendingOpcodes)
extractOpcodes pending =
    case pending.opcodes of
        X86.O value :: _ -> [ (value, pending) ]
        X86.O_R value :: _ -> Array.initialize 8 (\i -> (Bitwise.or value i, pending)) |> Array.toList
        _ -> []

extractExtensions: PendingOpcodes -> List (Int, DecoderNode)
extractExtensions pending =
    case pending.opcodes of
        X86.E value :: _ -> [ (value, advance pending |> processOpcodes |> Maybe.withDefault UnknownNode) ]
        _ -> []

type alias DecodeContext = { bytes: List Int, length: Int, error: String, node: DecoderNode,
    pc: Int, is32Bits: Bool,
    reg: Maybe Int, mode: Maybe Encode.Mode, rm: Maybe Int,
    instr: Maybe X86.Instr, elements: List Encode.EncodingElement, operands: List AstOperand }

decode: Bool -> String -> (String, List (String, Maybe (List Encode.EncodingElement)))
decode is32Bits content =
    let
        bytes = toBytes content
        context = decodeFromContext { bytes = bytes, length = List.length bytes, error = "", node = decoderRoot, pc = 0x8000093, is32Bits = is32Bits,
                reg = Nothing, mode = Nothing, rm = Nothing, instr = Nothing, elements = [], operands = [] }
    in
        ({-Debug.toString context-} context.error, context.instr |> Maybe.map (\i -> [ (intructionName i context.operands, List.reverse context.elements |> Just) ]) |> Maybe.withDefault [])

intructionName: X86.Instr -> List AstOperand -> String
intructionName instr operands =
    let
        name = case instr of X86.Instr(_, n, _) -> n
    in
        (AstInstr (name, operands |> List.reverse) |> Syntax.toString) ++ "  (" ++ X86.instrToString instr ++ ")"

decodeFromContext: DecodeContext -> DecodeContext
decodeFromContext context =
    case (context.node, context.bytes) of
        (MatchOpcodeNode nodes, op::tail) -> nodes
            |> List.filter (\(v,n) -> v == op)
            |> List.head
            |> Maybe.map (\(v, n) -> decodeFromContext { context | node = n })
            |> Maybe.withDefault { context | error = "Unknown" }
        (NextOpcode n, x::tail) -> decodeFromContext { context | node = n, bytes = tail, elements = (Encode.Opcode x)::context.elements }
        (ExtractReg n, x::tail) -> { context | node = n, bytes = tail } |> extractReg x |> decodeFromContext
        (ExtractModRM n, x::tail) -> { context | node = n, bytes = tail } |> extractModRM x |> decodeFromContext
        (MatchRegNode l, _) -> l
            |> List.filter (\(v,n) -> v == (context.reg |> Maybe.withDefault -1))
            |> List.head
            |> Maybe.map (\(v, n) -> decodeFromContext { context | node = n })
            |> Maybe.withDefault { context | error = "Unknown" }
        (InstructionNode instr, _) -> decodeOperands instr context
        (PrefixNode, _) -> { context | error = "PREFIX not handled" }
        (UnknownNode, _) -> { context | error = Debug.toString decoderRoot }
        _ -> { context | error = "Not enough bytes" }

extractReg: Int -> DecodeContext -> DecodeContext 
extractReg x context =
    let
        opcode = Bitwise.shiftRightZfBy 3 x |> Bitwise.and 0x1F
        reg = Bitwise.and 0x07 x
    in
        { context | reg = reg |> Just, elements = (Encode.OpcodeAndReg (opcode, reg)) :: context.elements }

extractModRM x context =
    let
        mode = Bitwise.shiftRightZfBy 6 x |> Bitwise.and 0x3 |> decodeMode
        reg = Bitwise.shiftRightZfBy 3 x |> Bitwise.and 0x7
        rm =  Bitwise.and 0x7 x
    in
        { context |
            mode = mode |> Just,
            reg = reg |> Just,
            rm =  rm |> Just,
            elements = (Encode.ModRM (mode, reg, rm)) :: context.elements }

decodeMode: Int -> Encode.Mode
decodeMode mode =
    case mode of
        0 -> Encode.MEMORY
        1 -> Encode.MEMORY_DISP8
        2 -> Encode.MEMORY_DISP32
        _ -> Encode.REG

decodeOperands: X86.Instr -> DecodeContext -> DecodeContext
decodeOperands instr context =
    let
        operands = case instr of X86.Instr (_, _, ops) -> ops
    in
        List.foldl decodeOperand { context | instr = Just instr } operands

decodeOperand: X86.Operand -> DecodeContext -> DecodeContext
decodeOperand operand context =
    case operand of
        X86.R size -> decodeReg size context
        X86.RM size -> decodeRM size context
        X86.I size -> decodeImm size context
        X86.REL size -> decodeRel size context
        X86.Register (size, r) -> decodeFixedRegister size r context
        _ -> { context | error = context.error ++ " >> " ++ Debug.toString operand}

decodeReg: X86.Size -> DecodeContext -> DecodeContext
decodeReg size context =
    let
        operand = decodeRegName (getContextSize size context) (context.reg |> Maybe.withDefault 0) |> AstRegister
    in
        { context | operands = operand :: context.operands }

getContextSize: X86.Size -> DecodeContext -> X86.Size
getContextSize size context =
    if size == X86.S_16_32 then
        if context.is32Bits then
            X86.S_32
        else
            X86.S_16
    else
        size

decodeRM: X86.Size -> DecodeContext -> DecodeContext
decodeRM size context =
    let
        (operand, newContext) = case context.mode of
            Just Encode.REG -> (decodeRegName (getContextSize size context) (context.rm |> Maybe.withDefault 0) |> AstRegister, context)
            Just Encode.MEMORY ->
                case context.rm of
                    Just 4 -> (AstRegister "SIB no displacement", context)
                    Just 5 -> 
                        let
                            s = getContextSize size context
                            (v, nc) = if context.is32Bits then getLong context else getWord context
                            value = v |> Maybe.withDefault 0
                        in
                            (AstEffectiveAddress { size = s, base = Nothing, index = Nothing, displacement = value },
                                { nc | elements = (Encode.Immediat (s, value)) :: context.elements })
                    Just rm -> (AstEffectiveAddress { size = size, base = decodeRegName (getContextSize size context) rm |> Just, index = Nothing, displacement = 0 }, context)
                    Nothing -> (AstRegister "expecting modrm", context)
            _ -> (AstRegister "mode error", context)
    in
        { newContext | operands = operand :: newContext.operands }

decodeRel: X86.Size -> DecodeContext -> DecodeContext
decodeRel size context =
    let
        (value, newContext) = case size of
            X86.S_8 -> getByte context
            X86.S_16 -> getWord context
            X86.S_32 -> getLong context
            X86.S_16_32 -> if context.is32Bits then getLong context else getWord context
    in
        case value of
            Just v ->
                let
                    newPc = newContext.pc + v + (newContext.length - (List.length newContext.bytes))
                in
                    { newContext | operands = (AstImmediat newPc) :: newContext.operands, elements = (Encode.Immediat (size, v)) :: context.elements }
            _ -> newContext
        

decodeRegName: X86.Size -> Int -> String
decodeRegName size r =
    case size of
        X86.S_8 ->
            case r of
                0 -> "AL"
                1 -> "CL"
                2 -> "DL"
                3 -> "CL"
                4 -> "AH"
                5 -> "CH"
                6 -> "DH"
                _ -> "CH"
        X86.S_16 ->
            case r of
                0 -> "AX"
                1 -> "CX"
                2 -> "DX"
                3 -> "BX"
                4 -> "SP"
                5 -> "BP"
                6 -> "SI"
                _ -> "DI"
        X86.S_32 ->
            case r of
                0 -> "EAX"
                1 -> "ECX"
                2 -> "EDX"
                3 -> "EBX"
                4 -> "ESP"
                5 -> "EBP"
                6 -> "ESI"
                _ -> "EDI"
        _ -> "RR"

decodeFixedRegister: X86.Size -> X86.Register -> DecodeContext -> DecodeContext
decodeFixedRegister size reg context =
    { context | operands = (X86.regName (getContextSize size context) reg |> AstRegister) :: context.operands }

decodeImm: X86.Size -> DecodeContext -> DecodeContext
decodeImm size context =
    let
        s = getContextSize size context
        (value, newContext) = case s of
            X86.S_8 -> getByte context
            X86.S_16 -> getWord context
            _ -> getLong context
    in
        case value of
            Just v -> { newContext | operands = (AstImmediat v) :: context.operands, elements = (Encode.Immediat (s, v)) :: context.elements }
            _ -> newContext

getByte: DecodeContext -> (Maybe Int, DecodeContext)
getByte context =
    case context.bytes of
        x::tail -> (Just x, { context | bytes = tail })
        _ -> (Nothing, { context | error = "Not enough bytes" })

getWord: DecodeContext -> (Maybe Int, DecodeContext)
getWord context =
    case context.bytes of
        x::y::tail -> (Just (Bitwise.shiftLeftBy 8 x |> Bitwise.or y), { context | bytes = tail })
        _ -> (Nothing, { context | error = "Not enough bytes" })

getLong: DecodeContext -> (Maybe Int, DecodeContext)
getLong context =
    let
        number l = List.foldl (\a s -> Bitwise.shiftLeftBy 8 s |> Bitwise.or a) 0 l
    in
        case context.bytes of
            x::y::z::w::tail -> (Just (number [w, z, y, x]), { context | bytes = tail })
            _ -> (Nothing, { context | error = "Not enough bytes" })

{- Process decode inputs -}

toBytes: String -> List Int
toBytes content =
    String.toList content
        |> List.map Char.toLower
        |> List.filter Char.isHexDigit
        |> split []
        |> List.reverse

split: List Int -> List Char -> List Int
split result chars =
    let
        concatIfOK value =
            case Hex.fromString value of
                Ok x -> x :: result
                Err str -> result
    in
        case chars of
            a :: b :: tail -> split (concatIfOK (String.fromList [a, b])) tail
            a :: [] -> concatIfOK (String.fromChar a)
            _ -> result
