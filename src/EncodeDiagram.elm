module EncodeDiagram exposing (encode)

import Html exposing (..)
import Encode exposing (..)
import Hex
import Bitwise
import Array
import Diagram exposing (..)
import X86
import Syntax

type alias EncodingBlock = { name: String, size: Int, shift: Int }
type alias EncodingInfo = { name: String, elements: List EncodingBlock }

encode: List Encode.EncodingElement -> Html msg
encode elements = List.map encodeElement elements |> Diagram.draw

encodeElement: Encode.EncodingElement -> (String, DiagramElement)
encodeElement element =
    case element of
        Prefix value -> (bytes [ value ], Leaf "Prefix")
        Opcode value -> (bytes [ value ], Leaf "Opcode")
        OpcodeAndReg (opcode, reg) -> encodeIntoByte opRegEncoding [ opcode, reg ]
        ModRM (mode, reg, rm) -> encodeIntoByte modRmEncoding [ encodeMode mode, reg, rm ]
        Sib (base, index, scale) -> encodeIntoByte sibEncoding [ encodeScale scale, index, base ]
        Disp8 value -> (bytes [ value ], "Displacement: " ++ (Syntax.toDisplayInt value) |> Leaf)
        Disp32 value -> (toLitteEndian 32 value |> bytes, "Displacement: " ++ (Syntax.toDisplayInt value) |> Leaf)
        Immediat (size, value) -> (toLitteEndian (X86.bitSize size) value |> bytes, "Immediat value: " ++ (Syntax.toDisplayInt value) |> Leaf)

toBits: Int -> Int -> String
toBits size value =
    Array.initialize size (\i -> String.fromInt (Bitwise.and 1 (Bitwise.shiftRightBy ((size - i) - 1) value)))
        |> Array.toList
        |> String.join ""

toLitteEndian: Int -> Int -> List Int
toLitteEndian size value =
    List.range 0 ((size // 8) - 1)
        |> List.map (\i -> Bitwise.shiftRightZfBy (i * 8) value |> Bitwise.and 0xFF)

bytes: List Int -> String
bytes values = String.join " " (List.map toByteHex values)

toByteHex: Int -> String
toByteHex value = Hex.toString (value + 256) |> String.slice 1 3

encodeIntoByte: EncodingInfo -> List Int -> (String, DiagramElement)
encodeIntoByte encoding values =
    let
        o = List.map2 (\el v -> (toBits el.size v, Leaf el.name)) encoding.elements values
        e = List.map2 (\el v -> Bitwise.shiftLeftBy el.shift v) encoding.elements values
            |> List.foldl Bitwise.or 0
            |> List.singleton
    in
        (bytes e, Node encoding.name o)

opRegEncoding: EncodingInfo
opRegEncoding = {
    name = "Opcode and Register",
    elements =
        [ { name = "Opcode", size = 5, shift = 3 }
        , { name = "Reg", size = 3, shift = 0 }
        ]
    }

sibEncoding: EncodingInfo
sibEncoding = {
    name = "SIB",
    elements =
        [ { name = "Scale", size = 2, shift = 6 }
        , { name = "Index", size = 3, shift = 3 }
        , { name = "Base", size = 3, shift = 0 }
        ]
    }

modRmEncoding: EncodingInfo
modRmEncoding = {
    name = "ModRM",
    elements =
        [ { name = "Mode", size = 2, shift = 6 }
        , { name = "Reg", size = 3, shift = 3 }
        , { name = "RM", size = 3, shift = 0 }
        ]
    }

test: List Encode.EncodingElement
test = [
    Encode.Opcode(129),
    Encode.ModRM(Encode.MEMORY_DISP32, 0, 4),
    Encode.Sib(0, 3, 4),
    Encode.Disp32(256),
    Encode.Immediat (X86.S_32, 20)
    ]

main: Html msg
main = encode test