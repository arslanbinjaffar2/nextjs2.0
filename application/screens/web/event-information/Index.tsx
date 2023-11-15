import * as React from 'react';
import PropTypes from 'prop-types';
import { Container, HStack, Icon, Input, Spacer, Text } from 'native-base';
import Master from 'application/screens/web/layouts/Master';
import AntDesign from '@expo/vector-icons/AntDesign';
import UseInfoService from 'application/store/services/UseInfoService';
import Listing from 'application/components/templates/event_info/Listing';
import { useRouter } from 'next/router'
import BannerView from 'application/components/atoms/banners/RectangleView';
import UseLoadingService from 'application/store/services/UseLoadingService';
import SectionLoading from 'application/components/atoms/SectionLoading';

type indexProps = {
  navigation: unknown
}

const Index = ({ navigation }: indexProps) => {

  const { loading } = UseLoadingService();

  const router = useRouter();

  const cms: any = router.query['cms'];

  const id: any = router.query['id'];

  const [searchText, setSearchText] = React.useState<string>("")

  const { FetchInfo, info, ClearState } = UseInfoService();

  React.useEffect(() => {
    FetchInfo({ type: cms, id: id });
    setSearchText('');
    return () => {
      ClearState();
    }
  }, [cms, id])


  return (
    <Master>
      {loading ? (
        <SectionLoading />
      ) : (
        <Container pt="2" maxW="100%" w="100%">
          <HStack mb="3" w="100%" space="3" alignItems="center">
            <Text fontSize="2xl">
              {
                (() => {
                  if (cms === 'practical-info') {
                    return 'Practical information'
                  } else if (cms === 'additional-info') {
                    return 'Additional information'
                  } else if (cms === 'general-info') {
                    return 'General information'
                  }
                })()
              }
            </Text>
            <Spacer />
            <Input value={searchText} onChangeText={(text) => setSearchText(text)} rounded="10" w="60%" bg="primary.box" borderWidth={0} placeholder="Search" leftElement={<Icon ml="2" color="primary.text" size="lg" as={AntDesign} name="search1" />} />
          </HStack>
          <Listing rounded={10} cms={cms} searchText={searchText} />
          {/* <BannerView url={''} /> */}
        </Container>
      )}

    </Master>
  );
};

Index.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default Index;
