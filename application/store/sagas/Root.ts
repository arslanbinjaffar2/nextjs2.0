import { all, fork } from 'redux-saga/effects'

import { EventWatcherSaga } from 'application/store/sagas/Event.Saga'

import { AuthWatcherSaga } from 'application/store/sagas/Auth.Saga'

import { MapWatcherSaga } from 'application/store/sagas/Map.Saga'

import { SponsorWatcherSaga } from 'application/store/sagas/Sponsor.Saga'

import { ExhibitorWatcherSaga } from 'application/store/sagas/Exhibitor.Saga'

import { InfoWatcherSaga } from 'application/store/sagas/Info.Saga'

export function* RootSaga() {
    yield all([fork(EventWatcherSaga), fork(AuthWatcherSaga), fork(MapWatcherSaga), fork(InfoWatcherSaga), fork(SponsorWatcherSaga), fork(ExhibitorWatcherSaga)])
}

export default RootSaga