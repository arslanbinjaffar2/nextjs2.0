import { useCallback } from 'react'

import { useAppDispatch, useAppSelector } from 'application/store/Hooks'
import { Chat, ChatMessage, NewChatSearchResults } from 'application/models/chat/Chat'
import { ChatActions, SelectChat, SelectChatLabels, SelectChats, SelectNewChatError, SelectNewChatSearchResults } from 'application/store/slices/Chat.Slice'

export type ChatServiceOperators = {
    chats: Chat[],
    labels: any,
    chat: Chat | null,
    new_chat_search_results: NewChatSearchResults,
    new_chat_error: string | null,
    FetchChats: (payload: {search:string,doNotShowLoading?:boolean}) => void
    FetchChat: (payload: {thread_id:number}) => void
    StartNewChat: (payload: {message:string,user_ids:number[],group_ids:number[]}) => void
    SaveMessage: (payload: {message:string,thread_id:number}) => void
    MarkAsRead: (payload: {message_id:number}) => void
    NewChatSearch: (payload: {search:string}) => void
    PushMessageToChat: (payload: {message:ChatMessage,thread_id:number}) => void
    SetNewChatError: (payload: {error:string|null}) => void
}

/**
 * ExhibitorService custom-hooks
 * @see https://reactjs.org/docs/hooks-custom.html
 */
export const UseChatService = (): Readonly<ChatServiceOperators> => {

    const dispatch = useAppDispatch()

    return {
        chats: useAppSelector(SelectChats),
        labels: useAppSelector(SelectChatLabels),
        chat: useAppSelector(SelectChat),
        new_chat_search_results: useAppSelector(SelectNewChatSearchResults),
        new_chat_error: useAppSelector(SelectNewChatError),
        FetchChats: useCallback(
            (payload: {search:string,doNotShowLoading?:boolean}) => {
                dispatch(ChatActions.FetchChats(payload))
            },
            [dispatch],
        ),
        FetchChat: useCallback(
            (payload: {thread_id:number}) => {
                dispatch(ChatActions.FetchChat(payload))
            },
            [dispatch],
        ),
        StartNewChat: useCallback(
            (payload: {message:string,user_ids:number[],group_ids:number[]}) => {
                dispatch(ChatActions.StartNewChat(payload))
            },
            [dispatch],
        ),
        SaveMessage: useCallback(
            (payload: {message:string,thread_id:number}) => {
                dispatch(ChatActions.SaveMessage(payload))
            },
            [dispatch],
        ),
        MarkAsRead: useCallback(
            (payload: {message_id:number}) => {
                dispatch(ChatActions.MarkAsRead(payload))
            },
            [dispatch],
        ),
        NewChatSearch: useCallback(
            (payload: {search:string}) => {
                dispatch(ChatActions.NewChatSearch(payload))
            },
            [dispatch],
        ),
        PushMessageToChat: useCallback(
            (payload: {message:ChatMessage,thread_id:number}) => {
                dispatch(ChatActions.PushMessageToChat(payload))
            },
            [dispatch],
        ),
        SetNewChatError: useCallback(
            (payload: {error:string|null}) => {
                dispatch(ChatActions.SetNewChatError(payload))
            },
            [dispatch],
        ),
    }
}

export default UseChatService