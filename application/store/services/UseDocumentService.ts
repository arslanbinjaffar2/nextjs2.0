import { useCallback } from 'react'

import { DocumentActions, SelectDocuments } from 'application/store/slices/Document.Slice'

import { Document } from 'application/models/document/Document'

import { useAppDispatch, useAppSelector } from 'application/store/Hooks'

export type DocumentServiceOperators = {
    documents: Document[]
    FetchDocuments: () => void
}

/**
 * DocumentService custom-hooks
 * @see https://reactjs.org/docs/hooks-custom.html
 */
export const UseDocumentService = (): Readonly<DocumentServiceOperators> => {

    const dispatch = useAppDispatch()

    return {
        documents: useAppSelector(SelectDocuments),
        FetchDocuments: useCallback(
            () => {
                dispatch(DocumentActions.FetchDocuments())
            },
            [dispatch],
        )
    }
}

export default UseDocumentService