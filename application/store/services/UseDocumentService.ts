import { useCallback } from 'react'

import { DocumentActions, SelectDocuments, SelectData, SelectQuery } from 'application/store/slices/Document.Slice'

import { Document } from 'application/models/document/Document'

import { useAppDispatch, useAppSelector } from 'application/store/Hooks'

export type DocumentServiceOperators = {
    query: string
    data: Document[]
    documents: Document[]
    FetchDocuments: () => void
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
        documents: useAppSelector(SelectDocuments),
        data: useAppSelector(SelectData),
        FetchDocuments: useCallback(
            () => {
                dispatch(DocumentActions.FetchDocuments())
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