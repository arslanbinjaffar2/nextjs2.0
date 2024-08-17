import React, { useState } from "react"
import UseAuthService from 'application/store/services/UseAuthService';
import UseEventService from 'application/store/services/UseEventService';
import UseAttendeeService from 'application/store/services/UseAttendeeService';
import { Center, Box, Text, HStack, Divider, Button, Spacer } from "native-base"
import { getColorScheme } from "application/styles/colors";
import { useRouter } from "solito/router";
import { useWindowDimensions } from "react-native";

const GDPR = () => {
    const { push } = useRouter();
    const { updateOnboarding, getUser, onboarding } = UseAuthService();
    const { addGDPRlog } = UseAttendeeService();
    const { width } = useWindowDimensions();
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
    const [isSubmitting, setIsSubmitting] = useState(false);

    React.useEffect(() => {
        if(onboarding?.show_gdpr === false){
            handleNextRedirection();
        }
    },[]);

    const handleGDPRClick = async (gdprValue: number) => {
        setIsSubmitting(true);
        await addGDPRlog({ gdpr: gdprValue });
        await updateOnboarding({show_gdpr: false});
        await handleNextRedirection();
    }

    const handleNextRedirection  = async () => {
        if (onboarding?.show_subregistration) {
          push(`/${event.url}/subRegistration`);
        } else if (onboarding?.show_network_intrest) {
          push(`/${event.url}/network-interest`);
        } else {
          push(`/${event.url}/dashboard`);
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
                        contentWidth={width > 600 ? 600 : width - 90}
                        systemFonts={['Avenir']}
                        tagsStyles={mixedStyle}
                        source={{ html: event?.gdpr?.description }}
                    />
                <Box py="0" w="100%">
                    <Divider mb="15" opacity={0.27} bg="primary.text" />
                    <HStack mb="3" space="3" alignItems="center">
                        <Button
                            bg="transparent"
                            p="2"
                            fontSize="lg"
                            colorScheme="primary"
                            _text={{color: 'primary.text'}}
                            _hover={{ _text: { color: 'primary.hovercolor' } }}
                            onPress={() => handleGDPRClick(0)}
                            isDisabled={isSubmitting}
                        >
                            {event?.labels?.GDPR_CANCEL}
                        </Button>
                        <Spacer />
                        <Button
                            py="2"
                            _hover={{ _text: { color: 'primary.hovercolor' } }}
                            _text={{ color: 'primary.hovercolor' }}
                            onPress={() => handleGDPRClick(1)}
                            isDisabled={isSubmitting}
                            isLoading={isSubmitting}
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
