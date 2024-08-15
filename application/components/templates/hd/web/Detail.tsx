import React from 'react'
import { Box, Container, HStack, Icon, Spacer, Text, VStack, Pressable,  Image, Divider, Avatar, TextArea, Button, IconButton, ZStack, Select, Checkbox, Center, Input, Spinner } from 'native-base';
import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
import IcoHistory from 'application/assets/icons/IcoHistory';
import UseLoadingService from 'application/store/services/UseLoadingService';
import UseEventService from 'application/store/services/UseEventService';
import UseHdService from 'application/store/services/UseHdService';
import { useRouter } from 'solito/router';
import { createParam } from 'solito';
import WebLoading from 'application/components/atoms/WebLoading';
import in_array from "in_array";
import UseEnvService from 'application/store/services/UseEnvService';
import moment from 'moment';
import UseAuthService from 'application/store/services/UseAuthService';
import { Setting } from 'application/models/hd/Hd';
import UseSocketService from 'application/store/services/UseSocketService';
import NextBreadcrumbs from 'application/components/atoms/NextBreadcrumbs';
import BannerAds from 'application/components/atoms/banners/BannerAds';
import IcoSend from 'application/assets/icons/small/IcoSend'
import { getColorScheme } from "application/styles/colors";
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
import NoRecordFound from 'application/components/atoms/NoRecordFound';

import SectionLoading from 'application/components/atoms/SectionLoading';
import { useWindowDimensions } from 'react-native';
type ScreenParams = { id: string }

const { useParam } = createParam<ScreenParams>()

const Detail = () => {
    const mounted = React.useRef(false);

    const { width } = useWindowDimensions();
    const RenderHtml = require('react-native-render-html').default;

    const { processing, loading } = UseLoadingService();
    const { _env } = UseEnvService();

    const { event, modules } = UseEventService();

    

    const [query, setQuery] = React.useState('');

    const { response  } = UseAuthService();

    
    const {hdSettings, FetchGroupDetail, hdDetails, FetchTabDetails, SubmitHd, SubmitHdLike, HdRecentPopularSocketUpdate, HdSort, labels } = UseHdService();
    const { socket } = UseSocketService();
    const [questionsCount, setQuestionsCount] = React.useState<any>(0);

    const [id] = useParam('id');
    const [tab, setTab] = React.useState<'popular'| 'recent' | 'archive' >('popular')
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
            FetchGroupDetail({ id: Number(id) });
            FetchTabDetails({ id: Number(id) });
        }
    }, [id]);

    React.useEffect(() => {
        if(socket !== null){
            socket?.on(`event-buizz:hd_admin_block_listing_${event.id}_${id}`, function (data:any):any {
                console.log("🚀 ~ data:", data)
                if(data?.data_raw){
                    HdRecentPopularSocketUpdate(data.data_raw);
                    FetchTabDetails({ id: Number(id) });
                }
            });
            socket?.on(`event-buizz:hd_block_sort_${event.id}_${id}`, function (data:any):any {
                console.log(data, 'data2');
                HdSort(data);
                FetchTabDetails({ id: Number(id) });
            });
        }
        return () =>{
            if(socket !== null){
                socket?.off(`event-buizz:hd_admin_block_listing_${event.id}_${id}`);
                socket?.off(`event-buizz:hd_block_sort_${event.id}_${id}`);
            }
        }
    }, [socket]);

    const [speaker, setSpeaker] = React.useState<any>(null);
    const [paragraph, setParagraph] = React.useState<any>(null);
    const [lineNumber, setLineNumber] = React.useState<any>('');
    const [question, setQuestion] = React.useState<any>('');
    const [anonymously, setAnonymously] = React.useState<any>(false);
    const [error, setError] = React.useState<any>(null);

    const enabledTabs = hdSettings ? Object.keys(hdSettings).reduce((ack:any, item:any)=>{
        if(in_array(item, ['archive']) && hdSettings[item] == 1){
            ack.push(item);
        }
        return ack;
    }, ['popular','recent']) : ['popular','recent'];

    const TabHeadings:any = {
        popular: labels?.HD_POPULAR ?? 'Popular',
        recent: labels?.HD_RECENT ?? 'Recent',
        archive: labels?.HD_ARCHIVE ?? 'Archive',  
    };

    const updateQuestionsCount = (tab: string) => {
        switch (tab) {
            case 'popular':
                setQuestionsCount(hdDetails?.popular_questions?.length ?? 0);
                break;
            case 'recent':
                setQuestionsCount(hdDetails?.recent_questions?.length ?? 0);
                break;
            case 'archive':
                setQuestionsCount(hdDetails?.archived_questions?.length ?? 0);
                break;
            default:
                setQuestionsCount(0);
                break;
        }
    };

    React.useEffect(() => {
        updateQuestionsCount(tab);
    }, [tab, hdDetails]);
    
    const onSubmit = ( ) => {
        setError(null);
    
        if(question == ''){
            setError(labels?.HD_ENTER_QUESTION ?? "Please enter a question to submit");
            return;
        }
        
        const postData =  {
            env: _env.enviroment,
            submitted: true,
            group_id: id,
            question: question,
            cmd: 'posted',
            event_id: event.id,
            attendee_id: response.data.user.id,
            anonymous_user: anonymously ? 1 : 0,
            show_projector: hdSettings?.moderator == 1 ? 0 : 1,
            answered: 0,
            allLanguages: JSON.stringify(hdDetails.all_languages),
            created_at: moment().toDate(),
            updated_at: moment().toDate(),
            language_id: event.language_id,
            base_url: _env.eventcenter_base_url,
            enable_gdpr: event?.gdpr_settings?.enable_gdpr,
            enable_attendee_gdpr: response?.attendee_detail?.event_attendee?.gdpr,
            attendee_invisible: event?.gdpr_settings?.attendee_invisible,
            ip: hdDetails.clientIp,
        }
          
        SubmitHd(postData);
        
        setAnonymously(false);
        setParagraph(null);
        setLineNumber('');
        setQuestion('');
        setSpeaker(null);
  
      }
      const module = modules.find((module) => module.alias === 'help_desk');
      console.log(labels)
  return (
    <>
    {
        in_array('hd-detail', processing) ? (
            <SectionLoading />
        ):(
            <>
            <NextBreadcrumbs module={module} title={hdDetails?.group?.info?.name}/>
            <Container overflow="hidden" mb="4" maxW="100%" w="100%">
                <HStack width={"100%"}  alignItems="center" mb={1}  space={0} justifyContent="flex-start">
                    <Text fontSize="2xl" w={'100%'} textAlign={'center'}  textBreakStrategy='simple' >
                        {hdDetails?.group?.info?.name}
                    </Text>
                </HStack>
                <Box overflow="hidden" w="100%" bg="primary.box" p="0" rounded="10px" mb={3} borderBottomWidth={0} borderColor="primary.bdBox">
                <Box w="100%">
                    <HStack pl="3"  w="100%" bg="primary.darkbox" mb="3" alignItems="center">
                        <Text fontSize="lg">{labels?.HD_ASK_QUESTION ?? "Ask a question"}</Text>
                    </HStack>
                    {error && <Box  mb="3" py="3" px="3" backgroundColor="red.200" w="100%">
                            <Text color="red.400"> {error} </Text>
                    </Box>}
                    <Box w="100%" px="3">
                         <Text w={'100%'} color={'primary.text'} fontSize="md">
                            <Box w={'100%'} bg="primary.darkbox" rounded={8}>
                                <EditorProvider>
                                    <Editor style={{width: '100%',opacity:1}} value={question} 
                                    placeholder={labels?.HD_TYPE_YOUR_QUESTION}
                                    
                                    onChange={(e) => {
                                        
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
                    {/* <TextArea focusOutlineColor="transparent" _focus={{ bg: 'transparent' }} value={question} onChangeText={(value)=>setQuestion(value)}  px="4" py="0" fontSize="lg" w="100%" borderWidth="0" rounded="0" minH="60px" placeholder="Text Area Placeholder" autoCompleteType={undefined}  /> */}
                    <HStack px="3" py="2" space="3" alignItems="center">
                    {hdSettings?.anonymous == 1 && <Checkbox my="0" isChecked={anonymously} onChange={(isSelected)=>setAnonymously(isSelected)}  value="checkbox">{labels?.HD_SEND_ANONYMOUSLY ?? "Send anonymously"}</Checkbox>}
                    <Spacer />
                    <IconButton
                        variant="transparent"
                        disabled={in_array('hd-submitting', processing)}
                        icon={in_array('hd-submitting', processing) ?  <Spinner accessibilityLabel="Submitting Question" size={'sm'} /> : <IcoSend width={25} height={25} />}
                        onPress={() => { 
                            onSubmit(); 
                        }}

                    />
                    </HStack>
                </Box>
                {hdSettings?.qa_tabs == 1 && <Box w="100%">
                    <HStack px="3" space="0" alignItems="center" bg="primary.darkbox" mb="3">
                    <HStack space="2" alignItems="center">
                        <IcoHistory  />
                        <Text fontSize="lg">{labels?.HD_HISTORY ?? "History"}</Text>
                    </HStack>
                    <Spacer />
                    <Text opacity={0.58} fontSize="md">{questionsCount}  {labels?.HD_QUESTIONS ?? "Questions"}</Text>
                    </HStack>
                 
                    <HStack mb="4" space={10} justifyContent="flex-start" px={3} w="100%">
                        {enabledTabs?.map((item:any, index:number)=>(
                            <Pressable onPress={() => { setTab(item) }} key={index} bg={'transparent'}  borderWidth="0px" p={0} borderColor="primary.darkbox" >
                                <Text 
                                opacity={item==tab?1:0.58}
                                pb={1} borderBottomWidth={item === tab ? 2 : 0} borderBottomColor={'primary.text'} fontSize="16px" fontWeight={600} textTransform={'uppercase'}>{TabHeadings[item]}</Text>
                            </Pressable>
                        ))}
                    </HStack>
                    <Box mb="10" px="3" w="100%" position="relative">
                        {loading && <SectionLoading />}
                        {!loading && <>
                            <VStack w="100%" space="3">
                                {tab === 'popular' &&
                                  hdDetails?.popular_questions?.map((question,i)=>(
                                    <>
                                    <HStack w="100%" space="3" alignItems="center">
                                    <Avatar
                                        size="md"
                                        source={{uri:`${_env.eventcenter_base_url}/assets/attendees/${question.anonymous_user === 1 ? '' : question?.attendee?.image}`}}
                                    >
                                    {question?.attendee?.first_name.charAt(0).toUpperCase() + question?.attendee?.last_name.charAt(0).toUpperCase()}
                                    </Avatar>
                                    <Text fontWeight="600" fontSize="lg">
                                    {question.anonymous_user === 1 ? (labels?.HD_ANONYMOUS ?? "Anonymous") : question?.attendee?.first_name + question?.attendee?.last_name}
                                    </Text>
                                    <Text position="absolute" right="5" top="0" opacity={0.5} fontSize="sm">{question.info.question_time}</Text>
                                    </HStack>
                                    <Box w={'100%'}>
                                        <HStack w={'100%'} space="3" alignItems="flex-start" justifyContent={'flex-start'}>
                                            <Text lineHeight="24" textAlign="center" w="48px" fontSize="2xl">Q:</Text>
                                            <Box w={'100%'} pt={1}>
                                                <RenderHtml
                                                    defaultTextProps={{selectable:true}}
                                                    contentWidth={width > 600 ? 600 : width - 90}
                                                    systemFonts={['Avenir']}
                                                    tagsStyles={mixedStyle}
                                                    source={{ html: question?.info?.question }}
                                                />
                                            </Box>
                                                
                                        </HStack>   
                                        {hdSettings.up_vote == 1 && <HStack 
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
                                                    onPress={() => { SubmitHdLike({question_id:question?.id, group_id:question?.group_id}); }}
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
                                {tab === 'popular' && hdDetails?.popular_questions.length <= 0 &&
                                
                                    <NoRecordFound
                                    mb="3" 
                                    bg="primary.box"
                                    />
                                }
                                {tab === 'recent' &&
                                  hdDetails?.recent_questions?.map((question,i)=>(
                                    <>
                                    <HStack w="100%" space="3" alignItems="center">
                                    <Avatar
                                        size="md"
                                        source={{uri:`${_env.eventcenter_base_url}/assets/attendees/${question.anonymous_user === 1 ? '' : question?.attendee?.image}`}}
                                    >
                                    {question?.attendee?.first_name.charAt(0).toUpperCase() + question?.attendee?.last_name.charAt(0).toUpperCase()}
                                    </Avatar>
                                    <Text fontWeight="600" fontSize="lg">
                                    {question.anonymous_user === 1 ? (labels?.HD_ANONYMOUS ?? "Anonymous") : question?.attendee?.first_name + question?.attendee?.last_name}
                                    </Text>
                                    <Text position="absolute" right="5" top="0" opacity={0.5} fontSize="sm">{question.info.question_time}</Text>
                                    </HStack>
                                    <Box w={'100%'}>
                                        <HStack space="3" alignItems="flex-start" justifyContent={'flex-start'}>
                                                <Text lineHeight="sm" textAlign="center" w="48px" fontSize="2xl">Q:</Text>
                                                <Box w={'100%'} pt={1}>
                                                    <RenderHtml
                                                    defaultTextProps={{selectable:true}}
                                                    contentWidth={width > 600 ? 600 : width - 90}
                                                    systemFonts={['Avenir']}
                                                    tagsStyles={mixedStyle}
                                                    source={{ html: question?.info?.question }}
                                                />
                                                </Box>
                                        </HStack>  
                                        {hdSettings.up_vote == 1 && <HStack 
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
                                                        onPress={() => { SubmitHdLike({question_id:question?.id, group_id:question?.group_id}); }}
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
                                {tab === 'recent' && hdDetails?.recent_questions.length <= 0 &&
                                <NoRecordFound
                                mb={3} bg="primary.box"
                                />
                                  
                                }
                                {tab === 'archive' &&
                                  hdDetails?.archived_questions?.map((question,i)=>(
                                    <>
                                    <HStack w="100%" space="3" alignItems="center">
                                    <Avatar
                                        size="md"
                                        source={{uri:`${_env.eventcenter_base_url}/assets/attendees/${question.anonymous_user === 1 ? '' : question?.attendee?.image}`}}
                                    >
                                    {question?.attendee?.first_name.charAt(0).toUpperCase() + question?.attendee?.last_name.charAt(0).toUpperCase()}
                                    </Avatar>
                                    <Text fontWeight="600" fontSize="lg">
                                    {question.anonymous_user === 1 ? (labels?.HD_ANONYMOUS ?? "Anonymous") : question?.attendee?.first_name + question?.attendee?.last_name}
                                    </Text>
                                    <Text position="absolute" right="0" top="0" opacity={0.5} fontSize="sm">{question.info.question_time}</Text>
                                    </HStack>
                                    <Box w={'100%'}>
                                        <HStack space="3" alignItems="flex-start" justifyContent={'flex-start'}>
                                                <Text lineHeight="sm" textAlign="center" w="48px" fontSize="2xl">Q:</Text>
                                                <Box w={'100%'} pt={1}>
                                                    <RenderHtml
                                                        defaultTextProps={{selectable:true}}
                                                        contentWidth={width > 600 ? 600 : width - 90}
                                                        systemFonts={['Avenir']}
                                                        tagsStyles={mixedStyle}
                                                        source={{ html: question?.info?.question }}
                                                    />
                                                </Box>
                                        </HStack>  
                                        {hdSettings.up_vote == 1 && <HStack 
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
                                                    onPress={() => { SubmitHdLike({question_id:question?.id, group_id:question?.group_id}); }}
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
                                {tab === 'archive' && hdDetails?.archived_questions.length <= 0 &&
                                <NoRecordFound bg="primary.box"/>
                                   
                                }
                            </VStack>
                        </>
                        }
                    
                    </Box>
                    
                </Box>}
                
                </Box>
                    <BannerAds module_name={'help_desk'} module_type={'detail'} />
            </Container>
            </>
        )
    }
    </>
  )
}

export default Detail