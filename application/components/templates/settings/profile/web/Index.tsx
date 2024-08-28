import React, { useEffect } from 'react';
import { Avatar, Box, Center, Divider, Flex, Pressable, View, VStack } from 'native-base'
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
import { useWindowDimensions, Linking } from 'react-native';
import { useRouter } from 'next/router';
import { getColorScheme } from 'application/styles/colors';
const Index = () => {
    const {width}=useWindowDimensions()
	const { response } = UseAuthService();
	const { loadSettingsModules } = UseEventService();
	const RenderHtml = require('react-native-render-html').default;
	const router = useRouter()
	const { _env } = UseEnvService();
	const { event, setting_modules } = UseEventService();
	const colors = getColorScheme(event?.settings?.app_background_color ?? '#343d50', event?.settings?.app_text_mode);
	const mixedStyle = {
		body: {
			fontFamily: 'Avenir',
			fontSize: '14px',
			userSelect: 'auto',
			color: colors.text
		},
		p: {
			fontFamily: 'Avenir',
		}
	}
	useEffect(() => {
		loadSettingsModules();
	}, []);

	// Function to get the first letters of the first and last name
	const getFirstLetters = (name: string) => {
		if (name) {
			const names = name.split(' ');
			return (names[0].substring(0, 1) + names[1].substring(0, 1)).toUpperCase();
		}
		return '';
	};


	return (
		<>
			<NextBreadcrumbs title={'Profile'} />
			<Box bg={'primary.box'} rounded={'10px'} alignItems="center" maxWidth={"100%"}  width={["100%","100%"]}>
				<Box pt={6} px={[3,6]} pb={4}  w={'100%'}>
					<Box    w={'100%'} position={'relative'} alignItems={'center'}>
						{/* {setting_modules && setting_modules?.find((module) => (module?.alias == 'editprofile')) && ( */}
							<Button
								position={'absolute'}
								right={0}
								px={3}
								py={2}
								// leftIcon={<DynamicIcon iconType="editprofile" iconProps={{ width: 16, height: 16, color: func.colorType(event?.settings?.primary_color) }} />}
								leftIcon={<DynamicIcon iconType="editprofile" iconProps={{ width: 16, height: 16}} />}
								top={0}
								colorScheme="primary"
								_text={{ color: "primary.text", fontWeight: 500 }}
								onPress={() => {
									router.push(`/${event.url}/settings/editprofile`)
								}}>
								{response?.event?.labels?.GENERAL_EDIT}
							</Button>
						{/* )} */}

						<Avatar
							size={['130px']}
							source={{
								uri: `${_env.eventcenter_base_url}/assets/attendees/${response?.attendee_detail?.image}`
							}}>
							{getFirstLetters(`${response?.attendee_detail?.first_name} ${response?.attendee_detail?.last_name}`)}
						</Avatar>
						<Text fontWeight={'500'} pt={2} fontSize="lg" textTransform={"capitalize"}>{response?.attendee_detail?.first_name} {response?.attendee_detail?.last_name}</Text>

					</Box>
					<HStack mb={5}   w={'100%'} pt={2} space="3" justifyContent={'center'} alignItems="center">
						{response?.data?.user?.sort_field_setting.map((item: any) => {
							const url = item.name === "twitter"
								? `${response?.attendee_detail.detail?.twitter_protocol}${response?.attendee_detail.detail?.twitter}`
								: item.name === "facebook"
									? `${response?.attendee_detail.detail?.facebook_protocol}${response?.attendee_detail.detail?.facebook}`
									: item.name === "linkedin"
										? `${response?.attendee_detail.detail?.linkedin_protocol}${response?.attendee_detail.detail?.linkedin}`
										: item.name === "website"
										? `${response?.attendee_detail.detail?.website_protocol}${response?.attendee_detail.detail?.website}`
										: null;
							return (
								url && (
									<Pressable
										key={item.name}
										onPress={() => window.open(url, '_blank')}
									>

										{item.name === "twitter" &&
											<View bg={'primary.darkbox'} width={'32px'} height={'32px'} rounded={"sm"} justifyContent={'center'} alignItems={'center'}>
												<DynamicIcon iconType={'xtwiiter'} iconProps={{ width: 16, height: 16 }} />
												{/* <IcoTwitterXsm width={16} height={16} /> */}
											</View>
										}
										{item.name === "facebook" &&
											<View bg={'primary.darkbox'} width={'32px'} height={'32px'} rounded={"sm"} justifyContent={'center'} alignItems={'center'}>
												<DynamicIcon iconType={'facebook'} iconProps={{ width: 16, height: 16 }} />
												{/* <Icon as={Ionicons} color={'primary.text'} name="logo-facebook" size={'md'} /> */}
											</View>
										}
										{item.name === "linkedin" &&
											<View bg={'primary.darkbox'} width={'32px'} height={'32px'} rounded={"sm"} justifyContent={'center'} alignItems={'center'}>
												{/* <Icon as={Ionicons} color={'primary.text'} name="logo-linkedin" size={'md'} /> */}
												<DynamicIcon iconType={'linkedin'} iconProps={{ width: 16, height: 16 }} />
											</View>
										}
									</Pressable>
								)
							);
						})}
					</HStack>
					<HStack space={["3", "10"]} flexWrap={'wrap'} justifyContent={'center'}   width={'100%'} pt={5} borderTopWidth={1} borderTopColor={'primary.bordercolor'} alignItems="center">
						<Center mb={2}>
							{response?.attendee_detail && response?.attendee_detail?.email && (
								<HStack space="2" alignItems="center">
									<DynamicIcon iconType="email" iconProps={{ width: 16, height: 16, color: undefined }} />
									<Text fontSize="sm">{response?.attendee_detail?.email}</Text>
								</HStack>
							)}
						</Center>
						{response?.data?.user && response?.attendee_detail?.phone && (
							<Center mb={2}>
								<HStack space="2" alignItems="center">
									<IcoMobile width={12} height={15} />
									<Text fontSize="sm">{response?.attendee_detail?.phone} </Text>
								</HStack>
							</Center>
								)}
							{response?.data?.user && response?.attendee_detail?.detail?.website && (
							<Center mb={2}>
								<HStack space="2" alignItems="center">
									<IcoWebCircle width={16} height={16} />
									<Text fontSize="sm">{response?.attendee_detail?.detail?.website}</Text>
								</HStack>
							</Center>
						)}
					</HStack>

				</Box>

				<Box  w={'100%'}>
					<Box mb={5} px={5} py={1} bg="primary.darkbox" >
						<Text fontSize="md">{response.event?.labels?.REG_BASIC_INFO}</Text>
					</Box>

					<HStack alignItems={'flex-start'} justifyContent={'flex-start'} mb={4} px={5} space="3" display={['block', 'flex']}   w={'100%'}>
						<Text fontSize="md" fontWeight={500} color={'primary.text'}>{response.event?.labels?.ATTENDEE_ABOUT}</Text>
						<Text>

						<RenderHtml
							defaultTextProps={{ selectable: true }}
							contentWidth={600}
							systemFonts={['Avenir']}
							tagsStyles={mixedStyle}
							source={{ html: response?.attendee_detail?.detail?.about }}
							/>
							</Text>
					</HStack>
				</Box>
				<HStack pb={2} flexWrap={'wrap'} display={['block', 'flex']} px={5}   w={'100%'} space="0" alignItems="flex-start"
				 justifyContent="flex-start">
					<HStack w={['100%', '50%']} mb={4} alignItems="center" space="3" justifyContent="flex-start">
						<Center alignItems={'flex-start'} w={['140px', '180px']}>
							<Text fontWeight={500} fontSize="md">{response.event?.labels?.ATTENDEE_COMPANY_NAME}</Text>
						</Center>
						<Center>
							<Text fontSize="md">{response?.attendee_detail?.detail?.company_name}</Text>
						</Center>
					</HStack>
					<HStack w={['100%', '50%']} mb={4} alignItems="center" space="3" justifyContent="flex-start">
						<Center alignItems={'flex-start'} w={['140px', '180px']}>
							<Text fontWeight={500} fontSize="md">{response.event?.labels?.ATTENDEE_PASSPORT_ISSUE_DATE}</Text>
						</Center>
						<Center>
							<Text fontSize="md">{response?.attendee_detail?.detail?.date_of_issue_passport}</Text>
						</Center>
					</HStack>
					<HStack w={['100%', '50%']} mb={4} alignItems="center" space="3" justifyContent="flex-start">
						<Center alignItems={'flex-start'} w={['140px', '180px']}>
							<Text fontWeight={500} fontSize="md">{response?.event?.labels?.ATTENDEE_LAST_NAME_PASSPORT}</Text>
						</Center>
						<Center>
							<Text fontSize="md">{response?.attendee_detail?.LAST_NAME_PASSPORT}</Text>
						</Center>
					</HStack>
					<HStack w={['100%', '50%']} mb={4} alignItems="center" space="3" justifyContent="flex-start">
						<Center alignItems={'flex-start'} w={['140px', '180px']}>
							<Text fontWeight={500} fontSize="md">{response?.event?.labels?.ATTENDEE_FIRST_NAME}</Text>
						</Center>
						<Center>
							<Text fontSize="md">{response?.attendee_detail?.first_name}</Text>
						</Center>
					</HStack>
					<HStack w={['100%', '50%']} mb={4} alignItems="center" space="3" justifyContent="flex-start">
						<Center alignItems={'flex-start'} w={['140px', '180px']}>
							<Text fontWeight={500} fontSize="md">{response?.event?.labels?.ATTENDEE_LAST_NAME}</Text>
						</Center>
						<Center>
							<Text fontSize="md">{response?.attendee_detail?.last_name}</Text>
						</Center>
					</HStack>
					<HStack w={['100%', '50%']} mb={4} alignItems="center" space="3" justifyContent="flex-start">
						<Center alignItems={'flex-start'} w={['140px', '180px']}>
							<Text fontWeight={500} fontSize="md">{response?.event?.labels?.ATTENDEE_SPOKEN_LANGUAGE}</Text>
						</Center>
						<Center>
							<Text fontSize="md">{response?.attendee_detail?.SPOKEN_LANGUAGE}</Text>
						</Center>
					</HStack>
					<HStack w={['100%', '50%']} mb={4} alignItems="center" space="3" justifyContent="flex-start">
						<Center alignItems={'flex-start'} w={['140px', '180px']}>
							<Text fontWeight={500} fontSize="md">{response?.event?.labels?.ATTENDEE_INTERESTS}</Text>
						</Center>
						<Center>
							<Text fontSize="md">{response?.attendee_detail?.detail?.interests}</Text>
						</Center>
					</HStack>
						{response?.data?.user?.sort_field_setting?.map((item: any) => {
							if (response?.attendee_detail?.attendee_cv && item.name === "resume") {
								return (
									<HStack w={['100%', '50%']} mb={4} alignItems={["flex-start","center"]} space="3"  justifyContent="flex-start" key={item.name}>
										<Center alignItems={'flex-start'} w={['140px', '180px']}>
											<Text fontWeight={500} fontSize="md">Resume:</Text>
										</Center>
										<Center>
											<HStack space="1" alignItems={["flex-start","center"]} flexWrap={'wrap'}>
												<Icon as={AntDesign} color={'primary.text'} name="pdffile1" size={'md'} />
												{item.is_private === 0 ? (
													<HStack space={'2'} flexWrap={'wrap'}  flexDirection={['column',width<=1024?'column':'row']} >
													<Pressable
														onPress={async () => {
															const url = `${_env.eventcenter_base_url}/assets/attendees/cv/${response?.attendee_detail?.attendee_cv}`;
															const supported = await Linking.canOpenURL(url);
															if (supported) {
																await Linking.openURL(url);
															}
														}}>
														<Text color={'primary.500'} textDecorationLine={'underline'} fontSize="sm" isTruncated width={'full'}>
															{response?.attendee_detail?.attendee_cv}
														</Text>
													</Pressable>
														<HStack flexDirection={'row'} space={2} mt={[1,0]}>
														<Text fontSize={'md'}>.</Text>
														
													<Pressable
													onPress={async () => {
														const url = `${_env.eventcenter_base_url}/assets/attendees/cv/${response?.attendee_detail?.attendee_cv}`;
														const supported = await Linking.canOpenURL(url);
														if (supported) {
															await Linking.openURL(url);
														}
													}}
													
													>
														<Text color={'#05E0E0'}  textDecorationLine={'underline'} fontSize="sm">Download</Text>
													</Pressable> 
														</HStack>
													</HStack>
												) : (
													<Text  fontSize="sm">
														{response?.attendee_detail?.attendee_cv}
													</Text>
												)}
											</HStack>
										</Center>
									</HStack>
								);
							} else {
								return null;
							}
						})}
				</HStack>
			</Box>
		</>

	)

}

export default Index


