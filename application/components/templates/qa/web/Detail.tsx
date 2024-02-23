import React from 'react'
import { Box, Container, HStack, Icon, Spacer, Text, VStack, Pressable,  Image, Divider, Avatar, TextArea, Button, IconButton, ZStack, Select, Checkbox, Center, Input, Spinner } from 'native-base';
import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
import IcoHistory from 'application/assets/icons/IcoHistory';
import UseLoadingService from 'application/store/services/UseLoadingService';
import UseEventService from 'application/store/services/UseEventService';
import UseQaService from 'application/store/services/UseQaService';
import { useRouter } from 'solito/router';
import { createParam } from 'solito';
import WebLoading from 'application/components/atoms/WebLoading';
import in_array from "in_array";
import UseEnvService from 'application/store/services/UseEnvService';
import moment from 'moment';
import UseAuthService from 'application/store/services/UseAuthService';
import { QaSettings } from 'application/models/qa/Qa';
import UseSocketService from 'application/store/services/UseSocketService';

type ScreenParams = { id: string }

const { useParam } = createParam<ScreenParams>()

const Detail = () => {
    const mounted = React.useRef(false);

    const { processing, loading } = UseLoadingService();
    const { _env } = UseEnvService();

    const { event } = UseEventService();

    const [tab, setTab] = React.useState<'popular'| 'recent' | 'archive' | 'my_question'>('popular')

    const [query, setQuery] = React.useState('');

    const { response  } = UseAuthService();

    
    const { qaDetials, qaSettings, FetchProgramDetail, FetchTabDetails,  SubmitQa, SubmitQaLike, QaRecentPopularSocketUpdate, QaSort} = UseQaService();
    
    const { push, back } = useRouter()

    const { socket } = UseSocketService();


    const [id] = useParam('id');

    React.useEffect(() => {
        if (id) {
            FetchProgramDetail({ id: Number(id) });
            FetchTabDetails({ id: Number(id) });
        }
    }, [id]);

    React.useEffect(() => {
        if(socket !== null){
            socket?.on(`event-buizz:qa_admin_block_listing_${event.id}_${id}`, function (data:any):any {
                console.log(data, 'data');
                QaRecentPopularSocketUpdate(data.data_raw);
            });
            socket?.on(`event-buizz:qa_block_sort_${event.id}_${id}`, function (data:any):any {
                console.log(data, 'data');
                QaSort(data);
            });
        }
        return () =>{
            if(socket !== null){
                socket?.off(`event-buizz:qa_admin_block_listing_${event.id}_${id}`);
                socket?.off(`event-buizz:qa_block_sort_${event.id}_${id}`);
            }
        }
    }, [socket]);

    const [speaker, setSpeaker] = React.useState<any>(null);
    const [paragraph, setParagraph] = React.useState<any>(null);
    const [lineNumber, setLineNumber] = React.useState<any>('');
    const [question, setQuestion] = React.useState<any>('');
    const [anonymously, setAnonymously] = React.useState<any>(false);
    const [error, setError] = React.useState<any>(null);

    const enabledTabs = qaSettings ? Object.keys(qaSettings).reduce((ack:any, item:any)=>{
        if(in_array(item, ['popular','recent', 'archive',  'my_question']) && qaSettings[item] == 1){
            ack.push(item);
        }
        return ack;
    }, []) : [];

    const TabHeadings:any = {
        popular:'Popular',
        recent:'Recent',
        archive:'Archive',  
        my_question:'My Questions'
    };
    
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
    <>
    {
        in_array('qa-detail', processing) ? (
            <WebLoading />
        ):(
            <Container overflow="hidden" mb="4" maxW="100%" w="100%">
                <HStack mb="3" pt="2" w="100%" space="3" alignItems="center">
                    <Pressable onPress={()=>{
                        back();
                    }}>
                        <HStack  space="3" alignItems="center">
                            <Icon as={AntDesign} name="arrowleft" size="xl" color="primary.text"  />
                            <Text  fontSize="2xl">BACK</Text>
                        </HStack>
                    </Pressable>
                </HStack>
                <Box overflow="hidden" w="100%" bg="primary.box" p="0" rounded="10px" borderBottomWidth={1} borderColor="primary.bdBox">
                <Box w="100%"  py="3">
                    <HStack width={"100%"} pl="30px" alignItems="center" minH="55px" space={0} justifyContent="flex-start">
                        <Box position="absolute" left="0" top="0" w="15px">
                            <ZStack>
                            {qaDetials?.program_detail && qaDetials?.program_detail?.tracks?.length > 0 && qaDetials?.program_detail?.tracks.map((track: any, i: number) =>
                            <Box key={i} bg={track.color ? track.color : '#fff'} borderWidth="1" borderColor="primary.darkbox" w="15px" mt={`${i * 10}px`} h={`${55 - (i * 10)}px`} borderRightRadius="10" shadow={2} />
                        )}
                            </ZStack>
                        </Box>
                        <HStack pt="0" w="100%" space="5" alignItems="center" justifyContent="space-between">
                            <VStack space="1" width={'100%'}>
                            <Text fontSize="md" lineHeight="22px" textBreakStrategy='simple' >
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
                    {qaDetials?.speakers?.length > 0 && <HStack px={3}  w="100%" borderBottomWidth={1}  borderBottomColor={'primary.bordercolor'} pb={'3'} mb="3" alignItems="center">
                    <Text w={'30%'} fontSize="lg">Select speaker</Text>
                    <Center w={'70%'} alignItems={'flex-start'} justifyContent={'flex-start'} p="0">
                      <Select
                        placeholder="Please Select Attendee"
                        w="100%"
                        rounded="4"
                        h="42px"
                        borderWidth="1"
                        selectedValue={speaker ?? ''}
                        onValueChange={(item)=>setSpeaker(item)}
                    >
                        {qaDetials?.speakers?.map((speaker, i)=>(
                            <Select.Item label={`${speaker?.attendee?.first_name} ${speaker?.attendee?.last_name}`} value={`${speaker?.id}`} />
                        ))}
                    </Select>
                    </Center>
                    
                    </HStack>}
                    {qaDetials?.paragraph?.length > 0 && <HStack px="3"  w="100%" borderBottomWidth={1}  borderBottomColor={'primary.bordercolor'} pb={'3'} mb="3"  alignItems="center">
                    <Text  w="30%"  fontSize="lg">Select Paragraph</Text>
                    <Center w={'70%'} alignItems={'flex-start'} justifyContent={'flex-start'} p="0">
                    <Select
                        placeholder="Please Select Attendee"
                        w="100%"
                        minW={'100%'}
                        flex={1}
                        rounded="4"
                        h="42px"
                        borderWidth="1"
                        selectedValue={paragraph ?? ''}
                        onValueChange={(item)=>setParagraph(item)}
                    >
                        {qaDetials?.paragraph?.map((pg, i)=>(
                            <Select.Item  label={`${pg?.heading}`} value={`${pg.id}`} />
                        ))}
                    </Select>
                    </Center>
                    
                    
                    </HStack>}
                    {qaSettings?.line_number == 1 && <HStack px={3}  w="100%" borderBottomWidth={1}  borderBottomColor={'primary.bordercolor'} pb={'3'} mb="3" alignItems="center">
                        <Text w="30%" fontSize="lg">Line number</Text>
                        <Input width={'70%'} placeholder="1" value={lineNumber} onChangeText={(value)=>setLineNumber(value)}/>
                    </HStack>}
                    <Box w="100%" px="3">
                        <TextArea rounded={8} bg="primary.box" value={question} onChangeText={(value)=>setQuestion(value)}  p="3" fontSize="lg" w="100%" borderColor={'transparent'} minH="60px" placeholder="Text Area Placeholder" autoCompleteType={undefined}  />
                    </Box>
                    
                    <HStack px="3" py="2" space="3" alignItems="center">
                    {qaSettings?.anonymous == 1 && <Checkbox my="0" isChecked={anonymously} onChange={(isSelected)=>setAnonymously(isSelected)}  value="checkbox">Send anonymously</Checkbox>}
                    <Spacer />
                    <IconButton
                        variant="transparent"
                        disabled={in_array('qa-submitting', processing)}
                        icon={in_array('qa-submitting', processing) ?  <Spinner accessibilityLabel="Submitting Question" size={'sm'} /> : <Icon size="lg" as={Feather} name="send" color="white" />}
                        onPress={() => { onSubmit(); }}

                    />
                    </HStack>
                </Box>
                {qaSettings?.qa_tabs == 1 && <Box w="100%">
                    <HStack px="3" space="0" alignItems="center" bg="primary.darkbox" mb="3">
                    <HStack space="2" alignItems="center">
                        <IcoHistory  />
                        <Text fontSize="lg">History</Text>
                    </HStack>
                    <Spacer />
                    {/* <Text opacity={0.58} fontSize="md">1 Questions</Text> */}
                    </HStack>
                    <HStack mb="3" space={1} justifyContent="center" px={3} w="100%">
                        {enabledTabs?.map((item:any, index:number)=>(
                            <Button onPress={() => { setTab(item) }} key={index} bg={tab === item ? 'primary.darkbox' : 'primary.box'} borderWidth="1px" py={0} borderColor="primary.darkbox" borderRightRadius={index == (enabledTabs.length - 1) ? 8 : 0} borderLeftRadius={index == 0 ? 8 : 0} h="42px"  w={`${100/enabledTabs.length}%`} _text={{ fontWeight: '600' }}>{TabHeadings[item]}</Button>
                        ))}
                    </HStack>
                    <Box mb="10" px="5" w="100%" position="relative">
                        {loading && <WebLoading />}
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
                                    <HStack space="3" alignItems="flex-start" justifyContent={'flex-start'}>
                                        <Text lineHeight="24" textAlign="center" w="48px" fontSize="2xl">Q:</Text>
                                        <Text w={'calc(100% - 80px)'} pt={1}><div className='ebs-iframe-content-no-margin' dangerouslySetInnerHTML={{__html:question?.info?.question}}/></Text>
                                        <Spacer />
                                            {qaSettings.up_vote == 1 && <HStack alignItems={'center'}> 
                                                <IconButton
                                                    variant="transparent"
                                                    p={0}
                                                    mr={2}
                                                    disabled={in_array(`qa-like-${question?.id}`, processing)}
                                                    icon={in_array(`qa-like-${question?.id}`, processing) ?  <Spinner accessibilityLabel="Question liked" size={'sm'} /> : <Icon size="sm" as={AntDesign} name={question?.likes?.find((like)=>(like.attendee_id == response.attendee_detail.id)) ? "like1" : "like2"} color="white" />}
                                                    onPress={() => { SubmitQaLike({question_id:question?.id, agenda_id:question?.agenda_id}); }}
                                                /> 
                                                <Text>{question?.likes?.length}</Text>
                                            </HStack>}
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
                                    <HStack space="3" alignItems="flex-start" justifyContent={'flex-start'}>
                                            <Text lineHeight="sm" textAlign="center" w="48px" fontSize="2xl">Q:</Text>
                                            <Text w={'calc(100% - 80px)'} pt={1}>
                                                <div className='ebs-iframe-content-no-margin' dangerouslySetInnerHTML={{__html:question?.info?.question}}/>
                                            </Text>
                                            <Spacer />
                                            {qaSettings.up_vote == 1 && <HStack alignItems={'center'}> 
                                                <IconButton
                                                    variant="transparent"
                                                    disabled={in_array(`qa-like-${question?.id}`, processing)}
                                                    icon={in_array(`qa-like-${question?.id}`, processing) ?  <Spinner accessibilityLabel="Question liked" size={'sm'} /> : <Icon size="sm" as={AntDesign} name={question?.likes?.find((like)=>(like.attendee_id == response.attendee_detail.id)) ? "like1" : "like2"} color="white" />}
                                                    onPress={() => { SubmitQaLike({question_id:question?.id, agenda_id:question?.agenda_id}); }}
                                                /> 
                                                <Text>{question?.likes?.length}</Text>
                                            </HStack>}
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
                                    <HStack space="3" alignItems="flex-start" justifyContent={'flex-start'}>
                                            <Text lineHeight="sm" textAlign="center" w="48px" fontSize="2xl">Q:</Text>
                                            <Text w={'calc(100% - 80px)'} pt={1}>
                                                <div className='ebs-iframe-content-no-margin' dangerouslySetInnerHTML={{__html:question?.info?.question}}/>
                                            </Text>
                                            <Spacer />
                                            {qaSettings.up_vote == 1 && <HStack alignItems={'center'}> 
                                                <IconButton
                                                    variant="transparent"
                                                    disabled={in_array(`qa-like-${question?.id}`, processing)}
                                                    icon={in_array(`qa-like-${question?.id}`, processing) ?  <Spinner accessibilityLabel="Question liked" size={'sm'} /> : <Icon size="sm" as={AntDesign} name={question?.likes?.find((like)=>(like.attendee_id == response.attendee_detail.id)) ? "like1" : "like2"} color="white" />}
                                                    onPress={() => { SubmitQaLike({question_id:question?.id, agenda_id:question?.agenda_id}); }}
                                                /> 
                                                <Text>{question?.likes?.length}</Text>
                                            </HStack>}
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
                                    <HStack space="3" alignItems="flex-start" justifyContent={'flex-start'}>
                                            <Text lineHeight="sm" textAlign="center" w="48px" fontSize="2xl">Q:</Text>
                                            <Text w={'calc(100% - 80px)'} pt={1}>
                                                <div className='ebs-iframe-content-no-margin' dangerouslySetInnerHTML={{__html:question?.info?.question}}/>
                                            </Text>
                                            <Spacer />
                                            {qaSettings.up_vote == 1 && <HStack alignItems={'center'}> 
                                                <IconButton
                                                    variant="transparent"
                                                    disabled={in_array(`qa-like-${question?.id}`, processing)}
                                                    icon={in_array(`qa-like-${question?.id}`, processing) ?  <Spinner accessibilityLabel="Question liked" size={'sm'} /> : <Icon size="sm" as={AntDesign} name={question?.likes?.find((like)=>(like.attendee_id == response.attendee_detail.id)) ? "like1" : "like2"} color="white" />}
                                                    onPress={() => { SubmitQaLike({question_id:question?.id, agenda_id:question?.agenda_id}); }}
                                                /> 
                                                <Text>{question?.likes?.length}</Text>
                                            </HStack>}
                                    </HStack>        
                                    </>
                                  ))  
                                }
                            </VStack>
                        </>
                        }
                    
                    </Box>
                    
                </Box>}
                
                </Box>
                
            </Container>
        )
    }
    </>
  )
}

export default Detail