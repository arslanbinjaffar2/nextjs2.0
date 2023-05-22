import * as React from 'react';
import PropTypes from 'prop-types';
import Master from 'application/screens/mobile/layouts/Master';
import ReturnHeader from 'application/screens/mobile/layouts/headers/ReturnHeader';
import { Center, ScrollView, HStack, Text, Box, VStack, Icon, Image } from 'native-base';
import { useState } from 'react';
import AntDesign from '@expo/vector-icons/AntDesign'
import UseInfoService from 'application/store/services/UseInfoService';
import BannerView from 'application/components/atoms/banners/RectangleView';
import MobileLoading from 'application/components/atoms/MobileLoading';
import UseLoadingService from 'application/store/services/UseLoadingService';
import { WebView } from 'react-native-webview'
import { StyleSheet, useWindowDimensions, Linking } from 'react-native';
import { createParam } from 'solito';
import UseEnvService from 'application/store/services/UseEnvService';

type ScreenParams = { id: string, cms: string | undefined }

const { useParam } = createParam<ScreenParams>()

const PageDetail = ({ navigation, route }: any) => {

    const { _env } = UseEnvService()

    const { height } = useWindowDimensions();

    const { loading } = UseLoadingService();

    const [scroll, setScroll] = useState(false);

    const { FetchPage, page } = UseInfoService();

    const [id] = useParam('id');

    const [cms] = useParam('cms');

    React.useEffect(() => {
        if (id && cms) {
            FetchPage({ id: Number(id), type: cms });
        }
    }, [id, cms]);

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            height: height
        },
    });

    return (
        <Master navigation={navigation}>
            {loading ? (
                <MobileLoading />
            ) : (
                <>
                    <ReturnHeader minimal={scroll} navigation={navigation} >
                        <Text fontSize="xl">Installing Demyst’s Libraries</Text>
                    </ReturnHeader>
                    <Center w={'100%'} px={15} mt={5}>
                        <ScrollView h="60%" onScroll={(event: { nativeEvent: { contentOffset: { y: number; }; }; }) => setScroll(event.nativeEvent.contentOffset.y > 40 ? true : false)}>
                            <HStack borderTopRadius="7" space={0} alignItems="center" w="100%" bg="primary.darkbox" >
                                <Box w="100%" bg="primary.box" py="4" borderTopRadius="10">
                                    <WebView
                                        source={{ html: page.description }}
                                        style={styles.container}
                                    />
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
                        </ScrollView>
                        <BannerView />
                    </Center>
                </>
            )}
        </Master>
    );
};

PageDetail.propTypes = {
    navigation: PropTypes.object.isRequired,
};

export default PageDetail;
