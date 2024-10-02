import * as React from 'react';
import {Box, Center, Container, HStack, Icon, IconButton, Spinner, Text, TextArea, VStack } from 'native-base';
import Entypo from '@expo/vector-icons/Entypo';
import Feather from '@expo/vector-icons/Feather';
import UseChatService from 'application/store/services/UseChatService';
import { useDebouncedCallback } from "use-debounce";
import UseLoadingService from 'application/store/services/UseLoadingService';
import IcoSend from 'application/assets/icons/small/IcoSend';
import { UseEventService } from 'application/store/services';
import Icowritecomment from 'application/assets/icons/small/Icowritecomment';

type NewChatBoxProps = {
  user_ids?: number[],
  group_ids?: number[],
}

const NewChat = ({ user_ids,group_ids }: NewChatBoxProps) => {
  const {StartNewChat} = UseChatService();
  const {processing} = UseLoadingService();
  const textRef = React.useRef<HTMLInputElement>(null);

  const [message, setMessage] = React.useState<string>('');
  const {new_chat_error,SetNewChatError} = UseChatService();
  const {event} = UseEventService();

  const debounced = useDebouncedCallback((value:any) => {
    setMessage(value);
  }, 500);

  function startChat() {
    const selected_ids = (user_ids && user_ids.length > 0) || (group_ids && group_ids.length > 0);
    if(selected_ids &&  message.trim() !== '' && !processing.includes('new-chat')) {
      StartNewChat({message: message,group_ids: group_ids ?? [],user_ids: user_ids ?? []})
      setMessage('')
    }
  }

  const handleKeyPress = (event: any) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      startChat();
      event.preventDefault(); // Prevent default behavior of Enter key
    } else {
      // the below code is to fix the issue of the text area imput issue
      setTimeout(() => {
        setMessage(textRef.current?.value || '');
      }, 10);

    }
  };

  React.useEffect(() => {
    SetNewChatError({error:null});
  },[])

  return (
      <>
      <Container pt="2" maxW="100%" w="100%">
        {/* New Message */}
        <VStack mb="3" overflow="hidden" bg="primary.box" rounded="10" w="100%" space="0">
            <Center w="100%" maxW="100%">
              <HStack px="4" py="1" mb="0" bg="primary.darkbox" w="100%" space="3" alignItems="center">
                <Icowritecomment width="14px" height="16px" />
                <Text fontSize="16px">{event?.labels?.CHAT_WRITE_MESSAGE_TITLE}</Text>
              </HStack>
              <VStack p="0" w="100%" space="0">
                <Box py={3} px={4} pb={2}>
                  <TextArea ref={textRef}  bg={'primary.darkbox'} borderWidth="0" borderColor="transparent" fontSize="md" _focus={{ bg: 'transparent', borderColor: 'transparent' }} _hover={{ borderWidth: 0, borderColor: 'transparent' }} rounded="0" w="100%" p="3" h={100} placeholder={event?.labels?.CHAT_WRITE_YOUR_MESSAGE} autoCompleteType={undefined}
                defaultValue={message}
                onKeyPress={handleKeyPress}
                />
                </Box>
                
                <HStack pr={4} mb="1" w="100%" space="1" alignItems="flex-end" justifyContent="flex-end">
                  {processing.includes('new-chat') ? (
                    <Spinner w={"40px"} h={"40px"} p={0} color="primary.text" />
                  ) : (
                    <IconButton
                    variant="transparent"
                    isDisabled={message.trim() == '' || (!user_ids || user_ids.length === 0) && (!group_ids || group_ids.length === 0)}
                    icon={<IcoSend width={20} height={20} color="primary.text" />}
                    onPress={() => {
                      startChat()
                    }}
                  />
                  )}
                </HStack>
              </VStack>
            </Center>
        </VStack>
        {new_chat_error && <Box  mb="3" py="3" px="4" backgroundColor="red.100" w="100%">
              <Text color="red.900"> {new_chat_error} </Text>
        </Box>}
      </Container>
      </>
  );
};

export default NewChat;
