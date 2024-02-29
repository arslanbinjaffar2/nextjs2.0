import React from 'react'
import UseNoteService from 'application/store/services/UseNoteService';
import UseSponsorService from 'application/store/services/UseSponsorService';
import NotesBoxGeneral from 'application/components/atoms/NotesBox';

const NotesBox = () => {
  const { detail } = UseSponsorService();
  return (
    <>
        {detail?.detail !== undefined && <NotesBoxGeneral note_type={'sponsors'} note_type_id={detail.detail?.id} />}
    </>
  )
}

export default NotesBox