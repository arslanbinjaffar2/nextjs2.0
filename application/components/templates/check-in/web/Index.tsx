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
import UseBannerService from 'application/store/services/UseBannerService'
import { Banner } from 'application/models/Banner'
import UseEnvService from 'application/store/services/UseEnvService'
import UseEventService from 'application/store/services/UseEventService';
import {GENERAL_DATE_FORMAT, GENERAL_DATETIME_FORMAT} from 'application/utils/Globals'

const CheckinList = ({type, k}: any) => {
	const [toggle, settoggle] = React.useState(false);
  console.log(k)
	return (
		<Box borderTopColor={'primary.bordercolor'} borderTopWidth={k === 0 ? 0 : 1} p={3} pl={4} alignItems="center">
			<HStack w={'100%'} space="0">
					<Center alignItems={'flex-start'} justifyContent={'flex-start'} w={'calc(100% - 130px)'}>
						<Text  fontWeight={500} mb={1} fontSize="md">Forældrebegivenhed Lead 2.0</Text>
						<VStack w={'100%'}  space="1">
							<HStack  space="2" alignItems="center">
								<Icon color={'primary.text'} as={SimpleLineIcons} name="calendar"  />
								<Text  fontSize="sm" fontWeight={500}>21 May 2021 - 24 Dec 2023</Text>
							</HStack>
							<HStack  space="2" alignItems="center">
								<Icon color={'primary.text'} as={SimpleLineIcons} name="clock"  />
								<Text  fontSize="sm">10:45 - 12:45</Text>
							</HStack>
						</VStack>
						
					</Center>
					<Center pr={4}>
						<HStack  space="2" alignItems="center" justifyContent={'flex-start'}>
							<Box lineHeight={1} bg={ type === 'checkin' ? 'success.500' : 'danger.500'} p="1" rounded={4}>
								{type === 'checkin' && <IcoCheckin />}
								{type === 'checkout' && <IcoCheckout />}
							</Box>
							<Center justifyContent={'flex-start'} alignItems={'flex-start'}>
								<Text fontSize="sm" fontWeight={500}>21/08/2022</Text>
								<Text fontSize="sm">12:45:28</Text>
								
							</Center>
							
						</HStack>
						
						
					</Center>
					<Spacer />
						<IconButton
							variant="unstyled"
							p={0}
							icon={<Icon size="md" as={SimpleLineIcons} name={toggle ? 'arrow-down' : 'arrow-right'} color="white" />}
							onPress={()=>{
								settoggle(!toggle)
							}}
							
						/>
			</HStack>
			{toggle && <Box my={3}  w={'100%'} bg="primary.darkbox"  rounded="lg">
				{[...Array(3)].map((list,i) =>  <HStack  py="2" px={3} borderTopColor={'primary.bordercolor'} borderTopWidth={i===0?0:1}  space="0" alignItems="flex-start">
						<HStack  space="2" alignItems="center" justifyContent={'flex-start'}>
							<Box lineHeight={1} bg={'success.500'} p="1" rounded={4}>
								<IcoCheckin />
							</Box>
							<Center justifyContent={'flex-start'} alignItems={'flex-start'}>
								<Text fontSize="sm">21/08/2022</Text>
								<Text fontSize="sm">12:45:28</Text>
								
							</Center>
							
						</HStack>
						<Spacer />
						<HStack  space="2" alignItems="center" justifyContent={'flex-start'}>
							<Box lineHeight={1} bg={'danger.500'} p="1" rounded={4}>
								<IcoCheckout />
							</Box>
							<Center justifyContent={'flex-start'} alignItems={'flex-start'}>
								<Text fontSize="sm">21/08/2022</Text>
								<Text fontSize="sm">12:45:28</Text>
								
							</Center>
							
						</HStack>
				</HStack>)}
				

			</Box>}
			
		</Box>
	)
}

const Index = () => {
    const { loading, processing } = UseLoadingService();
  const { _env } = UseEnvService()
  const { event, modules } = UseEventService()

  const { FetchCheckInOut, checkInOut, SendQRCode }  = UseCheckInOutService();
  React.useEffect(() => {  
    FetchCheckInOut();
  }, [])
  const { banners, FetchBanners} = UseBannerService();
  const [filteredBanners, setFilteredBanners] = React.useState<Banner[]>([]);
  const [tab, setTab] = React.useState<'event'| 'program' | 'group' | 'ticket'>('event');

  useEffect(()=>{
    const filteredBanner=banners.filter((banner  : Banner)=>{
      return banner.module_name == 'checkIn' && banner.module_type == 'listing'
    })

    setFilteredBanners(filteredBanner);
  },[banners]);
  React.useEffect(() => {
    FetchBanners();
  }, []);
  return (
    <>
      {
        loading ? (
            <WebLoading />
        ):(
            <Container pt="1" maxW="100%" w="100%">
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
                      <IconButton
                          variant="transparent"
                          p="1"
                          icon={<IcoClipboard />}
                          onPress={() => {
                              console.log('first')
                          }}
                      />
                    </HStack>
                    
                    }
									</>:null}
								</HStack>
							<Spacer />
							{!checkInOut?.setting?.self_checkin && checkInOut?.setting?.enable_email_ticket ? <>
								<Box >
									{in_array('checkin-send-qr-code', processing) ?
										<WebLoading/>
										:
										<IconButton
											variant="transparent"
											p="1"
											icon={<Icon size="md" as={SimpleLineIcons} name="envelope" color="white" />}
											onPress={SendQRCode}
										/>
									}
								</Box>
							</>:null}
							</Box>
							{checkInOut?.setting?.self_checkin ? <>
                <Box mb="3" w="100%" bg="primary.box" p="5" rounded="10">

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
                    <HStack space="0" alignItems="center" justifyContent={'center'} pt={4}>
                        <Button
                            px={4}
                            py={2}
                            shadow={3}
                            colorScheme="primary"
                            minW={190}
                            onPress={()=>{
                                console.log('hello')
                            }}
                        
                        >
                            <Text fontSize="xl" fontWeight={600}>Scan to Checkin</Text>
                        </Button>
                    </HStack>
                </Box>
							</>:null}
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
                    <Button onPress={() => { setTab('event') }} bg={tab === 'event' ? 'primary.boxbutton' : 'primary.box'} borderWidth="1px" py={0} borderColor="primary.darkbox" borderRightRadius="0" borderLeftRadius={8} h="42px"  w={'25%'} _text={{ fontWeight: '600' }}>Event</Button>
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
                <Box  mb="3" py="3" alignItems={'flex-end'} display={'flex'} w="100%">
                  <Box w={'100%'} maxW={396}>
                    <DateTimePicker label={'Date'} showdate={GENERAL_DATE_FORMAT}  />
                  </Box>
                
							</Box>
                <Box  overflow="hidden" w="100%" bg="primary.box" p="0" mb={3} rounded="10">
									 {[...Array(3)].map((item,k) => 
											 <CheckinList type="checkin" k={k} key={item}  />
										)}
									 {[...Array(3)].map((item,k) => 
											 <CheckinList type="checkout" k={k} key={item}  />
										)}
                </Box>
                
                 {/* <HStack w="100%" space="0">
                    <Box pb="3" overflow="hidden" h="100%" w="49%" bg="primary.box" p="0" rounded="10">
                        <Text mb="3" bg="primary.darkbox" py="1" px="3" fontSize="lg">CHECK IN</Text>
                        <VStack space="1">
                        {checkInOut?.type_history[tab]?.map((item)=>(<HStack px="3" space="4" alignItems="center">
                            <Text fontSize="md">{getTypeEntityName(item)} {(item.checkin !== '' && item.checkin !== '00-00-0000 00:00:00') ? moment(item.checkin).format(GENERAL_DATETIME_FORMAT) : '---'}</Text>
                        </HStack>))}
                        </VStack>
                    </Box>
                    <Spacer />
                    <Box pb="3" overflow="hidden" h="100%" w="49%" bg="primary.box" p="0" rounded="10">
                        <Text mb="3" bg="primary.darkbox" py="1" px="3" fontSize="lg">CHECK OUT</Text>
                        <VStack space="1">
                        {checkInOut?.type_history[tab]?.map((item)=>(<HStack px="3" space="4" alignItems="center">
                            <Text fontSize="md">{(item.checkout !== '' && item.checkout !== '00-00-0000 00:00:00') ? moment(item.checkout).format(GENERAL_DATETIME_FORMAT) : " ---"}</Text>
                        </HStack>))}
                        </VStack>
                    </Box>
                </HStack> */}
            </Container>
        )
      }
      <Box width={"100%"}>
        {filteredBanners.map((banner, k) =>
          <Image
            key={k}
            source={{ uri: `${_env.eventcenter_base_url}/assets/banners/${banner.image}` }}
            alt="Image"
            width="100%"
            height="100%"
          />
        )}
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