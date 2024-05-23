import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { FavProgram, Program, ProgramRating } from 'application/models/program/Program'

import { Track } from 'application/models/program/Track'

import { RootState } from 'application/store/Index'

import {
    current
} from '@reduxjs/toolkit';

import { Detail } from 'application/models/program/Detail';

export interface ProgramState {
    programs: Program[],
    upcoming_programs: Program[],
    detail: Detail,
    tracks: Track[],
    track: Track,
    parent_track: Track,
    query: string,
    screen: string,
    page: number,
    total_pages: number,
    id: number,
    track_id: number,
    favouriteProgramError:string,
    agendas_attached_via_group:number[],
    rating: ProgramRating|null,
    select_day: number,
    fav_programs: FavProgram[],
}

const initialState: ProgramState = {
    programs: [],
    upcoming_programs: [],
    detail:{},
    tracks: [],
    track: {},
    parent_track: {},
    query: '',
    screen: '',
    page: 1,
    total_pages: 1,
    id: 0,
    track_id: 0,
    favouriteProgramError:'',
    agendas_attached_via_group:[],
    rating: null,
    select_day: 0,
    fav_programs: [],
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
        update(state, action: PayloadAction<{ programs: Program[], query: string, page: number, track: Track , agendas_attached_via_group:number[],total_pages:number,event_status:string}>) {
            const existed: any = current(state.programs);
            // console.log(action.payload.programs.reduce((ack, item:any)=>{
            //     let existingDate = ack.findIndex((date:any)=>(date[0].date === item[0].date));
            //     if(existingDate > -1){
            //         ack[existingDate] = [ ...ack[existingDate], ...item];
            //     }else{
            //         ack.push(item);
            //     }
            //     return ack;
            // }, [...existed]));

            state.programs = action.payload.page === 1 ? action.payload.programs : action.payload.programs.reduce((ack, item:any)=>{
                let existingDate = ack.findIndex((date:any)=>(date[0].date === item[0].date));
                if(existingDate > -1){
                    ack[existingDate] = [ ...ack[existingDate], ...item];
                }else{
                    ack.push(item);
                }
                return ack;
            }, [...existed]);
            
            // update the fav programs state
            console.log('programs: ',action.payload.programs);
            let fav_programs: FavProgram[] = [];
            action.payload.programs.forEach((group: any) => {
                group.forEach((program: any) => {
                    if (program.program_attendees_attached.length > 0) {
                        fav_programs.push({ id: program.id, is_fav: true });
                    } else {
                        fav_programs.push({ id: program.id, is_fav: false });
                    }
                });
            });
            console.log('fav_programs: ',fav_programs);
            state.fav_programs = fav_programs;
            
            state.track = action.payload.track;
            state.agendas_attached_via_group = action.payload.agendas_attached_via_group;
            state.total_pages = action.payload.total_pages;
            if(action.payload.event_status == 'ongoing'){
                // current date
                let today = new Date();
                let dd = String(today.getDate()).padStart(2, '0');
                let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
                let yyyy = today.getFullYear();
                let currentDate = yyyy + '-' + mm + '-' + dd;
               
                // Find index of program matching currentDate
                let index = 0;
                state.programs.forEach((dayPrograms, i) => {
                    let dPrograms : any = dayPrograms
                    console.log(dPrograms);
                    const foundProgram = dPrograms.find((program: any) => program.date === currentDate);
                    if (foundProgram) {
                        index = i;
                        return; // exit forEach loop if program is found
                    }
                });

                // Set select_day to found index or default to -1 if not found
                state.select_day = index;

            }else if(action.payload.event_status == 'upcoming'){
                // first date
                state.select_day = 0;
            }else if(action.payload.event_status == 'past'){
                // last date
                state.select_day = state.programs.length-1;
            }
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
        UpdateTracks(state, action: PayloadAction<{ tracks: Track[], query: string, page: number, track: Track, total_pages:number }>) {
            const existed: any = current(state.tracks);
            state.tracks = action.payload.page === 1 ? action.payload.tracks : existed.concat(action.payload.tracks);
            if(action.payload.track.parent_id == 0){
                state.parent_track = action.payload.track;
            }
            state.track = action.payload.track;
            state.total_pages = action.payload.total_pages;
        },
        MakeFavourite(state, action: PayloadAction<{ program_id: number, screen: string }>) { },
        FetchProgramDetail(state, action: PayloadAction<{ id: number }>) { },
        UpdateDetail(state, action: PayloadAction<{ detail: Detail }>) {
            state.detail = action.payload.detail;
        },
        SetFavouriteProgramError(state, action : PayloadAction<string>){
            state.favouriteProgramError = action.payload;
        },
        ResetTracks(state) {
            state.track_id = 0;
            state.tracks = [];
            state.track = {};
            state.parent_track = {};
        },
        ToggleFavourite(state, action: PayloadAction<{ program_id: number }>) {
            // toggle the favourite status of the program
            // find by program id in fav_programs and toggle the is_fav status
            let fav_programs = state.fav_programs;
            let index = fav_programs.findIndex((fav: FavProgram) => fav.id === action.payload.program_id);
            if (index > -1) {
                fav_programs[index].is_fav = !fav_programs[index].is_fav;
            }
            state.fav_programs = fav_programs;
        },
        FetchRating(state, action: PayloadAction<{ program_id: number }>) {
        },
        SaveRating(state, action: PayloadAction<{ program_id: number, rate:number,comment:string }>) {
        },
        UpdateRating(state, action: PayloadAction<{ rating: ProgramRating }>) {
            if(action.payload.rating){
                state.rating = action.payload.rating;
            }else{
                state.rating = null;
            }
        },
        FetchUpcomingPrograms(state, action: PayloadAction<{ limit: number }>) {},
        UpdateUpcomingPrograms(state, action: PayloadAction<{ programs: Program[] }>) {
            state.upcoming_programs = action.payload.programs;
        },
        
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
    ResetTracks: ProgramSlice.actions.ResetTracks,
    ToggleFavourite: ProgramSlice.actions.ToggleFavourite,
    FetchRating: ProgramSlice.actions.FetchRating,
    SaveRating: ProgramSlice.actions.SaveRating,
    UpdateRating: ProgramSlice.actions.UpdateRating,
    FetchUpcomingPrograms: ProgramSlice.actions.FetchUpcomingPrograms,
    UpdateUpcomingPrograms: ProgramSlice.actions.UpdateUpcomingPrograms,
    
}

export const SelectMyPrograms = (state: RootState) => state.programs.programs

export const SelectQuery = (state: RootState) => state.programs.query

export const SelectPage = (state: RootState) => state.programs.page

export const SelectTotalPages = (state: RootState) => state.programs.total_pages

export const SelectID = (state: RootState) => state.programs.id

export const SelectTrack = (state: RootState) => state.programs.track_id

export const SelectTracks = (state: RootState) => state.programs.tracks

export const SelectTrackDetail = (state: RootState) => state.programs.track

export const SelectParentTrackDetail = (state: RootState) => state.programs.parent_track

export const SelectProgramDetail = (state: RootState) => state.programs.detail

export const SelectFavouriteProgramError = (state: RootState) => state.programs.favouriteProgramError

export const SelectAgendasAttachedViaGroup = (state: RootState) => state.programs.agendas_attached_via_group

export const SelectRating = (state: RootState) => state.programs.rating

export const SelectUpcomingPrograms = (state: RootState) => state.programs.upcoming_programs

export const SelectDay = (state: RootState) => state.programs.select_day

export const SelectFavPrograms = (state: RootState) => state.programs.fav_programs

// Reducer
export default ProgramSlice.reducer