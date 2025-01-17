import React from 'react';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons'
import AntDesign from '@expo/vector-icons/AntDesign';
import { Box, HStack, Spacer, Text, VStack, Pressable, Icon } from 'native-base'
import { Poll } from 'application/models/poll/Poll';
import UseEventService from 'application/store/services/UseEventService';
import { useRouter } from 'solito/router'
import moment from 'moment';

const RectangleView = ({poll, completed, settings, index}:{poll:Poll, completed:boolean, settings?:boolean, index?: number}) => {
  const { event } = UseEventService();
  const { push } = useRouter()
  return (
    <Pressable
      p="0"
      w="100%"
      onPress={() => { 
        if(!completed){
          push(`/${event.url}/polls/detail/${poll.agenda_id}`)
        }
        else if(completed && settings){
          push(`/${event.url}/settings/myPollResults/detail/${poll.agenda_id}`)
        }
        else if(completed){
          push(`/${event.url}/polls/result/${poll.agenda_id}`)
        }
       }}>
      <Box w="100%" borderTopWidth={index === 0 ? 0 : 1} borderColor="primary.bordercolor" py="3">
        <HStack px="3" w="100%" space="0" alignItems="center" justifyContent="space-between">
          {/* <VStack marginRight={5}>
            <Icon size="lg" as={AntDesign} name={poll?.agenda_favs?.length > 0 ? 'heart' :'hearto'} color={poll?.agenda_favs?.length > 0 ? 'secondary.500' : 'primary.text'} />
          </VStack> */}
          <VStack bg="red" w="100%" maxW={'calc(100% - 40px)'} space="1">
            <Text fontSize="md">{poll.program.info.topic}</Text>
            {event.agenda_settings?.agenda_display_time == 1 && poll?.program?.hide_time !== 1 &&
              <Text fontSize="sm">
                {moment(`${poll.program.start_date} ${poll.program.start_time}`).format('HH:mm')} - {moment(`${poll.program.start_date} ${poll.end_time}`).format('HH:mm')} 
              </Text>
            }
          </VStack>
          <Spacer />
           <Icon size="md" as={SimpleLineIcons} name="arrow-right" color="primary.text" />
        </HStack>
      </Box>
    </Pressable>
  )

}

export default RectangleView


