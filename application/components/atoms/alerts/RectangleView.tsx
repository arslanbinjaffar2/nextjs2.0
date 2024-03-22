import React from 'react';
import moment from 'moment';
import { useRouter } from 'next/router';
import UseEventService from '../../../store/services/UseEventService'
import { Box, HStack, Spacer, Text, VStack, Pressable, Icon, Center, Badge } from 'native-base'
import IcoBell from 'application/assets/icons/IcoBell';
import { GENERAL_DATE_FORMAT, GENERAL_TIME_FORMAT_WITHOUT_SECONDS } from 'application/utils/Globals'

const RectangleView = ({ id, title, description, date, time, is_last_item }: { id: number, title: string, description: string, date: string, time: string, is_last_item: boolean }) => {
  const router = useRouter();
  const { event } = UseEventService();
  const formatDateTime = (alertTime: string, alertDate: string) => {
    const combinedDateTime = moment(`${alertDate} ${alertTime}`, "DD-MM-YYYY HH:mm:ss");
    const now = moment();
    const duration = moment.duration(now.diff(combinedDateTime));

    if (duration.asHours() < 1) {
      // Less than an hour
      return `${Math.round(duration.asMinutes())} minutes ago`;
    } else if (duration.asHours() >= 1 && duration.asHours() < 24) {
      // Between 1 hour and 24 hours
      return combinedDateTime.format(GENERAL_TIME_FORMAT_WITHOUT_SECONDS);
    } else {
      // More than 24 hours
      return combinedDateTime.format(GENERAL_DATE_FORMAT);
    }
  };

  const navigateToDetail = () => {
    router.push(`/${event.url}/alerts/detail/${id}`);
  };
const RectangleView = ({ id, title, description, date, time, is_last_item }: { id: number, title: string, description: string, date: string, time: string, is_last_item: boolean }) => {
  const router = useRouter();
  const { event } = UseEventService();
  const formatDateTime = (alertTime: string, alertDate: string) => {
    const combinedDateTime = moment(`${alertDate} ${alertTime}`, "DD-MM-YYYY HH:mm:ss");
    const now = moment();
    const duration = moment.duration(now.diff(combinedDateTime));

    if (duration.asHours() < 1) {
      // Less than an hour
      return `${Math.round(duration.asMinutes())} minutes ago`;
    } else if (duration.asHours() >= 1 && duration.asHours() < 24) {
      // Between 1 hour and 24 hours
      return combinedDateTime.format(GENERAL_TIME_FORMAT_WITHOUT_SECONDS);
    } else {
      // More than 24 hours
      return combinedDateTime.format(GENERAL_DATE_FORMAT);
    }
  };

  const navigateToDetail = () => {
    router.push(`/${event.url}/alerts/detail/${id}`);
  };

  return (
    <Pressable
      p="0"
      w="100%"
      onPress={navigateToDetail}
      onPress={navigateToDetail}
      _hover={{ bg: 'primary.500' }}>
      <Box w="100%" borderBottomWidth={!is_last_item ? 1 : 0 } borderColor="primary.bordercolor" py="3">
        <HStack px="3" w="100%" space="2" alignItems="flex-start" justifyContent={'space-between'}>
          <Center bg="primary.darkbox" p="2" rounded={'50%'}>
            <IcoBell width={28} height={28} />
          </Center>


          <VStack bg="red" width={'calc(100% - 60px)'} space="1">
            <Text fontSize="lg" fontWeight={500}>{title}</Text>
            <Text fontSize="md">{description}</Text>
            <Text fontSize="md">{formatDateTime(time, date)}</Text>
            <Text fontSize="lg" fontWeight={500}>{title}</Text>
            <Text fontSize="md">{description}</Text>
            <Text fontSize="md">{formatDateTime(time, date)}</Text>
          </VStack>
          <Spacer />
        </HStack>
        <Badge position="absolute" right="15px" top="20px" bg="secondary.500" shadow="1" w="14px" h="14px" p="0" rounded="100%" />
        <Badge position="absolute" right="15px" top="20px" bg="secondary.500" shadow="1" w="14px" h="14px" p="0" rounded="100%" />
      </Box>
    </Pressable>
  )

}

export default RectangleView


