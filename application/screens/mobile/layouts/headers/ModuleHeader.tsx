
import * as React from 'react';
import { Dimensions } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { Center, Flex, Image, Pressable, Icon, Box, View, VStack, HStack } from 'native-base';
import { images } from 'application/styles'
import { useEffect } from 'react';

type Props = {
    children:
    | JSX.Element
    | JSX.Element[]
    | string
    | string[];
    navigation: any;
    minimal: any;
};

const ModuleHeader = ({ children, navigation, minimal }: Props) => {

    const width = Dimensions.get('window').width;

    useEffect(() => {
    }, [minimal]);

    return (
        <View>
            <Flex pt="3" direction="row" alignItems="center" safeAreaTop>
                <Center style={{ flex: 1 }} pt="10px">
                    <Pressable
                        onPress={() => {
                            navigation.toggleDrawer();
                        }}
                    >
                        <Icon size="2xl" color="primary.text" as={MaterialIcons} name="menu" />
                    </Pressable>
                </Center>
                <Center style={{ flex: 1 }} >{children}</Center>
                <Center style={{ flex: 1 }}>
                    <Box>
                        <Image alt='logo' width={140} height={30} source={images.Logo} alignSelf={'center'} />
                    </Box>
                </Center>
            </Flex>
        </View>
    )
}

export default ModuleHeader;