import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { Program } from 'application/models/program/Program'

import { Track } from 'application/models/program/Track'

import { RootState } from 'application/store/Index'

import {
    current
} from '@reduxjs/toolkit';

import { Detail } from 'application/models/program/Detail';

export interface ProgramState {
    programs: Program[],
    detail: Detail,
    tracks: Track[],
    track: Track,
    parent_track: Track,
    query: string,
    screen: string,
    page: number,
    id: number,
    track_id: number,
    favouriteProgramError:string;
}

const initialState: ProgramState = {
    programs: [],
    detail:{},
    tracks: [],
    track: {},
    parent_track: {},
    query: '',
    screen: '',
    page: 1,
    id: 0,
    track_id: 0,
    favouriteProgramError:'',
}

// Slices
export const ProgramSlice = createSlice({
    name: 'programs',
    initialState,
    reducers: {
        FetchPrograms(state, action: PayloadAction<{ query: string, page: number, screen: string, id: number, track_id: number }>) {
            state.query = action.payload.query;
            state.id = action.payload.id;
            state.page = action.payload.page;
            state.screen = action.payload.screen;
            state.track_id = action.payload.track_id;
            if (action.payload.page === 1) {
                state.programs = [];
                state.track = {};
            }
        },
        update(state, action: PayloadAction<{ programs: Program[], query: string, page: number, track: Track }>) {
            const existed: any = current(state.programs);
            console.log(action.payload.programs.reduce((ack, item:any)=>{
                let existingDate = ack.findIndex((date:any)=>(date[0].date === item[0].date));
                if(existingDate > -1){
                    ack[existingDate] = [ ...ack[existingDate], ...item];
                }else{
                    ack.push(item);
                }
                return ack;
            }, [...existed]));

            state.programs = action.payload.page === 1 ? action.payload.programs : action.payload.programs.reduce((ack, item:any)=>{
                let existingDate = ack.findIndex((date:any)=>(date[0].date === item[0].date));
                if(existingDate > -1){
                    ack[existingDate] = [ ...ack[existingDate], ...item];
                }else{
                    ack.push(item);
                }
                return ack;
            }, [...existed]);
            state.track = action.payload.track;
        },
        FetchTracks(state, action: PayloadAction<{ query: string, page: number, screen: string, track_id: number }>) {
            state.query = action.payload.query;
            state.page = action.payload.page;
            state.screen = action.payload.screen;
            state.track_id = action.payload.track_id;
            if (action.payload.page === 1) {
                state.tracks = [];
                state.track = {};
            }
        },
        UpdateTracks(state, action: PayloadAction<{ tracks: Track[], query: string, page: number, track: Track }>) {
            const existed: any = current(state.programs);
            state.tracks = action.payload.page === 1 ? action.payload.tracks : [...existed, ...action.payload.tracks];
            if(action.payload.track.parent_id == 0){
                state.parent_track = action.payload.track;
            }
            state.track = action.payload.track;
        },
        MakeFavourite(state, action: PayloadAction<{ program_id: number, screen: string }>) { },
        FetchProgramDetail(state, action: PayloadAction<{ id: number }>) { },
        UpdateDetail(state, action: PayloadAction<{ detail: Detail }>) {
            state.detail = action.payload.detail;
        },
        SetFavouriteProgramError(state, action : PayloadAction<string>){
            state.favouriteProgramError = action.payload;
        }
    },
})

// Actions
export const ProgramActions = {
    FetchPrograms: ProgramSlice.actions.FetchPrograms,
    update: ProgramSlice.actions.update,
    MakeFavourite: ProgramSlice.actions.MakeFavourite,
    FetchTracks: ProgramSlice.actions.FetchTracks,
    UpdateTracks: ProgramSlice.actions.UpdateTracks,
    FetchProgramDetail: ProgramSlice.actions.FetchProgramDetail,
    UpdateDetail: ProgramSlice.actions.UpdateDetail,
    SetFavouriteProgramError: ProgramSlice.actions.SetFavouriteProgramError,
}

export const SelectMyPrograms = (state: RootState) => state.programs.programs

export const SelectQuery = (state: RootState) => state.programs.query

export const SelectPage = (state: RootState) => state.programs.page

export const SelectID = (state: RootState) => state.programs.id

export const SelectTrack = (state: RootState) => state.programs.track_id

export const SelectTracks = (state: RootState) => state.programs.tracks

export const SelectTrackDetail = (state: RootState) => state.programs.track

export const SelectParentTrackDetail = (state: RootState) => state.programs.parent_track

export const SelectProgramDetail = (state: RootState) => state.programs.detail

export const SelectFavouriteProgramError = (state: RootState) => state.programs.favouriteProgramError

// Reducer
export default ProgramSlice.reducer