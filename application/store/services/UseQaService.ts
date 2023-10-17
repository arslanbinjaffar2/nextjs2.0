import { useCallback } from 'react'

import { SelectPrograms, QaActions, SelectProgramSettings, SelectQaSettings,  } from 'application/store/slices/Qa.Slice'

import { Program, ProgramSettings, QaSettings } from 'application/models/qa/Qa'

import { useAppDispatch, useAppSelector } from 'application/store/Hooks'

export type QaServiceOperators = {
    programs: Program[],
    programSettings:ProgramSettings | null
    qaSettings:QaSettings | null
    FetchPrograms: () => void,
}

/**
 * AttendeeService custom-hooks
 * @see https://reactjs.org/docs/hooks-custom.html
*/
export const UseQaService = (): Readonly<QaServiceOperators> => {

    const dispatch = useAppDispatch()

    return {
        
        programs: useAppSelector(SelectPrograms),
        programSettings: useAppSelector(SelectProgramSettings),
        qaSettings: useAppSelector(SelectQaSettings),
        FetchPrograms: useCallback(
            () => {
                dispatch(QaActions.OnFetchPrograms())
            },
            [dispatch],
        ),
    }
}

export default UseQaService
