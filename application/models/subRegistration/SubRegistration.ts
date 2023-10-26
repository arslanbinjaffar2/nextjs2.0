export interface AfterLogin {
  labels: any[];
  settings: Settings;
  questions: Questions;
  skip_msg: number;
  alert_label: string;
  error_msg: string;
  first_time: string;
  min_alert_label: string;
  displaySubregistration: string;
  all_programs: Allprogram[];
}

export interface Allprogram {
  id: number;
  name: string;
  description: Description[];
  workshop: string;
  workshop_id: string;
  program_first_track: string;
  date: string;
  start_time: string;
  end_time: string;
}

export interface Description {
  desc: string;
}

export interface Questions {
  id: number;
  event_id: number;
  status: number;
  created_at: string;
  updated_at: string;
  deleted_at: string;
  registration_form_id: number;
  question: Question[];
}

export interface Question {
  id: number;
  question_type: string;
  required_question: string;
  enable_comments: string;
  sort_order: number;
  sub_registration_id: number;
  status: number;
  link_to: string;
  max_options: number;
  min_options: number;
  created_at: string;
  updated_at: string;
  deleted_at: string;
  linked_workshop_id: number;
  program_date: string;
  info: Info[];
  answer: Answer[];
  result: any[];
  matrix: any[];
  display_question: string;
  show: string;
}

export interface Answer {
  id: number;
  sort_order: number;
  question_id: number;
  correct: number;
  status: number;
  link_to: number;
  created_at: string;
  updated_at: string;
  deleted_at: string;
  sub_registration_limit: string;
  info: Info2[];
  tickets?: string;
}

export interface Info2 {
  id: number;
  name: string;
  value: string;
  answer_id: number;
  languages_id: number;
  status: number;
  created_at: string;
  updated_at: string;
  deleted_at: string;
}

export interface Info {
  id: number;
  name: string;
  value: string;
  question_id: number;
  languages_id: number;
  status: number;
  created_at: string;
  updated_at: string;
  deleted_at: string;
}

export interface Settings {
  id: number;
  event_id: number;
  listing: number;
  answer: number;
  link_to: number;
  show_optional: number;
  update_answer_email: number;
  result_email: number;
  end_date: string;
  created_at: string;
  updated_at: string;
  deleted_at: string;
  show_sub_registration_on_web_app: number;
  session_registration: number;
  session_registration_confirmation: string;
  favorite_session_registration_same_time: number;
}

export type FormData = Record<string | number, any>
