export type Polls = Record<string, Poll[]>;
export type PollLabels = Record<string, string>;
export interface Poll {
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
  end_time: string;
  program: Program;
  available: string;
  agenda_start_date: string;
  agenda_start_date_formatted: string;
  agenda_favs: Agendafav[];
}

export interface Agendafav {
  id: number;
  attendee_id: number;
  agenda_id: number;
  added_by: number;
  linked_from: string;
  link_id: number;
  created_at: string;
  updated_at: string;
  deleted_at: string;
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
  tickets: string;
}

export interface PollSetting {
  id: number;
  event_id: number;
  tab: number;
  alerts: number;
  user_settings: number;
  display_poll: number;
  display_survey: number;
  tagcloud_shape: string;
  tagcloud_colors: string;
  projector_refresh_time: number;
  font_size: string;
  display_graph_logo: number;
  display_graph_question_heading: number;
  created_at: string;
  updated_at: string;
  deleted_at: string;
  display_poll_module: number;
  display_survey_module: number;
  projector_attendee_count: number;
  display_leader_board_attendee_image: number;
  display_leader_board_attendee_title: number;
  display_leader_board_attendee_company: number;
  display_authority: number;
  authority_max_request_allowed: number;
  display_percentage: number;
  projector_setting: string;
  number_of_notification: number;
  notification_interval: number;
  notification_progress_bar: number;
  end_date: string;
  end_time: string;
  use_webview: number;
  enable_projectors: number;
  refresh_projector_view: number;
}

export interface PollSubmitData {
  poll_id?: number;
  agenda_id?: number;
  event_id: number;
  attendee_id: number;
  base_url: string;
  organizer_id: number;
  create_date: string;
  submitted_questions: SubmittedQuestion[];
}

export interface SubmittedQuestion {
  id: number;
  type: string;
  required: string;
  is_anonymous: number;
  comment?: string;
  original_answers?: OriginalAnswer[];
  answers?: Answer[];
}

export interface Answer {
  id: number | string | any;
}

export interface OriginalAnswer {
  id: number;
  correct?: number;
}