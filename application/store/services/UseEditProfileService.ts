import { useCallback } from 'react'

import { EditProfileActions, SelectAttendee, SelectCountries, SelectEventLanguageDetails, SelectCallingCodes, SelectEventFoodDisclaimers, SelectAttendeeFeildSettings, SelectCustomFields, SelectLanguages, SelectEnableCancel, SelectOrderAttendeeCount, SelectSettings, SelectLabels,  } from 'application/store/slices/EditProfile.Slice'

import {   } from 'application/models/settings/EditProfile'

import { useAppDispatch, useAppSelector } from 'application/store/Hooks'
import { Attendee, Attendeefeildsettings, CallingCode, Country, Eventfooddisclaimer, Eventlanguagedetail, Labels, Settings } from '../../models/settings/EditProfile'

export type EditProfileServiceOperators = {
    attendee: Attendee | null;
    countries: Country[];
    event_language_details: Eventlanguagedetail[];
    callingCodes: CallingCode[];
    event_food_disclaimers: Eventfooddisclaimer[];
    attendee_feild_settings: Attendeefeildsettings | null;
    customFields: any[];
    languages: Country[];
    enable_cancel: boolean;
    order_attendee_count: number;
    settings: Settings | null;
    labels: Labels | null;
    FetchEditProfiles: () => void,
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
        FetchEditProfiles: useCallback(
            () => {
                dispatch(EditProfileActions.FetchEditProfileData())
            },
            [dispatch],
        ),
    }
}

export default UseEditProfileService
