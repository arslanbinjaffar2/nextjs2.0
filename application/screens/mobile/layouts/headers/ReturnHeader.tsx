
import * as React from 'react';
import AntDesign from '@expo/vector-icons/AntDesign'
import { Center, Flex, Image, Pressable, Icon, Box, View } from 'native-base';
import { images } from 'application/styles'
import { useEffect } from 'react';
import { useRouter } from 'solito/router'

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
                        <Image alt='logo' width={140} height={30} source={images.Logo} alignSelf={'center'} />
                    </Box>
                </Center>
            </Flex>
        </View>
    )
}

export default ReturnHeader;