import * as React from 'react';
import UpcomingBlock from 'application/components/atoms/programs/UpcomingBlock';
import { Divider } from 'native-base';
import OurExhibitor from 'application/components/molecules/exhibitors/OurExhibitor';
import OurSponsor from 'application/components/molecules/sponsors/OurSponsor';
import ExhibitorContactInfo from 'application/components/atoms/exhibitors/contact-info/ContactInfo';
import SponsorContactInfo from 'application/components/atoms/sponsors/contact-info/ContactInfo';
import { useRouter as UseNextRouter } from 'next/router';

const RightBar = () => {
  const nextRouter = UseNextRouter();

  return (
    <>

      {nextRouter.asPath.includes('exhibitors/detail') &&  <ExhibitorContactInfo />}
      {nextRouter.asPath.includes('sponsors/detail') &&  <SponsorContactInfo />}
      <UpcomingBlock title="UPCOMING SESSION" desc="Workshop 2 - The right path" location="Room 242" date="11-03-2022" time="11-00 to 13-00" />
      <UpcomingBlock title="NOTIFICATIONS" desc="Talk on world health is rescheduled - see more…" date="11-03-2022" time="11-00" location={''} />
      <Divider mb="1" bg="transparent" />
      <OurExhibitor />
      <OurSponsor />
    </>
  );
}

export default RightBar;