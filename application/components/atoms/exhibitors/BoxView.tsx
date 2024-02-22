import React from 'react'
import { Box, Image, Spacer, Text, Center, HStack, IconButton, Icon, Pressable, ZStack } from 'native-base'
import { Exhibitor } from 'application/models/exhibitor/Exhibitor'
import DynamicIcon from 'application/utils/DynamicIcon';
import UseEnvService from 'application/store/services/UseEnvService';
import UseExhibitorService from 'application/store/services/UseExhibitorService';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'solito/router'
import UseEventService from 'application/store/services/UseEventService';
import ExhibitorDefaultImage from 'application/assets/images/exhibitors-default.png';
import { Linking } from 'react-native';

type AppProps = {
    exhibitor: Exhibitor,
    k: number
    w?: string
}

const BoxView = ({ k, exhibitor, w }: AppProps) => {

    const { _env } = UseEnvService()

    const { settings, MakeFavourite } = UseExhibitorService();

    const { push } = useRouter()

    const { event } = UseEventService()

    return (
        <>
            <Box  w={w ? w : "49%"}>
                <Pressable
                    onPress={async () => {
                        if(exhibitor?.url && exhibitor?.url !== '' && exhibitor.url !== 'http://' && exhibitor.url !== 'https://'){
                            const url: any = `${exhibitor?.url}`;
                            const supported = await Linking.canOpenURL(url);
                            if (supported) {
                                await Linking.openURL(url);
                            }}
                        else{
                            push(`/${event.url}/exhibitors/detail/${exhibitor.id}`)
                        }
                    }}>
                    <Box mb="3" w="100%" bg="primary.box" p="0" borderWidth="1" borderColor="primary.box" rounded="10">
                    <Text fontSize="md" textAlign={'center'} my={2}>{exhibitor?.name}</Text>
                        {settings?.mark_favorite === 1 && (
                            <IconButton
                                bg="transparent"
                                p="1"
                                _hover={{ bg: 'primary.500' }}
                                icon={<Icon size="md" as={Ionicons} name={exhibitor.attendee_exhibitors.length > 0 ? 'heart' : 'heart-outline'} color="primary.text" />}
                                onPress={() => {
                                    MakeFavourite({ exhibitor_id: exhibitor.id, screen: 'listing' });
                                }}
                                position={'absolute'}
                                zIndex={'999999'}
                                right={'3px'}
                                top={'3px'}
                            />
                        )}
                        <Center mb={1} px="1" alignItems="center" w="100%">
                            {exhibitor.logo ? (
                                <Image source={{ uri: `${_env.eventcenter_base_url}/assets/exhibitors/large/${exhibitor.logo}` }} alt="Alternate Text" w="210px" h="72px" />
                            ) : (
                                <Image source={ExhibitorDefaultImage} alt="Alternate Text" w="210px" h="72px" />
                            )}
                        </Center>
                        <HStack pb={6} space="3" alignItems="center" position={'relative'}>
                            {settings?.catTab == 1 && exhibitor?.categories.length > 0 && <Center alignItems="flex-start" minH={'25px'} w="100%" position={'relative'}>
                                <ZStack reversed>
                                    {exhibitor?.categories.length > 0 && exhibitor?.categories.map((cat, i)=>(
                                        <Box key={cat.id} bg={cat.color} borderWidth="1" borderColor="primary.box" borderRightRadius="10" h={'25px'} shadow="1"  w={`${measureText(exhibitor?.categories[0]?.info.name, 14) + 16 + (i * 10)}px`} px="2">
                                            {i== 0 && <Text fontSize="sm">{cat?.info?.name}</Text>}
                                        </Box>
                                    ))}
                                </ZStack>
                            </Center>}
                            <Center pr="6" alignItems="flex-end" w="50%">
                                {exhibitor.booth && <HStack space="3" alignItems="center">
                                    <DynamicIcon iconType="exhibitors" iconProps={{ width: 16, height: 16 }} />
                                    <Text fontSize="md">{exhibitor.booth}</Text>
                                </HStack>}
                            </Center>
                        </HStack>
                    </Box>
                </Pressable>
            </Box>
            {(k + 1) % 2 === 1 && (
                <Spacer w="2%" />
            )}
        </>
    )
}

export default BoxView



function measureText(str:string, fontSize:number) {
    const widths = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0.2796875,0.2765625,0.3546875,0.5546875,0.5546875,0.8890625,0.665625,0.190625,0.3328125,0.3328125,0.3890625,0.5828125,0.2765625,0.3328125,0.2765625,0.3015625,0.5546875,0.5546875,0.5546875,0.5546875,0.5546875,0.5546875,0.5546875,0.5546875,0.5546875,0.5546875,0.2765625,0.2765625,0.584375,0.5828125,0.584375,0.5546875,1.0140625,0.665625,0.665625,0.721875,0.721875,0.665625,0.609375,0.7765625,0.721875,0.2765625,0.5,0.665625,0.5546875,0.8328125,0.721875,0.7765625,0.665625,0.7765625,0.721875,0.665625,0.609375,0.721875,0.665625,0.94375,0.665625,0.665625,0.609375,0.2765625,0.3546875,0.2765625,0.4765625,0.5546875,0.3328125,0.5546875,0.5546875,0.5,0.5546875,0.5546875,0.2765625,0.5546875,0.5546875,0.221875,0.240625,0.5,0.221875,0.8328125,0.5546875,0.5546875,0.5546875,0.5546875,0.3328125,0.5,0.2765625,0.5546875,0.5,0.721875,0.5,0.5,0.5,0.3546875,0.259375,0.353125,0.5890625]
    const avg = 0.5279276315789471
  return Array.from(str).reduce(
    (acc, cur) => acc + (widths[cur.charCodeAt(0)] ?? avg), 0
  ) * fontSize
}