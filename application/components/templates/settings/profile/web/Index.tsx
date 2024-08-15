import React, { useEffect } from 'react';
import { Avatar, Box, Center, Divider, Flex, Pressable, VStack } from 'native-base'
import { Button, Container, HStack, Icon, Input, Spacer, Text } from 'native-base';
import DynamicIcon from 'application/utils/DynamicIcon';
import UseAuthService from 'application/store/services/UseAuthService';
import UseEnvService from 'application/store/services/UseEnvService';
import UseEventService from 'application/store/services/UseEventService';
import NextBreadcrumbs from 'application/components/atoms/NextBreadcrumbs';
import Ionicons from '@expo/vector-icons/Ionicons';
import IcoTwitterXsm from 'application/assets/icons/small/IcoTwitterXsm';
import { func } from 'application/styles';
import AntDesign from '@expo/vector-icons/AntDesign';
import IcoWebCircle from 'application/assets/icons/small/IcoWebCircle';
import IcoMobile from 'application/assets/icons/small/IcoMobile';


const Index = () => {
    const {response} = UseAuthService();
    const { loadSettingsModules } = UseEventService();
    const { _env } = UseEnvService();
		const { event } = UseEventService();

    useEffect(() => {
        loadSettingsModules();
    }, []);
    
    // Function to get the first letters of the first and last name
    const getFirstLetters = (name: string) => {
    if(name){
        const names = name.split(' ');
        return (names[0].substring(0, 1) + names[1].substring(0, 1)).toUpperCase();
    }
    return '';
    };
    

    return (
        <>
        <NextBreadcrumbs title={'Profile'} />
        <Box bg={'primary.box'}  rounded={'10px'}   alignItems="center" width="100%">
					<Box p={6} pb={4}  w={'100%'}>
						<Box w={'100%'} position={'relative'} alignItems={'center'}>
							<Button
								position={'absolute'}
								right={0}
								px={3}
								py={2}
								leftIcon={<DynamicIcon iconType="editprofile" iconProps={{ width: 16, height: 16,color: func.colorType(event?.settings?.primary_color) }} />}
								top={0}
								colorScheme="primary"
								_text={{color: 'primary.hovercolor',fontWeight: 500}}
								onPress={()=>{
									console.log('hello')
								}}
							
							>
								Edit
							</Button>
							
							<Avatar
								size={'130px'}
								source={{
								uri: `${_env.eventcenter_base_url}/assets/attendees/${response?.attendee_detail?.image}`
								}}>
								{getFirstLetters(`${response?.data?.user?.first_name} ${response?.data?.user?.last_name}`)}
							</Avatar>
							<Text fontWeight={'500'} pt={2} fontSize="lg" textTransform={"capitalize"}>{response?.data?.user?.first_name} {response?.data?.user?.last_name}</Text> 
							
						</Box>
						<HStack mb={5} w={'100%'}  pt={2} space="3" justifyContent={'center'} alignItems="center">
								<Box width={'32px'} h={'32px'}  bg="primary.darkbox" rounded="3" alignItems={'center'} justifyContent={'center'}>
									<IcoTwitterXsm width={16} height={16} />
							</Box>
							<Box width={'32px'} h={'32px'}  bg="primary.darkbox" rounded="3" alignItems={'center'} justifyContent={'center'}>
									<Icon as={Ionicons} color={'primary.text'} name="logo-facebook" size={'md'} />
							</Box>
							<Box width={'32px'} h={'32px'}  bg="primary.darkbox" rounded="3" alignItems={'center'} justifyContent={'center'}>
									<Icon as={Ionicons} color={'primary.text'} name="logo-linkedin" size={'md'} />
							</Box>
						</HStack>
						<HStack  space={["3","10"]} flexWrap={'wrap'} justifyContent={'center'} width={'100%'} pt={5} borderTopWidth={1} borderTopColor={'primary.bordercolor'} alignItems="center">
							<Center mb={2}>
								<HStack  space="2" alignItems="center">
									<DynamicIcon iconType="email" iconProps={{ width: 16, height: 16,color: undefined }} />
									<Text fontSize="sm">demo@eventbuizz.com</Text>
								</HStack>
								
							</Center>
							<Center mb={2}>
								<HStack  space="2" alignItems="center">
									<IcoMobile width={12} height={15} />
									<Text fontSize="sm">(024) 5213 5123</Text>
								</HStack>
							</Center>
							<Center mb={2}>
								<HStack  space="2" alignItems="center">
									<IcoWebCircle width={16} height={16} />
									<Text fontSize="sm">https://google.com</Text>
								</HStack>
							</Center>
						</HStack>
						
					</Box>

					<Box  w={'100%'}>
						<Box mb={5} px={5} py={1} bg="primary.darkbox" >
							<Text  fontSize="md">Basic information</Text>
						</Box>
						
						<HStack alignItems={'flex-start'} justifyContent={'flex-start'} mb={4} px={5} space="3" display={['block','flex']} w={'100%'}>
							<Text fontSize="md"  fontWeight={500} color={'primary.text'}>About</Text>
							<Text fontSize="sm" color={'primary.text'}>A personal profile provides a succinct overview of an individual’s key attributes, background, and aspirations. It typically includes essential details such as the person’s name, current occupation, educational qualifications, and significant accomplishments. The profile might also highlight personal strengths, skills, and career goals, offering insight into their professional journey and personal values.</Text>
						</HStack>
					</Box>
					<HStack pb={2} flexWrap={'wrap'} display={['block','flex']} px={5} w={'100%'}  space="0" alignItems="flex-start" justifyContent="flex-start">
						<HStack w={['100%','50%']} mb={4} alignItems="center"  space="3" justifyContent="flex-start">
							<Center alignItems={'flex-start'} w={['140px','180px']}>
								<Text fontWeight={500} fontSize="md">Company name:</Text>
							</Center>
							<Center>
								<Text fontSize="md">Eventbuizz</Text>
							</Center>
						</HStack>
						<HStack w={['100%','50%']}  mb={4} alignItems="center"  space="3" justifyContent="flex-start">
							<Center alignItems={'flex-start'} w={['140px','180px']}>
								<Text fontWeight={500} fontSize="md">Company name:</Text>
							</Center>
							<Center>
								<Text fontSize="md">Company name</Text>
							</Center>
						</HStack>
						<HStack w={['100%','50%']}  mb={4} alignItems="center"  space="3" justifyContent="flex-start">
							<Center alignItems={'flex-start'} w={['140px','180px']}>
								<Text fontWeight={500} fontSize="md">Date of issue passport:</Text>
							</Center>
							<Center>
								<Text fontSize="md">11-08-2024</Text>
							</Center>
						</HStack>
						<HStack w={['100%','50%']}  mb={4} alignItems="center"  space="3" justifyContent="flex-start">
							<Center alignItems={'flex-start'} w={['140px','180px']}>
								<Text fontWeight={500} fontSize="md">Last name (passport):</Text>
							</Center>
							<Center>
								<Text fontSize="md">Danish</Text>
							</Center>
						</HStack>
						<HStack w={['100%','50%']}  mb={4} alignItems="center"  space="3" justifyContent="flex-start">
							<Center alignItems={'flex-start'} w={['140px','180px']}>
								<Text fontWeight={500} fontSize="md">First Name:</Text>
							</Center>
							<Center>
								<Text fontSize="md">Stephen</Text>
							</Center>
						</HStack>
						<HStack w={['100%','50%']}  mb={4} alignItems="center"  space="3" justifyContent="flex-start">
							<Center alignItems={'flex-start'} w={['140px','180px']}>
								<Text fontWeight={500} fontSize="md">Last Name:</Text>
							</Center>
							<Center>
								<Text fontSize="md">Hendry</Text>
							</Center>
						</HStack>
						<HStack w={['100%','50%']}  mb={4} alignItems="center"  space="3" justifyContent="flex-start">
							<Center alignItems={'flex-start'} w={['140px','180px']}>
								<Text fontWeight={500} fontSize="md">Spoken languages:</Text>
							</Center>
							<Center>
								<Text fontSize="md">English, Danish, French</Text>
							</Center>
						</HStack>
						<HStack w={['100%','50%']}  mb={4} alignItems="center"  space="3" justifyContent="flex-start">
							<Center alignItems={'flex-start'} w={['140px','180px']}>
								<Text fontWeight={500} fontSize="md">Interest:</Text>
							</Center>
							<Center>
								<Text fontSize="md">Shooting</Text>
							</Center>
						</HStack>
						<HStack w={['100%','50%']}  mb={4} alignItems="center"  space="3" justifyContent="flex-start">
							<Center alignItems={'flex-start'} w={['140px','180px']}>
								<Text fontWeight={500} fontSize="md">Resume:</Text>
							</Center>
							<Center>
								<HStack  space="1" alignItems="center">
									<Icon as={AntDesign} color={'primary.text'} name="pdffile1" size={'md'} />
									<Text fontSize="sm">Resume.pdf</Text>
									
									<Text px={1} fontSize="md">.</Text>
									<Text color={'primary.500'} textDecorationLine={'underline'} fontSize="sm">Download</Text>
								</HStack>
								
							</Center>
						</HStack>
						

					</HStack>
					
					
					
				</Box>
        </>
        
    )

}

export default Index


