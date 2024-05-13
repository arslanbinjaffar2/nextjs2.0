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
    calendar_date?: string;
    gdpr_settings?: any;
    gdpr?: any;
    food_disclaimer?: any;
    myturnlist_setting?: MyTurnlistSetting
    agenda_settings?: AgendaSetting
    speaker_settings?: SpeakerSettings
    sponsor_settings?: SponsorSettings
    exhibitor_settings?: ExhibitorSettings
    eventsite_settings?: EventSiteSettings
    keyword_settings?: KeywordSettings
    document_settings?: DocumentSettings
    calling_code?: any
    sponsor_tab_settings?: any
    exhibitor_tab_settings?: any
    event_language_code?: string
    attendee_tab_settings?: any
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
    header_logo?: string;
    app_header_logo?: string;
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
    app_background_color ?: string;
    app_text_mode?: string;
    app_background_image?: string;
    fav_icon?: string;
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
    event?: Event,
    success?: boolean
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

interface MyTurnlistSetting {
    id: number;
    event_id: number;
    status: number;
    turnlist_attendee_approval: number;
    enable_speech_time: number;
    enable_speech_time_for_moderator: number;
    display_time: number;
    show_image_turnlist: number;
    show_company_turnlist: number;
    show_title_turnlist: number;
    show_awaiting_turnlist: number;
    show_delegate_turnlist: number;
    show_department_turnlist: number;
    show_program_section: number;
    show_network_group_turnlist: number;
    speak_time: number;
    turn_project_refresh_time: number;
    delegate_label: string;
    network_label: string;
    lobby_url: string;
    show_dashboard: number;
    streaming_option: string;
    program_heading_background_color: string;
    program_heading_text_color: string;
    program_text_color: string;
    program_date_time_color: string;
    program_icon_color: string;
    program_description_color: string;
    department_label: string;
    time_between_attendees: number;
    background_image: string;
    background_color: string;
    headings_color: string;
    text_color: string;
    description_color: string;
    program_section_color: string;
    font_size: number;
    text_color1: string;
    text_color2: string;
    text_color3: string;
    organizer_info: number;
    ask_to_apeak: number;
    ask_to_speak_notes: number;
    av_output_all_template: string;
    av_output_active_template: string;
    av_output_sub_active_template: string;
    av_output_next_template: string;
    av_output_count_template: string;
    active_bg_color: string;
    all_bg_color: string;
    count_bg_color: string;
    live_attendee_detail_bg_color: string;
    speaking_now_background_color: string;
    speaking_now_text_color: string;
    speaker_text_color: string;
    attendee_detail_background_color: string;
    program_detail_background_color: string;
    created_at: string;
    updated_at: string;
    deleted_at: string;
    use_group_to_control_request_to_speak: number;
    ask_to_speak: number;
    sqs_queue_connection: number;
    current_queue: string;
    is_show_date_on_project: number;
    show_speaker_counter_on_projector: number;
    socket_reconnect: number;
    enable_projectors: number;
}

interface AgendaSetting {
    id: number;
    event_id: number;
    agenda_list: number;
    session_ratings: number;
    agenda_tab: number;
    admin_fav_attendee: number;
    attach_attendee_mobile: number;
    qa: number;
    program_fav: number;
    show_tracks: number;
    show_attach_attendee: number;
    agenda_display_time: number;
    show_program_dashboard: number;
    show_my_program_dashboard: number;
    agenda_collapse_workshop: number;
    agendaTimer: number;
    agenda_search_filter: number;
    agenda_display_alerts: number;
    enable_notes: number;
    enable_program_attendee: number;
    program_groups: number;
    created_at: string;
    updated_at: string;
    deleted_at: string;
    program_view: string;
}

interface SpeakerSettings {
  id: number;
  event_id: number;
  phone: number;
  email: number;
  title: number;
  department: number;
  company_name: number;
  show_country: number;
  contact_vcf: number;
  program: number;
  group: number;
  category_group: number;
  show_group: number;
  show_document: number;
  initial: number;
  chat: number;
  hide_attendee: number;
  tab: number;
  default_display: string;
  order_by: string;
  registration_site_limit: number;
  poll: number;
  document: number;
  delegate_number: number;
  network_group: number;
  table_number: number;
  organization: number;
  interest: number;
  bio_info: number;
  show_custom_field: number;
  show_industry: number;
  show_job_tasks: number;
  gdpr_accepted: number;
  created_at: string;
  updated_at: string;
  deleted_at: string;
  resume: number;
  type: number;
  place_of_birth: number;
  passport_no: number;
  date_of_issue_passport: number;
  date_of_expiry_passport: number;
  pa_house_no: number;
  pa_street: number;
  pa_post_code: number;
  pa_city: number;
  pa_country: number;
  age: number;
  display_speaker_dashboard: number;
  first_name_passport: number;
  last_name_passport: number;
  birth_date: number;
  spoken_languages: number;
  employment_date: number;
}

export interface SponsorSettings {
  id: number;
  event_id: number;
  sponsor_list: string;
  sponsorName: number;
  sponsorPhone: number;
  sponsorEmail: number;
  contact_person_email: number;
  contact_person_phone: number;
  sponsorContact: number;
  sponsorTab: number;
  catTab: number;
  sortType: number;
  hide_attendee: number;
  mark_favorite: number;
  notes: number;
  show_booth: number;
  poll: number;
  document: number;
  reservation: number;
  reservation_type: number;
  reservation_req_type_email: number;
  reservation_req_type_sms: number;
  reservation_allow_contact_person: number;
  reservation_allow_multiple: number;
  allow_card_reader: number;
  show_contact_person: number;
  gdpr_accepted: number;
  recieve_lead_email_on_save: number;
  auto_save: number;
  bcc_emails: string;
  show_lead_email_button: number;
  enable_signature: number;
  reservation_icone_view: number;
  reservations_overview: number;
  reservation_overview_icone: number;
  reservations_view: number;
  created_at: string;
  updated_at: string;
  deleted_at: string;
  catalogue_product: number;
  consent_management: number;
  enable_auto_capture: number;
  change_category: number;
  attendees_surveys: number;
  booking_details: number;
  reservation_display_filters: number;
  reservation_time_slots: number;
  reservation_available_meeting_rooms: number;
  reservation_meeting_rooms: number;
  reservation_display_colleagues: number;
  reservation_display_company: number;
  colleague_book_meeting: number;
  start_time: string;
  end_time: string;
  duration: number;
  show_on_native_app_dashboard: number;
  allow_add_staff: number;
  show_survey_form_lead_app: number;
  show_survey_form_event_app: number;
  message_organizer: number;
  show_blogs: number;
  show_company_profile: number;
  show_exhibitor_roi: number;
  show_leads: number;
  show_template: number;
  show_setting: number;
  show_booth_staff: number;
  show_company_documents: number;
  show_billing_history: number;
  show_lead_scan_confirmation: number;
  show_lead_user_promotion: number;
  show_forms_listing: number;
  show_response_overview: number;
  show_download_lead_app: number;
  allow_company_name: number;
  allow_booth_number: number;
  api_key_access: string;
}

interface ExhibitorSettings {
  id: number;
  event_id: number;
  exhibitor_list: string;
  exhibitorName: number;
  exhibitorPhone: number;
  exhibitorEmail: number;
  contact_person_email: number;
  contact_person_phone: number;
  exhibitorContact: number;
  exhibitorTab: number;
  catTab: number;
  sortType: number;
  hide_attendee: number;
  mark_favorite: number;
  poll: number;
  document: number;
  reservation: number;
  reservation_type: number;
  reservation_req_type_email: number;
  reservation_req_type_sms: number;
  reservation_allow_contact_person: number;
  reservation_allow_multiple: number;
  auto_save: number;
  allow_card_reader: number;
  show_contact_person: number;
  gdpr_accepted: number;
  recieve_lead_email_on_save: number;
  show_booth: number;
  notes: number;
  bcc_emails: string;
  show_lead_email_button: number;
  enable_signature: number;
  reservation_icone_view: number;
  reservations_overview: number;
  reservation_overview_icone: number;
  reservations_view: number;
  created_at: string;
  updated_at: string;
  deleted_at: string;
  catalogue_product: number;
  consent_management: number;
  enable_auto_capture: number;
  change_category: number;
  attendees_surveys: number;
  booking_details: number;
  reservation_display_filters: number;
  reservation_time_slots: number;
  reservation_available_meeting_rooms: number;
  reservation_meeting_rooms: number;
  reservation_display_colleagues: number;
  reservation_display_company: number;
  colleague_book_meeting: number;
  start_time: string;
  end_time: string;
  duration: number;
  show_on_native_app_dashboard: number;
  allow_add_staff: number;
  show_survey_form_event_app: number;
  show_survey_form_lead_app: number;
  message_organizer: number;
  show_blogs: number;
  show_company_profile: number;
  show_exhibitor_roi: number;
  show_leads: number;
  show_template: number;
  show_setting: number;
  show_booth_staff: number;
  show_company_documents: number;
  show_billing_history: number;
  show_lead_scan_confirmation: number;
  show_lead_user_promotion: number;
  show_forms_listing: number;
  show_response_overview: number;
  show_download_lead_app: number;
  allow_company_name: number;
  allow_booth_number: number;
  api_key_access: string;
}

export interface EventSiteSettings {
  id: number;
  event_id: number;
  ticket_left: string;
  registration_end_date: string;
  registration_end_time: string;
  cancellation_date: string;
  cancellation_end_time: string;
  cancellation_policy: string;
  registration_code: string;
  mobile_phone: string;
  eventsite_public: number;
  eventsite_signup_linkedin: number;
  eventsite_signup_fb: number;
  eventsite_tickets_left: number;
  eventsite_time_left: number;
  eventsite_language_menu: number;
  eventsite_menu: number;
  eventsite_banners: number;
  eventsite_location: number;
  eventsite_date: number;
  eventsite_footer: number;
  pass_changeable: number;
  phone_mandatory: number;
  attendee_registration_invite_email: number;
  attach_attendee_ticket: number;
  attendee_my_profile: number;
  attendee_my_program: number;
  attendee_my_billing: number;
  attendee_my_billing_history: number;
  attendee_my_reg_cancel: number;
  attendee_go_to_mbl_app: number;
  payment_type: number;
  use_waitinglist: number;
  created_at: string;
  updated_at: string;
  deleted_at: string;
  goto_eventsite: number;
  eventsite_add_calender: number;
  registration_after_login: number;
  send_invoice_email: number;
  attach_invoice_email: number;
  attach_calendar_to_email: number;
  auto_complete: number;
  new_message_temp: number;
  go_to_account: number;
  go_to_home_page: number;
  attendee_my_sub_registration: number;
  third_party_redirect: number;
  agenda_search_filter: number;
  third_party_redirect_url: string;
  attach_my_program: number;
  quick_register: number;
  prefill_reg_form: number;
  search_engine_visibility: number;
  attach_invoice_email_online_payment: number;
  network_interest: number;
  show_subscriber: number;
  show_survey: number;
  event_info_background_color: string;
  event_info_heading_color: string;
  expire_attendee_date: string;
  expire_attendee_time: string;
  not_attending_expiry_date: string;
  not_attending_expiry_time: string;
  registration_form_id: number;
  invoice_modification_end_date: string;
  invoice_modification_end_time: string;
  use_reg_form_footer: number;
  reg_site_footer_image: string;
  show_eventsite_breadcrumbs: number;
  send_email_to_organizer: number;
  manage_package: number;
  registration_type: string;
  portal_access: string;
  display_left_tickets: number;
  skip_items_step: number;
  edit_order_options: number;
  calender_show: number;
}

export interface KeywordSettings{
  show_after_login: number;
}

export interface DocumentSettings{
  show_documents_notes: number;
}