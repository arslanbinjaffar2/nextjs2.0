import React, { useEffect } from 'react'
import { Box, Container, HStack, Text } from 'native-base';
import UseLoadingService from 'application/store/services/UseLoadingService';
import UseProgramService from 'application/store/services/UseProgramService';
import SlideView from 'application/components/molecules/programs/SlideView';
import in_array from "in_array";
import UseEventService from 'application/store/services/UseEventService';
import NextBreadcrumbs from 'application/components/atoms/NextBreadcrumbs';
import SectionLoading from 'application/components/atoms/SectionLoading';
import IntersectionObserverComponent from 'application/components/atoms/IntersectionObserverComponent';

const Index = () => {

  const mounted = React.useRef(false);

  const { processing } = UseLoadingService();
  const { event, modules } = UseEventService();

  const [query, setQuery] = React.useState('');

  const { programs, FetchPrograms, track_id, page, total_pages } = UseProgramService();

  React.useEffect(() => {
    mounted.current = true;
    return () => { mounted.current = false; };
  }, []);

  function loadMore() {
    if (mounted.current) {
      FetchPrograms({ query: query, page: page + 1, screen: "request-to-speak", id: 0, track_id: track_id });
    }
  }

  useEffect(() => {
    FetchPrograms({ page: 1, query: '', screen: 'request-to-speak', id: 0, track_id: track_id });
  }, []);

  const module = modules.find((module) => module.alias === 'myturnlist');

  return (
    <>
      {
        in_array('programs', processing) && programs ? (
          <SectionLoading />
        ) : (
          <>
            <NextBreadcrumbs module={module} />

            <Container pt="2" maxW="100%" w="100%">
              <HStack mb="3" pt="2" w="100%" space="3" alignItems="center">
                <Text fontSize="2xl">{module?.name}</Text>
              </HStack>
              {programs.length > 0 ?
                <Box w="100%" rounded="10" bg="primary.box" borderWidth="0" borderColor="primary.bdBox">
                  {programs.length > 0 && <SlideView section={'myturnlist'} programs={programs} />}
                </Box>
                : <Box p={3} bg="primary.box" rounded="lg" w="100%">
                  <Text>{event?.labels?.GENERAL_NO_RECORD}</Text>
                </Box>}
              {page < total_pages && total_pages > 1 &&
                <IntersectionObserverComponent onIntersect={loadMore} />
              }
            </Container>
          </>)
      }
    </>
  )
}

export default Index


