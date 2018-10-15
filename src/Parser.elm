
module Parser exposing (parse, immValue, ParserContext, Error, AstInstr(..), AstOperand(..), MemoryOperand)

import Lexer exposing (Token(..))
import Hex

type alias Error = { msg: String }
type alias ParserContext = { stream: Lexer.InputStream, current: Lexer.Token, errors: List Error, size: Int }
type ParseResult a = OK (a, ParserContext) | NOK ParserContext
type alias MemoryOperand = { size: Int, base: Maybe String, index: Maybe (String, Int), displacement: Int }

type AstInstr = AstInstr (String, List AstOperand)
type AstOperand =
    AstRegister String
    | AstImmediat String
    | AstEffectiveAddress MemoryOperand

type EffectiveAddress =
    EARegister (String, Maybe String)
    | EADisplacement (Bool, String)

parse: Bool -> String -> (Maybe AstInstr, ParserContext)
parse is32Bits content = parseAssembly (makeParser is32Bits content)

makeParser: Bool -> String -> ParserContext
makeParser is32Bits content =
    let
        stream = Lexer.lexer content
        (token, next) = Lexer.nextToken stream
    in
        skipErrors { stream = next, current = token, errors = [], size = if is32Bits then  32 else  16 }

parseAssembly: ParserContext -> (Maybe AstInstr, ParserContext)
parseAssembly context =
    case parseIdent context of
        OK (name, next) ->
            let
                (operands, nn) = parseOperands next []
            in
                (Just (AstInstr (name, operands)), nn)
        NOK next -> (Nothing, next)

parseOperands: ParserContext -> List AstOperand -> (List AstOperand, ParserContext) 
parseOperands context operands =
    case context.current of
        T_EOF -> (operands, context)
        _ -> case parseOperand context of
            OK (operand, next) ->
                let
                    newOperands = operand :: operands
                in
                    case next.current of
                        T_COMA -> parseOperands (advance next) newOperands
                        _ -> (List.reverse newOperands, next)

            NOK next -> (List.reverse operands, next)

parseOperand: ParserContext -> ParseResult AstOperand
parseOperand context =
    case context.current of
        T_IDENT name ->
            if name == "byteptr" then
                parseMemory 8 (advance context)
            else if name == "wordptr" then
                parseMemory 16 (advance context)
            else
                OK (AstRegister name, advance context)

        T_INTEGER value ->
            OK(AstImmediat value, advance context)

        T_LBRT ->
            parseMemory context.size context
        _ ->
            NOK (errorExpecting context "IDENT, INTEGER or [")

parseMemory: Int -> ParserContext -> ParseResult AstOperand
parseMemory size context =
    case parseEffectiveAddress True (advance context) [] of
        OK (elements, next) -> OK (AstEffectiveAddress (makeMemoryOperand elements (initMemoryOperand size)), next)
        NOK next -> NOK next

parseEffectiveAddress: Bool -> ParserContext -> List EffectiveAddress -> ParseResult (List EffectiveAddress)
parseEffectiveAddress sign context elements =
    case parseEAElement sign context of
        OK (element, next) ->
            let
                newElements = element :: elements
            in
                case next.current of
                    T_ADD -> parseEffectiveAddress True (advance next) newElements
                    T_SUB -> parseEffectiveAddress False (advance next) newElements
                    T_RBRT -> OK (List.reverse newElements, advance next)
                    _ -> OK (List.reverse newElements, context)
        NOK next -> OK (List.reverse elements, next)

parseEAElement: Bool -> ParserContext -> ParseResult EffectiveAddress
parseEAElement sign context =
    case context.current of
        T_IDENT name ->
            case parseScale (advance context) of
                OK (s, next) -> OK (EARegister (name, s), next)
                NOK next -> NOK next

        T_INTEGER value ->
            OK (EADisplacement (sign, value), advance context)

        _ ->
            NOK (errorExpecting context "IDENT or INTEGER")

parseScale: ParserContext -> ParseResult (Maybe String)
parseScale context =
    case context.current of
        T_MUL ->
            case parseInteger (advance context) of
                OK (value, next) -> OK (Just value, next)
                NOK next -> NOK next
        _ -> OK (Nothing, context)

initMemoryOperand: Int -> MemoryOperand
initMemoryOperand size = { size = size, base = Nothing, index = Nothing, displacement = 0 }

makeMemoryOperand: List EffectiveAddress -> MemoryOperand -> MemoryOperand
makeMemoryOperand elements memory =
    case elements of
        [] -> memory
        v0 :: v1 -> makeMemoryOperand v1 (analyseMemoryOperand v0 memory)

analyseMemoryOperand: EffectiveAddress -> MemoryOperand -> MemoryOperand
analyseMemoryOperand element memory =
    case element of
        EARegister (name, Nothing) ->
            case memory.base of
                Just _ -> { memory | index = Just (name, 1) }
                _ -> { memory | base = Just name }

        EARegister (name, Just s) ->
            case (memory.base, scaleOf s) of
                (Nothing, 1) -> { memory | base = Just name }
                (_, scale) -> { memory | index = Just (name, scale) }

        EADisplacement (sign, disp) ->
            case immValue disp of
                Just value -> { memory | displacement = memory.displacement + (if sign then value else -value) }
                _ -> memory

scaleOf: String -> Int
scaleOf value =
    case String.toInt value of
        Just 1 -> 1
        Just 2 -> 2
        Just 4 -> 4
        _ -> 1

immValue: String -> Maybe Int
immValue value =
    if String.endsWith "H" (String.toUpper value) then
        Hex.fromString (String.slice 0 -1 value) |> Result.toMaybe
    else
        String.toInt value

parseIdent: ParserContext -> ParseResult String
parseIdent context =
    case context.current of
        T_IDENT value -> OK (value, advance context)
        _ -> NOK (errorExpecting context "IDENT")

parseInteger: ParserContext -> ParseResult String
parseInteger context =
    case context.current of
        T_INTEGER value -> OK (value, advance context)
        _ -> NOK (errorExpecting context "INTEGER")
    
addError: ParserContext -> String -> ParserContext
addError context msg = { context | errors = { msg = msg } :: context.errors }

errorExpecting: ParserContext -> String -> ParserContext
errorExpecting context ident = addError context ("expecting " ++ ident)

advance: ParserContext -> ParserContext
advance context =
    case Lexer.nextToken context.stream of
        (token, next) -> skipErrors { context | stream = next, current = token }

skipErrors: ParserContext -> ParserContext
skipErrors context =
    case context.current of
        T_ERROR msg -> skipErrors (advance { context |
                errors = { msg = "unexpected char '" ++ msg ++ "\'" } :: context.errors })
        _ -> context