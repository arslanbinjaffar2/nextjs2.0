export interface Group {
    id?: number;
    parent_id?: number;
    link_type?: string;
    event_id?: number;
    color?: string;
    sort_order?: number;
    allow_multiple?: number;
    status?: number;
    created_at?: string;
    updated_at?: string;
    deleted_at?: string;
    info?: Info;
}

interface Info {
    name?: string;
    initial?: string;
}