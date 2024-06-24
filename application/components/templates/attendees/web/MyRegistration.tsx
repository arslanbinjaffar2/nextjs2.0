
import React, { useRef, useState } from 'react'
import axios from 'axios';
import { Box, HStack, Text, Pressable } from 'native-base'
import UseAttendeeService from 'application/store/services/UseAttendeeService';
import SectionLoading from 'application/components/atoms/SectionLoading';
import UseEventService from 'application/store/services/UseEventService';
import NextBreadcrumbs from 'application/components/atoms/NextBreadcrumbs';
import { func } from 'application/styles';
import UseLoadingService from 'application/store/services/UseLoadingService';
import UseEnvService from 'application/store/services/UseEnvService';
import DynamicIcon from 'application/utils/DynamicIcon';

const MyRegistrationDetail = () => {
    const [iframeHeight, setIframeHeight] = useState(0);
    const iframe = useRef<any>();
    const { _env } = UseEnvService()
    const { processing } = UseLoadingService();
    const { FetchMyRegistration, registration } = UseAttendeeService();
    const { modules, event } = UseEventService();
    const [loading, setLoading] = useState(false);
    const [clonedOrderID, setClonedOrderID] = useState(null);
    const [editOrderFrame, setEditOrderFrame] = useState(false);

    const cloneOrder = (id: number) => {
        setLoading(true);
        axios.post(`${_env.app_api_url}/registration/event/${event.url}/registration/clone-order/${id}/eventsite`, {})
            .then(
                response => {
                    setLoading(false);
                    console.log(response.data);
                    if (response.data.success) {
                        console.log(response.data.data.id);
                        setClonedOrderID(response.data.data.id);
                        setEditOrderFrame(true);
                        setLoading(false);
                    }
                },
                error => {
                    setLoading(false);
                }
            );
    }


    React.useEffect(() => {
        FetchMyRegistration();
    }, []);

    React.useEffect(() => {
        const listener = (events: any) => {
            if (events.data.order_id !== undefined) {
                setEditOrderFrame(false);
                FetchMyRegistration();
            }
        }
        window.addEventListener("message", listener);
        return () => {
            window.removeEventListener('message', listener);
        }
    }, []);

    const module = modules.find((module) => module.alias === ("attendees"));
    return (
        <>
            <NextBreadcrumbs module={module} title={event?.labels?.EVENTSITE_MY_PROFILE_PROGRAM ?? 'My Registration'} />
            <HStack w="100%" justifyContent="space-between" alignItems="center" mt={3}>
                <Text fontSize="2xl" fontWeight="medium">{event?.labels?.EVENTSITE_MY_PROFILE_PROGRAM ?? 'My Registration'}</Text>
                {!editOrderFrame && !processing.includes('my-registration') && registration?.is_invoice_update === 1 &&
                    <Pressable
                        p="1"
                        borderRadius="8"
                        onPress={() => cloneOrder(registration?.order_id)}>
                        <DynamicIcon iconType={'edit_profile'} iconProps={{ width: 18, height: 18 }} />
                    </Pressable>
                }
            </HStack>
            {loading ? <SectionLoading /> :

                <>
                    {editOrderFrame ?
                        <>
                            <Box mb="3" mt={3} w="100%" p={4} rounded={'10'} alignItems="center" bg={'primary.box'}>
                                {clonedOrderID ? <>
                                    <iframe
                                        ref={iframe}
                                        width={'100%'}
                                        height={iframeHeight}
                                        src={`${_env.app_registration_url}/${event.url}/admin/order-summary/${clonedOrderID}`}
                                    />
                                </>
                                    : <SectionLoading />}
                            </Box>
                        </>
                        :

                        <>
                            {registration?.invoice && !processing.includes('my-registration') ?
                                <Box mb="3" mt={3} w="100%" px={7} py={5} rounded={'10'} alignItems="center" bg={'primary.box'}>
                                    <iframe
                                        style={{ borderWidth: 0, color: '#fff', backgroundColor: '#fff', borderRadius: 10, padding: 10 }}
                                        ref={iframe}
                                        width={'100%'}
                                        onLoad={() => {
                                            const obj = iframe.current;
                                            setIframeHeight(
                                                obj.contentWindow.document.body.scrollHeight + 50
                                            );
                                        }}
                                        height={iframeHeight}
                                        srcDoc={registration?.invoice}
                                    />

                                </Box>
                                : <SectionLoading />}
                        </>
                    }
                </>

            }
        </>
    )

};

export default MyRegistrationDetail