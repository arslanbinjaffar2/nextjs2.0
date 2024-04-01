import React from 'react'
import UseNoteService from 'application/store/services/UseNoteService';
import UseSponsorService from 'application/store/services/UseSponsorService';
import NotesBoxGeneral from 'application/components/atoms/NotesBox';
import { createParam } from 'solito';

type ScreenParams = { id: string }
const { useParam } = createParam<ScreenParams>()

const NotesBox = () => {
  const { detail } = UseSponsorService();
  const [_id] = useParam('id');
  return (
    <>
        {detail?.detail !== undefined && <NotesBoxGeneral note_type={'sponsors'} note_type_id={_id} />}
    </>
  )
}

export default NotesBox