import { all, fork } from 'redux-saga/effects'

import { EventWatcherSaga } from 'application/store/sagas/Event.Saga'

import { AuthWatcherSaga } from 'application/store/sagas/Auth.Saga'

import { MapWatcherSaga } from 'application/store/sagas/Map.Saga'

import { SponsorWatcherSaga } from 'application/store/sagas/Sponsor.Saga'

import { ExhibitorWatcherSaga } from 'application/store/sagas/Exhibitor.Saga'

import { DocumentWatcherSaga } from 'application/store/sagas/Document.Saga'

import { AttendeeWatcherSaga } from 'application/store/sagas/Attendee.Saga'

import { ProgramWatcherSaga } from 'application/store/sagas/Program.Saga'

import { InfoWatcherSaga } from 'application/store/sagas/Info.Saga'

import { PollWatcherSaga } from 'application/store/sagas/Poll.Saga'

export function* RootSaga() {
    yield all([fork(EventWatcherSaga), fork(AuthWatcherSaga), fork(MapWatcherSaga), fork(InfoWatcherSaga), fork(SponsorWatcherSaga), fork(ExhibitorWatcherSaga), fork(DocumentWatcherSaga), fork(AttendeeWatcherSaga), fork(ProgramWatcherSaga), fork(PollWatcherSaga)])
}

export default RootSaga