import { RootState } from 'application/store/Index'
import { GeneralResponse } from 'application/models/GeneralResponse';
import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

export interface LoginPayload {
    email: string;
    password: string;
}

export interface AuthState {
    isLoggedIn: boolean;
    logging?: boolean;
    currentUser?: GeneralResponse;
}

const initialState: AuthState = {
    isLoggedIn: false,
    logging: false,
    currentUser: {},
};

const AuthSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login(state, action: PayloadAction<LoginPayload>) {
            state.logging = true;
        },
        loginSuccess(state, action: PayloadAction<GeneralResponse>) {
            state.isLoggedIn = true;
            state.logging = false;
            state.currentUser = action.payload;
        },
        loginFailed(state, action: PayloadAction<GeneralResponse>) {
            state.logging = false;
            console.log(action.payload);
        },
        logout(state) {
            state.isLoggedIn = false;
            state.currentUser = undefined;
        },
    },
});

// Actions
export const AuthActions = AuthSlice.actions;

// Selectors
export const selectIsLoggedIn = (state: RootState) => state.auth.isLoggedIn;

export const selectIsLogging = (state: RootState) => state.auth.logging;

// Reducer
const authReducer = AuthSlice.reducer;

export default authReducer;