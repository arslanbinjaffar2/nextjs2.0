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
            if (action.payload.displaySubregistration === 'no' || action.payload.questions == undefined || action.payload.questions.question.length <= 0 || action.payload.settings['show_sub_registration_on_web_app'] === 0) {
                    state.skip=true;
                    if (Platform.OS === 'web') {
                        localStorage.setItem('skip_sub_reg', 'true');
                    } else {
                        AsyncStorageClass.setItem('skip_sub_reg', 'true');
                    }
            }else{
                state.afterLogin = {...action.payload, show_skip_button : action.payload.questions.question.find((question)=>(question.required_question === '1')) ? false : true };
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
            if (Platform.OS === 'web') {
                localStorage.setItem('skip_sub_reg', 'true');
            } else {
                AsyncStorageClass.setItem('skip_sub_reg', 'true');
            }
        },
        setSkip(state){
            state.skip = true;
            if (Platform.OS === 'web') {
                localStorage.setItem('skip_sub_reg', 'true');
            } else {
                AsyncStorageClass.setItem('skip_sub_reg', 'true');
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
    setSkip:SubRegistrationSlice.actions.setSkip,
}
export const SelectSubRegistrationAfterLogin = (state: RootState) => state.subRegistration.afterLogin
export const SelectSubRegistrationMySubreg = (state: RootState) => state.subRegistration.mySubReg
export const SelectSubRegistrationSubmitting = (state: RootState) => state.subRegistration.submitting
export const SelectSubRegistrationSkip = (state: RootState) => state.subRegistration.skip




// Reducer
export default SubRegistrationSlice.reducer