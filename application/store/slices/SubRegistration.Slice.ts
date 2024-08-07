import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { AfterLogin, Allprogram, Questions, Settings } from 'application/models/subRegistration/SubRegistration'

import { RootState } from 'application/store/Index'

import {
    current
} from '@reduxjs/toolkit';
import { Platform } from 'react-native';
import AsyncStorageClass from '../../utils/AsyncStorageClass';

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
        show_skip_button:boolean;
    },
    mySubReg:any,
    submitting:boolean;
    sucess_message:boolean;
    page_scroll:boolean;
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
        show_skip_button:false,
    },
    submitting:false,
    sucess_message:false,
    page_scroll:true,
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
        update(state, action: PayloadAction<{afterLogin:AfterLogin,event_url:string}>) {
            if (action.payload.afterLogin.displaySubregistration === 'no' || action.payload.afterLogin.questions == undefined || action.payload.afterLogin.questions.question.length <= 0 || action.payload.afterLogin.settings['show_sub_registration_on_web_app'] === 0) {
                    state.skip=true;
                    if (Platform.OS === 'web') {
                        localStorage.setItem(`skip_sub_reg_${action.payload.event_url}`, 'true');
                    } else {
                        AsyncStorageClass.setItem(`skip_sub_reg_${action.payload.event_url}`, 'true');
                    }
            }else{
                state.afterLogin = {...action.payload.afterLogin, show_skip_button : action.payload.afterLogin.questions.question.find((question)=>(question.required_question === '1')) ? false : true };
            }
        },
        FetchMySubRegistration() {},
        updateMySubRegistration(state, action: PayloadAction<AfterLogin>) {
            state.mySubReg = action.payload;
        },
        SaveSubRegistration(state, action: PayloadAction<any>) {
            state.submitting=true
        },
        SubmitPageScroll(state, action: PayloadAction<any>){
            state.page_scroll = action.payload
        },
        SubmitSuccess(state, action: PayloadAction<{event_url:string}>){
            state.submitting = false;
            state.sucess_message=true;
            if (Platform.OS === 'web') {
                localStorage.setItem(`skip_sub_reg_${action.payload.event_url}`, 'true');
            } else {
                AsyncStorageClass.setItem(`skip_sub_reg_${action.payload.event_url}`, 'true');
            }
        },
        setSkip(state, action: PayloadAction<{event_url:string}>){
            state.skip = true;
            if (Platform.OS === 'web') {
                localStorage.setItem(`skip_sub_reg_${action.payload.event_url}`, 'true');
            } else {
                AsyncStorageClass.setItem(`skip_sub_reg_${action.payload.event_url}`, 'true');
            }
        },
        clearState(state, action: PayloadAction<{event_url:string}>){
            state.afterLogin= {
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
                show_skip_button:false,
            };
            state.submitting=false;
            state.sucess_message=false
            state.redirect='';
            state.skip=false;
            state.mySubReg=null;
            if (Platform.OS === 'web') {
                localStorage.removeItem(`skip_sub_reg_${action.payload.event_url}`);
            } else {
                AsyncStorageClass.removeItem(`skip_sub_reg_${action.payload.event_url}`);
            }
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
    SubmitPageScroll:SubRegistrationSlice.actions.SubmitPageScroll,
    setSkip:SubRegistrationSlice.actions.setSkip,
    clearState:SubRegistrationSlice.actions.clearState,
}
export const SelectSubRegistrationAfterLogin = (state: RootState) => state.subRegistration.afterLogin
export const SelectSubRegistrationMySubreg = (state: RootState) => state.subRegistration.mySubReg
export const SelectSubRegistrationSubmitting = (state: RootState) => state.subRegistration.submitting
export const sucessMessageSubmitting = (state: RootState) => state.subRegistration.sucess_message
export const sucessPageScrolling = (state: RootState) => state.subRegistration.page_scroll
export const SelectSubRegistrationSkip = (state: RootState) => state.subRegistration.skip




// Reducer
export default SubRegistrationSlice.reducer