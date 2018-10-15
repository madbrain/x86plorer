module X86 exposing (..)

import Dict
import Utils

type Instr = Instr (List Opcode, String, List Operand)

type Register = EAX | AX | AL

type Opcode =
    O Int
    | E Int
    | O_R Int
    | MODRM

type Operand =
    R Int
    | Register Register
    | RM Int
    | I Int
    | Error

-- Taken from http://www.felixcloutier.com/x86/

instructions: List Instr
instructions = [
    Instr ([ O 0x04 ], "ADD", ops [ "AL", "imm8" ]),
    Instr ([ O 0x05 ], "ADD", ops [ "AX", "imm16" ]),
    Instr ([ O 0x05 ], "ADD", ops [ "EAX", "imm32" ]),
    Instr ([ O 0x80, E 0 ], "ADD", ops [ "r/m8",  "imm8" ]),
    Instr ([ O 0x81, E 0 ], "ADD", ops [ "r/m16", "imm16" ]),
    Instr ([ O 0x81, E 0 ], "ADD", ops [ "r/m32", "imm32" ]),
    Instr ([ O 0x83, E 0 ], "ADD", ops [ "r/m16", "imm8" ]),
    Instr ([ O 0x83, E 0 ], "ADD", ops [ "r/m32", "imm8" ]),
    Instr ([ O 0, MODRM ], "ADD", ops [ "r/m8", "r8" ]),
    Instr ([ O 1, MODRM ], "ADD", ops [ "r/m16", "r16" ]),
    Instr ([ O 1, MODRM ], "ADD", ops [ "r/m32", "r32" ]),
    Instr ([ O 2, MODRM ], "ADD", ops [ "r8", "r/m8" ]),
    Instr ([ O 3, MODRM ], "ADD", ops [ "r16", "r/m16" ]),
    Instr ([ O 3, MODRM ], "ADD", ops [ "r32", "r/m32" ]),

    Instr ([ O 0xFE, E 1 ], "DEC", ops [ "r/m8" ]),
    Instr ([ O 0xFF, E 1 ], "DEC", ops [ "r/m16" ]),
    Instr ([ O 0xFF, E 1 ], "DEC", ops [ "r/m32" ]),
    Instr ([ O_R 0x48 ], "DEC", ops [ "r16" ]),
    Instr ([ O_R 0x48 ], "DEC", ops [ "r32" ]),

    Instr ([ O 0xF6, E 6 ], "DIV", ops [ "r/m8" ]),
    Instr ([ O 0xF7, E 6 ], "DIV", ops [ "r/m16" ]),
    Instr ([ O 0xF7, E 6 ], "DIV", ops [ "r/m32" ]),

    Instr ([ O 0xF6, E 7 ], "IDIV", ops [ "r/m8" ]),
    Instr ([ O 0xF7, E 7 ], "IDIV", ops [ "r/m16" ]),
    Instr ([ O 0xF7, E 7 ], "IDIV", ops [ "r/m32" ]),

    Instr ([ O 0xF6, E 5 ], "IMUL", ops [ "r/m8" ]),
    Instr ([ O 0xF7, E 5 ], "IMUL", ops [ "r/m16" ]),
    Instr ([ O 0xF7, E 5 ], "IMUL", ops [ "r/m32" ]),
    Instr ([ O 0x07, O 0xAF, MODRM ], "IMUL", ops [ "r16", "r/m16" ]),
    Instr ([ O 0x07, O 0xAF, MODRM ], "IMUL", ops [ "r32", "r/m32" ]),
    Instr ([ O 0x6b, MODRM ], "IMUL", ops [ "r16", "r/m16", "imm8" ]),
    Instr ([ O 0x6b, MODRM ], "IMUL", ops [ "r32", "r/m32", "imm8" ]),
    Instr ([ O 0x69, MODRM ], "IMUL", ops [ "r16", "r/m16", "imm16" ]),
    Instr ([ O 0x69, MODRM ], "IMUL", ops [ "r32", "r/m32", "imm32" ]),

    Instr ([ O 0xFE, E 0 ], "INC", ops [ "r/m8" ]),
    Instr ([ O 0xFF, E 0 ], "INC", ops [ "r/m16" ]),
    Instr ([ O 0xFF, E 0 ], "INC", ops [ "r/m32" ]),
    Instr ([ O_R 0x40 ], "INC", ops [ "r16" ]),
    Instr ([ O_R 0x40 ], "INC", ops [ "r32" ]),

    Instr ([ O 0xCC ], "INT3", [ ]),
    Instr ([ O 0xCD ], "INT", ops [ "imm8" ]),

    Instr ([ O 0x8D, MODRM ], "LEA", ops [ "r16", "m" ]),
    Instr ([ O 0x8D, MODRM ], "LEA", ops [ "r32", "m" ]),

    Instr ([ O 0x88, MODRM ], "MOV", ops [ "r/m8", "r8" ]),
    Instr ([ O 0x89, MODRM ], "MOV", ops [ "r/m16", "r16" ]),
    Instr ([ O 0x89, MODRM ], "MOV", ops [ "r/m32", "r32" ]),
    Instr ([ O 0x8A, MODRM ], "MOV", ops [ "r8", "r/m8" ]),
    Instr ([ O 0x8B, MODRM ], "MOV", ops [ "r16", "r/m16" ]),
    Instr ([ O 0x8B, MODRM ], "MOV", ops [ "r32", "r/m32" ]),
    Instr ([ O 0x8C, MODRM ], "MOV", ops [ "r/m16", "sreg" ]),
    Instr ([ O 0x8E, MODRM ], "MOV", ops [ "sreg", "r/m16" ]),
    Instr ([ O 0xA0 ], "MOV", ops [ "AL", "moffs8" ]),
    Instr ([ O 0xA1 ], "MOV", ops [ "AX", "moffs16" ]),
    Instr ([ O 0xA1 ], "MOV", ops [ "EAX", "moffs32" ]),
    Instr ([ O 0xA2 ], "MOV", ops [ "moffs8", "AL" ]),
    Instr ([ O 0xA3 ], "MOV", ops [ "moffs16", "AX" ]),
    Instr ([ O 0xA3 ], "MOV", ops [ "moffs32", "EAX" ]),
    Instr ([ O_R 0xB0 ], "MOV", ops [ "r8", "imm8" ]),
    Instr ([ O_R 0xB8 ], "MOV", ops [ "r16", "imm16" ]),
    Instr ([ O_R 0xB8 ], "MOV", ops [ "r32", "imm32" ]),
    Instr ([ O 0xC6, E 0 ], "MOV", ops [ "r/m8", "imm8" ]),
    Instr ([ O 0xC7, E 0 ], "MOV", ops [ "r/m16", "imm16" ]),
    Instr ([ O 0xC7, E 0 ], "MOV", ops [ "r/m32", "imm32" ]),

    Instr ([ O 0x0F, O 0xB6, MODRM ], "MOVZX", ops [ "r16", "r/m8" ]),
    Instr ([ O 0x0F, O 0xB6, MODRM ], "MOVZX", ops [ "r32", "r/m8" ]),
    Instr ([ O 0x0F, O 0xB7, MODRM ], "MOVZX", ops [ "r32", "r/m16" ]),

    Instr ([ O 0xF6, E 4 ], "MUL", ops [ "r/m8" ]),
    Instr ([ O 0xF7, E 4 ], "MUL", ops [ "r/m16" ]),
    Instr ([ O 0xF7, E 4 ], "MUL", ops [ "r/m32" ]),

    Instr ([ O 0x2C ], "SUB", ops [ "AL", "imm8" ]),
    Instr ([ O 0x2D ], "SUB", ops [ "AX", "imm16" ]),
    Instr ([ O 0x2D ], "SUB", ops [ "EAX", "imm32" ]),

    Instr ([ O 0x80, E 5 ], "SUB", ops [ "r/m8", "imm8" ]),
    Instr ([ O 0x81, E 5 ], "SUB", ops [ "r/m16", "imm16" ]),
    Instr ([ O 0x81, E 5 ], "SUB", ops [ "r/m32", "imm32" ]),

    Instr ([ O 0x83, E 5 ], "SUB", ops [ "r/m16", "imm8" ]),
    Instr ([ O 0x83, E 5 ], "SUB", ops [ "r/m32", "imm8" ]),

    Instr ([ O 0x28, MODRM ], "SUB", ops [ "r/m8", "r8" ]),
    Instr ([ O 0x29, MODRM ], "SUB", ops [ "r/m16", "r16" ]),
    Instr ([ O 0x29, MODRM ], "SUB", ops [ "r/m32", "r32" ]),

    Instr ([ O 0x2A, MODRM ], "SUB", ops [ "r8", "r/m8" ]),
    Instr ([ O 0x2B, MODRM ], "SUB", ops [ "r16", "r/m16" ]),
    Instr ([ O 0x2B, MODRM ], "SUB", ops [ "r32", "r/m32" ]),

    Instr ([ O 0xA8 ], "TEST", ops [ "AL", "imm8" ]),
    Instr ([ O 0xA9 ], "TEST", ops [ "AX", "imm16" ]),
    Instr ([ O 0xA9 ], "TEST", ops [ "EAX", "imm32" ]),
    Instr ([ O 0xF6, E 0 ], "TEST", ops [ "r/m8", "imm8" ]),
    Instr ([ O 0xF7, E 0 ], "TEST", ops [ "r/m16", "imm16" ]),
    Instr ([ O 0xF7, E 0 ], "TEST", ops [ "r/m32", "imm32" ]),
    Instr ([ O 0x84, MODRM ], "TEST", ops [ "r/m8", "r8" ]),
    Instr ([ O 0x85, MODRM ], "TEST", ops [ "r/m16", "r16" ]),
    Instr ([ O 0x85, MODRM ], "TEST", ops [ "r/m32", "r32" ])

    ]

ops: List String -> List Operand
ops operands =
    case operands of
        [] -> []
        operand :: tail -> (templatePattern operand) :: (ops tail)

templatePattern: String -> Operand
templatePattern tpl =
    if String.startsWith "r/m" tpl then
        String.slice 3 (String.length tpl) tpl
            |> templateSize
            |> Maybe.map RM
            |> Maybe.withDefault Error
    else if String.startsWith "r" tpl then
        String.slice 1 (String.length tpl) tpl
            |> templateSize
            |> Maybe.map R
            |> Maybe.withDefault Error
    else if String.startsWith "imm" tpl then
        String.slice 3 (String.length tpl) tpl
            |> templateSize
            |> Maybe.map I
            |> Maybe.withDefault Error
    else
        case makeReg(tpl) of
            Just name -> Register name
            _ -> Error

templateSize: String -> Maybe Int
templateSize s =
    case String.toInt s of
        Just 32 -> Just 32
        Just 16 -> Just 16
        Just 8  -> Just 8
        _ -> Nothing

makeReg: String -> Maybe Register
makeReg tpl =
    case tpl of
        "EAX" -> Just EAX
        "AX"  -> Just AX
        "AL"  -> Just AL
        _ -> Nothing

instrToString: Instr -> String
instrToString (Instr (_, name, operands)) =
    name ++ " " ++ (List.map operandString operands |> String.join ", ")

operandString: Operand -> String
operandString op =
    case op of
        RM size -> "r/m" ++ (String.fromInt size)
        R size  -> "r" ++ (String.fromInt size)
        I size  -> "imm" ++ (String.fromInt size)
        Register reg -> regName reg
        _ -> "<error>"

regName: Register -> String
regName reg =
    case reg of
        EAX -> "EAX"
        AX -> "AX"
        AL -> "AL"

instructionsByName: Dict.Dict String (List Instr)
instructionsByName = Utils.groupBy (\(Instr (_, name, _)) -> name) instructions