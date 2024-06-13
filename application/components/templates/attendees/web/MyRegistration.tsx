
import React, { useEffect, useRef, useState } from 'react'
import {Box, HStack, Spacer } from 'native-base'
import UseAttendeeService from 'application/store/services/UseAttendeeService';
import SectionLoading from 'application/components/atoms/SectionLoading';

const MyRegistrationDetail = () => {
    const [iframeHeight, setIframeHeight] = useState(0);
    const iframe = useRef<any>();

    const { FetchMyRegistration, registration } = UseAttendeeService();
    React.useEffect(() => {
        FetchMyRegistration();
    }, [registration]);

    return (
        <>
        <Box mb="3" w="100%" p={4} rounded={'10'}  alignItems="center" bg={'white'}>
            {registration?.invoice ? <>
            {/* <div dangerouslySetInnerHTML={{ __html: registration?.invoice }} /> */}
            <iframe 
            style={{ borderWidth: 0, color:'#fff' }} 
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
        /></>
             : <SectionLoading />}
        </Box>
            
        </>
    )

};

export default MyRegistrationDetail