import React, { useState } from "react"
import { useRouter } from 'solito/router'
import UseAuthService from 'application/store/services/UseAuthService';
import UseEventService from 'application/store/services/UseEventService';
import UseAttendeeService from 'application/store/services/UseAttendeeService';
import { Center, Box, Text, HStack, Divider, Button, Spacer } from "native-base"

const GDPR = () => {
    const { push } = useRouter();
    const { event } = UseEventService();
    const { response, getUser } = UseAuthService();
    const { addGDPRlog } = UseAttendeeService();

    const checkUserGDPR = () => {
        let requiredGDPR = event?.gdpr_settings?.enable_gdpr === 1 ? true : false;
        if (requiredGDPR) {
            let userGDPRLogged = response?.data?.user?.gdpr_log;
            if (!userGDPRLogged) {
                return false;
            }
        }
        return true;
    }

    React.useEffect(() => {
        if (checkUserGDPR() === true) {
            push(`/${event.url}/subRegistration`)
        }
    }, [response])

    return (
        <>
            <Center w={'100%'} h="100%" alignItems={'center'} px={15} bg={"primary.box"}>
                <HStack mb="3" pt="3" w="100%" space="3" alignItems="center">
                    <Text fontSize="2xl">{event?.gdpr?.subject}</Text>
                </HStack>
                <HStack w="100%" space="3" alignItems="center">
                    <p dangerouslySetInnerHTML={{ __html: event?.gdpr?.description }}>{ }</p>
                </HStack>
                <Box py="0" w="100%">
                    <Divider mb="15" opacity={0.27} bg="primary.text" />
                    <HStack mb="3" space="3" alignItems="center">
                        <Button
                            bg="transparent"
                            p="2"
                            fontSize="lg"
                            colorScheme="primary"
                            _hover={{ _text: { color: 'primary.hovercolor' } }}
                            onPress={() => {
                                addGDPRlog({ gdpr: 0 })
                                push(`/${event.url}/subRegistration`)
                            }}
                        >
                            {event?.labels?.GDPR_CANCEL}
                        </Button>
                        <Spacer />
                        <Button
                            w="80px"
                            py="2"
                            px="1"
                            _hover={{ _text: { color: 'primary.hovercolor' } }}
                            colorScheme="primary"
                            onPress={() => {
                                addGDPRlog({ gdpr: 1 })
                                push(`/${event.url}/subRegistration`)
                            }}
                        >
                            {event?.labels?.GDPR_ACCEPT}
                        </Button>
                    </HStack>
                </Box>
            </Center>
        </>
    )
}


export default GDPR
