import React, { useEffect } from 'react';
import { Avatar, Box, Divider, Flex, Pressable, VStack } from 'native-base'
import { Button, Container, HStack, Icon, Input, Spacer, Text } from 'native-base';
import DynamicIcon from 'application/utils/DynamicIcon';
import UseAuthService from 'application/store/services/UseAuthService';
import UseEnvService from 'application/store/services/UseEnvService';
import NextBreadcrumbs from 'application/components/atoms/NextBreadcrumbs';


const Index = () => {
    const {response} = UseAuthService();
    const { _env } = UseEnvService();
    
    // Function to get the first letters of the first and last name
    const getFirstLetters = (name: string) => {
    if(name){
        const names = name.split(' ');
        return (names[0].substring(0, 1) + names[1].substring(0, 1)).toUpperCase();
    }
    return '';
    };

    return (
        <>
        <NextBreadcrumbs title={'Profile'} />
        <HStack bg={'primary.box'} p={1} rounded={'20px'}  space="1" alignItems="center" width="100%">
        <Avatar
						size={'lg'}
						source={{
						uri: `${_env.eventcenter_base_url}/assets/attendees/${response?.attendee_detail?.image}`
						}}>
						{getFirstLetters(`${response?.data?.user?.first_name} ${response?.data?.user?.last_name}`)}
					</Avatar>
					<Text ml={2} fontSize="lg" textTransform={"capitalize"}>{response?.data?.user?.first_name} {response?.data?.user?.last_name}</Text> 
		</HStack>
        </>
        
    )

}

export default Index


