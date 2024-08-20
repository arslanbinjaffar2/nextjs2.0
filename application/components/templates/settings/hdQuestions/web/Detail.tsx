import * as React from 'react';
import { Avatar, Center, Container, HStack, Icon, IconButton, ScrollView, Spacer, Text, TextArea, VStack, Box, Pressable } from 'native-base';
import AntDesign from '@expo/vector-icons/AntDesign';
import Entypo from '@expo/vector-icons/Entypo';
import UseHdService from 'application/store/services/UseHdService';
import { createParam } from 'solito';
import moment from 'moment';
import { useRouter } from 'solito/router';
import UseLoadingService from 'application/store/services/UseLoadingService';
import { UseEventService } from 'application/store/services'
import { GENERAL_TIME_FORMAT_WITHOUT_SECONDS } from 'application/utils/Globals'
import UseSocketService from 'application/store/services/UseSocketService';
import UseAuthService from 'application/store/services/UseAuthService'
import { useWindowDimensions } from 'react-native';
import IcoInfo from 'application/assets/icons/small/IcoInfo';
import Icoquestion from 'application/assets/icons/small/Icoquestion';
import UseEnvService from 'application/store/services/UseEnvService';
import IcoSend from 'application/assets/icons/small/IcoSend'
import NoRecordFound from 'application/components/atoms/NoRecordFound';
import SectionLoading from 'application/components/atoms/SectionLoading';
import { getColorScheme } from 'application/styles/colors';
import in_array from 'in_array';

type ScreenParams = { id: string }
const Detail = () => {

  const { width } = useWindowDimensions();
  const RenderHtml = require('react-native-render-html').default;
  
  const { useParam } = createParam<ScreenParams>()
  const { event, setting_modules } = UseEventService();
  const { socket } = UseSocketService();
  const { _env } = UseEnvService()
  
  const { processing } = UseLoadingService();
  const [id] = useParam('id');
  const { push } = useRouter()
  
  const { response } = UseAuthService()
  
  const { my_questions_answers, FetchHDMyQuestionsAnswers, SendMessage } = UseHdService();
  
  const [answers, setAnswers] = React.useState<any[]>([]);
  const [message, setMessage] = React.useState<string>('');
  const { height } = useWindowDimensions();
    const colors = getColorScheme(event?.settings?.app_background_color ?? '#343d50', event?.settings?.app_text_mode);
        const mixedStyle = {
          body: {
              fontFamily: 'Avenir',
              fontSize: '16px',
              userSelect: 'auto',
              color: colors.text
          },
          p: {
              fontFamily: 'Avenir',
          }
      }
  React.useEffect(() => {
    if (id) {
      console.log("🚀 ~ React.useEffect ~ id:", id)
      FetchHDMyQuestionsAnswers({ id: Number(id) });
    }
  }, []);

  // React.useEffect(() => {
  //   if (my_questions_answers?.answers) {
  //     setAnswers(my_questions_answers.answers);
  //   }

  //   return () => {
  //     setAnswers([])
  //   }
  // }, [my_questions_answers]);

  React.useEffect(() => {
    if (socket !== null) {
      socket?.on(`event-buizz:qa_question_answer_action${event.id}_${response.data?.user?.id}_${id}`, function (data: any): any {
        console.log(data, 'data AX');
        if(data?.answers){
          setAnswers(data?.answers);
        }
      });
    }
    return () => {
      if (socket !== null) {
        socket?.off(`event-buizz:qa_question_answer_action${event.id}_${id}`);
      }
    }
  }, [socket]);

  const handleMessageSend = () => {
    if (message.trim() !== '') {
      SendMessage({ question_id: Number(id), message });
      setMessage('');
    }
  };
  const module = setting_modules?.find((module) => module.alias === 'myquestions');
  // if (my_questions_answers && Number(my_questions_answers?.question_id) !== Number(id)) {
  //   return <SectionLoading />;
  // }

  return (
    <>
      {in_array(processing, 'hd-my-questions-answers') ? (
        <SectionLoading />
      ) : (
        <Container pt="2" maxW="100%" w="100%">
          <HStack mb="3" pt="2" w="100%" space="3" alignItems="center">
            <Pressable
              onPress={() => {
                push(`/${event.url}/settings/myquestions`)
              }}
            >
              <HStack space="3" alignItems="center">
                <Icon as={AntDesign} name="arrowleft" size="xl" color="primary.text" />
                <Text fontSize="2xl">{event?.labels?.GENERAL_BACK}</Text>
              </HStack>
            </Pressable>
            <Spacer />
            <Text isTruncated pr="6" fontSize="2xl">{module?.name ?? "My Questions"}</Text>
            <Spacer />
          </HStack>
          <VStack mb="3" overflow="hidden" bg="primary.box" rounded="10" w="100%" space="0">
            <HStack alignItems={'center'} space={2} w={'100%'} borderColor={'primary.bordercolor'} borderBottomWidth={1} mb={3} py={4} px={3}>
              <Icoquestion width={22} height={22} />
              <Box fontSize="lg">
                <RenderHtml
                    defaultTextProps={{selectable:true}}
                    contentWidth={width > 600 ? 600 : width - 90}
                    systemFonts={['Avenir']}
                    tagsStyles={mixedStyle}
                    source={{ html: my_questions_answers?.question }}
                />
              </Box>
            </HStack>
            
            <ScrollView maxHeight={['','',height - 500]} w="100%" minH="450px" py="4" px="3">
              {answers?.length > 0 ? (
                answers.map((answer: any, index: number) => {
                  const isSenderMe = answer?.sender_id === response.data?.user?.id;
                  return (
                    <HStack direction={isSenderMe ? "row-reverse" : "row"} mb="3" space="0" alignItems="flex-end">
                      <Avatar
                        mb={3}
                        source={{
                          uri: `${_env.eventcenter_base_url}/assets/attendees/${answer?.display_image}`
                        }}
                      >
                        {answer?.display_name.substring(0, 2)}
                      </Avatar>
                      <VStack space={2} ml="3" mr="3">
                        <VStack  minW={['270','320']} maxW={["310","510"]} px="3" py="3" rounded="10" borderBottomLeftRadius={!isSenderMe ? 0 : 8}  borderBottomRightRadius={isSenderMe ? 0 : 8} bg={isSenderMe ? "#3F89D0" : "primary.darkbox"} space="0">
                          <Text lineHeight="sm" pr="3" fontSize="md">{answer?.answer}</Text>
                          <Text opacity="0.8" textAlign="right" fontSize="sm">{moment(answer?.created_at).format(GENERAL_TIME_FORMAT_WITHOUT_SECONDS)}</Text>
                        </VStack>
                         <Text textAlign={isSenderMe ? 'right' : 'left'} lineHeight="sm" fontSize="sm">{isSenderMe ? 'You' : answer?.display_name}</Text>
                      </VStack>

                    </HStack>
                  )
                }
                )
              ) : (
                <Box alignItems={'center'} justifyContent={'center'}  rounded="lg" w="100%">
                  <HStack bg={'primary.darkbox'} px={4} py={3} rounded={10}  space="3" alignItems="center">
                    <IcoInfo width={18} height={18}  />
                    <NoRecordFound
                    />
                  </HStack>
                  
                </Box>
              )}
            </ScrollView>
            <Center w="100%" maxW="100%">
              <HStack px="4" py="1" mb="0" bg="primary.darkbox" w="100%" space="2" alignItems="center">
                <Icon size="md" as={Entypo} name="new-message" color="primary.text" />
                <Text fontSize="lg">{event?.labels?.GENERAL_CHAT_ENTER_MESSAGE}</Text>
              </HStack>
              <VStack p="1" w="100%" space="0">
                <TextArea borderWidth="0" value={message} borderColor="transparent" fontSize="lg" _focus={{ bg: 'transparent', borderColor: 'transparent' }} _hover={{ borderWidth: 0, borderColor: 'transparent' }} rounded="10" w="100%" p="4" placeholder={my_questions_answers?.labels?.QA_TYPE_ANSWER ?? "Type your answer"} autoCompleteType={undefined} onChangeText={(text) => setMessage(text)} />
                <HStack mb="1" w="100%" space="1" alignItems="flex-end" justifyContent="flex-end">
                  <IconButton
                    variant="transparent"
                    icon={<IcoSend width={25} height={25} />}
                    onPress={() => {
                      handleMessageSend()
                    }}
                  />
                </HStack>
              </VStack>
            </Center>
          </VStack>
        </Container>
      )}
    </>
  );
};

export default Detail;
