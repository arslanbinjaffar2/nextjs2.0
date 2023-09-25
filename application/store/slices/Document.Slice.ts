import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { Document } from 'application/models/document/Document'

import type { RootState } from 'application/store/Index'

import {
    current
} from '@reduxjs/toolkit';
import KeywordFilter from 'application/utils/KeywordFilter';

export interface DocumentState {
    data: Document[],
    documents: Document[],
    query: string,
    speaker_id: number,
    sponsor_id: number,
    exhibitor_id: number,
}

const initialState: DocumentState = {
    data: [],
    documents: [],
    query: '',
    speaker_id: 0,
    sponsor_id: 0,
    exhibitor_id: 0,
}

// Slice
export const DocumentSlice = createSlice({
    name: 'documents',
    initialState,
    reducers: {
        FetchDocuments(state, action: PayloadAction<{ speaker_id: number, sponsor_id: number, exhibitor_id: number }>) {
            state.speaker_id = action.payload.speaker_id;
            state.sponsor_id = action.payload.sponsor_id;
            state.exhibitor_id = action.payload.exhibitor_id;
        },
        update(state, action: PayloadAction<Document[]>) {
            state.data = action.payload;
            state.documents = action.payload;
        },
        FilterDocuments(state, action: PayloadAction<{ document_id: number, query: string }>) {
            const readDocument = (data: Document[], document_id: number): Document[] => {
                for (let obj of data) {
                    if (obj.id === document_id) {
                        return obj.children_files;
                    }
                    if (obj.children) {
                        let result = readDocument(obj.children_files, document_id);
                        if (result) {
                            return result;
                        }
                    }
                }
                return [];
            }

            const records = action.payload.document_id === 0 ? KeywordFilter(current(state.data), 'name', action.payload.query) : readDocument(current(state.data), action.payload.document_id);

            state.query = action.payload.query;

            state.documents = records;
        },
    },
})

// Actions
export const DocumentActions = {
    FetchDocuments: DocumentSlice.actions.FetchDocuments,
    FilterDocuments: DocumentSlice.actions.FilterDocuments,
    update: DocumentSlice.actions.update,
}

export const SelectDocuments = (state: RootState) => state.documents.documents

export const SelectData = (state: RootState) => state.documents.data

export const SelectQuery = (state: RootState) => state.documents.query

export const SelectSpeakerID = (state: RootState) => state.documents.speaker_id

export const SelectSponsorID = (state: RootState) => state.documents.sponsor_id

export const SelectExhibitor = (state: RootState) => state.documents.exhibitor_id

// Reducer
export default DocumentSlice.reducer