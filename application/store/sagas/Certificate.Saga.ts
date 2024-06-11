import { SagaIterator } from '@redux-saga/core'

import { call, put, takeEvery } from 'redux-saga/effects'

import { getCertificateApi, getCertificatePdfApi,  } from 'application/store/api/Certificate.Api';

import { CertificateActions } from 'application/store/slices/Certificate.Slice'

import { LoadingActions } from 'application/store/slices/Loading.Slice'

import { HttpResponse } from 'application/models/GeneralResponse'

import { select } from 'redux-saga/effects';

import in_array from "in_array";

function* OnGetCertificate({
}: {
    type: typeof CertificateActions.FetchCertificate
}): SagaIterator {
    const state = yield select(state => state);
    yield put(LoadingActions.addProcess({process:'certificate-listing'}))
    const response: HttpResponse = yield call(getCertificateApi, {}, state)
    console.log('in saga')
    yield put(CertificateActions.update({certificate: response?.data?.data?.certificate_logs!}))
    yield put(LoadingActions.removeProcess({process:'certificate-listing'}))

}
function* OnGetCertificatePdf({
    payload,
}: {
    type: typeof CertificateActions.FetchCertificatePdf
    payload: { certificate_id: number, attendee_id: number }
}): SagaIterator {
    yield put(LoadingActions.addProcess({ process: 'certificate-pdf' }))
    const state = yield select(state => state);
    const response: HttpResponse = yield call(getCertificatePdfApi, payload, state)
    yield put(LoadingActions.removeProcess({ process: 'certificate-pdf' }))
}
// Watcher Saga
export function* CertificateWatcherSaga(): SagaIterator {
    yield takeEvery(CertificateActions.FetchCertificate.type, OnGetCertificate)
    yield takeEvery(CertificateActions.FetchCertificatePdf.type, OnGetCertificatePdf)

}

export default CertificateWatcherSaga