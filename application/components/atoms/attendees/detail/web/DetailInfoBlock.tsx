import React, { useState } from 'react'
import { Box, Divider, Heading, HStack, Icon, Spacer, Text, View, VStack } from 'native-base';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Detail } from 'application/models/attendee/Detail';
import moment from 'moment';
import UseEventService from 'application/store/services/UseEventService';
import {GENERAL_DATE_FORMAT} from 'application/utils/Globals'
import IcoInfo from 'application/assets/icons/small/IcoInfo';
type AppProps = {
    detail: Detail,
    info: React.ReactNode,
    showPrivate:number,
}

const DetailInfoBlock = ({ detail, info, showPrivate }: AppProps) => {
    const { event  } = UseEventService();
    const [hasAboutData,setHasAboutData] = useState<boolean>(true);

    React.useEffect(() => {
      var _wrapper =document.getElementById('about-wrapper');
      var _content =document.getElementById('about-content');
        if(_content && _content.innerHTML.trim() === ''){
            _wrapper?.setAttribute('style', 'display:none');
            setHasAboutData(false);
        }else{
            setHasAboutData(true);
        }

    }, [detail])


    return (
        <Box overflow="hidden" bg={`${detail?.sort_field_setting.length > 0 ? "primary.box" : ""}`} w="100%"  p="0" rounded="10">
            {(detail?.sort_field_setting.length > 0) ? (
                <Box p="0" nativeID='about-wrapper'>
                    <HStack px="3" py="1" bg="primary.darkbox" w="100%" space={2} alignItems="center">
                        <IcoInfo  />
                        <Text fontSize="sm">{event.labels?.ATTENDEE_MORE_INFO}</Text>
                    </HStack>
                    <VStack nativeID='about-content' px="3" py="4" w="100%" >
                        {
                            detail?.sort_field_setting.map((setting:any, i:number)=>(
                                <React.Fragment key={i}>
                                    {setting.name === 'bio_info' && (showPrivate == 1 || setting.is_private == 0 ) && detail?.detail?.info?.about! && (
                                        <HStack w={'100%'} borderBottomWidth={0} borderBottomColor={'primary.bordercolor'} pb={2} mb={2} alignItems="flex-start">
                                            <Box w="150px">
                                                <Heading fontSize="16px" fontWeight={'500'} lineHeight="lg">{detail?.sort_field_labels?.about}:</Heading>
                                            </Box>
                                            <Box w="calc(100% - 200px)" pl="1">
                                                <Text fontSize="sm">{info}</Text>
                                            </Box>
                                        </HStack>
                                    )}
                                    {setting.name === 'show_job_tasks' && (showPrivate == 1 || setting.is_private == 0 ) && detail?.detail?.info?.jobs! && (
                                        <HStack w={'100%'} borderBottomWidth={0} borderBottomColor={'primary.bordercolor'} pb={2} mb={2} alignItems="flex-start">
                                            <Box w="150px">
                                                <Heading fontSize="16px" fontWeight={'500'} lineHeight="lg">{detail?.sort_field_labels?.jobs}:</Heading>
                                            </Box>
                                            <Box w="calc(100% - 200px)" pl="1">
                                                <Text fontSize="sm">{detail?.detail?.info?.jobs}</Text>
                                            </Box>
                                        </HStack>
                                    )}
                                    {setting.name === 'show_industry' && (showPrivate == 1 || setting.is_private == 0 ) && detail?.detail?.info?.industry! && (
                                        <HStack w={'100%'} borderBottomWidth={0} borderBottomColor={'primary.bordercolor'} pb={2} mb={2} alignItems="flex-start">
                                            <Box w="150px">
                                                <Heading fontSize="16px" fontWeight={'500'} lineHeight="lg">{detail?.sort_field_labels?.industry}:</Heading>
                                            </Box>
                                            <Box w="calc(100% - 200px)" pl="1">
                                                <Text fontSize="sm">{detail?.detail?.info?.industry}</Text>
                                            </Box>
                                        </HStack>
                                    )}
                                    {setting.name === 'interest' && (showPrivate == 1 || setting.is_private == 0 ) && detail?.detail?.info?.interests! && (
                                        <HStack w={'100%'} borderBottomWidth={0} borderBottomColor={'primary.bordercolor'} pb={2} mb={2} alignItems="flex-start">
                                            <Box w="150px">
                                                <Heading fontSize="16px" fontWeight={'500'} lineHeight="lg">{detail?.sort_field_labels?.interests}:</Heading>
                                            </Box>
                                            <Box w="calc(100% - 200px)" pl="1">
                                                <Text fontSize="sm">{detail?.detail?.info?.interests}</Text>
                                            </Box>
                                        </HStack>
                                    )}
                                    {setting.name === 'network_group' && (showPrivate == 1 || setting.is_private == 0 ) && detail?.detail?.info?.network_group! && (
                                        <HStack w={'100%'} borderBottomWidth={0} borderBottomColor={'primary.bordercolor'} pb={2} mb={2} alignItems="flex-start">
                                            <Box w="150px">
                                                <Heading fontSize="16px" fontWeight={'500'} lineHeight="lg">{detail?.sort_field_labels?.network_group}:</Heading>
                                            </Box>
                                            <Box w="calc(100% - 200px)" pl="1">
                                                <Text fontSize="sm">{detail?.detail?.info?.network_group}</Text>
                                            </Box>
                                        </HStack>
                                    )}
                                    {setting.name === 'age' && (showPrivate == 1 || setting.is_private == 0 ) && detail?.detail?.info?.age! && (
                                        <HStack w="100%" borderBottomWidth={0} borderBottomColor={'primary.bordercolor'} pb={2} mb={2} >
                                            <Box w="150px">
                                                <Heading fontSize="16px" fontWeight={'500'} lineHeight="lg">{detail?.sort_field_labels?.age}:</Heading>
                                            </Box>
                                            <Box pl="1" w="calc(100% - 200px)">
                                                <Text fontSize="sm">{detail?.detail?.info?.age} years</Text>
                                            </Box>
                                        </HStack>
                                    )}
                                    {/* {setting.name === 'email' && (showPrivate == 1 || setting.is_private == 0 ) && detail?.detail?.email! && (
                                        <HStack w="100%" borderBottomWidth={1} borderBottomColor={'primary.bordercolor'} pb={2} mb={2} >
                                            <Box w="150px">
                                                <Heading fontSize="16px" fontWeight={'500'} lineHeight="lg">{detail?.sort_field_labels?.email}:</Heading>
                                            </Box>
                                            <Box pl="1" w="calc(100% - 200px)">
                                                <Text fontSize="sm">{detail?.detail?.email}</Text>
                                            </Box>
                                        </HStack>
                                    )}
                                    {setting.name === 'phone' && (showPrivate == 1 || setting.is_private == 0 ) && detail?.detail?.phone! && (
                                        <HStack w="100%" borderBottomWidth={0} borderBottomColor={'primary.bordercolor'} pb={2} mb={2} >
                                            <Box w="150px">
                                                <Heading fontSize="16px" fontWeight={'500'} lineHeight="lg">{detail?.sort_field_labels?.phone}:</Heading>
                                            </Box>
                                            <Box pl="1" w="calc(100% - 200px)">
                                                <Text fontSize="sm">{detail?.detail?.phone}</Text>
                                            </Box>
                                        </HStack>
                                    )} */}
                                    {setting.name === 'gender' && (showPrivate == 1 || setting.is_private == 0 ) && detail?.detail?.info?.gender! && (
                                        <HStack w="100%" borderBottomWidth={0} borderBottomColor={'primary.bordercolor'} pb={2} mb={2} >
                                            <Box w="150px">
                                                <Heading fontSize="16px" fontWeight={'500'} lineHeight="lg">{detail?.sort_field_labels?.gender}:</Heading>
                                            </Box>
                                            <Box pl="1" w="calc(100% - 200px)">
                                                <Text fontSize="sm">{detail?.detail?.info?.gender}</Text>
                                            </Box>
                                        </HStack>
                                    )}
                                    {setting.name === 'first_name_passport' && (showPrivate == 1 || setting.is_private == 0 ) && detail?.detail?.FIRST_NAME_PASSPORT! && (
                                        <HStack w="100%" borderBottomWidth={0} borderBottomColor={'primary.bordercolor'} pb={2} mb={2} >
                                            <Box w="150px">
                                                <Heading fontSize="16px" fontWeight={'500'} lineHeight="lg">{detail?.sort_field_labels?.FIRST_NAME_PASSPORT}:</Heading>
                                            </Box>
                                            <Box pl="1" w="calc(100% - 200px)">
                                                <Text fontSize="sm">{detail?.detail?.FIRST_NAME_PASSPORT}</Text>
                                            </Box>
                                        </HStack>
                                    )}
                                    {setting.name === 'last_name_passport' && (showPrivate == 1 || setting.is_private == 0 ) && detail?.detail?.LAST_NAME_PASSPORT! && (
                                        <HStack w="100%" borderBottomWidth={0} borderBottomColor={'primary.bordercolor'} pb={2} mb={2} >
                                            <Box w="150px">
                                                <Heading fontSize="16px" fontWeight={'500'} lineHeight="lg">{detail?.sort_field_labels?.LAST_NAME_PASSPORT}:</Heading>
                                            </Box>
                                            <Box pl="1" w="calc(100% - 200px)">
                                                <Text fontSize="sm">{detail?.detail?.LAST_NAME_PASSPORT}</Text>
                                            </Box>
                                        </HStack>
                                    )}
                                    {setting.name === 'passport_no' && (showPrivate == 1 || setting.is_private == 0 ) && detail?.detail?.info?.passport_no! && (
                                        <HStack w="100%" borderBottomWidth={0} borderBottomColor={'primary.bordercolor'} pb={2} mb={2} >
                                            <Box w="150px">
                                                <Heading fontSize="16px" fontWeight={'500'} lineHeight="lg">{detail?.sort_field_labels?.passport_no}:</Heading>
                                            </Box>
                                            <Box pl="1" w="calc(100% - 200px)">
                                                <Text fontSize="sm">{detail?.detail?.info?.passport_no}</Text>
                                            </Box>
                                        </HStack>
                                    )}
                                    {setting.name === 'place_of_birth' && (showPrivate == 1 || setting.is_private == 0 ) && detail?.detail?.info?.place_of_birth! && (
                                        <HStack w="100%" borderBottomWidth={0} borderBottomColor={'primary.bordercolor'} pb={2} mb={2} >
                                            <Box w="150px">
                                                <Heading fontSize="16px" fontWeight={'500'} lineHeight="lg">{detail?.sort_field_labels?.place_of_birth}:</Heading>
                                            </Box>
                                            <Box pl="1" w="calc(100% - 200px)">
                                                <Text fontSize="sm">{detail?.detail?.info?.place_of_birth}</Text>
                                            </Box>
                                        </HStack>
                                    )}
                                    {setting.name === 'date_of_issue_passport' && (showPrivate == 1 || setting.is_private == 0 ) && detail?.detail?.info?.date_of_issue_passport! && detail?.detail?.info?.date_of_issue_passport != '0000-00-00 00:00:00' && detail?.detail?.info?.date_of_issue_passport != '0000-00-00'  && (
                                        <HStack w="100%" borderBottomWidth={0} borderBottomColor={'primary.bordercolor'} pb={2} mb={2} >
                                            <Box w="150px">
                                                <Heading fontSize="16px" fontWeight={'500'} lineHeight="lg">{detail?.sort_field_labels?.date_of_issue_passport}:</Heading>
                                            </Box>
                                            <Box pl="1" w="calc(100% - 200px)">
                                                <Text fontSize="sm">{moment(detail?.detail?.info?.date_of_issue_passport).format(GENERAL_DATE_FORMAT)}</Text>
                                            </Box>
                                        </HStack>
                                    )}
                                    {setting.name === 'date_of_expiry_passport' && (showPrivate == 1 || setting.is_private == 0 ) && detail?.detail?.info?.date_of_expiry_passport! && detail?.detail?.info?.date_of_expiry_passport != '0000-00-00 00:00:00' && detail?.detail?.info?.date_of_expiry_passport != '0000-00-00'  && (
                                        <HStack w="100%" borderBottomWidth={0} borderBottomColor={'primary.bordercolor'} pb={2} mb={2} >
                                            <Box w="150px">
                                                <Heading fontSize="16px" fontWeight={'500'} lineHeight="lg">{detail?.sort_field_labels?.date_of_expiry_passport}:</Heading>
                                            </Box>
                                            <Box pl="1" w="calc(100% - 200px)">
                                                <Text fontSize="sm">{moment(detail?.detail?.info?.date_of_expiry_passport).format(GENERAL_DATE_FORMAT)}</Text>
                                            </Box>
                                        </HStack>
                                    )}
                                    {setting.name === 'birth_date' && (showPrivate == 1 || setting.is_private == 0 ) && detail?.detail?.BIRTHDAY_YEAR! && detail?.detail?.BIRTHDAY_YEAR != '0000-00-00 00:00:00' && detail?.detail?.BIRTHDAY_YEAR != '0000-00-00'  && (
                                        <HStack w="100%" borderBottomWidth={0} borderBottomColor={'primary.bordercolor'} pb={2} mb={2} >
                                            <Box w="150px">
                                                <Heading fontSize="16px" fontWeight={'500'} lineHeight="lg">{detail?.sort_field_labels?.BIRTHDAY_YEAR}:</Heading>
                                            </Box>
                                            <Box pl="1" w="calc(100% - 200px)">
                                                <Text fontSize="sm">{moment(detail?.detail?.BIRTHDAY_YEAR).format(GENERAL_DATE_FORMAT)}</Text>
                                            </Box>
                                        </HStack>
                                    )}
                                    {setting.name === 'employment_date' && (showPrivate == 1 || setting.is_private == 0 ) && detail?.detail?.EMPLOYMENT_DATE! && detail?.detail?.EMPLOYMENT_DATE != '0000-00-00 00:00:00' && detail?.detail?.EMPLOYMENT_DATE != '0000-00-00'  && (
                                        <HStack w="100%" borderBottomWidth={0} borderBottomColor={'primary.bordercolor'} pb={2} mb={2} >
                                            <Box w="150px">
                                                <Heading fontSize="16px" fontWeight={'500'} lineHeight="lg">{detail?.sort_field_labels?.EMPLOYMENT_DATE}:</Heading>
                                            </Box>
                                            <Box pl="1" w="calc(100% - 200px)">
                                                <Text fontSize="sm">{moment(detail?.detail?.EMPLOYMENT_DATE).format(GENERAL_DATE_FORMAT)}</Text>
                                            </Box>
                                        </HStack>
                                    )}
                                    {setting.name === 'spoken_languages' && (showPrivate == 1 || setting.is_private == 0 ) && detail?.detail?.SPOKEN_LANGUAGE! && (
                                        <HStack w="100%" borderBottomWidth={0} borderBottomColor={'primary.bordercolor'} pb={2} mb={2} >
                                            <Box w="150px">
                                                <Heading fontSize="16px" fontWeight={'500'} lineHeight="lg">{detail?.sort_field_labels?.SPOKEN_LANGUAGE}:</Heading>
                                            </Box>
                                            <Box pl="1" w="calc(100% - 200px)">
                                                <Text fontSize="sm">{detail?.detail?.SPOKEN_LANGUAGE}</Text>
                                            </Box>
                                        </HStack>
                                    )}
                                    {setting.name === 'organization' && (showPrivate == 1 || setting.is_private == 0 ) && detail?.detail?.info?.organization! && (
                                        <HStack w="100%" borderBottomWidth={0} borderBottomColor={'primary.bordercolor'} pb={2} mb={2} >
                                            <Box w="150px">
                                                <Heading fontSize="16px" fontWeight={'500'} lineHeight="lg">{detail?.sort_field_labels?.organization}:</Heading>
                                            </Box>
                                            <Box pl="1" w="calc(100% - 200px)">
                                                <Text fontSize="sm">{detail?.detail?.info?.organization}</Text>
                                            </Box>
                                        </HStack>
                                    )}
                                    {setting.name === 'country' && (showPrivate == 1 || setting.is_private == 0 ) && detail?.detail?.info?.country! && (
                                        <HStack w="100%" borderBottomWidth={0} borderBottomColor={'primary.bordercolor'} pb={2} mb={2} >
                                            <Box w="150px">
                                                <Heading fontSize="16px" fontWeight={'500'} lineHeight="lg">{detail?.sort_field_labels?.country}:</Heading>
                                            </Box>
                                            <Box pl="1" w="calc(100% - 200px)">
                                                <Text fontSize="sm">{detail?.detail?.info?.country_display_name}</Text>
                                            </Box>
                                        </HStack>
                                    )}
                                    
                                    {setting.name === 'pa_country' && (showPrivate == 1 || setting.is_private == 0 ) && detail?.detail?.info?.private_country_display_name! && (
                                        <HStack w="100%" borderBottomWidth={0} borderBottomColor={'primary.bordercolor'} pb={2} mb={2} >
                                            <Box w="150px">
                                                <Heading fontSize="16px" fontWeight={'500'} lineHeight="lg">{event?.labels?.ATTENDEE_PRIVATE_COUNTRY}:</Heading>
                                            </Box>
                                            <Box pl="1" w="calc(100% - 200px)">
                                                <Text fontSize="sm">{detail?.detail?.info?.private_country_display_name}</Text>
                                            </Box>
                                        </HStack>
                                    )}
                                    
                                    {setting.name === 'pa_street' && (showPrivate == 1 || setting.is_private == 0 ) && detail?.detail?.info?.private_street! && (
                                        <HStack w="100%" borderBottomWidth={0} borderBottomColor={'primary.bordercolor'} pb={2} mb={2} >
                                            <Box w="150px">
                                                <Heading fontSize="16px" fontWeight={'500'} lineHeight="lg">{detail?.sort_field_labels?.private_street}:</Heading>
                                            </Box>
                                            <Box w="calc(100% - 200px)" pl="1">
                                                <Text fontSize="sm">{detail?.detail?.info?.private_street}</Text>
                                            </Box>
                                        </HStack>
                                    )}
                                    {setting.name === 'pa_house_no' && (showPrivate == 1 || setting.is_private == 0 ) && detail?.detail?.info?.private_house_number! && (
                                        <HStack w="100%" borderBottomWidth={0} borderBottomColor={'primary.bordercolor'} pb={2} mb={2} >
                                            <Box w="150px">
                                                <Heading fontSize="16px" fontWeight={'500'} lineHeight="lg">{detail?.sort_field_labels?.private_house_number}:</Heading>
                                            </Box>
                                            <Box pl="1" w="calc(100% - 200px)">
                                                <Text fontSize="sm">{detail?.detail?.info?.private_house_number}</Text>
                                            </Box>
                                        </HStack>
                                    )}
                                    {setting.name === 'pa_post_code' && (showPrivate == 1 || setting.is_private == 0 ) && detail?.detail?.info?.private_post_code! && (
                                        <HStack w="100%" borderBottomWidth={0} borderBottomColor={'primary.bordercolor'} pb={2} mb={2} >
                                            <Box w="150px">
                                                <Heading fontSize="16px" fontWeight={'500'} lineHeight="lg">{detail?.sort_field_labels?.private_post_code}:</Heading>
                                            </Box>
                                            <Box pl="1" w="calc(100% - 200px)">
                                                <Text fontSize="sm">{detail?.detail?.info?.private_post_code}</Text>
                                            </Box>
                                        </HStack>
                                    )}
                                    {setting.name === 'pa_city' && (showPrivate == 1 || setting.is_private == 0 ) && detail?.detail?.info?.private_city! && (
                                        <HStack w="100%" borderBottomWidth={0} borderBottomColor={'primary.bordercolor'} pb={2} mb={2} >
                                            <Box w="150px">
                                                <Heading fontSize="16px" fontWeight={'500'} lineHeight="lg">{detail?.sort_field_labels?.private_city}:</Heading>
                                            </Box>
                                            <Box pl="1" w="calc(100% - 200px)">
                                                <Text fontSize="sm">{detail?.detail?.info?.private_city}</Text>
                                            </Box>
                                        </HStack>
                                    )}
                                    {setting.name === 'type' && (showPrivate == 1 || setting.is_private == 0 ) && detail?.detail?.attendee_type_name! && (
                                        <HStack w="100%" borderBottomWidth={0} borderBottomColor={'primary.bordercolor'} pb={2} mb={2} >
                                            <Box w="150px">
                                                <Heading fontSize="16px" fontWeight={'500'} lineHeight="lg">{detail?.sort_field_labels?.attendee_type}:</Heading>
                                            </Box>
                                            <Box pl="1" w="calc(100% - 200px)">
                                                <Text fontSize="sm">{detail?.detail?.attendee_type_name}</Text>
                                            </Box>
                                        </HStack>
                                    )}
                                    
                                    {setting.name === 'show_custom_field' && (showPrivate == 1 || setting.is_private == 0 ) &&
                                     detail?.custom_fields &&
                                     detail?.custom_fields.length > 0 && 
                                     detail?.detail?.info && 
                                     detail?.detail?.info[`custom_field_id${event.id}`] && 
                                     detail?.detail?.info[`custom_field_id${event.id}`] !== '' &&
                                     detail?.detail?.info[`custom_field_id${event.id}`].split(',').length > 0 &&
                                     detail?.custom_fields.map((question:any, i:number)=>(
                                         <CustomFeildRow key={i} question={question} custom_field_id={detail?.detail?.info![`custom_field_id${event.id}`]} />
                                     ))}
                                    
                                </React.Fragment>
                            ))
                        }
                    </VStack>
                </Box>
            ) :  <Box  bg="primary.box" p="3" w="100%" rounded="lg" overflow="hidden">
            <Text>{event.labels.GENERAL_NO_RECORD}</Text>
        </Box>  }
            {!hasAboutData && 
                <Box  bg="primary.box" p="3" w="100%" rounded="lg" overflow="hidden">
                    <Text>{event.labels.GENERAL_NO_RECORD}</Text>
                </Box>  
            }
            
        </Box>
    )

}

export default DetailInfoBlock


// detail?.detail?.info && detail?.detail?.info[`custom_field_id${question.event_id}`] && detail?.detail?.info[`custom_field_id${question.event_id}`]
const CustomFeildRow = ({question, custom_field_id}:any) => {
     let answer = custom_field_id.split(',').reduce((ack:any, answer:any, i:any) => {
                let ans = question.children_recursive.find((child:any) => (child.id == answer))?.name !== undefined ? question.children_recursive.find((child:any) => (child.id == answer))?.name : '';
                if (ans !== '') {
                    if (ack.length > 0) {
                        ack += ',' + ans;
                    } else {
                        ack += ans;
                    }
                }
                return ack;
        }, '');
    if(answer === ''){
        return null;
    }
  return (
    <HStack w="100%" borderBottomWidth={0} borderBottomColor={'primary.bordercolor'} pb={2} mb={2}  >
    <Box w="150px">
        <Heading fontSize="16px" fontWeight={'500'} lineHeight="lg">{question?.name}:</Heading>
    </Box>
    <Box pl="1" w="calc(100% - 200px)">
        <Text fontSize="sm">
            {answer}
        </Text>
    </Box>
</HStack>
  )
}
