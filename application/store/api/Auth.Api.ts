/* eslint-disable @typescript-eslint/no-explicit-any */
import { Env } from 'application/config/Env';

import { LoginPayload } from 'application/store/slices/Auth.Slice';

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