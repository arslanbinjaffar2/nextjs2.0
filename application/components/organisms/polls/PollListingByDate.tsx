import React from 'react'
import { Button, HStack, Container, IconButton, Icon, Center, Heading } from 'native-base'
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons'
import PollRectangleView from 'application/components/atoms/polls/RectangleView';
import { Poll, Polls } from 'application/models/poll/Poll';
import UseEventService from 'application/store/services/UseEventService';
import { useRouter } from 'solito/router';

const PollListingByDate = ({polls}:{polls:Polls}) => {
  
  const { event  } = UseEventService();

  const [pollDateIndex, setPollDateIndex] = React.useState(0);
  
  const { push } = useRouter()
    
  return (
    <Container mb="3" rounded="10" bg="primary.box" w="100%" maxW="100%">
    <Heading py="1" fontSize="2xl" w="100%" textAlign="center">POLLS</Heading>
    <HStack py="1" w="100%" bg="primary.darkbox" space="0" alignItems="center">
      <Center alignItems="flex-start" w="10%">
        <IconButton
          p="0"
          w="40px"
          variant="transparent"
          icon={<Icon size="md" as={SimpleLineIcons} name="arrow-left" color="primary.text" />}
          onPress={() => {
            setPollDateIndex(pollDateIndex > 0 ? (pollDateIndex - 1) : (Object.keys(polls).length - 1));
          }}
        />
      </Center>
      <Center w="80%">
        <Heading fontSize="lg">{polls[Object.keys(polls)[pollDateIndex]][0].agenda_start_date_formatted}</Heading>
      </Center>
      <Center alignItems="flex-end" w="10%">
        <IconButton
          p="0"
          w="40px"
          variant="transparent"
          icon={<Icon size="md" as={SimpleLineIcons} name="arrow-right" color="primary.text" />}
          onPress={() => {
            setPollDateIndex(Object.keys(polls).length - 1 > pollDateIndex ? (pollDateIndex +1) : 0);
          }}
        />
      </Center>
    </HStack>
    {polls[Object.keys(polls)[pollDateIndex]].slice(0, 4).map((poll:Poll)=>{
       return <PollRectangleView poll={poll} completed={false} />
    })}
    <Center py="3" px="2" w="100%" alignItems="flex-end">
      <Button p="1" onPress={()=> push(`/${event.url}/polls`)} _hover={{ bg: 'transparent', _text: { color: 'primary.500' }, _icon: { color: 'primary.500' } }} bg="transparent" width={'auto'} rightIcon={<Icon as={SimpleLineIcons} name="arrow-right" size="sm" />}>
        Show all
      </Button>
    </Center>
  </Container>
  )
}

export default PollListingByDate