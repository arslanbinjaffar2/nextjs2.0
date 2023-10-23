import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { AfterLogin, Allprogram, Questions, Settings } from 'application/models/subRegistration/SubRegistration'

import { RootState } from 'application/store/Index'

import {
    current
} from '@reduxjs/toolkit';

export interface SubRegistrationState {
    afterLogin:{
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
    submitting:boolean;
    redirect:string,
    skip:boolean,
}

const initialState: SubRegistrationState = {
    afterLogin: {
        labels: [],
        settings: null,
        questions: null,
        skip_msg: 0,
        alert_label: '',
        error_msg: '',
        first_time: '',
        min_alert_label: '',
        displaySubregistration: '',
        all_programs: [],
    },
    submitting:false,
    redirect:'',
    skip:false,
    mySubReg:null,
}

// Slice
export const SubRegistrationSlice = createSlice({
    name: 'subRegistration',
    initialState,
    reducers: {
        FetchSubRegistrationAfterLogin() {},
        update(state, action: PayloadAction<AfterLogin>) {
            state.afterLogin = action.payload;
            if (action.payload.questions == undefined || action.payload.questions.question.length <= 0 || action.payload.settings['show_sub_registration_on_web_app'] === 0) {
                state.skip=true;
            }
        },
        FetchMySubRegistration() {},
        updateMySubRegistration(state, action: PayloadAction<AfterLogin>) {
            state.mySubReg = action.payload;
        },
        SaveSubRegistration(state, action: PayloadAction<any>) {
            state.submitting=true
        },
        SubmitSuccess(state){
            state.submitting = false;
            redirect:'dashboard';
        },
        setSkip(state){
            state.skip = true;
        }
    },
})

// Actions
export const SubRegistrationActions = {
    FetchSubRegistrationAfterLogin:SubRegistrationSlice.actions.FetchSubRegistrationAfterLogin,
    FetchMySubRegistration:SubRegistrationSlice.actions.FetchMySubRegistration,
    update:SubRegistrationSlice.actions.update,
    updateMySubRegistration:SubRegistrationSlice.actions.updateMySubRegistration,
    SaveSubRegistration:SubRegistrationSlice.actions.SaveSubRegistration,
    SubmitSuccess:SubRegistrationSlice.actions.SubmitSuccess,
    setSkip:SubRegistrationSlice.actions.setSkip,
}
export const SelectSubRegistrationAfterLogin = (state: RootState) => state.subRegistration.afterLogin
export const SelectSubRegistrationMySubreg = (state: RootState) => state.subRegistration.mySubReg
export const SelectSubRegistrationSubmitting = (state: RootState) => state.subRegistration.submitting
export const SelectSubRegistrationSkip = (state: RootState) => state.subRegistration.skip




// Reducer
export default SubRegistrationSlice.reducer