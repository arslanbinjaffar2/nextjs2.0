import makeApi from "application/utils/ConfigureAxios";

import { HttpResponse } from 'application/models/GeneralResponse';

const baseUrl = `/event`

export const getSocialWallApi = (payload: any, state: any): Promise<HttpResponse> => {
    return makeApi(`${state?.env?.api_base_url}`).post(`${baseUrl}/${state?.event?.event.url}/social-wall/posts`,{ ...payload, limit: 40 });
}

export const saveSocialWallPostApi = (payload: any, state: any): Promise<HttpResponse> => {
    return makeApi(`${state?.env?.api_base_url}`, true).post(`${baseUrl}/${state?.event?.event.url}/social-wall/posts/save`,payload);
}

export const updateSocialWallPostApi = (payload: any, state: any): Promise<HttpResponse> => {
    return makeApi(`${state?.env?.api_base_url}`, true).post(`${baseUrl}/${state?.event?.event.url}/social-wall/posts/update`,payload);
}

export const likeSocialWallPostApi = (payload: any, state: any): Promise<HttpResponse> => {
    return makeApi(`${state?.env?.api_base_url}`).post(`${baseUrl}/${state?.event?.event.url}/social-wall/posts/like/${payload.id}`);
}

export const deleteSocialWallPostApi = (payload: any, state: any): Promise<HttpResponse> => {
    return makeApi(`${state?.env?.api_base_url}`).post(`${baseUrl}/${state?.event?.event.url}/social-wall/posts/delete/${payload.id}`);
}

export const saveSocialWallComment = (payload: any, state: any): Promise<HttpResponse> => {
    return makeApi(`${state?.env?.api_base_url}`).post(`${baseUrl}/${state?.event?.event.url}/social-wall/posts/comments/save`,payload);
}

export const likeSocialWallComment = (payload: any, state: any): Promise<HttpResponse> => {
    return makeApi(`${state?.env?.api_base_url}`).post(`${baseUrl}/${state?.event?.event.url}/social-wall/posts/comments/like/${payload.id}`);
}

export const getSocialWallPostDetailApi = (payload: any, state: any): Promise<HttpResponse> => {
    return makeApi(`${state?.env?.api_base_url}`).post(`${baseUrl}/${state?.event?.event.url}/social-wall/posts/detail/${payload.id}`);
}