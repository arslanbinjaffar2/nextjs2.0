import React, { useRef, useState } from 'react'
import { HStack, Text, Box, VStack, Icon, ScrollView, View } from 'native-base';
import UseInfoService from 'application/store/services/UseInfoService';
import { WebView } from 'react-native-webview'
import AntDesign from '@expo/vector-icons/AntDesign'
import { useWindowDimensions, Linking, Platform } from 'react-native';
import UseEnvService from 'application/store/services/UseEnvService';
import UseEventService from 'application/store/services/UseEventService';
import { createParam } from 'solito';
import BannerView from 'application/components/atoms/banners/RectangleView';
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
                    <HStack borderTopRadius="7" space={0} alignItems="center" w="100%" bg="primary.box" >
                        <Box w="100%" bg="primary.box" py="4" borderTopRadius="10">
                            {page.image !== '' && page.image_position === 'top' && <HStack w="90%" ml={5} mb={5}>
                                <LoadImage path={`${_env.eventcenter_base_url}/assets/${informationModulesImage[cms!]}/${page.image}`} w="100%" h={(10 / 100) * height} />
                            </HStack>}
                            {page?.description != "" && (Platform.OS === 'web' ? (
                                <iframe 
                                    style={{ borderWidth: 0, color:'#fff' }} 
                                    ref={iframe}
                                    onLoad={() => {
                                        const obj = iframe.current;
                                        obj.contentWindow.document.body.style.fontFamily = '"Open Sans", sans-serif';
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
                                <Box mb="3" w="100%" bg="primary.box" py="4" borderBottomRadius="10">
                                    <HStack mb="3" bg="primary.darkbox" py="1" px="4" space="2" alignItems="center">
                                        <Icon as={AntDesign} name="file1" size="md" />
                                        <Text fontSize="lg">Documents</Text>
                                    </HStack>
                                    <VStack px="6" w="100%" space="1">
                                        <HStack w="100%" space="2" alignItems="center">
                                            <Icon as={AntDesign} name="pdffile1" size="md" onPress={async () => {
                                                const url = `${_env.eventcenter_base_url}/assets/${informationModulesImage[cms!]}/${page.pdf}`;
                                                const supported = await Linking.canOpenURL(url);
                                                if (supported) {
                                                    await Linking.openURL(url);
                                                }
                                            }} />
                                            <Text fontSize="md">{page.pdf_title}</Text>
                                        </HStack>
                                    </VStack>
                                </Box>
                            )}
                            {page.image !== '' && page.image_position !== 'top' && <HStack w="90%" ml={5}>
                                <LoadImage path={`${_env.eventcenter_base_url}/assets/${informationModulesImage[cms!]}/${page.image}`} w="100%" h={(10 / 100) * height} />
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