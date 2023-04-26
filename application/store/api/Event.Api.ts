import { Event } from 'application/models/Event';

import makeApi from "application/utils/ConfigureAxios";

const EventBaseUrl = `/event`

export const getEventApi = (payload: any, state: any): Promise<Event> => {
    return makeApi(`${state?.env?.api_base_url}`).get(`${EventBaseUrl}/${payload}`);
}

export const getEventByCodeApi = (payload: any, state: any): Promise<Event> => {
    return makeApi(`${state?.env?.api_base_url}`).get(`${EventBaseUrl}/${payload}/get-event-by-code`);
}