
import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Index from '@src/screens/web/dashboard/Index';
import ProgramsLayout from '@src/screens/web/programs/Index';
import ProgramDetails from '@src/screens/web/programs/Detail';
import AttendeeLayout from '@src/screens/web/attendees/Index';
import AttendeeDetails from '@src/screens/web/attendees/Detail';
import CheckinLayout from '@src/screens/web/check-in/Index';
import PracticalInformationLayout from '@src/screens/web/practical-information/Index';
import PracticalInformationDetail from '@src/screens/web/practical-information/Detail';

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
const SessionCheckin = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen options={{ headerShown: false }} name="index" component={CheckinLayout} />
    </Stack.Navigator>
  )
}
const PracticalInformation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen options={{ headerShown: false }} name="index" component={PracticalInformationLayout} />
      <Stack.Screen options={{ headerShown: false }} name="detail" component={PracticalInformationDetail} />
    </Stack.Navigator>
  )
}

const AppWebStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen options={{ headerShown: false }} name="index" component={Index} />
      <Stack.Screen options={{ headerShown: false }} name="programs" component={ProgramsModule} />
      <Stack.Screen options={{ headerShown: false }} name="attendees" component={AttendeesModule} />
      <Stack.Screen options={{ headerShown: false }} name="check-in" component={SessionCheckin} />
      <Stack.Screen options={{ headerShown: false }} name="practical-information" component={PracticalInformation} />
    </Stack.Navigator>
  )
}

export default AppWebStack