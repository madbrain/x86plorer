module Encode exposing (encode, encodeMode, encodeScale, EncodingElement(..), Mode(..))

import X86
import Parser
import Syntax exposing(..)

type Mode = REG | MEMORY | MEMORY_DISP8 | MEMORY_DISP32

type EncodingElement
    = Prefix Int
    | Opcode Int
    | OpcodeAndReg (Int, Int)
    | Immediat (X86.Size, Int)
    | ModRM (Mode, Int, Int)
    | Sib (Int, Int , Int)
    | Disp8 Int
    | Disp32 Int

type alias EncodingContext = { elements: List EncodingElement, reg: Maybe Int, rm: Maybe MemoryContext, is32Bits: Bool }
type alias MemoryContext = { isReg: Bool, base: Maybe Int, index: Maybe (Int, Int), disp: Maybe Int }

encode: Bool -> X86.Instr -> List AstOperand -> Maybe (List EncodingElement)
encode is32Bits (X86.Instr (opcodes,_,templates)) operands =
    if (List.length templates) == (List.length operands) then
        Just (encodeInstr is32Bits opcodes templates operands)
    else
        Nothing

encodeInstr: Bool -> List X86.Opcode -> List X86.Operand -> List AstOperand -> List EncodingElement
encodeInstr is32Bits opcodes operandDefs operands =
    let
        context = { elements = [], reg = Nothing, rm = Nothing, is32Bits = is32Bits }
    in
        encodeOpcodes (List.map2 (\tpl op -> (tpl, op)) operandDefs operands) opcodes context

encodeOpcodes: List (X86.Operand, AstOperand) -> List X86.Opcode -> EncodingContext -> List EncodingElement
encodeOpcodes operands opcodes context =
    case opcodes of
        [] -> List.reverse (encodeOperands context operands).elements
        opcode :: tailOpcodes -> encodeOpcodes operands tailOpcodes (encodeOpcode operands opcode context)

encodeOpcode: List (X86.Operand, AstOperand) -> X86.Opcode -> EncodingContext -> EncodingContext
encodeOpcode operands opcode context =
    case opcode of
        X86.O value -> { context | elements = (Opcode value) :: context.elements }
        X86.O_R value -> { context | elements = (OpcodeAndReg (value, extractRegister operands)) :: context.elements }
        X86.E value -> { context | reg = Just value }
        _ -> context

encodeOperands: EncodingContext -> List (X86.Operand, AstOperand) -> EncodingContext
encodeOperands input operands =
    case operands of
        [] -> input
        (tpl, op) :: tail -> encodeOperands (encodeOperand input tpl op) tail

encodeOperand: EncodingContext -> X86.Operand -> AstOperand -> EncodingContext
encodeOperand context operandDef operand =
    case (operandDef, operand) of
        (X86.RM size, AstEffectiveAddress memory) -> addMemoryTo context (extractMemory memory)
        (X86.RM size, AstRegister reg) ->
            addMemoryTo context { isReg = True, base = Just (encodeReg reg), index = Nothing, disp = Nothing }
        (X86.R size,  AstRegister reg) ->
            case (context.rm, encodeReg reg) of
                (Just rm, r) -> encodeCompleteOperands r rm context
                (_, r) -> { context | reg = Just r }
        (X86.I size,  AstImmediat value) ->
            encodeReq (Immediat (getSize size context.is32Bits, value)) context {- TODO add prefix -}
        _ -> context

getSize: X86.Size -> Bool -> X86.Size
getSize size is32Bits =
    case size of
        X86.S_8  -> X86.S_8
        X86.S_16 -> X86.S_16
        X86.S_32 -> X86.S_32
        X86.S_16_32 -> if is32Bits then X86.S_32 else X86.S_16

extractMemory: MemoryOperand -> MemoryContext
extractMemory memory =
    let
        mi = Maybe.map (\(reg, scale) -> (encodeReg reg, scale)) memory.index
        mb = Maybe.map encodeReg memory.base
    in
        if memory.displacement == 0 then
            { isReg = False, base = mb, index = mi, disp = Nothing }
        else
            { isReg = False, base = mb, index = mi, disp = Just memory.displacement }

addMemoryTo: EncodingContext -> MemoryContext -> EncodingContext
addMemoryTo context memory =
    case context.reg of
        Just reg -> encodeCompleteOperands reg memory context
        Nothing -> { context | rm = Just memory }


encodeCompleteOperands: Int -> MemoryContext -> EncodingContext -> EncodingContext
encodeCompleteOperands reg rm context =
    case (rm.isReg, rm.base, rm.index) of
        (True, Just base, _) ->
            { context | elements = (ModRM (REG, reg, base)) :: context.elements }
        (_, Just base, Nothing) ->
            let
                (mode, disp) = makeDisp rm.disp
            in
                context
                    |> encodeReq (ModRM (mode, reg, base))
                    |> encodeOpt disp
        (_, Just base, Just (index, scale)) ->
            let
                (mode, disp) = makeDisp rm.disp
            in
                context
                    |> encodeReq (ModRM (mode, reg, encodeReg "ESP"))
                    |> encodeReq (Sib(base, index, scale))
                    |> encodeOpt disp
        (_, Nothing, Just (index, scale)) ->
            let
                (mode, disp) = makeDisp rm.disp
            in
                context
                    |> encodeReq (ModRM (MEMORY, reg, encodeReg "ESP"))
                    |> encodeReq (Sib(encodeReg("EBP"), index, scale))
                    |> encodeReq (rm.disp |> Maybe.withDefault 0 |> Disp32)
        _ -> context

extractRegister: List (X86.Operand, AstOperand) -> Int
extractRegister operands =
    case operands of
        [] -> 0
        (X86.R size, AstRegister name) :: _ -> encodeReg name
        _ :: tail -> extractRegister tail

encodeReg: String -> Int
encodeReg r =
    case String.toUpper r of
        "EAX" -> 0
        "ECX" -> 1
        "EDX" -> 2
        "EBX" -> 3
        "ESP" -> 4
        "EBP" -> 5
        "ESI" -> 6
        "EDI" -> 7
        _ -> 0

makeDisp: Maybe Int -> (Mode, Maybe EncodingElement)
makeDisp disp =
    case disp of
        Just value ->
            if -128 < value && value < 127 then
                (MEMORY_DISP8, Disp8 value |> Just)
            else
                (MEMORY_DISP32, Disp32 value |> Just)
        _ -> (MEMORY, Nothing)

encodeReq: EncodingElement -> EncodingContext -> EncodingContext
encodeReq element context = { context | elements = element :: context.elements }

encodeOpt: Maybe EncodingElement -> EncodingContext -> EncodingContext
encodeOpt elementOpt context =
    case elementOpt of
        Just element -> { context | elements = element :: context.elements }
        Nothing -> context

encodeScale: Int -> Int
encodeScale scale =
    case scale of
        1 -> 0
        2 -> 1
        4 -> 2
        _ -> 3 -- Error

encodeMode: Mode -> Int
encodeMode mode =
    case mode of
        MEMORY -> 0
        MEMORY_DISP8 -> 1
        MEMORY_DISP32 -> 2
        REG -> 3