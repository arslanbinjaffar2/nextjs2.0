import { useCallback } from 'react'

import { SelectSubRegistrationAfterLogin,  SelectSubRegistrationMySubreg,  SelectSubRegistrationSkip,  SelectSubRegistrationSubmitting,  SubRegistrationActions,  } from 'application/store/slices/SubRegistration.Slice'

import {  AfterLogin, Allprogram, Questions, Settings } from 'application/models/subRegistration/SubRegistration'

import { useAppDispatch, useAppSelector } from 'application/store/Hooks'

export type SubRegistrationServiceOperators = {
    afterLogin: {
        settings: Settings | null;
        labels: any[];
        questions: Questions | null;
        skip_msg: number;
        alert_label: string;
        error_msg: string;
        first_time: string;
        min_alert_label: string;
        displaySubregistration: string;
        all_programs: Allprogram[];
    },
    mySubReg:any,
    submitting:boolean,
    skip:boolean,
    FetchSubRegistrationAfterLogin: () => void
    FetchMySubRegistration: () => void
    setSkip: () => void
    SaveSubRegistration: (payload:any) => void
}

/**
 * AttendeeService custom-hooks
 * @see https://reactjs.org/docs/hooks-custom.html
*/
export const UseSubRegistrationService = (): Readonly<SubRegistrationServiceOperators> => {

    const dispatch = useAppDispatch()

    return {
        
        afterLogin: useAppSelector(SelectSubRegistrationAfterLogin),
        mySubReg: useAppSelector(SelectSubRegistrationMySubreg),
        submitting: useAppSelector(SelectSubRegistrationSubmitting),
        skip: useAppSelector(SelectSubRegistrationSkip),
        FetchSubRegistrationAfterLogin: useCallback(
            () => {
                dispatch(SubRegistrationActions.FetchSubRegistrationAfterLogin())
            },
            [dispatch],
        ),
        FetchMySubRegistration: useCallback(
            () => {
                dispatch(SubRegistrationActions.FetchMySubRegistration())
            },
            [dispatch],
        ),
        SaveSubRegistration: useCallback(
            (payload:any) => {
                dispatch(SubRegistrationActions.SaveSubRegistration(payload))
            },
            [dispatch],
        ),
        setSkip: useCallback(
            () => {
                dispatch(SubRegistrationActions.setSkip())
            },
            [dispatch],
        ),
    }
}

export default UseSubRegistrationService
