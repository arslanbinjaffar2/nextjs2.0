import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { Document } from 'application/models/document/Document'

import type { RootState } from 'application/store/Index'

import {
    current
} from '@reduxjs/toolkit';

import KeywordFilter from 'application/utils/KeywordFilter';
import ReadDocumentFilter from 'application/utils/ReadDocumentFilter';

export interface DocumentState {
    data: Document[],
    documents: Document[],
    query: string,
    speaker_id: number,
    sponsor_id: number,
    exhibitor_id: number,
    agenda_id: number,
    document_id: number,
}

const initialState: DocumentState = {
    data: [],
    documents: [],
    query: '',
    speaker_id: 0,
    sponsor_id: 0,
    exhibitor_id: 0,
    agenda_id: 0,
    document_id: 0,
}

// Slice
export const DocumentSlice = createSlice({
    name: 'documents',
    initialState,
    reducers: {
        FetchDocuments(state, action: PayloadAction<{ speaker_id: number, sponsor_id: number, exhibitor_id: number, agenda_id: number }>) {
            state.speaker_id = action.payload.speaker_id;
            state.sponsor_id = action.payload.sponsor_id;
            state.exhibitor_id = action.payload.exhibitor_id;
            state.agenda_id = action.payload.agenda_id;
        },
        update(state, action: PayloadAction<Document[]>) {
            state.data = action.payload;
            state.documents = action.payload;
        },
        FilterDocuments(state, action: PayloadAction<{ document_id: number, query: string }>) {
            
            console.log(action.payload.document_id, 'doc_id');

            console.log(action.payload.query, 'doc_id');

            console.log(ReadDocumentFilter(current(state.data), action.payload.document_id), 'filteredDocuments');

            state.document_id = action.payload.document_id;
            
            const records = action.payload.query !== '' ? KeywordFilter(ReadDocumentFilter(current(state.data), action.payload.document_id), 'name', action.payload.query) : ReadDocumentFilter(current(state.data), action.payload.document_id);
            
            console.log(records);

            state.query = action.payload.query;

            state.documents = records;
        },
        clearState(state){
            state.data= [];
            state.documents= [];
            state.query= '';
            state.speaker_id= 0;
            state.sponsor_id= 0;
            state.exhibitor_id= 0;
            state.agenda_id= 0;
        }
    },
})

// Actions
export const DocumentActions = {
    FetchDocuments: DocumentSlice.actions.FetchDocuments,
    FilterDocuments: DocumentSlice.actions.FilterDocuments,
    update: DocumentSlice.actions.update,
    clearState: DocumentSlice.actions.clearState,
}

export const SelectDocuments = (state: RootState) => state.documents.documents

export const SelectData = (state: RootState) => state.documents.data

export const SelectQuery = (state: RootState) => state.documents.query

export const SelectSpeakerID = (state: RootState) => state.documents.speaker_id

export const SelectSponsorID = (state: RootState) => state.documents.sponsor_id

export const SelectExhibitor = (state: RootState) => state.documents.exhibitor_id

export const SelectAgendaID = (state: RootState) => state.documents.agenda_id

export const SelectDocumentID = (state: RootState) => state.documents.document_id

// Reducer
export default DocumentSlice.reducer