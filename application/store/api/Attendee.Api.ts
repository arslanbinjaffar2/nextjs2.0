import makeApi from "application/utils/ConfigureAxios";

import { HttpResponse } from 'application/models/GeneralResponse';

const baseUrl = `/event`

export const getAttendeeApi = (payload: any, state: any): Promise<HttpResponse> => {
    return makeApi(`${state?.env?.api_base_url}`).post(`${baseUrl}/${state?.event?.event.url}/attendee/listing`, { ...payload, limit: 20 });
}