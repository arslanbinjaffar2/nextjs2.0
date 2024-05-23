import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Certificate } from 'application/models/certificate/Certificate'
import { RootState } from 'application/store/Index'

import {
    current
} from '@reduxjs/toolkit';


export interface CertificateState {
    certificate: Certificate[],
}

const initialState: CertificateState = {
    certificate: [],
}
// Slice
export const CertificateSlice = createSlice({
    name: 'certificate',
    initialState,
    reducers: {
        FetchCertificate(state) {
            console.log('in slice')
        },
        update(state, action: PayloadAction<{ certificate: Certificate[]}>) {
            state.certificate = action.payload.certificate;
        },
        FetchCertificatePdf(state, action: PayloadAction<{ certificate_id: number, attendee_id: number }>) { },
    },
});
// Actions
export const CertificateActions = {
    FetchCertificate: CertificateSlice.actions.FetchCertificate,
    update:CertificateSlice.actions.update,
    FetchCertificatePdf: CertificateSlice.actions.FetchCertificatePdf,
}

export const SelectCertificate = (state: RootState) => state.certificate.certificate

// Reducer
export default CertificateSlice.reducer