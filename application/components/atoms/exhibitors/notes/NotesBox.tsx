import React from 'react'
import UseNoteService from 'application/store/services/UseNoteService';
import UseExhibitorService from 'application/store/services/UseExhibitorService';
import NotesBoxGeneral from 'application/components/atoms/NotesBox';
import { createParam } from 'solito';

type ScreenParams = { id: string }
const { useParam } = createParam<ScreenParams>()

const NotesBox = () => {
  const { detail } = UseExhibitorService();
  const [_id] = useParam('id');
  return (
    <>
        {detail?.detail !== undefined && <NotesBoxGeneral note_type={'exhibitors'} note_type_id={_id} />}
    </>
  )
}

export default NotesBox