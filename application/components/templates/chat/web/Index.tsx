import * as React from 'react';
import PropTypes from 'prop-types';
import { Avatar, Box, Button, Container, Heading, HStack, Icon, Image, Input, Spacer, Text, VStack } from 'native-base';
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

  return (
    <>
      <NextBreadcrumbs module={module} />

      <Container pt="2" maxW="100%" w="100%">
        <HStack mb="3" pt="2" w="100%" space="3" alignItems="center">
          <Text fontSize="2xl">{module?.name ?? "Chat"}</Text>
          <Spacer />
          <Input  rounded="10" w="60%" bg="primary.box" borderWidth={0} placeholder={event?.labels?.GENERAL_CHAT_SEARCH_MESSAGES} onChangeText={(text)=>debounced(text)} leftElement={<Icon ml="2" color="primary.text" size="lg" as={AntDesign} name="search1"  />}  />
        </HStack>
        <>
          {
            <>
            <Box mb="3" w="100%" overflow="hidden" bg="primary.box" p="0" rounded="10">
              {processing.includes('chats') ? <SectionLoading />:(
                <>
                {chats.map((chat, index) => (
                  <Pressable onPress={() => push(`/${event.url}/chat/detail/${chat.id}`)} key={index}>
                    <HStack borderBottomWidth={index < chats.length - 1 ? '1' : '0'} borderColor="primary.bordercolor" w="100%" p="4" space="5">
                      <AvatarComponent participants={chat.participants_info} />
                      <VStack space="0">
                        <Heading fontSize="lg">
                          {chat?.participants_info?.map((participant: ParticipantInfo, index: number) => (
                            <>{participant?.full_name}{index < chat.participants_info.length - 1 ? ', ' : ''}</>
                          ))}
                        </Heading>
                        <Text isTruncated fontSize="md" opacity="0.6" >{chat?.latest_message?.body}</Text>
                      </VStack>
                      <Spacer />
                      <VStack alignItems="flex-end" space="2">
                        <Text opacity="0.6" fontSize="md">{moment(chat?.latest_message?.sent_date).fromNow()}</Text>
                        {!isRead(chat?.latest_message) && <Avatar.Badge position="static" borderWidth="0" bg="green.500" size={4} />}
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
                New chat
              </Button>
            </Box>
          </>}
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
    const getSenderImage = (image: string) => {
      // source={{ uri: `${_env.eventcenter_base_url}/assets/attendees/${ shouldShow(attendeeToShow?.field_settings?.profile_picture) ? attendeeToShow?.image:''}` }}
      if(image){
        return `${_env.eventcenter_base_url}/assets/attendees/${image}`;
      }
      return '';
    };

  return (
    <>
    {participants?.length > 1 ? (
      <Avatar>
        <Icon size={'xl'} color={'primary.text'} as={MaterialIcons} name="groups"  />
      </Avatar>
    ):(
      <Avatar
          source={{
            uri: getSenderImage(participants[0]?.image)
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