import createSagaMiddleware from '@redux-saga/core'
import { configureStore } from '@reduxjs/toolkit'
import logger from 'redux-logger'
import EventSlice from 'application/store/slices/Event.Slice'
import ResponseSlice from 'application/store/slices/Response.slice'
import ErrorSlice from 'application/store/slices/Error.slice'
import LoadingSlice from 'application/store/slices/Loading.Slice'
import AuthSlice from 'application/store/slices/Auth.Slice'
import EnvSlice from 'application/store/slices/Env.Slice'
import MapSlice from 'application/store/slices/Map.Slice'
import SponsorSlice from 'application/store/slices/Sponsor.Slice'
import ExhibitorSlice from 'application/store/slices/Exhibitor.Slice'
import DocumentSlice from 'application/store/slices/Document.Slice'
import AttendeeSlice from 'application/store/slices/Attendee.Slice'
import CertificateSlice from 'application/store/slices/Certificate.Slice'
import ProgramSlice from 'application/store/slices/Program.Slice'
import InfoSlice from 'application/store/slices/Info.Slice'
import PollSlice from './slices/Poll.Slice'
import SurveySlice from './slices/Survey.Slice'
import AlertSlice from './slices/Alert.Slice'
import FloorPlanSlice from './slices/FloorPlan.Slice'
import BannerSlice from './slices/Banner.Slice'
import EditProfileSlice, { EditProfileActions } from './slices/EditProfile.Slice'
import QaSlice from './slices/Qa.Slice'
import SocialMediaSlice from './slices/SocialMedia.Slice'
import CheckInOutSlice from './slices/CheckInOut.Slice'
import SubRegistrationSlice from './slices/SubRegistration.Slice'
import NetworkInterestSlice from './slices/NetworkInterest.Slice'
import NotesSlice from './slices/Notes.Slice'
import NotificationSlice from './slices/Notification.Slice'
import SocketSlice, { SocketActions } from './slices/Socket.Slice'
import HdSlice from './slices/Hd.Slice'
import { RootSaga } from 'application/store/sagas/Root'
import GallerySlice from './slices/Gallery.Slice'
import SocialWallSlice, { SocialWallActions } from './slices/SocialWall.Slice'
import MeetingReservationSlice from './slices/MeetingReservation.Slice'
import ToastSlice from './slices/Toast.Slice'

const makeStore = () => {

    const sagaMiddleware = createSagaMiddleware()

    const store = configureStore({
        reducer: {
            event: EventSlice,
            auth: AuthSlice,
            env: EnvSlice,
            response: ResponseSlice,
            error: ErrorSlice,
            map: MapSlice,
            sponsors: SponsorSlice,
            exhibitors: ExhibitorSlice,
            documents: DocumentSlice,
            attendees: AttendeeSlice,
            certificate: CertificateSlice,
            programs: ProgramSlice,
            loading: LoadingSlice,
            info: InfoSlice,
            polls:PollSlice,
            surveys:SurveySlice,
            alerts:AlertSlice,
            floorPlans:FloorPlanSlice,
            galleryImages:GallerySlice,
            socialWall:SocialWallSlice,
            banners:BannerSlice,
            editProfiles:EditProfileSlice,
            qa:QaSlice,
            socialMedia:SocialMediaSlice,
            checkInOut:CheckInOutSlice,
            subRegistration:SubRegistrationSlice,
            networkInterest:NetworkInterestSlice,
            notes:NotesSlice,
            notifications:NotificationSlice,
            socket:SocketSlice,
            hd:HdSlice,
            meetingReservation:MeetingReservationSlice,
            toast:ToastSlice
        },
        devTools: true,
        middleware: getDefaultMiddleware =>
            getDefaultMiddleware({ thunk: false, 
                serializableCheck: {
                    // Ignore these action types
                    ignoredActions: [
                        EditProfileActions.UpdateAttendee.type, 
                        SocketActions.SetSocket.type,
                        SocialWallActions.AddSocialWallPost.type,
                        SocialWallActions.UpdateSocialWallPost.type
                    ],
                    ignoredPaths: ['socket.socket']
                    
              },
             })
            .concat(sagaMiddleware)
            // .concat(logger),
    })

    sagaMiddleware.run(RootSaga)

    return store
}

export const store = makeStore()

export type AppDispatch = typeof store.dispatch

export type RootState = ReturnType<typeof store.getState>
