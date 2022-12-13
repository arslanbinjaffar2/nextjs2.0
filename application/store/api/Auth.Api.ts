/* eslint-disable @typescript-eslint/no-explicit-any */
import { Env } from 'application/config/Env';

import { LoginPayload } from 'application/store/slices/Auth.Slice';

import { Event } from 'application/models/Event';

import { GeneralResponse } from 'application/models/GeneralResponse';

import makeApi from "application/utils/ConfigureAxios";

const api = makeApi(`${Env.API_BASE_URL}`);

const EventBaseUrl = `/event`

export const getLoginApi = (payload: LoginPayload): Promise<GeneralResponse> => {
    return api.post(`${EventBaseUrl}/auth/login`, payload);
}

export const updateEventApi = (event: Event): Promise<Event> => api.put(`${EventBaseUrl}/${event.id}`, event)