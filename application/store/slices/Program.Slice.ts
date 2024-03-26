import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { Program, ProgramRating } from 'application/models/program/Program'

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
        update(state, action: PayloadAction<{ programs: Program[], query: string, page: number, track: Track , agendas_attached_via_group:number[],total_pages:number}>) {
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
            state.agendas_attached_via_group = action.payload.agendas_attached_via_group;
            state.total_pages = action.payload.total_pages;
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
            const updatedPrograms: any = [...state.programs];
            let updatedProgram: Program | null = null;
            let groupIndex: number | null = null;
            let programIndex: number | null = null;

            for (let i = 0; i < updatedPrograms.length; i++) {
                const group: Program[] = updatedPrograms[i] as Program[];
                const foundProgramIndex: number = group.findIndex(program => program.id === action.payload.program_id);
                if (foundProgramIndex !== -1) {
                    groupIndex = i;
                    programIndex = foundProgramIndex;
                    updatedProgram = { ...group[foundProgramIndex] }; // Create a copy of the found program object
                    break; // Break out of the loop once the program is found
                }
            }

            if (updatedProgram && updatedProgram.program_attendees_attached.length > 0) {
                updatedProgram = { ...updatedProgram, program_attendees_attached: [] }; // Create a new object with the updated property
            } else {
                updatedProgram = {
                    ...updatedProgram!,
                    program_attendees_attached: [{ id: 0, attendee_id: 0, agenda_id: action.payload.program_id , added_by: 0, linked_from: '', link_id: 0, created_at: '', updated_at: '', deleted_at: ''}]
                }; // Create a new object with the updated property
            }

            if (updatedProgram && groupIndex !== null && programIndex !== null) {
                // Create a new copy of the group containing the updated program
                const updatedGroup: Program[] = [...updatedPrograms[groupIndex]];
                updatedGroup[programIndex] = updatedProgram; // Assign updated program to the found index in the group

                // Create a new copy of the updatedPrograms array with the updated group
                updatedPrograms[groupIndex] = updatedGroup;

                // Update updatedPrograms with the new array
                state.programs = updatedPrograms;
            }
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

// Reducer
export default ProgramSlice.reducer