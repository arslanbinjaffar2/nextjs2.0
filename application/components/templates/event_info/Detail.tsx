import React from 'react'
import { HStack, Text, Box, VStack, Icon, Image } from 'native-base';
import UseInfoService from 'application/store/services/UseInfoService';
import { WebView } from 'react-native-webview'
import AntDesign from '@expo/vector-icons/AntDesign'
import { StyleSheet, useWindowDimensions, Linking, Platform } from 'react-native';
import UseEnvService from 'application/store/services/UseEnvService';
import UseEventService from 'application/store/services/UseEventService';
import { createParam } from 'solito';

type ScreenParams = { id: string, cms: string | undefined }

const { useParam } = createParam<ScreenParams>()

const Detail = (props: any) => {

    const { event } = UseEventService()

    const { _env } = UseEnvService()

    const { height } = useWindowDimensions();

    const { info, FetchPage, page } = UseInfoService();

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            height: height
        },
    });

    const [id] = useParam('id');

    const [cms] = useParam('cms');

    React.useMemo(() => {
        if (Object.keys(page).length === 0) {
            FetchPage({ id: Number(id), type: cms });
        }
    }, [id, cms]);

    return (
        <>
            <HStack borderTopRadius="7" space={0} alignItems="center" w="100%" bg="primary.darkbox" >
                <Box w="100%" bg="primary.box" py="4" borderTopRadius="10">
                    {Platform.OS === 'web' ? (
                        <iframe src={`${_env.api_base_url}/event/${event.url}/info/iframe/${cms}/${id}`} />
                    ) : (
                        <WebView
                            source={{ html: page.description }}
                            style={styles.container}
                        />
                    )}
                    <Image
                        source={{
                            uri: `${_env.eventcenter_base_url}/assets/event_info/${page.image}`
                        }}
                        alt="Alternate Text"
                        w="100%"
                        h="150px"
                    />
                </Box>
            </HStack>
            {page.pdf && (
                <Box mb="3" w="100%" bg="primary.box" py="4" borderBottomRadius="10">
                    <HStack mb="3" bg="primary.darkbox" py="1" px="4" space="2" alignItems="center">
                        <Icon as={AntDesign} name="file1" size="md" />
                        <Text fontSize="lg">Documents</Text>
                    </HStack>
                    <VStack px="4" w="100%" space="1">
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
        </>
    )

}

export default Detail