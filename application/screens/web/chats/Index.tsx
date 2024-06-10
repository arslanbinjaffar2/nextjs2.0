import * as React from 'react';
import PropTypes from 'prop-types';
import { Avatar, Box, Button, Container, Heading, HStack, Icon, Image, Input, Spacer, Text, VStack } from 'native-base';
import Master from 'application/screens/web/layouts/Master';
import AntDesign from '@expo/vector-icons/AntDesign';
import UseEventService from 'application/store/services/UseEventService';
import NextBreadcrumbs from 'application/components/atoms/NextBreadcrumbs';
import UseChatService from 'application/store/services/UseChatService';
import { Chat, ParticipantInfo } from 'application/models/exhibitor/Chat';
import { Pressable } from 'react-native';
import { useRouter } from 'next/router';
import moment from 'moment';
import UseLoadingService from 'application/store/services/UseLoadingService';
import in_array from 'in_array';
import SectionLoading from 'application/components/atoms/SectionLoading';


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

  React.useEffect(() => {
    FetchChats({})
  }, [])

  return (
    <>
      <NextBreadcrumbs module={module} />

      <Container pt="2" maxW="100%" w="100%">
        <HStack mb="3" pt="2" w="100%" space="3" alignItems="center">
          <Text fontSize="2xl">{module?.name ?? "Chat"}</Text>
          <Spacer />
          <Input  rounded="10" w="60%" bg="primary.box" borderWidth={0} placeholder="Search" leftElement={<Icon ml="2" color="primary.text" size="lg" as={AntDesign} name="search1"  />}  />
        </HStack>
        <>
          {
            <>
            <Box mb="3" w="100%" overflow="hidden" bg="primary.box" p="0" rounded="10">
              {processing.includes('chats') ? <SectionLoading />:(
                <>
                {chats.map((chat, index) => (
                  <Pressable onPress={() => push(`/${event.url}/chat/${chat.id}`)} key={index}>
                    <HStack borderBottomWidth={index < chats.length - 1 ? '1' : '0'} borderColor="primary.bordercolor" w="100%" p="4" space="5">
                      <AvatarComponent participants={chat.participants_info} />
                      <VStack space="0">
                        <Heading fontSize="lg">
                          {chat?.participants_info?.map((participant: ParticipantInfo, index: number) => (
                            <>{participant?.full_name}{index < chat.participants_info.length - 1 ? ', ' : ''}</>
                          ))}
                        </Heading>
                        <Text isTruncated fontSize="md" opacity="0.6">{chat?.latest_message?.body}</Text>
                      </VStack>
                      <Spacer />
                      <VStack alignItems="flex-end" space="2">
                        <Text opacity="0.6" fontSize="md">{moment(chat?.latest_message?.sent_date).fromNow()}</Text>
                        <Avatar.Badge position="static" borderWidth="0" bg="green.500" size={4} />
                    </VStack>
                  </HStack>
                  </Pressable>
                ))}
                </>
              )}
              
              {/* <HStack borderBottomWidth="1" borderColor="primary.bordercolor" w="100%" p="4" space="5">
                <Avatar
                  source={{
                    uri: 'https://pbs.twimg.com/profile_images/1369921787568422915/hoyvrUpc_400x400.jpg'
                  }}
                >
                  SS
                  <Avatar.Badge borderWidth="1" bg="green.500" />
                </Avatar>
                <VStack space="0">
                  <Heading fontSize="lg">Janet Fowler</Heading>
                  <Text isTruncated fontSize="md" opacity="0.6">I’m going to San Francisco</Text>
                </VStack>
                <Spacer />
                <VStack alignItems="flex-end" space="2">
                  <Text opacity="0.6" fontSize="md">now</Text>
                  <Avatar.Badge position="static" borderWidth="0" bg="green.500" size={4} />
                </VStack>
              </HStack> */}
              {/* <HStack borderBottomWidth="1" borderColor="primary.bordercolor" w="100%" p="4" space="5">
                <Avatar
                  source={{
                    uri: 'https://pbs.twimg.com/profile_images/1369921787568422915/hoyvrUpc_400x400.jpg'
                  }}
                >
                  HS
                  <Avatar.Badge borderWidth="1" bg="red.500" />
                </Avatar>
                <VStack space="0">
                  <Heading fontSize="lg">Jason Boyd</Heading>
                  <Text isTruncated fontSize="md" opacity="0.6">Sound goods.</Text>
                </VStack>
                <Spacer />
                <VStack alignItems="flex-end" space="2">
                  <Text opacity="0.6" fontSize="md">16:00</Text>
                </VStack>

              </HStack> */}
              {/* <HStack borderBottomWidth="1" borderColor="primary.bordercolor" w="100%" p="4" space="5">
                <Avatar
                  source={{
                    uri: 'https://pbs.twimg.com/profile_images/1369921787568422915/hoyvrUpc_400x400.jpg'
                  }}
                >
                  SS
                </Avatar>
                <VStack space="0">
                  <Heading fontSize="lg">Nicholas Dunn</Heading>
                  <Text isTruncated fontSize="md" opacity="0.6">See you there!</Text>
                </VStack>
                <Spacer />
                <VStack alignItems="flex-end" space="2">
                  <Text opacity="0.6" fontSize="md">18:00</Text>
                </VStack>
              </HStack> */}
              {/* <HStack borderBottomWidth="0" borderColor="primary.bordercolor" w="100%" p="4" space="5">
                <Avatar
                  source={{
                    uri: 'https://pbs.twimg.com/profile_images/1369921787568422915/hoyvrUpc_400x400.jpg'
                  }}
                >
                  SS
                </Avatar>
                <VStack space="0">
                  <Heading fontSize="lg">Janet Fowler</Heading>
                  <Text isTruncated fontSize="md" opacity="0.6">I’m going to San Francisco</Text>
                </VStack>
                <Spacer />
                <VStack alignItems="flex-end" space="2">
                  <Text opacity="0.6" fontSize="md">21:00</Text>
                  <Avatar.Badge position="static" borderWidth="0" bg="primary.secondary" size={4} />
                </VStack>
              </HStack> */}
            </Box> 
            <Box alignItems="center" w="100%">
              <Button
                maxW="350px"
                w="100%"
                _text={{ fontSize: 'xl', fontWeight: '600', color: 'primary.hovercolor' }}
                colorScheme="primary"
                onPress={() => {
                  
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
  return <Avatar
          source={{
            uri: 'https://pbs.twimg.com/profile_images/1369921787568422915/hoyvrUpc_400x400.jpg'
          }}
          >
          SS
          <Avatar.Badge borderWidth="1" bg="green.500" />
        </Avatar>
};

Index.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default Index;
