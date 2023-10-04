import { errors, message, Error } from 'application/store/slices/Error.slice'
import { useAppSelector } from 'application/store/Hooks'

export type ErrorServiceOperators = {
    errors: Error,
    message: string | undefined
}

/**
 * ErrorService custom-hooks
 * @see https://reactjs.org/docs/hooks-custom.html
 */
export const UseErrorService = (): Readonly<ErrorServiceOperators> => {
    return {
        errors: useAppSelector(errors),
        message: useAppSelector(message)
    }
}

export default UseErrorService