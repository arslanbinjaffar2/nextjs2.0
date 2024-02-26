import React from 'react'
import { Box, Container, HStack, Icon, Spacer, Text, VStack, Image, Divider, Avatar, TextArea, Button, IconButton, ZStack, Select, Checkbox, Center, Input } from 'native-base';
import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
import IcoHistory from 'application/assets/icons/IcoHistory';
import UseLoadingService from 'application/store/services/UseLoadingService';
import UseEventService from 'application/store/services/UseEventService';
import UseQaService from 'application/store/services/UseQaService';
import { useRouter } from 'solito/router';
import { createParam } from 'solito';
import MobileLoading from 'application/components/atoms/MobileLoading';
import in_array from "in_array";
import UseEnvService from 'application/store/services/UseEnvService';
import moment from 'moment';
import UseAuthService from 'application/store/services/UseAuthService';
import RenderHtml from 'react-native-render-html';
import { useWindowDimensions } from 'react-native';
import {useFocusEffect } from '@react-navigation/native'

type ScreenParams = { id: string }

const { useParam } = createParam<ScreenParams>()

const Detail = () => {
    const { width } = useWindowDimensions();

    const mounted = React.useRef(false);

    const { processing, loading } = UseLoadingService();
    const { _env } = UseEnvService();

    const { event } = UseEventService();

    const [tab, setTab] = React.useState<'popular'| 'recent' | 'archive' | 'my_question'>('popular')

    const [query, setQuery] = React.useState('');

    const { response  } = UseAuthService();

    
    const { qaDetials, qaSettings, FetchProgramDetail, FetchTabDetails,  SubmitQa} = UseQaService();
    
    const { push } = useRouter()


    const [id] = useParam('id');


    useFocusEffect(React.useCallback(() => {
        if (id) {
            FetchProgramDetail({ id: Number(id) });
            FetchTabDetails({ id: Number(id) });
        }
      }, [id])
      );

    const [speaker, setSpeaker] = React.useState<any>(null);
    const [paragraph, setParagraph] = React.useState<any>(null);
    const [lineNumber, setLineNumber] = React.useState<any>('');
    const [question, setQuestion] = React.useState<any>('');
    const [anonymously, setAnonymously] = React.useState<any>(false);
    const [error, setError] = React.useState<any>(null);
    
    const onSubmit = ( ) => {
        setError(null);
    
        if(question == ''){
            setError('Please enter a question first');
            return;
        }
        if(qaSettings?.enable_paragraph_number == 1 && (paragraph == null || paragraph == 0)){
            setError('Please select a paragraph');
            return;
        }
        
        if(qaSettings?.line_number == 1 && qaSettings?.enable_line_number == 1 && (lineNumber == '')){
            setError('Please add line number');
            return;
        }


        const sp = qaDetials?.speakers?.find((sp)=>(sp.id == speaker));
        const pg = qaDetials?.paragraph?.find((sp)=>(sp.id == paragraph));


        const postData =  {
            env: _env.enviroment,
            submitted: true,
            speaker_name: `${sp?.attendee.first_name} ${sp?.attendee.last_name}`,
            agenda_id: id,
            paragraph_id: pg?.id,
            paragraph_number: pg?.heading,
            line_number: lineNumber,
            speaker_id: sp?.attendee_id,
            enableSpeakerValidation: sp ? true : false,
            question: question,
            cmd: 'posted',
            event_id: event.id,
            attendee_id: response.data.user.id,
            anonymous_user: anonymously ? 1 : 0,
            show_projector: qaSettings?.moderator == 1 ? 0 : 1,
            question_for_label: 'Question For',
            QA_MODERATOR_PARAGRAPH: 'Paragraph',
            QA_MODERATOR_LINE_NUMBER: 'Line number',
            answered: 0,
            allLanguages: JSON.stringify(qaDetials.all_languages),
            created_at: moment().toDate(),
            updated_at: moment().toDate(),
            language_id: event.language_id,
            base_url: _env.eventcenter_base_url,
            enable_gdpr: event?.gdpr_settings?.enable_gdpr,
            enable_attendee_gdpr: response?.attendee_detail?.event_attendee?.gdpr,
            attendee_invisible: event?.gdpr_settings?.attendee_invisible,
            ip: qaDetials.clientIp,
        }
          
        SubmitQa(postData);
        
        setAnonymously(false);
        setParagraph(null);
        setLineNumber('');
        setQuestion('');
        setSpeaker(null);
  
      }
  return (
    <Container maxW="100%" h={'100%'} w="100%">
    {
        in_array('qa-detail', processing) ? (
            <MobileLoading />
        ):(
            <Container overflow="hidden" mb="4" maxW="100%" w="100%">
                <HStack mb="3" pt="2" w="100%" space="3" alignItems="center">
                <HStack  space="3" alignItems="center">
                    <Icon as={AntDesign} name="arrowleft" size="xl" color="primary.text"  />
                    <Text  fontSize="2xl">BACK</Text>
                </HStack>
                </HStack>
                <Box overflow="hidden" w="100%" bg="primary.box" p="0" rounded="10px" borderBottomWidth={1} borderColor="primary.bdBox">
                <Box w="100%"  py="3">
                    <HStack pl="30px" alignItems="center" minH="55px" space={0} justifyContent="flex-start">
                    <Box position="absolute" left="0" top="0" w="15px">
                        <ZStack>
                        {[...Array(1)].map((track, i) =>
                            <Box key={i} bg="#F5B761" borderWidth="1" borderColor="primary.darkbox" w="15px" mt={`${i * 10}px`} h={`${55 - (i * 10)}px`} borderRightRadius="10" shadow={2} />
                        )}
                        </ZStack>
                    </Box>
                    <HStack pt="0" w="100%" space="5" alignItems="center" justifyContent="space-between">
                        <VStack space="1">
                        <Text fontSize="md" lineHeight="22px">
                           {qaDetials?.program_detail?.info?.topic}
                        </Text>
                        </VStack>
                    </HStack>
                    </HStack>
                </Box>
                <Box w="100%">
                    <HStack pl="6"  w="100%" bg="primary.darkbox" mb="3" alignItems="center">
                        <Text fontSize="lg">Ask a question</Text>
                    </HStack>
                    {error && <Box  mb="3" py="3" px="4" backgroundColor="red.200" w="100%">
                            <Text color="red.400"> {error} </Text>
                    </Box>}
                    {qaDetials?.speakers?.length > 0 && <HStack pl="6"  w="100%" bg="primary.box" mb="3" alignItems="center">
                    <Text fontSize="lg">Select speaker</Text>
                    <Spacer />
                      <Select
                        placeholder="Please Select Attendee"
                        w="195px"
                        rounded="0"
                        h="30px"
                        borderWidth="1"
                        selectedValue={speaker ?? ''}
                        onValueChange={(item)=>setSpeaker(item)}
                    >
                        {qaDetials?.speakers?.map((speaker, i)=>(
                            <Select.Item label={`${speaker?.attendee?.first_name} ${speaker?.attendee?.last_name}`} value={`${speaker?.id}`} />
                        ))}
                    </Select>
                    
                    </HStack>}
                    {qaDetials?.paragraph?.length > 0 && <HStack pl="6"  w="100%" bg="primary.box" mb="3" alignItems="center">
                    <Text fontSize="lg">Select Paragraph</Text>
                    <Spacer />
                     <Select
                        placeholder="Please Select Attendee"
                        w="195px"
                        rounded="0"
                        h="30px"
                        borderWidth="1"
                        selectedValue={paragraph ?? ''}
                        onValueChange={(item)=>setParagraph(item)}
                    >
                        {qaDetials?.paragraph?.map((pg, i)=>(
                            <Select.Item label={`${pg?.heading}`} value={`${pg.id}`} />
                        ))}
                    </Select>
                    
                    </HStack>}
                    {qaSettings?.line_number == 1 && <HStack pl="6" pr={"6"}  w="100%" height={'40px'} bg="primary.box" mb="3" alignItems="center">
                        <Text fontSize="lg">Line number</Text>
                        <Spacer />
                        <Input w="30%" height={'28px'} placeholder="1" value={lineNumber} onChangeText={(value)=>setLineNumber(value)}/>
                    </HStack>}
                    <TextArea focusOutlineColor="transparent" _focus={{ bg: 'transparent' }} value={question} onChangeText={(value)=>setQuestion(value)}  px="4" py="0" fontSize="lg" w="100%" borderWidth="0" rounded="0" minH="60px" placeholder="Text Area Placeholder" autoCompleteType={undefined}  />
                    <HStack px="3" py="2" space="3" alignItems="center">
                    <Checkbox my="0" isChecked={anonymously} onChange={(isSelected)=>setAnonymously(isSelected)}  value="checkbox">Send anonymously</Checkbox>
                    <Spacer />
                    <IconButton
                        variant="transparent"
                        icon={<Icon size="lg" as={Feather} name="send" color="white" />}
                        onPress={() => { onSubmit(); }}

                    />
                    </HStack>
                </Box>
                <Box w="100%">
                    <HStack px="3" space="0" alignItems="center" bg="primary.darkbox" mb="3">
                    <HStack space="2" alignItems="center">
                        <IcoHistory  />
                        <Text fontSize="lg">History</Text>
                    </HStack>
                    <Spacer />
                    {/* <Text opacity={0.58} fontSize="md">1 Questions</Text> */}
                    </HStack>
                    <HStack mb="3" space={1} justifyContent="center" px={3} w="100%">
                        <Button onPress={() => { setTab('popular') }} bg={tab === 'popular' ? 'primary.boxbutton' : 'primary.box'} borderWidth="1px" py={0} borderColor="primary.darkbox" borderRightRadius="0" borderLeftRadius={8} h="42px"  w={'25%'} _text={{ fontWeight: '600' }}>Popular</Button>
                        <Button onPress={() => { setTab('recent')}} bg={tab === 'recent' ? 'primary.boxbutton' : 'primary.box'} borderRadius="0" borderWidth="1px" py={0} borderColor="primary.darkbox" h="42px"  w={'25%'} _text={{ fontWeight: '600' }}>Recent</Button>
                        <Button onPress={() => { setTab('archive')}} bg={tab === 'archive' ? 'primary.boxbutton' : 'primary.box'} borderRadius="0" borderWidth="1px" py={0} borderColor="primary.darkbox" h="42px"  w={'25%'} _text={{ fontWeight: '600' }}>Archive</Button>
                        <Button onPress={() => { setTab('my_question')}} bg={tab === 'my_question' ? 'primary.boxbutton' : 'primary.box'} borderWidth="1px" py={0} borderColor="primary.darkbox" borderLeftRadius="0" borderRightRadius={8} h="42px"  w={'25%'} _text={{ fontWeight: '600' }}>My Questions</Button>
                    </HStack>
                    <Box mb="10" px="5" w="100%" position="relative">
                        {loading && <MobileLoading />}
                        {!loading && <>
                            {/* <Text position="absolute" right="5" top="0" opacity={0.5} fontSize="sm">3 days ago</Text> */}
                            <VStack w="100%" space="3">
                                {tab === 'popular' &&
                                  qaDetials?.popular_questions?.map((question,i)=>(
                                    <>
                                    <HStack w="100%" space="3" alignItems="center">
                                    <Avatar
                                        size="md"
                                        source={{uri:`${_env.eventcenter_base_url}/assets/attendees/${question?.attendee?.image}`}}
                                    >
                                    {question?.attendee?.first_name.charAt(0).toUpperCase() + question?.attendee?.last_name.charAt(0).toUpperCase()}
                                    </Avatar>
                                    <Text fontWeight="600" fontSize="lg">
                                    {question?.attendee?.first_name + question?.attendee?.last_name}
                                    </Text>
                                    </HStack>
                                    <HStack space="3" alignItems="flex-start">
                                        <Text lineHeight="sm" textAlign="center" w="48px" fontSize="2xl">Q:</Text>
                                        <Center w="calc(100% - 60px)" pt="1" alignItems="flex-start">
                                            <RenderHtml
                                                contentWidth={width}
                                                source={{ html: question?.info?.question }}
                                            />
                                        </Center>
                                    </HStack>        
                                    </>
                                  ))  
                                }
                                {tab === 'recent' &&
                                  qaDetials?.recent_questions?.map((question,i)=>(
                                    <>
                                    <HStack w="100%" space="3" alignItems="center">
                                    <Avatar
                                        size="md"
                                        source={{uri:`${_env.eventcenter_base_url}/assets/attendees/${question?.attendee?.image}`}}
                                    >
                                    {question?.attendee?.first_name.charAt(0).toUpperCase() + question?.attendee?.last_name.charAt(0).toUpperCase()}
                                    </Avatar>
                                    <Text fontWeight="600" fontSize="lg">
                                    {question?.attendee?.first_name + question?.attendee?.last_name}
                                    </Text>
                                    </HStack>
                                    <HStack space="3" alignItems="flex-start">
                                        <Text lineHeight="sm" textAlign="center" w="48px" fontSize="2xl">Q:</Text>
                                        <Center w="calc(100% - 60px)" pt="1" alignItems="flex-start">
                                            <RenderHtml
                                                contentWidth={width}
                                                source={{ html: question?.info?.question }}
                                            />
                                        </Center>
                                    </HStack>        
                                    </>
                                  ))  
                                }
                                {tab === 'archive' &&
                                  qaDetials?.archived_questions?.map((question,i)=>(
                                    <>
                                    <HStack w="100%" space="3" alignItems="center">
                                    <Avatar
                                        size="md"
                                        source={{uri:`${_env.eventcenter_base_url}/assets/attendees/${question?.attendee?.image}`}}
                                    >
                                    {question?.attendee?.first_name.charAt(0).toUpperCase() + question?.attendee?.last_name.charAt(0).toUpperCase()}
                                    </Avatar>
                                    <Text fontWeight="600" fontSize="lg">
                                    {question?.attendee?.first_name + question?.attendee?.last_name}
                                    </Text>
                                    </HStack>
                                    <HStack space="3" alignItems="flex-start">
                                        <Text lineHeight="sm" textAlign="center" w="48px" fontSize="2xl">Q:</Text>
                                        <Center w="calc(100% - 60px)" pt="1" alignItems="flex-start">
                                        <RenderHtml
                                            contentWidth={width}
                                            source={{ html: question?.info?.question }}
                                        />
                                        </Center>
                                    </HStack>        
                                    </>
                                  ))  
                                }
                                {tab === 'my_question' &&
                                  qaDetials?.my_questions?.map((question,i)=>(
                                    <>
                                    <HStack w="100%" space="3" alignItems="center">
                                    <Avatar
                                        size="md"
                                        source={{uri:`${_env.eventcenter_base_url}/assets/attendees/${question?.attendee?.image}`}}
                                    >
                                    {question?.attendee?.first_name.charAt(0).toUpperCase() + question?.attendee?.last_name.charAt(0).toUpperCase()}
                                    </Avatar>
                                    <Text fontWeight="600" fontSize="lg">
                                    {question?.attendee?.first_name + question?.attendee?.last_name}
                                    </Text>
                                    </HStack>
                                    <HStack space="3" alignItems="flex-start">
                                        <Text lineHeight="sm" textAlign="center" w="48px" fontSize="2xl">Q:</Text>
                                        <Center w="calc(100% - 60px)" pt="1" alignItems="flex-start">
                                            <RenderHtml
                                                contentWidth={width}
                                                source={{ html: question?.info?.question }}
                                            />
                                        </Center>
                                    </HStack>        
                                    </>
                                  ))  
                                }
                            </VStack>
                        </>
                        }
                    
                    </Box>
                    
                </Box>
                
                </Box>
                
            </Container>
        )
    }
    </Container>
  )
}

export default Detail