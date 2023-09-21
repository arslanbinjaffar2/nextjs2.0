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

const Index = () => {

    const mounted = React.useRef(false);

    const { loading } = UseLoadingService();
    
    const { FetchAlerts, alerts} = UseAlertService();


    useEffect(() => {
            FetchAlerts();
    }, []);

    return (
        <>
            {
                loading ? (
                    <WebLoading />
                ):(
                    <Container pt="2" maxW="100%" w="100%">
                        <HStack mb="3" pt="2" w="100%" space="3" alignItems="center">
                            <Text textTransform="uppercase" fontSize="2xl">Polls</Text>
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
        </>
        
    )

}

export default Index


