export interface HomeMyEvent{
  id?: number;
  name?: string;
  url?: string;
  start_date?: string;
  end_date?: string;
  location_name?: string;
  app_header_logo?: string;
  description?: string;
}
export interface UpcomingEvent{
  id?: number;
  name?: string;
  url?: string;
  start_date?: string;
  end_date?: string;
  location_name?: string;
  app_header_logo?: string;
  description?: string;
  register_link?: string;
  not_attending_link?: string;
}
export interface HomeMyEventDetail {
  detail?: EventDetail;
  name?: any[];
}
export interface EventDetail {
  id?: number;
  event_id?: number;
  name?: string;
  email?: string;
  logo?: string;
  booth?: string;
  location_name?: string;
  phone_number?: string;
  website?: string;
  twitter?: string;
  facebook?: string;
  linkedin?: string;
  stype?: number;
  allow_reservations?: string;
  status?: number;
  allow_card_reader?: number;
  login_email?: string;
  password?: string;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string;
  url?: string;
  description?: any;
  start_date?: string;
  end_date?: string;
  app_header_logo?: string;
  event_description?: string;
  register_link?: string;
  not_attending_link?: string;
}

