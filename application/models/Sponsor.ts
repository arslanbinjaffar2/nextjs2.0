export interface Sponsor {
    id: number;
    event_id: number;
    name: string;
    email: string;
    logo: string;
    booth: string;
    phone_number: string;
    website: string;
    twitter: string;
    facebook: string;
    linkedin: string;
    stype: number;
    allow_reservations: string;
    status: number;
    allow_card_reader: number;
    login_email: string;
    password: string;
    created_at: string;
    updated_at: string;
    deleted_at: string;
    url: string;
    api_key: string;
    allow_api_key_module: string;
    categories: Category[];
    attendee_sponsors: AttendeeSponsors[];
    show_cat: boolean;
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
    pivot: Pivot;
    info: Info;
}

interface Info {
    name: string;
}

interface AttendeeSponsors {
    id: number;
    attendee_id: number;
    sponsor_id: number;
    created_at: string;
    updated_at: string;
    deleted_at: string;
}

interface Pivot {
    sponsor_id: number;
    category_id: number;
}