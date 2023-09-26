export interface RootObject {
  banners: Banner[];
  banner_setting: BannerSetting;
}

export interface BannerSetting {
  id: number;
  event_id: number;
  main_banner_position: string;
  native_banner_position: string;
  bannerads_orderby: number;
  display_banner: number;
  created_at: string;
  updated_at: string;
  deleted_at: string;
}

export interface Banner {
  id: number;
  event_id: number;
  sponsor_id: number;
  exhibitor_id: number;
  agenda_id: number;
  other_link_url: string;
  sort_order: number;
  status: number;
  banner_type: string;
  banner_position: string;
  created_at: string;
  updated_at: string;
  deleted_at: string;
  start_date: string;
  end_date: string;
  image?: string;
  url?: string;
}