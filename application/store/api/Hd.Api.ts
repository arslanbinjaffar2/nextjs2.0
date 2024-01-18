import makeApi from "application/utils/ConfigureAxios";

import { HttpResponse } from 'application/models/GeneralResponse';

const baseUrl = `/event`

export const getHdGroupListingApi = (payload: any, state: any): Promise<HttpResponse> => {
    return makeApi(`${state?.env?.api_base_url}`).post(`${baseUrl}/${state?.event?.event.url}/hd/group-listing`);
}

export const getHdGroupDetailApi = (payload: any, state: any): Promise<HttpResponse> => {
    return makeApi(`${state?.env?.api_base_url}`).post(`${baseUrl}/${state?.event?.event.url}/hd/group-detail/${payload.id}`);
}

export const getHdTabListingsApi = (payload: any, state: any): Promise<HttpResponse> => {
    return makeApi(`${state?.env?.api_base_url}`).post(`${baseUrl}/${state?.event?.event.url}/hd/tab-question-listings/${payload.id}`);
}

export const submitHdApi = (payload: any, state: any): Promise<HttpResponse> => {
    return makeApi(`${state?.env?.api_gateway_url}`).post(`/v2/save-help-desk`, { ...payload });
}
export const submitHdLikeApi = (payload: any, state: any): Promise<HttpResponse> => {
    return makeApi(`${state?.env?.api_base_url}`).post(`${baseUrl}/${state?.event?.event.url}/hd/likeQuestion/${payload.question_id}/${payload.group_id}`, { ...payload });
}