import * as React from 'react';
import UpcomingBlock from 'application/components/atoms/programs/UpcomingBlock';
import UpcomingPrograms from 'application/components/atoms/programs/UpcomingPrograms';
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
import UseAttendeeService from 'application/store/services/UseAttendeeService';
import ContactInfo from 'application/components/atoms/attendees/detail/ContactInfo';
import SessionRating from 'application/components/atoms/programs/SessionRating';
import { useEffect } from 'react'
import UseBannerService from 'application/store/services/UseBannerService'
import UseSponsorService from 'application/store/services/UseSponsorService'
import UseDocumentService from 'application/store/services/UseDocumentService'
import UseEnvService from 'application/store/services/UseEnvService'
import UseLoadingService from 'application/store/services/UseLoadingService';
import in_array from "in_array";
import { createParam } from 'solito';

type ScreenParams = { id: string, cms: string | undefined }  
const { useParam } = createParam<ScreenParams>()

const RightBar = () => {
  const { _env } = UseEnvService()
  const { clearState, documents } = UseDocumentService();
  // const { sponsors, FetchSponsorContact } = UseSponsorService();
  const { sponsors, FetchSponsorContact } = UseSponsorService();
  const { scroll, processing } = UseLoadingService();
  // const handleSponsorContactClick = (attendeeId: any) => {
  //   console.log(attendeeId,'here');
  //     FetchSponsorContact({ id: Number(attendeeId) });
  // };
    React.useEffect(() => {
      return () => {
        clearState();
      };
    }, []);
  const nextRouter = UseNextRouter();
  const { event } = UseEventService();
  const { detail } = UseAttendeeService();
  const [_id] = useParam('id');

  return (
    <>
      
      <UpcomingPrograms />
      {nextRouter.asPath.includes('exhibitors/detail') && event?.exhibitor_tab_settings?.contact_info == 1 && !in_array('exhibitor-detail', processing) ? <ExhibitorContactInfo /> : null}
      {nextRouter.asPath.includes('exhibitors/detail') && event?.exhibitor_tab_settings?.notes == 1 && !in_array('exhibitor-detail', processing) ?  <ExhibitorNotesBox /> : null}
      {nextRouter.asPath.includes('sponsors/detail') && event?.sponsor_tab_settings?.contact_info == 1 && !in_array('sponsor-detail', processing) ? <SponsorContactInfo /> : null}
      {nextRouter.asPath.includes('sponsors/detail') && event?.sponsor_tab_settings?.notes == 1 && !in_array('sponsor-detail', processing) ?  <SponsorNotesBox /> : null}
      {nextRouter.asPath.includes('agendas/detail') && event?.agenda_settings?.enable_notes == 1 && !in_array('program-detail', processing) ?  <ProgramNotesBox /> : null}
      {nextRouter.asPath.includes('agendas/detail') && event?.agenda_settings?.session_ratings == 1 && !in_array('program-detail',processing)  ?  <SessionRating program_id={_id} /> : null}
      {(nextRouter.asPath.includes('speakers/detail') || nextRouter.asPath.includes('attendees/detail')) && ((detail?.detail?.info?.facebook && detail?.field_setting?.facebook) || (detail?.detail?.info?.twitter && detail?.field_setting?.twitter) || (detail?.detail?.info?.linkedin && detail?.field_setting?.linkedin) || (detail?.detail?.info?.website && detail?.field_setting?.website) || (detail?.setting?.contact_vcf && detail?.setting?.contact_vcf)) && <ContactInfo detail={detail} />}
      
      {/*<UpcomingBlock title="NOTIFICATIONS" desc="Talk on world health is rescheduled - see more…" date="11-03-2022" time="11-00" location={''} /> */}
      <Divider mb="1" bg="transparent" />
      {event?.exhibitor_settings?.show_on_native_app_dashboard == 1 ? <OurExhibitor />: null}
      {event?.sponsor_settings?.show_on_native_app_dashboard == 1 ? <OurSponsor />: null}
    </>
  );
}

export default RightBar;