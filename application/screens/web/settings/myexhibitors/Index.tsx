import * as React from 'react';

import PropTypes from 'prop-types';

import Master from 'application/screens/web/layouts/Master';
import { Sponsor } from 'application/models/sponsor/Sponsor';
import UseEventService from 'application/store/services/UseEventService';
import UseExhibitorService from 'application/store/services/UseExhibitorService';
import UseLoadingService from 'application/store/services/UseLoadingService';
import { Box, HStack, ScrollView, Text } from 'native-base';
import BoxView from 'application/components/atoms/exhibitors/BoxView';
import { Exhibitor } from 'application/models/exhibitor/Exhibitor';


type indexProps = {
    navigation: unknown
}

const Index = ({ navigation }: indexProps) => {

    const { my_exhibitors, FetchMyExhibitors} = UseExhibitorService();
    const { loading } = UseLoadingService();
    const { event } = UseEventService();

    React.useEffect(() => {
        FetchMyExhibitors();
    }, [])

    return (
      <>
        <Box w="100%">
          <ScrollView h={'53%'} w={'100%'}>
            <HStack
              direction="row"
              flexWrap="wrap"
              space="0"
              alignItems="flex-start"
            >
              {my_exhibitors.length > 0 &&
                my_exhibitors.map((exhibitor: Exhibitor, key: number) => (
                  <BoxView exhibitor={exhibitor} k={key} screen='my-exhibitors' />
                ))}
            </HStack>
          </ScrollView>
        </Box>
        {!loading && my_exhibitors.length <= 0 && (
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
