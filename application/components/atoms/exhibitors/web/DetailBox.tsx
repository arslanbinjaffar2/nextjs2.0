import React, { useEffect, useState } from 'react'
import { Box, Image, Spacer, Text, HStack, IconButton, Icon, Divider, ZStack, Center, Spinner } from 'native-base'
import { Category, ExhibitorDetail } from 'application/models/exhibitor/ExhibitorDetail'
import DynamicIcon from 'application/utils/DynamicIcon';
import UseEnvService from 'application/store/services/UseEnvService';
import UseExhibitorService from 'application/store/services/UseExhibitorService';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Dimensions, useWindowDimensions } from 'react-native';
import ExhibitorDefaultImage from 'application/assets/images/exhibitors-default.png';
import UseEventService from 'application/store/services/UseEventService';
import { colorText } from 'application/styles/colors'
import UseLoadingService from 'application/store/services/UseLoadingService';
import in_array from 'in_array';

import { getColorScheme } from "application/styles/colors";

type AppProps = {
    detail: ExhibitorDetail | null,
}

const DetailBox = ({ detail }: AppProps) => {

    const RenderHtml = require('react-native-render-html').default;

    const { width } = useWindowDimensions();

    const { _env } = UseEnvService()

    const { MakeFavourite } = UseExhibitorService();

    const { event } = UseEventService()

		const {processing}=UseLoadingService();

    
    const [isFav,setIsFav] = useState(false);

    const _bannerWidth = React.useRef<HTMLDivElement>(null);

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

    useEffect(() => {
        console.log("fav: ",isFav)
    }, [isFav])

    useEffect(() => {
        if (detail?.detail?.attendee_exhibitors?.length && detail?.detail?.attendee_exhibitors?.length > 0) {
            setIsFav(true)
        } else {
            setIsFav(false)
        }
    }, [detail?.detail?.attendee_exhibitors])

    function toggleFav(){
        if(in_array( `exhibitor-fav-${detail?.detail?.id ? detail?.detail?.id : 0}`,processing)){
            return;
        }
        MakeFavourite({ exhibitor_id: detail?.detail?.id ? detail?.detail?.id : 0, screen: 'exhibitor-detail' });
    }
    return (
        <Box w="100%"  p="0" roundedTop="10">
            <Box ref={_bannerWidth} w="100%"  p="0" roundedTop="10">
                {detail?.detail?.logo ? (
                    <Image resizeMode='contain'  mb="5" roundedTop="10"  source={{ uri: `${_env.eventcenter_base_url}/assets/exhibitors/large/${detail?.detail?.logo}` }} alt="" w="100%" h={_bannerWidth.current?.clientWidth ? _bannerWidth.current?.clientWidth * 0.34 : 180} />
                ) : (
                    <Image mb="5" roundedTop="10" size="full" source={ExhibitorDefaultImage} alt="" w="100%" h="160px" />
                )}
                <Box w="100%" px="6" position={'relative'}>
                    <HStack w="100%" mb="1" space="3" alignItems="flex-start">
                        {detail?.detail?.name && (
                            <Text maxW="80%" fontWeight={500} fontSize="xl">{detail?.detail?.name}</Text>
                        )}
                        <Spacer />
                        {event?.exhibitor_settings?.mark_favorite == 1 &&  
													<Box w={36} height={36} alignItems={'center'} justifyContent={'center'} display={'flex'}  position={'absolute'}
                                zIndex={'999999'}
                                right={'0'}
                                top={'7px'}>
																	 {in_array(`exhibitor-fav-${detail?.detail?.id ? detail?.detail?.id : 0}`,processing) ? (
																				<Spinner width={25} height={25} color={isFav ? 'secondary.500' : 'primary.text'} size="16px"  />
																		):(
																				 <IconButton
																						bg="transparent"
																						p="1"
																						rounded={'full'}
																					_hover={{ bg: 'transparent', _icon: { color: !isFav ? "secondary.500" : "primary.text",name: !isFav ? 'heart' : 'heart-outline' } }}
																						icon={<Icon size="xl" as={Ionicons} name={isFav ? 'heart' : 'heart-outline'} color={isFav ? "secondary.500" : "primary.text"} />}
																						onPress={() => {
																								toggleFav();
																						}}
																					
																				/>
																		)}
                           
													</Box>
												}
                    </HStack>
                    <HStack w="100%" mb="3" space="0" alignItems="center">
                        {/* {detail?.detail?.categories!?.length > 0 && <Box position="absolute" left="-20px" top="-28px">
                            <ZStack>
                                <Box bg={detail?.detail?.categories[0].color} borderWidth="1" borderColor="primary.darkbox" w="16px" mt='0px' h={`52px`} borderRightRadius="10" shadow={2} />
                            </ZStack>
                        </Box>} */}
                        {detail?.detail?.categories!?.length > 0 && (
                            <HStack alignItems="flex-start" justifyContent={'flex-start'} display={'flex'} flexWrap={'wrap'} maxW={'calc(100% - 145px)'}>
                                {detail?.detail?.categories!?.map((category: Category, i: number) =>
                                    <Box borderColor={'primary.box'} borderWidth={1} rounded={'full'} bg={category.color} px={4} py={1} my={1} mr={2}  key={i}>
                                        <Text color={colorText(category.color)} lineHeight={'sm'} fontSize="sm">{`${category.info.name}`}</Text>
                                    </Box>
                                )}
                            </HStack>
                        )}
                        <Spacer />
                        {detail?.detail?.booth && (
                            <HStack alignItems="center" space="2">
                                <DynamicIcon iconType="exhibitors" iconProps={{ width: 16, height: 16 }} />
                                <Center maxW={120}>
                                    <Text  fontSize="md">{detail?.detail?.booth}</Text>
                                </Center>
                                
                            </HStack>
                        )}
                    </HStack>
                    {detail?.detail?.description && event?.exhibitor_tab_settings?.about == 1 && <Box mb="4" w="100%">
                        <Divider mb="3" bg="primary.text" />
                        <RenderHtml
                            defaultTextProps={{selectable:true}}
                            contentWidth={width > 600 ? 600 : width - 90}
                            systemFonts={['Avenir']}
                            tagsStyles={mixedStyle}
                            source={{ html: detail?.detail?.description }}
                        />
                        
                    </Box>}
                </Box>
            </Box>
        </Box>
    )
}

export default DetailBox