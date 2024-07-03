export interface Attendee {
    id: number;
    email?: string;
    ss_number?: string;
    first_name?: string;
    last_name?: string;
    organizer_id?: number;
    FIRST_NAME_PASSPORT?: string;
    LAST_NAME_PASSPORT?: string;
    BIRTHDAY_YEAR?: string;
    EMPLOYMENT_DATE?: string;
    SPOKEN_LANGUAGE?: string;
    image?: string;
    status?: number;
    allow_vote?: number;
    phone?: string;
    info?: Info;
    favourite?: number;
    event_attendee?: Eventattendee;
    field_settings?: any;
    private_country_display_name?: string;
    sort_settings?: any;
    attendee_program_groups?: any;
}

interface Eventattendee {
    email_sent?: number;
    sms_sent?: number;
    status?: number;
    login_yet?: number;
    speaker?: string;
    sponser?: string;
    exhibitor?: string;
    attendee_type?: number;
    default_language_id?: number;
    is_active?: number;
    gdpr?: number;
    allow_vote?: number;
    allow_gallery?: number;
    ask_to_apeak?: number;
    type_resource?: number;
    accept_foods_allergies?: number;
    allow_my_document?: number;
}

interface Info {
    [x: string]: any;
    initial?: string;
    linkedin_protocol?: string;
    twitter_protocol?: string;
    facebook_protocol?: string;
    website_protocol?: string;
    industry?: string;
    website?: string;
    facebook?: string;
    twitter?: string;
    linkedin?: string;
    jobs?: string;
    interests?: string;
    age?: string;
    gender?: string;
    network_group?: string;
    private_house_number?: string;
    private_street?: string;
    private_post_code?: string;
    private_city?: string;
    private_country?: string;
    delegate_number?: string;
    table_number?: string;
    company_name?: string;
    title?: string;
    about?: string;
    phone?: string;
    organization?: string;
    department?: string;
    custom_field_id2793?: string;
    place_of_birth?: string;
    passport_no?: string;
    date_of_issue_passport?: string;
    date_of_expiry_passport?: string;
}