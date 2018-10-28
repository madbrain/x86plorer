module X86 exposing (..)

import Dict
import Utils

type Instr = Instr (List Opcode, String, List Operand)

type Register = AX | AL | DX

type Opcode
    = O Int
    | E Int
    | O_R Int
    | MODRM

type Size
    = S_8
    | S_16
    | S_32
    | S_16_32

type Operand =
    R Size
    | Register (Size, Register)
    | RM Size
    | I Size
    | REL Size
    | Error

-- Taken from http://www.felixcloutier.com/x86/
-- http://www.c-jump.com/CIS77/CPU/x86/lecture.html

instructions: List Instr
instructions = [
    Instr ([ O 0x00, MODRM ], "ADD", ops [ "r/m8", "r8" ]),
    Instr ([ O 0x01, MODRM ], "ADD", ops [ "r/m16/32", "r16/32" ]),
    Instr ([ O 0x02, MODRM ], "ADD", ops [ "r8", "r/m8" ]),
    Instr ([ O 0x03, MODRM ], "ADD", ops [ "r16/32", "r/m16/32" ]),
    Instr ([ O 0x04 ], "ADD", ops [ "AL", "imm8" ]),
    Instr ([ O 0x05 ], "ADD", ops [ "E_AX", "imm16/32" ]),
    Instr ([ O 0x80, E 0 ], "ADD", ops [ "r/m8",  "imm8" ]),
    Instr ([ O 0x81, E 0 ], "ADD", ops [ "r/m16/32", "imm16/32" ]),
    Instr ([ O 0x83, E 0 ], "ADD", ops [ "r/m16/32", "imm8" ]),

    Instr ([ O 0xFE, E 1 ], "DEC", ops [ "r/m8" ]),
    Instr ([ O 0xFF, E 1 ], "DEC", ops [ "r/m16/32" ]),
    Instr ([ O_R 0x48 ], "DEC", ops [ "r16/32" ]),

    Instr ([ O 0xF6, E 6 ], "DIV", ops [ "r/m8" ]),
    Instr ([ O 0xF7, E 6 ], "DIV", ops [ "r/m16/32" ]),

    Instr ([ O 0xF4 ], "HLT", []),

    Instr ([ O 0xF6, E 7 ], "IDIV", ops [ "r/m8" ]),
    Instr ([ O 0xF7, E 7 ], "IDIV", ops [ "r/m16/32" ]),

    Instr ([ O 0xF6, E 5 ], "IMUL", ops [ "r/m8" ]),
    Instr ([ O 0xF7, E 5 ], "IMUL", ops [ "r/m16/32" ]),
    Instr ([ O 0x0F, O 0xAF, MODRM ], "IMUL", ops [ "r16/32", "r/m16/32" ]),
    Instr ([ O 0x6b, MODRM ], "IMUL", ops [ "r16/32", "r/m16/32", "imm8" ]),
    Instr ([ O 0x69, MODRM ], "IMUL", ops [ "r16/32", "r/m16/32", "imm16/32" ]),

    Instr ([ O 0xE4 ], "IN", ops [ "AL", "imm8" ]),
    Instr ([ O 0xE5 ], "IN", ops [ "E_AX", "imm8" ]),
    Instr ([ O 0xEC ], "IN", ops [ "AL", "DX" ]),
    Instr ([ O 0xED ], "IN", ops [ "E_AX", "DX" ]),

    Instr ([ O 0xFE, E 0 ], "INC", ops [ "r/m8" ]),
    Instr ([ O 0xFF, E 0 ], "INC", ops [ "r/m16/32" ]),
    Instr ([ O_R 0x40 ], "INC", ops [ "r16/32" ]),

    Instr ([ O 0xCC ], "INT3", [ ]),
    Instr ([ O 0xCD ], "INT", ops [ "imm8" ]),

    Instr ([ O 0x0F, O 0x84 ], "JE", ops [ "rel16/32" ]),
    Instr ([ O 0xE9 ], "JMP", ops [ "rel16/32" ]),

    Instr ([ O 0x8D, MODRM ], "LEA", ops [ "r16/32", "m" ]),

    Instr ([ O 0x88, MODRM ], "MOV", ops [ "r/m8", "r8" ]),
    Instr ([ O 0x89, MODRM ], "MOV", ops [ "r/m16/32", "r16/32" ]),
    Instr ([ O 0x8A, MODRM ], "MOV", ops [ "r8", "r/m8" ]),
    Instr ([ O 0x8B, MODRM ], "MOV", ops [ "r16/32", "r/m16/32" ]),
    Instr ([ O 0x8C, MODRM ], "MOV", ops [ "r/m16", "sreg" ]),
    Instr ([ O 0x8E, MODRM ], "MOV", ops [ "sreg", "r/m16" ]),
    Instr ([ O 0xA0 ], "MOV", ops [ "AL", "moffs8" ]),
    Instr ([ O 0xA1 ], "MOV", ops [ "E_AX", "moffs16/32" ]),
    Instr ([ O 0xA2 ], "MOV", ops [ "moffs8", "AL" ]),
    Instr ([ O 0xA3 ], "MOV", ops [ "moffs16/32", "E_AX" ]),
    Instr ([ O_R 0xB0 ], "MOV", ops [ "r8", "imm8" ]),
    Instr ([ O_R 0xB8 ], "MOV", ops [ "r16/32", "imm16/32" ]),
    Instr ([ O 0xC6, E 0 ], "MOV", ops [ "r/m8", "imm8" ]),
    Instr ([ O 0xC7, E 0 ], "MOV", ops [ "r/m16/32", "imm16/32" ]),

    Instr ([ O 0x0F, O 0xB6, MODRM ], "MOVZX", ops [ "r16/32", "r/m8" ]),
    Instr ([ O 0x0F, O 0xB7, MODRM ], "MOVZX", ops [ "r32", "r/m16" ]),

    Instr ([ O 0xF6, E 4 ], "MUL", ops [ "r/m8" ]),
    Instr ([ O 0xF7, E 4 ], "MUL", ops [ "r/m16/32" ]),

    Instr ([ O 0x90 ], "NOP", [ ]),

    Instr ([ O 0xE6 ], "OUT", ops [ "imm8", "AL" ]),
    Instr ([ O 0xE7 ], "OUT", ops [ "imm8", "E_AX" ]),
    Instr ([ O 0xEE ], "OUT", ops [ "DX", "AL" ]),
    Instr ([ O 0xEF ], "OUT", ops [ "DX", "E_AX" ]),

    Instr ([ O 0x2C ], "SUB", ops [ "AL", "imm8" ]),
    Instr ([ O 0x2D ], "SUB", ops [ "E_AX", "imm16/32" ]),

    Instr ([ O 0x80, E 5 ], "SUB", ops [ "r/m8", "imm8" ]),
    Instr ([ O 0x81, E 5 ], "SUB", ops [ "r/m16/32", "imm16/32" ]),
    Instr ([ O 0x83, E 5 ], "SUB", ops [ "r/m16/32", "imm8" ]),

    Instr ([ O 0x28, MODRM ], "SUB", ops [ "r/m8", "r8" ]),
    Instr ([ O 0x29, MODRM ], "SUB", ops [ "r/m16/32", "r16/32" ]),

    Instr ([ O 0x2A, MODRM ], "SUB", ops [ "r8", "r/m8" ]),
    Instr ([ O 0x2B, MODRM ], "SUB", ops [ "r16/32", "r/m16/32" ]),

    Instr ([ O 0xA8 ], "TEST", ops [ "AL", "imm8" ]),
    Instr ([ O 0xA9 ], "TEST", ops [ "E_AX", "imm16/32" ]),
    Instr ([ O 0xF6, E 0 ], "TEST", ops [ "r/m8", "imm8" ]),
    Instr ([ O 0xF7, E 0 ], "TEST", ops [ "r/m16/32", "imm16/32" ]),
    Instr ([ O 0x84, MODRM ], "TEST", ops [ "r/m8", "r8" ]),
    Instr ([ O 0x85, MODRM ], "TEST", ops [ "r/m16/32", "r16/32" ])

    ]

ops: List String -> List Operand
ops operands = List.map templatePattern operands

templatePattern: String -> Operand
templatePattern tpl =
    if String.startsWith "r/m" tpl then
        String.slice 3 (String.length tpl) tpl
            |> templateSize
            |> Maybe.map RM
            |> Maybe.withDefault Error
    else if String.startsWith "rel" tpl then
        String.slice 3 (String.length tpl) tpl
            |> templateSize
            |> Maybe.map REL
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

templateSize: String -> Maybe Size
templateSize s =
    case s of
        "32" -> Just S_32
        "16" -> Just S_16
        "8"  -> Just S_8
        "16/32" -> Just S_16_32
        _ -> Nothing

makeReg: String -> Maybe (Size, Register)
makeReg tpl =
    case tpl of
        "E_AX" -> Just (S_16_32, AX)
        "EAX"  -> Just (S_32, AX)
        "AX"   -> Just (S_16, AX)
        "AL"   -> Just (S_8, AL)
        "DX"   -> Just (S_16, DX)
        _ -> Nothing

instrToString: Instr -> String
instrToString (Instr (_, name, operands)) =
    name ++ " " ++ (List.map operandString operands |> String.join ", ")

operandString: Operand -> String
operandString op =
    case op of
        RM size -> "r/m" ++ (sizeName size)
        R size  -> "r" ++ (sizeName size)
        I size  -> "imm" ++ (sizeName size)
        REL size  -> "rel" ++ (sizeName size)
        Register (size, reg) -> regName size reg
        _ -> "<error>"

sizeName: Size -> String
sizeName size =
    case size of
        S_32 -> "32"
        S_16 -> "16"
        S_8  -> "8"
        S_16_32 -> "16/32"

regName: Size -> Register -> String
regName size reg =
    case reg of
        AX -> if size == S_16 then "AX" else "EAX"
        AL -> "AL"
        DX -> "DX"

instructionsByName: Dict.Dict String (List Instr)
instructionsByName = Utils.groupBy (\(Instr (_, name, _)) -> name) instructions

bitSize: Size -> Int
bitSize size =
    case size of
        S_8 -> 8
        S_16 -> 16
        _ -> 32