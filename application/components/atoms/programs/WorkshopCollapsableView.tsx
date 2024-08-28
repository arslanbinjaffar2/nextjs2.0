import React from 'react'
import { Box, HStack, Spacer, VStack, Text, Icon, ZStack, Center, IconButton, Pressable } from 'native-base'
import IcoRaiseHand from 'application/assets/icons/IcoRaiseHand';
import Ionicons from '@expo/vector-icons/Ionicons';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Program } from 'application/models/program/Program';
import RectangleDetailView from 'application/components/atoms/programs/RectangleDetailView';
import UseProgramService from 'application/store/services/UseProgramService';
import UseEventService from 'application/store/services/UseEventService';
import { useRouter } from 'solito/router';
import moment from 'moment'
import { getColorScheme } from 'application/styles/colors';
type AppProps = {
  program: Program,
  k: number,
  border: boolean,
  speaker?:number,
  section?:string,
  currentIndex?:number,
  screen?: string
}
// agenda_collapse_workshop
const WorkshopCollapsableView = ({ program, k, border, speaker, section,currentIndex, screen }: AppProps) => {
  const { event } = UseEventService();
  const [open, setOpen] = React.useState(event?.agenda_settings?.agenda_collapse_workshop ?? false);
  const colors = getColorScheme(event?.settings?.app_background_color ?? '#343d50', event?.settings?.app_text_mode);
  return (
    <>
      <Box w={"100%"} pl={'5'} pr={3} py={1} bg={colors.primary} display={'flex'} flexDirection={'row'} justifyContent={'space-between'} alignItems={'center'}>
        <Text>{program.program_workshop}</Text>
        <Pressable
          onPress={() => {
            setOpen(!open)
          }}>
          <Icon size="md" as={AntDesign} name={!open ? "up" :"right"} color={"primary.text"} />
        </Pressable>
      </Box>
      {!open && <>
        {program.workshop_programs?.map((workshop_program: Program, i: number) =>
            <RectangleDetailView currentIndex={currentIndex} workshop={true} key={i} screen={screen} section={section} speaker={speaker} program={workshop_program} k={i} border={border || program.workshop_programs?.length !== (i + 1)} />
            )}
        </>}
    </>
  )
};

export default WorkshopCollapsableView