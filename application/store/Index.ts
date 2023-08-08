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
import InfoSlice from 'application/store/slices/Info.Slice'
import { RootSaga } from 'application/store/sagas/Root'

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
            loading: LoadingSlice,
            info: InfoSlice
        },
        devTools: true,
        middleware: getDefaultMiddleware =>
            getDefaultMiddleware({ thunk: false })
                .concat(sagaMiddleware)
                .concat(logger),
    })

    sagaMiddleware.run(RootSaga)

    return store
}

export const store = makeStore()

export type AppDispatch = typeof store.dispatch

export type RootState = ReturnType<typeof store.getState>
