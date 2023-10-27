import { useCallback } from 'react'

import { DocumentActions, SelectDocuments, SelectData, SelectQuery, SelectSpeakerID, SelectExhibitor, SelectSponsorID, SelectAgendaID } from 'application/store/slices/Document.Slice'

import { Document } from 'application/models/document/Document'

import { useAppDispatch, useAppSelector } from 'application/store/Hooks'

export type DocumentServiceOperators = {
    query: string
    speaker_id: number,
    sponsor_id: number,
    exhibitor_id: number,
    agenda_id: number,
    data: Document[]
    documents: Document[]
    FetchDocuments: (payload: { speaker_id: number, sponsor_id: number, exhibitor_id: number, agenda_id: number }) => void
    FilterDocuments: (payload: { document_id: number, query: string }) => void
}

/**
 * DocumentService custom-hooks
 * @see https://reactjs.org/docs/hooks-custom.html
*/
export const UseDocumentService = (): Readonly<DocumentServiceOperators> => {

    const dispatch = useAppDispatch()

    return {
        query: useAppSelector(SelectQuery),
        speaker_id: useAppSelector(SelectSpeakerID),
        sponsor_id: useAppSelector(SelectExhibitor),
        exhibitor_id: useAppSelector(SelectSponsorID),
        agenda_id: useAppSelector(SelectAgendaID),
        documents: useAppSelector(SelectDocuments),
        data: useAppSelector(SelectData),
        FetchDocuments: useCallback(
            (payload: { speaker_id: number, sponsor_id: number, exhibitor_id: number, agenda_id: number }) => {
                dispatch(DocumentActions.FetchDocuments(payload))
            },
            [dispatch],
        ),
        FilterDocuments: useCallback(
            (payload: { document_id: number, query: string }) => {
                dispatch(DocumentActions.FilterDocuments(payload))
            },
            [dispatch],
        )
    }
}

export default UseDocumentService