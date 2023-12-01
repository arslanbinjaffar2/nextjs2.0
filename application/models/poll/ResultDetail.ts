export interface MyPollResultDetail {
  id: number;
  event_id: number;
  sort_order: number;
  is_anonymous: number;
  agenda_id: number;
  start_date: string;
  end_date: string;
  status: number;
  created_at: string;
  updated_at: string;
  deleted_at: string;
  program: Program;
  question: Question[];
}

export interface Question {
  id: number;
  question_type: string;
  result_chart_type: string;
  required_question: string;
  enable_comments: string;
  is_anonymous: number;
  sort_order: number;
  start_date: string;
  end_date: string;
  poll_id: number;
  status: number;
  max_options: number;
  min_options: number;
  created_at: string;
  updated_at: string;
  deleted_at: string;
  allow_attendee: string;
  is_participants_multiple_times: number;
  entries_per_participant: number;
  info: Info2;
  answer: Answer[];
  matrix: Matrix[];
  results: Result[];
  score: Score[];
}

export interface Score {
  id: number;
  score: number;
  event_id: number;
  question_id: number;
  attendee_id: number;
  status: number;
  created_at: string;
  updated_at: string;
  deleted_at: string;
}

export interface Result {
  id: number;
  answer: string;
  comments: string;
  question_id: number;
  answer_id: number;
  event_id: number;
  poll_id: number;
  agenda_id: number;
  attendee_id: number;
  is_updated: number;
  status: number;
  created_at: string;
  updated_at: string;
  deleted_at: string;
}

export interface Matrix {
  id: number;
  name: string;
  sort_order: number;
  question_id: number;
  created_at: string;
  updated_at: string;
  deleted_at: string;
}

export interface Answer {
  id: number;
  correct: number;
  question_id: number;
  status: number;
  sort_order: number;
  created_at: string;
  updated_at: string;
  deleted_at: string;
  info: Info3;
}

export interface Info3 {
  answer: string;
}

export interface Info2 {
  question: string;
}

export interface Program {
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
}

export interface Info {
  topic: string;
  description: string;
  date: string;
  start_time: string;
  end_time: string;
  location: string;
}