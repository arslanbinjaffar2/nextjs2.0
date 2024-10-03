import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import type { RootState } from 'application/store/Index'
import { Chat, Group, NewChatSearchResults,Attendee, ChatMessage, ParentGroup } from 'application/models/chat/Chat'
import chat from 'application/assets/icons/chat'

export interface ChatState {
    chats: Chat[],
    chat: Chat | null,
    new_chat_search_results: NewChatSearchResults,
    labels: any,
    new_chat_error: string | null,
    new_message_popup: boolean,
}

const initialState: ChatState = {
    chats: [],
    labels: [],
    chat: null,
    new_chat_error: null,
    new_chat_search_results: {
        groups: [],
        attendees: [],
    },
    new_message_popup: false,
}

// Slice
export const ChatSlice = createSlice({
    name: 'chats',
    initialState,
    reducers: {
        FetchChats(state, action: PayloadAction<{ search: string,doNotShowLoading?:boolean }>) {
        
        },
        update(state, action: PayloadAction<Chat[]>) {
            state.chats = action.payload;
        },
        FetchChat(state, action: PayloadAction<{thread_id:number}>) {
            
        },
        updateChat(state, action: PayloadAction<Chat>) {
            state.chat = action.payload;
        },
        StartNewChat(state, action: PayloadAction<{message:string,user_ids:number[],group_ids:number[]}>) {
            state.new_chat_error = null;
        },
        SaveMessage(state, action: PayloadAction<{message:string,thread_id:number}>) {
            
        },
        MarkAsRead(state, action: PayloadAction<{message_id:number}>) {
            
        },
        NewChatSearch(state, action: PayloadAction<{search:string}>) {

        },
        updateNewChatSearch(state, action: PayloadAction<{attendees:Attendee[],groups:ParentGroup[]}>) {
            state.new_chat_search_results.attendees = action.payload.attendees;
            state.new_chat_search_results.groups = action.payload.groups;
        },
        PushMessageToChat(state, action: PayloadAction<{message:ChatMessage,thread_id:number}>) {
           if(state.chat?.id === action.payload.thread_id){
            state.chat.messages.push(action.payload.message);
           }
        },
        SetNewChatError(state, action: PayloadAction<{error:string|null}>) {
            state.new_chat_error = action.payload.error;
        },
        MarkThreadAsRead(state, action: PayloadAction<{thread_id:number}>) {
        },
        SetNewMessagePopup(state, action: PayloadAction<{new_message_popup:boolean}>) {
            state.new_message_popup = action.payload.new_message_popup;
        }
    },
})

// Actions
export const ChatActions = {
   FetchChats: ChatSlice.actions.FetchChats,
   update: ChatSlice.actions.update,
   FetchChat: ChatSlice.actions.FetchChat,
   updateChat: ChatSlice.actions.updateChat,
   StartNewChat: ChatSlice.actions.StartNewChat,
   SaveMessage: ChatSlice.actions.SaveMessage,
   MarkAsRead: ChatSlice.actions.MarkAsRead,
   NewChatSearch: ChatSlice.actions.NewChatSearch,
   updateNewChatSearch: ChatSlice.actions.updateNewChatSearch,
   PushMessageToChat: ChatSlice.actions.PushMessageToChat,
   SetNewChatError: ChatSlice.actions.SetNewChatError,
   MarkThreadAsRead: ChatSlice.actions.MarkThreadAsRead,
   SetNewMessagePopup: ChatSlice.actions.SetNewMessagePopup,
}

export const SelectChats = (state: RootState) => state.chats.chats

export const SelectChatLabels = (state: RootState) => state.chats.labels

export const SelectChat = (state: RootState) => state.chats.chat

export const SelectNewChatSearchResults = (state: RootState) => state.chats.new_chat_search_results

export const SelectNewChatError = (state: RootState) => state.chats.new_chat_error

export const SelectNewMessagePopup = (state: RootState) => state.chats.new_message_popup
// Reducer
export default ChatSlice.reducer

