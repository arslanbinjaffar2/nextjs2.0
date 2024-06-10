import { useCallback } from 'react'

import { useAppDispatch, useAppSelector } from 'application/store/Hooks'
import { Chat } from 'application/models/chat/Chat'
import { ChatActions, SelectChat, SelectChatLabels, SelectChats } from 'application/store/slices/Chat.Slice'

export type ChatServiceOperators = {
    chats: Chat[],
    labels: any,
    chat: Chat | null,
    FetchChats: (payload: {search:string}) => void
    FetchChat: (payload: {thread_id:number}) => void
    StartNewChat: (payload: {message:string,user_ids:number[],group_ids:number[]}) => void
    SaveMessage: (payload: {message:string,thread_id:number}) => void
    MarkAsRead: (payload: {message_id:number}) => void
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
        FetchChats: useCallback(
            (payload: {search:string}) => {
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
        )
    }
}

export default UseChatService