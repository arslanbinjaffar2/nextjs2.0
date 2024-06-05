import { Attendee } from 'application/models/attendee/Attendee'
import DynamicIcon from 'application/utils/DynamicIcon'
import UseEnvService from 'application/store/services/UseEnvService';
import { Text, HStack, View, Avatar, Box, Pressable, Button, Image } from 'native-base'
import React, { useState } from 'react'

interface ActiveAttendeeProps {
    activeAttendee: Attendee
}

const ActiveAttendee = ({ activeAttendee }: ActiveAttendeeProps) => {
    const { _env } = UseEnvService()
    const [sendRequest, setSendRequest] = useState(false)
    if(!activeAttendee){
        return null;
    }
    if (!activeAttendee) return null;

    const { image, first_name, last_name, info = {} } = activeAttendee;
    const { company_name, title, department, delegate_number } = info;

    const getInitials = (firstName: any, lastName: any) => {
        if (firstName && lastName) {
            return firstName.substring(0, 1) + lastName.substring(0, 1);
        }
        return firstName ? firstName.substring(0, 1) : '';
    };

    const renderDetails = () => {
        let details = '';
        if (title) details += title;
        if (department) details += (details ? ', ' : '') + department;
        if (company_name) details += (details ? ', ' : '') + company_name;
        return details;
    };
    return (
        <>
            <View height={"105px"} bg={'primary.box'} rounded={'10px'} pl={'10px'} py={'5'} pr={'18px'} my={'14px'} width={'100%'} >
                <HStack justifyContent={'space-between'} width={'100%'} alignItems={'center'}>
                    <Box flexDirection={'row'} alignItems={'center'}>
                        {activeAttendee?.image ? (
                            <Image rounded="25" size="lg" borderWidth="0" borderColor="primary.darkbox" source={{ uri: `${_env.eventcenter_base_url}/assets/attendees/${image}` }} alt="" w="50px" h="50px" />
                        ) : (
                            <Avatar
                                borderWidth={0}
                                borderColor="primary.darkbox"
                                textTransform="uppercase"
                                bg={'#A5A5A5'}
                            >{ getInitials(first_name,last_name)}</Avatar>
                        )}
                        <View flexDirection={'column'} ml={'14px'}>
                            <Text fontWeight={'medium'} fontSize={'lg'}>{activeAttendee.first_name} {activeAttendee.last_name}</Text>      
                                <Text textBreakStrategy='balanced' fontSize="lg">                           
                                {renderDetails()}
                                </Text>
                        </View>
                    </Box>
                    <Box flexDirection={'row'} alignItems={'center'}>
                        <Pressable
                            mr={'4'}
                            onPress={() => {
                                setSendRequest(true)
                            }}

                        >
                            {!sendRequest ? <DynamicIcon iconType={'hand'} iconProps={{ width: 20, height: 26 }} />
                                : <Button maxWidth={'120px'} width={'100%'}>
                                    <Text fontWeight={'semibold'} fontSize={'md'} isTruncated width={'100%'}>Cancel request</Text>
                                </Button>
                            }
                        </Pressable>
                            <Text fontWeight={'medium'} fontSize={'lg'}># {delegate_number}</Text>
                    </Box>
                </HStack>
            </View>
        </>

    )
}

export default ActiveAttendee