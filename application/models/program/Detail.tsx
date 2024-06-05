export interface Detail {
    program?: Program;
    program_tabs_settings?: TabSetting[];
    agenda_poll_questions?: PollQuestion[];
    attendee_program_groups?: number;
    attached_attendee_count?: number;
    polls_count?: number;
    authority_given?: number;
    authority_recieved?: number;
    document_id?: string;
    group_count?:number;
    has_documents?:number;
    has_active_polls?:boolean;
}

interface TabSetting {
    id?: number;
    event_id?: number;
    tab_name?: string;
    module?: string;
    sort_order?: number;
    status?: number;
    created_at?: string;
    updated_at?: string;
    deleted_at?: string;
}

export interface Program {
    id?: number;
    workshop_id?: number;
    topic?: string;
    description?: string;
    date?: string;
    heading_date?: string;
    start_time?: string;
    end_time?: string;
    location?: string;
    enable_speakerlist?: number;
    image?: string;
    start_date_time?: string;
    program_speakers?: any[];
    program_tracks?: any[];
    qa?: number;
    enable_checkin?: number;
    hide_time?: number;
    videos?: string;
    is_attatched_with_subregistration: number;
}

interface PollQuestion {
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
    name: string;
    value: string;
    answer: any[];
    display: string;
    matrix: any[];
}