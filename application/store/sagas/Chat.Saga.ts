import { SagaIterator } from '@redux-saga/core'

import { call, put, takeEvery } from 'redux-saga/effects'

import { getChatDetailApi, getChatsApi } from 'application/store/api/Chat.Api';

import { LoadingActions } from 'application/store/slices/Loading.Slice'

import { HttpResponse } from 'application/models/GeneralResponse'

import { select } from 'redux-saga/effects';
import { ChatActions } from 'application/store/slices/Chat.Slice'

function* OnGetChats({
    payload,
}: {
    type: typeof ChatActions.FetchChats
    payload: {  }
}): SagaIterator {
    yield put(LoadingActions.set(true))
    const state = yield select(state => state);
    const response: HttpResponse = yield call(getChatsApi,payload, state)
    yield put(ChatActions.update(response.data.data.threads!))
    yield put(LoadingActions.set(false));
}

function* OnGetChat({
    payload,
}: {
    type: typeof ChatActions.FetchChat
    payload: { thread_id: number }
}): SagaIterator {
    yield put(LoadingActions.set(true))
    const state = yield select(state => state);
    const response: HttpResponse = yield call(getChatDetailApi,payload, state)
    yield put(ChatActions.updateChat(response.data.data.chat!))
    yield put(LoadingActions.set(false));
}

// Watcher Saga
export function* ChatWatcherSaga(): SagaIterator {
    yield takeEvery(ChatActions.FetchChats.type, OnGetChats)
    yield takeEvery(ChatActions.FetchChat.type, OnGetChat)
}

export default ChatWatcherSaga