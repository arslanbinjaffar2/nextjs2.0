import React, { useRef, useState } from 'react'
import { HStack, Text, Box, VStack, Icon, ScrollView, View, Pressable, Spacer } from 'native-base';
import UseInfoService from 'application/store/services/UseInfoService';
import { WebView } from 'react-native-webview'
import AntDesign from '@expo/vector-icons/AntDesign'
import { useWindowDimensions, Linking, Platform } from 'react-native';
import UseEnvService from 'application/store/services/UseEnvService';
import UseEventService from 'application/store/services/UseEventService';
import { getColorScheme } from 'application/styles/colors';
import { createParam } from 'solito';
import LoadImage from 'application/components/atoms/LoadImage';
import ThemeColors from 'application/utils/ThemeColors';
import BannerAds from 'application/components/atoms/banners/BannerAds'
import DynamicIcon from 'application/utils/DynamicIcon';
import Icodocument from 'application/assets/icons/small/Icodocument';
import NoRecordFound from 'application/components/atoms/NoRecordFound';
import { color } from 'native-base/lib/typescript/theme/styled-system';



type ScreenParams = { id: string, cms: string | undefined }

const { useParam } = createParam<ScreenParams>()

const Detail = (props: any) => {
    const RenderHtml = require('react-native-render-html').default;

    const { event } = UseEventService()

    const { _env } = UseEnvService()

    const { height } = useWindowDimensions();

    const { page } = UseInfoService();

    const [web_height, setweb_height] = useState(0)

    const [id] = useParam('id');

    const [cms] = useParam('cms');

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
    const onWebViewMessage = (event: any) => {
        setweb_height(parseInt(event.nativeEvent.data) + 15);
    }
    const informationModulesImage:Record<string, string> = {
        "additional-info": "additional_info",
        "general-info": "general_info",
        "practical-info": "event_info",
        "information-pages": "information_pages/temp",
      };

    return (
        <>
            {page && <View w="100%">
                <ScrollView h={'68%'}>
                    <HStack rounded="10" space={0} alignItems="center" w="100%"  bg={(page.image == '' && page.description == '' && page.pdf == '') ? "" : "primary.box"}>
                        <Box w="100%" rounded="10" bg={(page.image == '' && page.description == '' && page.pdf == '') ? "" : "primary.box"}>
                            {(page.image == '' && page.description == '' && page.pdf == '') &&(
                                <>
                                    <NoRecordFound mb="3" bg="primary.box"/>
                                </>
                            )}
                            {page.image !== '' && page.image_position === 'top' && <HStack w="100%" ml={0} mb={5}>
                                <LoadImage path={`${_env.eventcenter_base_url}/assets/${informationModulesImage[cms!]}/${page.image}`} w="100%"  />
                            </HStack>}
                            {page?.description != "" && (Platform.OS === 'web' ? (
                                <Box  p="5">
                                    <RenderHtml
                                        defaultTextProps={{selectable:true}}
                                        contentWidth={600}
                                        systemFonts={['Avenir']}
                                        tagsStyles={mixedStyle}
                                        source={{ html: page?.description }}
                                    />
                                </Box>
                                
                            ) : (
                                <WebView
                                    onMessage={onWebViewMessage}
                                    javaScriptEnabled={true}
                                    scrollEnabled={false}
                                    source={{ html:page?.description }}
                                    style={{ flex: 1, backgroundColor: ThemeColors.primary.box, height: web_height+50, color:'#fff' }}
                                    injectedJavaScript='window.ReactNativeWebView.postMessage(document.body.scrollHeight)'
                                />
                            ))}
                            {page.image !== '' && page.image_position !== 'top' && <HStack w="100%">
                                <LoadImage path={`${_env.eventcenter_base_url}/assets/${informationModulesImage[cms!]}/${page.image}`} w="100%" />
                            </HStack>}
                            {page.pdf && (
                                <Box mb="3" w="100%"  py="4" borderBottomRadius="10">
                                    <HStack mb="3" bg="primary.darkbox" py="1" px="4" alignItems="center" >
                                        {/* <DynamicIcon iconType="documents" iconProps={{ width: 23, height: 23 }} /> */}
                                        <Icodocument width="18px" height="18px" />
                                        {/* <Icon color={'primary.text'} as={AntDesign} name="file1" size="md" /> */}
                                        <Text fontSize="lg" ml={'2'}>{event?.labels?.GENERAL_DOCUMENTS}</Text>
                                    </HStack>
                                    <Pressable px="4" w="100%"
                                        onPress={async () => {
                                            const url = `${_env.eventcenter_base_url}/assets/${informationModulesImage[cms!]}/${page.pdf}`;
                                            const supported = await Linking.canOpenURL(url);
                                            if (supported) {
                                                await Linking.openURL(url);
                                            }
                                        }}>

                                        <HStack  w="100%" px="0" py="1" space="3" alignItems="center">
                                            <Icon color={'primary.text'} as={AntDesign} name="pdffile1" size="md" />
                                            <VStack space="0" w={'calc(100% - 100px)'}>
                                                <Text fontSize="md">{page?.pdf_title ? page?.pdf_title : event?.labels?.PRACTICAL_INFORMATION_VIEW_DOCUMENT}</Text>
                                            </VStack>
                                            <Spacer />
                                            <DynamicIcon iconType="download" iconProps={{ width: 18, height: 22 }} />
                                            {/* <Icon as={AntDesign} name="download" size="md" color="primary.text" /> */}
                                        </HStack>
                                    </Pressable>
                                </Box>
                            )}
                          
                        </Box>
                    </HStack>
                </ScrollView>
                <HStack w={'100%'}>
                    {/* <BannerView url={''} /> */}
                </HStack>
            </View>}
                <BannerAds module_name={'information_pages'} module_type={'detail'} />
        </>
    )

}

export default Detail