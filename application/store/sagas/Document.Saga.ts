import { SagaIterator } from '@redux-saga/core'

import { call, put, takeEvery } from 'redux-saga/effects'

import { getDocumentApi } from 'application/store/api/DocumentApi';

import { DocumentActions } from 'application/store/slices/Document.Slice'

import { LoadingActions } from 'application/store/slices/Loading.Slice'

import { HttpResponse } from 'application/models/GeneralResponse'

import { select } from 'redux-saga/effects';

function* OnGetDocuments({
    payload,
}: {
    type: typeof DocumentActions.FetchDocuments
    payload: { category_id: number, query: string }
}): SagaIterator {
    yield put(LoadingActions.set(true))
    const state = yield select(state => state);
    const response: HttpResponse = yield call(getDocumentApi, payload, state)
    yield put(DocumentActions.update(response.data.data.documents!))
    yield put(LoadingActions.set(false));
}

// Watcher Saga
export function* DocumentWatcherSaga(): SagaIterator {
    yield takeEvery(DocumentActions.FetchDocuments.type, OnGetDocuments)
}

export default DocumentWatcherSaga