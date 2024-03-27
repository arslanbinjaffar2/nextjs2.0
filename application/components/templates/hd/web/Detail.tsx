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

type ScreenParams = { id: string }

const { useParam } = createParam<ScreenParams>()

const Detail = () => {
    const mounted = React.useRef(false);

    const { processing, loading } = UseLoadingService();
    const { _env } = UseEnvService();

    const { event, modules } = UseEventService();

    const [tab, setTab] = React.useState<'popular'| 'recent' | 'archive' >('popular')

    const [query, setQuery] = React.useState('');

    const { response  } = UseAuthService();

    
    const {hdSettings, FetchGroupDetail, hdDetails, FetchTabDetails, SubmitHd, SubmitHdLike, HdRecentPopularSocketUpdate, HdSort } = UseHdService();
    
    const { push } = useRouter()

    const { socket } = UseSocketService();


    const [id] = useParam('id');

    React.useEffect(() => {
        if (id) {
            FetchGroupDetail({ id: Number(id) });
            FetchTabDetails({ id: Number(id) });
        }
    }, [id]);

    React.useEffect(() => {
        if(socket !== null){
            socket?.on(`event-buizz:hd_admin_block_listing_${event.id}_${id}`, function (data:any):any {
                console.log(data, 'data1');
                // HdRecentPopularSocketUpdate(data.data_raw);
            });
            socket?.on(`event-buizz:hd_block_sort_${event.id}_${id}`, function (data:any):any {
                console.log(data, 'data2');
                HdSort(data);
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
        popular:'Popular',
        recent:'Recent',
        archive:'Archive',  
    };
    
    const onSubmit = ( ) => {
        setError(null);
    
        if(question == ''){
            setError('Please enter a question first');
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
  return (
    <>
    {
        in_array('hd-detail', processing) ? (
            <WebLoading />
        ):(
            <>
            <NextBreadcrumbs module={module} title={hdDetails?.group?.info?.name}/>
            <Container overflow="hidden" mb="4" maxW="100%" w="100%">
                <HStack width={"100%"}  alignItems="center" mb={1}  space={0} justifyContent="flex-start">
                    <Text fontSize="2xl" w={'100%'} textAlign={'center'}  textBreakStrategy='simple' >
                        {hdDetails?.group?.info?.name}
                    </Text>
                </HStack>
                <Box overflow="hidden" w="100%" bg="primary.box" p="0" rounded="10px" borderBottomWidth={0} borderColor="primary.bdBox">
                <Box w="100%">
                    <HStack pl="4"  w="100%" bg="primary.darkbox" mb="3" alignItems="center">
                        <Text fontSize="lg">Ask a question</Text>
                    </HStack>
                    {error && <Box  mb="3" py="3" px="4" backgroundColor="red.200" w="100%">
                            <Text color="red.400"> {error} </Text>
                    </Box>}

                  
                    <TextArea focusOutlineColor="transparent" _focus={{ bg: 'transparent' }} value={question} onChangeText={(value)=>setQuestion(value)}  px="4" py="0" fontSize="lg" w="100%" borderWidth="0" rounded="0" minH="60px" placeholder="Text Area Placeholder" autoCompleteType={undefined}  />
                    <HStack px="3" py="2" space="3" alignItems="center">
                    {hdSettings?.anonymous == 1 && <Checkbox my="0" isChecked={anonymously} onChange={(isSelected)=>setAnonymously(isSelected)}  value="checkbox">Send anonymously</Checkbox>}
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
                        <Text fontSize="lg">History</Text>
                    </HStack>
                    <Spacer />
                    {/* <Text opacity={0.58} fontSize="md">1 Questions</Text> */}
                    </HStack>
                    <HStack mb="3" space={1} justifyContent="center" px={3} w="100%">
                        {enabledTabs?.map((item:any, index:number)=>(
                            <Button onPress={() => { setTab(item) }} key={index} bg={tab === item ? 'primary.boxbutton' : 'primary.box'} borderWidth="0px" py={0} borderColor="primary.darkbox" borderRightRadius={index == (enabledTabs.length - 1) ? 8 : 0} borderLeftRadius={index == 0 ? 8 : 0} h="42px"  w={`${100/enabledTabs.length}%`} _text={{ fontWeight: '600' }}>{TabHeadings[item]}</Button>
                        ))}
                    </HStack>
                    <Box mb="10" px="5" w="100%" position="relative">
                        {loading && <WebLoading />}
                        {!loading && <>
                            <VStack w="100%" space="3">
                                {tab === 'popular' &&
                                  hdDetails?.popular_questions?.map((question,i)=>(
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
                                    <HStack space="3" alignItems="flex-start"  justifyContent={'flex-start'}>
                                        <Text lineHeight="sm" textAlign="center" w="48px" fontSize="2xl">Q:</Text>
                                        <Text pt={1}>
                                            <div className='ebs-iframe-content' dangerouslySetInnerHTML={{__html:question?.info?.question}}/>
                                        </Text>
                                        <Spacer />
                                            {hdSettings.up_vote == 1 && <HStack alignItems={'center'}> 
                                                <IconButton
                                                    variant="transparent"
                                                    disabled={in_array(`hd-like-${question?.id}`, processing)}
                                                    icon={in_array(`hd-like-${question?.id}`, processing) ?  <Spinner accessibilityLabel="Question liked" size={'sm'} /> : <Icon size="sm" as={AntDesign} name={question?.likes?.find((like)=>(like.attendee_id == response.attendee_detail.id)) ? "like1" : "like2"} color="white" />}
                                                    onPress={() => { SubmitHdLike({question_id:question?.id, group_id:question?.group_id}); }}
                                                /> 
                                                <Text>{question?.like_count}</Text>
                                            </HStack>}
                                    </HStack>        
                                    </>
                                  ))  
                                }
                                {tab === 'recent' &&
                                  hdDetails?.recent_questions?.map((question,i)=>(
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
                                    <HStack space="3" alignItems="flex-start" justifyContent={'space-between'}>
                                            <Text lineHeight="sm" textAlign="center" w="48px" fontSize="2xl">Q:</Text>
                                            <Text pt={1}>
                                                <div className='ebs-iframe-content' dangerouslySetInnerHTML={{__html:question?.info?.question}}/>
                                            </Text>
                                            <Spacer />
                                            {hdSettings.up_vote == 1 && <HStack alignItems={'center'}> 
                                                <IconButton
                                                    variant="transparent"
                                                    disabled={in_array(`hd-like-${question?.id}`, processing)}
                                                    icon={in_array(`hd-like-${question?.id}`, processing) ?  <Spinner accessibilityLabel="Question liked" size={'sm'} /> : <Icon size="sm" as={AntDesign} name={question?.likes?.find((like)=>(like.attendee_id == response.attendee_detail.id)) ? "like1" : "like2"} color="white" />}
                                                    onPress={() => { SubmitHdLike({question_id:question?.id, group_id:question?.group_id}); }}
                                                /> 
                                                <Text>{question?.like_count}</Text>
                                            </HStack>}
                                    </HStack>        
                                    </>
                                  ))  
                                }
                                {tab === 'archive' &&
                                  hdDetails?.archived_questions?.map((question,i)=>(
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
                                    <HStack space="3" alignItems="flex-start" justifyContent={'space-between'}>
                                            <Text lineHeight="sm" textAlign="center" w="48px" fontSize="2xl">Q:</Text>
                                            <div className='ebs-iframe-content' dangerouslySetInnerHTML={{__html:question?.info?.question}}/>
                                            {hdSettings.up_vote == 1 && <HStack alignItems={'center'}> 
                                                <IconButton
                                                    variant="transparent"
                                                    disabled={in_array(`hd-like-${question?.id}`, processing)}
                                                    icon={in_array(`hd-like-${question?.id}`, processing) ?  <Spinner accessibilityLabel="Question liked" size={'sm'} /> : <Icon size="sm" as={AntDesign} name={question?.likes?.find((like)=>(like.attendee_id == response.attendee_detail.id)) ? "like1" : "like2"} color="white" />}
                                                    onPress={() => { SubmitHdLike({question_id:question?.id, group_id:question?.group_id}); }}
                                                /> 
                                                <Text>{question?.like_count}</Text>
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
                <Box width={"100%"} height={"5%"}>
                    <BannerAds module_name={'help_desk'} module_type={'detail'} />
                </Box>
            </Container>
            </>
        )
    }
    </>
  )
}

export default Detail