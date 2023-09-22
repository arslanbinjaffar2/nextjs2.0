export interface RootObject {
  floor_plans: Floorplan[];
  filters: any[];
  sponsorCount: number;
  exhibitorCount: number;
}

export interface FloorPlan {
  id: number;
  document: string;
  image: string;
  event_id: number;
  organizer_id: number;
  status: number;
  pins_data: string;
  read: number;
  created_at: string;
  updated_at: string;
  deleted_at: string;
  floor_plan_name: string;
  version_number: string;
  area_floor: string;
  image_width: number;
  image_height: number;
}