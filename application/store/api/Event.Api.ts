import { store } from 'application/store/Index'

import { Event } from 'application/models/Event';

import makeApi from "application/utils/ConfigureAxios";

const EventBaseUrl = `/event`

export const getEventApi = (payload: any): Promise<Event> => {
    return makeApi(`${store.getState().env.api_base_url}`).get(`${EventBaseUrl}/${payload.slug}`);
}

export const getEventByCodeApi = (payload: any): Promise<Event> => {
    console.log(`${EventBaseUrl}/${payload.code}/get-event-by-code`)
    return makeApi(`${store.getState().env.api_base_url}`).get(`${EventBaseUrl}/${payload.code}/get-event-by-code`);
}