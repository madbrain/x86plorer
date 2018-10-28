
import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (..)
import Browser
import Array

import Parser
import Search
import Decode
import Encode
import EncodeDiagram
import X86

type alias Model = { content: String, decode: Bool, is32Bits: Bool }

type Msg =
  Change String
  | OperationModeChange
  | BitSizeChange

main = Browser.sandbox
  { init = initialModel
  , view = view
  , update = update
  }

initialModel: Model
initialModel = { content = "add [eax],ebx", decode = False, is32Bits = True }

update: Msg -> Model -> Model
update msg model = 
  case msg of
    Change text ->
        { model | content = text }
    OperationModeChange ->
        { model | decode = not model.decode }
    BitSizeChange ->
        { model | is32Bits = not model.is32Bits }

encode: Model -> (List Parser.Error, List (String, Maybe (List Encode.EncodingElement)))
encode model =
  let
    (instr, context) = Parser.parse model.is32Bits model.content
    instructions = case instr of
      Just i -> Search.search i model.is32Bits
      _ -> []
  in
    (context.errors, instructions)

decode: Model -> (List Parser.Error, List (String, Maybe (List Encode.EncodingElement)))
decode model =
  let
    (error, instructions) = Decode.decode model.is32Bits model.content  
  in
    ([ { msg = error } ], instructions)

view: Model -> Html Msg
view model =
  let
    (errors, instructions) = if model.decode then decode model else encode model
  in
    div [ id "container" ]
        [ div [ id "logo" ] []
        , makeSwitch "" "Encode" "Decode" model.decode OperationModeChange
        , makeSwitch "push-right" "16bits" "32bits" model.is32Bits BitSizeChange
        , input [ placeholder "Assembly", onInput Change, type_ "text", value (model.content) ] []
        , div [ id "errors" ] [ ul [] (List.map (\error ->li [] [ text error.msg ]) errors) ]
        , div [ id "instructions" ]
            [ ul []
                (instructions |> List.map (\(i, encoding) ->
                    li []
                      [ div [ class "instruction" ]
                          [ span [] [ text i ]
                          , Maybe.map EncodeDiagram.encode encoding |> Maybe.withDefault (text "")
                          ]
                      ]))
            ]
        ]

makeSwitch: String -> String -> String -> Bool -> Msg -> Html Msg
makeSwitch cls leftLabel rightLabel value handler =
  let
    textClass = \v -> if v then "on" else "off"
  in
    span [ class cls ]
    [ span [ class (textClass (not value)) ] [ text (leftLabel ++ " ") ]
    , label [ class "switch" ]
      [ input [ type_ "checkbox", onClick handler, checked value ] []
      , span [ class "slider round" ] []
      ]
    , span [ class (textClass value) ] [ text (" " ++ rightLabel) ]
    ]