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
}

const initialState: DocumentState = {
    data: [],
    documents: [],
    query: '',
}

// Slice
export const DocumentSlice = createSlice({
    name: 'documents',
    initialState,
    reducers: {
        FetchDocuments(state, action: PayloadAction) { },
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

// Reducer
export default DocumentSlice.reducer