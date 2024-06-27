import * as React from 'react';
import {Center, Container, HStack, Icon, IconButton, Spinner, Text, TextArea, VStack } from 'native-base';
import Entypo from '@expo/vector-icons/Entypo';
import Feather from '@expo/vector-icons/Feather';
import UseChatService from 'application/store/services/UseChatService';
import { useDebouncedCallback } from "use-debounce";
import UseLoadingService from 'application/store/services/UseLoadingService';

type NewChatBoxProps = {
  user_ids?: number[],
  group_ids?: number[],
}

const NewChat = ({ user_ids,group_ids }: NewChatBoxProps) => {
  const {StartNewChat} = UseChatService();
  const {processing} = UseLoadingService();

  const [message, setMessage] = React.useState<string>('');

  const debounced = useDebouncedCallback((value:any) => {
    setMessage(value);
  }, 500);

  function startChat() {
    if((user_ids && user_ids.length > 0) || (group_ids && group_ids.length > 0)) {
      console.log(group_ids,user_ids)
      StartNewChat({message: message,group_ids: group_ids ?? [],user_ids: user_ids ?? []})
      setMessage('')
    }
  }

  return (
      <>
      <Container pt="2" maxW="100%" w="100%">
        {/* New Message */}
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
                  {processing.includes('new-chat') ? (
                    <Spinner size="lg" color="primary.text" />
                  ) : (
                    <IconButton
                    variant="transparent"
                    isDisabled={message == '' || (!user_ids || user_ids.length === 0) && (!group_ids || group_ids.length === 0)}
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
