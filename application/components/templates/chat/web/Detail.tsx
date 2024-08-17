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
import { ChatMessage, ParticipantInfo, ReadState } from 'application/models/chat/Chat';
import UseAuthService from 'application/store/services/UseAuthService';
import UseLoadingService from 'application/store/services/UseLoadingService';
import SectionLoading from 'application/components/atoms/SectionLoading';
import NextBreadcrumbs from 'application/components/atoms/NextBreadcrumbs';
import moment from 'moment';
import { GENERAL_DATE_FORMAT, GENERAL_TIME_FORMAT_WITHOUT_SECONDS } from 'application/utils/Globals';
import UseEnvService from 'application/store/services/UseEnvService';
import { useDebouncedCallback } from "use-debounce";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import IcoSend from 'application/assets/icons/small/IcoSend'
import Icowritecomment from 'application/assets/icons/small/Icowritecomment';

type ScreenParams = { id: string }
const { useParam } = createParam<ScreenParams>()

type indexProps = {
  navigation: unknown
}
type ChatMessageGroup = {
  [key: string]: ChatMessage[];
};
const Detail = ({ navigation }: indexProps) => {
  const scrollViewRef = React.useRef<HTMLDivElement>(null);
  const {event,modules} = UseEventService();
  const [_id] = useParam('id');
  const {chat, FetchChat,MarkThreadAsRead} = UseChatService();

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

  React.useEffect(() => {
    FetchChat({ thread_id: Number(_id) });
  }, [_id]);
  
  // Memoize the grouping of messages by date
  const groupedMessages = React.useMemo(() => {
    if (!chat?.messages) return {};

    // mark the whole thread as red for current user
    MarkThreadAsRead({thread_id: Number(_id)});
    
    // get the latest message
    // const latestMessage = chat.messages[chat.messages.length - 1];
    
    // // if latest message is not empty and sender_id is not current user id and read state does not have this user id
    // if(latestMessage && latestMessage?.sender_id !== loggedInUserId && !latestMessage?.read_state.some((read_state:ReadState) => read_state.user_id === loggedInUserId)  ){
    //   MarkThreadAsRead({thread_id: Number(_id)});
    // }

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

  React.useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTop = scrollViewRef.current.scrollHeight;
    }
  }, [groupedMessages]);
  

  // Function to get the first letters of the first and last name
  const getFirstLetters = (name: string) => {
    if(!name){
      return '';
    }
    const names = name.split(' ');
    return (names[0]?.substring(0, 1) + names[1]?.substring(0, 1)).toUpperCase();
  };

  // get image of sender 
  function getSenderImage(image: string){
    if(image){
      return `${_env.eventcenter_base_url}/assets/attendees/${image}`;
    }
    return '';
  }

  return (
      <>
      <NextBreadcrumbs module={module} title={title} />
      <Container pt="2" maxW="100%" w="100%">
        <HStack mb="3" pt="2" w="100%" space="3" alignItems="center">
          <Text fontWeight={'500'} isTruncated pr="6" fontSize="2xl">{title}</Text>
          <Spacer />
          <Popover
           placement='bottom right'
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
                        key={chat?.participants_info && chat?.participants_info.length > 0 ? chat?.participants_info[0]?.image : ''}
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
               <Text fontWeight={500} fontSize={'md'}>{event?.labels?.CHAT_PARTICIPANTS} ({chat?.participants_info?.length})</Text>
               
              </Popover.Header>
              <Popover.Body p={0} borderTopWidth="0" borderColor={'primary.boxsolid'} bgColor={'primary.boxsolid'}>
                <ScrollView maxHeight={180}>
                  {chat?.participants_info?.map((participant: ParticipantInfo) => 
                    <HStack   p={3} borderTopWidth={'1'} borderTopColor={'primary.bordercolor'} space="2" alignItems="center">
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
          <ScrollView ref={scrollViewRef} w="100%" maxH="450px" py="4" px="3">
            {processing.includes('chat-detail') ? <SectionLoading /> : (
              <>
              {Object.entries(groupedMessages).map(([groupKey, messages]) => {
                return (
                  <>
                  <Box nativeID='zindex-99' display={'flex'} alignItems={'center'} zIndex={'99'} position={'sticky'} top={0} mb={2}>
                    <Text bg="primary.boxsolid" px={4} py={2} rounded={'full'} fontSize="sm" textAlign="center">{moment(groupKey).calendar(null,{
                        lastDay : `[${event?.labels?.CHAT_YESTERDAY}]`,
                        sameDay : `[${event?.labels?.CHAT_TODAY}]`,
                        sameElse: GENERAL_DATE_FORMAT
                    })}</Text>
                  </Box>
                  {messages.map((message: ChatMessage) => {
                    return (
                      <>
                      {message?.sender_id === loggedInUserId ? (
                        <HStack position={'relative'} zIndex={1} direction="row-reverse" mb="3" space="0" alignItems="flex-end">
                          <Avatar
                            key={`data-image-${Math.floor(1000 + Math.random() * 9000)}`}
                            source={{
                              uri: getSenderImage(message?.sender?.image)
                            }}
                          >
                            {getFirstLetters(message?.sender?.full_name)}
                            <Avatar.Badge borderWidth="1" bg="green.500" />
                          </Avatar>
                          <VStack  space="0">
                            <VStack mr="3" maxW="320px" minW={120} px="3" py="3" rounded="10" borderBottomRightRadius="0" bg="primary.500" space="2">
                              <Text color={'primary.hovercolor'} lineHeight="sm" pr="3" fontSize="md">{message?.body}</Text>
                              <Text color={'primary.hovercolor'} opacity="0.8" textAlign="right" fontSize="sm">{moment(message?.sent_date).format(GENERAL_TIME_FORMAT_WITHOUT_SECONDS)}</Text>
                            </VStack>
                            {/* <Text textAlign={'right'} mr="3" fontSize="xs">{moment(message?.sent_date).format(GENERAL_TIME_FORMAT_WITHOUT_SECONDS)}</Text> */}
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
                          <VStack  space="0">
                            <VStack ml="3" maxW="320px" minW={120} px="3" py="3" rounded="10" borderBottomLeftRadius="0" bg="primary.darkbox" space="2">
                              <Text lineHeight="sm" pr="3" fontSize="md">{message?.body}</Text>
                              <Text textAlign={'left'} opacity="0.8"  fontSize="sm">{moment(message?.sent_date).format(GENERAL_TIME_FORMAT_WITHOUT_SECONDS)}</Text>
                            </VStack>
                            <Text textAlign={'left'} ml="3" fontSize="xs">{message?.sender?.full_name}</Text>
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
  const textRef = React.useRef<HTMLInputElement>(null);
  const {SaveMessage} = UseChatService();
  const [message, setMessage] = React.useState('');
  const {processing} = UseLoadingService();
  
  const handleKeyPress = (event: any) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      send();
      event.preventDefault(); // Prevent default behavior of Enter key
    } else {
        setMessage(textRef.current?.value || '');

    }
  };
  const debounced = useDebouncedCallback((value:any) => {
    setMessage(value);
  }, 500);
  const {event} = UseEventService();

  function send(){
    if(message!=='' && message.trim() !== '' && !processing.includes('save-message') ){
      SaveMessage({message:message,thread_id:thread_id});
      setMessage('');
      if(textRef.current){
        textRef.current.value = '';
      }
    }
  }


  return (
    <>
    <Center w="100%" maxW="100%">
      <HStack px="4" py="1" mb="0" bg="primary.darkbox" w="100%" space="3" alignItems="center">
        <Icowritecomment width="14px" height="16px" />
        <Text fontSize="16px">{event?.labels?.CHAT_WRITE_MESSAGE_TITLE}</Text>
      </HStack>
      <VStack p="0" w="100%" space="0">
        <Box py={3} px={4} pb={2}>
          <TextArea bg={'primary.darkbox'} onKeyPress={handleKeyPress} ref={textRef} borderWidth="0" borderColor="transparent" fontSize="md" _focus={{ bg: 'transparent', borderColor: 'transparent' }} _hover={{ borderWidth: 0, borderColor: 'transparent' }} rounded="0" h={100} w="100%" p="3" placeholder={event?.labels?.CHAT_WRITE_YOUR_MESSAGE} autoCompleteType={undefined} 
          defaultValue={message}
          />
        </Box>
        <HStack pr={4} mb="1" w="100%" space="1" alignItems="flex-end" justifyContent="flex-end">
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
            <Spinner w={"40px"} h={"40px"} p={0} color="primary.text" />
          ) : (
            <IconButton
            variant="transparent"
            isDisabled={message.trim() === ''}
            icon={<IcoSend width={20} height={20} color="primary.text" />}
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
