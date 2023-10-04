
import * as React from 'react';
import { Dimensions } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { Center, Flex, Image, Pressable, Icon, Box, View, VStack, HStack } from 'native-base';
import { images } from 'application/styles'
import { useEffect } from 'react';
import UseEnvService from 'application/store/services/UseEnvService';
import UseEventService from 'application/store/services/UseEventService';

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

    const { _env } = UseEnvService();
    const { event } = UseEventService();
    
    return (
        <View>
            <Flex pt="3" direction="row" alignItems="center" safeAreaTop>
                <Center style={{ flex: 1 }} ml="-10%" pt="10px">
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
                        <Image alt='logo' width={140} height={30} source={{uri:`${_env.eventcenter_base_url}/assets/event/branding/${event.settings?.header_logo}`}} alignSelf={'center'} />
                    </Box>
                </Center>
            </Flex>
        </View>
    )
}

export default ModuleHeader;