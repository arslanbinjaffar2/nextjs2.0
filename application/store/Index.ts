import createSagaMiddleware from '@redux-saga/core'
import { configureStore } from '@reduxjs/toolkit'
import logger from 'redux-logger'
import EventSlice from 'application/store/slices/Event.Slice'
import AuthSlice from 'application/store/slices/Auth.Slice'
import EnvSlice from 'application/store/slices/Env.Slice'
import { RootSaga } from 'application/store/sagas/Root'

const makeStore = () => {

    const sagaMiddleware = createSagaMiddleware()

    const store = configureStore({
        reducer: {
            event: EventSlice,
            auth: AuthSlice,
            env: EnvSlice
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
