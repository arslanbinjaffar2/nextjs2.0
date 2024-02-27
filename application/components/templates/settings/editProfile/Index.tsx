import React from 'react'

import { Text, Container, Box, Divider, Input, Checkbox, Radio, Select, Button, HStack, Center, VStack, Icon } from 'native-base';

import {default  as ReactSelect} from "react-select";


import WebLoading from 'application/components/atoms/WebLoading';

import DropDown from 'application/components/atoms/DropDown';

import UseEditProfileService from 'application/store/services/UseEditProfileService'

import UseLoadingService from 'application/store/services/UseLoadingService';

import { Attendee, Attendeefeildsettings, CallingCode, Country, Labels, Language, Setting } from 'application/models/settings/EditProfile';

import UseEventService from 'application/store/services/UseEventService';

import { Event } from 'application/models/Event';

import DateTimePicker from 'application/components/atoms/DateTimePicker';

import { getColorScheme } from 'application/styles/colors';

import {GENERAL_DATE_FORMAT} from 'application/utils/Globals'

import moment from 'moment';

import IcoLongArrow from 'application/assets/icons/IcoLongArrow';
import UseEnvService from 'application/store/services/UseEnvService';
import LoadImage from 'application/components/atoms/LoadImage';
import { Pressable } from 'react-native';
import { Linking } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import AntDesign from '@expo/vector-icons/AntDesign';





const index = () => {

    const { FetchEditProfiles, settings, labels, attendee, languages, callingCodes, countries, customFields, attendee_feild_settings, UpdateAttendee, updatingAttendee } = UseEditProfileService();

    const { loading, scroll } = UseLoadingService();

		const { event } = UseEventService();


    React.useEffect(() => {
        FetchEditProfiles();
    }, [])

    return (
        <>
            {loading ? (
                <WebLoading />
            ) : (
                <EditProfileFrom
                    attendee={attendee!}
                    languages={languages}
                    callingCodes={callingCodes}
                    countries={countries}
                    event={event}
                    settings={settings}
                    labels={labels}
                    customFields={customFields}
                    attendee_feild_settings={attendee_feild_settings}
                    updateAttendee={UpdateAttendee}
                    updatingAttendee={updatingAttendee}
                />
            )}
        </>
    )
}

export default index

type formProps = {
    attendee: Attendee,
    languages: Language[],
    callingCodes: CallingCode[],
    countries: Country[],
    settings: Setting[] | null,
    labels: Labels | null,
    customFields: any[]
    event: Event
    attendee_feild_settings: Attendeefeildsettings | null
    updatingAttendee: boolean,
    updateAttendee: (data: any) => void
};


const EditProfileFrom = ({ attendee, languages, callingCodes, countries, settings, labels, customFields, event, attendee_feild_settings, updateAttendee, updatingAttendee }: formProps) => {
  const colors = getColorScheme(event?.settings?.app_background_color ?? '#343d50', event?.settings?.app_text_mode);
const Selectstyles2 = {
    control: (base:any, state:any) => ({
      ...base,
      minHeight: 50,
      width: '100%',
      maxWidth: '100%',
			minWidth: '256px',
      marginBottom: 10,
			background: `rgba(${colors.box},1)`,
			color: '#eaeaea',
			fontFamily: 'Avenir',
			boxShadow: 'none',
			borderWidth: 2,
			borderColor: state.isFocused ? event?.settings?.primary_color : "transparent",
			"&:hover": {
				// Overwrittes the different states of border
				borderColor: state.isFocused ? event?.settings?.primary_color : "transparent"
			}
    }),placeholder: (defaultStyles: any) => {
        return {
            ...defaultStyles,
            color: '#eaeaea',
        }
    },
		option: (provided:any, state:any) => ({
				...provided,
				fontFamily: 'Avenir',
				backgroundColor: state.isSelected ? event?.settings?.primary_color : "",
				"&:hover": {
					backgroundColor: event?.settings?.primary_color,
					color: '#fff'
				}
		}),
		singleValue: (provided:any) => ({
    ...provided,
    color: '#eaeaea'
  })
}
    const { _env } = UseEnvService()

    const [gender, setGender] = React.useState(attendee?.info?.gender ?? ''); 

    const [attendeeData, setAttendeeData] = React.useState({
        ...attendee,
        phone: attendee?.phone && attendee?.phone?.split("-")[1],
        callingCode: attendee?.phone && attendee?.phone?.split("-")[0]
    })

    const [customFieldData, setCustomFieldData] = React.useState<any>(customFields.reduce((ack1, question, i)=>{
        let answers = attendee.info[`custom_field_id${question.event_id}`]?.split(',').reduce((ack2:any, id, i)=>{ 
           let is_answer = question.children_recursive.find((answer:any)=>(answer.id == id));
           if(is_answer !== undefined){
             ack2.push({
               label: is_answer.name,
               value: is_answer.id,
             });
           }
           return ack2;
         }, []);
         ack1[`custom_field_id_q${i}`] = question.allow_multiple === 1 ? answers : answers[0];
         return ack1;
     }, {}));

    const inputFileRef = React.useRef<HTMLInputElement | null>(null);

    const inputresumeFileRef = React.useRef<HTMLInputElement | null>(null);

    React.useEffect(() => {
        // setAttendeeData({
        //     ...attendeeData,
        //     phone: attendeeData?.phone && attendeeData?.phone?.split("-")[1],
        //     callingCode: attendeeData?.phone && attendeeData?.phone?.split("-")[0]
        // });
    }, []);

    const updateCustomFieldSelect = (obj:any) => {
        setCustomFieldData({
          ...customFieldData,
          [obj.name]: obj.item,
        });
      };

    const updateAttendeeFeild = (name: string, value: any) => {
        setAttendeeData({
            ...attendeeData,
            [name]: value,
        });
    };

    const updateAttendeeInfoFeild = (name: string, value: any) => {
        setAttendeeData({
            ...attendeeData,
            info: {
                ...attendeeData?.info,
                [name]: value,
            },
        });
    };

    const updateDate = (obj: any) => {
        setAttendeeData({
            ...attendeeData,
            [obj.name]: (typeof obj.item === 'object' && obj.item !== null) ? obj.item.format(GENERAL_DATE_FORMAT) : obj.item,
        });
    };

    const updateInfoDate = (obj: any) => {
        setAttendeeData({
            ...attendeeData,
            info: {
                ...attendeeData?.info,
                [obj.name]: (typeof obj.item === 'object' && obj.item !== null) ? obj.item.format(GENERAL_DATE_FORMAT) : obj.item,
            },
        });

    };

    const updateSelect = (obj: any) => {
        setAttendeeData({
            ...attendeeData,
            [obj.name]: obj.item,
        });
    };

    const updateInfoSelect = (obj: any) => {
        setAttendeeData({
            ...attendeeData,
            info: {
                ...attendeeData?.info,
                [obj.name]: obj.answer,
            },
        });
    };

    const updateAttendeeData = () => {

        let attendeeObj: any = {
            phone: `${attendeeData?.callingCode}-${attendeeData?.phone}`,
        };

        let custom_field_id = customFields.reduce((ack, question, i)=>{
            if(customFieldData[`custom_field_id_q${i}`] !== undefined){
               let ids =question.allow_multiple === 1 ? customFieldData[`custom_field_id_q${i}`].map((ans:any)=>(ans.value)).join(',') + "," : customFieldData[`custom_field_id_q${i}`].value +',';
                ack += ids;
            }
            return ack;
          }, '');

        let infoObj:any = {
            ...attendeeData?.info,
            phone: `${attendeeData?.callingCode}-${attendeeData?.phone}`,
            gender: gender,
        }

        infoObj[`custom_field_id${event.id}`] = custom_field_id;

        let settings = {
            gdpr: attendeeData?.gdpr
        }

        if (attendeeData?.email) attendeeObj.email = attendeeData?.email;

        if (attendeeData?.first_name) attendeeObj.first_name = attendeeData?.first_name;

        if (attendeeData?.last_name) attendeeObj.last_name = attendeeData?.last_name;

        if (attendeeData?.FIRST_NAME_PASSPORT) attendeeObj.FIRST_NAME_PASSPORT = attendeeData?.FIRST_NAME_PASSPORT;

        if (attendeeData?.LAST_NAME_PASSPORT) attendeeObj.LAST_NAME_PASSPORT = attendeeData?.LAST_NAME_PASSPORT;

        if (attendeeData?.BIRTHDAY_YEAR) attendeeObj.BIRTHDAY_YEAR = attendeeData?.BIRTHDAY_YEAR;

        if (attendeeData?.EMPLOYMENT_DATE) attendeeObj.EMPLOYMENT_DATE = attendeeData?.EMPLOYMENT_DATE;

        if (attendeeData?.image) attendeeObj.image = attendeeData?.image;

        if (attendeeData.file) attendeeObj.file = attendeeData.file;

        if (attendeeData?.attendee_cv) attendeeObj.att_cv = attendeeData?.attendee_cv;

        if (attendeeData?.password && attendeeData?.password !== '') attendeeObj.password = attendeeData?.password;


        const data = {
            attendeeObj,
            settings,
            infoObj
        };

        const formData = new FormData();
        formData.append('attendeeObj', JSON.stringify(data.attendeeObj));
        formData.append('infoObj', JSON.stringify(data.infoObj));
        formData.append('settings', JSON.stringify(data.settings));
        formData.append('file', data.attendeeObj.file);
        formData.append('attendee_cv', data.attendeeObj.att_cv);

        updateAttendee(formData);
    };

    return (
        <Container bg="primary.box" rounded="md" mb="3" maxW="100%" w="100%">

            <Box mb="4" w="100%" bg="primary.darkbox" px="3" py="2" roundedTop="md">
                <Text fontSize="lg">General information</Text>
            </Box>

            {settings?.map((setting: Setting, index: number) => (
                <VStack alignItems={"center"} w="100%" key={index}>
                    {setting?.name === 'initial' && (
                        <HStack mb="3" alignItems="flex-start" px="3" flexDirection={['column', 'row']}  w="100%">
                            <Center alignItems="flex-start" w="225px">
                                <Text isTruncated fontWeight="500" fontSize="lg">{labels?.initial}</Text>
                            </Center>
                            <Center justifyContent={'flex-start'} justifyItems={'flex-start'} alignItems={'flex-start'} w={['100%', 'calc(100% - 225px)']}>
                                <Input w="100%"
                                    placeholder={labels?.initial}
                                    isReadOnly={setting.is_editable === 1  && event?.attendee_settings?.create_profile == 1  && event?.attendee_settings?.create_profile == 1 ? false : true}
                                    onChangeText={(answer) => {
                                        updateAttendeeInfoFeild('initial', answer);
                                    }}
                                    value={attendeeData?.info?.initial}
                                />
                            </Center>
                        </HStack>
                    )}
                    {setting?.name === 'password' && setting.is_editable === 1  && event?.attendee_settings?.create_profile == 1  && event?.attendee_settings?.create_profile == 1 && (
                        <HStack mb="3" alignItems="flex-start" px="3" flexDirection={['column', 'row']}  w="100%">
                            <Center alignItems="flex-start" w="225px">
                                <Text isTruncated fontWeight="500" fontSize="lg">{labels?.password}</Text>
                            </Center>
                            <Center justifyContent={'flex-start'} justifyItems={'flex-start'} alignItems={'flex-start'} w={['100%', 'calc(100% - 225px)']}>
                                <Input w="100%"
                                    placeholder={'********'}
                                    type='password'
                                    isReadOnly={setting.is_editable === 1  && event?.attendee_settings?.create_profile == 1 ? false : true}
                                    onChangeText={(answer) => {
                                        updateAttendeeFeild('password', answer);
                                    }}
                                />
                            </Center>
                        </HStack>
                    )}
                    {setting?.name === 'first_name' && (
                        <HStack mb="3" alignItems="flex-start" px="3" flexDirection={['column', 'row']}  w="100%">
                            <Center alignItems="flex-start" w="225px">
                                <Text isTruncated fontWeight="500" fontSize="lg">{labels?.first_name}</Text>
                            </Center>
                            <Center justifyContent={'flex-start'} justifyItems={'flex-start'} alignItems={'flex-start'} w={['100%', 'calc(100% - 225px)']}>
                                <Input w="100%"
                                    placeholder={labels?.first_name}
                                    isReadOnly={setting.is_editable === 1  && event?.attendee_settings?.create_profile == 1 ? false : true}
                                    onChangeText={(answer) => {
                                        updateAttendeeFeild('first_name', answer);
                                    }}
                                    value={attendeeData?.first_name}
                                />
                            </Center>
                        </HStack>
                    )}
                    {setting?.name === 'last_name' && (
                        <HStack mb="3" alignItems="flex-start" px="3" flexDirection={['column', 'row']}  w="100%">
                            <Center alignItems="flex-start" w="225px">
                                <Text isTruncated fontWeight="500" fontSize="lg">{labels?.last_name}</Text>
                            </Center>
                            <Center justifyContent={'flex-start'} justifyItems={'flex-start'} alignItems={'flex-start'} w={['100%', 'calc(100% - 225px)']}>
                                <Input w="100%"
                                    placeholder={labels?.last_name}
                                    isReadOnly={setting.is_editable === 1  && event?.attendee_settings?.create_profile == 1 ? false : true}
                                    onChangeText={(answer) => {
                                        updateAttendeeFeild('last_name', answer);
                                    }}
                                    value={attendeeData?.last_name}
                                />
                            </Center>
                        </HStack>
                    )}
                    {setting?.name === 'bio_info' && (
                        <HStack mb="3" alignItems="flex-start" px="3" flexDirection={['column', 'row']}  w="100%">
                            <Center alignItems="flex-start" w="225px">
                                <Text isTruncated fontWeight="500" fontSize="lg">{labels?.about}</Text>
                            </Center>
                            <Center justifyContent={'flex-start'} justifyItems={'flex-start'} alignItems={'flex-start'} w={['100%', 'calc(100% - 225px)']}>
                                <Input w="100%"
                                    placeholder={labels?.about}
                                    isReadOnly={setting.is_editable === 1  && event?.attendee_settings?.create_profile == 1 ? false : true}
                                    onChangeText={(answer) => {
                                        updateAttendeeInfoFeild('about', answer);
                                    }}
                                    value={attendeeData?.info?.about}
                                />
                            </Center>
                        </HStack>
                    )}
                    {setting?.name === 'age' && (
                        <HStack mb="3" alignItems="flex-start" px="3" flexDirection={['column', 'row']}  w="100%">
                            <Center alignItems="flex-start" w="225px">
                                <Text isTruncated fontWeight="500" fontSize="lg">{labels?.age}</Text>
                            </Center>
                            <Center justifyContent={'flex-start'} justifyItems={'flex-start'} alignItems={'flex-start'} w={['100%', 'calc(100% - 225px)']}>
                                <Input w="100%"
                                    placeholder={labels?.age}
                                    isReadOnly={setting.is_editable === 1  && event?.attendee_settings?.create_profile == 1 ? false : true}
                                    onChangeText={(answer) => {
                                        updateAttendeeInfoFeild('age', answer);
                                    }}
                                    value={attendeeData?.info?.age}
                                />
                            </Center>
                        </HStack>
                    )}
                    {setting?.name === 'first_name_passport' && (
                        <HStack mb="3" alignItems="flex-start" px="3" flexDirection={['column', 'row']}  w="100%">
                            <Center alignItems="flex-start" w="225px">
                                <Text isTruncated fontWeight="500" fontSize="lg">{labels?.FIRST_NAME_PASSPORT}</Text>
                            </Center>
                            <Center justifyContent={'flex-start'} justifyItems={'flex-start'} alignItems={'flex-start'} w={['100%', 'calc(100% - 225px)']}>
                                <Input w="100%"
                                    placeholder={labels?.FIRST_NAME_PASSPORT}
                                    isReadOnly={setting.is_editable === 1  && event?.attendee_settings?.create_profile == 1 ? false : true}
                                    onChangeText={(answer) => {
                                        updateAttendeeFeild('FIRST_NAME_PASSPORT', answer);
                                    }}
                                    value={attendeeData?.FIRST_NAME_PASSPORT}
                                />
                            </Center>
                        </HStack>
                    )}
                    {setting?.name === 'last_name_passport' && (
                        <HStack mb="3" alignItems="flex-start" px="3" flexDirection={['column', 'row']}  w="100%">
                            <Center alignItems="flex-start" w="225px">
                                <Text isTruncated fontWeight="500" fontSize="lg">{labels?.LAST_NAME_PASSPORT}</Text>
                            </Center>
                            <Center justifyContent={'flex-start'} justifyItems={'flex-start'} alignItems={'flex-start'} w={['100%', 'calc(100% - 225px)']}>
                                <Input w="100%"
                                    placeholder={labels?.LAST_NAME_PASSPORT}
                                    isReadOnly={setting.is_editable === 1  && event?.attendee_settings?.create_profile == 1 ? false : true}
                                    onChangeText={(answer) => {
                                        updateAttendeeFeild('LAST_NAME_PASSPORT', answer);
                                    }}
                                    value={attendeeData?.LAST_NAME_PASSPORT}
                                />
                            </Center>
                        </HStack>
                    )}
                    {setting?.name === 'place_of_birth' && (
                        <HStack mb="3" alignItems="flex-start" px="3" flexDirection={['column', 'row']}  w="100%">
                            <Center alignItems="flex-start" w="225px">
                                <Text isTruncated fontWeight="500" fontSize="lg">{labels?.place_of_birth}</Text>
                            </Center>
                            <Center justifyContent={'flex-start'} justifyItems={'flex-start'} alignItems={'flex-start'} w={['100%', 'calc(100% - 225px)']}>
                                <Input w="100%"
                                    placeholder={labels?.place_of_birth}
                                    isReadOnly={setting.is_editable === 1  && event?.attendee_settings?.create_profile == 1 ? false : true}
                                    onChangeText={(answer) => {
                                        updateAttendeeInfoFeild('place_of_birth', answer);
                                    }}
                                    value={attendeeData?.info?.place_of_birth}
                                />
                            </Center>
                        </HStack>
                    )}
                    {setting?.name === 'passport_no' && (
                        <HStack mb="3" alignItems="flex-start" px="3" flexDirection={['column', 'row']}  w="100%">
                            <Center alignItems="flex-start" w="225px">
                                <Text isTruncated fontWeight="500" fontSize="lg">{labels?.passport_no}</Text>
                            </Center>
                            <Center justifyContent={'flex-start'} justifyItems={'flex-start'} alignItems={'flex-start'} w={['100%', 'calc(100% - 225px)']}>
                                <Input w="100%"
                                    placeholder={labels?.passport_no}
                                    isReadOnly={setting.is_editable === 1  && event?.attendee_settings?.create_profile == 1 ? false : true}
                                    onChangeText={(answer) => {
                                        updateAttendeeInfoFeild('passport_no', answer);
                                    }}
                                    value={attendeeData?.info?.passport_no}
                                />
                            </Center>
                        </HStack>
                    )}
                    {setting?.name === 'company_name' && (
                        <HStack mb="3" alignItems="flex-start" px="3" flexDirection={['column', 'row']}  w="100%">
                            <Center alignItems="flex-start" w="225px">
                                <Text isTruncated fontWeight="500" fontSize="lg">{labels?.company_name}</Text>
                            </Center>
                            <Center justifyContent={'flex-start'} justifyItems={'flex-start'} alignItems={'flex-start'} w={['100%', 'calc(100% - 225px)']}>
                                <Input w="100%"
                                    placeholder={labels?.company_name}
                                    isReadOnly={setting.is_editable === 1  && event?.attendee_settings?.create_profile == 1 ? false : true}
                                    onChangeText={(answer) => {
                                        updateAttendeeInfoFeild('company_name', answer);
                                    }}
                                    value={attendeeData?.info?.company_name}
                                />
                            </Center>
                        </HStack>
                    )}
                    {setting?.name === 'title' && (
                        <HStack mb="3" alignItems="flex-start" px="3" flexDirection={['column', 'row']}  w="100%">
                            <Center alignItems="flex-start" w="225px">
                                <Text isTruncated fontWeight="500" fontSize="lg">{labels?.title}</Text>
                            </Center>
                            <Center justifyContent={'flex-start'} justifyItems={'flex-start'} alignItems={'flex-start'} w={['100%', 'calc(100% - 225px)']}>
                                <Input w="100%"
                                    placeholder={labels?.title}
                                    isReadOnly={setting.is_editable === 1  && event?.attendee_settings?.create_profile == 1 ? false : true}
                                    onChangeText={(answer) => {
                                        updateAttendeeInfoFeild('title', answer);
                                    }}
                                    value={attendeeData?.info?.title}
                                />
                            </Center>
                        </HStack>
                    )}
                    {setting?.name === 'organization' && (
                        <HStack mb="3" alignItems="flex-start" px="3" flexDirection={['column', 'row']}  w="100%">
                            <Center alignItems="flex-start" w="225px">
                                <Text isTruncated fontWeight="500" fontSize="lg">{labels?.organization}</Text>
                            </Center>
                            <Center justifyContent={'flex-start'} justifyItems={'flex-start'} alignItems={'flex-start'} w={['100%', 'calc(100% - 225px)']}>
                                <Input w="100%"
                                    placeholder={labels?.organization}
                                    isReadOnly={setting.is_editable === 1  && event?.attendee_settings?.create_profile == 1 ? false : true}
                                    onChangeText={(answer) => {
                                        updateAttendeeInfoFeild('organization', answer);
                                    }}
                                    value={attendeeData?.info?.organization}
                                />
                            </Center>
                        </HStack>
                    )}
                    {setting?.name === 'department' && (
                        <HStack mb="3" alignItems="flex-start" px="3" flexDirection={['column', 'row']}  w="100%">
                            <Center alignItems="flex-start" w="225px">
                                <Text isTruncated fontWeight="500" fontSize="lg">{labels?.department}</Text>
                            </Center>
                            <Center justifyContent={'flex-start'} justifyItems={'flex-start'} alignItems={'flex-start'} w={['100%', 'calc(100% - 225px)']}>
                                <Input w="100%"
                                    placeholder={labels?.department}
                                    isReadOnly={setting.is_editable === 1  && event?.attendee_settings?.create_profile == 1 ? false : true}
                                    onChangeText={(answer) => {
                                        updateAttendeeInfoFeild('department', answer);
                                    }}
                                    value={attendeeData?.info?.department}
                                />
                            </Center>
                        </HStack>
                    )}
                    {setting?.name === 'show_industry' && (
                        <HStack mb="3" alignItems="flex-start" px="3" flexDirection={['column', 'row']}  w="100%">
                            <Center alignItems="flex-start" w="225px">
                                <Text isTruncated fontWeight="500" fontSize="lg">{labels?.industry}</Text>
                            </Center>
                            <Center justifyContent={'flex-start'} justifyItems={'flex-start'} alignItems={'flex-start'} w={['100%', 'calc(100% - 225px)']}>
                                <Input w="100%"
                                    placeholder={labels?.industry}
                                    isReadOnly={setting.is_editable === 1  && event?.attendee_settings?.create_profile == 1 ? false : true}
                                    onChangeText={(answer) => {
                                        updateAttendeeInfoFeild('industry', answer);
                                    }}
                                    value={attendeeData?.info?.industry}
                                />
                            </Center>
                        </HStack>
                    )}
                    {setting?.name === 'show_job_tasks' && (
                        <HStack mb="3" alignItems="flex-start" px="3" flexDirection={['column', 'row']}  w="100%">
                            <Center alignItems="flex-start" w="225px">
                                <Text isTruncated fontWeight="500" fontSize="lg">{labels?.jobs}</Text>
                            </Center>
                            <Center justifyContent={'flex-start'} justifyItems={'flex-start'} alignItems={'flex-start'} w={['100%', 'calc(100% - 225px)']}>
                                <Input w="100%"
                                    placeholder={labels?.jobs}
                                    isReadOnly={setting.is_editable === 1  && event?.attendee_settings?.create_profile == 1 ? false : true}
                                    onChangeText={(answer) => {
                                        updateAttendeeInfoFeild('jobs', answer);
                                    }}
                                    value={attendeeData?.info?.jobs}
                                />
                            </Center>
                        </HStack>
                    )}
                    {setting?.name === 'interest' && (
                        <HStack mb="3" alignItems="flex-start" px="3" flexDirection={['column', 'row']}  w="100%">
                            <Center alignItems="flex-start" w="225px">
                                <Text isTruncated fontWeight="500" fontSize="lg">{labels?.interests}</Text>
                            </Center>
                            <Center justifyContent={'flex-start'} justifyItems={'flex-start'} alignItems={'flex-start'} w={['100%', 'calc(100% - 225px)']}>
                                <Input w="100%"
                                    placeholder={labels?.interests}
                                    isReadOnly={setting.is_editable === 1  && event?.attendee_settings?.create_profile == 1 ? false : true}
                                    onChangeText={(answer) => {
                                        updateAttendeeInfoFeild('interests', answer);
                                    }}
                                    value={attendeeData?.info?.interests}
                                />
                            </Center>
                        </HStack>
                    )}
                    {setting?.name === 'network_group' && (
                        <HStack mb="3" alignItems="flex-start" px="3" flexDirection={['column', 'row']}  w="100%">
                            <Center alignItems="flex-start" w="225px">
                                <Text isTruncated fontWeight="500" fontSize="lg">{labels?.network_group}</Text>
                            </Center>
                            <Center justifyContent={'flex-start'} justifyItems={'flex-start'} alignItems={'flex-start'} w={['100%', 'calc(100% - 225px)']}>
                                <Input w="100%"
                                    placeholder={labels?.network_group}
                                    isReadOnly={setting.is_editable === 1  && event?.attendee_settings?.create_profile == 1 ? false : true}
                                    onChangeText={(answer) => {
                                        updateAttendeeInfoFeild('network_group', answer);
                                    }}
                                    value={attendeeData?.info?.network_group}
                                />
                            </Center>
                        </HStack>
                    )}
                    {setting?.name === 'delegate_number' && (
                        <HStack mb="3" alignItems="flex-start" px="3" flexDirection={['column', 'row']}  w="100%">
                            <Center alignItems="flex-start" w="225px">
                                <Text isTruncated fontWeight="500" fontSize="lg">{labels?.delegate}</Text>
                            </Center>
                            <Center justifyContent={'flex-start'} justifyItems={'flex-start'} alignItems={'flex-start'} w={['100%', 'calc(100% - 225px)']}>
                                <Input w="100%"
                                    placeholder={labels?.delegate}
                                    isReadOnly={setting.is_editable === 1  && event?.attendee_settings?.create_profile == 1 ? false : true}
                                    onChangeText={(answer) => {
                                        updateAttendeeInfoFeild('delegate_number', answer);
                                    }}
                                    value={attendeeData?.info?.delegate_number}
                                />
                            </Center>
                        </HStack>
                    )}
                    {setting?.name === 'table_number' && (
                        <HStack mb="3" alignItems="flex-start" px="3" flexDirection={['column', 'row']}  w="100%">
                            <Center alignItems="flex-start" w="225px">
                                <Text isTruncated fontWeight="500" fontSize="lg">{labels?.table_number}</Text>
                            </Center>
                            <Center justifyContent={'flex-start'} justifyItems={'flex-start'} alignItems={'flex-start'} w={['100%', 'calc(100% - 225px)']}>
                                <Input w="100%"
                                    placeholder={labels?.table_number}
                                    isReadOnly={setting.is_editable === 1  && event?.attendee_settings?.create_profile == 1 ? false : true}
                                    onChangeText={(answer) => {
                                        updateAttendeeInfoFeild('table_number', answer);
                                    }}
                                    value={attendeeData?.info?.table_number}
                                />
                            </Center>
                        </HStack>
                    )}
                    {setting?.name === 'pa_street' && (
                        <HStack mb="3" alignItems="flex-start" px="3" flexDirection={['column', 'row']}  w="100%">
                            <Center alignItems="flex-start" w="225px">
                                <Text isTruncated fontWeight="500" fontSize="lg">{labels?.private_street}</Text>
                            </Center>
                            <Center justifyContent={'flex-start'} justifyItems={'flex-start'} alignItems={'flex-start'} w={['100%', 'calc(100% - 225px)']}>
                                <Input w="100%"
                                    placeholder={labels?.private_street}
                                    isReadOnly={setting.is_editable === 1  && event?.attendee_settings?.create_profile == 1 ? false : true}
                                    onChangeText={(answer) => {
                                        updateAttendeeInfoFeild('private_street', answer);
                                    }}
                                    value={attendeeData?.info?.private_street}
                                />
                            </Center>
                        </HStack>
                    )}
                    {setting?.name === 'pa_house_no' && (
                        <HStack mb="3" alignItems="flex-start" px="3" flexDirection={['column', 'row']}  w="100%">
                            <Center alignItems="flex-start" w="225px">
                                <Text isTruncated fontWeight="500" fontSize="lg">{labels?.private_house_number}</Text>
                            </Center>
                            <Center justifyContent={'flex-start'} justifyItems={'flex-start'} alignItems={'flex-start'} w={['100%', 'calc(100% - 225px)']}>
                                <Input w="100%"
                                    placeholder={labels?.private_house_number}
                                    isReadOnly={setting.is_editable === 1  && event?.attendee_settings?.create_profile == 1 ? false : true}
                                    onChangeText={(answer) => {
                                        updateAttendeeInfoFeild('private_house_number', answer);
                                    }}
                                    value={attendeeData?.info?.private_house_number}
                                />
                            </Center>
                        </HStack>
                    )}
                    {setting?.name === 'pa_post_code' && (
                        <HStack mb="3" alignItems="flex-start" px="3" flexDirection={['column', 'row']}  w="100%">
                            <Center alignItems="flex-start" w="225px">
                                <Text isTruncated fontWeight="500" fontSize="lg">{labels?.private_post_code}</Text>
                            </Center>
                            <Center justifyContent={'flex-start'} justifyItems={'flex-start'} alignItems={'flex-start'} w={['100%', 'calc(100% - 225px)']}>
                                <Input w="100%"
                                    placeholder={labels?.private_post_code}
                                    isReadOnly={setting.is_editable === 1  && event?.attendee_settings?.create_profile == 1 ? false : true}
                                    onChangeText={(answer) => {
                                        updateAttendeeInfoFeild('private_post_code', answer);
                                    }}
                                    value={attendeeData?.info?.private_post_code}
                                />
                            </Center>
                        </HStack>
                    )}
                    {setting?.name === 'pa_city' && (
                        <HStack mb="3" alignItems="flex-start" px="3" flexDirection={['column', 'row']}  w="100%">
                            <Center alignItems="flex-start" w="225px">
                                <Text isTruncated fontWeight="500" fontSize="lg">{labels?.private_city}</Text>
                            </Center>
                            <Center justifyContent={'flex-start'} justifyItems={'flex-start'} alignItems={'flex-start'} w={['100%', 'calc(100% - 225px)']}>
                                <Input w="100%"
                                    placeholder={labels?.private_city}
                                    isReadOnly={setting.is_editable === 1  && event?.attendee_settings?.create_profile == 1 ? false : true}
                                    onChangeText={(answer) => {
                                        updateAttendeeInfoFeild('private_city', answer);
                                    }}
                                    value={attendeeData?.info?.private_city}
                                />
                            </Center>
                        </HStack>
                    )}
                    {setting?.name === 'pa_country' && (
                        <HStack mb="3" alignItems="flex-start" px="3" flexDirection={['column', 'row']}  w="100%">
                            <Center alignItems="flex-start" w="225px">
                                <Text isTruncated fontWeight="500" fontSize="lg">{labels?.private_country}</Text>
                            </Center>
                            <Center justifyContent={'flex-start'} justifyItems={'flex-start'} alignItems={'flex-start'} w={['100%', 'calc(100% - 225px)']}>
                                <Select
                                    placeholder="Please Select"
                                    minWidth="64"
                                    h="50px"
                                    isDisabled={(setting.is_editable === 1  && event?.attendee_settings?.create_profile == 1) ? false : true}
                                    selectedValue={attendeeData?.info?.private_country}
                                    onValueChange={answer => updateInfoSelect({ answer, name: "private_country" })}
                                >
                                    {countries.map((answer, key) => (<Select.Item key={key} label={answer.name} value={`${answer.id}`} />))}
                                </Select>
                            </Center>
                        </HStack>
                    )}
                    {setting?.name === 'email' && (
                        <HStack mb="3" alignItems="flex-start" px="3" flexDirection={['column', 'row']}  w="100%">
                            <Center alignItems="flex-start" w="225px">
                                <Text isTruncated fontWeight="500" fontSize="lg">{labels?.email}</Text>
                            </Center>
                            <Center justifyContent={'flex-start'} justifyItems={'flex-start'} alignItems={'flex-start'} w={['100%', 'calc(100% - 225px)']}>
                                <Input w="100%"
                                    placeholder={labels?.email}
                                    isReadOnly={true}
                                    onChangeText={(answer) => {
                                        updateAttendeeFeild('email', answer);
                                    }}
                                    value={attendeeData?.email}
                                />
                            </Center>
                        </HStack>
                    )}
                    {setting?.name === 'gender' && (
                        <HStack mb="3" alignItems="flex-start" px="3" flexDirection={['column', 'row']}  w="100%">
                            <Center alignItems="flex-start" w="225px">
                                <Text isTruncated fontWeight="500" fontSize="lg">{labels?.gender}</Text>
                            </Center>
                            <Center justifyContent={'flex-start'} justifyItems={'flex-start'} alignItems={'flex-start'} w={['100%', 'calc(100% - 225px)']}>
                                    
                                <Radio.Group space="5"   value={gender} name="MyRadioGroup" onChange={(gender) => { setGender(gender); }}>
                                    <HStack space="3" alignItems="center">
                                        <Radio  isDisabled={(setting.is_editable === 1  && event?.attendee_settings?.create_profile == 1) ? false : true} value={'male'}> Male </Radio>
                                        <Radio  isDisabled={(setting.is_editable === 1  && event?.attendee_settings?.create_profile == 1) ? false : true} value={'female'}> Female </Radio>
                                    </HStack>

                                </Radio.Group>
                            </Center>
                        </HStack>
                    )}
                    {setting?.name === 'birth_date' && (
                        <HStack mb="3" alignItems="flex-start" px="3" flexDirection={['column', 'row']}  w="100%">
                            <Center alignItems="flex-start" w="225px">
                                <Text isTruncated fontWeight="500" fontSize="lg">{labels?.BIRTHDAY_YEAR}</Text>
                            </Center>
                            <Center alignItems="flex-start" w={['100%', 'calc(100% - 225px)']}>
                                <DateTimePicker
                                    readOnly={setting?.is_editable === 1 ? false : true}
                                    onChange={(item: any) => {
                                        updateDate({ item, name: "BIRTHDAY_YEAR" });
                                    }}
                                    value={attendeeData?.BIRTHDAY_YEAR !== '' && attendeeData?.BIRTHDAY_YEAR !== '0000-00-00' && attendeeData?.BIRTHDAY_YEAR !== '0000-00-00 00:00:00' ? moment(attendeeData?.BIRTHDAY_YEAR).format(GENERAL_DATE_FORMAT) : ''}
                                    showdate={GENERAL_DATE_FORMAT}
                                />
                            </Center>

                        </HStack>
                    )}
                    {setting?.name === 'date_of_issue_passport' && (
                        <HStack mb="3" alignItems="flex-start" px="3" flexDirection={['column', 'row']}  w="100%">
                            <Center alignItems="flex-start" w="225px">
                                <Text isTruncated fontWeight="500" fontSize="lg">{labels?.date_of_issue_passport}</Text>
                            </Center>
                            <Center alignItems="flex-start" w={['100%', 'calc(100% - 225px)']}>
                                <DateTimePicker
                                    readOnly={setting?.is_editable === 1 ? false : true}
                                    onChange={(item: any) => {
                                        updateInfoDate({ item, name: "date_of_issue_passport" });
                                    }}
                                    value={attendeeData?.info?.date_of_issue_passport !== '' && attendeeData?.info?.date_of_issue_passport !== '0000-00-00' && attendeeData?.info?.date_of_issue_passport !== '0000-00-00 00:00:00' ? moment(attendeeData?.info?.date_of_issue_passport).format(GENERAL_DATE_FORMAT) : ''}
                                    showdate={GENERAL_DATE_FORMAT}
                                />
                            </Center>

                        </HStack>
                    )}
                    {setting?.name === 'date_of_expiry_passport' && (
                        <HStack mb="3" alignItems="flex-start" px="3" flexDirection={['column', 'row']}  w="100%">
                            <Center alignItems="flex-start" w="225px">
                                <Text isTruncated fontWeight="500" fontSize="lg">{labels?.date_of_expiry_passport}</Text>
                            </Center>
                            <Center justifyContent={'flex-start'} justifyItems={'flex-start'} alignItems={'flex-start'} w={['100%', 'calc(100% - 225px)']}>
                                <DateTimePicker
                                    readOnly={setting?.is_editable === 1 ? false : true}
                                    onChange={(item: any) => {
                                        updateInfoDate({ item, name: "date_of_expiry_passport" });
                                    }}
                                    value={attendeeData?.info?.date_of_expiry_passport !== '' && attendeeData?.info?.date_of_expiry_passport !== '0000-00-00' && attendeeData?.info?.date_of_expiry_passport !== '0000-00-00 00:00:00' ? moment(attendeeData?.info?.date_of_expiry_passport).format(GENERAL_DATE_FORMAT) : ''}
                                    showdate={GENERAL_DATE_FORMAT}
                                />
                            </Center>
                        </HStack>
                    )}
                    {setting?.name === 'employment_date' && (
                        <HStack mb="3" alignItems="flex-start" px="3" flexDirection={['column', 'row']}  w="100%">
                            <Center alignItems="flex-start" w="225px">
                                <Text isTruncated fontWeight="500" fontSize="lg">{labels?.EMPLOYMENT_DATE}</Text>
                            </Center>
                            <Center justifyContent={'flex-start'} justifyItems={'flex-start'} alignItems={'flex-start'} w={['100%', 'calc(100% - 225px)']}>
                                <DateTimePicker
                                    readOnly={setting?.is_editable === 1 ? false : true}
                                    onChange={(item: any) => {
                                        updateInfoDate({ item, name: "EMPLOYMENT_DATE" });
                                    }}
                                    value={attendeeData?.EMPLOYMENT_DATE !== '' && attendeeData?.EMPLOYMENT_DATE !== '0000-00-00' && attendeeData?.EMPLOYMENT_DATE !== '0000-00-00 00:00:00' ? moment(attendeeData?.EMPLOYMENT_DATE).format(GENERAL_DATE_FORMAT) : ''}
                                    showdate={GENERAL_DATE_FORMAT}
                                />
                            </Center>
                        </HStack>
                    )}
                    {setting?.name === 'country' && (
                        <HStack mb="3" alignItems="flex-start" px="3" flexDirection={['column', 'row']}  w="100%">
                            <Center alignItems="flex-start" w="225px">
                                <Text isTruncated fontWeight="500" fontSize="lg">{labels?.country}</Text>
                            </Center>
                            <Center justifyContent={'flex-start'} justifyItems={'flex-start'} alignItems={'flex-start'} w={['100%', 'calc(100% - 225px)']}>
                                <Select
                                    placeholder="Please Select"
                                    minWidth="64"
                                    w="100%"
                                    h="50px"
                                    isDisabled={(setting.is_editable === 1  && event?.attendee_settings?.create_profile == 1) ? false : true}
                                    selectedValue={attendeeData?.info?.country}
                                    onValueChange={answer => updateInfoSelect({ answer, name: "country" })}
                                >
                                    {countries.map((answer, key) => (<Select.Item key={key} label={answer.name} value={`${answer.id}`} />))}
                                </Select>
                            </Center>
                        </HStack>
                    )}
                    {setting?.name === 'spoken_languages' && (
                        <HStack mb="3" alignItems="flex-start" px="3" flexDirection={['column', 'row']}  w="100%">
                            <Center alignItems="flex-start" w="225px">
                                <Text isTruncated fontWeight="500" fontSize="lg">{labels?.SPOKEN_LANGUAGE}</Text>
                            </Center>
                            <Center justifyContent={'flex-start'} justifyItems={'flex-start'} alignItems={'flex-start'} w={['100%', 'calc(100% - 225px)']}>
                            <DropDown
                                label={labels?.SPOKEN_LANGUAGE}
                                listitems={languages}
                                required={false}
                                isDisabled={(setting.is_editable === 1  && event?.attendee_settings?.create_profile == 1) ? false : true}
                                isMulti={true}
                                selected={
                                    attendeeData.SPOKEN_LANGUAGE &&
                                    typeof attendeeData.SPOKEN_LANGUAGE !== 'string'
                                    ? attendeeData.SPOKEN_LANGUAGE
                                    : null
                                }
                                onChange={(item:any) => {
                                    updateSelect({ item, name: "SPOKEN_LANGUAGE" });
                                }}
                                />
                            </Center>
                        </HStack>
                    )}

                    {setting?.name === 'show_custom_field' && (
                      customFields.map((question, i)=>(
                        <HStack mb="3" key={i} alignItems="flex-start" px="3" flexDirection={['column', 'row']} zIndex={100 - i} w="100%">
                            <Center alignItems="flex-start" w="225px">
                                <Text isTruncated fontWeight="500" fontSize="lg">{question?.name}</Text>
                            </Center>
                            <Center justifyContent={'flex-start'} justifyItems={'flex-start'} alignItems={'flex-start'} w={['100%', 'calc(100% - 225px)']}>
                            <ReactSelect
                                styles={Selectstyles2}
                                isDisabled={(setting.is_editable === 1  && event?.attendee_settings?.create_profile == 1) ? false : true}
                                placeholder={question.name}
                                components={{ IndicatorSeparator: null }}
                                options={question.children_recursive.map((item:any, index:number) => {
                                    return {
                                    label: item.name,
                                    value: item.id,
                                    key: index,
                                    };
                                })}
                                value={customFieldData[`custom_field_id_q${i}`] !== undefined ? customFieldData[`custom_field_id_q${i}`] : null}
                                isMulti={question.allow_multiple === 1 ? true : false}
                                onChange={(item:any) => {
                                    console.log(item);
                                    updateCustomFieldSelect({ item, name: `custom_field_id_q${i}` });
                                }}
                            />
                            </Center>
                        </HStack>
                      ))
                    )}
                    {setting?.name === 'phone' && (
                        <HStack mb="3" alignItems="flex-start" px="3" flexDirection={['column', 'row']}  w="100%">
                            <Center alignItems="flex-start" w="225px">
                                <Text isTruncated fontWeight="500" fontSize="lg">{labels?.phone}</Text>
                            </Center>
                            <Center alignItems="flex-start" w={['100%', 'calc(100% - 225px)']}>
                                <HStack w="100%">
                                    <Center w="100px">
                                        <Select
                                            placeholder="Please Select"
                                            w={'100%'}
                                            h="50px"
                                            isDisabled={setting?.is_editable === 1 ? false : true}
                                            selectedValue={attendeeData?.callingCode}
                                            onValueChange={answer => updateInfoSelect({ answer, name: "phone" })}>
                                            {callingCodes.map((answer, key) => (<Select.Item key={key} label={answer.name} value={`${answer.id}`} />))}
                                        </Select>
                                    </Center>
                                    <Center pl="2" w="calc(100% - 100px)">
                                        <Input w="100%"
                                            h="50px"
                                            placeholder={labels?.phone}
                                            isReadOnly={setting.is_editable === 1  && event?.attendee_settings?.create_profile == 1 ? false : true}
                                            onChangeText={(answer) => {
                                                updateAttendeeFeild('phone', answer);
                                            }}
                                            value={attendeeData?.phone}
                                        />
                                    </Center>
                                </HStack>
                            </Center>
                        </HStack>
                    )}
                    {setting?.name === 'profile_picture' && (
                            <HStack mb="3" alignItems="start" flexDirection={['column', 'row']} px="3"  w="100%" >
                                
                                    <HStack mb="0" alignItems="start" flexDirection={['column', 'row']}  w="100%" >
                                        <Center alignItems="flex-start" w="225px">
                                            <Text isTruncated fontWeight="500" fontSize="lg">Profile picture</Text>
                                        </Center>
                                        <Center alignItems="flex-start" w={['100%', 'calc(100% - 225px)']}>
                                            <HStack w="100%">
                                                <VStack w={'100%'} space={2}>
                                                    <Center w="150px">
                                                        {((attendeeData && attendeeData?.image && attendeeData?.image !== "") || attendeeData?.blob_image !== undefined) ? 
                                                        <LoadImage path={attendeeData?.blob_image !== undefined ? attendeeData?.blob_image :`${_env.eventcenter_base_url}/assets/attendees/${attendeeData?.image}`} w="150px" />
                                                        : <LoadImage path={`https://via.placeholder.com/155.png`} w="150px" />}
                                                    </Center>
                                                    <Button w={180} px={4} py={3} leftIcon={<Icon as={Ionicons} color={'primary.text'} name="cloud-upload-outline" size="lg" />}  isDisabled={(setting.is_editable === 1  && event?.attendee_settings?.create_profile == 1) ? false : true} onPress={()=>{
                                                            if(inputFileRef.current){
                                                                inputFileRef.current.click();
                                                            }
                                                        }} 
                                                        size={'lg'}
                                                     >
                                                    Browse
                                                    </Button>
                                                </VStack>
                                                {setting?.is_editable === 1 && <Center pl="2" w="calc(100% - 100px)">
                                                    <input 
                                                    width="100%"
                                                        height="50px"
                                                        type='file'
                                                        style={{display:'none'}}
                                                        placeholder={labels?.phone}
                                                        readOnly={setting.is_editable === 1  && event?.attendee_settings?.create_profile == 1 ? false : true}
                                                        onChange={(e) => {
                                                            if (e?.target?.files! && e?.target?.files?.length > 0) {
                                                                setAttendeeData({
                                                                ...attendeeData,
                                                                file: e.target.files[0],
                                                                blob_image: URL.createObjectURL(e.target.files[0]),
                                                                });
                                                            }
                                                        }}
                                                        ref={inputFileRef}
                                                    />
                                                </Center>}
                                            </HStack>
                                        </Center>
                                    </HStack>
                            </HStack>
                    )}
                    {setting?.name === 'resume' && (
                            <HStack mb="3" alignItems="start" px="3"  w="100%" >
                            
                                <HStack mb="3" alignItems="start" flexDirection={['column', 'row']}  w="100%" >
                                    <Center alignItems="flex-start" width={'225px'} maxW="225px">
                                        <Text isTruncated fontWeight="500" fontSize="lg">Resume</Text>
                                    </Center>
                                    <Center alignItems="flex-start" w={['100%', 'calc(100% - 225px)']}>
                                        <HStack w="100%">
                                            <VStack w={'100%'} space={2}>
                                                <Center mb={3} w="150px">
                                                    {(typeof attendeeData.attendee_cv === 'string') ? 
                                                    <Pressable 
                                                    onPress={async () => {
                                                        const url: any = `${_env.eventcenter_base_url}/event/${event.url}/settings/downloadResume/${attendeeData?.attendee_cv}`;
                                                        const supported = await Linking.canOpenURL(url);
                                                        if (supported) {
                                                            await Linking.openURL(url);
                                                        }
                                                    }}>
                                                        <LoadImage path={`${_env.eventcenter_base_url}/_admin_assets/images/pdf512.png`} w="150px" />
                                                    </Pressable>
                                                    : <LoadImage path={`${_env.eventcenter_base_url}/_admin_assets/images/pdf512.png`} w="150px" />}
                                                </Center>

                                                <Button w={180} px={4} py={3}leftIcon={<Icon as={Ionicons} color={'primary.text'} name="cloud-upload-outline" size="lg" />}
                                                    isDisabled={(setting.is_editable === 1  && event?.attendee_settings?.create_profile == 1) ? false : true}
                                                    onPress={()=>{
                                                        if(inputresumeFileRef.current){
                                                            inputresumeFileRef.current.click();
                                                        }
                                                    }}
                                                    size={'lg'}
                                                     >
                                                    Browse
                                                    </Button>
                                            </VStack>
                                            {setting?.is_editable === 1 && <Center pl="2" w="calc(100% - 100px)">
                                                <input 
                                                		width="100%"
                                                    height="50px"
                                                    type='file'
                                                    style={{display:'none'}}
                                                    placeholder={labels?.phone}
                                                    readOnly={setting.is_editable === 1  && event?.attendee_settings?.create_profile == 1 ? false : true}
                                                    onChange={(e) => {
                                                        if (e?.target?.files! && e?.target?.files?.length > 0) {
                                                            setAttendeeData({
                                                            ...attendeeData,
                                                            attendee_cv: e.target.files[0],
                                                            });
                                                        }
                                                    }}
                                                    ref={inputresumeFileRef}
                                                />
                                            </Center>}
                                        </HStack>
                                    </Center>
                                </HStack>
                            </HStack>
                    )}
                </VStack>
            ))}
            <Box mb="4" w="100%" bg="primary.darkbox" px="3" py="1" >
                <Text fontSize="lg">Contact information</Text>
            </Box>
            {attendee_feild_settings?.website === 1 && <HStack pb={3} borderBottomWidth={1} borderBottomColor={'primary.bordercolor'} mb="3" alignItems="center" px="3"  w="100%">
                <Center w="42" h="42" rounded={2} mr={3} alignItems="center" bg={'primary.darkbox'}>
                   <Icon color={'primary.text'} as={AntDesign} name="link" size={'lg'}  />
                </Center>
                <Center justifyContent={'flex-start'} justifyItems={'flex-start'} alignItems={'flex-start'} w="calc(100% - 60px)">
                    <Input w="100%"
                        placeholder={"Website"}
                        isReadOnly={true}
												bg={'transparent'}
												borderWidth={0}
                        onChangeText={(answer) => {
                            updateAttendeeInfoFeild('website', answer);
                        }}
                        value={attendeeData?.info?.website}
                    />
                </Center>
            </HStack>}
            {attendee_feild_settings?.facebook === 1 && <HStack pb={3} borderBottomWidth={1} borderBottomColor={'primary.bordercolor'} mb="3" alignItems="center" px="3"  w="100%">
                <Center w="42" h="42" rounded={2} mr={3} alignItems="center" bg={'primary.darkbox'}>
                   <Icon as={Ionicons} color={'primary.text'} name="logo-facebook" size={'lg'}  />
                </Center>
                <Center justifyContent={'flex-start'} justifyItems={'flex-start'} alignItems={'flex-start'} w="calc(100% - 60px)">
                    <Input w="100%"
                        placeholder={"Facebook"}
                        isReadOnly={true}
												bg={'transparent'}
												borderWidth={0}
                        onChangeText={(answer) => {
                            updateAttendeeInfoFeild('facebook', answer);
                        }}
                        value={attendeeData?.info?.facebook}
                    />
                </Center>
            </HStack>}
            {attendee_feild_settings?.twitter === 1 && <HStack pb={3} borderBottomWidth={1} borderBottomColor={'primary.bordercolor'} mb="3" alignItems="center" px="3"  w="100%">
                <Center w="42" h="42" rounded={2} mr={3} alignItems="center" bg={'primary.darkbox'}>
                   <Icon as={Ionicons} color={'primary.text'} name="logo-twitter" size={'lg'}  />
                </Center>
                <Center justifyContent={'flex-start'} justifyItems={'flex-start'} alignItems={'flex-start'} w="calc(100% - 60px)">
                    <Input w="100%"
                        placeholder={"Twitter"}
                        isReadOnly={true}
												bg={'transparent'}
												borderWidth={0}
                        onChangeText={(answer) => {
                            updateAttendeeInfoFeild('twitter', answer);
                        }}
                        value={attendeeData?.info?.twitter}
                    />
                </Center>
            </HStack>}
            {attendee_feild_settings?.linkedin === 1 && <HStack pb={3} borderBottomWidth={1} borderBottomColor={'primary.bordercolor'} mb="3" alignItems="center" px="3"  w="100%">
                <Center w="42" h="42" rounded={2} mr={3} alignItems="center" bg={'primary.darkbox'}>
                   <Icon as={Ionicons} color={'primary.text'} name="logo-linkedin" size={'lg'}  />
                </Center>
                <Center justifyContent={'flex-start'} justifyItems={'flex-start'} alignItems={'flex-start'} w="calc(100% - 60px)">
                    <Input w="100%"
                        placeholder={"LinkedIn"}
                        isReadOnly={true}
												bg={'transparent'}
												borderWidth={0}
                        onChangeText={(answer) => {
                            updateAttendeeInfoFeild('linkedin', answer);
                        }}
                        value={attendeeData?.info?.linkedin}
                    />
                </Center>
            </HStack>}
            {<HStack mb="3" alignItems="flex-start" px="3" flexDirection={['column', 'row']}  w="100%">
							 <Center alignItems="flex-start" w="225px">
                </Center>
                <Center justifyContent={'flex-start'} justifyItems={'flex-start'} alignItems={'flex-start'} w={['100%', 'calc(100% - 225px)']}>
                    <Checkbox colorScheme={'secondary'} isDisabled={event?.attendee_settings?.create_profile == 1 ? false : true} defaultIsChecked={attendee?.current_event_attendee?.gdpr === 1 ? true : false} value='gdpr' onChange={(isSelected) => {
                        updateAttendeeFeild('gdpr', isSelected);
                    }} size="md"   >GDPR</Checkbox>
                </Center>
            </HStack>}
            <HStack mb="3" alignItems="flex-start" px="3" flexDirection={['column', 'row']}  w="100%">
                <Button
                    minW={225}
                    py="5"
                    px="5"
                    mx={'auto'}
                    leftIcon={<IcoLongArrow />}
                    colorScheme="primary"
                    isLoading={updatingAttendee}
                    onPress={() => {
                        updateAttendeeData();
                    }}
                />
            </HStack>
        </Container>
    )
}
