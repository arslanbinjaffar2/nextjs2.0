import React from 'react';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons'
import { Box, HStack, Spacer, Text, VStack, Pressable, Icon } from 'native-base'
import { Survey } from 'application/models/survey/Survey';
import UseEventService from 'application/store/services/UseEventService';
import { useRouter } from 'solito/router'

const RectangleView = ({survey, completed, settings}:{survey:Survey, completed:boolean, settings?:boolean}) => {
  const { event } = UseEventService();
  const { push } = useRouter()

  return (
    <Pressable
      p="0"
      w="100%"
      _hover={{ bg: 'primary.500' }}
      onPress={() => { 
        if(!completed){
          push(`/${event.url}/survey/detail/${survey.id}`)
        }
        if(completed && settings){
          push(`/${event.url}/settings/mySurveyResults/detail/${survey.id}`)
        }
       }}>
      <Box w="100%" borderBottomWidth='1' borderColor="primary.text" py="3">
        <HStack px="3" w="100%" space="0" alignItems="center" justifyContent="space-between">
          <VStack bg="red" w="100%" maxW={['95%', '80%', '70%']} space="1">
            <Text fontSize="md">{survey.info.name}</Text>
          </VStack>
          <Spacer />
          {(!completed || settings) && <Icon size="md" as={SimpleLineIcons} name="arrow-right" color="primary.text" />}
        </HStack>
      </Box>
    </Pressable>
  )

}

export default RectangleView


