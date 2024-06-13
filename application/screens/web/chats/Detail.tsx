import * as React from 'react';
import PropTypes from 'prop-types';
import { Avatar, Box, Button, Center, Container, Heading, HStack, Icon, IconButton, Image, Input, Popover, ScrollView, Spacer, Spinner, Text, TextArea, VStack } from 'native-base';
import Master from 'application/screens/web/layouts/Master';
import AntDesign from '@expo/vector-icons/AntDesign';
import Entypo from '@expo/vector-icons/Entypo';
import Feather from '@expo/vector-icons/Feather';
import { UseEventService } from 'application/store/services';
import { createParam } from 'solito';
import UseChatService from 'application/store/services/UseChatService';
import { ChatMessage, ParticipantInfo } from 'application/models/chat/Chat';
import UseAuthService from 'application/store/services/UseAuthService';
import UseLoadingService from 'application/store/services/UseLoadingService';
import SectionLoading from 'application/components/atoms/SectionLoading';
import NextBreadcrumbs from 'application/components/atoms/NextBreadcrumbs';
import moment from 'moment';
import { GENERAL_DATE_FORMAT, GENERAL_TIME_FORMAT_WITHOUT_SECONDS } from 'application/utils/Globals';
import UseEnvService from 'application/store/services/UseEnvService';
import { useDebouncedCallback } from "use-debounce";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

type ScreenParams = { id: string }
const { useParam } = createParam<ScreenParams>()

type indexProps = {
  navigation: unknown
}
type ChatMessageGroup = {
  [key: string]: ChatMessage[];
};
const Detail = ({ navigation }: indexProps) => {
  const {event,modules} = UseEventService();
  const [_id] = useParam('id');
  const {chat, FetchChat} = UseChatService();

  const {response} = UseAuthService();
  const [loggedInUserId] = React.useState(response?.data?.user?.id);
  const { processing } = UseLoadingService();
  const module = modules.find((module) => module.alias === 'chat');
  const {_env} = UseEnvService();

  const title = React.useMemo(() => (
    chat?.participants_info?.map((participant: ParticipantInfo, index: number) => (
      `${participant?.full_name}${index < chat.participants_info.length - 1 ? ', ' : ''}`
    )).join('')
  ), [chat?.participants_info]);

  React.useEffect(() => {
    FetchChat({ thread_id: Number(_id) });
  }, []);
  
  // Memoize the grouping of messages by date
  const groupedMessages = React.useMemo(() => {
    if (!chat?.messages) return {};

    // Reduce messages into groups by date
    return chat.messages.reduce((acc, message) => {
      // Extracting date part from '2024-06-05 10:30:19'
      const dateOnly = message.sent_date.split(' ')[0];
      // Initialize the array for the date if it doesn't exist
      if (!acc[dateOnly]) {
        acc[dateOnly] = [];
      }
      // Add the message to the corresponding date array
      acc[dateOnly].push(message);
      return acc;
    }, {} as { [date: string]: typeof chat.messages });
  }, [chat?.messages]);
  

  // Function to get the first letters of the first and last name
  const getFirstLetters = (name: string) => {
    const names = name.split(' ');
    return (names[0]?.substring(0, 1) + names[1]?.substring(0, 1)).toUpperCase();
  };

  // get image of sender 
  const getSenderImage = (image: string) => {
    console.log('image: ',image)
    // source={{ uri: `${_env.eventcenter_base_url}/assets/attendees/${ shouldShow(attendeeToShow?.field_settings?.profile_picture) ? attendeeToShow?.image:''}` }}
    if(image){
      return `${_env.eventcenter_base_url}/assets/attendees/${image}`;
    }
    return '';
  };

  return (
      <>
      <NextBreadcrumbs module={module} title={title} />
      <Container pt="2" maxW="100%" w="100%">
        <HStack mb="3" pt="2" w="100%" space="3" alignItems="center">
          <Text fontWeight={'500'} isTruncated pr="6" fontSize="2xl">{title}</Text>
          <Spacer />
          <Popover
            trigger={(triggerProps) => {
            return <Button rounded={'full'}  bg={'transparent'} variant={'unstyled'} p={0} {...triggerProps} >
                  {chat?.participants_info && chat?.participants_info?.length > 1 ? (
                    <Avatar>
                      <Icon size={'xl'} color={'primary.text'} as={MaterialIcons} name="groups"  />
                    </Avatar>
                  ):(
                    <Avatar
                        source={{
                          uri: getSenderImage(chat?.participants_info && chat?.participants_info.length > 0 ? chat?.participants_info[0]?.image : '')
                        }}
                        >
                        {getFirstLetters(chat?.participants_info && chat?.participants_info.length > 0 ? chat?.participants_info[0]?.full_name : '')}
                        <Avatar.Badge borderWidth="1" bg="green.500" />
                    </Avatar>
                  )}
            </Button>
            }}
            
          >
            <Popover.Content top={2} width={210} shadow={3} borderColor={'primary.boxsolid'} bgColor={'primary.boxsolid'}>
              <Popover.Header p={3} borderColor={'primary.boxsolid'} bgColor={'primary.boxsolid'}>
               <Text fontWeight={500} fontSize={'md'}>Participants ({chat?.participants_info?.length})</Text>
               
              </Popover.Header>
              <Popover.Body p={0} borderTopWidth="0" borderColor={'primary.boxsolid'} bgColor={'primary.boxsolid'}>
                <ScrollView maxHeight={180}>
                  {chat?.participants_info.map((participant: ParticipantInfo) => 
                    <HStack p={3} borderTopWidth={'1'} borderTopColor={'primary.bordercolor'} space="2" alignItems="center">
                      <Avatar
                        size={'xs'}
                        source={{
                          uri:getSenderImage(participant?.image)
                        }}
                        
                      >
                        {getFirstLetters(participant?.full_name)}
                      </Avatar>
                      <Text  fontSize="sm">{participant?.full_name}</Text>
                      
                      
                    </HStack>
                    
                  )}
                </ScrollView>
                
              </Popover.Body>
            </Popover.Content>
          </Popover>
        </HStack>
        <VStack position={'relative'} mb="3" overflow="hidden" bg="primary.box" rounded="10" w="100%" space="0">
          <ScrollView w="100%" maxH="450px" py="4" px="3">
            {processing.includes('chat-detail') ? <SectionLoading /> : (
              <>
              {Object.entries(groupedMessages).map(([groupKey, messages]) => {
                return (
                  <>
                  <Box display={'flex'} alignItems={'center'} zIndex={'99'} position={'sticky'} top={0} mb={2}>
                    <Text bg="primary.boxsolid" px={4} py={2} rounded={'full'} fontSize="sm" textAlign="center">{moment(groupKey).format(GENERAL_DATE_FORMAT)}</Text>
                  </Box>
                  {messages.map((message: ChatMessage) => {
                    return (
                      <>
                      {message?.sender_id === loggedInUserId ? (
                        <HStack position={'relative'} zIndex={1} direction="row-reverse" mb="3" space="0" alignItems="flex-end">
                          <Avatar
                            source={{
                              uri: getSenderImage(message?.sender?.image)
                            }}
                          >
                            {getFirstLetters(message?.sender?.full_name)}
                            <Avatar.Badge borderWidth="1" bg="green.500" />
                          </Avatar>
                          <VStack mr="3" maxW="320" px="3" py="3" rounded="10" borderBottomRightRadius="0" bg="#3F89D0" space="1">
                            <Text lineHeight="sm" pr="3" fontSize="lg">{message?.body}</Text>
                            <Text opacity="0.8" textAlign="right" fontSize="md">{moment(message?.sent_date).format(GENERAL_TIME_FORMAT_WITHOUT_SECONDS)}</Text>
                          </VStack>
                        </HStack> 
                      ):(
                        <HStack position={'relative'} zIndex={1}  mb="3" space="0" alignItems="flex-end">
                          <Avatar
                            source={{
                              uri: getSenderImage(message?.sender?.image)
                            }}
                          >
                            {getFirstLetters(message?.sender?.full_name)}
                            <Avatar.Badge borderWidth="1" bg="green.500" />
                          </Avatar>
                          <VStack ml="3" maxW="320" px="3" py="3" rounded="10" borderBottomLeftRadius="0" bg="primary.darkbox" space="1">
                            <Text lineHeight="sm" pr="3" fontSize="lg">{message?.body}</Text>
                            <Text opacity="0.8" fontSize="md">{moment(message?.sent_date).format(GENERAL_TIME_FORMAT_WITHOUT_SECONDS)}</Text>
                          </VStack>
                        </HStack>
                      )}
                      </>
                    )
                  })}
                  </>
                )
              })}
              </>
            )}
           
{/* 
            <HStack mb="3" space="0" alignItems="flex-end">
              <Avatar
                source={{
                  uri: 'https://pbs.twimg.com/profile_images/1369921787568422915/hoyvrUpc_400x400.jpg'
                }}
              >
                SS
                <Avatar.Badge borderWidth="1" bg="green.500" />
              </Avatar>
              <VStack ml="3" maxW="320" px="3" py="3" rounded="10" borderBottomLeftRadius="0" bg="primary.darkbox" space="1">
                <Text lineHeight="sm" pr="3" fontSize="lg">Hello John, what are you going to do this weekend?</Text>
                <Text opacity="0.8" fontSize="md">17:45</Text>
              </VStack>
            </HStack>
            
            <HStack direction="row-reverse" mb="3" space="0" alignItems="flex-end">
              <Avatar
                source={{
                  uri: 'https://pbs.twimg.com/profile_images/1369921787568422915/hoyvrUpc_400x400.jpg'
                }}
              >
                SS
                <Avatar.Badge borderWidth="1" bg="green.500" />
              </Avatar>
              <VStack mr="3" maxW="320" px="3" py="3" rounded="10" borderBottomRightRadius="0" bg="#3F89D0" space="1">
                <Text lineHeight="sm" pr="3" fontSize="lg">Nothing planned, and you?</Text>
                <Text opacity="0.8" textAlign="right" fontSize="md">17:45</Text>
              </VStack>
            </HStack> */}

          </ScrollView>
          <NewMessage thread_id={Number(_id)} />
        </VStack>
        <Image
          source={{
            uri: 'https://wallpaperaccess.com/full/311401.jpg'
          }}
          alt=""
          w="100%"
          h="150px"
          rounded="10"
        />
      </Container>
      </>
  );
};

const NewMessage = ({thread_id}: {thread_id: number}) => {
  const {SaveMessage} = UseChatService();
  const [message, setMessage] = React.useState('');
  const {processing} = UseLoadingService();
  const debounced = useDebouncedCallback((value:any) => {
    setMessage(value);
  }, 500);

  function send(){
    if(message!==''){
      SaveMessage({message:message,thread_id:thread_id});
      setMessage('');
    }
  }


  return (
    <>
    <Center w="100%" maxW="100%">
      <HStack px="4" py="1" mb="0" bg="primary.darkbox" w="100%" space="2" alignItems="center">
        <Icon size="md" as={Entypo} name="new-message" color="primary.text" />
        <Text fontSize="lg">Write Message </Text>
      </HStack>
      <VStack p="1" w="100%" space="0">
        <TextArea borderWidth="0" borderColor="transparent" fontSize="lg" _focus={{ bg: 'transparent', borderColor: 'transparent' }} _hover={{ borderWidth: 0, borderColor: 'transparent' }} rounded="10" w="100%" p="4" placeholder="Your message…" autoCompleteType={undefined} 
        defaultValue={message}
        onChangeText={(text)=>debounced(text)}
        />
        <HStack mb="1" w="100%" space="1" alignItems="flex-end" justifyContent="flex-end">
          {/* <IconButton
            variant="transparent"
            icon={<Icon size="lg" as={Entypo} name="emoji-happy" color="primary.text" />}
            onPress={() => {
              console.log('hello')
            }}
          />
          <IconButton
            variant="transparent"
            icon={<Icon size="lg" as={Entypo} name="attachment" color="primary.text" />}
            onPress={() => {
              console.log('hello')
            }}
          /> */}
          {processing.includes('save-message') ? (
            <Spinner size="lg" color="primary.text" />
          ) : (
            <IconButton
            variant="transparent"
            isDisabled={message == ''}
            icon={<Icon size="lg" as={Feather} name="send" color="primary.text" />}
            onPress={() => {
              send()
            }}
          />
          )}
        </HStack>
      </VStack>
    </Center>
    </>
  )
}

Detail.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default Detail;
