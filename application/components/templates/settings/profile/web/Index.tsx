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
	const { width } = useWindowDimensions()
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
			<Box bg={'primary.box'} rounded={'10px'} alignItems="center" maxWidth={"100%"} width={["100%", "100%"]}>
             
				<Box pt={6} px={[3, 6]} pb={4} w={'100%'}>
					<Box w={'100%'} position={'relative'} alignItems={'center'}>
						{setting_modules && setting_modules?.find((module) => (module?.alias == 'editprofile')) && (
						<Button
							position={'absolute'}
							right={0}
							px={"18px"}
							py={2}
							// leftIcon={<DynamicIcon iconType="editprofile" iconProps={{ width: 16, height: 16, color: func.colorType(event?.settings?.primary_color) }} />}
							leftIcon={<DynamicIcon iconType="editprofile" iconProps={{ width: 16, height: 16 }} />}
							top={0}
							colorScheme="primary"
							_text={{ color: "primary.text", fontWeight: 500 }}
							onPress={() => {
								router.push(`/${event.url}/settings/editprofile`)
							}}>
							{response?.event?.labels?.GENERAL_EDIT}
						</Button>
						 )}
            <Box>
                {/* Check if the profile picture is present */}
                {response?.data?.user?.sort_field_setting?.some(
                  (item: any) => item.name === 'profile_picture'
                ) ? (
                  <Avatar
                    size={['130px']}
                    source={{
                      uri: `${_env.eventcenter_base_url}/assets/attendees/${response?.attendee_detail?.image}`,
                    }}
                  >
                    {getFirstLetters(
                      `${response?.attendee_detail?.first_name} ${response?.attendee_detail?.last_name}`
                    )}
                  </Avatar>
                ) : (
                  <Avatar
                  size={['130px']}
                  source={{
                    uri: ``,
                  }}
                >
                  {getFirstLetters(
                    `${response?.attendee_detail?.first_name} ${response?.attendee_detail?.last_name}`
                  )}
                </Avatar>
                )}
                    {response?.data?.user?.sort_field_setting?.map((item: any) =>{
                    return (
                      <>
                        <Flex alignItems={'center'} justifyContent={'center'}  width={'100%'}>
                          {item.name === 'first_name' &&  (
                            <Text
                              fontWeight={'500'}
                              pt={2}
                              fontSize="lg"
                              textTransform={'capitalize'}
                            >
                              {
                                response?.attendee_detail?.first_name} {
                                response?.attendee_detail?.last_name}
                            </Text>
                          )}
                   
                        </Flex>
                      </>
                    )
                    })}

              </Box>

					</Box>
					<HStack mb={5} w={'100%'} pt={2} space="3" justifyContent={'center'} alignItems="center">
						{response?.data?.user?.sort_field_setting?.map((item: any) => {
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
												<DynamicIcon iconType={'XtwitterLarge'} iconProps={{ width: 16, height: 16 }} />
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
                     {item.name === "website" &&
											<View bg={'primary.darkbox'} width={'32px'} height={'32px'} rounded={"sm"} justifyContent={'center'} alignItems={'center'}>
												{/* <Icon as={Ionicons} color={'primary.text'} name="logo-linkedin" size={'md'} /> */}
												<IcoWebCircle width={16} height={16} />
											</View>
										}
									</Pressable>
								)
							);
						})}
					</HStack>
					<HStack space={["3", "10"]} flexWrap={'wrap'} justifyContent={'center'} width={'100%'} pt={5} borderTopWidth={1} borderTopColor={'primary.bordercolor'} alignItems="center">
                    {response?.data?.user?.sort_field_setting?.map((item:any)=>{
                        return(
                            <>
                        {item.name === 'email' && (

						<Center mb={2}>
							{response?.attendee_detail && response?.attendee_detail?.email && (
								<HStack space="2" alignItems="center">
									<DynamicIcon iconType="email" iconProps={{ width: 16, height: 16, color: undefined }} />
									<Text fontSize="sm">{response?.attendee_detail?.email}</Text>
								</HStack>
							)}
						</Center>
                        )}

                        {item.name === 'phone' && (
                            
							<Center mb={2}>
						{response?.data?.user && response?.attendee_detail?.phone && (
								<HStack space="2" alignItems="center">
									<IcoMobile width={12} height={15} />
									<Text fontSize="sm">{response?.attendee_detail?.phone} </Text>
								</HStack>
              )}
                            </Center>
                          )}
                          </>
                        )
                     })}
					</HStack>
				</Box>
            {response?.data?.user?.sort_field_setting?.map((item:any)=>{
                return(
            <>
            {item.name === 'bio_info' && (
    <Box w={'100%'}>
      <Box mb={5} px={5} py={1} bg="primary.darkbox" >
        <Text fontSize="md">{response.event?.labels?.REG_BASIC_INFO}</Text>
      </Box>

      <VStack alignItems={'flex-start'} justifyContent={'flex-start'} mb={4} px={5} space="3" display={['block', 'flex']} w={'100%'}>
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
      </VStack>
    </Box>
              )}
            </>
                )
            })}
				<HStack
					pb={2}
					flexWrap={'wrap'}
					display={['block', 'flex']}
					px={5}
					w={'100%'}
					space="0"
					alignItems="flex-start"
					justifyContent="flex-start"
				>
					{response?.data?.user?.sort_field_setting?.map((item: any) => {
						return (
              <>
                {item.name === 'company_name' && (
                  <HStack
                    w={['100%', '50%']}
                    mb={4}
                    alignItems="center"
                    space="3"
                    justifyContent="flex-start"
                  >
                    <Center alignItems={'flex-start'} w={['140px', '180px']}>
                      <Text fontWeight={500} fontSize="md">
                        {response.event?.labels?.ATTENDEE_COMPANY_NAME}
                      </Text>
                    </Center>
                    <Center>
                      <Text fontSize="md">
                        {response?.attendee_detail?.detail?.company_name}
                      </Text>
                    </Center>
                  </HStack>
                )}

                {item.name === 'date_of_issue_passport' && (
                  <HStack
                    w={['100%', '50%']}
                    mb={4}
                    alignItems="center"
                    space="3"
                    justifyContent="flex-start"
                  >
                    <Center alignItems={'flex-start'} w={['140px', '180px']}>
                      <Text fontWeight={500} fontSize="md">
                        {response.event?.labels?.ATTENDEE_PASSPORT_ISSUE_DATE}
                      </Text>
                    </Center>
                    <Center>
                      <Text fontSize="md">
                        {
                          response?.attendee_detail?.detail
                            ?.date_of_issue_passport
                        }
                      </Text>
                    </Center>
                  </HStack>
                )}

                {item.name === 'last_name_passport' && (
                  <HStack
                    w={['100%', '50%']}
                    mb={4}
                    alignItems="center"
                    space="3"
                    justifyContent="flex-start"
                  >
                    <Center alignItems={'flex-start'} w={['140px', '180px']}>
                      <Text fontWeight={500} fontSize="md">
                        {response?.event?.labels?.ATTENDEE_LAST_NAME_PASSPORT}
                      </Text>
                    </Center>
                    <Center>
                      <Text fontSize="md">
                        {response?.attendee_detail?.LAST_NAME_PASSPORT}
                      </Text>
                    </Center>
                  </HStack>
                )}
                {item.name === 'first_name_passport' && (
                  <HStack
                    w={['100%', '50%']}
                    mb={4}
                    alignItems="center"
                    space="3"
                    justifyContent="flex-start"
                  >
                    <Center alignItems={'flex-start'} w={['140px', '180px']}>
                      <Text fontWeight={500} fontSize="md">
                        {response?.event?.labels?.ATTENDEE_FIRST_NAME_PASSPORT}
                      </Text>
                    </Center>
                    <Center>
                      <Text fontSize="md">
                        {response?.attendee_detail?.FIRST_NAME_PASSPORT}
                      </Text>
                    </Center>
                  </HStack>
                )}

                {item.name === 'first_name' && (
                  <HStack
                    w={['100%', '50%']}
                    mb={4}
                    alignItems="center"
                    space="3"
                    justifyContent="flex-start"
                  >
                    <Center alignItems={'flex-start'} w={['140px', '180px']}>
                      <Text fontWeight={500} fontSize="md">
                        {response?.event?.labels?.ATTENDEE_FIRST_NAME}
                      </Text>
                    </Center>
                    <Center>
                      <Text fontSize="md">
                        {response?.attendee_detail?.first_name}
                      </Text>
                    </Center>
                  </HStack>
                )}

                {item.name === 'last_name' && (
                  <HStack
                    w={['100%', '50%']}
                    mb={4}
                    alignItems="center"
                    space="3"
                    justifyContent="flex-start"
                  >
                    <Center alignItems={'flex-start'} w={['140px', '180px']}>
                      <Text fontWeight={500} fontSize="md">
                        {response?.event?.labels?.ATTENDEE_LAST_NAME}
                      </Text>
                    </Center>
                    <Center>
                      <Text fontSize="md">
                        {response?.attendee_detail?.last_name}
                      </Text>
                    </Center>
                  </HStack>
                )}
                {item.name === 'spoken_languages' && (
                  <HStack
                    w={['100%', '50%']}
                    mb={4}
                    alignItems="center"
                    space="3"
                    justifyContent="flex-start"
                  >
                    <Center alignItems={'flex-start'} w={['140px', '180px']}>
                      <Text fontWeight={500} fontSize="md">
                        {response?.event?.labels?.ATTENDEE_SPOKEN_LANGUAGE}
                      </Text>
                    </Center>
                    <Center>
                      <Text fontSize="md">
                        {response?.attendee_detail?.SPOKEN_LANGUAGE}
                      </Text>
                    </Center>
                  </HStack>
                )}
                {item.name === 'interest' && (
                  <HStack
                    w={['100%', '50%']}
                    mb={4}
                    alignItems="center"
                    space="3"
                    justifyContent="flex-start"
                  >
                    <Center alignItems={'flex-start'} w={['140px', '180px']}>
                      <Text fontWeight={500} fontSize="md">
                        {response?.event?.labels?.ATTENDEE_INTERESTS}
                      </Text>
                    </Center>
                    <Center>
                      <Text fontSize="md">
                        {response?.attendee_detail?.detail?.interests}
                      </Text>
                    </Center>
                  </HStack>
                )}
                {item.name === 'pa_country' && (
                  <HStack
                    w={['100%', '50%']}
                    mb={4}
                    alignItems="center"
                    space="3"
                    justifyContent="flex-start"
                  >
                    <Center alignItems={'flex-start'} w={['140px', '180px']}>
                      <Text fontWeight={500} fontSize="md">
                        {response?.event?.labels?.ATTENDEE_PRIVATE_COUNTRY}
                      </Text>
                    </Center>
                    <Center>
                      <Text fontSize="md">
                        {
                          response?.attendee_detail?.detail
                            ?.private_country_name
                        }
                      </Text>
                    </Center>
                  </HStack>
                )}
                {item.name === 'department' && (
                  <HStack
                    w={['100%', '50%']}
                    mb={4}
                    alignItems="center"
                    space="3"
                    justifyContent="flex-start"
                  >
                    <Center alignItems={'flex-start'} w={['140px', '180px']}>
                      <Text fontWeight={500} fontSize="md">
                        {response?.event?.labels?.ATTENDEE_DEPARTMENT}
                      </Text>
                    </Center>
                    <Center>
                      <Text fontSize="md">
                        {response?.attendee_detail?.detail?.department}
                      </Text>
                    </Center>
                  </HStack>
                )}
                {item.name === 'pa_city' && (
                  <HStack
                    w={['100%', '50%']}
                    mb={4}
                    alignItems="center"
                    space="3"
                    justifyContent="flex-start"
                  >
                    <Center alignItems={'flex-start'} w={['140px', '180px']}>
                      <Text fontWeight={500} fontSize="md">
                        {response?.event?.labels?.ATTENDEE_PRIVATE_CITY}
                      </Text>
                    </Center>
                    <Center>
                      <Text fontSize="md">
                        {response?.attendee_detail?.detail?.private_city}
                      </Text>
                    </Center>
                  </HStack>
                )}
                {item.name === 'network_group' && (
                  <HStack
                    w={['100%', '50%']}
                    mb={4}
                    alignItems="center"
                    space="3"
                    justifyContent="flex-start"
                  >
                    <Center alignItems={'flex-start'} w={['140px', '180px']}>
                      <Text fontWeight={500} fontSize="md">
                        {response?.event?.labels?.GENERAL_NETWORK_GROUP}
                      </Text>
                    </Center>
                    <Center>
                      <Text fontSize="md">
                        {response?.attendee_detail?.detail?.network_group}
                      </Text>
                    </Center>
                  </HStack>
                )}
                {item.name === 'pa_post_code' && (
                  <HStack
                    w={['100%', '50%']}
                    mb={4}
                    alignItems="center"
                    space="3"
                    justifyContent="flex-start"
                  >
                    <Center alignItems={'flex-start'} w={['140px', '180px']}>
                      <Text fontWeight={500} fontSize="md">
                        {response?.event?.labels?.ATTENDEE_PRIVATE_POST_CODE}
                      </Text>
                    </Center>
                    <Center>
                      <Text fontSize="md">
                        {response?.attendee_detail?.detail?.private_post_code}
                      </Text>
                    </Center>
                  </HStack>
                )}
                {item.name === 'organization' && (
                  <HStack
                    w={['100%', '50%']}
                    mb={4}
                    alignItems="center"
                    space="3"
                    justifyContent="flex-start"
                  >
                    <Center alignItems={'flex-start'} w={['140px', '180px']}>
                      <Text fontWeight={500} fontSize="md">
                        {response?.event?.labels?.ATTENDEE_ORGANIZATION}
                      </Text>
                    </Center>
                    <Center>
                      <Text fontSize="md">
                        {response?.attendee_detail?.detail?.organization}
                      </Text>
                    </Center>
                  </HStack>
                )}
                {item.name === 'birth_date' && (
                  <HStack
                    w={['100%', '50%']}
                    mb={4}
                    alignItems="center"
                    space="3"
                    justifyContent="flex-start"
                  >
                    <Center alignItems={'flex-start'} w={['140px', '180px']}>
                      <Text fontWeight={500} fontSize="md">
                        {response?.event?.labels?.ATTENDEE_BIRTH_DATE}
                      </Text>
                    </Center>
                    <Center>
                      <Text fontSize="md">
                        {response?.attendee_detail?.BIRTHDAY_YEAR}
                      </Text>
                    </Center>
                  </HStack>
                )}
                {item.name === 'employment_date' && (
                  <HStack
                    w={['100%', '50%']}
                    mb={4}
                    alignItems="center"
                    space="3"
                    justifyContent="flex-start"
                  >
                    <Center alignItems={'flex-start'} w={['140px', '180px']}>
                      <Text fontWeight={500} fontSize="md">
                        {response?.event?.labels?.ATTENDEE_EMPLOYMENT_DATE}
                      </Text>
                    </Center>
                    <Center>
                      <Text fontSize="md">
                        {response?.attendee_detail?.EMPLOYMENT_DATE}
                      </Text>
                    </Center>
                  </HStack>
                )}
                {item.name === 'date_of_expiry_passport' && (
                  <HStack
                    w={['100%', '50%']}
                    mb={4}
                    alignItems="center"
                    space="3"
                    justifyContent="flex-start"
                  >
                    <Center alignItems={'flex-start'} w={['140px', '180px']}>
                      <Text fontWeight={500} fontSize="md">
                        {response?.event?.labels?.ATTENDEE_PASSPORT_EXPIRY_DATE}
                      </Text>
                    </Center>
                    <Center>
                      <Text fontSize="md">
                        {
                          response?.attendee_detail?.detail
                            ?.date_of_expiry_passport
                        }
                      </Text>
                    </Center>
                  </HStack>
                )}
                {item.name === 'gender' && (
                  <HStack
                    w={['100%', '50%']}
                    mb={4}
                    alignItems="center"
                    space="3"
                    justifyContent="flex-start"
                  >
                    <Center alignItems={'flex-start'} w={['140px', '180px']}>
                      <Text fontWeight={500} fontSize="md">
                        {response?.event?.labels?.ATTENDEE_GENDER}
                      </Text>
                    </Center>
                    <Center>
                      <Text fontSize="md">
                        {response?.attendee_detail?.detail?.gender}
                      </Text>
                    </Center>
                  </HStack>
                )}
                {item.name === 'show_industry' && (
                  <HStack
                    w={['100%', '50%']}
                    mb={4}
                    alignItems="center"
                    space="3"
                    justifyContent="flex-start"
                  >
                    <Center alignItems={'flex-start'} w={['140px', '180px']}>
                      <Text fontWeight={500} fontSize="md">
                        {response?.event?.labels?.ATTENDEE_INDUSTRY}
                      </Text>
                    </Center>
                    <Center>
                      <Text fontSize="md">
                        {response?.attendee_detail?.detail?.industry}
                      </Text>
                    </Center>
                  </HStack>
                )}
                {item.name === 'show_job_tasks' && (
                  <HStack
                    w={['100%', '50%']}
                    mb={4}
                    alignItems="center"
                    space="3"
                    justifyContent="flex-start"
                  >
                    <Center alignItems={'flex-start'} w={['140px', '180px']}>
                      <Text fontWeight={500} fontSize="md">
                        {response?.event?.labels?.ATTENDEE_JOB_TASKS}
                      </Text>
                    </Center>
                    <Center>
                      <Text fontSize="md">
                        {response?.attendee_detail?.detail?.jobs}
                      </Text>
                    </Center>
                  </HStack>
                )}
                {item.name === 'passport_no' && (
                  <HStack
                    w={['100%', '50%']}
                    mb={4}
                    alignItems="center"
                    space="3"
                    justifyContent="flex-start"
                  >
                    <Center alignItems={'flex-start'} w={['140px', '180px']}>
                      <Text fontWeight={500} fontSize="md">
                        {response?.event?.labels?.ATTENDEE_PASSPORT_NO}
                      </Text>
                    </Center>
                    <Center>
                      <Text fontSize="md">
                        {response?.attendee_detail?.detail?.passport_no}
                      </Text>
                    </Center>
                  </HStack>
                )}
                {item.name === 'place_of_birth' && (
                  <HStack
                    w={['100%', '50%']}
                    mb={4}
                    alignItems="center"
                    space="3"
                    justifyContent="flex-start"
                  >
                    <Center alignItems={'flex-start'} w={['140px', '180px']}>
                      <Text fontWeight={500} fontSize="md">
                        {response?.event?.labels?.ATTENDEE_PLACE_OF_BIRTH}
                      </Text>
                    </Center>
                    <Center>
                      <Text fontSize="md">
                        {response?.attendee_detail?.detail?.place_of_birth}
                      </Text>
                    </Center>
                  </HStack>
                )}
                {item.name === 'age' && (
                  <HStack
                    w={['100%', '50%']}
                    mb={4}
                    alignItems="center"
                    space="3"
                    justifyContent="flex-start"
                  >
                    <Center alignItems={'flex-start'} w={['140px', '180px']}>
                      <Text fontWeight={500} fontSize="md">
                        {response?.event?.labels?.ATTENDEE_AGE}
                      </Text>
                    </Center>
                    <Center>
                      <Text fontSize="md">
                        {response?.attendee_detail?.detail?.age}
                      </Text>
                    </Center>
                  </HStack>
                )}
                {item.name === 'table_number' && (
                  <HStack
                    w={['100%', '50%']}
                    mb={4}
                    alignItems="center"
                    space="3"
                    justifyContent="flex-start"
                  >
                    <Center alignItems={'flex-start'} w={['140px', '180px']}>
                      <Text fontWeight={500} fontSize="md">
                        {response?.event?.labels?.ATTENDEE_TABLE_NUMBER}
                      </Text>
                    </Center>
                    <Center>
                      <Text fontSize="md">
                        {response?.attendee_detail?.detail?.table_number}
                      </Text>
                    </Center>
                  </HStack>
                )}
                {item.name === 'delegate_number' && (
                  <HStack
                    w={['100%', '50%']}
                    mb={4}
                    alignItems="center"
                    space="3"
                    justifyContent="flex-start"
                  >
                    <Center alignItems={'flex-start'} w={['140px', '180px']}>
                      <Text fontWeight={500} fontSize="md">
                        {response?.event?.labels?.ATTENDEE_DELEGATE_NUMBER}
                      </Text>
                    </Center>
                    <Center>
                      <Text fontSize="md">
                        {response?.attendee_detail?.detail?.delegate_number}
                      </Text>
                    </Center>
                  </HStack>
                )}
                {item.name === 'initial' && (
                  <HStack
                    w={['100%', '50%']}
                    mb={4}
                    alignItems="center"
                    space="3"
                    justifyContent="flex-start"
                  >
                    <Center alignItems={'flex-start'} w={['140px', '180px']}>
                      <Text fontWeight={500} fontSize="md">
                        {response?.event?.labels?.ATTENDEE_INITIAL}
                      </Text>
                    </Center>
                    <Center>
                      <Text fontSize="md">
                        {response?.attendee_detail?.detail?.initial}
                      </Text>
                    </Center>
                  </HStack>
                )}
                {item.name === 'pa_street' && (
                  <HStack
                    w={['100%', '50%']}
                    mb={4}
                    alignItems="center"
                    space="3"
                    justifyContent="flex-start"
                  >
                    <Center alignItems={'flex-start'} w={['140px', '180px']}>
                      <Text fontWeight={500} fontSize="md">
                        {response?.event?.labels?.ATTENDEE_PRIVATE_STREET}
                      </Text>
                    </Center>
                    <Center>
                      <Text fontSize="md">
                        {response?.attendee_detail?.detail?.private_street}
                      </Text>
                    </Center>
                  </HStack>
                )}
                {item.name === 'pa_house_no' && (
                  <HStack
                    w={['100%', '50%']}
                    mb={4}
                    alignItems="center"
                    space="3"
                    justifyContent="flex-start"
                  >
                    <Center alignItems={'flex-start'} w={['140px', '180px']}>
                      <Text fontWeight={500} fontSize="md">
                        House number
                      </Text>
                    </Center>
                    <Center>
                      <Text fontSize="md">
                        {
                          response?.attendee_detail?.detail
                            ?.private_house_number
                        }
                      </Text>
                    </Center>
                  </HStack>
                )}
                {item.name === 'title' && (
                  <HStack
                    w={['100%', '50%']}
                    mb={4}
                    alignItems="center"
                    space="3"
                    justifyContent="flex-start"
                  >
                    <Center alignItems={'flex-start'} w={['140px', '180px']}>
                      <Text fontWeight={500} fontSize="md">
                        {response?.event?.labels?.ATTENDEE_TITLE}
                      </Text>
                    </Center>
                    <Center>
                      <Text fontSize="md">
                        {response?.attendee_detail?.detail?.title}
                      </Text>
                    </Center>
                  </HStack>
                )}
                {item.name === 'show_custom_field' && (
                  <HStack
                    w={['100%', '50%']}
                    mb={4}
                    alignItems="center"
                    space="3"
                    justifyContent="flex-start"
                  >
                    <Center alignItems={'flex-start'} w={['140px', '180px']}>
                      <Text fontWeight={500} fontSize="md">
                        {response?.event?.labels?.ATTENDEE_CUSTOM_FIELDS}
                      </Text>
                    </Center>
                    <Center>
                      {response?.data?.user.attendee_custom_field?.map(
                        (item: any, key: number) => (
                          <Text fontSize="md" key={key}>
                            {item.children_recursive.length > 0 ? (
                              item.children_recursive.map(
                                (child: any, index: number) => (
                                  <Text key={index}>{child.name}</Text>
                                )
                              )
                            ) : (
                              ''
                            )}
                          </Text>
                        )
                      )}
                    </Center>
                  </HStack>
                )}
                {item.name == 'resume' && (
                  <HStack
                    w={['100%', '50%']}
                    mb={4}
                    alignItems={['flex-start', 'center']}
                    space="3"
                    justifyContent="flex-start"
                    key={item.name}
                  >
                    <Center alignItems={'flex-start'} w={['140px', '180px']}>
                      <Text fontWeight={500} fontSize="md">
                        Resume:
                      </Text>
                    </Center>
                    <Center>
                      <HStack
                        space="1"
                        alignItems={['flex-start', 'center']}
                        flexWrap={'wrap'}
                      >
                        <Icon
                          as={AntDesign}
                          color={'primary.text'}
                          name="pdffile1"
                          size={'md'}
                        />
                        {item.is_private === 0 ? (
                          <HStack
                            space={'2'}
                            flexWrap={'wrap'}
                            alignItems={'center'}
                            flexDirection={[
                              'column',
                              width <= 1024 ||
                              response?.attendee_detail?.attendee_cv.length < 50
                                ? 'column'
                                : 'row',
                            ]}
                          >
                           
                              <Text
                                fontSize="sm"
                                width={'100%'}
                                textBreakStrategy="balanced"
                              >
                                {response?.attendee_detail?.attendee_cv.replace(/[0-9_]/g, '')}
                              </Text>
                            <HStack flexDirection={'row'} space={2} mt={[1, 0]}>
                              <Text fontSize={'md'}>.</Text>
                              <Pressable
                                 onPress={async () => {
                                  const url = `${_env.eventcenter_base_url}/assets/attendees/cv/${response?.attendee_detail?.attendee_cv}`
                                  const supported = await Linking.canOpenURL(url)
                                  if (supported) {
                                    await Linking.openURL(url)
                                  }
                                }}
                              >
                                <Text
                                  color={'#05E0E0'}
                                  textDecorationLine={'underline'}
                                  fontSize="sm"
                                 
                                >
                                  Download
                                </Text>
                              </Pressable>
                            </HStack>
                          </HStack>
                        ) : (
                          <Text fontSize="sm">
                            {response?.attendee_detail?.attendee_cv}
                          </Text>
                        )}
                      </HStack>
                    </Center>
                  </HStack>
                )}
              </>
            )
					})}
				</HStack>
               
			</Box>
		</>

	)

}

export default Index


