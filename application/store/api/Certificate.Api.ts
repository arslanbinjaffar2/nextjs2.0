import makeApi from "application/utils/ConfigureAxios";

import { HttpResponse } from 'application/models/GeneralResponse';

const baseUrl = `/event`

export const getCertificateApi = (payload: any, state: any): Promise<HttpResponse> => {
    return makeApi(`${state?.env?.api_base_url}`).post(`${baseUrl}/${state?.event?.event.url}/certificate/listing`, { ...payload, limit: 20 });
}
export const getCertificatePdfApi = (payload: any, state: any): Promise<HttpResponse> => {
    return makeApi(`${state?.env?.api_base_url}`).post(`${baseUrl}/${state?.event?.event.url}/certificate/certificatepdf/${payload.certificate_id}/${payload.attendee_id}`, payload, {
        responseType: 'blob'
    });
}
