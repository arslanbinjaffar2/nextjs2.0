import React, { useEffect } from 'react';
import IcoEmail from 'application/assets/icons/small/IcoEmail';
import IcoClipboard from 'application/assets/icons/small/IcoClipboard';
import IcoCheckin from 'application/assets/icons/small/IcoCheckin';
import IcoCheckout from 'application/assets/icons/small/IcoCheckout';
import {
	Box,
	Button,
	Center,
	Container,
	Divider,
	HStack,
	Icon,
	IconButton,
	Image,
	Spacer,
	Text,
	VStack
} from 'native-base'
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import UseCheckInOutService from 'application/store/services/UseCheckInOutService';
import WebLoading from 'application/components/atoms/WebLoading';
import UseLoadingService from 'application/store/services/UseLoadingService';
import moment from 'moment';
import in_array from "in_array";
import { Platform } from 'react-native'
import DateTimePicker from 'application/components/atoms/DateTimePicker'
import UseEnvService from 'application/store/services/UseEnvService'
import BannerAds from 'application/components/atoms/banners/BannerAds'
import UseEventService from 'application/store/services/UseEventService';
import {GENERAL_DATE_FORMAT, GENERAL_DATETIME_FORMAT, GENERAL_TIME_FORMAT} from 'application/utils/Globals';
import UseAuthService from 'application/store/services/UseAuthService';
import { GroupedHistory, History } from 'application/models/checkInOut/CheckInOut'
import UseBannerService from 'application/store/services/UseBannerService';
import { Banner } from 'application/models/Banner';
import NextBreadcrumbs from 'application/components/atoms/NextBreadcrumbs';


const CheckinList = ({type, k, group}: any) => {
	const [toggle, settoggle] = React.useState(false);
  const {event} = UseEventService();

  function formatTime(log:History,type?:string){
    let time = log.checkin !== '' && log.checkin !== '0000-00-00 00:00:00' ? log.checkin : log.checkout;  
    if(type && type === 'checkin'){
      time= log.checkin;
    }

    if(type && type === 'checkout'){
      time= log.checkout;
    }
    if(time==='0000-00-00 00:00:00' || time === ''){
      return '';
    }
    return moment(time).format(GENERAL_TIME_FORMAT);
  }

  function formatDate(log:History,type?:string){
    let time = log.checkin !== '' && log.checkin !== '0000-00-00 00:00:00' ? log.checkin : log.checkout;  
    if(type && type === 'checkin'){
      time= log.checkin;
    }

    if(type && type === 'checkout'){
      time= log.checkout;
    }
    if(time==='0000-00-00 00:00:00' || time === ''){
      return '';
    }
    return moment(time).format(GENERAL_DATE_FORMAT);
  }

  function getTitleToShow(log:History){
    if(log.type_name === 'event'){
      return event?.name;
    }
    if(log.type_name === 'group'){
      return log?.group?.info?.value;
    }
    if(log.type_name === 'ticket'){
      return log?.ticket?.info?.find((item:any)=>item.name === 'item_name')?.value;
    }
    if(log.type_name === 'program'){
      return log?.program?.info?.find((item:any)=>item.name === 'topic')?.value;
    }
    return '';
  }

	return (
		<Box borderTopColor={'primary.bordercolor'} borderTopWidth={k === 0 ? 0 : 1} p={3} pl={4} alignItems="center">
			<HStack w={'100%'} space="0">
					<Center alignItems={'flex-start'} justifyContent={'flex-start'} w={'calc(100% - 130px)'}>
						<Text  fontWeight={500} mb={1} fontSize="md">{getTitleToShow(group.first_log)}</Text>
						<VStack w={'100%'}  space="1">
							<HStack  space="2" alignItems="center">
								<Icon color={'primary.text'} as={SimpleLineIcons} name="calendar"  />
								<Text  fontSize="sm" fontWeight={500}>{moment(group?.log_date).format(GENERAL_DATE_FORMAT)}</Text>
							</HStack>
							{/* <HStack  space="2" alignItems="center">
								<Icon color={'primary.text'} as={SimpleLineIcons} name="clock"  />
								<Text  fontSize="sm">10:45 - 12:45</Text>
							</HStack> */}
						</VStack>
						
					</Center>
					<Center pr={4}>
						<HStack  space="2" alignItems="center" justifyContent={'flex-start'}>
							<Box lineHeight={1} bg={ type === 'checkin' ? 'success.500' : 'danger.500'} p="1" rounded={4}>
								{type === 'checkin' && <IcoCheckin />}
								{type === 'checkout' && <IcoCheckout />}
							</Box>
							<Center justifyContent={'flex-start'} alignItems={'flex-start'}>
								<Text fontSize="sm" fontWeight={500}>{moment(group?.first_log?.log_date).format(GENERAL_DATE_FORMAT)}</Text>
								<Text fontSize="sm">{type === "checkin" ? moment(group?.first_log?.checkin).format(GENERAL_TIME_FORMAT) : moment(group?.first_log?.checkout).format(GENERAL_TIME_FORMAT)}</Text>
								
							</Center>
							
						</HStack>
						
						
					</Center>
					<Spacer />
						{ group.other_logs.length > 0 &&
              <IconButton
							variant="unstyled"
							p={0}
							icon={<Icon size="md" as={SimpleLineIcons} name={toggle ? 'arrow-down' : 'arrow-right'} color="white" />}
							onPress={()=>{
								settoggle(!toggle)
							}}
							
						/>}
			</HStack>
			{toggle && <Box my={3}  w={'100%'} bg="primary.darkbox"  rounded="lg">
				{group.other_logs.map((log:History,i:number) =>  <HStack key={i}  py="2" px={3} borderTopColor={'primary.bordercolor'} borderTopWidth={i===0?0:1}  space="0" alignItems="flex-start">
            {formatDate(log,"checkin") !== '' &&
            <HStack  space="2" alignItems="center" justifyContent={'flex-start'}>
							<Box lineHeight={1} bg={'success.500'} p="1" rounded={4}>
								<IcoCheckin />
							</Box>
							<Center justifyContent={'flex-start'} alignItems={'flex-start'}>
								<Text fontSize="sm">{formatDate(log,"checkin")}</Text>
								<Text fontSize="sm">{formatTime(log,"checkin")}</Text>
								
							</Center>
							
						</HStack>
            }
						<Spacer />
            {formatDate(log,"checkout") !== '' && 
            <HStack  space="2" alignItems="center" justifyContent={'flex-start'}>
							<Box lineHeight={1} bg={'danger.500'} p="1" rounded={4}>
								<IcoCheckout />
							</Box>
							<Center justifyContent={'flex-start'} alignItems={'flex-start'}>
								<Text fontSize="sm">{formatDate(log,"checkout")}</Text>
								<Text fontSize="sm">{formatTime(log,"checkout")}</Text>
								
							</Center>
							
						</HStack>
            }
						
				</HStack>)}
				

			</Box>}
			
		</Box>
	)
}

const Index = () => {
  const { loading, processing } = UseLoadingService();
  const { _env } = UseEnvService()
  const { event, modules } = UseEventService();
  const { response  } = UseAuthService();

  const { FetchCheckInOut, checkInOut, SendQRCode, DoCheckInOut }  = UseCheckInOutService();
  React.useEffect(() => {  
    FetchCheckInOut({showLoading:true});
  }, [])
  
  const { banners, FetchBanners} = UseBannerService();
  const [filteredBanners, setFilteredBanners] = React.useState<Banner[]>([]);
  const [tab, setTab] = React.useState<'event'| 'program' | 'group' | 'ticket' | ''>('');
  const [filteredHistory, setFilteredHistory] = React.useState<GroupedHistory[]>([]);
  const [selectedDate, setSelectedDate] = React.useState('');

  useEffect(()=>{
    const filteredBanner=banners.filter((banner  : Banner)=>{
      return banner.module_name == 'checkIn' && banner.module_type == 'listing'
    })

    setFilteredBanners(filteredBanner);
  },[banners]);

  React.useEffect(() => {
    FetchBanners();
  }, []);

  function setDefaultTab(){
    if (tab !==''){
      return;
    }
    if(checkInOut?.setting?.show_event_checkin_history){
      setTab('event');
    }else if(checkInOut?.setting?.show_programs_checkin_history){
      setTab('program');
    }else if(checkInOut?.setting?.show_groups_checkin_history){
      setTab('group');
    }else if(checkInOut?.setting?.show_tickets_checkin_history){
      setTab('ticket');
    }
  }

  React.useEffect(() => {
    setDefaultTab();
    filterHistory();
  }
  , [checkInOut]);

  React.useEffect(() => {
    setSelectedDate('');
    filterHistory();
  }
  , [tab]);

  React.useEffect(() => {
    filterHistory();
  }
  , [selectedDate]);

  function getLogType(log: History){
    if(log.checkin !== '' && log.checkin !== '0000-00-00 00:00:00'){
      return 'checkin';
    }
    return 'checkout';
  }

  function filterHistory(){
    if (tab !== '') {
      if (selectedDate && selectedDate !== '') {
        const date = moment(selectedDate).format(GENERAL_DATE_FORMAT);
        const filtered = checkInOut?.type_history[tab].filter((history: GroupedHistory) => moment(history.log_date).format(GENERAL_DATE_FORMAT) === date);
        setFilteredHistory(filtered);
      } else {
        setFilteredHistory(checkInOut?.type_history[tab]);
      }
    } else {
      setFilteredHistory([]);
    }
  }    

  const module = modules.find((module) => module.alias === 'checkIn');
  return (
    <>
      {
        in_array('fetch-checkin-out',processing) ? (
            <WebLoading />
        ):(
            <Container pt="1" maxW="100%" w="100%">
              <NextBreadcrumbs module={module} />
							<Box flexDirection="row" w={'100%'} alignItems="center">
								<HStack mb={3} w={'100%'} space="0" alignItems="center" justifyContent={'center'} pt={4}>
                <Text mb="0" textTransform="uppercase" fontSize="2xl">{modules?.find((checkin)=>(checkin.alias == 'checkIn'))?.name ?? ""}</Text>
								<Spacer />
                  {checkInOut?.setting?.enable_email_ticket ? <>
                    {in_array('checkin-send-qr-code', processing) ?  <WebLoading/> : 
                    <HStack  space="2" alignItems="center">
                      <IconButton
                          variant="transparent"
                          p="1"
                          icon={<IcoEmail />}
                          onPress={() => {
                              SendQRCode();
                          }}
                      />
                      {checkInOut?.hasOrderItems &&
                      <IconButton
                          variant="transparent"
                          p="1"
                          icon={<IcoClipboard />}
                          onPress={() => {
                              console.log('first')
                          }}
                      />
                      }
                    </HStack>
                    
                    }
									</>:null}
								</HStack>
							<Spacer />
							</Box>
              {checkInOut?.setting?.show_qrcode || checkInOut?.setting?.self_checkin ? 
                <Box mb="3" w="100%" bg="primary.box" p="5" rounded="10">
                    {checkInOut?.setting?.show_qrcode ? 
                      <Box mx="auto" w="190px" h="190px" bg="primary.box" p="3" rounded="10">
                        <Image
                        source={{
                            uri: checkInOut?.qrCodeImgSrc
                        }}
                        alt=""
                        w="164px"
                        h="164px"
                        rounded="10"
                        />
                    </Box>
                    :null}
                    {checkInOut?.setting?.self_checkin ? <>
                    <HStack space="0" alignItems="center" justifyContent={'center'} pt={4}>
                        <Button
                            px={4}
                            py={2}
                            shadow={3}
                            colorScheme="primary"
                            minW={190}
                            onPress={()=>{
                              DoCheckInOut({attendee_id:response.data.user.id,organizer_id:event.organizer_id!, action:"attendee-checkin"});
                            }}
                            isDisabled={in_array('checking-in-out', processing)}
                        
                        >
                            <Text fontSize="xl" fontWeight={600}>{checkInOut?.status === 'check-in' ? event?.labels?.CHECK_IN_BUTTON : event?.labels?.CHECK_OUT_BUTTON}</Text>
                        </Button>
                    </HStack>
                    </>:null}
                </Box>:null}
                <Image
                mb="3"
                rounded="10"
                source={{
                    uri: 'https://wallpaperaccess.com/full/206501.jpg'
                }}
                alt=""
                w="100%"
                h="144px"
                />
                <HStack mb="3" space={1} justifyContent="center" px={3} w="100%">
                  {checkInOut?.setting?.show_event_checkin_history ? <>
									<Button onPress={() => { setTab('event') }} bg={tab === 'event' ? 'primary.boxbutton' : 'primary.box'} borderWidth="1px" py={0} borderColor="primary.darkbox" borderRightRadius="0" borderLeftRadius={8} h="42px"  w={'25%'} _text={{ fontWeight: '600' }}>Event</Button>
									</>:null}
									{checkInOut?.setting?.show_programs_checkin_history ? <>
									<Button onPress={() => { setTab('program')}} bg={tab === 'program' ? 'primary.boxbutton' : 'primary.box'} borderRadius="0" borderWidth="1px" py={0} borderColor="primary.darkbox" h="42px"  w={'25%'} _text={{ fontWeight: '600' }}>Program</Button>
									</>:null}
									{checkInOut?.setting?.show_groups_checkin_history ? <>
									<Button onPress={() => { setTab('group')}} bg={tab === 'group' ? 'primary.boxbutton' : 'primary.box'} borderRadius="0" borderWidth="1px" py={0} borderColor="primary.darkbox" h="42px"  w={'25%'} _text={{ fontWeight: '600' }}>Group</Button>
									</>:null}
									{checkInOut?.setting?.show_tickets_checkin_history ? <>
                    <Button onPress={() => { setTab('ticket')}} bg={tab === 'ticket' ? 'primary.boxbutton' : 'primary.box'} borderWidth="1px" py={0} borderColor="primary.darkbox" borderLeftRadius="0" borderRightRadius={8} h="42px"  w={'25%'} _text={{ fontWeight: '600' }}>Ticket</Button>
									</>:null}
									</HStack>

                  {tab !== '' ? 
                  <Box  mb="3" py="3" alignItems={'flex-end'} display={'flex'} w="100%">
                    <Box w={'100%'} maxW={396}>
                      <DateTimePicker key={selectedDate} label={'Date'} initialValue={selectedDate} onChange={(value:any)=> setSelectedDate(value)} showdate={GENERAL_DATE_FORMAT}  />
                    </Box>
                  </Box>
                  :null}
                  

                  {filteredHistory.length > 0 && tab !== ''  ? 
                    <Box  overflow="hidden" w="100%" bg="primary.box" p="0" mb={3} rounded="10">
                        {filteredHistory.map((group,k) => 
                            <CheckinList type={getLogType(group?.first_log)} k={k} key={k} group={group}  />
                        )}
                    </Box>
                  :null}

                  {filteredHistory.length === 0 && tab !== ''  ?
                    <Box overflow="hidden" bg="primary.box" w="100%" rounded="lg" padding={5}>
                      <Text>{event?.labels?.EVENT_NORECORD_FOUND}</Text>
                    </Box>:null
                  }
                  
            </Container>
        )
      }
			<Box width={"100%"} height={"5%"}>
				<BannerAds module_name={'checkIn'} module_type={'listing'} />
			</Box>
    </>
  )
}

export default Index

const getTypeEntityName = (item:any) =>{
    if(item.type_name === 'program'){
        return item.program.info.topic;
    }
    else if(item.type_name === 'group'){
        return item.group.info.name;
    }
    else if(item.type_name === 'ticket'){
        return item.ticket.info.name;
    }
    return item.type_name;
}