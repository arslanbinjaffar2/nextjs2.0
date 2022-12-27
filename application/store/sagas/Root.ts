import { all, fork } from 'redux-saga/effects'

import { EventWatcherSaga } from 'application/store/sagas/Event.Saga'

import { AuthWatcherSaga } from 'application/store/sagas/Auth.Saga'

export function* RootSaga() {
    yield all([fork(EventWatcherSaga), fork(AuthWatcherSaga)])
}

export default RootSaga