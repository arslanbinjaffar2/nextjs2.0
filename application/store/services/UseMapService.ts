import { useCallback } from 'react'

import { MapActions, SelectMap } from 'application/store/slices/Map.Slice'

import { Map } from 'application/models/Map'

import { useAppDispatch, useAppSelector } from 'application/store/Hooks'

export type MapServiceOperators = {
    map: Map
    FetchMap: () => void
}

/**
 * MapService custom-hooks
 * @see https://reactjs.org/docs/hooks-custom.html
 */
export const UseMapService = (): Readonly<MapServiceOperators> => {

    const dispatch = useAppDispatch()

    return {
        map: useAppSelector(SelectMap),
        FetchMap: useCallback(
            () => {
                dispatch(MapActions.FetchMap())
            },
            [dispatch],
        )
    }
}

export default UseMapService