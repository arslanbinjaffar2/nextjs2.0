export interface RootObject {
    certificate: Certificate[];
}
export interface Certificate {
    id: number;
    event_id: number;
    attendee_id: number;
    certificate_id: number;
    certificate_no: number;
    name: string;
    top_skills: string;
    send_date: number;
    certificate: string;

    find(param: (certificate: { module_name: string; module_type: string }) => boolean): any
}