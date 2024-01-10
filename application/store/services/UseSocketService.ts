import { useCallback } from 'react'

import { SelectSockets, SocketActions,  } from 'application/store/slices/Socket.Slice'

import { useAppDispatch, useAppSelector } from 'application/store/Hooks'

export type SocketServiceOperators = {
    socket: any,
    SetSocket: (payload:any) => void
}

/**
 * AttendeeService custom-hooks
 * @see https://reactjs.org/docs/hooks-custom.html
*/
export const UseSocketService = (): Readonly<SocketServiceOperators> => {

    const dispatch = useAppDispatch()

    return {
        
        socket: useAppSelector(SelectSockets),
        SetSocket: useCallback(
            (payload:any) => {
                dispatch(SocketActions.SetSocket(payload))
            },
            [dispatch],
        ),
        
    }
}

export default UseSocketService
