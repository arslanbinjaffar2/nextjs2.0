import { RootState } from 'application/store/Index'
import { GeneralResponse } from 'application/models/GeneralResponse';
import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice, createAction } from '@reduxjs/toolkit';

export interface LoginPayload {
    email: string;
    password: string;
}

export interface PasswordResetRequestPayload {
    email: string;
}

export interface AuthState {
    isLoggedIn: boolean;
    processing?: boolean;
    currentUser: GeneralResponse;
    error: string;
}

const initialState: AuthState = {
    isLoggedIn: false,
    processing: false,
    currentUser: {},
    error: '',
};

const AuthSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login(state, action: PayloadAction<LoginPayload>) {
            state.processing = true;
        },
        passwordResetRequest(state, action: PayloadAction<PasswordResetRequestPayload>) {
            state.processing = true;
        },
        getUser(state) {
            state.processing = true;
        },
        loginSuccess(state, action: PayloadAction<GeneralResponse>) {
            state.isLoggedIn = true;
            state.processing = false;
            state.currentUser = action.payload;
        },
        loginFailed(state, action: PayloadAction<string>) {
            state.processing = false;
            state.error = action.payload;
        },
        logout(state) {
            state.isLoggedIn = false;
            state.currentUser = {};
        },
    },
});

// Actions
export const AuthActions = {
    login: AuthSlice.actions.login,
    passwordResetRequest: AuthSlice.actions.passwordResetRequest,
    getUser: AuthSlice.actions.getUser,
    loginSuccess: AuthSlice.actions.loginSuccess,
    loginFailed: AuthSlice.actions.loginFailed,
    logout: AuthSlice.actions.logout,
}

// Selectors
export const selectIsLoggedIn = (state: RootState) => state.auth.isLoggedIn;

export const isProcessing = (state: RootState) => state.auth.processing;

export const currentUser = (state: RootState) => state.auth.currentUser;

export const error = (state: RootState) => state.auth.error;

// Reducer
const authReducer = AuthSlice.reducer;

export default authReducer;