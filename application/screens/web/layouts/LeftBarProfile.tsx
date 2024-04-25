import * as React from 'react';

import { Center, HStack, Pressable, Text, Tooltip, VStack } from 'native-base';

import { useWindowDimensions } from 'react-native';

import UseEventService from 'application/store/services/UseEventService';

import DynamicIcon from 'application/utils/DynamicIcon';

import { useRouter } from 'next/router';

import {  func } from 'application/styles';

const PressableElement = ({row}: any) => {

  const { width } = useWindowDimensions();

  const router = useRouter()

  const { event, setting_modules } = UseEventService();

  const [isHovered, setIsHovered] = React.useState(false);

  return (
     <Pressable
      w="100%"
      px="4"
      py="2"
      bg={`${router.pathname.includes(row?.alias) && 'primary.500'}`}
      _hover={{ bg: 'primary.500' }}
      onHoverIn={() => setIsHovered(true)}
      onHoverOut={() => setIsHovered(false)}
      borderRadius="4"
      onPress={() => {
        router.push(`/${event.url}/settings/${row?.alias}`)
      }}>

      <HStack space="4" alignItems="center">
        <Center w="30px">
          {console.log(row?.icon)}
          <DynamicIcon iconType={row?.icon?.replace("-icon", "").replace("-","_").replace('.png','') } iconProps={{ width: 26, height: 26, color: isHovered || router.pathname.includes(row?.alias) ? func.colorType(event?.settings?.primary_color)  : undefined }} />
        </Center>
        <Tooltip   label={row.name}>
        <Text fontSize={'lg'} color={isHovered || router.pathname.includes(row?.alias) ? 'primary.hovercolor'  : "primary.text"}>
        {row.name.length>=22?`${row.name.substring(0,22).replace('label','')} ...`:`${row.name}`}
          {/* {row?.alias.replace('-','_')} */}
        {/* {row?.icon?.replace("-icon", "").replace("-", "_").replace('.png', '')} */}
        </Text>
     </Tooltip>
      </HStack>
    </Pressable>

  )
}

const LeftBarProfile = () => {

  const { width } = useWindowDimensions();

  const router = useRouter()

  const { event, setting_modules } = UseEventService();
  return (
    <Center overflowX="hidden" overflowY="auto" position="sticky" top="2rem" alignItems="flex-start" w={width > 1200 ? '265px' : '70px'}>
      <VStack space={1} px={width > 1200 ? '0' : '1'} w="100%" maxW="100%" >
        {setting_modules?.map((row: any, key: any) =>

          <PressableElement row={row} key={key} />
        )}
      </VStack>
    </Center>
  );

}

export default LeftBarProfile;