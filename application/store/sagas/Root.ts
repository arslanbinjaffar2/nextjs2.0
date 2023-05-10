import { all, fork } from 'redux-saga/effects'

import { EventWatcherSaga } from 'application/store/sagas/Event.Saga'

import { AuthWatcherSaga } from 'application/store/sagas/Auth.Saga'

import { MapWatcherSaga } from 'application/store/sagas/Map.Saga'

export function* RootSaga() {
    yield all([fork(EventWatcherSaga), fork(AuthWatcherSaga), fork(MapWatcherSaga)])
}

export default RootSaga