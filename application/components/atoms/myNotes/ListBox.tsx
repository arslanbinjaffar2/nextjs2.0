import React from 'react'
import { HStack, Icon, Spacer, Text, Pressable } from 'native-base';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import { Info } from 'application/models/Info'
import { useRouter } from 'solito/router'
import UseEventService from 'application/store/services/UseEventService';

const ListBox = (info: Info) => {
console.log("🚀 ~ ListBox ~ info:", info)

    const { push } = useRouter()

    const { event } = UseEventService()

    return (
        <Pressable
            onPress={async () => {
                alert("gello")
                }}>
            <HStack borderTopWidth={info?.index === 0 ? 0 : "1px"} borderTopColor="primary.bordercolor" px="4" py="5" space="4" alignItems="center">
                <Text fontSize="lg">{info?.detail?.name}</Text>
                <Spacer />
                <Icon as={SimpleLineIcons} name="arrow-right" size="md" color="primary.text" />
            </HStack>
        </Pressable>
    )
}

export default ListBox