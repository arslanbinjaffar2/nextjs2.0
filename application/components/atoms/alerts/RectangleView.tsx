import React from 'react';
import moment from 'moment';
import { useRouter } from 'next/router';
import { Box, HStack, Spacer, Text, VStack, Pressable, Icon, Center, Badge } from 'native-base'
import { Survey } from 'application/models/survey/Survey';
import UseEventService from 'application/store/services/UseEventService';
import IcoBell from 'application/assets/icons/IcoBell';
import { GENERAL_DATE_FORMAT, GENERAL_TIME_FORMAT_WITHOUT_SECONDS } from 'application/utils/Globals'

const RectangleView = ({ id, title, description, date, time, is_last_item, is_read }: { id: number, title: string, description: string, date: string, time: string, is_last_item: boolean, is_read: boolean }) => {
  const router = useRouter();
  const { event } = UseEventService();

  const navigateToDetail = () => {
    router.push(`/${event.url}/alerts/detail/${id}`);
  };

  return (
    <Pressable
      p="0"
      w="100%"
      onPress={navigateToDetail}
      >
      <Box w="100%" borderBottomWidth={!is_last_item ? 1 : 0 } borderColor="primary.bordercolor" py="3">
        <HStack px="3" w="100%" space="2" alignItems="flex-start" justifyContent={'space-between'}>
          <Center bg="primary.darkbox" p="2" rounded={'50%'}>
            <IcoBell width={28} height={28} />
          </Center>

          <VStack bg="red" width={'calc(95% - 60px)'} space="1">
            <Text fontSize="lg" fontWeight={500}>{title}</Text>
            <Text fontSize="md" isTruncated numberOfLines={3}>{description}</Text>
            <Text fontSize="md">{date}</Text>
          </VStack>
          <Spacer />
        </HStack>
        {!is_read &&
         <Badge position="absolute" right="15px" top="20px" bg="secondary.500" shadow="1" w="14px" h="14px" p="0" rounded="100%" />
        }
      </Box>
    </Pressable>
  )

}

export default RectangleView


