module Search exposing (..)

import Parser
import Syntax exposing (..)
import X86
import Encode
import Dict
import Bitwise

search: AstInstr -> Bool -> List (String, Maybe (List Encode.EncodingElement))
search (AstInstr (name, operands)) is32Bits =
    let
        compare = if (List.length operands) > 0 then (==) else String.startsWith
        keys = List.filter (compare (String.toUpper name)) (Dict.keys X86.instructionsByName)
        instrDefs = List.concatMap (\a -> case Dict.get a X86.instructionsByName of
                Just value -> filterByOperands operands value
                _ -> []
            ) keys
    in
        List.map (\i -> (X86.instrToString i, Encode.encode is32Bits i operands)) instrDefs

filterByOperands: List AstOperand -> List X86.Instr -> List X86.Instr
filterByOperands operands instrs =
    List.filter (\(X86.Instr (_,_,templates)) -> matchOperands operands templates) instrs

matchOperands: List AstOperand -> List X86.Operand -> Bool
matchOperands operands templates =
    case (operands, templates) of
        (operand :: operandsTail, tpl :: templatesTail) -> (matchOperand operand tpl) && (matchOperands operandsTail templatesTail)
        ([], _) -> True
        _ -> False

matchOperand: AstOperand -> X86.Operand -> Bool
matchOperand op tpl =
    case op of
        AstRegister name -> matchReg (String.toUpper name) tpl
        AstImmediat value -> matchImm value tpl
        AstEffectiveAddress ea -> matchMemory ea tpl

matchReg: String -> X86.Operand -> Bool
matchReg reg tpl =
    case (regSize reg, tpl) of
        (Nothing, _) -> True
        (Just size, X86.Register (s, r)) -> matchRegName reg s r
        (Just size, X86.R s) -> matchSize s size
        (Just size, X86.RM s) -> matchSize s size
        _ -> False

matchRegName: String -> X86.Size -> X86.Register -> Bool
matchRegName reg size r =
    let
        regs = if size == X86.S_16_32 then [ X86.S_16, X86.S_32 ] else [ size ]
    in
        List.map (\s -> X86.regName s r) regs |> List.any (String.startsWith reg)

matchSize: X86.Size -> X86.Size -> Bool
matchSize s size =
    case size of
        X86.S_32 -> s == X86.S_32 || s == X86.S_16_32
        X86.S_16 -> s == X86.S_16 || s == X86.S_16_32
        X86.S_8  -> s == X86.S_8
        _ -> False

matchImm: Int -> X86.Operand -> Bool
matchImm value tpl =
    case (value, tpl) of
        (v, X86.I size) -> size == X86.S_32 || size == X86.S_16_32 || v < (Bitwise.shiftLeftBy (getSize size) 1)
        _ -> False

getSize: X86.Size -> Int
getSize size =
    case size of
        X86.S_8 -> 8
        X86.S_16 -> 16
        X86.S_32 -> 32
        X86.S_16_32 -> 32

matchMemory: MemoryOperand -> X86.Operand -> Bool
matchMemory memory tpl =
    case tpl of
        X86.RM size -> matchSize size memory.size
        _ -> False

regSize: String -> Maybe X86.Size
regSize reg =
    if String.startsWith "E" reg then
        Just X86.S_32
    else if String.endsWith "X" reg then
        Just X86.S_16
    else if String.endsWith "H" reg || String.endsWith "L" reg then
        Just X86.S_8
    else
        Nothing