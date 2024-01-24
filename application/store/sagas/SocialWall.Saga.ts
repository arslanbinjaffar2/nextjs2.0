import { SagaIterator } from '@redux-saga/core'

import { call, put, takeEvery } from 'redux-saga/effects'

import { getSocialWallApi, saveSocialWallPostApi } from 'application/store/api/SocialWall.Api'

import { SocialWallActions } from 'application/store/slices/SocialWall.Slice'

import { LoadingActions } from 'application/store/slices/Loading.Slice'

import { HttpResponse } from 'application/models/GeneralResponse'

import { select } from 'redux-saga/effects';

function* OnFetchSocialWallPosts({
    payload,
}: {
    type: typeof SocialWallActions.FetchSocialWallPosts
    payload: { page: number}
}): SagaIterator {
    yield put(LoadingActions.addProcess({ process: 'social_wall_posts' }))
    const state = yield select(state => state);
    const response: HttpResponse = yield call(getSocialWallApi, payload, state)
    yield put(SocialWallActions.update({ page:payload.page, last_page:response.data.data.posts.last_page, posts:response.data.data.posts.data!, filters:response.data.data.filters!}))
    yield put(LoadingActions.removeProcess({ process: 'social_wall_posts' }))
}

function* OnAddSocialWallPost({
    payload,
}: {
    type: typeof SocialWallActions.AddSocialWallPost
    payload: any
}): SagaIterator {
    yield put(LoadingActions.addProcess({ process: 'social_wall_save_post' }))
    const state = yield select(state => state);
    const response: HttpResponse = yield call(saveSocialWallPostApi, payload, state)
    if (response?.status === 200) {
        yield put(SocialWallActions.socialWallPostAdded({ post:response.data.data.post}))
    }
    yield put(LoadingActions.removeProcess({ process: 'social_wall_save_post' }))
}





// Watcher Saga
export function* SocialWallWatcherSaga(): SagaIterator {
    yield takeEvery(SocialWallActions.FetchSocialWallPosts.type, OnFetchSocialWallPosts)
    yield takeEvery(SocialWallActions.AddSocialWallPost.type, OnAddSocialWallPost)
}

export default SocialWallWatcherSaga