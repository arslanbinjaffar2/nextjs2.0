export interface Program {
    id: number;
    hide_time: number;
    only_for_speaker_list: number;
    workshop_id: number;
    enable_speakerlist: number;
    topic: string;
    description: string;
    date: string;
    heading_date: string;
    start_time: string;
    end_time: string;
    location: string;
    start_date_time: string;
    program_speakers: Attendee[];
    program_workshop: string;
    program_workshop_start_time: string;
    program_workshop_end_time: string;
    program_tracks: Track[];
    workshop_programs: Program[];
    videos: Video[];
    session: Session[];
    program_attendees_attached: ProgramAttendeesAttached[];
    is_attatched_with_subregistration: number;
    info: any;
}

interface Attendee {
    id: number;
    email: string;
    ss_number: string;
    first_name: string;
    last_name: string;
    organizer_id: number;
    FIRST_NAME_PASSPORT: string;
    LAST_NAME_PASSPORT: string;
    BIRTHDAY_YEAR: string;
    EMPLOYMENT_DATE: string;
    SPOKEN_LANGUAGE: string;
    image: string;
    status: number;
    show_home: string;
    allow_vote: number;
    billing_ref_attendee: number;
    billing_password: string;
    change_password: number;
    phone: string;
    is_updated: number;
    is_deleted: number;
    pid: string;
    pid_date: string;
    created_at: string;
    updated_at: string;
    deleted_at: string;
    attendee_cv: string;
    cv: string;
    encrypted_cpr_number: string;
    pivot: Pivot;
    info: Info;
    current_event_attendee: EventAttendee;
}

interface Info {
    delegate_number: string;
    table_number: string;
    age: string;
    gender: string;
    company_name: string;
    company_key: string;
    title: string;
    industry: string;
    about: string;
    phone: string;
    website: string;
    website_protocol: string;
    facebook: string;
    facebook_protocol: string;
    twitter: string;
    twitter_protocol: string;
    linkedin: string;
    linkedin_protocol: string;
    linkedin_profile_id: string;
    registration_type: string;
    country: string;
    organization: string;
    jobs: string;
    interests: string;
    initial: string;
    department: string;
    network_group: string;
    billing_ref_attendee: string;
    billing_password: string;
    place_of_birth: string;
    passport_no: string;
    date_of_issue_passport: string;
    date_of_expiry_passport: string;
    private_house_number: string;
    private_street: string;
    private_post_code: string;
    private_city: string;
    private_country: string;
    private_street_2?: string;
    private_state?: string;
    allow_vote?: string;
    allow_gallery?: string;
}

interface Track {
    name: string;
    color: string;
}

interface EventAttendee {
    id: number;
    email_sent: number;
    sms_sent: number;
    login_yet: number;
    status: number;
    attendee_id: number;
    event_id: number;
    speaker: string;
    sponser: string;
    exhibitor: string;
    attendee_type: number;
    default_language_id: number;
    device_token: string;
    device_type: string;
    app_invite_sent: number;
    is_active: number;
    verification_id: string;
    gdpr: number;
    allow_vote: number;
    ask_to_apeak: number;
    allow_my_document: number;
    camera: number;
    allow_gallery: number;
    accept_foods_allergies: number;
    native_app_forgot_password_code: string;
    native_app_forgot_password_code_created_at: string;
    reminder_sent: number;
    type_resource: number;
    attendee_share_value: string;
    created_at: string;
    updated_at: string;
    deleted_at: string;
    allow_qa: number;
    allow_resume: number;
}

interface Pivot {
    agenda_id: number;
    attendee_id: number;
}

interface Video {
    id: number;
    name: string;
    type: string;
    plateform: string;
    size: string;
    url: string;
    filename: string;
    agenda_id: number;
    status: number;
    is_live: number;
    thumbnail: string;
    is_iframe: number;
    is_meeting: number;
    moderator: number;
    broadcaster: string;
    iframe_data: string;
    streaming_url: string;
    streaming_key: string;
    private: number;
    sort_order: number;
    sort: number;
    created_at: string;
    updated_at: string;
    deleted_at: string;
    sessionId: string;
    broadcasting_service: string;
    broadcasting_id: string;
    archiveId: string;
}

interface Session {
    id: number;
    event_id: number;
    agenda_id: number;
    is_active: number;
    session_date: string;
    start_time: string;
    end_time: string;
    created_at: string;
    updated_at: string;
    deleted_at: string;
}

export interface ProgramAttendeesAttached {
    id: number;
    attendee_id: number;
    agenda_id: number;
    added_by: number;
    linked_from: string;
    link_id: number;
    created_at: string;
    updated_at: string;
    deleted_at: string;
}

export interface ProgramRating {
    id: number;
    rate: number;
    agenda_id: number;
    attendee_id: number;
    comment: string;
}