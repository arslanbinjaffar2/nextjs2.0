import * as React from 'react';
import Notification from '@src/components/atoms/Notification';
import { Divider } from 'native-base';
import OurExhibitors from '@src/components/molecules/OurExhibitors';


const RightSidebar = ({navigation}: any) => {
  return (
    <>
      <Notification title="UPCOMING SESSION" desc="Workshop 2 - The right path" location="Room 242" date="11-03-2022" time="11-00 to 13-00" />
      <Notification title="NOTIFICATIONS" desc="Talk on world health is rescheduled - see more…" date="11-03-2022" time="11-00" location={''} />
      <Divider mb="1" bg="transparent" />
      <OurExhibitors />
    </>
  );
}

export default RightSidebar;