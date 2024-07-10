import { SagaIterator } from '@redux-saga/core'
import { call, put, takeEvery, select } from 'redux-saga/effects'
import { getExhibitorApi, makeFavouriteApi, getExhibitorDetailApi, getMyExhibitorApi, getOurExhibitorApi, getContactExhibitorApi } from 'application/store/api/Exhibitor.api';
import { ExhibitorActions } from 'application/store/slices/Exhibitor.Slice'
import { LoadingActions } from 'application/store/slices/Loading.Slice'
import { HttpResponse } from 'application/models/GeneralResponse'
import { DocumentActions } from '../slices/Document.Slice';
import { SponsorActions } from 'application/store/slices/Sponsor.Slice'

function* OnGetExhibitors({
    payload,
}: {
    type: typeof ExhibitorActions.FetchExhibitors
    payload: { category_id: number, query: string, page?: number,  screen: string }
}): SagaIterator {
    // yield put(LoadingActions.set(true))
    yield put(LoadingActions.addProcess({ process: 'exhibitors-listing' }))
    const state = yield select(state => state);
    console.log("🚀 ~ OnGetExhibitors ~ payload:", payload)
    const response: HttpResponse = yield call(getExhibitorApi, { ...payload, limit: payload.screen === 'our-exhibitors' ? 5 : 50  }, state)
    if (payload.screen === 'our-exhibitors') {
        yield put(ExhibitorActions.updateOurExhibitors(response.data.data.exhibitors!))
    } else if (payload.screen === 'my-exhibitors') {
        yield put(ExhibitorActions.updateMyExhibitors(response.data.data.exhibitors!))
    } else {
        if (payload.page && payload.page > 1) {
            yield put(ExhibitorActions.update({
                exhibitors: response.data.data.exhibitors || [],
                page: response.data.data.page,
                total_pages: response.data.data.total_pages,
            }));
        } else {
            yield put(ExhibitorActions.update({
                exhibitors: response.data.data.exhibitors || [],
                page: response.data.data.page,
                total_pages: response.data.data.total_pages,
            }));
        }
        yield put(ExhibitorActions.updateSiteLabels(response.data.data.labels!))
    }
const { exhibitorCategories, page, total_pages } = response.data.data.exhibitorCategories;
    yield put(ExhibitorActions.updateCategories({
        categories: exhibitorCategories,
        page,
        total_pages
    }));
    yield put(ExhibitorActions.updateSettings(response.data.data.settings!))
    yield put(ExhibitorActions.updateCategory(payload.category_id))
    yield put(ExhibitorActions.updateQuery(payload.query))
    // yield put(LoadingActions.set(false));
    yield put(LoadingActions.removeProcess({ process: 'exhibitors-listing' }))

}

function* OnGetMyExhibitors({
    payload,
}: {
    type: typeof ExhibitorActions.FetchMyExhibitors
    payload: { page: number }
}): SagaIterator {
    yield put(LoadingActions.set(true))
    const state = yield select(state => state);
    const response: HttpResponse = yield call(getMyExhibitorApi,payload, state)
    yield put(ExhibitorActions.updateMyExhibitors(response.data.data.exhibitors!))
    yield put(ExhibitorActions.updateSettings(response.data.data.settings!))
    yield put(LoadingActions.set(false));
}

function* OnGetOurExhibitors({
    payload,
}: {
    type: typeof ExhibitorActions.FetchOurExhibitors
    payload: { page: number }
}): SagaIterator {
    yield put(LoadingActions.set(true))
    const state = yield select(state => state);
    const response: HttpResponse = yield call(getOurExhibitorApi, payload, state)
    yield put(ExhibitorActions.updateOurExhibitors({ exhibitors: response.data.data.exhibitors!, page: payload.page }))
    
    yield put(ExhibitorActions.updateSettings(response.data.data.settings!))
    yield put(LoadingActions.set(false));
}

function* OnMakeFavourite({
    payload,
}: {
    type: typeof ExhibitorActions.MakeFavourite
    payload: { exhibitor_id: number, screen: string }
}): SagaIterator {
    const state = yield select(state => state);
    yield call(makeFavouriteApi, payload, state);
    if(payload.screen === "my-exhibitors") {
        yield put(ExhibitorActions.FetchMyExhibitors({ page: 1 }))
    }
}

function* OnGetExhibitorDetail({
    payload,
}: {
    type: typeof ExhibitorActions.FetchExhibitorDetail
    payload: { id: number }
}): SagaIterator {
    yield put(LoadingActions.set(true))
    yield put(LoadingActions.addProcess({ process: 'exhibitor-detail' }))
    const state = yield select(state => state);
    const response: HttpResponse = yield call(getExhibitorDetailApi, payload, state)
    yield put(ExhibitorActions.updateExhibitorDetail(response.data.data!))
    yield put(DocumentActions.update(response.data.data.documents!))
    yield put(LoadingActions.set(false));
    yield put(LoadingActions.removeProcess({ process: 'exhibitor-detail' }))
}

function* OnGetExhibitorContact({
    payload,
}: {
    type: typeof ExhibitorActions.FetchExhibitorContact
    payload: { id: number }
}): SagaIterator {
    yield put(LoadingActions.set(true))
    const state = yield select(state => state);
    const response: HttpResponse = yield call(getContactExhibitorApi, payload, state)
    yield put(LoadingActions.set(false));
}

// Watcher Saga
export function* ExhibitorWatcherSaga(): SagaIterator {
    yield takeEvery(ExhibitorActions.FetchExhibitors.type, OnGetExhibitors)
    yield takeEvery(ExhibitorActions.FetchExhibitorDetail.type, OnGetExhibitorDetail)
    yield takeEvery(ExhibitorActions.FetchExhibitorContact.type, OnGetExhibitorContact)
    yield takeEvery(ExhibitorActions.MakeFavourite.type, OnMakeFavourite)
    yield takeEvery(ExhibitorActions.FetchMyExhibitors.type, OnGetMyExhibitors)
    yield takeEvery(ExhibitorActions.FetchOurExhibitors.type, OnGetOurExhibitors)
}

export default ExhibitorWatcherSaga
