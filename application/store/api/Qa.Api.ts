import makeApi from "application/utils/ConfigureAxios";

import { HttpResponse } from 'application/models/GeneralResponse';

const baseUrl = `/event`

export const getQaProgramListingApi = (payload: any, state: any): Promise<HttpResponse> => {
    return makeApi(`${state?.env?.api_base_url}`).post(`${baseUrl}/${state?.event?.event.url}/qa/agenda-listing`);
}

export const getQaProgramDetailApi = (payload: any, state: any): Promise<HttpResponse> => {
    return makeApi(`${state?.env?.api_base_url}`).post(`${baseUrl}/${state?.event?.event.url}/qa/agenda-detail/${payload.id}`);
}

export const getQaTabListingsApi = (payload: any, state: any): Promise<HttpResponse> => {
    return makeApi(`${state?.env?.api_base_url}`).post(`${baseUrl}/${state?.event?.event.url}/qa/tab-question-listings/${payload.id}`);
}
