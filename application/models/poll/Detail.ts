export interface PollDetail {
    topic: string;
    description: string;
    date: string;
    start_time: string;
    end_time: string;
    location: string;
    tickets: string;
    questions: Question[];
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
    info: Info;
    answer: Answer[];
    display: string;
    matrix: Matrix[];
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
    sort_order: number;
    status: number;
    created_at: string;
    updated_at: string;
    deleted_at: string;
    answer: string;
    correct: number;
  }
  
  export interface Info {
    question: string;
  }

export type FormData = Record<string | number, any>
