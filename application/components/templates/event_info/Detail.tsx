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

type ScreenParams = { id: string, cms: string | undefined }

const { useParam } = createParam<ScreenParams>()

const Detail = (props: any) => {

    const { event } = UseEventService()

    const { _env } = UseEnvService()

    const { height } = useWindowDimensions();

    const { page } = UseInfoService();

    const [web_height, setweb_height] = useState(0)

    const [id] = useParam('id');

    const [cms] = useParam('cms');

    const [iframeHeight, setIframeHeight] = useState(0);
    const iframe = useRef<any>();

      const colors = getColorScheme(event?.settings?.app_background_color ?? '#343d50', event?.settings?.app_text_mode);

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
                    <HStack rounded="10" space={0} alignItems="center" w="100%" bg="primary.box" >
                        <Box w="100%" bg="primary.box"  rounded="10">
                            {(page.image == '' && page.description == '' && page.pdf == '') &&(
                                <>
                                <Text p={4}>{event?.labels?.EVENT_NORECORD_FOUND}</Text>
                                </>
                            )}
                            {page.image !== '' && page.image_position === 'top' && <HStack w="100%" ml={0} mb={5}>
                                <LoadImage path={`${_env.eventcenter_base_url}/assets/${informationModulesImage[cms!]}/${page.image}`} w="100%"  />
                            </HStack>}
                            {page?.description != "" && (Platform.OS === 'web' ? (
                                <iframe 
                                    style={{ borderWidth: 0, color:'#fff' }} 
                                    ref={iframe}
                                    onLoad={() => {
                                        const obj = iframe.current;
                                        obj.contentWindow.document.body.style.fontFamily = '"Open Sans", sans-serif';
                                        obj.contentWindow.document.body.style.color = colors.text ? colors.text : '#000';
                                        setIframeHeight(
                                            obj.contentWindow.document.body.scrollHeight + 50 
                                        );
                                    }}
                                    height={iframeHeight}
                                    srcDoc={page?.description} 
                                />
                            ) : (
                                <WebView
                                    onMessage={onWebViewMessage}
                                    javaScriptEnabled={true}
                                    scrollEnabled={false}
                                    source={{ html:page?.description }}
                                    style={{ flex: 1, backgroundColor: ThemeColors.primary.box, height: web_height, color:'#fff' }}
                                    injectedJavaScript='window.ReactNativeWebView.postMessage(document.body.scrollHeight)'
                                />
                            ))}
                            {page.pdf && (
                                <Box mb="3" w="100%"  py="4" borderBottomRadius="10">
                                    <HStack mb="3" bg="primary.darkbox" py="1" px="4" space="2" alignItems="center">
                                        <Icon color={'primary.text'} as={AntDesign} name="file1" size="md" />
                                        <Text fontSize="lg">{event?.labels?.GENERAL_DOCUMENTS}</Text>
                                    </HStack>
                                    <Pressable px="6" w="100%"
                                        onPress={async () => {
                                            const url = `${_env.eventcenter_base_url}/assets/${informationModulesImage[cms!]}/${page.pdf}`;
                                            const supported = await Linking.canOpenURL(url);
                                            if (supported) {
                                                await Linking.openURL(url);
                                            }
                                        }}>

                                        <HStack  w="100%" px="4" py="1" space="3" alignItems="center">
                                            <Icon color={'primary.text'} as={AntDesign} name="pdffile1" size="md" />
                                            <VStack space="0" w={'calc(100% - 100px)'}>
                                                <Text fontSize="md">{page?.pdf_title ? page?.pdf_title : event?.labels?.PRACTICAL_INFORMATION_VIEW_DOCUMENT}</Text>
                                            </VStack>
                                            <Spacer />
                                            <Icon as={AntDesign} name="download" size="md" color="primary.text" />
                                        </HStack>
                                    </Pressable>
                                </Box>
                            )}
                            {page.image !== '' && page.image_position !== 'top' && <HStack w="100%" px={5}>
                                <LoadImage path={`${_env.eventcenter_base_url}/assets/${informationModulesImage[cms!]}/${page.image}`} w="100%"  />
                            </HStack>}
                        </Box>
                    </HStack>
                </ScrollView>
                <HStack w={'100%'}>
                    {/* <BannerView url={''} /> */}
                </HStack>
            </View>}
        </>
    )

}

export default Detail