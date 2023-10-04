import makeApi from "application/utils/ConfigureAxios";

import { HttpResponse } from 'application/models/GeneralResponse';

const baseUrl = `/event`

export const getInfoApi = (payload: { id: number, type: string }, state: any): Promise<HttpResponse> => {
    return makeApi(`${state?.env?.api_base_url}`).get(`${baseUrl}/${state?.event?.event.url}/info/listing/${payload.type}/${payload.id}`);
}

export const getPageApi = (payload: { id: number, type: string }, state: any): Promise<HttpResponse> => {
    return makeApi(`${state?.env?.api_base_url}`).get(`${baseUrl}/${state?.event?.event.url}/info/detail/${payload.type}/${payload.id}`);
}