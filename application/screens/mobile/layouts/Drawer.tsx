import * as React from 'react';

import { DrawerContentScrollView } from '@react-navigation/drawer';

import { Avatar, Box, Flex, HStack, Text, VStack, Pressable, Icon } from 'native-base';

import UseEventService from 'application/store/services/UseEventService';

import { useRoute } from '@react-navigation/native';

import DynamicIcon from 'application/utils/DynamicIcon';

const Drawer = (props: any) => {

    const { event, loadModules, modules } = UseEventService();

    const route = useRoute();

    React.useEffect(() => {
        loadModules();
    }, [])

    return (
        <DrawerContentScrollView {...props} safeArea>
            <Box px="4" py="5">
                <Flex alignItems="center" flexDirection={'row'}>
                    <Avatar w="70px" h="70px" bg="green.500">
                        HA
                    </Avatar>
                    <VStack px="4" space="0">
                        <Text isTruncated w="200px" pr="20px" fontSize="xl" textTransform={'uppercase'} bold> MIKE HECHSON</Text>
                        <Text p="0" fontSize="16" mt="0">Marketing sales person</Text>
                    </VStack>
                </Flex>
            </Box>
            <VStack space="3">
                <Box bg={
                    'dashboard' === route.name
                        ? {
                            linearGradient: {
                                colors: ['primary.400', 'transparent'],
                                start: [0, 0],
                                end: [1, 0]
                            }
                        }
                        : "transparent"
                }
                >
                    <Pressable
                        px="5"
                        py="3"
                        onPress={() => { props.navigation.navigate('dashboard') }}>
                        <HStack space="2" alignItems="center">
                            <DynamicIcon iconType="IcoMyEvents" iconProps={{ width: 24, height: 24 }} />
                            <Text fontSize={'18px'} color="primary.text" fontWeight="600">Dashboard</Text>
                        </HStack>
                    </Pressable>
                </Box>
                {modules.map((row: any, key: any) =>
                    <Box
                        bg={
                            row.alias === route.name
                                ? {
                                    linearGradient: {
                                        colors: ['primary.400', 'transparent'],
                                        start: [0, 0],
                                        end: [1, 0]
                                    }
                                }
                                : "transparent"
                        }
                        key={key}
                    >
                        <Pressable
                            px="5"
                            py="3"
                            onPress={() => { props.navigation.navigate(row?.alias) }}>
                            <HStack space="2" alignItems="center">
                                <DynamicIcon iconType={row?.alias} iconProps={{ width: 24, height: 24 }} />
                                <Text fontSize={'18px'} color="primary.text" fontWeight="600">{row?.name}</Text>
                            </HStack>
                        </Pressable>
                    </Box>
                )}
            </VStack>
        </DrawerContentScrollView>
    );
}

export default Drawer;