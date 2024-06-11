import * as React from 'react';
import PropTypes from 'prop-types';
import { Avatar, Box, Button, Center, Checkbox, Container, Heading, HStack, Icon, IconButton, Image, Input, ScrollView, Spacer, Spinner, Text, TextArea, VStack } from 'native-base';
import { UseEventService } from 'application/store/services';
import NextBreadcrumbs from 'application/components/atoms/NextBreadcrumbs';
import Entypo from '@expo/vector-icons/Entypo';
import Feather from '@expo/vector-icons/Feather';
import UseChatService from 'application/store/services/UseChatService';
import { useDebouncedCallback } from "use-debounce";
import UseLoadingService from 'application/store/services/UseLoadingService';
import AntDesign from '@expo/vector-icons/AntDesign';

const NewChat = () => {
  const {event,modules} = UseEventService();
  const module = modules.find((module) => module.alias === 'chat');
  const {StartNewChat} = UseChatService();
  const [group_ids, setGroupIds] = React.useState<number[]>([]);
  const [user_ids, setUserIds] = React.useState<number[]>([47997]);
  const {processing} = UseLoadingService();

  const [message, setMessage] = React.useState<string>('');
  const debounced = useDebouncedCallback((value:any) => {
    setMessage(value);
  }, 500);

  function startChat() {
    if(group_ids.length > 0 || user_ids.length > 0) {
      StartNewChat({message: message,group_ids,user_ids})
      debounced('')
    }
  }


  return (
      <>
      <NextBreadcrumbs module={module} title="New Chat" />
      <Container pt="2" maxW="100%" w="100%">
        <HStack flexWrap={'wrap'} mb="3" pt="2" w="100%" space="0" alignItems="center">
          <Text mb={3}  textAlign={'center'} width={'100%'} fontSize="2xl">{module?.name ?? "New Chat"}</Text>
          <Input  rounded="10" w="100%" bg="primary.box" borderWidth={0} placeholder={event?.labels?.GENERAL_SEARCH} onChangeText={(text)=>debounced(text)} leftElement={<Icon ml="2" color="primary.text" size="lg" as={AntDesign} name="search1"  />}  />
        </HStack>
        <HStack pb={3} borderBottomWidth={4} borderBottomColor={'primary.darkbox'} w={'100%'} mb={3} flexWrap={'wrap'} space="1" alignItems="center">
          <HStack bg={'primary.box'} p={1} rounded={'20px'}  space="1" alignItems="center">
            <Avatar
              size={'xs'}
              source={{
                uri:"https://pbs.twimg.com/profile_images/1369921787568422915/hoyvrUpc_400x400.jpg"
              }}
              
            >
              SS
            </Avatar>
            <Text fontSize="14px">Jhon Smith</Text>
              <IconButton
                variant="unstyled"
                p={0}
                mx={1}
                size={'xs'}
                icon={<Icon size="xs" as={AntDesign} name="close" color="primary.text" />}
                onPress={()=>{
                console.log('hello')
                }}
                
              />
              
              
            
            
          </HStack>
          <HStack bg={'primary.box'} p={1} rounded={'20px'}  space="1" alignItems="center">
            <Avatar
              size={'xs'}
              source={{
                uri:"https://pbs.twimg.com/profile_images/1369921787568422915/hoyvrUpc_400x400.jpg"
              }}
              
            >
              SS
            </Avatar>
            <Text fontSize="14px">Jhon Smith</Text>
              <IconButton
                variant="unstyled"
                p={0}
                mx={1}
                size={'xs'}
                icon={<Icon size="xs" as={AntDesign} name="close" color="primary.text" />}
                onPress={()=>{
                console.log('hello')
                }}
                
              />
              
              
            
            
          </HStack>
          
        </HStack>
        
        <Button.Group mb={3}>
         <Button
          px="6"
          py="1"
          rounded="20px"
          bg={"primary.box"}
          borderWidth="0"
          _text={{ fontSize: 'lg', color: "primary.hovercolor" }}
          _hover={{_text: {color: 'primary.hovercolor'}}}
          borderColor="primary.bdBox"
          colorScheme="primary"
          onPress={() => {
              
          }}
          >
            Attendee
          </Button>
         <Button
          px="6"
          py="1"
          rounded="20px"
          bg={"primary.box"}
          borderWidth="0"
          _text={{ fontSize: 'lg', color: "primary.hovercolor" }}
          _hover={{_text: {color: 'primary.hovercolor'}}}
          borderColor="primary.bdBox"
          colorScheme="primary"
          onPress={() => {
              
          }}
          >
            Attendee
          </Button>
        </Button.Group>
        
         <VStack mb="3" overflow="hidden" bg="primary.box" rounded="10" w="100%" space="0">
          {[...Array(5)].map((item,k) =>
             <HStack key={k} alignItems={'center'} borderTopWidth={k === 0 ? 0 : 1} borderColor="primary.bordercolor" w="100%" p="4" space="4">
              <Checkbox  value="checkbox" />
                <Avatar
                  source={{
                    uri: 'https://pbs.twimg.com/profile_images/1369921787568422915/hoyvrUpc_400x400.jpg'
                  }}
                >
                  SS
                </Avatar>
                <VStack space="0">
                  <Heading fontWeight={500} fontSize="lg">Nicholas Dunn</Heading>
                </VStack>
              </HStack>)}
        </VStack>
        <VStack mb="3" overflow="hidden" bg="primary.box" rounded="10" w="100%" space="0">
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
                  {processing.includes('new-chat') ? (
                    <Spinner size="lg" color="primary.text" />
                  ) : (
                    <IconButton
                    variant="transparent"
                    // isDisabled={message == '' || (group_ids.length === 0 && user_ids.length === 0)}
                    isDisabled={message == ''}
                    icon={<Icon size="lg" as={Feather} name="send" color="primary.text" />}
                    onPress={() => {
                      startChat()
                    }}
                  />
                  )}
                </HStack>
              </VStack>
            </Center>
        </VStack>
      </Container>
      </>
  );
};

export default NewChat;
