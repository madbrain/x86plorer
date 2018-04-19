
module Utils exposing (groupBy)

import Dict

groupBy: (a -> comparable) -> List a -> Dict.Dict comparable (List a) 
groupBy func list =
    let
        addToList element previous =
            case previous of
                Just elements -> Just (element :: elements)
                Nothing -> Just [ element ]
        process element dict =
                Dict.update (func element) (addToList element) dict
    in
        List.foldl process Dict.empty list