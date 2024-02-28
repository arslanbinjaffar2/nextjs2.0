import React, { useEffect } from 'react';
import { Box, Divider } from 'native-base'
import RectangleView from 'application/components/atoms/alerts/RectangleView';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Button, Container, HStack, Icon, Input, Spacer, Text } from 'native-base';
import UseAuthService from 'application/store/services/UseAuthService';
import UseLoadingService from 'application/store/services/UseLoadingService';
import UseAlertService from 'application/store/services/UseAlertService';
import WebLoading from 'application/components/atoms/WebLoading';
import { Poll } from 'application/models/poll/Poll';
import { Alert } from 'application/models/alert/Alert';
import BannerAds from 'application/components/atoms/banners/BannerAds'

const Index = () => {

    const mounted = React.useRef(false);

    const { loading } = UseLoadingService();
    
    const { FetchAlerts, alerts, markAlertRead} = UseAlertService();


    useEffect(() => {
            FetchAlerts();
    }, []);
    
    useEffect(() => {
        if(alerts.length > 0){

            markAlertRead({ alertIds:alerts.reduce((ack,item)=>(`${ack}${item.id};`), '') });
        }
    }, [alerts]);

    return (
        <>
            {
                loading ? (
                    <WebLoading />
                ):(
                    <Container pt="2" maxW="100%" w="100%">
                        <HStack mb="3" pt="2" w="100%" space="3" alignItems="center">
                            <Text textTransform="uppercase" fontSize="2xl">News and updated</Text>
                            <Spacer />
                        </HStack>
                            <Box overflow="hidden" bg="primary.box" w="100%" rounded="lg">
                                    {alerts.map((alert:Alert)=>(
                                        <RectangleView key={alert.id} title={alert.alert_detail.title} description={alert.alert_detail.description} date_time={alert.display_alert_date}  />
                                    ))}
                                    <Divider h="100px" bg="transparent" />
                            </Box>
                    </Container>
                )
            }
            <Box width={"100%"} height={"5%"}>
                <BannerAds module_name={'alerts'} module_type={'listing'} />
            </Box>
        </>
        
    )

}

export default Index


