import React, { useState } from 'react'
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

    const onWebViewMessage = (event: any) => {
        setweb_height(parseInt(event.nativeEvent.data) + 15);
    }

    return (
        <View w="100%">
            <ScrollView h={'68%'}>
                <HStack borderTopRadius="7" space={0} alignItems="center" w="100%" bg="primary.box" >
                    <Box w="100%" bg="primary.box" py="4" borderTopRadius="10">
                        {Platform.OS === 'web' ? (
                            <iframe style={{ borderWidth: 0, height: (35 / 100) * height }} src={`${_env.api_base_url}/event/${event.url}/info/iframe/${cms}/${id}`} />
                        ) : (
                            <WebView
                                onMessage={onWebViewMessage}
                                javaScriptEnabled={true}
                                scrollEnabled={false}
                                source={{ uri: `${_env.api_base_url}/event/${event.url}/info/iframe/${cms}/${id}` }}
                                style={{ flex: 1, backgroundColor: ThemeColors.primary.box, height: web_height }}
                                injectedJavaScript='window.ReactNativeWebView.postMessage(document.body.scrollHeight)'
                            />
                        )}
                        <HStack w="90%" ml={5}>
                            <LoadImage path={`${_env.eventcenter_base_url}/assets/event_info/${page.image}`} w="100%" h={(10 / 100) * height} />
                        </HStack>
                        {page.pdf && (
                            <Box mb="3" w="100%" bg="primary.box" py="4" borderBottomRadius="10">
                                <HStack mb="3" bg="primary.darkbox" py="1" px="4" space="2" alignItems="center">
                                    <Icon as={AntDesign} name="file1" size="md" />
                                    <Text fontSize="lg">Documents</Text>
                                </HStack>
                                <VStack px="6" w="100%" space="1">
                                    <HStack w="100%" space="2" alignItems="center">
                                        <Icon as={AntDesign} name="pdffile1" size="md" onPress={async () => {
                                            const url = `${_env.eventcenter_base_url}/assets/event_info/${page.pdf}`;
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
                    </Box>
                </HStack>
            </ScrollView>
            <HStack w={'100%'}>
                <BannerView />
            </HStack>
        </View>
    )

}

export default Detail