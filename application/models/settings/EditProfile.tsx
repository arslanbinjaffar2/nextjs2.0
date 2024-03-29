export interface EditProfileResponse {
  attendee: Attendee;
  countries: Country[];
  event_language_details: Eventlanguagedetail[];
  callingCodes: CallingCode[];
  event_food_disclaimers: Eventfooddisclaimer[];
  attendee_feild_settings: Attendeefeildsettings;
  customFields: any[];
  languages: Language[];
  enable_cancel: boolean;
  order_attendee_count: number;
  settings: Setting[];
  labels: Labels;
}

export interface Labels {
  initial: string;
  first_name: string;
  last_name: string;
  company_name: string;
  email: string;
  department: string;
  custom_field_id: string;
  password: string;
  confirm_password: string;
  delegate: string;
  table_number: string;
  network_group: string;
  age: string;
  gender: string;
  organization: string;
  jobs: string;
  interests: string;
  title: string;
  industry: string;
  about: string;
  phone: string;
  member_number: string;
  private_house_number: string;
  private_street: string;
  private_post_code: string;
  private_city: string;
  private_country: string;
  company_type: string;
  company_registration_number: string;
  ean: string;
  contact_person_name: string;
  contact_person_email: string;
  contact_person_mobile_number: string;
  company_street: string;
  company_house_number: string;
  company_post_code: string;
  company_city: string;
  company_country: string;
  credit_card_payment: string;
  company_public_payment: string;
  company_invoice_payment: string;
  poNumber: string;
  FIRST_NAME_PASSPORT: string;
  LAST_NAME_PASSPORT: string;
  BIRTHDAY_YEAR: string;
  EMPLOYMENT_DATE: string;
  SPOKEN_LANGUAGE: string;
  attendee_type: string;
  country: string;
  place_of_birth: string;
  passport_no: string;
  date_of_issue_passport: string;
  date_of_expiry_passport: string;
  company_invoice_payer_company_name: string;
  company_invoice_payer_street_house_number: string;
  company_invoice_payer_post_code: string;
  company_invoice_payer_city: string;
  company_invoice_payer_country: string;
  private_street_2: string;
  private_state: string;
  company_street_2: string;
  company_state: string;
  ATTENDEE_PROFILE_PICTURE?:string;
}

export interface Setting {
  name: string;
  is_editable: number;
  is_private: number;
}


export interface Attendeefeildsettings {
  id: number;
  event_id: number;
  initial: number;
  first_name: number;
  last_name: number;
  email: number;
  password: number;
  phone_number: number;
  age: number;
  gender: number;
  first_name_passport: number;
  last_name_passport: number;
  place_of_birth: number;
  passport_no: number;
  date_of_issue_passport: number;
  date_of_expiry_passport: number;
  birth_date: number;
  spoken_languages: number;
  profile_picture: number;
  website: number;
  linkedin: number;
  facebook: number;
  twitter: number;
  company_name: number;
  title: number;
  department: number;
  organization: number;
  employment_date: number;
  custom_field: number;
  country: number;
  industry: number;
  job_tasks: number;
  interests: number;
  about: number;
  network_group: number;
  delegate_number: number;
  table_number: number;
  event_language: number;
  pa_house_no: number;
  pa_street: number;
  pa_post_code: number;
  pa_city: number;
  pa_country: number;
  created_at: string;
  updated_at: string;
  deleted_at: string;
  attendee_cv: string;
  resume: number;
}

export interface Eventfooddisclaimer {
  id: number;
  event_id: number;
  subject: string;
  inline_text: string;
  description: string;
  created_at: string;
  updated_at: string;
  deleted_at: string;
}

export interface CallingCode {
  id: string;
  name: string;
  country: string;
}

export interface Eventlanguagedetail {
  id: number;
  name: string;
  lang_code: string;
  ios_lang_code: string;
  status: number;
  created_at: string;
  updated_at: string;
  deleted_at: string;
}

export interface Country {
  id: number;
  name: string;
}
export interface Language {
  id: number;
  name: string;
}

export interface Attendee {
  id: number;
  email: string;
  title: string;
  about: string;
  network_group: string;
  industry: string;
  ss_number: string;
  first_name: string;
  last_name: string;
  organizer_id: number;
  FIRST_NAME_PASSPORT: string;
  LAST_NAME_PASSPORT: string;
  BIRTHDAY_YEAR: string;
  EMPLOYMENT_DATE: string;
  SPOKEN_LANGUAGE: any;
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
  cv: string;
  encrypted_cpr_number: string;
  info: Info;
  current_event_attendee: Currenteventattendee;
  countryName: string;
  callingCode?:string
  gdpr?:boolean;
  accept_foods_allergies?:boolean;
  password?:string;
  file?:any;
  blob_image?:any;
  attendee_cv?:any;
}

export interface Currenteventattendee {
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
  reg_form: string;
}

export interface Info {
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
  [prop:string]: string;
}
