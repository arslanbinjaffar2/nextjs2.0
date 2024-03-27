import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { Attendee } from 'application/models/attendee/Attendee'

import { Category } from 'application/models/event/Category'

import { Detail } from 'application/models/attendee/Detail'

import { Group } from 'application/models/attendee/Group'

import { RootState } from 'application/store/Index'

import {
    current
} from '@reduxjs/toolkit';

export interface AttendeeState {
    attendees: Attendee[],
    my_attendees: Attendee[],
    categories: Category[],
    detail: Detail,
    groups: Group[],
    query: string,
    page: number,
    group_id: number,
    parent_id: number,
    group_name: string,
    my_attendee_id: number,
    category_id: number,
    category_name: string,
    total: number,
    program_id: number,
    hotels:any,
    last_page:number
}

const initialState: AttendeeState = {
    attendees: [],
    my_attendees: [],
    categories: [],
    detail: {
        attendee_tabs_settings: [],
        program_setting: {},
        speaker_setting: {},
        sub_registration: {},
        setting: {},
        field_setting: {},
        sort_field_labels:{},
        sort_field_setting:[],
        show_hotel_management:0,
        show_hotels:0,
        sub_registration_module_status:0,
    },
    groups: [],
    query: '',
    page: 1,
    group_id: 0,
    parent_id: 0,
    group_name: '',
    my_attendee_id: 0,
    category_id: 0,
    category_name: '',
    total: 0,
    program_id: 0,
    hotels:null,
    last_page:1
}

// Slice
export const AttendeeSlice = createSlice({
    name: 'attendees',
    initialState,
    reducers: {
        FetchAttendees(state, action: PayloadAction<{ group_id: number, query: string, page: number, my_attendee_id: number, speaker: number, category_id: number, screen: string, program_id: number }>) {
            state.query = action.payload.query;
            state.page = action.payload.page;
            state.group_id = action.payload.group_id;
            state.my_attendee_id = action.payload.my_attendee_id;
            state.category_id = action.payload.category_id;
            state.program_id = action.payload.program_id;
            if (action.payload.category_id === 0) {
                state.category_name = '';
            }
            if (action.payload.page === 1) {
                if(action.payload.screen !== 'dashboard-speakers'){
                    state.my_attendees = []
                }
                state.attendees =  []
            }
        },
        FetchGroups(state, action: PayloadAction<{ query: string, page: number, group_id: number, attendee_id: number, program_id: number }>) {
            state.query = action.payload.query;
            state.page = action.payload.page;
            state.group_id = action.payload.group_id;
            state.group_name = state.groups?.find((group: Group, key: number) => group.id === action.payload.group_id)?.info?.name!;
            if (action.payload.page === 1) {
                state.groups = []
            }
        },
        Update(state, action: PayloadAction<{ attendee: Attendee[], group_id: number, query: string, page: number, group_name: string, screen: string, total: number, last_page:number }>) {
            const existed: any = current(state.attendees);
            if (action.payload.screen === "dashboard-my-speakers") {
                state.my_attendees = action.payload.page === 1 ? action.payload.attendee : [...existed, ...action.payload.attendee];
            } else {
                state.attendees = action.payload.page === 1 ? action.payload.attendee : [...existed, ...action.payload.attendee];
                state.total = action.payload.total;
                state.last_page = action.payload.last_page;
            }
            state.group_name = action.payload.group_name;
        },
        UpdateGroups(state, action: PayloadAction<{ groups: Group[], query: string, page: number, group_id: number }>) {
            const existed: any = current(state.groups);
            state.groups = action.payload.page === 1 ? action.payload.groups : [...existed, ...action.payload.groups];
        },
        MakeFavourite(state, action: PayloadAction<{ attendee_id: number, screen: string }>) { },
        UpdateFavourite(state, action: PayloadAction<{ attendee_id: number, screen:string}>) { 
            if(action.payload.screen === "listing"){
                let attendees = state.attendees;
                let attendee = attendees.find((attendee: Attendee) => attendee.id === action.payload.attendee_id);
                if(attendee){
                    attendee.favourite = attendee.favourite === 1 ? 0 : 1;
                }
                state.attendees = attendees;
            }else{
                let detail = state.detail;
                detail.is_favourite = detail.is_favourite === 1 ? 0 : 1;
                state.detail = detail;
            }
         },
        FetchAttendeeDetail(state, action: PayloadAction<{ id: number, speaker: number }>) { },
        UpdateDetail(state, action: PayloadAction<{ detail: Detail }>) {
            state.detail = action.payload.detail;
        },
        UpdateCategory(state, action: PayloadAction<{ category_id: number, category_name: string, parent_id:number }>) {
            state.category_id = action.payload.category_id;
            state.category_name = action.payload.category_name;
            state.parent_id = action.payload.parent_id;
        },
        FetchCategories(state, action: PayloadAction<{ parent_id: number, query: string, page: number, cat_type: string }>) {
            state.query = action.payload.query;
            state.page = action.payload.page;
            state.parent_id = action.payload.parent_id;
            if (action.payload.parent_id === 0) {
                state.category_name = '';
            }
            state.categories = []
        },
        UpdateCategories(state, action: PayloadAction<{ categories: Category[], page: number, category_name: string }>) {
            const existed: any = current(state.categories);
            state.categories = action.payload.page === 1 ? action.payload.categories : [...existed, ...action.payload.categories];
            state.category_name = action.payload.category_name;
        },
        FetchHotels(){},
        updateHotels(state, action: PayloadAction<any>){
            state.hotels = action.payload
        },
    },
});

// Actions
export const AttendeeActions = {
    FetchAttendees: AttendeeSlice.actions.FetchAttendees,
    FetchGroups: AttendeeSlice.actions.FetchGroups,
    Update: AttendeeSlice.actions.Update,
    UpdateGroups: AttendeeSlice.actions.UpdateGroups,
    MakeFavourite: AttendeeSlice.actions.MakeFavourite,
    UpdateFavourite: AttendeeSlice.actions.UpdateFavourite,
    FetchAttendeeDetail: AttendeeSlice.actions.FetchAttendeeDetail,
    UpdateDetail: AttendeeSlice.actions.UpdateDetail,
    UpdateCategory: AttendeeSlice.actions.UpdateCategory,
    FetchCategories: AttendeeSlice.actions.FetchCategories,
    UpdateCategories: AttendeeSlice.actions.UpdateCategories,
    FetchHotels: AttendeeSlice.actions.FetchHotels,
    updateHotels: AttendeeSlice.actions.updateHotels,
}

export const SelectAttendees = (state: RootState) => state.attendees.attendees

export const SelectMyAttendees = (state: RootState) => state.attendees.my_attendees

export const SelectSelectTotal = (state: RootState) => state.attendees.total

export const SelectGroups = (state: RootState) => state.attendees.groups

export const SelectQuery = (state: RootState) => state.attendees.query

export const SelectPage = (state: RootState) => state.attendees.page

export const SelectGroup = (state: RootState) => state.attendees.group_id

export const SelectGroupName = (state: RootState) => state.attendees.group_name

export const SelectAttendeeDetail = (state: RootState) => state.attendees.detail

export const SelectAttendeeCategory = (state: RootState) => state.attendees.category_id

export const SelectCategoryParendId = (state: RootState) => state.attendees.parent_id

export const SelectCategories = (state: RootState) => state.attendees.categories

export const SelectCategoryName = (state: RootState) => state.attendees.category_name

export const SelectHotels = (state: RootState) => state.attendees.hotels

export const SelectLastPage = (state: RootState) => state.attendees.last_page

// Reducer
export default AttendeeSlice.reducer