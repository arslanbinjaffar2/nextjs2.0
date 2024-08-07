import makeApi from "application/utils/ConfigureAxios";

import { HttpResponse } from 'application/models/GeneralResponse';

const baseUrl = `/event`

export const getPollApi = (payload: any, state: any): Promise<HttpResponse> => {
    return makeApi(`${state?.env?.api_base_url}`).post(`${baseUrl}/${state?.event?.event.url}/polls/listing`);
}

export const getPollDetailApi = (payload: any, state: any): Promise<HttpResponse> => {
    return makeApi(`${state?.env?.api_base_url}`).post(`${baseUrl}/${state?.event?.event.url}/polls/detail/${payload.id}`, { ...payload });
}

export const submitPollApi = (payload: any, state: any): Promise<HttpResponse> => {
    return makeApi(`${state?.env?.api_gateway_url}`).post(`/v2/save-polls`, { ...payload });
}

export const getMyPollResultApi = (payload: any, state: any): Promise<HttpResponse> => {
    return makeApi(`${state?.env?.api_base_url}`).post(`${baseUrl}/${state?.event?.event.url}/settings/my-poll-results`);
}

export const getMyPollResultDetailApi = (payload: any, state: any): Promise<HttpResponse> => {
    return makeApi(`${state?.env?.api_base_url}`).post(`${baseUrl}/${state?.event?.event.url}/settings/my-poll-result-detail/${payload.id}`, {...payload});
}

export const getCheckVotingPermissionApi = (payload: any, state: any): Promise<HttpResponse> => {
    return makeApi(`${state?.env?.api_base_url}`).post(`${baseUrl}/${state?.event?.event.url}/polls/voting-permission`, {...payload});
}