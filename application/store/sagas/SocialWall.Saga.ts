import { SagaIterator } from '@redux-saga/core'

import { call, put, takeEvery } from 'redux-saga/effects'

import { deleteSocialWallPostApi, getSocialWallApi, getSocialWallPostDetailApi, likeSocialWallComment, likeSocialWallPostApi, saveSocialWallComment, saveSocialWallPostApi, updateSocialWallPostApi } from 'application/store/api/SocialWall.Api'

import { SocialWallActions } from 'application/store/slices/SocialWall.Slice'

import { LoadingActions } from 'application/store/slices/Loading.Slice'

import { HttpResponse } from 'application/models/GeneralResponse'

import { select } from 'redux-saga/effects';

function* OnFetchSocialWallPosts({
    payload,
}: {
    type: typeof SocialWallActions.FetchSocialWallPosts
    payload: { page: number, sort_by:string}
}): SagaIterator {
    yield put(LoadingActions.addProcess({ process: 'social_wall_posts' }))
    const state = yield select(state => state);
    const response: HttpResponse = yield call(getSocialWallApi, payload, state)
    yield put(SocialWallActions.update({ page:payload.page, last_page:response.data.data.posts.last_page, posts:response.data.data.posts.data!, filters:response.data.data.filters!}))
    yield put(LoadingActions.removeProcess({ process: 'social_wall_posts' }))
    yield put(SocialWallActions.labels(response.data.data.labels))
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
    // if (response?.status === 200) {
    //     yield put(SocialWallActions.SocialWallPostsUpdated({ post:response.data.data.post}))
    // }
    yield put(LoadingActions.removeProcess({ process: 'social_wall_save_post' }))
}

function* OnUpdateSocialWallPost({
    payload,
}: {
    type: typeof SocialWallActions.UpdateSocialWallPost
    payload: any
}): SagaIterator {
    yield put(LoadingActions.addProcess({ process: 'social_wall_update_post' }))
    const state = yield select(state => state);
    const response: HttpResponse = yield call(updateSocialWallPostApi, payload, state)
    // if (response?.status === 200) {
    //     yield put(SocialWallActions.SocialWallPostsUpdated({ post:response.data.data.post}))
    // }
    yield put(LoadingActions.removeProcess({ process: 'social_wall_update_post' }))
}

function* OnLikeSocialWallPost({
    payload,
}: {
    type: typeof SocialWallActions.LikeSocialWallPost
    payload: {id:number}
}): SagaIterator {
    yield put(LoadingActions.addProcess({ process: `social_wall_like_post_${payload.id}` }))
    const state = yield select(state => state);
    const response: HttpResponse = yield call(likeSocialWallPostApi, payload, state)
    // if (response?.status === 200) {
    //     yield put(SocialWallActions.SocialWallPostsUpdated({ post:response.data.data.post}))
    // }
    yield put(LoadingActions.removeProcess({ process: `social_wall_like_post_${payload.id}` }))
}

function* OnSaveSocialWallComment({
    payload,
}: {
    type: typeof SocialWallActions.SaveSocialWallComment
    payload: any
}): SagaIterator {
    yield put(LoadingActions.addProcess({ process: 'social_wall_save_comment' }))
    const state = yield select(state => state);
    const response: HttpResponse = yield call(saveSocialWallComment, payload, state)
    // if (response?.status === 200) {
    //     yield put(SocialWallActions.SocialWallPostsUpdated({ post:response.data.data.post}))
    // }
    yield put(LoadingActions.removeProcess({ process: 'social_wall_save_comment' }))
}

function* OnLikeSocialWallComment({
    payload,
}: {
    type: typeof SocialWallActions.LikeSocialWallComment
    payload: {id:number}
}): SagaIterator {
    yield put(LoadingActions.addProcess({ process: `social_wall_like_comment_${payload.id}` }))
    const state = yield select(state => state);
    const response: HttpResponse = yield call(likeSocialWallComment, payload, state)
    // if (response?.status === 200) {
    //     yield put(SocialWallActions.SocialWallPostsUpdated({ post:response.data.data.post}))
    // }
    yield put(LoadingActions.removeProcess({ process: `social_wall_like_comment_${payload.id}` }))
}

function* OnDeleteSocialWallPost({
    payload,
}: {
    type: typeof SocialWallActions.DeleteSocialWallPost
    payload: {id:number}
}): SagaIterator {
    yield put(LoadingActions.addProcess({ process: `social_wall_delete_post${payload.id}` }))
    const state = yield select(state => state);
    const response: HttpResponse = yield call(deleteSocialWallPostApi, payload, state)
    yield put(LoadingActions.removeProcess({ process: `social_wall_delete_post_${payload.id}` }))
}

function* OnDetailSocialWallPost({
    payload,
}: {
    type: typeof SocialWallActions.DetailSocialWallPost
    payload: {id:number}
}): SagaIterator {
    yield put(LoadingActions.addProcess({ process: `social_wall_fetching_post_detail${payload.id}` }))
    const state = yield select(state => state);
    const response: HttpResponse = yield call(getSocialWallPostDetailApi, payload, state)
    if (response?.status === 200) {
        yield put(SocialWallActions.socialWallPostDetailFetched({ post:response.data.data.post}))
    }
    yield put(LoadingActions.removeProcess({ process: `social_wall_fetching_post_detail${payload.id}` }))
}




// Watcher Saga
export function* SocialWallWatcherSaga(): SagaIterator {
    yield takeEvery(SocialWallActions.FetchSocialWallPosts.type, OnFetchSocialWallPosts)
    yield takeEvery(SocialWallActions.AddSocialWallPost.type, OnAddSocialWallPost)
    yield takeEvery(SocialWallActions.LikeSocialWallPost.type, OnLikeSocialWallPost)
    yield takeEvery(SocialWallActions.SaveSocialWallComment.type, OnSaveSocialWallComment)
    yield takeEvery(SocialWallActions.LikeSocialWallComment.type, OnLikeSocialWallComment)
    yield takeEvery(SocialWallActions.DeleteSocialWallPost.type, OnDeleteSocialWallPost)
    yield takeEvery(SocialWallActions.DetailSocialWallPost.type, OnDetailSocialWallPost)
    yield takeEvery(SocialWallActions.UpdateSocialWallPost.type, OnUpdateSocialWallPost)
}

export default SocialWallWatcherSaga