import React from 'react'
import { Box, Container, HStack, Icon, Spacer, Text, VStack, Pressable,  Image, Divider, Avatar, TextArea, Button, IconButton, ZStack, Select, Checkbox, Center, Input, Spinner, View } from 'native-base';
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
import { TextInput } from 'react-native';
import IcoSend from 'application/assets/icons/small/IcoSend'
import NextBreadcrumbs from 'application/components/atoms/NextBreadcrumbs';
import { 
    BtnBold,
    BtnBulletList,
    BtnClearFormatting,
    BtnItalic,
    BtnLink,
    BtnNumberedList,
    BtnRedo,
    BtnStrikeThrough,
    BtnStyles,
    BtnUnderline,
    BtnUndo,
    HtmlButton,
    Separator,
    Editor,
    EditorProvider,
    Toolbar
} from 'react-simple-wysiwyg';

type ScreenParams = { id: string }

const { useParam } = createParam<ScreenParams>()

const Detail = () => {
    const mounted = React.useRef(false);

    const { processing, loading } = UseLoadingService();
    const { _env } = UseEnvService();

    const { event, modules } = UseEventService();

    const [query, setQuery] = React.useState('');

    const { response  } = UseAuthService();

    
    const { qaDetials, qaSettings, FetchProgramDetail, FetchTabDetails,  SubmitQa, SubmitQaLike, QaRecentPopularSocketUpdate, QaSort} = UseQaService();
    const tabOrder = ['popular', 'recent', 'archive', 'my_question'];
    const enabledTabs = qaSettings ? Object.keys(qaSettings).reduce((ack:any, item:any)=>{
        if(in_array(item, ['popular','recent', 'archive',  'my_question']) && qaSettings[item] == 1){
            ack.push(item);
        }
        return ack;
    }, []).sort((a:any, b:any) => tabOrder.indexOf(a) - tabOrder.indexOf(b)) : [];
    
    const { socket } = UseSocketService();
    
    const [tab, setTab] = React.useState<'popular'| 'recent' | 'archive' | 'my_question' | ''>('');
    const [id] = useParam('id');

    const updateQuestionsCount = (tab: string) => {
        switch (tab) {
            case 'popular':
                setQuestionsCount(qaDetials?.popular_questions?.length ?? 0);
                break;
            case 'recent':
                setQuestionsCount(qaDetials?.recent_questions?.length ?? 0);
                break;
            case 'archive':
                setQuestionsCount(qaDetials?.archived_questions?.length ?? 0);
                break;
            case 'my_question':
                setQuestionsCount(qaDetials?.my_questions?.length ?? 0);
                break;
            default:
                setQuestionsCount(0);
                break;
        }
    };

    React.useEffect(() => {
        if (id) {
            FetchProgramDetail({ id: Number(id) });
            FetchTabDetails({ id: Number(id) });
        }
    }, [id]);

    React.useEffect(() => {
        updateQuestionsCount(tab);
    }, [tab, qaDetials]);
    
    React.useEffect(() => {
        if(!tab){
            if(enabledTabs.length > 0){
                setTab(enabledTabs[0])
            }
        }
    }, [enabledTabs]);
        

    React.useEffect(() => {
        if(socket !== null){
            socket?.on(`event-buizz:qa_admin_block_listing_${event.id}_${id}`, function (data:any):any {
                console.log("🚀 ~ data:", data)
                if(data.data_raw){
                    QaRecentPopularSocketUpdate(data.data_raw);
                    FetchTabDetails({ id: Number(id) });
                }
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
    const [questionsCount, setQuestionsCount] = React.useState<any>(0);
    const [error, setError] = React.useState<any>(null);

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
      const module = modules.find((module) => module.alias === 'qa');
  return (
    <>
    {
        in_array('qa-detail', processing) ? (
            <WebLoading />
        ):(
            <>
             <NextBreadcrumbs module={module} title={qaDetials?.program_detail?.info?.topic}/>
            <Container overflow="hidden" mb="4" maxW="100%" w="100%">
                <Box overflow="hidden" w="100%" bg="primary.box" p="0" rounded="10px" >
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
                      <View w={'100%'}>
                        <Select
                        placeholder="Please select attendee"
                        w="100%"
                        rounded="4"
                        minW={'20%'}
                        h="42px"
                        flex={1}
                        borderWidth="1"
                        selectedValue={speaker ?? ''}
                        onValueChange={(item)=>setSpeaker(item)}
                    >
                        {qaDetials?.speakers?.map((speaker, i)=>(
                            <Select.Item label={`${speaker?.attendee?.first_name} ${speaker?.attendee?.last_name}`} value={`${speaker?.id}`} />
                        ))}
                    </Select>
                      </View>
                      
                    </Center>
                    
                    </HStack>}
                    {qaDetials?.paragraph?.length > 0 && <HStack  px="3"  w="100%" borderBottomWidth={1}  borderBottomColor={'primary.bordercolor'} pb={'3'} mb="3"  alignItems="center">
                    <Text  w="30%"  fontSize="lg">Select Paragraph</Text>
                    <Center  w={'70%'} alignItems={'flex-start'} justifyContent={'flex-start'} p="0">
                    <View w={'100%'}>
                    <Select
                        placeholder="Please select attendee"
                        w="100%"
                        minW={'100%'}
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
                    </View>
                    
                    </Center>
                    
                    
                    </HStack>}
                    {qaSettings?.line_number == 1 && <HStack px={3}  w="100%" borderBottomWidth={1}  borderBottomColor={'primary.bordercolor'} pb={'3'} mb="3" alignItems="center">
                        <Text w="30%" fontSize="lg">Line number</Text>
                        <Input width={'70%'} placeholder="1" value={lineNumber} onChangeText={(value)=>setLineNumber(value)}/>
                    </HStack>}
                    {qaSettings?.paragraph_number == 1 && 
                    <Box w="100%" px="3">
                         <Text w={'100%'} color={'primary.text'} fontSize="md">
                            <Box w={'100%'} bg="primary.darkbox" rounded={8}>
                                <EditorProvider>
                                    <Editor style={{width: '100%'}} value={question} onChange={(e) => {
                                        setQuestion(e.target.value) }}  >
                                                <Toolbar>
                                                <BtnUndo />
                                                <BtnRedo />
                                                <Separator />
                                                <BtnBold />
                                                <BtnItalic />
                                                <BtnUnderline />
                                                <BtnStrikeThrough />
                                                <Separator />
                                                <BtnNumberedList />
                                                <BtnBulletList />
                                                <Separator />
                                                <BtnLink />
                                                <BtnClearFormatting />
                                                <HtmlButton />
                                            </Toolbar>
                                    </Editor>
                                </EditorProvider>
                            </Box>
                        </Text>
                    </Box>
                    }
                    <HStack px="3" py="2" space="3" alignItems="center">
                    {qaSettings?.anonymous == 1 && <Checkbox my="0" isChecked={anonymously} onChange={(isSelected)=>setAnonymously(isSelected)}  value="checkbox">Send anonymously</Checkbox>}
                    <Spacer />
                    <IconButton
                        variant="transparent"
                        disabled={in_array('qa-submitting', processing)}
                        icon={in_array('qa-submitting', processing) ?  <Spinner accessibilityLabel="Submitting Question" size={'sm'} /> : <IcoSend width={25} height={25} />}
                        onPress={() => { onSubmit(); }}

                    />
                    </HStack>
                </Box>
                {qaSettings?.qa_tabs == 1 && enabledTabs.length > 0 && <Box w="100%">
                    <HStack px="3" space="0" alignItems="center" bg="primary.darkbox" mb="3">
                    <HStack space="2" alignItems="center">
                        <IcoHistory  />
                        <Text fontSize="lg">{event?.labels?.GENERAL_HISTORY}</Text>
                    </HStack>
                    <Spacer />
                    <Text opacity={0.58} fontSize="md">{questionsCount} Question{questionsCount !== 1 ? 's' : ''}</Text>
                    </HStack>
                 
                    <HStack mb="4" space={4} justifyContent="flex-start" px={3} w="100%">
                        {enabledTabs?.map((item:any, index:number)=>(
                            <Pressable onPress={() => { setTab(item) }} key={index} bg={'transparent'}  borderWidth="0px" p={0} borderColor="primary.darkbox" >
                                <Text pb={1} borderBottomWidth={item === tab ? 2 : 0} borderBottomColor={'primary.text'}
                                opacity={tab==item?1:0.40}
                                fontSize="16px" fontWeight={600} textTransform={'uppercase'}>{TabHeadings[item]}</Text>
                            </Pressable>
                        ))}
                    </HStack>
                    <Box mb="10" px="3" w="100%" position="relative">
                        {loading && <WebLoading />}
                        {!loading && <>
                            
                            <VStack w="100%" space="3">
                                {tab === 'popular' && enabledTabs.includes('popular') &&
                                  qaDetials?.popular_questions?.map((question,i)=>(
                                    <>
                                    <HStack w="100%" space="3" alignItems="flex-start">
                                    <Avatar
                                        size="md"
                                        source={{uri:`${_env.eventcenter_base_url}/assets/attendees/${question.anonymous_user === 1 ? '' : question?.attendee?.image}`}}
                                    >
                                    {question?.attendee?.first_name.charAt(0).toUpperCase() + question?.attendee?.last_name.charAt(0).toUpperCase()}
                                    </Avatar>
                                    <View>
                                    <Text fontWeight="600" fontSize="lg">
                                    {question.anonymous_user === 1 ? qaDetials.labels.QA_ANONYMOUS :question?.attendee?.first_name + question?.attendee?.last_name}
                                    </Text>
                                    <HStack space="5" alignItems="flex-start" justifyContent={'flex-start'}>
                                        <VStack>
                                            {qaSettings?.paragraph_number == 1 && question?.info?.paragraph_number && 
                                                <Text fontSize="md">{qaDetials?.labels?.PARAGRAPH_NUMBER}: <Text fontSize="sm">{question?.info?.paragraph_number}</Text></Text>
                                            }
                                            {qaSettings?.line_number == 1 && question?.info?.line_number &&
                                                <Text fontSize="md">{qaDetials?.labels?.QA_LINE_NUMBER}: <Text fontSize="sm">{question?.info?.line_number}</Text></Text>
                                            }                                     
                                        </VStack>
                                    </HStack>
                                    </View>
                                    
                                 
                                    <Text position="absolute" right="5" top="0" opacity={0.5} fontSize="sm">{question.info.question_time}</Text>
                                    </HStack>
                             
                                    <Box w={'100%'}>
                                        <HStack w={'100%'} space="3" alignItems="flex-start" justifyContent={'flex-start'}>
                                            <Text lineHeight="24" textAlign="center" w="48px" fontSize="2xl">Q:</Text>
                                            <Text w={'100%'} pt={1}><div className='ebs-iframe-content-no-margin' dangerouslySetInnerHTML={{__html:question?.info?.question}}/></Text>
                                                
                                        </HStack>   
                                        {qaSettings.up_vote == 1 && <HStack 
                                            mt={3}
                                            ml={'56px'}
                                        
                                            alignItems={'center'}> 
                                                <Button
                                                    variant="unstyled"
                                                    w={'80px'}
                                                    rounded={6}
                                                    borderWidth={1}
                                                    borderColor={question?.likes?.find((like)=>(like.attendee_id == response.attendee_detail.id)) ? 'secondary.500' : 'primary.text'}
                                                    bg={question?.likes?.find((like)=>(like.attendee_id == response.attendee_detail.id)) ? 'secondary.500' : 'transparent'}
                                                    px={3}
                                                    py={2}
                                                    _hover={{bg: question?.likes?.find((like)=>(like.attendee_id == response.attendee_detail.id)) ? 'secondary.500' : 'transparent'}}
                                                    justifyContent={'flex-start'}
                                                    disabled={in_array(`qa-like-${question?.id}`, processing)}
                                                    leftIcon={in_array(`qa-like-${question?.id}`, processing) ?  <Spinner accessibilityLabel="Question liked" size={'sm'} /> : <Icon size="md" as={AntDesign} name={'like2'} color="primary.text" />}
                                                    onPress={() => { SubmitQaLike({question_id:question?.id, agenda_id:question?.agenda_id}); }}
                                                > 
                                                <HStack  space="3" pl={1} alignItems="center">
                                                <Divider width={'1px'} height={'20px'} bg={'primary.text'} borderWidth={0} />
                                                <Text>{question?.likes?.length}</Text>
                                                </HStack>
                                                
                                                
                                                </Button>
                                            </HStack>}    
                                    </Box>
                                    
                                    </>
                                  ))  
                                }
                                {tab === 'popular' && enabledTabs.includes('popular') && qaDetials?.popular_questions.length <= 0 &&
                                    <Box p={3} bg="primary.box" rounded="lg" w="100%">
                                        <Text>{event?.labels?.GENERAL_NO_RECORD}</Text>
                                    </Box>
                                }
                                {tab === 'recent' && enabledTabs.includes('recent') &&
                                  qaDetials?.recent_questions?.map((question,i)=>(
                                    <>
                                    <HStack w="100%" space="3" alignItems="flex-start">
                                    <Avatar
                                        size="md"
                                        source={{uri:`${_env.eventcenter_base_url}/assets/attendees/${question.anonymous_user === 1 ? '' : question?.attendee?.image}`}}
                                    >
                                    {question?.attendee?.first_name.charAt(0).toUpperCase() + question?.attendee?.last_name.charAt(0).toUpperCase()}
                                    </Avatar>
                                    <View>
                                                      
                                    <Text fontWeight="600" fontSize="lg">
                                    {question.anonymous_user === 1 ? qaDetials.labels.QA_ANONYMOUS :question?.attendee?.first_name + question?.attendee?.last_name}
                                    </Text>
                                    <HStack space="5" alignItems="flex-start" justifyContent={'flex-start'}>
                                        <VStack>
                                            {qaSettings?.paragraph_number == 1 && question?.info?.paragraph_number && 
                                                <Text fontSize="md">{qaDetials?.labels?.PARAGRAPH_NUMBER}: <Text fontSize="sm">{question?.info?.paragraph_number}</Text></Text>
                                            }
                                            {qaSettings?.line_number == 1 && question?.info?.line_number &&
                                                <Text fontSize="md">{qaDetials?.labels?.QA_LINE_NUMBER}: <Text fontSize="sm">{question?.info?.line_number}</Text></Text>
                                            }                                     
                                        </VStack>
                                    </HStack>
                                    </View>
                      
                                    <Text position="absolute" right="5" top="0" opacity={0.5} fontSize="sm">{question.info.question_time}</Text>
                                    </HStack>
                            
                                    <Box w={'100%'}>
                                        <HStack space="3" alignItems="flex-start" justifyContent={'flex-start'}>
                                                <Text lineHeight="sm" textAlign="center" w="48px" fontSize="2xl">Q:</Text>
                                                <Text w={'100%'} pt={1}>
                                                    <div className='ebs-iframe-content-no-margin' dangerouslySetInnerHTML={{__html:question?.info?.question}}/>
                                                </Text>
                                        </HStack>  
                                        {qaSettings.up_vote == 1 && <HStack 
                                                mt={3}
                                                ml={'56px'}
                                            
                                                alignItems={'center'}> 
                                                    <Button
                                                        variant="unstyled"
                                                        w={'80px'}
                                                        rounded={6}
                                                        borderWidth={1}
                                                        borderColor={question?.likes?.find((like)=>(like.attendee_id == response.attendee_detail.id)) ? 'secondary.500' : 'primary.text'}
                                                        bg={question?.likes?.find((like)=>(like.attendee_id == response.attendee_detail.id)) ? 'secondary.500' : 'transparent'}
                                                        px={3}
                                                        py={2}
                                                        _hover={{bg: question?.likes?.find((like)=>(like.attendee_id == response.attendee_detail.id)) ? 'secondary.500' : 'transparent'}}
                                                        justifyContent={'flex-start'}
                                                        disabled={in_array(`qa-like-${question?.id}`, processing)}
                                                        leftIcon={in_array(`qa-like-${question?.id}`, processing) ?  <Spinner accessibilityLabel="Question liked" size={'sm'} /> : <Icon size="md" as={AntDesign} name={'like2'} color="primary.text" />}
                                                        onPress={() => { SubmitQaLike({question_id:question?.id, agenda_id:question?.agenda_id}); }}
                                                    > 
                                                    <HStack  space="3" pl={1} alignItems="center">
                                                    <Divider width={'1px'} height={'20px'} bg={'primary.text'} borderWidth={0} />
                                                    <Text>{question?.likes?.length}</Text>
                                                    </HStack>
                                                    
                                                    
                                                    </Button>
                                                </HStack>}      

                                    </Box>
                                    </>
                                    
                                  ))  
                                }
                                {tab === 'recent' && enabledTabs.includes('recent') && qaDetials?.recent_questions.length <= 0 &&
                                    <Box p={3} bg="primary.box" rounded="lg" w="100%">
                                        <Text>{event?.labels?.GENERAL_NO_RECORD}</Text>
                                    </Box>
                                }
                                {tab === 'archive' && enabledTabs.includes('archive') &&
                                  qaDetials?.archived_questions?.map((question,i)=>(
                                    <>
                                    <HStack w="100%" space="3" alignItems="flex-start">
                                    <Avatar
                                        size="md"
                                        source={{uri:`${_env.eventcenter_base_url}/assets/attendees/${question.anonymous_user === 1 ? '' : question?.attendee?.image}`}}
                                    >
                                    {question?.attendee?.first_name.charAt(0).toUpperCase() + question?.attendee?.last_name.charAt(0).toUpperCase()}
                                    </Avatar>
                                    <View>
                                    <Text fontWeight="600" fontSize="lg">
                                    {question.anonymous_user === 1 ? qaDetials.labels.QA_ANONYMOUS :question?.attendee?.first_name + question?.attendee?.last_name}
                                    </Text>
                                    <HStack space="5" alignItems="flex-start" justifyContent={'flex-start'}>
                                        <VStack>
                                            {qaSettings?.paragraph_number == 1 && question?.info?.paragraph_number && 
                                                <Text fontSize="md">{qaDetials?.labels?.PARAGRAPH_NUMBER}: <Text fontSize="sm">{question?.info?.paragraph_number}</Text></Text>
                                            }
                                            {qaSettings?.line_number == 1 && question?.info?.line_number &&
                                                <Text fontSize="md">{qaDetials?.labels?.QA_LINE_NUMBER}: <Text fontSize="sm">{question?.info?.line_number}</Text></Text>
                                            }                                     
                                        </VStack>
                                    </HStack>
                                    </View>
                                    
                                
                                    <Text position="absolute" right="5" top="0" opacity={0.5} fontSize="sm">{question.info.question_time}</Text>
                                    </HStack>
                                  
                                    <Box w={'100%'}>
                                        <HStack space="3" alignItems="flex-start" justifyContent={'flex-start'}>
                                                <Text lineHeight="sm" textAlign="center" w="48px" fontSize="2xl">Q:</Text>
                                                <Text w={'100%'} pt={1}>
                                                    <div className='ebs-iframe-content-no-margin' dangerouslySetInnerHTML={{__html:question?.info?.question}}/>
                                                </Text>
                                        </HStack>  
                                        {qaSettings.up_vote == 1 && <HStack 
                                            mt={3}
                                            ml={'56px'}
                                        
                                            alignItems={'center'}> 
                                                <Button
                                                    variant="unstyled"
                                                    w={'80px'}
                                                    rounded={6}
                                                    borderWidth={1}
                                                    borderColor={question?.likes?.find((like)=>(like.attendee_id == response.attendee_detail.id)) ? 'secondary.500' : 'primary.text'}
                                                    bg={question?.likes?.find((like)=>(like.attendee_id == response.attendee_detail.id)) ? 'secondary.500' : 'transparent'}
                                                    px={3}
                                                    py={2}
                                                    _hover={{bg: question?.likes?.find((like)=>(like.attendee_id == response.attendee_detail.id)) ? 'secondary.500' : 'transparent'}}
                                                    justifyContent={'flex-start'}
                                                    disabled={in_array(`qa-like-${question?.id}`, processing)}
                                                    leftIcon={in_array(`qa-like-${question?.id}`, processing) ?  <Spinner accessibilityLabel="Question liked" size={'sm'} /> : <Icon size="md" as={AntDesign} name={'like2'} color="primary.text" />}
                                                    onPress={() => { SubmitQaLike({question_id:question?.id, agenda_id:question?.agenda_id}); }}
                                                > 
                                                <HStack  space="3" pl={1} alignItems="center">
                                                <Divider width={'1px'} height={'20px'} bg={'primary.text'} borderWidth={0} />
                                                <Text>{question?.likes?.length}</Text>
                                                </HStack>
                                                
                                                
                                                </Button>
                                            </HStack>}      

                                    </Box>
                                    
                                    </>
                                  ))  
                                }
                                {tab === 'archive' && enabledTabs.includes('archive') && qaDetials?.archived_questions.length <= 0 &&
                                    <Box p={3} bg="primary.box" rounded="lg" w="100%">
                                        <Text>{event?.labels?.GENERAL_NO_RECORD}</Text>
                                    </Box>
                                }
                                {tab === 'my_question' && enabledTabs.includes('my_question') &&
                                  qaDetials?.my_questions?.map((question,i)=>(
                                    <>
                                    <HStack w="100%" space="3" alignItems="flex-start">
                                    <Avatar
                                        size="md"
                                        source={{uri:`${_env.eventcenter_base_url}/assets/attendees/${question.anonymous_user === 1 ? '' : question?.attendee?.image}`}}
                                    >
                                    {question?.attendee?.first_name.charAt(0).toUpperCase() + question?.attendee?.last_name.charAt(0).toUpperCase()}
                                    </Avatar>
                                    <View>
                                    <Text fontWeight="600" fontSize="lg">
                                    {question.anonymous_user === 1 ? qaDetials.labels.QA_ANONYMOUS :question?.attendee?.first_name + question?.attendee?.last_name}
                                    </Text>
                                    <HStack space="5" alignItems="flex-start" justifyContent={'flex-start'}>
                                        <VStack>
                                            {qaSettings?.paragraph_number == 1 && question?.info?.paragraph_number && 
                                                <Text fontSize="md">{qaDetials?.labels?.PARAGRAPH_NUMBER}: <Text fontSize="sm">{question?.info?.paragraph_number}</Text></Text>
                                            }
                                            {qaSettings?.line_number == 1 && question?.info?.line_number &&
                                                <Text fontSize="md">{qaDetials?.labels?.QA_LINE_NUMBER}: <Text fontSize="sm">{question?.info?.line_number}</Text></Text>
                                            }                                     
                                        </VStack>
                                    </HStack>
                                    </View>
                                    
                                
                                    <Text position="absolute" right="5" top="0" opacity={0.5} fontSize="sm">{question.info.question_time}</Text>
                                    </HStack>
                                   
                                    <Box w={'100%'}>
                                        <HStack space="3" alignItems="flex-start" justifyContent={'flex-start'}>
                                            <Text lineHeight="sm" textAlign="center" w="48px" fontSize="2xl">Q:</Text>
                                            <Text w={'100%'} pt={1}>
                                                <div className='ebs-iframe-content-no-margin' dangerouslySetInnerHTML={{__html:question?.info?.question}}/>
                                            </Text>
                                        </HStack>  
                                    {qaSettings.up_vote == 1 && <HStack 
                                    mt={3}
                                    ml={'56px'}
                                   
                                    alignItems={'center'}> 
                                        <Button
                                            variant="unstyled"
                                             w={'80px'}
                                            rounded={6}
                                            borderWidth={1}
                                            borderColor={question?.likes?.find((like)=>(like.attendee_id == response.attendee_detail.id)) ? 'secondary.500' : 'primary.text'}
                                            bg={question?.likes?.find((like)=>(like.attendee_id == response.attendee_detail.id)) ? 'secondary.500' : 'transparent'}
                                            px={3}
                                            py={2}
                                            _hover={{bg: question?.likes?.find((like)=>(like.attendee_id == response.attendee_detail.id)) ? 'secondary.500' : 'transparent'}}
                                            justifyContent={'flex-start'}
                                            disabled={in_array(`qa-like-${question?.id}`, processing)}
                                            leftIcon={in_array(`qa-like-${question?.id}`, processing) ?  <Spinner accessibilityLabel="Question liked" size={'sm'} /> : <Icon size="md" as={AntDesign} name={'like2'} color="primary.text" />}
                                            onPress={() => { SubmitQaLike({question_id:question?.id, agenda_id:question?.agenda_id}); }}
                                        > 
                                        <HStack  space="3" pl={1} alignItems="center">
                                          <Divider width={'1px'} height={'20px'} bg={'primary.text'} borderWidth={0} />
                                          <Text>{question?.likes?.length}</Text>
                                        </HStack>
                                        
                                        
                                        </Button>
                                    </HStack>}
                                    </Box>      
                                    </>
                                  ))  
                                }
                                {tab === 'my_question' && enabledTabs.includes('my_question') && qaDetials?.my_questions.length <= 0 &&
                                    <Box p={3} bg="primary.box" rounded="lg" w="100%">
                                        <Text>{event?.labels?.GENERAL_NO_RECORD}</Text>
                                    </Box>
                                }
                            </VStack>
                        </>
                        }
                    
                    </Box>  
                </Box>}
                
                </Box>
                
            </Container>
            </>
        )
    }
    </>
  )
}

export default Detail