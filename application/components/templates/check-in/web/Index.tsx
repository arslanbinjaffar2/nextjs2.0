import React from 'react'
import { Box, Button, Center, Container, HStack, Icon, IconButton, Image, Spacer, Text, VStack } from 'native-base';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import UseCheckInOutService from 'application/store/services/UseCheckInOutService';
import WebLoading from 'application/components/atoms/WebLoading';
import UseLoadingService from 'application/store/services/UseLoadingService';
import moment from 'moment';
import in_array from "in_array";

const CheckinList = (type:any) => {
	const [toggle, settoggle] = React.useState(false)
	return (
		<Box borderBottomColor={'primary.bordercolor'} borderBottomWidth={1} p={3} alignItems="center">
			<HStack w={'100%'} space="0">
					<Center alignItems={'flex-start'} justifyContent={'flex-start'} w={'calc(100% - 130px)'}>
						<Text  fontWeight={500} mb={1} fontSize="md">Forældrebegivenhed Lead 2.0</Text>
						<VStack w={'100%'}  space="1">
							<HStack  space="2" alignItems="center">
								<Icon color={'primary.text'} as={SimpleLineIcons} name="calendar"  />
								<Text  fontSize="sm">21 May 2021 - 24 Dec 2023</Text>
							</HStack>
							<HStack  space="2" alignItems="center">
								<Icon color={'primary.text'} as={SimpleLineIcons} name="clock"  />
								<Text  fontSize="sm">10:45 - 12:45</Text>
							</HStack>
						</VStack>
						
					</Center>
					<Center pr={4}>
						<HStack  space="2" alignItems="center" justifyContent={'flex-start'}>
							<Box lineHeight={1} bg={ type?.type === 'checkin' ? 'success.500' : 'danger.500'} p="1" rounded={4}>
								{type?.type === 'checkin' && <Icon size={'sm'} lineHeight={1} color={'white'} as={SimpleLineIcons} name="login"  />}
								{type?.type === 'checkout' && <Icon size={'sm'} lineHeight={1} color={'white'} as={SimpleLineIcons} name="logout"  />}
							</Box>
							<Center justifyContent={'flex-start'} alignItems={'flex-start'}>
								<Text fontSize="sm">21/08/2022</Text>
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
			{toggle && <Box my={3}  w={'100%'} bg="primary.box"  rounded="lg">
				{[...Array(3)].map(list =>  <HStack  py="2" px={3} borderBottomColor={'primary.bordercolor'} borderBottomWidth={1}  space="0" alignItems="flex-start">
						<HStack  space="2" alignItems="center" justifyContent={'flex-start'}>
							<Box lineHeight={1} bg={'success.500'} p="1" rounded={4}>
								<Icon size={'sm'} lineHeight={1} color={'white'} as={SimpleLineIcons} name="login"  />
							</Box>
							<Center justifyContent={'flex-start'} alignItems={'flex-start'}>
								<Text fontSize="sm">21/08/2022</Text>
								<Text fontSize="sm">12:45:28</Text>
								
							</Center>
							
						</HStack>
						<Spacer />
						<HStack  space="2" alignItems="center" justifyContent={'flex-start'}>
							<Box lineHeight={1} bg={'danger.500'} p="1" rounded={4}>
								<Icon size={'sm'} lineHeight={1} color={'white'} as={SimpleLineIcons} name="logout"  />
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
    
  const { FetchCheckInOut, checkInOut, SendQRCode }  = UseCheckInOutService();
  React.useEffect(() => {  
    FetchCheckInOut();
  }, [])

  const [tab, setTab] = React.useState<'event'| 'program' | 'group' | 'ticket'>('event');

  
  return (
    <>
      {
        loading ? (
            <WebLoading />
        ):(
            <Container pt="1" maxW="100%" w="100%">
                <Text mb="3" textTransform="uppercase" fontSize="2xl">Session check-in</Text>
                <Box mb="3" w="100%" bg="primary.box" p="5" rounded="10">
                <HStack space="3" alignItems="center">
                    <Text fontSize="lg">My ticket for </Text>
                    <Spacer />
                    {in_array('checkin-send-qr-code', processing) ?  <WebLoading/> : <IconButton
                        variant="transparent"
                        p="1"
                        icon={<Icon size="md" as={SimpleLineIcons} name="envelope" color="white" />}
                        onPress={() => {
                            SendQRCode();
                        }}
                    />}
                   
                </HStack>
                {checkInOut?.setting?.self_checkin && <>
                        <Box mx="auto" w="190px" h="190px" bg="primary.darkbox" p="3" rounded="10">
                        <Image
                        source={{
                            uri: checkInOut?.qrCodeImgSrc
                        }}
                        alt="Alternate Text"
                        w="164px"
                        h="164px"
                        rounded="10"
                        />
                    </Box>
                    <HStack space="0" alignItems="center" justifyContent={'center'} pt={4}>
                        <Button
                            px={4} py={2}
                            fontSize={'lg'}
                            shadow={3}
                            colorScheme="primary"
                            minW={190}
                            onPress={()=>{
                                console.log('hello')
                            }}
                        
                        >
                            Scan to Checkin
                        </Button>
                    </HStack>
                    
                </>}
                </Box>
                <Image
                mb="3"
                rounded="10"
                source={{
                    uri: 'https://wallpaperaccess.com/full/206501.jpg'
                }}
                alt="Alternate Text"
                w="100%"
                h="144px"
                />
                <HStack mb="3" space={1} justifyContent="center" px={3} w="100%">
                    <Button onPress={() => { setTab('event') }} bg={tab === 'event' ? 'primary.darkbox' : 'primary.box'} borderWidth="1px" py={0} borderColor="primary.darkbox" borderRightRadius="0" borderLeftRadius={8} h="42px"  w={'25%'} _text={{ fontWeight: '600' }}>Event</Button>
                    <Button onPress={() => { setTab('program')}} bg={tab === 'program' ? 'primary.darkbox' : 'primary.box'} borderRadius="0" borderWidth="1px" py={0} borderColor="primary.darkbox" h="42px"  w={'25%'} _text={{ fontWeight: '600' }}>Program</Button>
                    <Button onPress={() => { setTab('group')}} bg={tab === 'group' ? 'primary.darkbox' : 'primary.box'} borderRadius="0" borderWidth="1px" py={0} borderColor="primary.darkbox" h="42px"  w={'25%'} _text={{ fontWeight: '600' }}>Group</Button>
                    <Button onPress={() => { setTab('ticket')}} bg={tab === 'ticket' ? 'primary.darkbox' : 'primary.box'} borderWidth="1px" py={0} borderColor="primary.darkbox" borderLeftRadius="0" borderRightRadius={8} h="42px"  w={'25%'} _text={{ fontWeight: '600' }}>Ticket</Button>
                </HStack>
                <Box  overflow="hidden" h="100%" w="100%" bg="primary.box" p="0" mb={3} rounded="10">
									 {[...Array(3)].map(item => 
											 <CheckinList type="checkin" key={item}  />
										)}
									 {[...Array(3)].map(item => 
											 <CheckinList type="checkout" key={item}  />
										)}
                </Box>
                
                 <HStack w="100%" space="0">
                    <Box pb="3" overflow="hidden" h="100%" w="49%" bg="primary.box" p="0" rounded="10">
                        <Text mb="3" bg="primary.darkbox" py="1" px="3" fontSize="lg">CHECK IN</Text>
                        <VStack space="1">
                        {checkInOut?.type_history[tab]?.map((item)=>(<HStack px="3" space="4" alignItems="center">
                            <Text fontSize="md">{getTypeEntityName(item)} {(item.checkin !== '' && item.checkin !== '0000-00-00 00:00:00') ? moment(item.checkin).format('DD/mm/yyyy HH:mm:ss') : '---'}</Text>
                        </HStack>))}
                        </VStack>
                    </Box>
                    <Spacer />
                    <Box pb="3" overflow="hidden" h="100%" w="49%" bg="primary.box" p="0" rounded="10">
                        <Text mb="3" bg="primary.darkbox" py="1" px="3" fontSize="lg">CHECK OUT</Text>
                        <VStack space="1">
                        {checkInOut?.type_history[tab]?.map((item)=>(<HStack px="3" space="4" alignItems="center">
                            <Text fontSize="md">{(item.checkout !== '' && item.checkout !== '0000-00-00 00:00:00') ? moment(item.checkout).format('DD/mm/yyyy HH:mm:ss') : " ---"}</Text>
                        </HStack>))}
                        </VStack>
                    </Box>
                </HStack>
            </Container>
        )
      }
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