import { useCallback } from 'react'
import { SelectCertificate, CertificateActions,  } from 'application/store/slices/Certificate.Slice'
import { useAppDispatch, useAppSelector } from 'application/store/Hooks'
import { Certificate } from 'application/models/certificate/Certificate'
export type CertificateServiceOperators = {
    certificate: Certificate[],
    FetchCertificate: () => void,
    data: Certificate[]
}

/**
 * AttendeeService custom-hooks
 * @see https://reactjs.org/docs/hooks-custom.html
*/
export const UseCertificateService = (): Readonly<CertificateServiceOperators> => {
    console.log('ggggg')
    const dispatch = useAppDispatch()
    return {
        certificate: useAppSelector(SelectCertificate),
        data: useAppSelector(SelectCertificate),
        FetchCertificate: useCallback(
            () => {
                dispatch(CertificateActions.FetchCertificate())
            },
            [dispatch],
        ),
    }
}
export default UseCertificateService
