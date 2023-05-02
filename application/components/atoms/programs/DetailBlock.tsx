import React from 'react'
import { Box, Container, HStack, Icon, Spacer, Text, Image, Divider } from 'native-base';
import Ionicons from '@expo/vector-icons/Ionicons';
import DynamicIcon from 'application/utils/DynamicIcon';

const DetailBlock = (props: any) => {
    return <Container mb="3" mt="5" maxW="100%" w="100%" bg="primary.box" rounded="10">
        <Image
            source={{
                uri: 'https://wallpaperaccess.com/full/39050.jpg'
            }}
            alt="Alternate Text"
            size="full"
            w="100%"
            h="160px"
            rounded="10"
            mb="5"
        />
        <Box w="100%" px="5">
            <HStack w="100%" mb="3" space="3" alignItems="flex-start">
                <Text maxW="80%" fontSize="xl">Water cleaning in Africa</Text>
                <Spacer />
                <DynamicIcon iconType="checkIn" iconProps={{ width: 25, height: 24 }} />
            </HStack>
            <HStack w="100%" mb="3" space="10" alignItems="center">
                <Text fontSize="md">12:15 - 13:30</Text>
                <HStack space="3" alignItems="center">
                    <Icon color="primary.text" size="md" as={Ionicons} name="ios-location-sharp" />
                    <Text pt="2px" fontSize="md">Room 105</Text>
                </HStack>
            </HStack>
            <Box mb="4" w="100%">
                <Text mb="3" fontSize="md">Track: Aid to 3rd world children</Text>
                <Divider mb="4" bg="primary.text" />
                <Text maxW="60%" fontSize="md">Lorem ipsum dolor sit amet, eos ex tamquam praesent scriptorem, nec autem definitiones at. Cu vis sumo oratio. praesent scriptorem, nec autem definitiones at.</Text>
            </Box>
        </Box>
    </Container>;
};

export default DetailBlock