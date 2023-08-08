import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { Document } from 'application/models/document/Document'

import type { RootState } from 'application/store/Index'

export interface DocumentState {
    documents: Document[],
}

const initialState: DocumentState = {
    documents: [],
}

// Slice
export const DocumentSlice = createSlice({
    name: 'documents',
    initialState,
    reducers: {
        FetchDocuments(state, action: PayloadAction<{ category_id: number, query: string }>) { },
        update(state, action: PayloadAction<Document[]>) {
            state.documents = action.payload;
        },
    },
})

// Actions
export const DocumentActions = {
    FetchDocuments: DocumentSlice.actions.FetchDocuments,
    update: DocumentSlice.actions.update,
}

export const SelectDocuments = (state: RootState) => state.documents.documents

// Reducer
export default DocumentSlice.reducer