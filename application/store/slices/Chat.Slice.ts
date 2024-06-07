import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import type { RootState } from 'application/store/Index'
import { Chat } from 'application/models/exhibitor/Chat'

export interface ChatState {
    chats: Chat[],
    chat: Chat | null,
    labels: any,
}

const initialState: ChatState = {
    chats: [],
    labels: [],
    chat: null
}

// Slice
export const ChatSlice = createSlice({
    name: 'chats',
    initialState,
    reducers: {
        FetchChats(state, action: PayloadAction<{  }>) {
        
        },
        update(state, action: PayloadAction<Chat[]>) {
            state.chats = action.payload;
        },
        FetchChat(state, action: PayloadAction<{thread_id:number}>) {
            
        },
        updateChat(state, action: PayloadAction<Chat>) {
            state.chat = action.payload;
        }
    },
})

// Actions
export const ChatActions = {
   FetchChats: ChatSlice.actions.FetchChats,
   update: ChatSlice.actions.update,
   FetchChat: ChatSlice.actions.FetchChat,
   updateChat: ChatSlice.actions.updateChat
}

export const SelectChats = (state: RootState) => state.chats.chats

export const SelectChatLabels = (state: RootState) => state.chats.labels

export const SelectChat = (state: RootState) => state.chats.chat

// Reducer
export default ChatSlice.reducer

