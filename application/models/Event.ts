export interface Event {
    id?: number;
    organizer_name?: string;
    name?: string;
    url?: string;
    tickets_left?: string;
    start_date?: string;
    end_date?: string;
    start_time?: string;
    end_time?: string;
    cancellation_date?: string;
    registration_end_date?: string;
    organizer_id?: number;
    status?: number;
    created_at?: string;
    updated_at?: string;
    deleted_at?: string;
    language_id?: number;
    timezone_id?: number;
    country_id?: number;
    office_country_id?: number;
    latitude?: string;
    longitude?: string;
    owner_id?: number;
    export_setting?: string;
    show_native_app_link?: number;
    organizer_site?: number;
    native_app_acessed_date?: string;
    native_app_timer?: string;
    white_label_sender_name?: string;
    white_label_sender_email?: string;
    is_template?: number;
    is_advance_template?: number;
    is_wizard_template?: number;
    type?: number;
    is_registration?: number;
    is_app?: number;
    tab_settings?: number;
    allow_all_qualities?: number;
    is_map?: number;
    template_id?: string;
    end_event_total_attendee_count?: string;
    ean_number?: number;
    enable_cloud_proxy?: number;
    enable_storage?: number;
    parent_event_id?: number;
    registration_type?: string;
    portal_access?: number;
    parent_event_attendee_type?: number;
    registration_flow_theme_id?: string;
    is_enable_sms?: number;
    cache_label?: number;
    tags?: string;
    contact_person_name?: string;
    phone?: string;
    email?: string;
    registration_site_theme_id?: number;
    registration_site_layout_id?: number;
    registration_form_id?: number;
    disable_nativeapp_access?: number;
    hide_from_event_center?: number;
    hide_from_event_history?: number;
    use_new_reg_site?: number;
    info?: Info[];
    settings?: Setting;
    attendee_settings?: AttendeeSetting;
    detail?: Detail;
    gdpr_log_count?: number;
    labels?: any;
}

interface Setting {
    poll_setting?: string;
    primary_color?: string;
    secondary_color?: string;
    program_view?: string;
    desktop_program_mode?: string;
    projector_mode?: string;
    desktop_program_screen_sidebar_program?: string;
    desktop_program_screen_sidebar_gdpr?: string;
    desktop_program_screen_sidebar_checkin?: string;
    enable_vp?: string;
    streaming_service?: string;
    badgeName?: string;
    badgeTitle?: string;
    badgeCompany?: string;
    badgeDept?: string;
    badgeLogo?: string;
    badgeEventName?: string;
    badgeTableNumber?: string;
    badgeDelegateNumber?: string;
    google_analytics?: string;
    google_analytics_email?: string;
    gmail_email?: string;
    google_analytics_profile_id?: string;
    desktop_activate_programs?: string;
    desktop_camera_mic?: string;
    desktop_activate_checkin?: string;
    desktop_activate_streaming?: string;
    enable_vp_alert?: string;
    third_party_body_script?: string;
    third_party_footer_script?: string;
    third_party_header_script?: string;
    third_party_order_success?: string;
}

interface AttendeeSetting {
    id?: number;
    domain_names?: string;
    event_id?: number;
    phone?: number;
    email?: number;
    title?: number;
    organization?: number;
    department?: number;
    company_name?: number;
    show_country?: number;
    contact_vcf?: number;
    linkedin?: number;
    linkedin_registration?: number;
    registration_password?: number;
    program?: number;
    attendee_group?: number;
    attendee_my_group?: number;
    tab?: number;
    initial?: number;
    network_group?: number;
    table_number?: number;
    delegate_number?: number;
    voting?: number;
    allow_my_document?: number;
    image_gallery?: number;
    default_display?: string;
    create_profile?: number;
    default_password?: string;
    facebook_enable?: number;
    hide_password?: number;
    default_password_label?: number;
    forgot_link?: number;
    created_at?: string;
    updated_at?: string;
    deleted_at?: string;
    attendee_reg_verification?: number;
    validate_attendee_invite?: number;
    interest?: number;
    show_custom_field?: number;
    bio_info?: number;
    show_job_tasks?: number;
    show_industry?: number;
    password_lenght?: number;
    strong_password?: number;
    enable_foods?: number;
    authentication?: number;
    cpr?: number;
    place_of_birth?: number;
    passport_no?: number;
    date_of_issue_passport?: number;
    date_of_expiry_passport?: number;
    pa_house_no?: number;
    pa_street?: number;
    pa_post_code?: number;
    pa_city?: number;
    pa_country?: number;
    display_private_address?: number;
    email_enable?: number;
    share_enable?: number;
    share_validation_enable?: number;
    share_value?: string;
    display_chat_notification?: number;
    resume?: number;
    display_registration_invoice?: number;
    type?: number;
    age?: number;
    mark_favorite?: number;
    export_original_cpr_number?: number;
}

interface Detail {
    support_email?: string;
    dateformat?: string;
    location_address?: string;
    location_name?: string;
    sms_organizer_name?: string;
}

export interface EventResponse {
    event ??: Event,
    success ??: boolean
}

interface Info {
    id?: number;
    name?: string;
    value?: string;
    event_id?: number;
    languages_id?: number;
    status?: number;
    created_at?: string;
    updated_at?: string;
    deleted_at?: string;
}