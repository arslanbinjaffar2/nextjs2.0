import { useCallback } from 'react'

import {
    Toast,
     ToastActions,
    ToastsState,
} from 'application/store/slices/Toast.Slice'
import { useAppDispatch, useAppSelector } from '../Hooks'






export type ToastServiceOperators = {
    toasts:Toast[]
    AddToast: (payload: { status:string ,message:string}) => void
    onClose: (payload: { id: number }) => void
    removeFirstToast: () => void
}

/**
 * SponsorService custom-hooks
 * @see https://reactjs.org/docs/hooks-custom.html
 */
export const UseToastService = (): Readonly<ToastServiceOperators> => {

    const dispatch = useAppDispatch()

    return {
        toasts: useAppSelector(ToastsState),
        AddToast: useCallback(
            (payload: { status:string ,message:string}) => {
                dispatch(ToastActions.addtoast(payload))
            },
            [dispatch],
        ),
       onClose: useCallback(
        (payload: { id: number }) => {
            dispatch(ToastActions.onclose(payload))
        },
        [dispatch],
    ),
    removeFirstToast:useCallback(
        () => {
            dispatch(ToastActions.removefirst())
        },
        [dispatch],
    ),
    }
}

export default UseToastService