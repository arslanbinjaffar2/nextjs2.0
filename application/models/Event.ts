export interface Event {
    id?: number;
    organizer_name?: string;
    name?: string;
    url?: string;
    tickets_left?: number;
    start_date?: string;
    end_date?: string;
    end_time?: string;
    cancellation_date?: string;
    registration_end_date?: string;
    organizer_id?: string;
    status?: number;
    language_id?: number;
    timezone_id?: number;
    country_id?: number;
    office_country_id?: number;
    latitude?: string;
    longitude?: string;
    owner_id?: number;
    export_setting?: string;
    show_native_app_link?: number;
    start_time?: string;
    ean_number?: number;
    organizer_site?: number;
    native_app_timer?: string;
    native_app_acessed_date?: string;
    is_template?: number;
    is_advance_template?: number;
    is_wizard_template?: number;
    is_registration?: number;
    is_app?: number;
    allow_all_qualities?: number;
    enable_cloud_proxy?: number;
    enable_storage?: number;
    parent_event_id?: number;
    registration_type?: string;
    is_enable_sms?: number;
    cache_label?: number;
    tags?: string;
    contact_person_name?: string;
    phone?: string;
    email?: string;
    registration_form_id?: number;
    registiration_site_theme_id?: number;
    registiration_site_layout_id?: number;
    disable_nativeapp_access?: number;
    hide_from_event_history?: number;
    use_new_reg_site?: number;
    created_at?: string;
    updated_at?: string;
    deleted_at?: string;
}

export interface EventResponse {
    event?: Event,
    success?: boolean
}