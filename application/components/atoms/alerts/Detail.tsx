import React from 'react';
import moment from 'moment';
import { useRouter } from 'next/router';
import UseEventService from '../../../store/services/UseEventService'
import { Box, HStack, Spacer, Text, VStack, Pressable, Icon, Center, Badge } from 'native-base'
import IcoBell from 'application/assets/icons/IcoBell';
import { GENERAL_DATE_FORMAT, GENERAL_TIME_FORMAT_WITHOUT_SECONDS } from 'application/utils/Globals'

const Detail = ({ id, title, description, date, time }: { id: number, title: string, description: string, date: string, time: string }) => {
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

    return (
        <Box w="100%" borderBottomWidth='0' borderColor="primary.bordercolor" py="3">
            <HStack px="4" w="100%" space="2" alignItems="flex-start" justifyContent={'space-between'}>

                <VStack bg="red" width={'100%'} space="1">
                    <Text fontSize="2xl" fontWeight={500}>{title}</Text>
                    <Text fontSize="md">{formatDateTime(time, date)}</Text>
                    <Text fontSize="md">{description}</Text>
                </VStack>
                <Spacer />
            </HStack>
        </Box>
    )

}

export default Detail


