
import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Index from 'screens/web/dashboard/Index';
import ProgramsLayout from 'screens/web/programs/Index';
import ProgramDetails from 'screens/web/programs/Detail';
import AttendeeLayout from 'screens/web/attendees/Index';
import AttendeeDetails from 'screens/web/attendees/Detail';
import CheckinLayout from 'screens/web/check-in/Index';
import EventInformationLayout from 'screens/web/event-information/Index';
import EventInformationDetail from 'screens/web/event-information/Detail';
import DocumentsList from 'screens/web/documents/Index';
import MapsList from 'screens/web/maps/Index';
import ChatList from 'screens/web/chats/Index';
import ChatClient from 'screens/web/chats/Detail';
import SponsorsList from 'screens/web/sponsors/Index';
import SponsorsDetail from 'screens/web/sponsors/Detail';
import PollsList from 'screens/web/polls/Index';
import PollsDetail from 'screens/web/polls/Detail';
import SocialMediaList from 'screens/web/social-media/Index';
import NetworkList from 'screens/web/network-interest/Index';
import QuestionList from 'screens/web/qa/Index';
import QuestionDetail from 'screens/web/qa/Detail';
import FloorPlansList from 'screens/web/floor-plan/Index';
import SocialWallList from 'screens/web/social-wall/Index';

const Stack = createNativeStackNavigator();

const ProgramsModule = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen options={{ headerShown: false }} name="index" component={ProgramsLayout} />
      <Stack.Screen options={{ headerShown: false }} name="detail" component={ProgramDetails} />
    </Stack.Navigator>
  )
}

const AttendeesModule = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen options={{ headerShown: false }} name="index" component={AttendeeLayout} />
      <Stack.Screen options={{ headerShown: false }} name="detail" component={AttendeeDetails} />
    </Stack.Navigator>
  )
}
const CheckInModule = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen options={{ headerShown: false }} name="index" component={CheckinLayout} />
    </Stack.Navigator>
  )
}
const EventInformation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen options={{ headerShown: false }} name="index" component={EventInformationLayout} />
      <Stack.Screen options={{ headerShown: false }} name="detail" component={EventInformationDetail} />
    </Stack.Navigator>
  )
}
const Documents = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen options={{ headerShown: false }} name="index" component={DocumentsList} />
    </Stack.Navigator>
  )
}
const Maps = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen options={{ headerShown: false }} name="index" component={MapsList} />
    </Stack.Navigator>
  )
}
const FloorPlans = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen options={{ headerShown: false }} name="index" component={FloorPlansList} />
    </Stack.Navigator>
  )
}
const SocialWall = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen options={{ headerShown: false }} name="index" component={SocialWallList} />
    </Stack.Navigator>
  )
}
const Chats = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen options={{ headerShown: false }} name="index" component={ChatList} />
      <Stack.Screen options={{ headerShown: false }} name="detail" component={ChatClient} />
    </Stack.Navigator>
  )
}
const Sponsors = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen options={{ headerShown: false }} name="index" component={SponsorsList} />
      <Stack.Screen options={{ headerShown: false }} name="detail" component={SponsorsDetail} />
    </Stack.Navigator>
  )
}
const Polls = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen options={{ headerShown: false }} name="index" component={PollsList} />
      <Stack.Screen options={{ headerShown: false }} name="detail" component={PollsDetail} />
    </Stack.Navigator>
  )
}
const SocialMedia = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen options={{ headerShown: false }} name="index" component={SocialMediaList} />
    </Stack.Navigator>
  )
}
const NetworkInterest = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen options={{ headerShown: false }} name="index" component={NetworkList} />
    </Stack.Navigator>
  )
}
const QuestionAnswers = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen options={{ headerShown: false }} name="index" component={QuestionList} />
      <Stack.Screen options={{ headerShown: false }} name="detail" component={QuestionDetail} />
    </Stack.Navigator>
  )
}

const AppWebStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen options={{ headerShown: false }} name="index" component={Index} />
      <Stack.Screen options={{ headerShown: false }} name="programs" component={ProgramsModule} />
      <Stack.Screen options={{ headerShown: false }} name="attendees" component={AttendeesModule} />
      <Stack.Screen options={{ headerShown: false }} name="check-in" component={CheckInModule} />
      <Stack.Screen options={{ headerShown: false }} name="event-information" component={EventInformation} />
      <Stack.Screen options={{ headerShown: false }} name="documents" component={Documents} />
      <Stack.Screen options={{ headerShown: false }} name="maps" component={Maps} />
      <Stack.Screen options={{ headerShown: false }} name="chats" component={Chats} />
      <Stack.Screen options={{ headerShown: false }} name="sponsors" component={Sponsors} />
      <Stack.Screen options={{ headerShown: false }} name="polls" component={Polls} />
      <Stack.Screen options={{ headerShown: false }} name="social-media" component={SocialMedia} />
      <Stack.Screen options={{ headerShown: false }} name="network-interest" component={NetworkInterest} />
      <Stack.Screen options={{ headerShown: false }} name="qa" component={QuestionAnswers} />
      <Stack.Screen options={{ headerShown: false }} name="floor-plans" component={FloorPlans} />
      <Stack.Screen options={{ headerShown: false }} name="social-wall" component={SocialWall} />
    </Stack.Navigator>
  )
}

export default AppWebStack