import { SagaIterator } from '@redux-saga/core'

import { call, put, takeEvery } from 'redux-saga/effects'

import { getChatDetailApi, getChatsApi, markChatReadApi, newChatSearchApi, saveMessageChatApi, startNewChatApi } from 'application/store/api/Chat.Api';

import { LoadingActions } from 'application/store/slices/Loading.Slice'

import { HttpResponse } from 'application/models/GeneralResponse'

import { select } from 'redux-saga/effects';
import { ChatActions } from 'application/store/slices/Chat.Slice';

function* OnGetChats({
    payload,
}: {
    type: typeof ChatActions.FetchChats
    payload: { search: string,doNotShowLoading?:boolean }
}): SagaIterator {
    if(!payload.doNotShowLoading){
        yield put(LoadingActions.set(true))
        if(payload.search){
            yield put(LoadingActions.addProcess({process: 'chat-search'}));
        }else{  
            yield put(LoadingActions.addProcess({process: 'chats'}));
        }
    }
    
    const state = yield select(state => state);
    const response: HttpResponse = yield call(getChatsApi,payload, state)
    yield put(ChatActions.update(response.data.data.threads!))
    if(!payload.doNotShowLoading){
        yield put(LoadingActions.removeProcess({process: 'chat-search'}));
        yield put(LoadingActions.removeProcess({process: 'chats'}));
        yield put(LoadingActions.set(false));
    }
}

function* OnGetChat({
    payload,
}: {
    type: typeof ChatActions.FetchChat
    payload: { thread_id: number }
}): SagaIterator {
    yield put(LoadingActions.set(true))
    yield put(LoadingActions.addProcess({process: 'chat-detail'}));
    const state = yield select(state => state);
    const response: HttpResponse = yield call(getChatDetailApi,payload, state)
    yield put(ChatActions.updateChat(response.data.data.chat!))
    yield put(LoadingActions.removeProcess({process: 'chat-detail'}));
    yield put(LoadingActions.set(false));
}

function* OnStartNewChat({
    payload,
}: {
    type: typeof ChatActions.StartNewChat
    payload: {message:string,user_ids:number[],group_ids:number[]}
}): SagaIterator {
    yield put(LoadingActions.set(true))
    yield put(LoadingActions.addProcess({process: 'new-chat'}));
    const state = yield select(state => state);
    const response: HttpResponse = yield call(startNewChatApi,payload, state)
    if(!response?.data?.success){
        yield put(ChatActions.SetNewChatError({error:response?.data?.data?.message ?? 'Something went wrong'}));
    }
    yield put(LoadingActions.removeProcess({process: 'new-chat'}));
    yield put(LoadingActions.set(false));
}

function* OnSaveMessage({
    payload,
}: {
    type: typeof ChatActions.SaveMessage
    payload: {message:string,thread_id:number}
}): SagaIterator {
    yield put(LoadingActions.set(true))
    yield put(LoadingActions.addProcess({process: 'save-message'}));
    const state = yield select(state => state);
    const response: HttpResponse = yield call(saveMessageChatApi,payload, state)
    yield put(LoadingActions.removeProcess({process: 'save-message'}));
    yield put(LoadingActions.set(false));
}

function* OnMarkAsRead({
    payload,
}: {
    type: typeof ChatActions.MarkAsRead
    payload: {message_id:number}
}): SagaIterator {
    const state = yield select(state => state);
    const response: HttpResponse = yield call(markChatReadApi,payload, state)
}

function* OnNewChatSearch({
    payload,
}: {
    type: typeof ChatActions.NewChatSearch
    payload: {search:string}
}): SagaIterator {
    yield put(LoadingActions.addProcess({process: 'new-chat-search'}))
    const state = yield select(state => state);
    const response: HttpResponse = yield call(newChatSearchApi,payload, state)
    yield put(ChatActions.updateNewChatSearch({attendees:response.data?.data?.attendees!,groups:response.data?.data?.groups!}))
    yield put(LoadingActions.removeProcess({process: 'new-chat-search'}))
}

// Watcher Saga
export function* ChatWatcherSaga(): SagaIterator {
    yield takeEvery(ChatActions.FetchChats.type, OnGetChats)
    yield takeEvery(ChatActions.FetchChat.type, OnGetChat)
    yield takeEvery(ChatActions.StartNewChat.type, OnStartNewChat)
    yield takeEvery(ChatActions.SaveMessage.type, OnSaveMessage)
    yield takeEvery(ChatActions.MarkAsRead.type, OnMarkAsRead)
    yield takeEvery(ChatActions.NewChatSearch.type, OnNewChatSearch)
}

export default ChatWatcherSaga