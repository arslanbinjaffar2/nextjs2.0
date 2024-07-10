import React, { useState } from "react"
import { useRouter } from 'solito/router'
import UseEventService from 'application/store/services/UseEventService';
import UseAuthService from 'application/store/services/UseAuthService';
import { Center, Box, Text, HStack, Divider, Button, Spacer } from "native-base"
import { getColorScheme } from "application/styles/colors";

const Disclaimer = () => {
    const { push } = useRouter();
    const { logout } = UseAuthService()
    const RenderHtml = require('react-native-render-html').default;
    const { event } = UseEventService()
    const colors = getColorScheme(event?.settings?.app_background_color ?? '#343d50', event?.settings?.app_text_mode);
    const mixedStyle = {
    body: {
        fontFamily: 'Avenir',
        fontSize: '16px',
        userSelect: 'auto',
        color: colors.text
    },
    p: {
        fontFamily: 'Avenir',
    }
    }

    return (
        <>
            <Center rounded={10} w={'100%'} h="100%" alignItems={'center'} px={15} bg={"primary.box"}>
                <HStack mb="3" pt="4" w="100%" space="3" alignItems="center">
                    <Text fontSize="2xl">{event?.gdpr?.subject}</Text>
                </HStack>
                    <RenderHtml
                        defaultTextProps={{selectable:true}}
                        contentWidth={600}
                        systemFonts={['Avenir']}
                        tagsStyles={mixedStyle}
                        source={{ html: event?.disclaimer_setting?.disclaimer }}
                    />
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
                                logout()
                            }}
                        >
                            {event?.labels?.GDPR_CANCEL}
                        </Button>
                        <Spacer />
                        <Button
                            py="2"
                            _hover={{ _text: { color: 'primary.hovercolor' } }}
                            _text={{ color: 'primary.hovercolor' }}
                            onPress={() => {
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


export default Disclaimer
