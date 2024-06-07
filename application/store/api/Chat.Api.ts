import makeApi from "application/utils/ConfigureAxios";

import { HttpResponse } from 'application/models/GeneralResponse';

const baseUrl = `/event`

export const getChatsApi = (payload: any, state: any): Promise<HttpResponse> => {
    return makeApi(`${state?.env?.api_base_url}`).get(`${baseUrl}/${state?.event?.event.url}/chat`);
}

export const getChatDetailApi = (payload: any, state: any): Promise<HttpResponse> => {
    return makeApi(`${state?.env?.api_base_url}`).get(`${baseUrl}/${state?.event?.event.url}/chat/${payload.thread_id}`);
}