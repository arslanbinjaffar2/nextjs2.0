import React, { useEffect } from 'react';
import { Box, Divider } from 'native-base'
import RectangleView from 'application/components/atoms/alerts/RectangleView';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Button, Container, HStack, Icon, Input, Spacer, Text } from 'native-base';
import UseAuthService from 'application/store/services/UseAuthService';
import UseLoadingService from 'application/store/services/UseLoadingService';
import UseEventService from 'application/store/services/UseEventService';
import UseAlertService from 'application/store/services/UseAlertService';
import WebLoading from 'application/components/atoms/WebLoading';
import { Poll } from 'application/models/poll/Poll';
import { Alert } from 'application/models/alert/Alert';
import SectionLoading from 'application/components/atoms/SectionLoading';
import NextBreadcrumbs from 'application/components/atoms/NextBreadcrumbs';
import BannerAds from 'application/components/atoms/banners/BannerAds'

const Index = () => {

    const mounted = React.useRef(false);

    const { loading } = UseLoadingService();

    const { event, modules  } = UseEventService();
    
    const { FetchAlerts, alerts} = UseAlertService();

    const module = modules.find((module) => module.alias === 'alerts');
    
    useEffect(() => {
            FetchAlerts();
    }, []);
    return (
        <>
            {
               loading || !alerts ? <SectionLoading /> :
                    <>
                    <NextBreadcrumbs module={module} />
                    <Container mb="3" pt="2" maxW="100%" w="100%">
                        <HStack mb="3" pt="2" w="100%" space="3" alignItems="center">
                            <Text  fontSize="2xl">
                  {modules?.find(alerts => alerts.alias === 'alerts')?.name ?? "alerts"}              
                {/* {(modules?.find(alerts => alerts.alias === 'alerts')?.name?.charAt(0)?.toUpperCase() + (modules?.find(alerts => alerts.alias === 'alerts')?.name?.slice(1)?.toLowerCase() ?? 'New & Updates'))} */}
                </Text>
                            <Spacer />
                        </HStack>
                        {alerts.length > 0 ? (
                            <Box overflow="hidden" bg="primary.box" w="100%" rounded="lg">
                                    {alerts.map((alert:Alert, i:Number)=>(
                  
                                        <RectangleView key={alert.id} id={alert.id} title={alert.alert_detail.title} description={alert.alert_detail.description} date={alert.display_alert_date} time={alert.alert_time} is_last_item={(alerts.length-1 === i) ? true : false}  is_read={alert.is_read} />
                                    ))}
                            </Box>
                        ) : (
                          <Box p="3">
                              <Text fontSize="18px">{event.labels.GENERAL_NO_RECORD}</Text>
                          </Box>
                        )}
                    </Container>
                    </>
            }
                <BannerAds module_name={'alerts'} module_type={'listing'} />
        </>
        
    )

}

export default Index


