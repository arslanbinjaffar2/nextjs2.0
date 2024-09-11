import { RootState } from 'application/store/Index'
import { GeneralResponse } from 'application/models/GeneralResponse';
import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice, createAction } from '@reduxjs/toolkit';
import AsyncStorageClass from 'application/utils/AsyncStorageClass';
import { Platform } from 'react-native';
export interface LoginPayload {
    email: string;
    password: string;
}

export interface PasswordResetPayload {
    email: string;
}

export interface LoadProviderPayload {
    id: number;
    screen: string;
}

export interface ChooseProviderPayload {
    id: number;
    provider: string;
    screen: string;
}

export interface ResetPayload {
    password: string;
    password_confirmation: string;
    token: string;
}

export interface VerificationPayload {
    id: number;
    authentication_id: number;
    code?: string;
    screen?: string;
    provider?: string;
}

export interface AuthState {
    isLoggedIn: boolean;
    processing?: boolean;
    disclaimerStatus: boolean;
    response: GeneralResponse;
    onboarding: any;
    error: string;
}

const initialState: AuthState = {
    isLoggedIn: false,
    processing: false,
    disclaimerStatus: false,
    response: {},
    onboarding: {},
    error: '',
};

const AuthSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login(state, action: PayloadAction<LoginPayload>) {
            state.processing = true;
        },
        logout(state) {
            state.processing = true;
        },
        passwordReset(state, action: PayloadAction<PasswordResetPayload>) {
            state.processing = true;
        },
        chooseProvider(state, action: PayloadAction<ChooseProviderPayload>) {
            state.processing = true;
        },
        reset(state, action: PayloadAction<ResetPayload>) {
            state.processing = true;
        },
        verification(state, action: PayloadAction<VerificationPayload>) {
            state.processing = true;
        },
        loadProvider(state, action: PayloadAction<LoadProviderPayload>) {
            state.processing = true;
        },
        getUser(state) {
            state.processing = true;
        },
        success(state, action: PayloadAction<{response:GeneralResponse,event_url:string}>) {
            state.processing = false;
            state.response = action.payload.response;
            const event_url=action?.payload?.event_url;
            let onboarding = action.payload.response.data?.user?.onboarding;
            if(!onboarding){
                onboarding = {}
            }

            if (Platform.OS === 'web') {
                const skipSubReg = localStorage.getItem(`skip_sub_reg_${event_url}`) === 'true';
                const keywordSkip = localStorage.getItem(`keyword_skip_${event_url}`) === 'true';

                if (skipSubReg) {
                    onboarding.show_subregistration = false;
                }

                if (keywordSkip) {
                    onboarding.show_network_intrest = false;
                }
            } else {
                let skipSubReg = false;
                let keywordSkip = false;

                AsyncStorageClass.getItem(`skip_sub_reg_${event_url}`).then(value => {
                    skipSubReg = value === 'true';
                });

                AsyncStorageClass.getItem(`keyword_skip_${event_url}`).then(value => {
                    keywordSkip = value === 'true';
                });

                if (skipSubReg) {
                    onboarding.show_subregistration = false;
                }

                if (keywordSkip) {
                    onboarding.show_network_intrest = false;
                }
            }

            state.onboarding = onboarding;
            state.error = '';
            
            if (action?.payload?.response.data?.access_token !== undefined) {
                if (Platform.OS === 'web') {
                    localStorage.setItem(`access_token_${event_url}`, action?.payload?.response.data.access_token);
                } else {
                    AsyncStorageClass.setItem(`access_token_${event_url}`, action?.payload?.response.data.access_token);
                }
                state.isLoggedIn = true;
            }
            else if(action?.payload?.response.data?.user !== undefined){
                state.isLoggedIn = true;
            }
        },
        failed(state, action: PayloadAction<string>) {
            state.processing = false;
            state.error = action.payload;
        },
        clearToken(state,action: PayloadAction<string>) {
            state.isLoggedIn = false;
            state.processing = false;
            state.response = { redirect: 'login' };
            const event_url=action.payload;
            if (Platform.OS === 'web') {
                localStorage.removeItem(`access_token_${event_url}`);
            } else {
                AsyncStorageClass.removeItem(`access_token_${event_url}`);
            }
        },
        loadToken(state, action: PayloadAction<boolean>) {
            state.isLoggedIn = action.payload;
        },
        reloadPage(state) {
            // reload current page to refresh data
            if (Platform.OS === 'web') {
                window.location.reload();
            }
        },
        disclaimerStatusUpdated(state, action: PayloadAction<boolean>) {
            state.disclaimerStatus = action.payload;
        },
        updateOnboarding(state, action: PayloadAction<any>) {
            state.onboarding = {
                ...state.onboarding,
                ...action.payload
            };
        },
        loginWithToken(state, action: PayloadAction<{ token: string }>) {
            state.processing = true;
        },
    },
});

// Actions
export const AuthActions = {
    login: AuthSlice.actions.login,
    passwordReset: AuthSlice.actions.passwordReset,
    chooseProvider: AuthSlice.actions.chooseProvider,
    reset: AuthSlice.actions.reset,
    verification: AuthSlice.actions.verification,
    loadProvider: AuthSlice.actions.loadProvider,
    getUser: AuthSlice.actions.getUser,
    success: AuthSlice.actions.success,
    failed: AuthSlice.actions.failed,
    logout: AuthSlice.actions.logout,
    loadToken: AuthSlice.actions.loadToken,
    clearToken: AuthSlice.actions.clearToken,
    reloadPage: AuthSlice.actions.reloadPage,
    disclaimerStatusUpdated: AuthSlice.actions.disclaimerStatusUpdated,
    updateOnboarding: AuthSlice.actions.updateOnboarding,
    loginWithToken: AuthSlice.actions.loginWithToken,
}

// Selectors
export const selectIsLoggedIn = (state: RootState) => state.auth.isLoggedIn;

export const isProcessing = (state: RootState) => state.auth.processing;

export const response = (state: RootState) => state.auth.response;

export const onboarding = (state: RootState) => state.auth.onboarding;

export const error = (state: RootState) => state.auth.error;

export const disclaimerStatus = (state: RootState) => state.auth.disclaimerStatus;

// Reducer
const authReducer = AuthSlice.reducer;

export default authReducer;