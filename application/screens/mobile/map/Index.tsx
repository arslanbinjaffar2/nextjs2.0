import * as React from 'react';
import PropTypes from 'prop-types';
import Master from 'application/screens/mobile/layouts/Master';
import ModuleHeader from 'application/screens/mobile/layouts/headers/ModuleHeader';
import { Center, ScrollView, Divider, HStack, Text, Image } from 'native-base';
import { useState } from 'react';
import DynamicIcon from 'application/utils/DynamicIcon';
import { WebView } from 'react-native-webview'
import UseEnvService from 'application/store/services/UseEnvService';
import UseEventService from 'application/store/services/UseEventService';
import UseMapService from 'application/store/services/UseMapService';

const Index = ({ navigation }: any) => {

  const [scroll, setScroll] = useState(false);

  const { _env } = UseEnvService();

  const { event } = UseEventService();

  const { FetchMap, map } = UseMapService();

  React.useEffect(() => {
    FetchMap();
  }, [])

  return (
    <Master navigation={navigation}>
      <ModuleHeader minimal={scroll} navigation={navigation} >
        <DynamicIcon iconType="maps" iconProps={{ width: 20, height: 26 }} />
      </ModuleHeader>
      <Center w={'100%'} px={15}>
        <Divider mx="auto" w="160px" bg="primary.text" my="5" />
        <ScrollView h="85%" onScroll={(event: { nativeEvent: { contentOffset: { y: number; }; }; }) => setScroll(event.nativeEvent.contentOffset.y > 40 ? true : false)}>
          <HStack borderTopRadius="7" space={0} alignItems="center" w="100%" bg="primary.darkbox" >
            <Text w="100%" py="10px" pl="18px">MAP</Text>
          </HStack>
          <HStack bg="primary.darkbox" borderTopRadius="7" h='500' space={0} alignItems="center" w="100%" >
            {event?.url && (
              <WebView
                source={{ uri: `${_env.api_base_url}/event/${event?.url}/map/iframe` }}
              />
            )}
            {map.image && (
              <Image alt='logo' source={{ uri: map.image }} w="100%" h="52" alignSelf={'center'} />
            )}
          </HStack>
        </ScrollView>
      </Center>
    </Master>
  );
};

Index.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default Index;
