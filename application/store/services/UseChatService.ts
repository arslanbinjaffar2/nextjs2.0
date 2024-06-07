import { useCallback } from 'react'

import { useAppDispatch, useAppSelector } from 'application/store/Hooks'
import { Chat } from 'application/models/exhibitor/Chat'
import { ChatActions, SelectChat, SelectChatLabels, SelectChats } from 'application/store/slices/Chat.Slice'

export type ChatServiceOperators = {
    chats: Chat[],
    labels: any,
    chat: Chat | null,
    FetchChats: (payload: {}) => void
    FetchChat: (payload: {thread_id:number}) => void
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
            (payload: {}) => {
                dispatch(ChatActions.FetchChats(payload))
            },
            [dispatch],
        ),
        FetchChat: useCallback(
            (payload: {thread_id:number}) => {
                dispatch(ChatActions.FetchChat(payload))
            },
            [dispatch],
        )
    }
}

export default UseChatService