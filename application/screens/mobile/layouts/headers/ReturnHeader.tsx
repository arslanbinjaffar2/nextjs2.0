
import * as React from 'react';
import AntDesign from '@expo/vector-icons/AntDesign'
import { Center, Flex, Image, Pressable, Icon, Box, View } from 'native-base';
import { images } from 'application/styles'
import { useEffect } from 'react';
import { useRouter } from 'solito/router'
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
    back: string;
};

const ReturnHeader = ({ children, navigation, minimal, back }: Props) => {

    const { push } = useRouter()

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
                            push(back)
                        }}
                    >
                        <Icon size="2xl" color="primary.text" as={AntDesign} name="left" />
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

export default ReturnHeader;