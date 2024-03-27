export interface RootObject {
  alerts: Alert[];
  attendee_alerts: string | number[];
}

export interface Alert {
  id: number;
  event_id: number;
  pre_schedule: number;
  alert_date: string;
  alert_time: string;
  sendto: string;
  alert_email: number;
  alert_sms: number;
  status: number;
  created_at: string;
  updated_at: string;
  deleted_at: string;
  alert_detail: Alertdetail;
  display_alert_date: string;
  is_read: boolean;
}

export interface AlertSetting {
  id: number;
  event_id: number;
  display_in_dashboard: number;
}

export interface Alertdetail {
  title: string;
  description: string;
}