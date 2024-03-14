import { useCallback } from 'react'

import { SelectCheckInOut,  CheckInOutActions,  } from 'application/store/slices/CheckInOut.Slice'

import { Attendee, Checkin, Setting, History, GroupedHistory } from 'application/models/checkInOut/CheckInOut'

import { useAppDispatch, useAppSelector } from 'application/store/Hooks'

export type CheckInOutServiceOperators = {
    checkInOut:{
        attendee: Attendee | null;
        setting: Setting  | null;
        hasOrderItems: boolean;
        history:History[];
        type_history: {event:GroupedHistory[],program:GroupedHistory[],group:GroupedHistory[],ticket:GroupedHistory[]};
        enableEvent: boolean;
        enableCheckinWithoutLocatiom: boolean;
        status: string;
        eventStatusMsg: string;
        checkin: Checkin | null;
        checkInOutSetting: Setting | null;
        qrCodeImgSrc:string;
    }
    FetchCheckInOut: (payload:{showLoading:boolean}) => void,
    SendQRCode: () => void,
    DoCheckInOut: (payload: { attendee_id: number, organizer_id: number, action: string }) => void,
}

/**
 * AttendeeService custom-hooks
 * @see https://reactjs.org/docs/hooks-custom.html
*/
export const UseCheckInOutService = (): Readonly<CheckInOutServiceOperators> => {

    const dispatch = useAppDispatch()

    return {
        
        checkInOut: useAppSelector(SelectCheckInOut),
        FetchCheckInOut: useCallback(
            (payload:{showLoading:boolean}) => {
                dispatch(CheckInOutActions.FetchCheckInOut(payload))
            },
            [dispatch],
        ),
        SendQRCode: useCallback(
            () => {
                dispatch(CheckInOutActions.SendQRCode())
            },
            [dispatch],
        ),
        DoCheckInOut: useCallback(
            (payload: { attendee_id: number, organizer_id: number, action: string }) => {
                dispatch(CheckInOutActions.DoCheckInOut(payload))
            },
            [dispatch],
        ),
    }
}

export default UseCheckInOutService
