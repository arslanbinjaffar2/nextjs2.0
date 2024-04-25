export interface SponsorDetail {
  detail?: Sponsor;
  documents?: any[];
}
interface Sponsor {
  id?: number;
  event_id?: number;
  name?: string;
  email?: string;
  logo?: string;
  booth?: string;
  phone_number?: string;
  website?: string;
  twitter?: string;
  facebook?: string;
  linkedin?: string;
  stype?: number;
  allow_reservations?: string;
  status?: number;
  allow_card_reader?: number;
  login_email?: string;
  password?: string;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string;
  url?: string;
  api_key?: string;
  allow_api_key_module?: string;
  sponsors_attendee?: SponsorsAttendee[];
  attendee_sponsors?: AttendeeSponsors[];
  categories: Category[];
  show_cat?: boolean;
  description?: any;
}

export interface SponsorsAttendee {
  id?: number;
  first_name?: string;
  last_name?: string;
  image?: string;
  email?: string;
  info?: Info;
  current_event_attendee?: CurrentEventAttendee;
  phone?: string;
  FIRST_NAME_PASSPORT?: string;
  LAST_NAME_PASSPORT?: string;
  BIRTHDAY_YEAR?: string;
  SPOKEN_LANGUAGE?: string;
  EMPLOYMENT_DATE?: string;
  sort_settings?: any;
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
  title?: string;
  company_name?: string;
  website?: string;
  facebook?: string;
  twitter?: string;
  linkedin?: string;
  department?: string;
  phone?: string;
  linkedin_protocol?: string;
  twitter_protocol?: string;
  facebook_protocol?: string;
}

interface AttendeeSponsors {
  id: number;
  attendee_id: number;
  sponsor_id: number;
  created_at: string;
  updated_at: string;
  deleted_at: string;
}

export interface Category {
  id: number;
  event_id: number;
  parent_id: number;
  color: string;
  sort_order: number;
  status: number;
  cat_type: string;
  created_at: string;
  updated_at: string;
  deleted_at: string;
  pivot: SponsorCategoryPivot;
  info: CategoryInfo;
}

interface CategoryInfo {
  name: string;
}

interface SponsorCategoryPivot {
  sponsor_id: number;
  category_id: number;
}