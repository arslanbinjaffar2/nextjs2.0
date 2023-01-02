import { Env } from 'application/config/Env';

import { LoginPayload, PasswordResetPayload, ChooseProviderPayload, LoadProviderPayload, VerificationPayload } from 'application/store/slices/Auth.Slice';

import { GeneralResponse } from 'application/models/GeneralResponse';

import makeApi from "application/utils/ConfigureAxios";

import { store } from 'application/store/Index'

const api = makeApi(`${Env.API_BASE_URL}`);

const EventBaseUrl = `/event`

export const getLoginApi = (payload: LoginPayload): Promise<GeneralResponse> => {
    return api.post(`${EventBaseUrl}/${store.getState().event.event.url}/auth/login`, payload);
}

export const getUserApi = (): Promise<GeneralResponse> => {
    return api.get(`${EventBaseUrl}/${store.getState().event.event.url}/attendee/profile`);
}

export const getPasswordResetApi = (payload: PasswordResetPayload): Promise<GeneralResponse> => {
    return api.post(`${EventBaseUrl}/${store.getState().event.event.url}/auth/password/email`, payload);
}

export const getChooseProviderApi = (payload: ChooseProviderPayload): Promise<GeneralResponse> => {
    return api.post(`${EventBaseUrl}/${store.getState().event.event.url}/auth/verification/${payload.id}`, payload);
}

export const getVerificationApi = (payload: VerificationPayload): Promise<GeneralResponse> => {
    return api.postForm(`${EventBaseUrl}/${store.getState().event.event.url}/auth/verification/${payload.id}`, payload);
}

export const getLoadProviderApi = (payload: LoadProviderPayload): Promise<GeneralResponse> => {
    return api.get(`${EventBaseUrl}/${store.getState().event.event.url}/auth/verification/${payload.id}?screen=${payload.screen}`);
}