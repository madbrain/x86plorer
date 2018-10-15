module Diagram exposing (draw, Diagram, DiagramElement(..))

import Html
import Array
import Color
import Collage exposing (..)
import Collage.Render exposing (svg)
import Collage.Layout exposing (..)
import Collage.Text

type alias Diagram = List (String, DiagramElement)
type DiagramElement = Node String Diagram | Leaf String

draw: Diagram -> Html.Html msg
draw data = drawDiagram 0 data |> svg

drawDiagram: Int -> Diagram -> Collage msg
drawDiagram level data =
    let
        (bl, ds) = makeBlocks data level
        collage = stack [ bl, place Right bl ds |> place Down bl ]
        lines = Array.initialize (List.length data) identity
            |> Array.toList
            |> List.filterMap (\i ->
                case (getBlock collage level i, getDesc collage level i) of
                    (Just ((x1, y1) as f), Just ((x2, y2) as t)) ->
                            path [ f, (x1, y2), t ] |> traced (uniform Color.green |> solid semithick) |> Just
                    _ -> Nothing)
    in
        stack (collage :: lines)

makeBlocks: Diagram -> Int -> (Collage msg, Collage msg)
makeBlocks data level =
    let (blocks, descs) = Array.fromList data
            |> Array.indexedMap (makeBlockAndDesc level)
            |> Array.toList
            |> List.unzip
    in
        (blocks |> List.intersperse (spacer 10 0) |> horizontal,
            descs |> List.intersperse (spacer 0 10) |> List.reverse |> vertical)

makeBlockAndDesc: Int -> Int -> (String, DiagramElement) -> (Collage msg, Collage msg)
makeBlockAndDesc level i (label, element) =
    (name (blockName "block" level i) (makeBox label),
         vertical
            [ (spacer 0 10)
            , name (blockName "desc" level i) (horizontal [ (spacer 10 0), makeDesc element (level + 1) ])
            ] |> align left)

blockName: String -> Int -> Int -> String
blockName prefix level i =
    String.join "_" [ prefix, String.fromInt level, String.fromInt i ]

makeBox: String -> Collage msg
makeBox content =
    let
        str = Collage.Text.fromString content |> rendered
        w = width str + 10
        h = height str + 10
    in
        impose str (rectangle w h |> outlined (uniform Color.blue |> solid thin))

makeDesc: DiagramElement -> Int -> Collage msg
makeDesc element level =
    case element of
        Leaf label -> Collage.Text.fromString label |> rendered
        Node label data -> horizontal
            [ Collage.Text.fromString label |> rendered
            , spacer 10 0
            , drawDiagram level data
            ]

getBlock: Collage msg -> Int -> Int -> Maybe Point
getBlock collage level i = locate (blockName "block" level i) bottom collage

getDesc: Collage msg -> Int -> Int -> Maybe Point
getDesc collage level i = locate (blockName "desc" level i) left collage

test: Diagram
test = [ ("01 00", Leaf "A"), ("98", Node "B" [ ("000", Leaf "D"), ("01010", Leaf "E") ]), ("45", Leaf "C") ]

main: Html.Html cmd
main = Html.div [] [ draw test ]