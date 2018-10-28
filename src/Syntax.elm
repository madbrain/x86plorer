module Syntax exposing (..)

import X86
import Hex

type AstInstr = AstInstr (String, List AstOperand)

type AstOperand =
    AstRegister String
    | AstImmediat Int
    | AstEffectiveAddress MemoryOperand

type alias MemoryOperand = { size: X86.Size, base: Maybe String, index: Maybe (String, Int), displacement: Int }

toString: AstInstr -> String
toString (AstInstr (name, operands)) =
    name ++ " " ++ (operands |> List.map operandString |> String.join ", ")

operandString: AstOperand -> String
operandString operand =
    case operand of
        AstRegister reg -> reg
        AstImmediat value -> toDisplayInt value
        AstEffectiveAddress memory -> memoryString memory
        
memoryString: MemoryOperand -> String
memoryString memory =
    let
        size = case memory.size of
            X86.S_32 -> ""
            X86.S_16 -> "WORDPTR "
            X86.S_8  -> "BYTEPTR "
            X86.S_16_32 -> ""
    in
        size ++ "[" ++ (memoryOperand memory) ++ "]"

memoryOperand: MemoryOperand -> String
memoryOperand memory =
    let
        base = Maybe.withDefault "" memory.base
        index = Maybe.map (\(reg, scale) -> String.fromInt scale ++ "*" ++ reg) memory.index
        disp = if memory.displacement /= 0 then toDisplayInt memory.displacement |> Just else Nothing
    in
        List.concatMap (\i -> case i of
            Just x -> [x]
            _ -> []) [ memory.base, index, disp ] |> String.join "+"

toDisplayInt: Int -> String
toDisplayInt value =
    if value < 1000 then
        String.fromInt value
    else
        Hex.toString value ++ "h"