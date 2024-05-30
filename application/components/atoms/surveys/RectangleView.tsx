import React from 'react';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons'
import { Box, HStack, Spacer, Text, VStack, Pressable, Icon } from 'native-base'
import { Survey } from 'application/models/survey/Survey';
import UseEventService from 'application/store/services/UseEventService';
import { useRouter } from 'solito/router'

const RectangleView = ({survey, completed, settings, index}:{survey:Survey, completed:boolean, settings?:boolean, index?: number}) => {
  const { event } = UseEventService();
  const { push } = useRouter()

  return (
    <Pressable
      p="0"
      w="100%"
      onPress={() => { 
        if(!completed){
          push(`/${event.url}/survey/detail/${survey.id}`)
        }
        else if(completed && settings){
          push(`/${event.url}/settings/mySurveyResults/detail/${survey.id}`)
        }
        else if(completed){
          push(`/${event.url}/survey/result/${survey.id}`)
        }
       }}>
      <Box w="100%" borderTopWidth={index === 0 ? 0 : '1'} borderColor="primary.bordercolor" py="4">
        <HStack px="3" w="100%" space="0" alignItems="center" justifyContent="space-between">
          <VStack w="100%" maxW="calc(100% - 40px)" space="1">
            <Text fontSize="md">{survey.info.name}</Text>
          </VStack>
          <Spacer />
           <Icon size="md" as={SimpleLineIcons} name="arrow-right" color="primary.text" />
        </HStack>
      </Box>
    </Pressable>
  )

}

export default RectangleView


