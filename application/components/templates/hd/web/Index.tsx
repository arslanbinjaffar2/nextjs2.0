import React, { useEffect } from 'react'
import { Box, Container, HStack, Icon, IconButton, Pressable, Spacer, Text, VStack, ZStack } from 'native-base';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';

import UseLoadingService from 'application/store/services/UseLoadingService';
import UseHdService from 'application/store/services/UseHdService';
import WebLoading from 'application/components/atoms/WebLoading';
import SectionLoading from 'application/components/atoms/SectionLoading';
import in_array from "in_array";
import moment from 'moment';
import { useRouter } from 'solito/router';
import UseEventService from 'application/store/services/UseEventService';
import BannerAds from 'application/components/atoms/banners/BannerAds'
import NextBreadcrumbs from 'application/components/atoms/NextBreadcrumbs';

const Index = () => {

  const mounted = React.useRef(false);

  const { processing } = UseLoadingService();

  const { event, modules } = UseEventService();

  const [tab, setTab] = React.useState<'pending' | 'completed'>('pending')

  const [query, setQuery] = React.useState('');

  const { groups, FetchGroups } = UseHdService();

  const { push } = useRouter()


  useEffect(() => {
    FetchGroups();
  }, []);
  const module = modules.find((module) => module.alias === 'help_desk');
  const name="Ask a question"
  return (
    <>
      {
        in_array('hd-listing', processing) ? (
          <SectionLoading />
        ) : (
          <>
            <NextBreadcrumbs module={module} />

            <Container pt="2" maxW="100%" w="100%">
              <HStack mb="3" pt="2" w="100%" space="3" alignItems="center">
                <Text    fontSize="2xl">Ask a question</Text>
              </HStack>
              <Box w="100%" rounded="10" bg="primary.box" borderWidth="0" borderColor="primary.bdBox">
                {groups?.length > 0 && groups?.map((group, k) =>
                <Pressable
                  p="0"
                  borderWidth="0"
                  w={'100%'}
                  onPress={()=>{
                   push(`/${event.url}/help_desk/detail/${group.id}`)
                  }}
                
                >
                
               
                
                  <Box w="100%" key={k} borderBottomWidth={k === (groups.length - 1) ? 0 : 1} borderColor="primary.bordercolor" py="3">
                    <HStack pl="30px" alignItems="center" minH="55px" space={0} justifyContent="flex-start">

                      <HStack pt="0" w="100%" space="5" alignItems="center" justifyContent="space-between">
                        <VStack maxW={'calc(100% - 80px)'} space="1">
                          <Text fontSize="md" lineHeight="22px">
                            {group?.info.name}
                          </Text>
                        </VStack>
                        <Spacer />
                        <HStack pr="3" space="5" alignItems="center">
                          <IconButton
                            bg="transparent"
                            p="1"
                            _hover={{ bg: 'transparent' }}
                            icon={<Icon size="md" as={SimpleLineIcons} name="arrow-right" color="primary.text" />}
                            onPress={() => {
                              push(`/${event.url}/help_desk/detail/${group.id}`)
                            }}
                          />
                        </HStack>
                      </HStack>
                    </HStack>
                  </Box>
                   </Pressable>
                  )}
                {groups?.length <= 0 && <Box overflow="hidden" bg="primary.box" w="100%" rounded="lg" p={5}>
                  <Text>{event.labels?.GENERAL_NO_RECORD}</Text>
                </Box>}
              </Box>
                <BannerAds module_name={'help_desk'} module_type={'listing'} />
            </Container>
          </>
        )
      }
    </>
  )
}

export default Index


