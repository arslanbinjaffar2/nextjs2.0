import React from 'react'
import { Box, HStack, Icon, Spacer, Text, VStack, ZStack, Button, IconButton, Pressable, Popover } from 'native-base'
import DynamicIcon from 'application/utils/DynamicIcon';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Sponsor, Category } from 'application/models/sponsor/Sponsor'
import UseSponsorService from 'application/store/services/UseSponsorService';
import { useRouter } from 'solito/router'
import UseEventService from 'application/store/services/UseEventService';
import { Linking } from 'react-native';

type AppProps = {
    sponsor: Sponsor,
    border: number
}

const RectangleView = ({ border, sponsor }: AppProps) => {

    const { settings, MakeFavourite } = UseSponsorService();

    const { push } = useRouter()

    const { event } = UseEventService()

    return (
        <Box w="100%" borderBottomWidth={border} borderColor="primary.bordercolor" py="3">
            <Pressable
                onPress={async () => {
                    if(sponsor?.url && sponsor?.url !== '' && sponsor.url !== 'http://' && sponsor.url !== 'https://'){
                        const url: any = `${sponsor?.url}`;
                        const supported = await Linking.canOpenURL(url);
                        if (supported) {
                            await Linking.openURL(url);
                        }}
                    else{
                        push(`/${event.url}/sponsors/detail/${sponsor.id}`)
                    }
                }}>
                <HStack pl={["15px",'15px', '25px']} alignItems="center" minH="55px" space={0} justifyContent="flex-start">
                    {/* {event?.sponsor_settings?.catTab == 1 && <Box position="absolute" left="0" top="0" w="15px">
                        <ZStack>
                            {sponsor.categories.length > 0 && sponsor.categories.map((category: Category, i: number) =>
                                <Box key={i} bg={`${category.color}`} borderWidth="1" borderColor="primary.darkbox" w="15px" mt={`${i * 10}px`} h={`${55 - (i * 10)}px`} borderRightRadius="10" shadow={2} />
                            )}
                        </ZStack>
                    </Box>} */}
                    <HStack pt="0" w="100%" space="4" alignItems="center">
                        <VStack marginRight={'auto'} w="calc(100% - 180px);" space="0">
                            <Text fontSize="lg" lineHeight="22px">
                                {sponsor.name}
                            </Text>
														{settings?.catTab == 1 &&  sponsor.categories.length > 0 && 
														<HStack flexWrap={'wrap'} mt="2" space={1}>
																{settings?.catTab == 1 &&  sponsor.categories.length > 0 && sponsor.categories.slice(0, 3).map((category: Category, i: number) =>(
																		<Box borderWidth={1} borderColor={'primary.box'} mb="5px" key={i} px={3} py={1} bg={category?.color} rounded={'full'}>
																				<Text fontSize="sm">{`${category.info.name}`}</Text>
																		</Box>
																))}
                            {settings?.catTab == 1 &&  sponsor.categories.length > 3 &&
														<>
															
															<Popover
																trigger={(triggerProps) => {
																return <Button
																				mb="5px"
																				lineHeight={1}
																				bg={'transparent'}
																				p={1}
																				rounded={'full'}
																				{...triggerProps}
																			>
																				<Text  fontSize="sm">{`+${ sponsor.categories.length - 3}`}</Text>
																			</Button>
																		}}>
																<Popover.Content bgColor={'primary.500'}>
																	<Popover.Arrow bgColor={'primary.500'} />
																	<Popover.Body borderTopWidth="0" bgColor={'primary.500'}>
																	<HStack flexWrap={'wrap'} maxW={350} minW={240} space={1}>
																		{sponsor.categories.length > 3 && sponsor.categories.slice(3).map((category: Category, i: number) =>(
                                        <Box borderWidth={1} borderColor={'primary.box'} mb="5px" display={'block'} flexShrink={1} key={i} px={3} py={1} bg={category?.color} rounded={'full'}>
                                             <Text  fontSize="sm">{`${category.info.name}`}</Text>
                                        </Box>
                             				))}
																	</HStack>
																	</Popover.Body>
																</Popover.Content>
															</Popover>
															
															</>
                            } 
                        </HStack>}
												</VStack>
             
                        <HStack  pr="3" space="5" alignItems="center">
                            {sponsor.booth && (
                                <Button
                                    p="1"
                                    leftIcon={<DynamicIcon iconType="exhibitors" iconProps={{ width: 16, height: 16 }} />}
                                    bg="transparent"
                                    onPress={() => {
                                        console.log('hello')
                                    }}
                                >
                                    {sponsor.booth}
                                </Button>
                            )}
                            {settings?.mark_favorite === 1 && (
                                <IconButton
                                    bg="transparent"
                                    p="1"
                                    _hover={{ bg: 'primary.500' }}
                                    icon={<Icon size="xl" as={Ionicons} name={sponsor.attendee_sponsors.length > 0 ? 'heart' : 'heart-outline'} color="primary.text" />}
                                    onPress={() => {
                                        MakeFavourite({ sponsor_id: sponsor.id, screen: 'listing' });
                                    }}
                                />
                            )}
                        </HStack>
                    </HStack>
                </HStack>
            </Pressable>
        </Box>
    )
}

export default RectangleView