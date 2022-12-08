/* eslint-disable @typescript-eslint/no-explicit-any */
import { Env } from 'application/config/Env';

import { Event } from 'application/models/Event';

import makeApi from "application/utils/ConfigureAxios";

const api = makeApi(`${Env.API_BASE_URL}`);

const EventBaseUrl = `/event`

export const getEventApi = (): Promise<Event[]> => api.get(EventBaseUrl)

export const updateEventApi = (event: Event): Promise<Event> => api.put(`${EventBaseUrl}/${event.id}`, event)