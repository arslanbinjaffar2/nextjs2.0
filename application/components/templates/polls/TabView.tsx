import React from 'react';
import { Box, Divider } from 'native-base'
import ListView from 'application/components/atoms/polls/ListView';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Button, Container, HStack, Icon, Input, Spacer, Text } from 'native-base';

const TabView = () => {

    const [tab, setTab] = React.useState(true)

    return (
        <Container pt="2" maxW="100%" w="100%">
            <HStack mb="3" pt="2" w="100%" space="3" alignItems="center">
                <Text textTransform="uppercase" fontSize="2xl">Polls</Text>
                <Spacer />
                <Input rounded="10" w="60%" bg="primary.box" borderWidth={0} placeholder="Search" leftElement={<Icon ml="2" color="primary.text" size="lg" as={AntDesign} name="search1" />} />
            </HStack>
            <HStack mb="3" space={1} justifyContent="center" w="100%">
                <Button onPress={() => setTab(true)} borderWidth="1px" py={0} borderColor="primary.darkbox" borderRightRadius="0" borderLeftRadius={8} h="42px" bg={tab ? 'primary.box' : 'primary.darkbox'} w="50%" _text={{ fontWeight: '600' }}>ACTIVE</Button>
                <Button onPress={() => setTab(false)} borderWidth="1px" py={0} color="primary.100" borderColor="primary.darkbox" borderLeftRadius="0" borderRightRadius={8} h="42px" bg={!tab ? 'primary.box' : 'primary.darkbox'} w="50%" _text={{ fontWeight: '600' }}>COMPLETED</Button>
            </HStack>
            <Box overflow="hidden" bg="primary.box" w="100%" rounded="lg">
                <ListView />
                <ListView />
                <ListView />
                <ListView />
                <ListView />
                <Divider h="100px" bg="transparent" />
            </Box>
        </Container>
    )

}

export default TabView