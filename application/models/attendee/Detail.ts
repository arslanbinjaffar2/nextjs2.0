export interface Detail {
    detail?: AttendeeDetail;
    meeting?: string;
    attendee_tabs_settings: AttendeeTabSetting[];
    attendee_groups?: AttendeeGroup[];
    program_setting?: ProgramSetting;
    speaker_setting?: SpeakerSetting;
    programs?: Program[];
    show_sub_registraiton?: number;
    sub_registration_module_status?: number;
    is_favourite?: number;
}

interface Program {
    id?: number;
    hide_time?: number;
    only_for_speaker_list?: number;
    workshop_id?: number;
    topic?: string;
    description?: string;
    date?: string;
    heading_date?: string;
    start_time?: string;
    end_time?: string;
    location?: string;
    start_date_time?: string;
    program_speakers?: ProgramSpeaker[];
    program_tracks?: ProgramTrack[];
}

interface ProgramTrack {
    name?: string;
    color?: string;
}

interface ProgramSpeaker {
    id?: number;
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
    show_home?: string;
    allow_vote?: number;
    billing_ref_attendee?: number;
    billing_password?: string;
    change_password?: number;
    phone?: string;
    is_updated?: number;
    is_deleted?: number;
    pid?: string;
    pid_date?: string;
    created_at?: string;
    updated_at?: string;
    deleted_at?: string;
    attendee_cv?: string;
    cv?: string;
    encrypted_cpr_number?: string;
    pivot?: Pivot;
    info?: Info;
    current_event_attendee?: CurrentEventAttendee;
}

interface Pivot {
    agenda_id?: number;
    attendee_id?: number;
}

interface SpeakerSetting {
    id?: number;
    event_id?: number;
    phone?: number;
    email?: number;
    title?: number;
    department?: number;
    company_name?: number;
    show_country?: number;
    contact_vcf?: number;
    program?: number;
    group?: number;
    category_group?: number;
    show_group?: number;
    show_document?: number;
    initial?: number;
    chat?: number;
    hide_attendee?: number;
    tab?: number;
    default_display?: string;
    order_by?: string;
    registration_site_limit?: number;
    poll?: number;
    document?: number;
    delegate_number?: number;
    network_group?: number;
    table_number?: number;
    organization?: number;
    interest?: number;
    bio_info?: number;
    show_custom_field?: number;
    show_industry?: number;
    show_job_tasks?: number;
    gdpr_accepted?: number;
    created_at?: string;
    updated_at?: string;
    deleted_at?: string;
    resume?: number;
    type?: number;
    place_of_birth?: number;
    passport_no?: number;
    date_of_issue_passport?: number;
    date_of_expiry_passport?: number;
    pa_house_no?: number;
    pa_street?: number;
    pa_post_code?: number;
    pa_city?: number;
    pa_country?: number;
    age?: number;
    display_speaker_dashboard?: number;
    first_name_passport?: number;
    last_name_passport?: number;
    birth_date?: number;
    spoken_languages?: number;
    employment_date?: number;
}

interface ProgramSetting {
    id?: number;
    event_id?: number;
    agenda_list?: number;
    session_ratings?: number;
    agenda_tab?: number;
    admin_fav_attendee?: number;
    attach_attendee_mobile?: number;
    qa?: number;
    program_fav?: number;
    show_tracks?: number;
    show_attach_attendee?: number;
    agenda_display_time?: number;
    show_program_dashboard?: number;
    show_my_program_dashboard?: number;
    agenda_collapse_workshop?: number;
    agendaTimer?: number;
    agenda_search_filter?: number;
    agenda_display_alerts?: number;
    enable_notes?: number;
    enable_program_attendee?: number;
    program_groups?: number;
    created_at?: string;
    updated_at?: string;
    deleted_at?: string;
    program_view?: string;
}

interface AttendeeGroup {
    id?: number;
    name?: string;
    allow_multiple?: number;
    child?: Child[];
}

interface Child {
    present: boolean;
    info: Info2;
}

interface Info2 {
    id?: number;
    name?: string;
    value?: string;
    end_date?: string;
    languages_id?: number;
    group_id?: number;
    created_at?: string;
    updated_at?: string;
    deleted_at?: string;
}

interface AttendeeTabSetting {
    id?: number;
    event_id?: number;
    tab_name?: string;
    module?: string;
    sort_order?: number;
    status?: number;
    created_at?: string;
    updated_at?: string;
    deleted_at?: string;
}

interface AttendeeDetail {
    id?: number;
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
    show_home?: string;
    allow_vote?: number;
    billing_ref_attendee?: number;
    billing_password?: string;
    change_password?: number;
    phone?: string;
    is_updated?: number;
    is_deleted?: number;
    pid?: string;
    pid_date?: string;
    created_at?: string;
    updated_at?: string;
    deleted_at?: string;
    attendee_cv?: string;
    cv?: string;
    encrypted_cpr_number?: string;
    info?: Info;
    gdpr?: number;
    current_event_attendee?: CurrentEventAttendee;
}

interface CurrentEventAttendee {
    id?: number;
    email_sent?: number;
    sms_sent?: number;
    login_yet?: number;
    status?: number;
    attendee_id?: number;
    event_id?: number;
    speaker?: string;
    sponser?: string;
    exhibitor?: string;
    attendee_type?: number;
    default_language_id?: number;
    device_token?: string;
    device_type?: string;
    app_invite_sent?: number;
    is_active?: number;
    verification_id?: string;
    gdpr?: number;
    allow_vote?: number;
    ask_to_apeak?: number;
    allow_my_document?: number;
    camera?: number;
    allow_gallery?: number;
    accept_foods_allergies?: number;
    native_app_forgot_password_code?: string;
    native_app_forgot_password_code_created_at?: string;
    reminder_sent?: number;
    type_resource?: number;
    attendee_share_value?: string;
    created_at?: string;
    updated_at?: string;
    deleted_at?: string;
    allow_qa?: number;
    allow_resume?: number;
}

interface Info {
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
    company_key?: string;
    title?: string;
    about?: string;
    phone?: string;
    linkedin_profile_id?: string;
    registration_type?: string;
    country?: string;
    organization?: string;
    department?: string;
    custom_field_id2793?: string;
    billing_ref_attendee?: string;
    billing_password?: string;
    place_of_birth?: string;
    passport_no?: string;
    date_of_issue_passport?: string;
    date_of_expiry_passport?: string;
}