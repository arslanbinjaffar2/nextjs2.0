export interface FetchCheckInOutResponse {
  attendee: Attendee;
  setting: Setting;
  hasOrderItems: boolean;
  history: History[];
  type_history: {event:GroupedHistory[],program:GroupedHistory[],group:GroupedHistory[],ticket:GroupedHistory[]};
  enableEvent: boolean;
  enableCheckinWithoutLocatiom: boolean;
  status: string;
  eventStatusMsg: string;
  checkin: Checkin;
  checkInOutSetting: Setting;
  qrCodeImgSrc:string;
}

export interface Checkin {
  id: number;
  sort_order: number;
  event_id: number;
  status: number;
  created_at: string;
  updated_at: string;
  deleted_at: string;
  alias: string;
  icon: string;
  is_purchased: number;
  group: string;
  version: string;
  type: string;
  info: Info2[];
}

export interface Info2 {
  id: number;
  name: string;
  value: string;
  languages_id: number;
  status: number;
  created_at: string;
  updated_at: string;
  deleted_at: string;
  module_order_id: number;
}

export interface GroupedHistory {
  log_date: string;
  first_log: History;
  other_logs: History[];
}

export interface History {
  id: number;
  checkin: string;
  checkout: string;
  event_id: number;
  organizer_id: number;
  attendee_id: number;
  admin_id: number;
  type_name: string;
  type_id: number;
  data: string;
  status: number;
  delegate: string;
  created_at: string;
  updated_at: string;
  deleted_at: string;
  group: any;
  ticket: any;
  program: any;
  attendees: Attendee2[];
}

export interface Attendee2 {
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
  info: Info[];
}

export interface Setting {
  id: number;
  event_id: number;
  status: number;
  type: string;
  single_type: string;
  radius: string;
  latitude: string;
  longitude: string;
  address: string;
  gps_checkin: number;
  self_checkin: number;
  event_checkin: number;
  program_checkin: number;
  group_checkin: number;
  ticket_checkin: number;
  validate_program_checkin: number;
  show_wp: number;
  show_vp: number;
  created_at: string;
  updated_at: string;
  deleted_at: string;
  show_qrcode: number;
  enable_email_ticket: number;
  is_cpr: number;
  show_qr_code_during_login: number;
  allow_auto_checkout: number;
  parallel_session_check_in: number;
  enable_event_projectors: number;
  enable_agenda_projectors: number;
  agenda_id: string;
  show_items_in_checkin: number;
  show_event_checkin_history: number;
  show_programs_checkin_history: number;
  show_groups_checkin_history: number;
  show_tickets_checkin_history: number;
}

export interface Attendee {
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
  info: Info[];
  detail: Detail;
  event_attendee: Eventattendee;
}

export interface Eventattendee {
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

export interface Detail {
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
  custom_field_id2794: string;
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
  custom_field_id2911: string;
  custom_field_id2824: string;
  custom_field_id3078: string;
  custom_field_id3034: string;
  custom_field_id2793: string;
  custom_field_id: string;
  custom_field_id3038: string;
  custom_field_id3258: string;
  custom_field_id3135: string;
  custom_field_id2798: string;
  private_street_2: string;
  private_state: string;
  private_country_name: string;
  custom_field_id3201: string;
  custom_field_id3224: string;
  custom_field_id3702: string;
  custom_field_id3703: string;
}

export interface Info {
  id: number;
  name: string;
  value: string;
  attendee_id: number;
  languages_id: number;
  status: number;
  custom_field_updated: number;
  created_at: string;
  updated_at: string;
  deleted_at: string;
}