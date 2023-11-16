import React from 'react'
import { Box, Heading, HStack, Icon, Spacer, Text, View, VStack } from 'native-base';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Detail } from 'application/models/attendee/Detail';
import moment from 'moment';
import UseEventService from 'application/store/services/UseEventService';

type AppProps = {
    detail: Detail,
    info: React.ReactNode,
    showPrivate:number,
}

const DetailInfoBlock = ({ detail, info, showPrivate }: AppProps) => {
    const { event  } = UseEventService();
    return (
        <Box overflow="hidden" w="100%" bg="primary.box" p="0" rounded="10">
            {(showPrivate == 1 ||  detail?.sort_field_setting.find((s:any)=>(s.name === 'bio_info'))?.is_private == 0 ) && detail?.detail?.info?.about! && (
                <>
                    <HStack px="3" py="1" bg="primary.darkbox" w="100%" space="3" alignItems="center">
                        <Icon as={AntDesign} name="infocirlceo" size="md" color="primary.text" />
                        <Text fontSize="18px">About</Text>
                    </HStack>
                    
                    <VStack py="5" px="4" space="0" alignItems="center">
                        <View w={'100%'}>
                            {info}
                        </View>
                    </VStack>
                </>
            )}
            {(detail?.sort_field_setting.length > 0) && (
                <Box p="0">
                    <HStack px="3" py="1" bg="primary.darkbox" w="100%" space="3" alignItems="center">
                        <Icon as={AntDesign} name="infocirlceo" size="md" color="primary.text" />
                        <Text fontSize="18px">More info</Text>
                    </HStack>
                    <VStack px="3" py="4" w="100%" space="3">
                        {
                            detail?.sort_field_setting.map((setting:any, i:number)=>(
                                <React.Fragment key={i}>
                                    {setting.name === 'show_job_tasks' && (showPrivate == 1 || setting.is_private == 0 ) && detail?.detail?.info?.jobs! && (
                                        <HStack space="0" alignItems="flex-start">
                                            <Box w="25%">
                                                <Heading fontSize="18px" lineHeight="lg">{detail?.sort_field_labels?.jobs}:</Heading>
                                            </Box>
                                            <Box w="65%" pl="1">
                                                <Text fontSize="18px">{detail?.detail?.info?.jobs}</Text>
                                            </Box>
                                        </HStack>
                                    )}
                                    {setting.name === 'interest' && (showPrivate == 1 || setting.is_private == 0 ) && detail?.detail?.info?.interests! && (
                                        <HStack space="0" alignItems="flex-start">
                                            <Box w="25%">
                                                <Heading fontSize="18px" lineHeight="lg">{detail?.sort_field_labels?.interests}:</Heading>
                                            </Box>
                                            <Box w="65%" pl="1">
                                                <Text fontSize="18px">{detail?.detail?.info?.interests}</Text>
                                            </Box>
                                        </HStack>
                                    )}
                                    {setting.name === 'network_group' && (showPrivate == 1 || setting.is_private == 0 ) && detail?.detail?.info?.network_group! && (
                                        <HStack space="0" alignItems="flex-start">
                                            <Box w="25%">
                                                <Heading fontSize="18px" lineHeight="lg">{detail?.sort_field_labels?.network_group}:</Heading>
                                            </Box>
                                            <Box w="65%" pl="1">
                                                <Text fontSize="18px">{detail?.detail?.info?.network_group}</Text>
                                            </Box>
                                        </HStack>
                                    )}
                                    {setting.name === 'age' && (showPrivate == 1 || setting.is_private == 0 ) && detail?.detail?.info?.age! && (
                                        <HStack w="50%" space="0" >
                                            <Box w="144px">
                                                <Heading fontSize="18px" lineHeight="lg">{detail?.sort_field_labels?.age}:</Heading>
                                            </Box>
                                            <Box pl="1">
                                                <Text fontSize="18px">{detail?.detail?.info?.age} years</Text>
                                            </Box>
                                        </HStack>
                                    )}
                                    {setting.name === 'email' && (showPrivate == 1 || setting.is_private == 0 ) && detail?.detail?.email! && (
                                        <HStack w="50%" space="0" >
                                            <Box w="144px">
                                                <Heading fontSize="18px" lineHeight="lg">{detail?.sort_field_labels?.email}:</Heading>
                                            </Box>
                                            <Box pl="1">
                                                <Text fontSize="18px">{detail?.detail?.email}</Text>
                                            </Box>
                                        </HStack>
                                    )}
                                    {setting.name === 'phone' && (showPrivate == 1 || setting.is_private == 0 ) && detail?.detail?.phone! && (
                                        <HStack w="50%" space="0" >
                                            <Box w="144px">
                                                <Heading fontSize="18px" lineHeight="lg">{detail?.sort_field_labels?.phone}:</Heading>
                                            </Box>
                                            <Box pl="1">
                                                <Text fontSize="18px">{detail?.detail?.phone}</Text>
                                            </Box>
                                        </HStack>
                                    )}
                                    {setting.name === 'gender' && (showPrivate == 1 || setting.is_private == 0 ) && detail?.detail?.info?.gender! && (
                                        <HStack w="50%" space="0" >
                                            <Box w="144px">
                                                <Heading fontSize="18px" lineHeight="lg">{detail?.sort_field_labels?.gender}:</Heading>
                                            </Box>
                                            <Box pl="1">
                                                <Text fontSize="18px">{detail?.detail?.info?.gender}</Text>
                                            </Box>
                                        </HStack>
                                    )}
                                    {setting.name === 'first_name_passport' && (showPrivate == 1 || setting.is_private == 0 ) && detail?.detail?.FIRST_NAME_PASSPORT! && (
                                        <HStack w="50%" space="0" >
                                            <Box w="144px">
                                                <Heading fontSize="18px" lineHeight="lg">{detail?.sort_field_labels?.FIRST_NAME_PASSPORT}:</Heading>
                                            </Box>
                                            <Box pl="1">
                                                <Text fontSize="18px">{detail?.detail?.FIRST_NAME_PASSPORT}</Text>
                                            </Box>
                                        </HStack>
                                    )}
                                    {setting.name === 'last_name_passport' && (showPrivate == 1 || setting.is_private == 0 ) && detail?.detail?.LAST_NAME_PASSPORT! && (
                                        <HStack w="50%" space="0" >
                                            <Box w="144px">
                                                <Heading fontSize="18px" lineHeight="lg">{detail?.sort_field_labels?.LAST_NAME_PASSPORT}:</Heading>
                                            </Box>
                                            <Box pl="1">
                                                <Text fontSize="18px">{detail?.detail?.LAST_NAME_PASSPORT}</Text>
                                            </Box>
                                        </HStack>
                                    )}
                                    {setting.name === 'passport_no' && (showPrivate == 1 || setting.is_private == 0 ) && detail?.detail?.info?.passport_no! && (
                                        <HStack w="50%" space="0" >
                                            <Box w="144px">
                                                <Heading fontSize="18px" lineHeight="lg">{detail?.sort_field_labels?.passport_no}:</Heading>
                                            </Box>
                                            <Box pl="1">
                                                <Text fontSize="18px">{detail?.detail?.info?.passport_no}</Text>
                                            </Box>
                                        </HStack>
                                    )}
                                    {setting.name === 'place_of_birth' && (showPrivate == 1 || setting.is_private == 0 ) && detail?.detail?.info?.place_of_birth! && (
                                        <HStack w="50%" space="0" >
                                            <Box w="144px">
                                                <Heading fontSize="18px" lineHeight="lg">{detail?.sort_field_labels?.place_of_birth}:</Heading>
                                            </Box>
                                            <Box pl="1">
                                                <Text fontSize="18px">{detail?.detail?.info?.place_of_birth}</Text>
                                            </Box>
                                        </HStack>
                                    )}
                                    {setting.name === 'date_of_issue_passport' && (showPrivate == 1 || setting.is_private == 0 ) && detail?.detail?.info?.date_of_issue_passport! && detail?.detail?.info?.date_of_issue_passport != '0000-00-00 00:00:00' && detail?.detail?.info?.date_of_issue_passport != '0000-00-00'  && (
                                        <HStack w="50%" space="0" >
                                            <Box w="144px">
                                                <Heading fontSize="18px" lineHeight="lg">{detail?.sort_field_labels?.date_of_issue_passport}:</Heading>
                                            </Box>
                                            <Box pl="1">
                                                <Text fontSize="18px">{moment(detail?.detail?.info?.date_of_issue_passport).format('YYYY-MM-DD')}</Text>
                                            </Box>
                                        </HStack>
                                    )}
                                    {setting.name === 'date_of_expiry_passport' && (showPrivate == 1 || setting.is_private == 0 ) && detail?.detail?.info?.date_of_expiry_passport! && detail?.detail?.info?.date_of_expiry_passport != '0000-00-00 00:00:00' && detail?.detail?.info?.date_of_expiry_passport != '0000-00-00'  && (
                                        <HStack w="50%" space="0" >
                                            <Box w="144px">
                                                <Heading fontSize="18px" lineHeight="lg">{detail?.sort_field_labels?.date_of_expiry_passport}:</Heading>
                                            </Box>
                                            <Box pl="1">
                                                <Text fontSize="18px">{moment(detail?.detail?.info?.date_of_expiry_passport).format('YYYY-MM-DD')}</Text>
                                            </Box>
                                        </HStack>
                                    )}
                                    {setting.name === 'birth_date' && (showPrivate == 1 || setting.is_private == 0 ) && detail?.detail?.BIRTHDAY_YEAR! && detail?.detail?.BIRTHDAY_YEAR != '0000-00-00 00:00:00' && detail?.detail?.BIRTHDAY_YEAR != '0000-00-00'  && (
                                        <HStack w="50%" space="0" >
                                            <Box w="144px">
                                                <Heading fontSize="18px" lineHeight="lg">{detail?.sort_field_labels?.BIRTHDAY_YEAR}:</Heading>
                                            </Box>
                                            <Box pl="1">
                                                <Text fontSize="18px">{moment(detail?.detail?.BIRTHDAY_YEAR).format('YYYY-MM-DD')}</Text>
                                            </Box>
                                        </HStack>
                                    )}
                                    {setting.name === 'employment_date' && (showPrivate == 1 || setting.is_private == 0 ) && detail?.detail?.EMPLOYMENT_DATE! && detail?.detail?.EMPLOYMENT_DATE != '0000-00-00 00:00:00' && detail?.detail?.EMPLOYMENT_DATE != '0000-00-00'  && (
                                        <HStack w="50%" space="0" >
                                            <Box w="144px">
                                                <Heading fontSize="18px" lineHeight="lg">{detail?.sort_field_labels?.EMPLOYMENT_DATE}:</Heading>
                                            </Box>
                                            <Box pl="1">
                                                <Text fontSize="18px">{moment(detail?.detail?.EMPLOYMENT_DATE).format('YYYY-MM-DD')}</Text>
                                            </Box>
                                        </HStack>
                                    )}
                                    {setting.name === 'spoken_languages' && (showPrivate == 1 || setting.is_private == 0 ) && detail?.detail?.SPOKEN_LANGUAGE! && (
                                        <HStack w="50%" space="0" >
                                            <Box w="144px">
                                                <Heading fontSize="18px" lineHeight="lg">{detail?.sort_field_labels?.SPOKEN_LANGUAGE}:</Heading>
                                            </Box>
                                            <Box pl="1">
                                                <Text fontSize="18px">{detail?.detail?.SPOKEN_LANGUAGE}</Text>
                                            </Box>
                                        </HStack>
                                    )}
                                    {setting.name === 'organization' && (showPrivate == 1 || setting.is_private == 0 ) && detail?.detail?.info?.organization! && (
                                        <HStack w="50%" space="0" >
                                            <Box w="144px">
                                                <Heading fontSize="18px" lineHeight="lg">{detail?.sort_field_labels?.organization}:</Heading>
                                            </Box>
                                            <Box pl="1">
                                                <Text fontSize="18px">{detail?.detail?.info?.organization}</Text>
                                            </Box>
                                        </HStack>
                                    )}
                                    {setting.name === 'country' && (showPrivate == 1 || setting.is_private == 0 ) && detail?.detail?.info?.country! && (
                                        <HStack w="50%" space="0" >
                                            <Box w="144px">
                                                <Heading fontSize="18px" lineHeight="lg">{detail?.sort_field_labels?.country}:</Heading>
                                            </Box>
                                            <Box pl="1">
                                                <Text fontSize="18px">{detail?.detail?.info?.country_display_name}</Text>
                                            </Box>
                                        </HStack>
                                    )}
                                    
                                    {setting.name === 'pa_country' && (showPrivate == 1 || setting.is_private == 0 ) && detail?.detail?.info?.country! && (
                                        <HStack w="50%" space="0" >
                                            <Box w="144px">
                                                <Heading fontSize="18px" lineHeight="lg">{detail?.sort_field_labels?.country}:</Heading>
                                            </Box>
                                            <Box pl="1">
                                                <Text fontSize="18px">{detail?.detail?.info?.private_country_display_name}</Text>
                                            </Box>
                                        </HStack>
                                    )}
                                    
                                    {setting.name === 'pa_street' && (showPrivate == 1 || setting.is_private == 0 ) && detail?.detail?.info?.private_street! && (
                                        <HStack w="50%" space="0" >
                                            <Box w="144px">
                                                <Heading fontSize="18px" lineHeight="lg">{detail?.sort_field_labels?.private_street}:</Heading>
                                            </Box>
                                            <Box pl="1">
                                                <Text fontSize="18px">{detail?.detail?.info?.private_street}</Text>
                                            </Box>
                                        </HStack>
                                    )}
                                    {setting.name === 'pa_house_no' && (showPrivate == 1 || setting.is_private == 0 ) && detail?.detail?.info?.private_house_number! && (
                                        <HStack w="50%" space="0" >
                                            <Box w="144px">
                                                <Heading fontSize="18px" lineHeight="lg">{detail?.sort_field_labels?.private_house_number}:</Heading>
                                            </Box>
                                            <Box pl="1">
                                                <Text fontSize="18px">{detail?.detail?.info?.private_house_number}</Text>
                                            </Box>
                                        </HStack>
                                    )}
                                    {setting.name === 'pa_post_code' && (showPrivate == 1 || setting.is_private == 0 ) && detail?.detail?.info?.private_post_code! && (
                                        <HStack w="50%" space="0" >
                                            <Box w="144px">
                                                <Heading fontSize="18px" lineHeight="lg">{detail?.sort_field_labels?.private_post_code}:</Heading>
                                            </Box>
                                            <Box pl="1">
                                                <Text fontSize="18px">{detail?.detail?.info?.private_post_code}</Text>
                                            </Box>
                                        </HStack>
                                    )}
                                    {setting.name === 'pa_city' && (showPrivate == 1 || setting.is_private == 0 ) && detail?.detail?.info?.private_city! && (
                                        <HStack w="50%" space="0" >
                                            <Box w="144px">
                                                <Heading fontSize="18px" lineHeight="lg">{detail?.sort_field_labels?.private_city}:</Heading>
                                            </Box>
                                            <Box pl="1">
                                                <Text fontSize="18px">{detail?.detail?.info?.private_city}</Text>
                                            </Box>
                                        </HStack>
                                    )}
                                    {setting.name === 'type' && (showPrivate == 1 || setting.is_private == 0 ) && detail?.detail?.attendee_type_name! && (
                                        <HStack w="50%" space="0" >
                                            <Box w="144px">
                                                <Heading fontSize="18px" lineHeight="lg">{detail?.sort_field_labels?.attendee_type}:</Heading>
                                            </Box>
                                            <Box pl="1">
                                                <Text fontSize="18px">{detail?.detail?.attendee_type_name}</Text>
                                            </Box>
                                        </HStack>
                                    )}
                                    
                                    {setting.name === 'show_custom_field' && (showPrivate == 1 || setting.is_private == 0 ) &&
                                     detail?.custom_fields &&
                                     detail?.custom_fields.length >0 && 
                                     detail?.custom_fields.map((question:any, i:number)=>(
                                        <HStack w="50%" space="0" key={i} >
                                            <Box w="144px">
                                                <Heading fontSize="18px" lineHeight="lg">{question?.name}:</Heading>
                                            </Box>
                                            <Box pl="1">
                                                <Text fontSize="18px">{detail?.detail?.info && detail?.detail?.info[`custom_field_id${question.event_id}`] && detail?.detail?.info[`custom_field_id${question.event_id}`].split(',').reduce((ack:any, answer:any, i:any) => {
                                                                        let ans = question.children_recursive.find((child:any) => (child.id == answer))?.name !== undefined ? question.children_recursive.find((child:any) => (child.id == answer))?.name : '';
                                                                        ack += ans;
                                                                        if (i > 0 && detail?.detail?.info !== undefined &&  i < detail?.detail?.info[`custom_field_id${question.event_id}`].split(',').length && ans !== '') {
                                                                            ack += ',';
                                                                        }
                                                                        return ack;
                                                                        }, '')}
                                                </Text>
                                            </Box>
                                        </HStack>
                                     ))}
                                    
                                </React.Fragment>
                            ))
                        }
                        
                        <HStack w="100%" maxW={'100%'}>
                            
                        </HStack>
                    </VStack>
                </Box>
            )}
            {detail?.sort_field_setting.length <= 0 && 
                        <Text fontSize="18px">{event.labels.EVENT_NORECORD_FOUND}</Text>
            }
            
        </Box>
    )

}

export default DetailInfoBlock