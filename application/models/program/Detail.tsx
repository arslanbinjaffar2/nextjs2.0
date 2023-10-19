export interface Detail {
    program?: Program;
    program_tabs_settings?: TabSetting[];
    attached_attendee_count?: number;
    polls_count?: number;
    document_id?: string;
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

interface Program {
    id?: number;
    workshop_id?: number;
    topic?: string;
    description?: string;
    date?: string;
    heading_date?: string;
    start_time?: string;
    end_time?: string;
    location?: string;
    start_date_time?: string;
    program_speakers?: any[];
    program_tracks?: any[];
}