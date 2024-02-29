import * as React from 'react';

import PropTypes from 'prop-types';

import Master from 'application/screens/web/layouts/Master';
import UseSponsorService from 'application/store/services/UseSponsorService';
import UseLoadingService from 'application/store/services/UseLoadingService';
import { Box, HStack, ScrollView, Spacer, Text } from 'native-base'
import BoxView from 'application/components/atoms/sponsors/BoxView';
import { Sponsor } from 'application/models/sponsor/Sponsor';
import UseEventService from 'application/store/services/UseEventService';
import Search from 'application/components/atoms/programs/Search'



type indexProps = {
    navigation: unknown
}

const Index = ({ navigation }: indexProps) => {

    const { my_sponsors, FetchMySponsors} = UseSponsorService();
    const { loading } = UseLoadingService();
    const { event,setting_modules } = UseEventService();

    React.useEffect(() => {
        FetchMySponsors({});
    }, [])

    return (
      <>
        <Box>
          <Text mb="3" pt="2" w="100%" alignItems="center" fontSize="2xl">{setting_modules?.find((module)=>(module.alias == 'mysponsers'))?.name ?? 'My sponsors'}</Text>
        </Box>
        <Box w="100%">
          <ScrollView h={'53%'} w={'100%'}>
            <HStack
              direction="row"
              flexWrap="wrap"
              space="0"
              alignItems="flex-start"
            >
              {my_sponsors.length > 0 &&
                my_sponsors.map((sponsor: Sponsor, key: number) => (
                  <BoxView sponsor={sponsor} k={key} screen="my-sponsors" />
                ))}
            </HStack>
          </ScrollView>
        </Box>
        {!loading && my_sponsors.length <= 0 && (
          <Box p={3} mb="3" bg="primary.box" rounded="lg" w="100%">
            <Text>{event?.labels?.EVENT_NORECORD_FOUND}</Text>
          </Box>
        )}
      </>
    )

};

Index.propTypes = {
    navigation: PropTypes.object.isRequired,
};

export default Index;
