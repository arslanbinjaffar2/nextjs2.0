
import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Index from '@src/screens/web/dashboard/Index';
import ProgramsLayout from '@src/screens/web/programs/Index';
import ProgramDetails from '@src/screens/web/programs/Detail';
import AttendeeLayout from '@src/screens/web/attendees/Index';
import AttendeeDetails from '@src/screens/web/attendees/Detail';
import CheckinLayout from '@src/screens/web/check-in/Index';
import EventInformationLayout from '@src/screens/web/event-information/Index';
import EventInformationDetail from '@src/screens/web/event-information/Detail';
import DocumentsList from '@src/screens/web/documents/Index';
import MapsList from '@src/screens/web/maps/Index';
import ChatList from '@src/screens/web/chats/Index';
import ChatClient from '@src/screens/web/chats/Detail';
import SponsorsList from '@src/screens/web/sponsors/Index';
import SponsorsDetail from '@src/screens/web/sponsors/Detail';
import PollsList from '@src/screens/web/polls/Index';
import PollsDetail from '@src/screens/web/polls/Detail';

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
    </Stack.Navigator>
  )
}

export default AppWebStack