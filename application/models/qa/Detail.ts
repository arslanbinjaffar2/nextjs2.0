export interface RootObject {
  agenda_detail: AgendaDetail;
  speakers: Speaker[];
  paragraph: Paragraph[];
}


export interface Paragraph {
  id: number;
  event_id: number;
  serial_number: string;
  heading: string;
  sort_order: number;
  created_at: string;
  updated_at: string;
  deleted_at: string;
}

export interface AgendaDetail {
  id: number;
  event_id: number;
  start_date: string;
  start_time: string;
  link_type: string;
  created_at: string;
  updated_at: string;
  deleted_at: string;
  workshop_id: number;
  qa: number;
  ticket: number;
  enable_checkin: number;
  enable_speakerlist: number;
  hide_on_registrationsite: number;
  hide_on_app: number;
  only_for_qa: number;
  only_for_speaker_list: number;
  vonageSessionId: string;
  show_program_on_check_in_app: number;
  validate_session_checkin: number;
  hide_time: number;
  activate_json_feed: number;
  only_for_poll: number;
  registration_form_ids: string;
  info: Info;
  tracks:any;
}

export interface Info {
  [x: string]: any;
  topic: string;
  description: string;
  date: string;
  start_time: string;
  end_time: string;
  location: string;
}

export interface Speaker {
  id: number;
  event_id: number;
  eventsite_show_home: number;
  agenda_id: number;
  attendee_id: number;
  sort_order: number;
  agenda_speaker_sort: number;
  created_at: string;
  updated_at: string;
  deleted_at: string;
  attendee: Attendee;
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
}

export interface repsonseTablisting {
  popular_questions: Question[];
  recent_questions: Question[];
  archived_questions: Question[];
  my_questions: Question[];
}

export interface Question {
  id: number;
  answered: string;
  show_projector: number;
  rejected: number;
  q_startTime: string;
  isStart: number;
  displayed: number;
  sort_order: number;
  attendee_id: number;
  event_id: number;
  agenda_id: number;
  speaker_id: number;
  anonymous_user: number;
  like_count: number;
  created_at: string;
  updated_at: string;
  deleted_at: string;
  clone: number;
  info: QuestionInfo;
  attendee: Attendee2;
  likes: Like[];
}

export interface Like {
  id?: number;
  event_id?: number;
  attendee_id?: number;
  qa_id?: number;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string;
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
  info: Info2;
}

export interface Info2 {
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

export interface QuestionInfo {
  question: string;
  question_time: string;
  answer: string;
  answer_time: string;
  paragraph_number: string;
  paragraph_id: string;
  line_number: string;
}