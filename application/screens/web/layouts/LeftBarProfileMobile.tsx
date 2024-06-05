import * as React from 'react';

import { Center, HStack, Pressable, ScrollView, Text, VStack } from 'native-base';

import { useWindowDimensions } from 'react-native';

import UseEventService from 'application/store/services/UseEventService';

import DynamicIcon from 'application/utils/DynamicIcon';
import UseAuthService from 'application/store/services/UseAuthService';

import { useRouter } from 'next/router';

import {  func } from 'application/styles';

const PressableElement = ({row,setProfileBar}: any) => {

  const { width } = useWindowDimensions();

  const router = useRouter()

  const { event, setting_modules } = UseEventService();
  const { logout, response } = UseAuthService();

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
        if(row?.alias === 'logout'){
          logout()
          setTimeout(()=>{
              setProfileBar(false)
        },800)
        }else{
          router.push(`/${event.url}/settings/${row?.alias}`)
          setTimeout(()=>{
              setProfileBar(false)
        },800)

        }
        
      }}>

      <HStack space="4" alignItems="center">
        <Center w="30px">
          <DynamicIcon iconType={row?.icon?.replace("-icon", "").replace("-","_").replace('.png','') } iconProps={{ width: 26, height: 26, color: isHovered || router.pathname.includes(row?.alias) ? func.colorType(event?.settings?.primary_color)  : undefined }} />
        </Center>
        <Text fontSize={'lg'} color={isHovered || router.pathname.includes(row?.alias) ? 'primary.hovercolor'  : "primary.text"}>
          {row?.name.replace('label','')}
          {/* {row?.alias.replace('-','_')} */}
        {/* {row?.icon?.replace("-icon", "").replace("-", "_").replace('.png', '')} */}
        </Text>
      </HStack>
    </Pressable>

  )
}

const LeftBarProfileMobile = ({setProfileBar}:any) => {

  const { width,height } = useWindowDimensions();

  const router = useRouter()

  const { event, setting_modules } = UseEventService();
  return (
    <Center overflow="auto" position="sticky" top="2rem" alignItems="flex-start" w='100%'>
        <ScrollView w={'100%'} h={height - 40}>

        <VStack space={1} px={3} w="100%" maxW="100%" >

        {setting_modules?.map((row: any, key: any) =>
          <PressableElement row={row} key={key} setProfileBar={setProfileBar}/>
        )}
        </VStack>
        </ScrollView>
    </Center>
  );

}

export default LeftBarProfileMobile;