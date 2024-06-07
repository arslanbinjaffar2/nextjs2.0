
import React, { useEffect } from 'react'
import {HStack, Spacer } from 'native-base'
import UseAttendeeService from 'application/store/services/UseAttendeeService';
import SectionLoading from 'application/components/atoms/SectionLoading';

const MyRegistrationDetail = () => {

    const { FetchMyRegistration, registration } = UseAttendeeService();
    React.useEffect(() => {
        FetchMyRegistration();
    }, []);

    return (
        <>
        <HStack mb="3" pt="2" w="100%" space="3" alignItems="center" bgColor={'#fff'}>
            <Spacer />
            {registration?.invoice ? <div dangerouslySetInnerHTML={{ __html: registration?.invoice }} /> : <SectionLoading />}
        </HStack>
            
        </>
    )

};

export default MyRegistrationDetail