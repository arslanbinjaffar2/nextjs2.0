export interface RootObject {
  floor_plans: FloorPlan[];
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
  categories?:FloorPlanCategory[];
}


export interface FloorPlanDetail {
  floorPlan: any;
  floorPlanPins: any;
}
export interface FloorPlanCategory {
  id: number;
  event_id: number;
  parent_id: number;
  color: string;
  sort_order: number;
  status: number;
  cat_type: string;
  pins_count: number;
  info: FloorPlanCategoryInfo[];
}

export interface FloorPlanCategoryInfo {
  id: number;
  name: string;
  value: string;
  category_id: number;
  status: number;
}