module Lexer exposing (lexer, nextToken, InputStream, Token(..))

import Char

type alias InputStream = { content: String, position: Int }

type Token =
    T_EOF
    | T_COMA
    | T_RBRT
    | T_LBRT
    | T_MUL
    | T_SUB
    | T_ADD
    | T_ERROR String
    | T_INTEGER String
    | T_IDENT String

lexer: String -> InputStream
lexer input = { content = input, position = 0 }

nextToken: InputStream -> (Token, InputStream)
nextToken stream =
    case getChar stream of
        (Nothing, next) -> (T_EOF, next)
        (Just c, next) ->
            if isSpace c then
                nextToken next
            else if isLetter c then
                scanIdent next (String.fromChar c)
            else if isDigit c then
                scanInteger next (String.fromChar c)
            else if c == ',' then
                (T_COMA, next)
            else if c == '[' then
                (T_LBRT, next)
            else if c == ']' then
                (T_RBRT, next)
            else if c == '+' then
                (T_ADD, next)
            else if c == '-' then
                (T_SUB, next)
            else if c == '*' then
                (T_MUL, next)
            else
                (T_ERROR (String.fromChar c), next)

getChar: InputStream -> (Maybe Char, InputStream)
getChar stream =
    case String.uncons stream.content of
        Nothing -> (Nothing, stream)
        Just (c, next) -> (Just c, { content = next, position = stream.position + 1})

isSpace: Char -> Bool
isSpace c = c == ' ' || c == '\t' || c == '\n'

isLetter: Char -> Bool
isLetter c = c >= 'a' && c <= 'z' || c >= 'A' && c <= 'Z'

isDigit: Char -> Bool
isDigit c = c >= '0' && c <= '9'

isLetterOrDigit: Char -> Bool
isLetterOrDigit c = isLetter c || isDigit c

scanIdent: InputStream -> String -> (Token, InputStream)
scanIdent stream content =
    case getChar stream of
        (Nothing, next) -> (T_IDENT content, next)
        (Just c, next) ->
            if isLetterOrDigit c then
                scanIdent next (content ++ (String.fromChar c))
            else
                (T_IDENT content, stream)

scanInteger: InputStream -> String -> (Token, InputStream)
scanInteger stream content =
    case getChar(stream) of
        (Nothing, next) -> (T_INTEGER content, next)
        (Just c, next) ->
            if isDigit c then
                scanInteger next (content ++ (String.fromChar c))
            else if (Char.toLower c) == 'h' || (Char.toLower c) =='b' then
                (T_INTEGER (content ++ (String.fromChar c)), next)
            else
                (T_INTEGER content, stream)