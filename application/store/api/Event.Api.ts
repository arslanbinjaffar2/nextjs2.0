import { store } from 'application/store/Index'

import { Event } from 'application/models/Event';

import makeApi from "application/utils/ConfigureAxios";

const EventBaseUrl = `/event`

export const getEventApi = (payload: any): Promise<Event> => {
    return makeApi(`${store.getState().env.api_base_url}`).get(`${EventBaseUrl}/${payload.slug}`);
}

export const updateEventApi = (event: Event): Promise<Event> => makeApi(`${store.getState().env.api_base_url}`).put(`${EventBaseUrl}/${event.id}`, event)