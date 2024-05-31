import React, { useEffect, useState } from 'react'
import { Box, HStack, Icon, Spacer, Text, VStack, ZStack, Button, IconButton, Pressable, Popover, Spinner } from 'native-base'
import DynamicIcon from 'application/utils/DynamicIcon';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Exhibitor, Category } from 'application/models/exhibitor/Exhibitor'
import UseExhibitorService from 'application/store/services/UseExhibitorService';
import { useRouter } from 'solito/router'
import UseEventService from 'application/store/services/UseEventService';
import { Linking } from 'react-native';
import { colorText } from 'application/styles/colors';
import UseLoadingService from 'application/store/services/UseLoadingService';
import in_array from 'in_array';

type AppProps = {
    exhibitor: Exhibitor,
    border: number
}

const RectangleView = ({ border, exhibitor }: AppProps) => {

    const { settings, MakeFavourite } = UseExhibitorService();

    const { push } = useRouter()

    const { event } = UseEventService()

		const [isFav,setIsFav] = useState(false)

		const {processing}=UseLoadingService();
		useEffect(() => {
        if (exhibitor.attendee_exhibitors.length > 0) {
            setIsFav(true)
        }else{
            setIsFav(false)
        }
    }, [exhibitor.attendee_exhibitors])
    
    function toggleFav(){
       if(in_array( `exhibitor-fav-${exhibitor.id}`,processing)){
            return;
        }
        setIsFav(!isFav);
         MakeFavourite({ exhibitor_id: exhibitor.id, screen: 'listing' });
    }



    return (
        <Box w="100%" borderBottomWidth={border} borderColor="primary.bordercolor" py="3">
            <Pressable
                onPress={async () => {
                    if(exhibitor?.url && exhibitor?.url !== '' && exhibitor.url !== 'http://' && exhibitor.url !== 'https://'){
                        const url: any = `${exhibitor?.url}`;
                        const supported = await Linking.canOpenURL(url);
                        if (supported) {
                            await Linking.openURL(url);
                        }}
                    else{
                        push(`/${event.url}/exhibitors/detail/${exhibitor.id}`)
                    }
                }}
            >
                <HStack pl={["15px",'15px', '25px']} alignItems="center" minH="55px" space={0} justifyContent="flex-start">
                    {/* {event?.exhibitor_settings?.catTab == 1 && <Box position="absolute" left="0" top="0" w="15px">
                        <ZStack>
                            {exhibitor.categories.length > 0 && exhibitor.categories.map((category: Category, i: number) =>
                                <Box key={i} bg={`${category.color}`} borderWidth="1" borderColor="primary.darkbox" w="15px" mt={`${i * 10}px`} h={`${55 - (i * 10)}px`} borderRightRadius="10" shadow={2} />
                            )}
                        </ZStack>
                    </Box>} */}
                    <HStack pt="0" w="100%" space="4" alignItems="center">
                        <VStack marginRight={'auto'} w="calc(100% - 220px);" space="0">
                            <Text fontSize="lg" lineHeight="22px">
                                {exhibitor.name}
                            </Text>
                       
                        <HStack flexWrap={'wrap'} mt="2" space={1}>
                            {settings?.catTab == 1 &&  exhibitor.categories.length > 0 && exhibitor.categories.slice(0, 3).map((category: Category, i: number) =>(
                                        <Box borderWidth={1} borderColor={'primary.box'} mb="5px" key={i} px={3} py={1} bg={category?.color} rounded={'full'}>
                                             <Text color={colorText(category.color)} fontSize="sm">{`${category.info.name}`}</Text>
                                        </Box>
                             ))}
                            {settings?.catTab == 1 &&  exhibitor.categories.length > 3 &&
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
																				<Text  fontSize="sm">{`+${ exhibitor.categories.length - 3}`}</Text>
																			</Button>
																		}}>
																<Popover.Content borderColor={'primary.500'} bgColor={'primary.500'}>
																	<Popover.Arrow borderColor={'primary.500'} bgColor={'primary.500'} />
																	<Popover.Body borderTopWidth="0" bgColor={'primary.500'}>
																	<HStack flexWrap={'wrap'} maxW={350} minW={240} space={1}>
																		{exhibitor.categories.length > 3 && exhibitor.categories.map((category: Category, i: number) =>(
                                        <Box borderWidth={1} borderColor={'primary.box'} mb="5px" display={'block'} flexShrink={1} key={i} px={3} py={1} bg={category?.color} rounded={'full'}>
                                             <Text color={colorText(category.color)} fontSize="sm">{`${category.info.name}`}</Text>
                                        </Box>
                             				))}
																	</HStack>
																	</Popover.Body>
																</Popover.Content>
															</Popover>
															
															</>
                            } 
                        </HStack>
                         </VStack>
                        <Spacer />
                        <HStack  pr="3" space="5" alignItems="center">
                            {exhibitor.booth && (
                                <Button
                                    p="1"
                                    leftIcon={<DynamicIcon iconType="exhibitors" iconProps={{ width: 16, height: 16 }} />}
                                    bg="transparent"
                                    onPress={() => {
                                        console.log('hello')
                                    }}
                                >
																		 <Text isTruncated maxW={'80px'}>{exhibitor.booth}</Text>
                                </Button>
                            )}
                            {settings?.mark_favorite === 1 && (
																<Box w={36} height={36} alignItems={'center'} justifyContent={'center'} display={'flex'}>
																	{in_array(`exhibitor-fav-${exhibitor.id}`, processing) ? (
																		<Spinner width={28} height={28} color={isFav ? 'secondary.500' : 'primary.text'} size="sm" />
																	) : (
																		<IconButton
																			bg="transparent"
																			p="1"
																			rounded={'full'}
																			_hover={{ bg: 'transparent', _icon: { color: !isFav ? "secondary.500" : "primary.text", name: !isFav ? 'heart' : 'heart-outline' } }}
																			icon={<Icon size="xl" as={Ionicons} name={isFav ? 'heart' : 'heart-outline'} color={isFav ? "secondary.500" : "primary.text"} />}
																			onPress={() => {
																				toggleFav();
																			}}

																		/>
																	)}

																</Box>
															)}
                        </HStack>
                    </HStack>
                </HStack>
            </Pressable>
        </Box>
    )
}

export default RectangleView