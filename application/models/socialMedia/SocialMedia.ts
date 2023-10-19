export interface RootObject {
  social_media: SocialMedia[];
}

export interface SocialMedia {
  id: number;
  event_id: number;
  name: string;
  value: string;
  select_type: string;
  sort_order: number;
  created_at: string;
  updated_at: string;
  deleted_at: string;
}