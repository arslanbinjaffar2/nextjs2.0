export interface Chat {
    id: number;
    event_id: number;
    latest_message: ChatMessage;
    messages: ChatMessage[];
    participants: Participant[];
    participants_info: ParticipantInfo[];
}

export interface ChatMessage {
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
}

