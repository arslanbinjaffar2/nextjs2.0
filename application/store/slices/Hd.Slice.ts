import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { Group, Setting, Labels } from 'application/models/hd/Hd'

import { Archivedquestion, Popularquestion } from 'application/models/hd/Detail'

import { RootState } from 'application/store/Index'

import {
    current
} from '@reduxjs/toolkit';

export interface HdState {
    groups: Group[],
    hdSettings:Setting|null,
    labels:Labels|null,
    hdDetails:{
        group:Group|null,
        popular_questions:Popularquestion[],
        archived_questions:Archivedquestion[],
        recent_questions:Popularquestion[],
        clientIp:string,
        all_languages:number[]
    },
}

const initialState: HdState = {
    groups: [],
    hdSettings:null,
    labels:null,
    hdDetails:{
        group:null,
        popular_questions:[],
        archived_questions:[],
        recent_questions:[],
        clientIp:'',
        all_languages:[]
    },
}

// Slice
export const HdSlice = createSlice({
    name: 'hd',
    initialState,
    reducers: {
        OnFetchGroups() {},
        update(state, action: PayloadAction<{ groups: Group[], settings:Setting, labels:Labels }>) {
            state.groups = action.payload.groups;
            state.hdSettings = action.payload.settings;
            state.labels = action.payload.labels;
        },
        OnFetchGroupDetail(state, action: PayloadAction<{ id: number }>) {},
        updateDetail(state, action: PayloadAction<{ hd_group:Group, settings:Setting, labels:Labels, all_languages:number[], clientIp:string }>) {
            state.hdDetails.group = action.payload.hd_group;
            state.hdSettings = action.payload.settings;
            state.labels = action.payload.labels;
            state.hdDetails.clientIp = action.payload.clientIp;
            state.hdDetails.all_languages = action.payload.all_languages;
        },
        OnFetchTabDetails(state, action: PayloadAction<{ id: number }>) {},
        updateTabDetail(state, action: PayloadAction<{ popular_questions:Popularquestion[], recent_questions:Popularquestion[], archived_questions:Archivedquestion[] }>) {
            state.hdDetails.popular_questions = action.payload.popular_questions;
            state.hdDetails.recent_questions = action.payload.recent_questions;
            state.hdDetails.archived_questions = action.payload.archived_questions;
        },
        SubmitHd(state, action: PayloadAction<any>) {},
        SubmitHdLike(state, action: PayloadAction<{question_id:number, group_id:number}>) {},
        HdRecentPopularSocketUpdate(state, action: PayloadAction<any>) {
            if(action.payload.hd == undefined){
                let hd_data = action.payload
                delete hd_data.info;
                hd_data.info = hd_data.hd_detail;
                delete hd_data.detail;
                hd_data.attendee = hd_data.attendee_info;
                delete hd_data.attendee_info;
                hd_data.attendee.info = hd_data.attendee_detail;
                delete hd_data.attendee_detail
                state.hdDetails.popular_questions = [...state.hdDetails?.popular_questions, hd_data];
                state.hdDetails.recent_questions = [...state.hdDetails?.recent_questions, hd_data ];
            }
            else{
                let hd_data = action.payload.hd;
                hd_data.attendee = action.payload.hd_attendee;
                hd_data.info = action.payload.hd_info;
                state.hdDetails.popular_questions = [...state.hdDetails?.popular_questions, hd_data];
                state.hdDetails.recent_questions = [...state.hdDetails?.recent_questions, hd_data ];
            }
        },
        HdSort(state, action: PayloadAction<any>) {
            let popularHd = action.payload.data_info?.reduce((ack:any, item:any)=>{
                let q = state.hdDetails.popular_questions.find(q=>(q.id == item));
                if(q){
                    ack.push(q);
                }
                return ack;
            }, []); 
            let recentHd = action.payload.data_info?.reduce((ack:any, item:any)=>{
                let q = state.hdDetails.recent_questions.find(q=>(q.id == item));
                if(q){
                    ack.push(q);
                }
                return ack;
            }, []); 

            let archiveHd = state.hdDetails.archived_questions;
            
            if(action.payload.updated_like_count > 0){
                popularHd?.find((q:any)=>(q.id == action.payload.update_like_hd_id))?.like_count + action.payload.updated_like_count;
                
                recentHd?.find((q:any)=>(q.id == action.payload.update_like_hd_id))?.like_count + action.payload.updated_like_count;
                
                archiveHd?.find((q:any)=>(q.id == action.payload.update_like_hd_id))?.like_count+ action.payload.updated_like_count;
            }
            else if(action.payload.updated_like_count == 0){
                popularHd?.find((q:any)=>(q.id == action.payload.update_like_hd_id))?.like_count - 1;
                
                recentHd?.find((q:any)=>(q.id == action.payload.update_like_hd_id))?.like_count - 1;
                
                archiveHd?.find((q:any)=>(q.id == action.payload.update_like_hd_id))?.like_count! - 1;
            }

            state.hdDetails.popular_questions = popularHd;
            
            state.hdDetails.recent_questions = recentHd;

            state.hdDetails.archived_questions = archiveHd;

        },
        
    },
})

// Actions
export const HdActions = {
    OnFetchGroups:HdSlice.actions.OnFetchGroups,
    OnFetchGroupDetail:HdSlice.actions.OnFetchGroupDetail,
    OnFetchTabDetails:HdSlice.actions.OnFetchTabDetails,
    update:HdSlice.actions.update,
    updateDetail:HdSlice.actions.updateDetail,
    updateTabDetail:HdSlice.actions.updateTabDetail,
    SubmitHd:HdSlice.actions.SubmitHd,
    SubmitHdLike:HdSlice.actions.SubmitHdLike,
    HdRecentPopularSocketUpdate:HdSlice.actions.HdRecentPopularSocketUpdate,
    HdSort:HdSlice.actions.HdSort,
}

export const SelectGroups = (state: RootState) => state.hd.groups

export const SelectHdSettings = (state: RootState) => state.hd.hdSettings

export const SelectLabels = (state: RootState) => state.hd.labels

export const SelectDetail = (state: RootState) => state.hd.hdDetails





// Reducer
export default HdSlice.reducer