import makeApi from "application/utils/ConfigureAxios";

import { HttpResponse } from 'application/models/GeneralResponse';

const baseUrl = `/event`

export const getAttendeeApi = (payload: any, state: any): Promise<HttpResponse> => {
    return makeApi(`${state?.env?.api_base_url}`).post(`${baseUrl}/${state?.event?.event.url}/attendee/listing`, { ...payload, limit: 20 });
}

export const makeFavouriteApi = (payload: any, state: any): Promise<HttpResponse> => {
    return makeApi(`${state?.env?.api_base_url}`).post(`${baseUrl}/${state?.event?.event.url}/attendee/toggle-favourite/${payload.attendee_id}`, payload);
}

export const getGroupsApi = (payload: any, state: any): Promise<HttpResponse> => {
    return makeApi(`${state?.env?.api_base_url}`).post(`${baseUrl}/${state?.event?.event.url}/attendee/group-listing/${payload.group_id}`, { ...payload, limit: 20, att_id: payload.attendee_id });
}

export const getAttendeeDetailApi = (payload: any, state: any): Promise<HttpResponse> => {
    return makeApi(`${state?.env?.api_base_url}`).post(`${baseUrl}/${state?.event?.event.url}/attendee/detail/${payload.id}`, { ...payload });
}

export const getContactAttendeeApi = (payload: any, state: any): Promise<HttpResponse> => {
    return makeApi(`${state?.env?.api_base_url}`).post(`${baseUrl}/${state?.event?.event.url}/attendee/saveContact/${payload.id}`, payload);
}

export const getCategoryApi = (payload: any, state: any): Promise<HttpResponse> => {
    return makeApi(`${state?.env?.api_base_url}`).post(`${baseUrl}/${state?.event?.event.url}/event/categories`, { ...payload, limit: 20 });
}

export const getHotelApi = (payload: any, state: any): Promise<HttpResponse> => {
    return makeApi(`${state?.env?.api_base_url}`).post(`${baseUrl}/${state?.event?.event.url}/attendee/hotel`);
}

export const getAddGDPRlogApi = (payload: any, state: any): Promise<HttpResponse> => {
    return makeApi(`${state?.env?.api_base_url}`).post(`${baseUrl}/${state?.event?.event.url}/attendee/gdpr/log`, payload);
}

export const getAddDisclaimerlogApi = (payload: any, state: any): Promise<HttpResponse> => {
    return makeApi(`${state?.env?.api_base_url}`).post(`${baseUrl}/${state?.event?.event.url}/attendee/disclaimer/log`, payload);
}

export const getInvoiceApi = (payload: any,state: any): Promise<HttpResponse> => {
    const updatedBaseUrl = state?.env?.api_base_url.replace('/mobile', '/api/v2');
    return makeApi(updatedBaseUrl).get(`${baseUrl}/${state?.event?.event.url}/getInvoice`);
}