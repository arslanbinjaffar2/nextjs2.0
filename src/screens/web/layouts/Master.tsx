import * as React from 'react';
import { Center, Container, Flex, HStack, ScrollView } from 'native-base';
import Sidebar from '@src/screens/web/layouts/Sidebar';
import RightSidebar from '@src/containers/web/right-sidebar/Index';
import Header from '@src/screens/web/layouts/Header';
import BackgroundLayout from '@src/screens/web/layouts/BackgroundLayout';

type Props = {
    children:
    | JSX.Element
    | JSX.Element[]
    | string
    | string[];
    navigation: unknown
};

const Master = ({ children, navigation }: Props) => (
    <BackgroundLayout>
        <Flex w="100%" h="100%" direction="column">
            <ScrollView>
                <Center mx="auto" maxW="1200px" w="100%" py="40px" px="15px">
                    <Header navigation={navigation} />
                    <Container maxW="100%" w="100%">
                        <HStack pt="3" space="5" alignItems="flex-start">
                            <Sidebar navigation={navigation} />
                            <Center alignItems="flex-start" justifyContent="flex-start" w="600px">
                                {children}
                            </Center>
                            <Center alignItems="flex-start" w="265px">
                                <RightSidebar navigation={navigation} />
                            </Center>
                        </HStack>
                    </Container>
                </Center>
            </ScrollView>
        </Flex>
    </BackgroundLayout>
);

export default Master;