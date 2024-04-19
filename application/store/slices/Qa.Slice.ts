import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { Program, ProgramSettings, QaSettings } from 'application/models/qa/Qa'

import { RootState } from 'application/store/Index'

import {
    current
} from '@reduxjs/toolkit';
import { AgendaDetail, Paragraph, Question, Speaker } from 'application/models/qa/Detail';

export interface QaState {
    programs: Program[],
    qaSettings:QaSettings|null,
    programSettings:ProgramSettings|null,
    qaDetails:{
        program_detail:AgendaDetail|null,
        speakers:Speaker[],
        paragraph:Paragraph[],
        popular_questions:Question[],
        recent_questions:Question[],
        archived_questions:Question[],
        my_questions:Question[],
        clientIp:string,
        all_languages:number[],
        labels: any[]
    },
}

const initialState: QaState = {
    programs: [],
    qaSettings:null,
    programSettings:null,
    qaDetails:{
        program_detail:null,
        speakers:[],
        paragraph:[],
        popular_questions:[],
        recent_questions:[],
        archived_questions:[],
        my_questions:[],
        clientIp:'',
        all_languages:[],
        labels:[]
    }
}

// Slice
export const QaSlice = createSlice({
    name: 'qa',
    initialState,
    reducers: {
        OnFetchPrograms() {},
        update(state, action: PayloadAction<{ programs: Program[], qa_settings:QaSettings, program_settings:ProgramSettings }>) {
            state.programs = action.payload.programs;
            state.qaSettings = action.payload.qa_settings;
            state.programSettings = action.payload.program_settings;
        },
        OnFetchProgramDetail(state, action: PayloadAction<{ id: number }>) {},
        updateDetail(state, action: PayloadAction<{ program_detail:AgendaDetail, speakers:Speaker[], paragraph:Paragraph[], qa_settings:QaSettings, program_settings:ProgramSettings, client_ip:string, all_languages:number[], labels: any[] }>) {
            state.qaDetails.program_detail = action.payload.program_detail;
            state.qaDetails.speakers = action.payload.speakers;
            state.qaDetails.paragraph = action.payload.paragraph;
            state.qaSettings = action.payload.qa_settings;
            state.programSettings = action.payload.program_settings;
            state.qaDetails.clientIp = action.payload.client_ip;
            state.qaDetails.all_languages = action.payload.all_languages;
            state.qaDetails.labels = action.payload.labels;
        },
        OnFetchTabDetails(state, action: PayloadAction<{ id: number }>) {},
        updateTabDetail(state, action: PayloadAction<{ popular_questions:Question[], recent_questions:Question[], archived_questions:Question[], my_questions:Question[] }>) {
            state.qaDetails.popular_questions = action.payload.popular_questions;
            state.qaDetails.recent_questions = action.payload.recent_questions;
            state.qaDetails.archived_questions = action.payload.archived_questions;
            state.qaDetails.my_questions = action.payload.my_questions;
        },
        SubmitQa(state, action: PayloadAction<any>) {},
        SubmitQaLike(state, action: PayloadAction<{question_id:number, agenda_id:number}>) {},
        QaRecentPopularSocketUpdate(state, action: PayloadAction<any>) {
            if(action.payload.qa == undefined){
                let qa_data = action.payload
                delete qa_data.info;
                qa_data.info = qa_data.qa_detail;
                delete qa_data.detail;
                qa_data.attendee = qa_data.attendee_info;
                delete qa_data.attendee_info;
                qa_data.attendee.info = qa_data.attendee_detail;
                delete qa_data.attendee_detail
                state.qaDetails.popular_questions = [...state.qaDetails?.popular_questions, qa_data];
                state.qaDetails.recent_questions = [...state.qaDetails?.recent_questions, qa_data ];
            }
            else{
                let qa_data = action.payload.qa;
                qa_data.attendee = action.payload.qa_attendee;
                qa_data.info = action.payload.qa_info;
                state.qaDetails.popular_questions = [...state.qaDetails?.popular_questions, qa_data];
                state.qaDetails.recent_questions = [...state.qaDetails?.recent_questions, qa_data ];
            }
        },
        QaSort(state, action: PayloadAction<any>) {
            let popularQa = action.payload.data_info?.reduce((ack:any, item:any)=>{
                let q = state.qaDetails.popular_questions.find(q=>(q.id == item));
                if(q){
                    ack.push(q);
                }
                return ack;
            }, []); 
            let recentQa = action.payload.data_info?.reduce((ack:any, item:any)=>{
                let q = state.qaDetails.recent_questions.find(q=>(q.id == item));
                if(q){
                    ack.push(q);
                }
                return ack;
            }, []); 

            let archiveQa = state.qaDetails.archived_questions;
            
            let myQA = state.qaDetails.my_questions;

            popularQa?.find((q:any)=>(q.id == action.payload.update_like_qa_id))?.likes?.push({attendee_id:'',qa_id:action.payload.update_like_qa_id});
            
            recentQa?.find((q:any)=>(q.id == action.payload.update_like_qa_id))?.likes?.push({attendee_id:'',qa_id:action.payload.update_like_qa_id});
            
            myQA?.find((q:any)=>(q.id == action.payload.update_like_qa_id))?.likes?.push({attendee_id:0,qa_id:action.payload.update_like_qa_id});
            
            archiveQa?.find((q:any)=>(q.id == action.payload.update_like_qa_id))?.likes?.push({attendee_id:0,qa_id:action.payload.update_like_qa_id});

            state.qaDetails.popular_questions = popularQa;
            
            state.qaDetails.recent_questions = recentQa;

            state.qaDetails.archived_questions = archiveQa;

            state.qaDetails.my_questions = myQA;
        },
        
    },
})

// Actions
export const QaActions = {
    OnFetchPrograms:QaSlice.actions.OnFetchPrograms,
    OnFetchProgramDetail:QaSlice.actions.OnFetchProgramDetail,
    OnFetchTabDetails:QaSlice.actions.OnFetchTabDetails,
    update:QaSlice.actions.update,
    updateDetail:QaSlice.actions.updateDetail,
    updateTabDetail:QaSlice.actions.updateTabDetail,
    SubmitQa:QaSlice.actions.SubmitQa,
    SubmitQaLike:QaSlice.actions.SubmitQaLike,
    QaRecentPopularSocketUpdate:QaSlice.actions.QaRecentPopularSocketUpdate,
    QaSort:QaSlice.actions.QaSort,
}

export const SelectPrograms = (state: RootState) => state.qa.programs

export const SelectProgramSettings = (state: RootState) => state.qa.programSettings

export const SelectQaSettings = (state: RootState) => state.qa.qaSettings

export const SelectQaDetails = (state: RootState) => state.qa.qaDetails




// Reducer
export default QaSlice.reducer