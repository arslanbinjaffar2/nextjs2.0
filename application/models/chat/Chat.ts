export interface Chat {
    id: number;
    event_id: number;
    latest_message: ChatMessage;
    messages_count: number;
    messages: ChatMessage[];
    participants: Participant[];
    participants_info: ParticipantInfo[];
}

export interface ChatMessage {
    id: number;
    body: string;
    sender_id: number;
    user_type: string;
    sent_date: string;
    read_state: ReadState[];
    sender: ParticipantInfo;
}

export interface ReadState {
    message_id: string;
    user_id: number;
    read_date: string;
}

export interface Participant {
    thread_id: string;
    user_id: string;
}

export interface ParticipantInfo {
    id: number;
    email: string;
    ss_number: string;
    first_name: string;
    last_name: string;
    full_name: string;
    image: string;
    sort_field_setting: any;
}

export interface NewChatSearchResults {
    groups: ParentGroup[];
    attendees: Attendee[];
}

export interface Group {
    id: number;
    name: string;
    image: string;
    color: string;
    parent_id: number;
}

export interface ParentGroup {
    parent: Group;
    sub_groups: Group[];
}

export interface Attendee {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    full_name: string;
    image: string;
}