import React from 'react'
import UseNoteService from 'application/store/services/UseNoteService';
import UseExhibitorService from 'application/store/services/UseExhibitorService';
import NotesBoxGeneral from 'application/components/atoms/NotesBox';


const NotesBox = () => {
  const { detail } = UseExhibitorService();
  return (
    <>
        {detail?.detail !== undefined && <NotesBoxGeneral note_type={'exhibitors'} note_type_id={detail.detail?.id} />}
    </>
  )
}

export default NotesBox