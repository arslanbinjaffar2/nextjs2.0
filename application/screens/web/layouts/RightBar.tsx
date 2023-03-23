import * as React from 'react';
import UpcomingBlock from 'application/components/atoms/programs/UpcomingBlock';
import { Divider } from 'native-base';
import ExhibitorsListing from 'application/components/molecules/exhibitors/Listing';

const RightBar = ({ navigation }: any) => {
  return (
    <>
      <UpcomingBlock title="UPCOMING SESSION" desc="Workshop 2 - The right path" location="Room 242" date="11-03-2022" time="11-00 to 13-00" />
      <UpcomingBlock title="NOTIFICATIONS" desc="Talk on world health is rescheduled - see more…" date="11-03-2022" time="11-00" location={''} />
      <Divider mb="1" bg="transparent" />
      <ExhibitorsListing />
    </>
  );
}

export default RightBar;