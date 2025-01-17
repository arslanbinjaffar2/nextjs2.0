export interface MeetingRequest {
    id:number,
    event_meeting_space_slot_id:number,
    host_attendee_id:number,
    participant_attendee_id:number,
    status:string,
    reminder_sent:number,
    cancelled_by:string,
    event_id:number,
    created_at:string,
    updated_at:string,
    deleted_at:string,
    slot:MeetingSlot,
    host_attendee:MeetingAttendee,
    participant_attendee:MeetingAttendee,
    message:string,

}

export interface MyMeetingListing{
    my_meeting_requests:MeetingRequest[],
    labels:any,
    dates:any,
    statuses:any,
    isChatModuleActive:boolean,
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
    full_name:string,
    first_name:string,
    last_name:string,
    email:number,
    image:string,
    field_settings:any,
}

export interface AvailabilityCalendarSlot {
    id:number,
    date:string,
    start_time:string,
    end_time:string,
    attendee_id:number,
}
