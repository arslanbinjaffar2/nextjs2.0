import { all, fork } from 'redux-saga/effects'

import { EventWatcherSaga } from 'application/store/sagas/Event.Saga'

export function* RootSaga() {
    yield all([fork(EventWatcherSaga)])
}

export default RootSaga