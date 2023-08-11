export interface Group {
    id: number;
    email?: string;
    ss_number?: string;
    first_name?: string;
    last_name?: string;
    organizer_id?: number;
    FIRST_NAME_PASSPORT?: string;
    LAST_NAME_PASSPORT?: string;
    BIRTHDAY_YEAR?: string;
    EMPLOYMENT_DATE?: string;
    SPOKEN_LANGUAGE?: string;
    image?: string;
    status?: number;
    allow_vote?: number;
}