import * as React from 'react';

import { Center, HStack, Pressable, Text, VStack } from 'native-base';

import { useWindowDimensions } from 'react-native';

import UseEventService from 'application/store/services/UseEventService';

import DynamicIcon from 'application/utils/DynamicIcon';

import { useRouter } from 'next/router';

const LeftBarProfile = () => {

  const { width } = useWindowDimensions();

  const router = useRouter()

  const { event, setting_modules } = UseEventService();

  return (
    <Center overflow="auto" position="sticky" top="2rem" alignItems="flex-start" w={width > 1200 ? '265px' : '70px'}>
      <VStack space={1} px={width > 1200 ? '0' : '1'} w="100%" maxW="100%" >
        {setting_modules?.map((row: any, key: any) =>

          <Pressable
            key={key}
            w="100%"
            px="4"
            py="2"
            bg={`${router.pathname.includes(row?.alias) && 'primary.500'}`}
            _hover={{ bg: 'primary.500' }}
            borderRadius="4"
            onPress={() => {
              router.push(`/${event.url}/settings/${row?.alias.replace}`)
            }}>

            <HStack space="4" alignItems="center">
              <Center w="30px">
                <DynamicIcon iconType={row?.alias.replace('-','_')} iconProps={{ width: 24, height: 21 }} />
              </Center>
              <Text fontSize={'lg'} color="primary.text">{row?.name.replace('label','')}</Text>
            </HStack>
          </Pressable>
        )}
      </VStack>
    </Center>
  );

}

export default LeftBarProfile;