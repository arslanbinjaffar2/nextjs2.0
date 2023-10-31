import makeApi from "application/utils/ConfigureAxios";

import { HttpResponse } from 'application/models/GeneralResponse';

const baseUrl = `/event`

export const getNetworkInterestApi = (payload: any, state: any): Promise<HttpResponse> => {
    return makeApi(`${state?.env?.api_base_url}`).get(`${baseUrl}/${state?.event?.event.url}/network-interest`);
}

export const saveNetworkInterestApi = (payload: any, state: any): Promise<HttpResponse> => {
    return makeApi(`${state?.env?.api_base_url}`).put(`${baseUrl}/${state?.event?.event.url}/network-interest/update`, {keywords:payload});
}
