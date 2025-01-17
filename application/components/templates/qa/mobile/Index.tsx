import React, { useEffect } from 'react'
import { Box, Container, HStack, Icon, IconButton, Spacer, Text, VStack, ZStack } from 'native-base';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';

import UseLoadingService from 'application/store/services/UseLoadingService';
import UseQaService from 'application/store/services/UseQaService';
import MobileLoading from 'application/components/atoms/MobileLoading';
import in_array from "in_array";
import moment from 'moment';
import { useRouter } from 'solito/router';
import UseEventService from 'application/store/services/UseEventService';
import {useFocusEffect } from '@react-navigation/native'

const Index = () => {

    const mounted = React.useRef(false);

    const { processing } = UseLoadingService();

    const { event } = UseEventService();

    const [tab, setTab] = React.useState<'pending'| 'completed'>('pending')

    const [query, setQuery] = React.useState('');
    
    const { programs, FetchPrograms} = UseQaService();
    
    const { push } = useRouter()

    
    useFocusEffect(React.useCallback(() => {
      FetchPrograms();
        }, [])
      );

  return (
    <Container maxW="100%" h={'100%'} w="100%">
    {
        in_array('qa-listing', processing) ? (
          <MobileLoading />
        ):(
        <Container pt="2" maxW="100%" w="100%">
        <HStack mb="3" pt="2" w="100%" space="3" alignItems="center">
          <Text textTransform="uppercase" fontSize="2xl">Ask a question</Text>
        </HStack>
        <Box w="100%" rounded="10" bg="primary.box" borderWidth="1" borderColor="primary.bdBox">
          {programs?.length > 0 && programs?.map((program, k) =>
            <Box w="100%" key={k} borderBottomWidth={k === 3 ? 0 : 1} borderColor="primary.bordercolor" py="3">
              <HStack pl="30px" alignItems="center" minH="55px" space={0} justifyContent="flex-start">
                <Box position="absolute" left="0" top="0" w="15px">
                  <ZStack>
                    
                      <Box  bg={`primary.100`} borderWidth="1" borderColor="primary.darkbox" w="15px" mt={`${0}px`} h={`${55 - (0)}px`} borderRightRadius="10" shadow={2} />
                    
                  </ZStack>
                </Box>
                <HStack pt="0" w="100%" space="5" alignItems="center" justifyContent="space-between">
                  <VStack maxW={['62%', '70%', '40%']} space="1">
                    <Text fontSize="md" lineHeight="22px">
                      {program?.info.topic}
                    </Text>
                    <Text fontSize="sm" lineHeight="16px">
                      {moment(program.start_date).format('DD MMM YYYY')} 
                    </Text>

                  </VStack>

                  <Spacer />
                  <HStack pr="3" space="5" alignItems="center">
                    <IconButton
                      bg="transparent"
                      p="1"
                      _hover={{ bg: 'transparent' }}
                      icon={<Icon size="lg" as={SimpleLineIcons} name="arrow-right" color="primary.text" />}
                      onPress={() => {
                        push(`/${event.url}/qa/detail/${program.id}`)
                      }}

                    />
                  </HStack>
                </HStack>
              </HStack>
            </Box>)}
        </Box>
      </Container>)
    }
    </Container>
  )
}

export default Index


