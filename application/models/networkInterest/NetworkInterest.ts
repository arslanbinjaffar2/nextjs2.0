export interface Keyword {
  id: number;
  name: string;
  parent_id: number;
  organizer_id: number;
  event_id: number;
  sort_order: number;
  status: number;
  created_at: string;
  updated_at: string;
  deleted_at: string;
  registration_form_id: number;
  keywords: any[];
  children?: Child[];
}

export interface Child {
  id: number;
  name: string;
  parent_id: number;
  organizer_id: number;
  event_id: number;
  sort_order: number;
  status: number;
  created_at: string;
  updated_at: string;
  deleted_at: string;
  registration_form_id: number;
  keywords: any[];
}