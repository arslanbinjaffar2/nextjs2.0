import * as React from 'react';
import PropTypes from 'prop-types';
import { Avatar, Box, Button, Container, Heading, HStack, Icon, Image, Input, Spacer, Spinner, Text, VStack } from 'native-base';
import Master from 'application/screens/web/layouts/Master';
import AntDesign from '@expo/vector-icons/AntDesign';
import UseEventService from 'application/store/services/UseEventService';
import NextBreadcrumbs from 'application/components/atoms/NextBreadcrumbs';
import UseChatService from 'application/store/services/UseChatService';
import { Chat, ChatMessage, ParticipantInfo, ReadState } from 'application/models/chat/Chat';
import { Pressable } from 'react-native';
import { useRouter } from 'next/router';
import moment from 'moment';
import UseLoadingService from 'application/store/services/UseLoadingService';
import in_array from 'in_array';
import SectionLoading from 'application/components/atoms/SectionLoading';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useDebouncedCallback } from "use-debounce";
import { func } from 'application/styles';
import UseEnvService from 'application/store/services/UseEnvService';
import NoRecordFound from 'application/components/atoms/NoRecordFound';
import UseAuthService from 'application/store/services/UseAuthService';
import { GENERAL_DATE_FORMAT, GENERAL_DATETIME_FORMAT_WITHOUT_SECONDS } from 'application/utils/Globals';
import BannerAds from 'application/components/atoms/banners/BannerAds';
type indexProps = {
  navigation: unknown
}

const Index = ({ navigation }: indexProps)  => {
  const { modules } = UseEventService();
  const module = modules.find((module) => module.alias === 'chat');
  const { FetchChats,chats } = UseChatService();
  const { event } = UseEventService();
  const { push } = useRouter();
  const { processing } = UseLoadingService();
  const [search, setSearch] = React.useState('');
  const { response } = UseAuthService();

  const debounced = useDebouncedCallback((value:any) => {
    setSearch(value);
  }, 500);

  React.useEffect(() => {
    FetchChats({search:search})
  }, [])

  React.useEffect(() => {
    FetchChats({search:search})
  }, [search])

  function isRead(message: ChatMessage){
    if(message?.sender_id == response?.data?.user?.id){
        return true
    }
    return message?.read_state?.some((read_state: ReadState) => read_state?.user_id === response?.data?.user?.id)
  }

  function getValue(participant: ParticipantInfo,field: string){
    const ignoredFields=['id','first_name']
    if(ignoredFields.includes(field)){
      return participant?.[field as keyof ParticipantInfo]
    }
    
    const field_setting = participant?.sort_field_setting?.[field]; 
   
    if(Number(field_setting?.status) === 1 && Number(field_setting?.is_private) === 0){ 
          return participant?.[field as keyof ParticipantInfo]
    }else{
      return '';
    }
    
  }

  return (
    <>
      <NextBreadcrumbs module={module} />

      <Container pt="2" maxW="100%" w="100%">
        <HStack mb="3" pt="2" w="100%" space="3" alignItems="center">
          <Text fontSize="2xl">{module?.name ?? "Chat"}</Text>
          <Spacer />
          <Input  rounded="10" w="60%" bg="primary.box" borderWidth={0} placeholder={event?.labels?.CHAT_SEARCH_MESSAGES} onChangeText={(text)=>debounced(text)} leftElement={processing.includes('chat-search') ?
          <Spinner p={0} maxHeight={26} maxWidth={26} ml={2} mr={1} color="primary.text" /> : <Icon ml="2" color="primary.text" size="lg" as={AntDesign} name="search1"  />}  />
        </HStack>
        <>
          {
            <>
            <Box mb="3" w="100%" overflow="hidden" bg="primary.box" p="0" rounded="10">
              {processing.includes('chats') ? <SectionLoading />:(
                <>
                {chats.map((chat, index) => (
                  <Pressable onPress={() => push(`/${event.url}/chat/detail/${chat.id}`)} key={index}>
                    <HStack borderBottomWidth={index < chats.length - 1 ? '1' : '0'} borderColor="primary.bordercolor" w="100%" p="4" space="0">
                      <AvatarComponent participants={chat.participants_info} />
                      <VStack px={5} pr={2} maxW={'calc(100% - 160px)'} space="0">
                        <Heading fontSize="lg">
                          {chat?.participants_info?.map((participant: ParticipantInfo, index: number) => (
                            <>{getValue(participant,'first_name')} {getValue(participant,'last_name')} {index < chat.participants_info.length - 1 ? ', ' : ''}</>
                          ))}
                        </Heading>
                        <Text isTruncated fontSize="md" opacity={chat?.messages_count > 0 ? '1' : '0.6'} >{chat?.latest_message?.body}</Text>
                      </VStack>
                      <Spacer />
                      <VStack alignItems="flex-end" space="2">
                        <Text opacity={chat?.messages_count > 0 ? '1' : '0.6'} fontSize="md">{moment().isSame(moment(chat?.latest_message?.sent_date),'day') ? moment(chat?.latest_message?.sent_date).fromNow() : moment(chat?.latest_message?.sent_date).format(GENERAL_DATE_FORMAT)}</Text>
                        {chat?.messages_count > 0 && <Box rounded={'full'}  minW="18px" minHeight={'18px'} position="static" borderWidth="0" bg="secondary.500" justifyContent="center" alignItems="center" ><Text color={'primary.bordersecondary'} px={'2px'} fontSize="xs">{chat?.messages_count}</Text>
                        </Box>}
                    </VStack>
                  </HStack>
                  </Pressable>
                ))}
                {chats.length === 0 && <NoRecordFound />}
                </>
              )}
            </Box> 
            <Box alignItems="center" w="100%">
              <Button
                maxW="350px"
                w="100%"
                _text={{ fontSize: 'xl', fontWeight: '600', color: 'primary.hovercolor' }}
                colorScheme="primary"
                onPress={() => {
                  push(`/${event.url}/chat/new`);
                }}
              >
                {event?.labels?.CHAT_NEW}
              </Button>
            </Box>
          </>}
          <BannerAds module_name={'chat'} module_type={'listing'} />
        </>
        <>
        </>
      </Container>
    </>
  );
};

// component for avatars
const AvatarComponent = ({ participants }: { participants: ParticipantInfo[] }) => {

  const { _env } = UseEnvService();
  // Function to get the first letters of the first and last name
  const getFirstLetters = (name: string) => {
    if(!name) return '';
    const names = name?.split(' ');
    return (names[0]?.substring(0, 1) + names[1]?.substring(0, 1)).toUpperCase();
  };

    // get image of sender 
    const getSenderImage = (participant: ParticipantInfo) => {
      const field_setting = participant?.sort_field_setting?.profile_picture; 
     
      if(Number(field_setting?.status) === 1 && Number(field_setting?.is_private) === 0){ 
            return `${_env.eventcenter_base_url}/assets/attendees/${participant?.image}`
      }else{
        return '';
      }
    };

  return (
    <>
    {participants?.length > 1 ? (
      <Avatar>
        <Icon size={'xl'} color={'primary.text'} as={MaterialIcons} name="groups"  />
      </Avatar>
    ):(
      <Avatar
          key={participants[0]?.image}
          source={{
            uri: getSenderImage(participants[0])
          }}
          >
          {getFirstLetters(participants[0]?.full_name)}
          <Avatar.Badge borderWidth="1" bg="green.500" />
        </Avatar>
    )}
    </>
  )
};

Index.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default Index;
