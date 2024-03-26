import { useCallback } from 'react'

import { EditProfileActions, SelectAttendee, SelectCountries, SelectEventLanguageDetails, SelectCallingCodes, SelectEventFoodDisclaimers, SelectAttendeeFeildSettings, SelectCustomFields, SelectLanguages, SelectEnableCancel, SelectOrderAttendeeCount, SelectSettings, SelectLabels, SelectUpdatingAttendee, Selectsuccess_message,  } from 'application/store/slices/EditProfile.Slice'

import { Language } from 'application/models/settings/EditProfile'

import { useAppDispatch, useAppSelector } from 'application/store/Hooks'
import { Attendee, Attendeefeildsettings, CallingCode, Country, Eventfooddisclaimer, Eventlanguagedetail, Labels, Setting } from '../../models/settings/EditProfile'

export type EditProfileServiceOperators = {
    attendee: Attendee | null;
    countries: Country[];
    event_language_details: Eventlanguagedetail[];
    callingCodes: CallingCode[];
    event_food_disclaimers: Eventfooddisclaimer[];
    attendee_feild_settings: Attendeefeildsettings | null;
    customFields: any[];
    languages: Language[];
    enable_cancel: boolean;
    order_attendee_count: number;
    settings: Setting[] | null;
    labels: Labels | null;
    updatingAttendee:boolean;
    success_message:boolean;
    FetchEditProfiles: () => void;
    UpdateAttendee: (data:any) => void;
    UpdateSuccess: (data:any) => void;
}

/**
 * AttendeeService custom-hooks
 * @see https://reactjs.org/docs/hooks-custom.html
*/
export const UseEditProfileService = (): Readonly<EditProfileServiceOperators> => {

    const dispatch = useAppDispatch()

    return {
        
        attendee: useAppSelector(SelectAttendee),
        countries: useAppSelector(SelectCountries),
        event_language_details: useAppSelector(SelectEventLanguageDetails),
        callingCodes: useAppSelector(SelectCallingCodes),
        event_food_disclaimers: useAppSelector(SelectEventFoodDisclaimers),
        attendee_feild_settings: useAppSelector(SelectAttendeeFeildSettings),
        customFields: useAppSelector(SelectCustomFields),
        languages: useAppSelector(SelectLanguages),
        enable_cancel: useAppSelector(SelectEnableCancel),
        order_attendee_count:useAppSelector(SelectOrderAttendeeCount),
        settings: useAppSelector(SelectSettings),
        labels: useAppSelector(SelectLabels),
        updatingAttendee: useAppSelector(SelectUpdatingAttendee),
        success_message: useAppSelector(Selectsuccess_message),
        FetchEditProfiles: useCallback(
            () => {
                dispatch(EditProfileActions.FetchEditProfileData())
            },
            [dispatch],
        ),
        UpdateAttendee: useCallback(
            (payload:any) => {
                dispatch(EditProfileActions.UpdateAttendee(payload))
            },
            [dispatch],
        ),
        UpdateSuccess: useCallback(
            (payload:any) => {
                dispatch(EditProfileActions.UpdateSuccess(payload))
            },
            [dispatch],
        ),
    }
}

export default UseEditProfileService
