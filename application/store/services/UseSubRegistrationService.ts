import { useCallback } from 'react'

import { SelectSubRegistrationAfterLogin,  SelectSubRegistrationLimitErrors,  SelectSubRegistrationMySubreg,  SelectSubRegistrationSkip,  SelectSubRegistrationSubmitting,  SubRegistrationActions, sucessMessageSubmitting, sucessPageScrolling } from 'application/store/slices/SubRegistration.Slice'

import {  AfterLogin, Allprogram, Questions, Settings } from 'application/models/subRegistration/SubRegistration'

import { useAppDispatch, useAppSelector } from 'application/store/Hooks'

export type SubRegistrationServiceOperators = {
    afterLogin: {
        settings: Settings | null;
        labels: any;
        questions: Questions | null;
        skip_msg: number;
        alert_label: string;
        error_msg: string;
        first_time: string;
        min_alert_label: string;
        displaySubregistration: string;
        all_programs: Allprogram[];
        show_skip_button:boolean
    },
    mySubReg:any,
    submitting:boolean,
    sucess_message:boolean,
    page_scroll:boolean,
    skip:boolean,
    limit_errors:any,
    FetchSubRegistrationAfterLogin: () => void
    FetchMySubRegistration: () => void
    SubmitPageScroll: (payload:any) => void
    setSkip: () => void
    SaveSubRegistration: (payload:any) => void
    setLimitErrors: (payload:any) => void
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
        sucess_message: useAppSelector(sucessMessageSubmitting),
        page_scroll: useAppSelector(sucessPageScrolling),
        skip: useAppSelector(SelectSubRegistrationSkip),
        limit_errors: useAppSelector(SelectSubRegistrationLimitErrors),
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
        SubmitPageScroll: useCallback(
            (payload:any) => {
                dispatch(SubRegistrationActions.SubmitPageScroll(payload))
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
        setLimitErrors: useCallback(
            (payload:any) => {
                dispatch(SubRegistrationActions.setLimitErrors(payload))
            },
            [dispatch],
        ),
    }
}

export default UseSubRegistrationService
