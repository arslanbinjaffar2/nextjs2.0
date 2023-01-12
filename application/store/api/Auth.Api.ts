import { LoginPayload, PasswordResetPayload, ChooseProviderPayload, LoadProviderPayload, VerificationPayload, ResetPayload } from 'application/store/slices/Auth.Slice';

import { GeneralResponse } from 'application/models/GeneralResponse';

import makeApi from "application/utils/ConfigureAxios";

import { store } from 'application/store/Index'

const EventBaseUrl = `/event`

export const getLoginApi = (payload: LoginPayload): Promise<GeneralResponse> => {
    return makeApi(`${store.getState().env.api_base_url}`).post(`${EventBaseUrl}/${store.getState().event.event.url}/auth/login`, payload);
}

export const getUserApi = (): Promise<GeneralResponse> => {
    return makeApi(`${store.getState().env.api_base_url}`).get(`${EventBaseUrl}/${store.getState().event.event.url}/attendee/profile`);
}

export const getPasswordResetApi = (payload: PasswordResetPayload): Promise<GeneralResponse> => {
    return makeApi(`${store.getState().env.api_base_url}`).post(`${EventBaseUrl}/${store.getState().event.event.url}/auth/password/email`, payload);
}

export const getChooseProviderApi = (payload: ChooseProviderPayload): Promise<GeneralResponse> => {
    return makeApi(`${store.getState().env.api_base_url}`).post(`${EventBaseUrl}/${store.getState().event.event.url}/auth/verification/${payload.id}`, payload);
}

export const getResetApi = (payload: ResetPayload): Promise<GeneralResponse> => {
    return makeApi(`${store.getState().env.api_base_url}`).post(`${EventBaseUrl}/${store.getState().event.event.url}/auth/password/reset/${payload.token}`, payload);
}

export const getVerificationApi = (payload: VerificationPayload): Promise<GeneralResponse> => {
    return makeApi(`${store.getState().env.api_base_url}`).post(`${EventBaseUrl}/${store.getState().event.event.url}/auth/verification/${payload.id}`, payload);
}

export const getLoadProviderApi = (payload: LoadProviderPayload): Promise<GeneralResponse> => {
    return makeApi(`${store.getState().env.api_base_url}`).get(`${EventBaseUrl}/${store.getState().event.event.url}/auth/verification/${payload.id}?screen=${payload.screen}`);
}