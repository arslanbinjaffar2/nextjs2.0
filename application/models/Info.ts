export interface Info {
    id?: number;
    sort_order?: number;
    menu_id?: number;
    event_id?: number;
    page_type?: number;
    image?: string;
    image_position?: string;
    pdf?: string;
    icon?: string;
    url?: string;
    website_protocol?: string;
    status?: number;
    target?: string;
    created_at?: string;
    updated_at?: string;
    deleted_at?: string;
    info?: string;
    type?: string;
    detail?: Detail;
    cms?: string;

    //For detail api
    name?: string,
    description?: any,
    pdf_title?: string

    // for file check
    subItems?: Info[]
    subMenuItems?: Info[]
}

export interface Info {
    id?: number;
    name?: string;
    value?: string;
    page_id?: number;
    languages_id?: number;
    status?: number;
    created_at?: string;
    updated_at?: string;
    deleted_at?: string;
}

export interface Detail {
    name?: string,
    description?: any,
    pdf_title?: string
}