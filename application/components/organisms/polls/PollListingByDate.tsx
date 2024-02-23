import React from 'react'
import { Button, HStack, Container, IconButton, Icon, Center, Heading } from 'native-base'
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons'
import PollRectangleView from 'application/components/atoms/polls/RectangleView';
import { Poll, Polls } from 'application/models/poll/Poll';
import UseEventService from 'application/store/services/UseEventService';
import { useRouter } from 'solito/router';

const PollListingByDate = ({polls}:{polls:Polls}) => {
  
  const { event, modules  } = UseEventService();

  const [pollDateIndex, setPollDateIndex] = React.useState(0);
  
  const { push } = useRouter()
    
  return (
    <Container mb="3" rounded="10" bg="primary.box" w="100%" maxW="100%">
    <Heading py="1" fontSize="26px" w="100%" textAlign="center" fontWeight={500}>{modules?.find((polls)=>(polls.alias == 'polls'))?.name ?? 'Polls'}</Heading>
    <HStack py="1" w="100%" bg="primary.darkbox" space="0" alignItems="center">
      <Center alignItems="flex-start" w="10%">
        {pollDateIndex > 0 && <IconButton
          p="0"
          w="40px"
          variant="transparent"
          icon={<Icon size="md" as={SimpleLineIcons} name="arrow-left" color="primary.text" />}
          onPress={() => {
            setPollDateIndex((pollDateIndex - 1));
          }}
        />}
      </Center>
      <Center w="80%">
        <Heading fontSize="lg" fontWeight={500}>{polls[Object.keys(polls)[pollDateIndex]]?.length > 0 && polls[Object.keys(polls)[pollDateIndex]][0].agenda_start_date_formatted}</Heading>
      </Center>
      <Center alignItems="flex-end" w="10%">
        {((Object.keys(polls)?.length - 1) > pollDateIndex)&& <IconButton
          p="0"
          w="40px"
          variant="transparent"
          icon={<Icon size="md" as={SimpleLineIcons} name="arrow-right" color="primary.text" />}
          onPress={() => {
            setPollDateIndex((pollDateIndex +1));
          }}
        />}
      </Center>
    </HStack>
    {polls[Object.keys(polls)[pollDateIndex]]?.slice(0, 4).map((poll:Poll)=>{
       return <PollRectangleView poll={poll} key={poll.id} completed={false} />
    })}
    <Center py="3" px="2" w="100%" alignItems="flex-end">
      {polls[Object.keys(polls)[pollDateIndex]]?.length > 4 && <Button p="1" onPress={()=> push(`/${event.url}/polls`)} _hover={{ bg: 'transparent', _text: { color: 'primary.500' }, _icon: { color: 'primary.500' } }} bg="transparent" width={'auto'} rightIcon={<Icon as={SimpleLineIcons} name="arrow-right" size="sm" />}>
        See all
      </Button>}
    </Center>
  </Container>
  )
}

export default PollListingByDate