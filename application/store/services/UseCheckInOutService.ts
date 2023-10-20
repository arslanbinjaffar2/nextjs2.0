import { useCallback } from 'react'

import { SelectCheckInOut,  CheckInOutActions,  } from 'application/store/slices/CheckInOut.Slice'

import { Attendee, Checkin, Setting, History } from 'application/models/checkInOut/CheckInOut'

import { useAppDispatch, useAppSelector } from 'application/store/Hooks'

export type CheckInOutServiceOperators = {
    checkInOut:{
        attendee: Attendee | null;
        setting: Setting  | null;
        history:History[];
        type_history: {event:History[],program:History[],group:History[],ticket:History[]};
        enableEvent: boolean;
        enableCheckinWithoutLocatiom: boolean;
        status: string;
        eventStatusMsg: string;
        checkin: Checkin | null;
        checkInOutSetting: Setting | null;
        qrCodeImgSrc:string;
    }
    FetchCheckInOut: () => void,
    SendQRCode: () => void,
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
            () => {
                dispatch(CheckInOutActions.FetchCheckInOut())
            },
            [dispatch],
        ),
        SendQRCode: useCallback(
            () => {
                dispatch(CheckInOutActions.SendQRCode())
            },
            [dispatch],
        ),
    }
}

export default UseCheckInOutService
