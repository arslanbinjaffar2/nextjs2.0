import React from 'react';
import { Box, HStack, Spacer, Text, VStack } from 'native-base'

const Detail = ({ id, title, description, date, time }: { id: number, title: string, description: string, date: string, time: string }) => {

    return (
        <Box w="100%" borderBottomWidth='0' borderColor="primary.bordercolor" py="3">
            <HStack px="4" w="100%" space="2" alignItems="flex-start" justifyContent={'space-between'}>

                <VStack bg="red" width={'100%'} space="1">
                    <Text fontSize="2xl" fontWeight={500}>{title}</Text>
                    <Text fontSize="md">{date}</Text>
                    <Text fontSize="md">{description}</Text>
                </VStack>
                <Spacer />
            </HStack>
        </Box>
    )

}

export default Detail


