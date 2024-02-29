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
import UseEventService from 'application/store/services/UseEventService';


type indexProps = {
  navigation: unknown
}

const Index = ({ navigation }: indexProps) => {

  const { loading } = UseLoadingService();

  const router = useRouter();

  const cms: any = router.query['cms'];

  const id: any = router.query['id'];

  const { event, modules  } = UseEventService();

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
    <>
      {loading ? (
        <SectionLoading />
      ) : (
        <Container pt="2" maxW="100%" w="100%">
          <HStack display={['block','flex']} mb="3" w="100%" space="0" alignItems="center">
            <Text fontSize="2xl">
              {
                (() => {
                  if (cms === 'practical-info') {
                    return modules?.find((module)=>(module.alias == 'practical-info'))?.name ?? 'Practical information'
                  } else if (cms === 'additional-info') {
                    return modules?.find((module)=>(module.alias == 'additional-info'))?.name ?? 'Additional information'
                  } else if (cms === 'general-info') {
                    return modules?.find((module)=>(module.alias == 'general-info'))?.name ?? 'General information'
                  }
                })()
              }
            </Text>
            <Spacer />
            <Input value={searchText} onChangeText={(text) => setSearchText(text)} rounded="10" w={["100%","60%"]} bg="primary.box" borderWidth={0}  placeholder={event?.labels?.GENERAL_SEARCH} leftElement={<Icon ml="2" color="primary.text" size="lg" as={AntDesign} name="search1" />} />
          </HStack>
          <Listing rounded={10} cms={cms} searchText={searchText} />
          {/* <BannerView url={''} /> */}
        </Container>
      )}

    </>
  );
};

Index.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default Index;
