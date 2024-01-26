import React from 'react';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons'
import { Box, HStack, Spacer, Text, VStack, Pressable, Icon, Center } from 'native-base'
import { Survey } from 'application/models/survey/Survey';
import UseEventService from 'application/store/services/UseEventService';
import { useRouter } from 'solito/router'
import IcoBell from 'application/assets/icons/IcoBell';

const RectangleView = ({title, description, date_time}:{title:string,description:string, date_time:string}) => {
  // const { event } = UseEventService();
  // const { push } = useRouter()

  return (
    <Pressable
      p="0"
      w="100%"
      _hover={{ bg: 'primary.500' }}>
      <Box w="100%" borderBottomWidth='1' borderColor="primary.text" py="3">
        <HStack px="3" w="100%" space="2" alignItems="center" justifyContent={'space-between'}>
          <Center  bg="primary.darkbox" p="2" rounded={'50%'}>
            <IcoBell width={28} height={28} />
          </Center>
          
          <VStack bg="red" width={'calc(100% - 60px)'} space="1">
            <Text fontSize="lg" >{title}</Text>
            <Text fontSize="sm">{description}</Text>
            <Text fontSize="sm">{date_time}</Text>
          </VStack>
          <Spacer />
        </HStack>
      </Box>
    </Pressable>
  )

}

export default RectangleView


