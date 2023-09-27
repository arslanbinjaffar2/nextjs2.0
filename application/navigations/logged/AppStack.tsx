
import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Index from 'application/screens/mobile/dashboard/Index';
import Program from 'application/screens/mobile/program/Index';
import Attendee from 'application/screens/mobile/attendee/Index';
import AttendeeDetail from 'application/screens/mobile/attendee/Detail';
import Speaker from 'application/screens/mobile/speaker/Index';
import SpeakerDetail from 'application/screens/mobile/speaker/Detail';
import NewsUpdate from 'application/screens/mobile/news_update/Index';
import Document from 'application/screens/mobile/document/Index';
import MyDocument from 'application/screens/mobile/document/MyDocument';
import Map from 'application/screens/mobile/map/Index';
import Chat from 'application/screens/mobile/chat/Index';
import Gallery from 'application/screens/mobile/gallery/Index';
import Sponsor from 'application/screens/mobile/sponsor/Index';
import SponsorDetail from 'application/screens/mobile/sponsor/Detail';
import Exhibitor from 'application/screens/mobile/exhibitor/Index';
import ExhibitorDetail from 'application/screens/mobile/exhibitor/Detail';
import InformationPage from 'application/screens/mobile/information_page/Index';
import EventInfo from 'application/screens/mobile/event_info/Index';
import EventInfoDetail from 'application/screens/mobile/event_info/PageDetail';
import Poll from 'application/screens/mobile/poll/Index';
import PollDetail from 'application/screens/mobile/poll/Detail';
import Survey from 'application/screens/mobile/survey/Index';
import SurveyDetail from 'application/screens/mobile/survey/Detail';
import QA from 'application/screens/mobile/qa/Index';
import CheckIn from 'application/screens/mobile/checkin/Index';
import SocialMedia from 'application/screens/mobile/social_media/Index';
import HelpDesk from 'application/screens/mobile/helpdesk/Index';
import FloorPlan from 'application/screens/mobile/floorplan/Index';
import NetworkInterest from 'application/screens/mobile/network_interest/Index';
import RequestToSpeak from 'application/screens/mobile/request_to_speak/Index';
import MyEvent from 'application/screens/mobile/event/MyEvent';
import UpcomingEvent from 'application/screens/mobile/event/UpcomingEvent';
import SocialWall from 'application/screens/mobile/social_wall/Index';
import colors from 'application/styles/colors';
import DrawerLayout from 'application/screens/mobile/layouts/Drawer';
import MyProgram from 'application/screens/mobile/program/MyProgram';
import SessionCheckIn from 'application/screens/mobile/program/SessionCheckIn';
import MyNote from 'application/screens/mobile/notes/MyNote';
import Alert from 'application/screens/mobile/alerts/Index';
import Settings from 'application/screens/mobile/Settings/Index';

const Drawer = createDrawerNavigator();

const AppStack = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerStyle: {
          backgroundColor: `rgba(${colors.darkbox},0.95)`,
          width: '80%'
        }
      }}
      initialRouteName="dashboard"
      drawerContent={(props: any) => <DrawerLayout {...props} />}>
      <Drawer.Screen options={{ headerShown: false }} name="dashboard" component={Index} />
      <Drawer.Screen options={{ headerShown: false }} name="agendas" component={Program} />
      <Drawer.Screen options={{ headerShown: false }} name="myagendas" component={MyProgram} />
      <Drawer.Screen options={{ headerShown: false }} name="checin_agendas" component={SessionCheckIn} />
      <Drawer.Screen options={{ headerShown: false }} name="attendees" component={Attendee} />
      <Drawer.Screen options={{ headerShown: false }} name="attendee-detail" component={AttendeeDetail} />
      <Drawer.Screen options={{ headerShown: false }} name="speakers" component={Speaker} />
      <Drawer.Screen options={{ headerShown: false }} name="speaker-detail" component={SpeakerDetail} />
      <Drawer.Screen options={{ headerShown: false }} name="ddirectory" component={Document} />
      <Drawer.Screen options={{ headerShown: false }} name="mydocuments" component={MyDocument} />
      <Drawer.Screen options={{ headerShown: false }} name="maps" component={Map} />
      <Drawer.Screen options={{ headerShown: false }} name="alerts" component={Alert} />
      <Drawer.Screen options={{ headerShown: false }} name="chat" component={Chat} />
      <Drawer.Screen options={{ headerShown: false }} name="gallery" component={Gallery} />
      <Drawer.Screen options={{ headerShown: false }} name="information_pages" component={InformationPage} />
      <Drawer.Screen options={{ headerShown: false }} name="sponsors" component={Sponsor} />
      <Drawer.Screen options={{ headerShown: false }} name="sponsor-detail" component={SponsorDetail} />
      <Drawer.Screen options={{ headerShown: false }} name="exhibitors" component={Exhibitor} />
      <Drawer.Screen options={{ headerShown: false }} name="exhibitor-detail" component={ExhibitorDetail} />
      <Drawer.Screen options={{ headerShown: false }} name="polls" component={Poll} />
      <Drawer.Screen options={{ headerShown: false }} name="poll-detail" component={PollDetail} />
      <Drawer.Screen options={{ headerShown: false }} name="survey" component={Survey} />
      <Drawer.Screen options={{ headerShown: false }} name="survey-detail" component={SurveyDetail} />
      <Drawer.Screen options={{ headerShown: false }} name="qa" component={QA} />
      <Drawer.Screen options={{ headerShown: false }} name="social" component={SocialMedia} />
      <Drawer.Screen options={{ headerShown: false }} name="checkIn" component={CheckIn} />
      <Drawer.Screen options={{ headerShown: false }} name="help_desk" component={HelpDesk} />
      <Drawer.Screen options={{ headerShown: false }} name="plans" component={FloorPlan} />
      <Drawer.Screen options={{ headerShown: false }} name="business" component={NetworkInterest} />
      <Drawer.Screen options={{ headerShown: false }} name="myturnlist" component={RequestToSpeak} />
      <Drawer.Screen options={{ headerShown: false }} name="homeMyevents" component={MyEvent} />
      <Drawer.Screen options={{ headerShown: false }} name="social_wall" component={SocialWall} />
      <Drawer.Screen options={{ headerShown: false }} name="my_notes" component={MyNote} />
      <Drawer.Screen options={{ headerShown: false }} name="upcomingEvents" component={UpcomingEvent} />
      <Drawer.Screen options={{ headerShown: false }} name="event-info" component={EventInfo} />
      <Drawer.Screen options={{ headerShown: false }} name="event-info-detail" component={EventInfoDetail} />
      <Drawer.Screen options={{ headerShown: false }} name="settings" component={Settings} />
    </Drawer.Navigator>
  )
}

export default AppStack