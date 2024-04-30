export interface MeetingRequest {
    id:number
}

export interface MeetingSlot {
    id:number,
    start_time:string,
    end_time:string,
    duration:string,
    status:string,
    date:string,
    meeting_space?:MeetingSpace
}

export interface MeetingSpace {
    id:number,
    name:string,
    persons:number,
    event_id:number,
}
export interface MeetingAttendee {
    id:number,
    name:string,
    email:number,
}
