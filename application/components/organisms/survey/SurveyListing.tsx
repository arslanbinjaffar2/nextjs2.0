import React from 'react'
import { Button, HStack, Container, IconButton, Icon, Center, Heading } from 'native-base'
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons'
import SurveyRectangleView from 'application/components/atoms/surveys/RectangleView';
import UseEventService from 'application/store/services/UseEventService';
import { useRouter } from 'solito/router';
import { Survey, Surveys } from '../../../models/survey/Survey';

const SurveyListing = ({surveys}:{surveys:Surveys}) => {
  
  const { event, modules  } = UseEventService();

  const { push } = useRouter()
    
  return (
    <Container mb={4} rounded="10" bg="primary.box" w="100%" maxW="100%">
    <Heading py="1" fontSize="26px" fontWeight={500} w="100%" textAlign="center">{modules?.find((polls)=>(polls.alias == 'survey'))?.name ?? 'Surveys'}</Heading>
    {surveys?.slice(0, 4).map((poll:Survey)=>{
       return <SurveyRectangleView survey={poll} key={poll.id} completed={false} />
    })}
    <Center py="3" px="2" w="100%" alignItems="flex-end">
      {surveys?.length > 4 && <Button p="1" onPress={()=> push(`/${event.url}/survey`)} _hover={{ bg: 'transparent', _text: { color: 'primary.500' }, _icon: { color: 'primary.500' } }} bg="transparent" width={'auto'} rightIcon={<Icon as={SimpleLineIcons} name="arrow-right" size="sm" />}>
        See all
      </Button>}
    </Center>
  </Container>
  )
}

export default SurveyListing