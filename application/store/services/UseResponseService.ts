import { response, Response } from 'application/store/slices/Response.slice'
import { useAppSelector } from 'application/store/Hooks'

export type ResponseServiceOperators = {
    response: Response
}

/**
 * ResponseService custom-hooks
 * @see https://reactjs.org/docs/hooks-custom.html
 */
export const UseResponseService = (): Readonly<ResponseServiceOperators> => {
    return {
        response: useAppSelector(response),
    }
}

export default UseResponseService