import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { Attendee, Country, Eventlanguagedetail, Eventfooddisclaimer, CallingCode, Attendeefeildsettings, Setting, Labels, EditProfileResponse } from 'application/models/settings/EditProfile'

import { RootState } from 'application/store/Index'

import {
    current
} from '@reduxjs/toolkit';

export interface EditProfileState {
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
    settings: Setting[] | null;
    labels: Labels | null;
    updatingAttendee:boolean
}

const initialState: EditProfileState = {
    attendee: null,
    countries: [],
    event_language_details: [],
    callingCodes: [],
    event_food_disclaimers: [],
    attendee_feild_settings: null,
    customFields: [],
    languages: [],
    enable_cancel: false,
    order_attendee_count: 0,
    settings: [],
    labels: null,
    updatingAttendee:false
}

// Slice
export const EditProfileSlice = createSlice({
    name: 'editProfiles',
    initialState,
    reducers: {
        FetchEditProfileData() {},
        update(state, action: PayloadAction<EditProfileResponse>) {
            state.attendee = action.payload.attendee
            state.countries = action.payload.countries
            state.event_language_details = action.payload.event_language_details
            state.callingCodes = action.payload.callingCodes
            state.event_food_disclaimers = action.payload.event_food_disclaimers
            state.attendee_feild_settings = action.payload.attendee_feild_settings
            state.customFields = action.payload.customFields
            state.languages = action.payload.languages
            state.enable_cancel = action.payload.enable_cancel
            state.order_attendee_count = action.payload.order_attendee_count
            state.settings = action.payload.settings
            state.labels = action.payload.labels
        },
        UpdateAttendee(state, action: PayloadAction<any>){
            state.updatingAttendee = true
        },
        AttendeeUpdatedSuccessfully(state){
            state.updatingAttendee = false
        },

    },
})

// Actions
export const EditProfileActions = {
    FetchEditProfileData:EditProfileSlice.actions.FetchEditProfileData,
    update:EditProfileSlice.actions.update,
    UpdateAttendee:EditProfileSlice.actions.UpdateAttendee,
    AttendeeUpdatedSuccessfully:EditProfileSlice.actions.AttendeeUpdatedSuccessfully,
}

export const SelectAttendee = (state: RootState) => state.editProfiles.attendee
export const SelectCountries = (state: RootState) => state.editProfiles.countries
export const SelectEventLanguageDetails = (state: RootState) => state.editProfiles.event_language_details
export const SelectCallingCodes = (state: RootState) => state.editProfiles.callingCodes
export const SelectEventFoodDisclaimers = (state: RootState) => state.editProfiles.event_food_disclaimers
export const SelectAttendeeFeildSettings = (state: RootState) => state.editProfiles.attendee_feild_settings
export const SelectCustomFields = (state: RootState) => state.editProfiles.customFields
export const SelectLanguages = (state: RootState) => state.editProfiles.languages
export const SelectEnableCancel = (state: RootState) => state.editProfiles.enable_cancel
export const SelectOrderAttendeeCount = (state: RootState) => state.editProfiles.order_attendee_count
export const SelectSettings = (state: RootState) => state.editProfiles.settings
export const SelectLabels = (state: RootState) => state.editProfiles.labels
export const SelectUpdatingAttendee = (state: RootState) => state.editProfiles.updatingAttendee


// Reducer
export default EditProfileSlice.reducer