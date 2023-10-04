import { Event } from 'application/models/Event';

import makeApi from "application/utils/ConfigureAxios";

import { HttpResponse } from 'application/models/GeneralResponse';

const EventBaseUrl = `/event`

export const getEventApi = (payload: any, state: any): Promise<HttpResponse> => {
    return makeApi(`${state?.env?.api_base_url}`).get(`${EventBaseUrl}/${payload}`);
}

export const getEventByCodeApi = (payload: any, state: any): Promise<HttpResponse> => {
    return makeApi(`${state?.env?.api_base_url}`).get(`${EventBaseUrl}/${payload}/get-event-by-code`);
}

export const getModulesApi = (state: any): Promise<HttpResponse> => {
    return makeApi(`${state?.env?.api_base_url}`).get(`${EventBaseUrl}/${state?.event?.event.url}/event/app-modules`);
}

export const getSettingModulesApi = (state: any): Promise<HttpResponse> => {
    return makeApi(`${state?.env?.api_base_url}`).get(`${EventBaseUrl}/${state?.event?.event.url}/event/app-settings-modules`);
}