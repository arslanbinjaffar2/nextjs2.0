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

import {SurveyWatcherSaga} from 'application/store/sagas/Survey.Saga'

import {AlertWatcherSaga} from 'application/store/sagas/Alert.Saga'

import {FloorPlanWatcherSaga} from 'application/store/sagas/FloorPlan.Saga'

import {BannerWatcherSaga} from 'application/store/sagas/Banner.Saga'

import {CertificateWatcherSaga} from 'application/store/sagas/Certificate.Saga'

import {EditProfileWatcherSaga} from 'application/store/sagas/EditProfile.Saga'

import {QaWatcherSaga} from 'application/store/sagas/Qa.Saga'

import {SocialMediaWatcherSaga} from 'application/store/sagas/SocialMedia.Saga'

import {CheckInOutWatcherSaga} from 'application/store/sagas/CheckInOut.Saga'

import {SubRegistrationWatcherSaga} from 'application/store/sagas/SubRegistration.Saga'

import {NetworkInterestWatcherSaga} from 'application/store/sagas/NetworkInterest.Saga'

import {NoteWatcherSaga} from 'application/store/sagas/Notes.Saga'

import {NotificationWatcherSaga} from 'application/store/sagas/Notification.Saga'

import {GalleryWatcherSaga} from 'application/store/sagas/Gallery.Saga'

import {HdWatcherSaga} from 'application/store/sagas/Hd.Saga'
import {SocialWallWatcherSaga} from 'application/store/sagas/SocialWall.Saga'

import {MeetingReservationWatcherSaga} from 'application/store/sagas/MeetingReservation.Saga'
import {ChatWatcherSaga} from 'application/store/sagas/Chat.Saga'


export function* RootSaga() {
    yield all([
                fork(EventWatcherSaga), 
                fork(AuthWatcherSaga), 
                fork(MapWatcherSaga), 
                fork(InfoWatcherSaga), 
                fork(SponsorWatcherSaga), 
                fork(ExhibitorWatcherSaga), 
                fork(DocumentWatcherSaga), 
                fork(AttendeeWatcherSaga), 
                fork(ProgramWatcherSaga), 
                fork(PollWatcherSaga), 
                fork(SurveyWatcherSaga), 
                fork(AlertWatcherSaga), 
                fork(FloorPlanWatcherSaga), 
                fork(BannerWatcherSaga), 
                fork(CertificateWatcherSaga),
                fork(EditProfileWatcherSaga),
                fork(QaWatcherSaga), 
                fork(SocialMediaWatcherSaga), 
                fork(CheckInOutWatcherSaga), 
                fork(SubRegistrationWatcherSaga),
                fork(NetworkInterestWatcherSaga),
                fork(NoteWatcherSaga),
                fork(NotificationWatcherSaga),
                fork(GalleryWatcherSaga),
                fork(HdWatcherSaga),
                fork(SocialWallWatcherSaga),
                fork(MeetingReservationWatcherSaga),
                fork(ChatWatcherSaga)
            ])
}

export default RootSaga