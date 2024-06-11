export interface HomeMyEvent{
  id?: number;
  name?: string;
  url?: string;
  start_date?: string;
  end_date?: string;
  location?: string;
  app_icon?: string;
}
export interface UpcomingEvent{
  id?: number;
  name?: string;
  url?: string;
  start_date?: string;
  end_date?: string;
  location?: string;
  app_icon?: string;
  registration_url?: string;
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
  app_icon?: string;
  registration_url?: string;
  event_description?: string;
}

