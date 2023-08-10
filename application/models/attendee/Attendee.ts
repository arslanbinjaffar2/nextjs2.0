export interface Attendee {
    id: number;
    ss_number: string;
    first_name: string;
    last_name: string;
    organizer_id: number;
    status: number;
    allow_vote: number;
    info: any;
    event_attendee: Eventattendee;
}

interface Eventattendee {
    email_sent: number;
    sms_sent: number;
    status: number;
    login_yet: number;
    speaker: string;
    sponser: string;
    exhibitor: string;
    attendee_type: number;
    default_language_id: number;
    is_active: number;
    gdpr: number;
    allow_vote: number;
    allow_gallery: number;
    ask_to_apeak: number;
    type_resource: number;
    accept_foods_allergies: number;
    allow_my_document: number;
}