import * as React from 'react';
import BlockNotification from 'app/components/atoms/notifications/BlockNotification';
import { Divider } from 'native-base';
import VerticalBoxItemListing from 'app/components/molecules/exhibitors/VerticalBoxItemListing';

const Index = ({ navigation }: any) => {
  return (
    <>
      <BlockNotification title="UPCOMING SESSION" desc="Workshop 2 - The right path" location="Room 242" date="11-03-2022" time="11-00 to 13-00" />
      <BlockNotification title="NOTIFICATIONS" desc="Talk on world health is rescheduled - see more…" date="11-03-2022" time="11-00" location={''} />
      <Divider mb="1" bg="transparent" />
      <VerticalBoxItemListing />
    </>
  );
}

export default Index;