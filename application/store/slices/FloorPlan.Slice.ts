import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { FloorPlan, FloorPlanCategory, FloorPlanDetail } from 'application/models/floorPlans/FloorPlans'

import { RootState } from 'application/store/Index'

import {
    current
} from '@reduxjs/toolkit';

export interface FloorPlanState {
    floor_plans: FloorPlan[];
    categories: FloorPlanCategory[];
    detail: FloorPlanDetail | null;
    filters: any[];
    sponsorCount: number;
    exhibitorCount: number;
    labels: any;
}

const initialState: FloorPlanState = {
    floor_plans: [],
    detail: null,
    filters: [],
    sponsorCount: 0,
    exhibitorCount: 0,
    labels: [],
    categories: [],
}

// Slice
export const FloorPlanSlice = createSlice({
    name: 'floorPlans',
    initialState,
    reducers: {
        FetchFloorPlans() {},
        update(state, action: PayloadAction<{ floor_plans: FloorPlan[], filters:any, sponsorCount:number, exhibitorCount:number }>) {
            state.floor_plans = action.payload.floor_plans;
            state.filters = action.payload.filters;
            state.categories = action.payload.filters;
            state.sponsorCount = action.payload.sponsorCount;
            state.exhibitorCount = action.payload.exhibitorCount;
        },
        FetchFloorPlanDetail(state, action: PayloadAction<{ id: number }>) {},
        updateFloorPlanDetail(state, action: PayloadAction<{ floor_plan: FloorPlanDetail }>) {
            state.detail = action.payload.floor_plan;
        },
        updateLabels(state, action: PayloadAction<{ labels: any }>) {
            state.labels = action.payload.labels;
        }

    },
})

// Actions
export const FloorPlanActions = {
    FetchFloorPlans:FloorPlanSlice.actions.FetchFloorPlans,
    update:FloorPlanSlice.actions.update,
    FetchFloorPlanDetail:FloorPlanSlice.actions.FetchFloorPlanDetail,
    updateFloorPlanDetail:FloorPlanSlice.actions.updateFloorPlanDetail,
    updateLabels:FloorPlanSlice.actions.updateLabels
}

export const SelectFloorPlans = (state: RootState) => state.floorPlans.floor_plans

export const SelectFloorPlanFilters = (state: RootState) => state.floorPlans.filters

export const SelectFloorPlanSponsorCount = (state: RootState) => state.floorPlans.sponsorCount

export const SelectFloorPlanExhibitorCount = (state: RootState) => state.floorPlans.exhibitorCount

export const SelectFloorPlanDetail = (state: RootState) => state.floorPlans.detail

export const SelectFloorPlanLabels = (state: RootState) => state.floorPlans.labels

export const SelectFloorPlanCategories = (state: RootState) => state.floorPlans.categories



// Reducer
export default FloorPlanSlice.reducer