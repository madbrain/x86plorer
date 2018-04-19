module Search exposing (..)

import Parser
import X86
import Encode
import Dict
import Bitwise

search: Maybe Parser.AstInstr -> List (X86.Instr, Maybe (List Encode.EncodingElement))
search instr =
    case instr of
        Just (Parser.AstInstr (name, operands)) ->
            let
                compare = if (List.length operands) > 0 then (==) else String.startsWith
                keys = List.filter (compare (String.toUpper name)) (Dict.keys X86.instructionsByName)
                instrDefs = List.concatMap (\a -> case Dict.get a X86.instructionsByName of
                        Just value -> filterByOperands operands value
                        _ -> []
                ) keys
            in
                List.map (\instr -> (instr, Encode.encode instr operands)) instrDefs
        _ -> []

filterByOperands: List Parser.AstOperand -> List X86.Instr -> List X86.Instr
filterByOperands operands instrs =
    List.filter (\(X86.Instr (_,_,templates)) -> matchOperands operands templates) instrs

matchOperands: List Parser.AstOperand -> List X86.Operand -> Bool
matchOperands operands templates =
    case (operands, templates) of
        (operand :: operandsTail, tpl :: templatesTail) -> (matchOperand operand tpl) && (matchOperands operandsTail templatesTail)
        ([], _) -> True
        _ -> False

matchOperand: Parser.AstOperand -> X86.Operand -> Bool
matchOperand op tpl =
    case op of
        Parser.AstRegister name -> matchReg (String.toUpper name) tpl
        Parser.AstImmediat value -> matchImm value tpl
        Parser.AstEffectiveAddress ea -> matchMemory ea tpl

matchReg: String -> X86.Operand -> Bool
matchReg reg tpl =
    case (regSize reg, tpl) of
        (Nothing, _) -> True
        (Just size, X86.Register r) -> String.startsWith reg (X86.regName r)
        (Just size, X86.R s) -> size == s
        (Just size, X86.RM s) -> size == s
        _ -> False

matchImm: String -> X86.Operand -> Bool
matchImm strValue tpl =
    case (Parser.immValue strValue, tpl) of
        (Err _, _) -> True
        (Ok value, X86.I size) -> size == 32 || value < (Bitwise.shiftLeftBy size 1)
        _ -> False

matchMemory: Parser.MemoryOperand -> X86.Operand -> Bool
matchMemory memory tpl =
    case tpl of
        X86.RM size -> memory.size == size
        _ -> False

regSize: String -> Maybe Int
regSize reg =
    if String.startsWith "E" reg then
        Just 32
    else if String.endsWith "X" reg then
        Just 16
    else if String.endsWith "H" reg || String.endsWith "L" reg then
        Just 8
    else
        Nothing