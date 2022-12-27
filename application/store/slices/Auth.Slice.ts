import { RootState } from 'application/store/Index'
import { GeneralResponse } from 'application/models/GeneralResponse';
import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice, createAction } from '@reduxjs/toolkit';

export interface LoginPayload {
    email: string;
    password: string;
}

export interface AuthState {
    isLoggedIn: boolean;
    logging?: boolean;
    currentUser: GeneralResponse;
    error: string;
}

const initialState: AuthState = {
    isLoggedIn: false,
    logging: false,
    currentUser: {},
    error: '',
};

const AuthSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login(state, action: PayloadAction<LoginPayload>) {
            state.logging = true;
        },
        getUser(state) {
            state.logging = true;
        },
        loginSuccess(state, action: PayloadAction<GeneralResponse>) {
            state.isLoggedIn = true;
            state.logging = false;
            state.currentUser = action.payload;
        },
        loginFailed(state, action: PayloadAction<string>) {
            state.logging = false;
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
    getUser: AuthSlice.actions.getUser,
    loginSuccess: AuthSlice.actions.loginSuccess,
    loginFailed: AuthSlice.actions.loginFailed,
    logout: AuthSlice.actions.logout,
}

// Selectors
export const selectIsLoggedIn = (state: RootState) => state.auth.isLoggedIn;

export const selectIsLogging = (state: RootState) => state.auth.logging;

export const currentUser = (state: RootState) => state.auth.currentUser;

export const error = (state: RootState) => state.auth.error;

// Reducer
const authReducer = AuthSlice.reducer;

export default authReducer;