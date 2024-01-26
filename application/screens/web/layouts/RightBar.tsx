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

const RightBar = () => {
  const nextRouter = UseNextRouter();
  const { event } = UseEventService()

  return (
    <>

      {nextRouter.asPath.includes('exhibitors/detail') &&  <ExhibitorContactInfo />}
      {nextRouter.asPath.includes('exhibitors/detail') && event?.exhibitor_settings?.notes == 1 &&  <ExhibitorNotesBox />}
      {nextRouter.asPath.includes('sponsors/detail') &&  <SponsorContactInfo />}
      {nextRouter.asPath.includes('sponsors/detail') && event?.sponsor_settings?.notes == 1 &&  <SponsorNotesBox />}
      {nextRouter.asPath.includes('agendas/detail') && event?.agenda_settings?.enable_notes == 1 &&  <ProgramNotesBox />}
      <UpcomingBlock title="UPCOMING SESSION" desc="Workshop 2 - The right path" location="Room 242" date="11-03-2022" time="11-00 to 13-00" />
      <UpcomingBlock title="NOTIFICATIONS" desc="Talk on world health is rescheduled - see more…" date="11-03-2022" time="11-00" location={''} />
      <Divider mb="1" bg="transparent" />
      {event?.exhibitor_settings?.show_on_native_app_dashboard == 1 && <OurExhibitor />}
      {event?.sponsor_settings?.show_on_native_app_dashboard == 1 && <OurSponsor />}
    </>
  );
}

export default RightBar;