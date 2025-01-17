import makeApi from "application/utils/ConfigureAxios";

import { HttpResponse } from 'application/models/GeneralResponse';

const baseUrl = `/event`

export const getChatsApi = (payload: any, state: any): Promise<HttpResponse> => {
    return makeApi(`${state?.env?.api_base_url}`).get(`${baseUrl}/${state?.event?.event.url}/chat?search=${payload.search}`);
}

export const getChatDetailApi = (payload: any, state: any): Promise<HttpResponse> => {
    return makeApi(`${state?.env?.api_base_url}`).get(`${baseUrl}/${state?.event?.event.url}/chat/detail/${payload.thread_id}`);
}

export const startNewChatApi = (payload: any, state: any): Promise<HttpResponse> => {
    return makeApi(`${state?.env?.api_base_url}`).post(`${baseUrl}/${state?.event?.event.url}/chat/new`, payload);
}

export const saveMessageChatApi = (payload: any, state: any): Promise<HttpResponse> => {
    return makeApi(`${state?.env?.api_base_url}`).post(`${baseUrl}/${state?.event?.event.url}/chat/save-message`, payload);
}

export const markChatReadApi = (payload: any, state: any): Promise<HttpResponse> => {
    return makeApi(`${state?.env?.api_base_url}`).post(`${baseUrl}/${state?.event?.event.url}/chat/mark-as-read`, payload);
}

export const markThreadReadApi = (payload: any, state: any): Promise<HttpResponse> => {
    return makeApi(`${state?.env?.api_base_url}`).post(`${baseUrl}/${state?.event?.event.url}/chat/mark-as-read-thread`, payload);
}

export const newChatSearchApi = (payload: any, state: any): Promise<HttpResponse> => {
    return makeApi(`${state?.env?.api_base_url}`).get(`${baseUrl}/${state?.event?.event.url}/chat/new-search`, {params: payload});
}

export const getParticipantInfoApi = (payload: any, state: any): Promise<HttpResponse> => {
    return makeApi(`${state?.env?.api_base_url}`).get(`${baseUrl}/${state?.event?.event.url}/chat/participant-info`, {params: payload});
}