import * as React from 'react';
import UpcomingBlock from 'application/components/atoms/programs/UpcomingBlock';
import { Divider } from 'native-base';
import OurExhibitor from 'application/components/molecules/exhibitors/OurExhibitor';
import OurSponsor from 'application/components/molecules/sponsors/OurSponsor';
import ExhibitorContactInfo from 'application/components/atoms/exhibitors/contact-info/ContactInfo';
import ExhibitorNotesBox from 'application/components/atoms/exhibitors/notes/NotesBox';
import SponsorNotesBox from 'application/components/atoms/sponsors/notes/NotesBox';
import ProgramNotesBox from 'application/components/atoms/programs/notes/NotesBox';
import SponsorContactInfo from 'application/components/atoms/sponsors/contact-info/ContactInfo';
import { useRouter as UseNextRouter } from 'next/router';
import UseEventService from 'application/store/services/UseEventService';
import SessionRating from 'application/components/atoms/programs/SessionRating';
import { useEffect } from 'react'


const RightBar = () => {
  const nextRouter = UseNextRouter();
  const { event } = UseEventService()

  return (
    <>
      <a href={'#'} className={'d-flex mr-auto'} >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="14.253" viewBox="0 0 20 14.253">
        <path id="badge_FILL0_wght100_GRAD0_opsz24" d="M133.724-808a1.675,1.675,0,0,1-1.236-.489,1.674,1.674,0,0,1-.489-1.236v-10.8a1.675,1.675,0,0,1,.489-1.236,1.675,1.675,0,0,1,1.236-.488h16.552a1.675,1.675,0,0,1,1.236.488,1.675,1.675,0,0,1,.488,1.236v10.8a1.675,1.675,0,0,1-.488,1.236,1.675,1.675,0,0,1-1.236.489Zm0-.8h16.552a.9.9,0,0,0,.661-.259.9.9,0,0,0,.259-.661v-10.8a.9.9,0,0,0-.259-.661.9.9,0,0,0-.661-.259h-6.322c0,1.36-3.908,1.36-3.908,0h-6.322a.9.9,0,0,0-.661.259.9.9,0,0,0-.259.661v10.8a.9.9,0,0,0,.259.661A.9.9,0,0,0,133.724-808.8Zm1.839-3.161h5.977v-.057a1.19,1.19,0,0,0-.2-.675,1.387,1.387,0,0,0-.546-.474,5.906,5.906,0,0,0-1.106-.345,5.636,5.636,0,0,0-1.135-.115,5.636,5.636,0,0,0-1.135.115,5.906,5.906,0,0,0-1.106.345,1.386,1.386,0,0,0-.546.474,1.19,1.19,0,0,0-.2.675Zm8.736-1.782h4.6v-.8h-4.6Zm-5.747-.8a1.217,1.217,0,0,0,.891-.374,1.217,1.217,0,0,0,.374-.891,1.216,1.216,0,0,0-.374-.891,1.216,1.216,0,0,0-.891-.374,1.216,1.216,0,0,0-.891.374,1.216,1.216,0,0,0-.374.891,1.216,1.216,0,0,0,.374.891A1.217,1.217,0,0,0,138.552-814.552Zm5.747-1.724h4.6v-.8h-4.6ZM142-815.126Z" transform="translate(-132 822.253)" fill="#fff"/>
      </svg>
      </a>
      {nextRouter.asPath.includes('exhibitors/detail') &&  <ExhibitorContactInfo />}
      {nextRouter.asPath.includes('exhibitors/detail') && event?.exhibitor_settings?.notes == 1 &&  <ExhibitorNotesBox />}
      {nextRouter.asPath.includes('sponsors/detail') &&  <SponsorContactInfo />}
      {nextRouter.asPath.includes('sponsors/detail') && event?.sponsor_settings?.notes == 1 &&  <SponsorNotesBox />}
      {nextRouter.asPath.includes('agendas/detail') && event?.agenda_settings?.enable_notes == 1 &&  <ProgramNotesBox />}
      {nextRouter.asPath.includes('agendas/detail') && event?.agenda_settings?.session_ratings == 1 &&  <SessionRating />}
      <UpcomingBlock title="UPCOMING SESSION" desc="Workshop 2 - The right path" location="Room 242" date="11-03-2022" time="11-00 to 13-00" />
      <UpcomingBlock title="NOTIFICATIONS" desc="Talk on world health is rescheduled - see more…" date="11-03-2022" time="11-00" location={''} />
      <Divider mb="1" bg="transparent" />
      {event?.exhibitor_settings?.show_on_native_app_dashboard == 1 && <OurExhibitor />}
      {event?.sponsor_settings?.show_on_native_app_dashboard == 1 && <OurSponsor />}
    </>
  );
}

export default RightBar;