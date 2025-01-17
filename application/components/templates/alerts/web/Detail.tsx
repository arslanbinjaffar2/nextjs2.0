import * as React from 'react';
import { createParam } from 'solito';
import WebLoading from 'application/components/atoms/WebLoading';
import UseAlertService from 'application/store/services/UseAlertService';
import AlertDetail from 'application/components/atoms/alerts/Detail';
import UseLoadingService from 'application/store/services/UseLoadingService';
import { Container, HStack, Spacer, Text, Box } from 'native-base';
import UseEventService from 'application/store/services/UseEventService';
import BannerAds from 'application/components/atoms/banners/BannerAds'
import SectionLoading from 'application/components/atoms/SectionLoading';
import NextBreadcrumbs from 'application/components/atoms/NextBreadcrumbs';

type ScreenParams = { id: string }

const { useParam } = createParam<ScreenParams>()

const Detail = () => {
  const [_id] = useParam('id');
  const { FetchAlertDetails, detail, MarkAlertAsRead } = UseAlertService();
  const { loading } = UseLoadingService();
  const { modules } = UseEventService();
  const {event} = UseEventService();
  React.useEffect(() => {
    FetchAlertDetails({ alertId: Number(_id) });
  }, [_id]);

  React.useEffect(() => {

      if(detail && detail?.id === Number(_id)){
        let alreadyRead = detail?.is_read === true;
        if(!alreadyRead){
          MarkAlertAsRead({ alertId: Number(_id) });
        }
      }

  }, [_id, detail]);
  const module = modules.find((module) => module.alias === 'alerts');
  return (
    <>
      {
        (loading || !detail ) ? <SectionLoading /> :
          <>
            <NextBreadcrumbs module={module} title={detail?.alert_detail?.title} />
            <Container mb="3" pt="2" maxW="100%" w="100%">
              <HStack mb="3" pt="2" w="100%" space="3" justifyContent="center">
                <Text  fontSize="3xl">{event?.labels?.GENERAL_DETAIL}</Text>
              </HStack>
              <Spacer />
              <Box overflow="hidden" bg="primary.box" w="100%" rounded="lg">
                <AlertDetail key={_id} id={detail?.id || 0} title={detail?.alert_detail?.title || ""} description={detail?.alert_detail.description || ""} date={detail?.display_alert_date || ""} time={detail?.alert_time || ""} />
              </Box>
            </Container>
          </>
      }
        <BannerAds module_name={'alerts'} module_type={'listing'} />
    </>
  );
};

export default Detail;