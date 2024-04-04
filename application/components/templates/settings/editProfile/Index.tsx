import React, { useEffect } from 'react'

import { Text, Container, Box, Divider, Input, Checkbox, Radio, Select, Button, HStack, Center, VStack, Icon, View, useToast, IconButton, Spacer  } from 'native-base';

import { default as ReactSelect } from "react-select";


import WebLoading from 'application/components/atoms/WebLoading';

import DropDown from 'application/components/atoms/DropDown';

import UseEditProfileService from 'application/store/services/UseEditProfileService'

import UseLoadingService from 'application/store/services/UseLoadingService';

import { Attendee, Attendeefeildsettings, CallingCode, Country, Labels, Language, Setting } from 'application/models/settings/EditProfile';

import UseEventService from 'application/store/services/UseEventService';

import { Event } from 'application/models/Event';

import DateTimePicker from 'application/components/atoms/DateTimePicker';

import { getColorScheme } from 'application/styles/colors';

import { GENERAL_DATE_FORMAT } from 'application/utils/Globals'

import moment from 'moment';

import IcoLongArrow from 'application/assets/icons/IcoLongArrow';
import UseEnvService from 'application/store/services/UseEnvService';
import LoadImage from 'application/components/atoms/LoadImage';
import { Pressable } from 'react-native';
import { Linking } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import AntDesign from '@expo/vector-icons/AntDesign';

import IcoTwitterXsm from "application/assets/icons/small/IcoTwitterXsm"



const index = () => {

    const { FetchEditProfiles, settings, labels, attendee, languages, callingCodes, countries, customFields, attendee_feild_settings, UpdateAttendee, updatingAttendee, success_message, UpdateSuccess } = UseEditProfileService();
    
    const { loading, scroll } = UseLoadingService();
    const toast = useToast();
    const toastIdRef = React.useRef();
    const { event } = UseEventService();


    React.useEffect(() => {
        FetchEditProfiles();
    }, [])
    return (
        <>
            {loading ? (
                <WebLoading />
            ) : (
                <>
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
                        UpdateSuccess={UpdateSuccess}
                        success_message={success_message}
                    />
                </>
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
    success_message: boolean,
    updateAttendee: (data: any) => void
    UpdateSuccess: (data: any) => void
};


const EditProfileFrom = ({ attendee, languages, callingCodes, countries, settings, labels, customFields, event, attendee_feild_settings, updateAttendee, updatingAttendee, success_message, UpdateSuccess }: formProps) => {
    const colors = getColorScheme(event?.settings?.app_background_color ?? '#343d50', event?.settings?.app_text_mode);
    const Selectstyles2 = {
        control: (base: any, state: any) => ({
            ...base,
            //   minHeight: "40px",
            padding: "3px",
            minHeight: 50,
            width: '100%',
            maxWidth: '100%',
            minWidth: '100%',
            marginBottom: 10,
            background: `rgba(0,0,0,0.2)`,
            color: '#eaeaea',
            fontFamily: 'Avenir',
            boxShadow: 'none',
            borderWidth: 2,
            borderColor: state.isFocused ? event?.settings?.primary_color : "transparent",
            "&:hover": {
                // Overwrittes the different states of border
                borderColor: state.isFocused ? event?.settings?.primary_color : "transparent"
            }
        }), placeholder: (defaultStyles: any) => {
            return {
                ...defaultStyles,
                color: '#eaeaea',
            }
        },
        option: (provided: any, state: any) => ({
            ...provided,
            fontFamily: 'Avenir',
            backgroundColor: state.isSelected ? event?.settings?.primary_color : "",
            "&:hover": {
                backgroundColor: event?.settings?.primary_color,
                color: '#fff'
            }
        }),
        singleValue: (provided: any) => ({
            ...provided,
            color: '#eaeaea'
        })
    }
    const { _env } = UseEnvService()

    const [gender, setGender] = React.useState(attendee?.info?.gender ?? '');
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [modalContent, setModalContent] = React.useState({ title: '', body: '' });
    const cancelRef = React.useRef(null);
    const openModal = (title: any, body: any) => {
        setModalContent({ title, body });
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };
    const [attendeeData, setAttendeeData] = React.useState<Attendee>({} as Attendee);
    React.useEffect(() => {
        if (attendee) {
            setAttendeeData({
            ...attendee,
            phone: attendee.phone ? attendee.phone.split("-")[1] : '',
            info: {
                ...attendee?.info,
                callingCode: attendee.phone ? attendee.phone.split("-")[0] : event?.calling_code ? "+"+event?.calling_code : ''
            },
            });
        }
        }, [attendee]);

    const [customFieldData, setCustomFieldData] = React.useState<any>(customFields.reduce((ack1, question, i) => {
        let answers = attendee.info[`custom_field_id${question.event_id}`]?.split(',').reduce((ack2: any, id, i) => {
            let is_answer = question.children_recursive.find((answer: any) => (answer.id == id));
            if (is_answer !== undefined) {
                ack2.push({
                    label: is_answer.name,
                    value: is_answer.id,
                });
            }
            return ack2;
        }, []) || "";
        ack1[`custom_field_id_q${i}`] = question.allow_multiple === 1 ? answers : answers[0];
        return ack1;
    }, {}));

    const inputFileRef = React.useRef<HTMLInputElement | null>(null);

    const inputresumeFileRef = React.useRef<HTMLInputElement | null>(null);

    const updateCustomFieldSelect = (obj: any) => {
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
            console.log("🚀 ~ updateInfoSelect ~ attendeeData:", attendeeData)
    };

    const updateAttendeeData = () => {

        let attendeeObj: any = {
            phone: `${attendeeData?.info.callingCode}-${attendeeData?.phone}`,
        };

        let custom_field_id = customFields.reduce((ack, question, i) => {
            if (customFieldData[`custom_field_id_q${i}`] !== undefined) {
                let ids = question.allow_multiple === 1 ? customFieldData[`custom_field_id_q${i}`].map((ans: any) => (ans.value)).join(',') + "," : customFieldData[`custom_field_id_q${i}`].value + ',';
                ack += ids;
            }
            return ack;
        }, '');

        let infoObj: any = {
            ...attendeeData?.info,
            phone: `${attendeeData?.info.callingCode}-${attendeeData?.phone}`,
            gender: gender,
        }

        infoObj[`custom_field_id${event.id}`] = custom_field_id;

        let settings = {
            gdpr: attendeeData?.gdpr,
            accept_foods_allergies: attendeeData?.accept_foods_allergies
        }

        if (attendeeData?.email) attendeeObj.email = attendeeData?.email;

        if (attendeeData?.title) attendeeObj.title = attendeeData?.title;

        if (attendeeData?.about) attendeeObj.about = attendeeData?.about;

        if (attendeeData?.network_group) attendeeObj.network_group = attendeeData?.network_group;

        if (attendeeData?.SPOKEN_LANGUAGE) attendeeObj.SPOKEN_LANGUAGE = attendeeData?.SPOKEN_LANGUAGE;

        if (attendeeData?.industry) attendeeObj.industry = attendeeData?.industry;

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

            <Box mb="4" w="100%" bg="primary.darkbox" px="6" py="1" roundedTop="md">
                <Text fontSize="16px" fontWeight={500}>General information</Text>
            </Box>

            {settings?.map((setting: Setting, index: number) => (
                <VStack alignItems={"center"} w="100%" key={index}>
                    {setting?.name === 'initial' && (
                        <HStack mb="3" alignItems={["flex-start", "center"]} px="6" flexDirection={['column', 'row']} w="100%">
                            <Center alignItems="flex-start" pb={[2, 0]} w={["100%", "225px"]}>
                                <Text isTruncated fontWeight="500" fontSize="16px">{labels?.initial}</Text>
                            </Center>
                            <Center justifyContent={'flex-start'} justifyItems={'flex-start'} alignItems={'flex-start'} w={['100%', 'calc(100% - 225px)']}>
                                <Input w="100%"
                                    h={'50px'}
                                    placeholder={labels?.initial}
                                    isReadOnly={setting.is_editable === 1 && event?.attendee_settings?.create_profile == 1 && event?.attendee_settings?.create_profile == 1 ? false : true}
                                    opacity={setting.is_editable === 1 && event?.attendee_settings?.create_profile == 1 ? '1' : '0.5'}
                                    onChangeText={(answer) => {
                                        updateAttendeeInfoFeild('initial', answer);
                                    }}
                                    value={attendeeData?.info?.initial}
                                />
                            </Center>
                        </HStack>
                    )}
                    {/* {setting?.name === 'password' && setting.is_editable === 1 && event?.attendee_settings?.create_profile == 1 && event?.attendee_settings?.create_profile == 1 && (
                        <HStack mb="3" alignItems={["flex-start", "center"]} px="6" flexDirection={['column', 'row']} w="100%">
                            <Center alignItems="flex-start" pb={[2, 0]} w={["100%", "225px"]}>
                                <Text isTruncated fontWeight="500" fontSize="16px">{labels?.password}</Text>
                            </Center>
                            <Center justifyContent={'flex-start'} justifyItems={'flex-start'} alignItems={'flex-start'} w={['100%', 'calc(100% - 225px)']}>
                                <Input w="100%"
                                    h={'50px'}
                                    placeholder={'********'}
                                    type='password'
                                    isReadOnly={setting.is_editable === 1 && event?.attendee_settings?.create_profile == 1 ? false : true}
                                    opacity={setting.is_editable === 1 && event?.attendee_settings?.create_profile == 1 ? '1' : '0.5'}
                                    onChangeText={(answer) => {
                                        updateAttendeeFeild('password', answer);
                                    }}
                                />
                            </Center>
                        </HStack>
                    )} */}
                    {setting?.name === 'first_name' && (
                        <HStack mb="3" alignItems={["flex-start", "center"]} px="6" flexDirection={['column', 'row']} w="100%">
                            <Center alignItems="flex-start" pb={[2, 0]} w={["100%", "225px"]}>
                                <Text isTruncated fontWeight="500" fontSize="16px">{labels?.first_name}</Text>
                            </Center>
                            <Center justifyContent={'flex-start'} justifyItems={'flex-start'} alignItems={'flex-start'} w={['100%', 'calc(100% - 225px)']}>
                                <Input w="100%"
                                    h={'50px'}
                                    placeholder={labels?.first_name}
                                    isReadOnly={setting.is_editable === 1 && event?.attendee_settings?.create_profile == 1 ? false : true}
                                    opacity={setting.is_editable === 1 && event?.attendee_settings?.create_profile == 1 ? '1' : '0.5'}
                                    onChangeText={(answer) => {
                                        updateAttendeeFeild('first_name', answer);
                                    }}
                                    value={attendeeData?.first_name}
                                />
                            </Center>
                        </HStack>
                    )}
                    {setting?.name === 'last_name' && (
                        <HStack mb="3" alignItems={["flex-start", "center"]} px="6" flexDirection={['column', 'row']} w="100%">
                            <Center alignItems="flex-start" pb={[2, 0]} w={["100%", "225px"]}>
                                <Text isTruncated fontWeight="500" fontSize="16px">{labels?.last_name}</Text>
                            </Center>
                            <Center justifyContent={'flex-start'} justifyItems={'flex-start'} alignItems={'flex-start'} w={['100%', 'calc(100% - 225px)']}>
                                <Input w="100%"
                                    h={'50px'}
                                    placeholder={labels?.last_name}
                                    isReadOnly={setting.is_editable === 1 && event?.attendee_settings?.create_profile == 1 ? false : true}
                                    opacity={setting.is_editable === 1 && event?.attendee_settings?.create_profile == 1 ? '1' : '0.5'}
                                    onChangeText={(answer) => {
                                        updateAttendeeFeild('last_name', answer);
                                    }}
                                    value={attendeeData?.last_name}
                                />
                            </Center>
                        </HStack>
                    )}
                    {setting?.name === 'bio_info' && (
                        <HStack mb="3" alignItems={["flex-start","center"]} px="6" flexDirection={['column', 'row']}  w="100%">
                            <Center alignItems="flex-start" pb={[2,0]} w={["100%","225px"]}>
                                <Text isTruncated fontWeight="500" fontSize="16px">{labels?.about.replace(/<\/?[^>]+(>|$)/g, "")}</Text>
                            </Center>
                            <Center justifyContent={'flex-start'} justifyItems={'flex-start'} alignItems={'flex-start'} w={['100%', 'calc(100% - 225px)']}>
                                {/* <Input w="100%"
                                    h={'50px'}
                                    placeholder={labels?.about}
                                    isReadOnly={setting.is_editable === 1 && event?.attendee_settings?.create_profile == 1 ? false : true}
                                    opacity={setting.is_editable === 1 && event?.attendee_settings?.create_profile == 1 ? '1' : '0.5'}
                                    onChangeText={(answer) => {
                                        updateAttendeeInfoFeild('about', answer);
                                    }}
                                    value={attendeeData?.info?.about.replace(/<\/?[^>]+(>|$)|\&nbsp;|\s+/g, '')
                                }
                                />
                            </Center>
                        </HStack>
                    )}
                    {setting?.name === 'age' && (
                        <HStack mb="3" alignItems={["flex-start", "center"]} px="6" flexDirection={['column', 'row']} w="100%">
                            <Center alignItems="flex-start" pb={[2, 0]} w={["100%", "225px"]}>
                                <Text isTruncated fontWeight="500" fontSize="16px">{labels?.age}</Text>
                            </Center>
                            <Center justifyContent={'flex-start'} justifyItems={'flex-start'} alignItems={'flex-start'} w={['100%', 'calc(100% - 225px)']}>
                                <Input w="100%"
                                    h={'50px'}
                                    placeholder={labels?.age}
                                    isReadOnly={setting.is_editable === 1 && event?.attendee_settings?.create_profile == 1 ? false : true}
                                    opacity={setting.is_editable === 1 && event?.attendee_settings?.create_profile == 1 ? '1' : '0.5'}
                                    onChangeText={(answer) => {
                                        updateAttendeeInfoFeild('age', answer);
                                    }}
                                    value={attendeeData?.info?.age}
                                />
                            </Center>
                        </HStack>
                    )}
                    {setting?.name === 'first_name_passport' && (
                        <HStack mb="3" alignItems={["flex-start", "center"]} px="6" flexDirection={['column', 'row']} w="100%">
                            <Center alignItems="flex-start" pb={[2, 0]} w={["100%", "225px"]}>
                                <Text isTruncated fontWeight="500" fontSize="16px">{labels?.FIRST_NAME_PASSPORT}</Text>
                            </Center>
                            <Center justifyContent={'flex-start'} justifyItems={'flex-start'} alignItems={'flex-start'} w={['100%', 'calc(100% - 225px)']}>
                                <Input w="100%"
                                    h={'50px'}
                                    placeholder={labels?.FIRST_NAME_PASSPORT}
                                    isReadOnly={setting.is_editable === 1 && event?.attendee_settings?.create_profile == 1 ? false : true}
                                    opacity={setting.is_editable === 1 && event?.attendee_settings?.create_profile == 1 ? '1' : '0.5'}
                                    onChangeText={(answer) => {
                                        updateAttendeeFeild('FIRST_NAME_PASSPORT', answer);
                                    }}
                                    value={attendeeData?.FIRST_NAME_PASSPORT}
                                />
                            </Center>
                        </HStack>
                    )}
                    {setting?.name === 'last_name_passport' && (
                        <HStack mb="3" alignItems={["flex-start", "center"]} px="6" flexDirection={['column', 'row']} w="100%">
                            <Center alignItems="flex-start" pb={[2, 0]} w={["100%", "225px"]}>
                                <Text isTruncated fontWeight="500" fontSize="16px">{labels?.LAST_NAME_PASSPORT}</Text>
                            </Center>
                            <Center justifyContent={'flex-start'} justifyItems={'flex-start'} alignItems={'flex-start'} w={['100%', 'calc(100% - 225px)']}>
                                <Input w="100%"
                                    h={'50px'}
                                    placeholder={labels?.LAST_NAME_PASSPORT}
                                    isReadOnly={setting.is_editable === 1 && event?.attendee_settings?.create_profile == 1 ? false : true}
                                    opacity={setting.is_editable === 1 && event?.attendee_settings?.create_profile == 1 ? '1' : '0.5'}
                                    onChangeText={(answer) => {
                                        updateAttendeeFeild('LAST_NAME_PASSPORT', answer);
                                    }}
                                    value={attendeeData?.LAST_NAME_PASSPORT}
                                />
                            </Center>
                        </HStack>
                    )}
                    {setting?.name === 'place_of_birth' && (
                        <HStack mb="3" alignItems={["flex-start", "center"]} px="6" flexDirection={['column', 'row']} w="100%">
                            <Center alignItems="flex-start" pb={[2, 0]} w={["100%", "225px"]}>
                                <Text isTruncated fontWeight="500" fontSize="16px">{labels?.place_of_birth}</Text>
                            </Center>
                            <Center justifyContent={'flex-start'} justifyItems={'flex-start'} alignItems={'flex-start'} w={['100%', 'calc(100% - 225px)']}>
                                <Input w="100%"
                                    h={'50px'}
                                    placeholder={labels?.place_of_birth}
                                    isReadOnly={setting.is_editable === 1 && event?.attendee_settings?.create_profile == 1 ? false : true}
                                    opacity={setting.is_editable === 1 && event?.attendee_settings?.create_profile == 1 ? '1' : '0.5'}
                                    onChangeText={(answer) => {
                                        updateAttendeeInfoFeild('place_of_birth', answer);
                                    }}
                                    value={attendeeData?.info?.place_of_birth}
                                />
                            </Center>
                        </HStack>
                    )}
                    {setting?.name === 'passport_no' && (
                        <HStack mb="3" alignItems={["flex-start", "center"]} px="6" flexDirection={['column', 'row']} w="100%">
                            <Center alignItems="flex-start" pb={[2, 0]} w={["100%", "225px"]}>
                                <Text isTruncated fontWeight="500" fontSize="16px">{labels?.passport_no}</Text>
                            </Center>
                            <Center justifyContent={'flex-start'} justifyItems={'flex-start'} alignItems={'flex-start'} w={['100%', 'calc(100% - 225px)']}>
                                <Input w="100%"
                                    h={'50px'}
                                    placeholder={labels?.passport_no}
                                    isReadOnly={setting.is_editable === 1 && event?.attendee_settings?.create_profile == 1 ? false : true}
                                    opacity={setting.is_editable === 1 && event?.attendee_settings?.create_profile == 1 ? '1' : '0.5'}
                                    onChangeText={(answer) => {
                                        updateAttendeeInfoFeild('passport_no', answer);
                                    }}
                                    value={attendeeData?.info?.passport_no}
                                />
                            </Center>
                        </HStack>
                    )}
                    {setting?.name === 'company_name' && (
                        <HStack mb="3" alignItems={["flex-start", "center"]} px="6" flexDirection={['column', 'row']} w="100%">
                            <Center alignItems="flex-start" pb={[2, 0]} w={["100%", "225px"]}>
                                <Text isTruncated fontWeight="500" fontSize="16px">{labels?.company_name}</Text>
                            </Center>
                            <Center justifyContent={'flex-start'} justifyItems={'flex-start'} alignItems={'flex-start'} w={['100%', 'calc(100% - 225px)']}>
                                <Input w="100%"
                                    h={'50px'}
                                    placeholder={labels?.company_name}
                                    isReadOnly={setting.is_editable === 1 && event?.attendee_settings?.create_profile == 1 ? false : true}
                                    opacity={setting.is_editable === 1 && event?.attendee_settings?.create_profile == 1 ? '1' : '0.5'}
                                    onChangeText={(answer) => {
                                        updateAttendeeInfoFeild('company_name', answer);
                                    }}
                                    value={attendeeData?.info?.company_name}
                                />
                            </Center>
                        </HStack>
                    )}
                    {setting?.name === 'title' && (
                        <HStack mb="3" alignItems={["flex-start", "center"]} px="6" flexDirection={['column', 'row']} w="100%">
                            <Center alignItems="flex-start" pb={[2, 0]} w={["100%", "225px"]}>
                                <Text isTruncated fontWeight="500" fontSize="16px">{labels?.title}</Text>
                            </Center>
                            <Center justifyContent={'flex-start'} justifyItems={'flex-start'} alignItems={'flex-start'} w={['100%', 'calc(100% - 225px)']}>
                                <Input w="100%"
                                    h={'50px'}
                                    placeholder={labels?.title}
                                    isReadOnly={setting.is_editable === 1 && event?.attendee_settings?.create_profile == 1 ? false : true}
                                    opacity={setting.is_editable === 1 && event?.attendee_settings?.create_profile == 1 ? '1' : '0.5'}
                                    onChangeText={(answer) => {
                                        updateAttendeeInfoFeild('title', answer);
                                    }}
                                    value={attendeeData?.info?.title}
                                />
                            </Center>
                        </HStack>
                    )}
                    {setting?.name === 'organization' && (
                        <HStack mb="3" alignItems={["flex-start", "center"]} px="6" flexDirection={['column', 'row']} w="100%">
                            <Center alignItems="flex-start" pb={[2, 0]} w={["100%", "225px"]}>
                                <Text isTruncated fontWeight="500" fontSize="16px">{labels?.organization}</Text>
                            </Center>
                            <Center justifyContent={'flex-start'} justifyItems={'flex-start'} alignItems={'flex-start'} w={['100%', 'calc(100% - 225px)']}>
                                <Input w="100%"
                                    h={'50px'}
                                    placeholder={labels?.organization}
                                    isReadOnly={setting.is_editable === 1 && event?.attendee_settings?.create_profile == 1 ? false : true}
                                    opacity={setting.is_editable === 1 && event?.attendee_settings?.create_profile == 1 ? '1' : '0.5'}
                                    onChangeText={(answer) => {
                                        updateAttendeeInfoFeild('organization', answer);
                                    }}
                                    value={attendeeData?.info?.organization}
                                />
                            </Center>
                        </HStack>
                    )}
                    {setting?.name === 'department' && (
                        <HStack mb="3" alignItems={["flex-start", "center"]} px="6" flexDirection={['column', 'row']} w="100%">
                            <Center alignItems="flex-start" pb={[2, 0]} w={["100%", "225px"]}>
                                <Text isTruncated fontWeight="500" fontSize="16px">{labels?.department}</Text>
                            </Center>
                            <Center justifyContent={'flex-start'} justifyItems={'flex-start'} alignItems={'flex-start'} w={['100%', 'calc(100% - 225px)']}>
                                <Input w="100%"
                                    h={'50px'}
                                    placeholder={labels?.department}
                                    isReadOnly={setting.is_editable === 1 && event?.attendee_settings?.create_profile == 1 ? false : true}
                                    opacity={setting.is_editable === 1 && event?.attendee_settings?.create_profile == 1 ? '1' : '0.5'}
                                    onChangeText={(answer) => {
                                        updateAttendeeInfoFeild('department', answer);
                                    }}
                                    value={attendeeData?.info?.department}
                                />
                            </Center>
                        </HStack>
                    )}
                    {setting?.name === 'show_industry' && (
                        <HStack mb="3" alignItems={["flex-start", "center"]} px="6" flexDirection={['column', 'row']} w="100%">
                            <Center alignItems="flex-start" pb={[2, 0]} w={["100%", "225px"]}>
                                <Text isTruncated fontWeight="500" fontSize="16px">{labels?.industry}</Text>
                            </Center>
                            <Center justifyContent={'flex-start'} justifyItems={'flex-start'} alignItems={'flex-start'} w={['100%', 'calc(100% - 225px)']}>
                                <Input w="100%"
                                    h={'50px'}
                                    placeholder={labels?.industry}
                                    isReadOnly={setting.is_editable === 1 && event?.attendee_settings?.create_profile == 1 ? false : true}
                                    opacity={setting.is_editable === 1 && event?.attendee_settings?.create_profile == 1 ? '1' : '0.5'}
                                    onChangeText={(answer) => {
                                        updateAttendeeInfoFeild('industry', answer);
                                    }}
                                    value={attendeeData?.info?.industry}
                                />
                            </Center>
                        </HStack>
                    )}
                    {setting?.name === 'show_job_tasks' && (
                        <HStack mb="3" alignItems={["flex-start", "center"]} px="6" flexDirection={['column', 'row']} w="100%">
                            <Center alignItems="flex-start" pb={[2, 0]} w={["100%", "225px"]}>
                                <Text isTruncated fontWeight="500" fontSize="16px">{labels?.jobs}</Text>
                            </Center>
                            <Center justifyContent={'flex-start'} justifyItems={'flex-start'} alignItems={'flex-start'} w={['100%', 'calc(100% - 225px)']}>
                                <Input w="100%"
                                    h={'50px'}
                                    placeholder={labels?.jobs}
                                    isReadOnly={setting.is_editable === 1 && event?.attendee_settings?.create_profile == 1 ? false : true}
                                    opacity={setting.is_editable === 1 && event?.attendee_settings?.create_profile == 1 ? '1' : '0.5'}
                                    onChangeText={(answer) => {
                                        updateAttendeeInfoFeild('jobs', answer);
                                    }}
                                    value={attendeeData?.info?.jobs}
                                />
                            </Center>
                        </HStack>
                    )}
                    {setting?.name === 'interest' && (
                        <HStack mb="3" alignItems={["flex-start", "center"]} px="6" flexDirection={['column', 'row']} w="100%">
                            <Center alignItems="flex-start" pb={[2, 0]} w={["100%", "225px"]}>
                                <Text isTruncated fontWeight="500" fontSize="16px">{labels?.interests}</Text>
                            </Center>
                            <Center justifyContent={'flex-start'} justifyItems={'flex-start'} alignItems={'flex-start'} w={['100%', 'calc(100% - 225px)']}>
                                <Input w="100%"
                                    h={'50px'}
                                    placeholder={labels?.interests}
                                    isReadOnly={setting.is_editable === 1 && event?.attendee_settings?.create_profile == 1 ? false : true}
                                    opacity={setting.is_editable === 1 && event?.attendee_settings?.create_profile == 1 ? '1' : '0.5'}
                                    onChangeText={(answer) => {
                                        updateAttendeeInfoFeild('interests', answer);
                                    }}
                                    value={attendeeData?.info?.interests}
                                />
                            </Center>
                        </HStack>
                    )}
                    {setting?.name === 'network_group' && (
                        <HStack mb="3" alignItems={["flex-start", "center"]} px="6" flexDirection={['column', 'row']} w="100%">
                            <Center alignItems="flex-start" pb={[2, 0]} w={["100%", "225px"]}>
                                <Text isTruncated fontWeight="500" fontSize="16px">{labels?.network_group}</Text>
                            </Center>
                            <Center justifyContent={'flex-start'} justifyItems={'flex-start'} alignItems={'flex-start'} w={['100%', 'calc(100% - 225px)']}>
                                <Input w="100%"
                                    h={'50px'}
                                    placeholder={labels?.network_group}
                                    isReadOnly={setting.is_editable === 1 && event?.attendee_settings?.create_profile == 1 ? false : true}
                                    opacity={setting.is_editable === 1 && event?.attendee_settings?.create_profile == 1 ? '1' : '0.5'}
                                    onChangeText={(answer) => {
                                        updateAttendeeInfoFeild('network_group', answer);
                                    }}
                                    value={attendeeData?.info?.network_group}
                                />
                            </Center>
                        </HStack>
                    )}
                    {setting?.name === 'delegate_number' && (
                        <HStack mb="3" alignItems={["flex-start", "center"]} px="6" flexDirection={['column', 'row']} w="100%">
                            <Center alignItems="flex-start" pb={[2, 0]} w={["100%", "225px"]}>
                                <Text isTruncated fontWeight="500" fontSize="16px">{labels?.delegate}</Text>
                            </Center>
                            <Center justifyContent={'flex-start'} justifyItems={'flex-start'} alignItems={'flex-start'} w={['100%', 'calc(100% - 225px)']}

                            >
                                <Input w="100%"
                                    h={'50px'}
                                    placeholder={labels?.delegate}
                                    isReadOnly={setting.is_editable === 1 && event?.attendee_settings?.create_profile == 1 ? false : true}
                                    opacity={setting.is_editable === 1 && event?.attendee_settings?.create_profile == 1 ? '1' : '0.5'}
                                    onChangeText={(answer) => {
                                        updateAttendeeInfoFeild('delegate_number', answer);
                                    }}
                                    value={attendeeData?.info?.delegate_number}
                                />
                            </Center>
                        </HStack>
                    )}
                    {setting?.name === 'table_number' && (
                        <HStack mb="3" alignItems={["flex-start", "center"]} px="6" flexDirection={['column', 'row']} w="100%">
                            <Center alignItems="flex-start" pb={[2, 0]} w={["100%", "225px"]}>
                                <Text isTruncated fontWeight="500" fontSize="16px">{labels?.table_number}</Text>
                            </Center>
                            <Center justifyContent={'flex-start'} justifyItems={'flex-start'} alignItems={'flex-start'} w={['100%', 'calc(100% - 225px)']}>
                                <Input w="100%"
                                    h={'50px'}
                                    placeholder={labels?.table_number}
                                    isReadOnly={setting.is_editable === 1 && event?.attendee_settings?.create_profile == 1 ? false : true}
                                    opacity={setting.is_editable === 1 && event?.attendee_settings?.create_profile == 1 ? '1' : '0.5'}
                                    onChangeText={(answer) => {
                                        updateAttendeeInfoFeild('table_number', answer);
                                    }}
                                    value={attendeeData?.info?.table_number}
                                />
                            </Center>
                        </HStack>
                    )}
                    {setting?.name === 'pa_street' && (
                        <HStack mb="3" alignItems={["flex-start", "center"]} px="6" flexDirection={['column', 'row']} w="100%">
                            <Center alignItems="flex-start" pb={[2, 0]} w={["100%", "225px"]}>
                                <Text isTruncated fontWeight="500" fontSize="16px">{labels?.private_street}</Text>
                            </Center>
                            <Center justifyContent={'flex-start'} justifyItems={'flex-start'} alignItems={'flex-start'} w={['100%', 'calc(100% - 225px)']}>
                                <Input w="100%"
                                    h={'50px'}
                                    placeholder={labels?.private_street}
                                    isReadOnly={setting.is_editable === 1 && event?.attendee_settings?.create_profile == 1 ? false : true}
                                    opacity={setting.is_editable === 1 && event?.attendee_settings?.create_profile == 1 ? '1' : '0.5'}
                                    onChangeText={(answer) => {
                                        updateAttendeeInfoFeild('private_street', answer);
                                    }}
                                    value={attendeeData?.info?.private_street}
                                />
                            </Center>
                        </HStack>
                    )}
                    {setting?.name === 'pa_house_no' && (
                        <HStack mb="3" alignItems={["flex-start", "center"]} px="6" flexDirection={['column', 'row']} w="100%">
                            <Center alignItems="flex-start" pb={[2, 0]} w={["100%", "225px"]}>
                                <Text isTruncated fontWeight="500" fontSize="16px">{labels?.private_house_number}</Text>
                            </Center>
                            <Center justifyContent={'flex-start'} justifyItems={'flex-start'} alignItems={'flex-start'} w={['100%', 'calc(100% - 225px)']}>
                                <Input w="100%"
                                    h={'50px'}
                                    placeholder={labels?.private_house_number}
                                    isReadOnly={setting.is_editable === 1 && event?.attendee_settings?.create_profile == 1 ? false : true}
                                    opacity={setting.is_editable === 1 && event?.attendee_settings?.create_profile == 1 ? '1' : '0.5'}
                                    onChangeText={(answer) => {
                                        updateAttendeeInfoFeild('private_house_number', answer);
                                    }}
                                    value={attendeeData?.info?.private_house_number}
                                />
                            </Center>
                        </HStack>
                    )}
                    {setting?.name === 'pa_post_code' && (
                        <HStack mb="3" alignItems={["flex-start", "center"]} px="6" flexDirection={['column', 'row']} w="100%">
                            <Center alignItems="flex-start" pb={[2, 0]} w={["100%", "225px"]}>
                                <Text isTruncated fontWeight="500" fontSize="16px">{labels?.private_post_code}</Text>
                            </Center>
                            <Center justifyContent={'flex-start'} justifyItems={'flex-start'} alignItems={'flex-start'} w={['100%', 'calc(100% - 225px)']}>
                                <Input w="100%"
                                    h={'50px'}
                                    placeholder={labels?.private_post_code}
                                    isReadOnly={setting.is_editable === 1 && event?.attendee_settings?.create_profile == 1 ? false : true}
                                    opacity={setting.is_editable === 1 && event?.attendee_settings?.create_profile == 1 ? '1' : '0.5'}
                                    onChangeText={(answer) => {
                                        updateAttendeeInfoFeild('private_post_code', answer);
                                    }}
                                    value={attendeeData?.info?.private_post_code}
                                />
                            </Center>
                        </HStack>
                    )}
                    {setting?.name === 'pa_city' && (
                        <HStack mb="3" alignItems={["flex-start", "center"]} px="6" flexDirection={['column', 'row']} w="100%">
                            <Center alignItems="flex-start" pb={[2, 0]} w={["100%", "225px"]}>
                                <Text isTruncated fontWeight="500" fontSize="16px">{labels?.private_city}</Text>
                            </Center>
                            <Center justifyContent={'flex-start'} justifyItems={'flex-start'} alignItems={'flex-start'} w={['100%', 'calc(100% - 225px)']}>
                                <Input w="100%"
                                    h={'50px'}
                                    placeholder={labels?.private_city}
                                    isReadOnly={setting.is_editable === 1 && event?.attendee_settings?.create_profile == 1 ? false : true}
                                    opacity={setting.is_editable === 1 && event?.attendee_settings?.create_profile == 1 ? '1' : '0.5'}
                                    onChangeText={(answer) => {
                                        updateAttendeeInfoFeild('private_city', answer);
                                    }}
                                    value={attendeeData?.info?.private_city}
                                />
                            </Center>
                        </HStack>
                    )}
                    {setting?.name === 'pa_country' && (
                        <HStack mb="3" alignItems={["flex-start", "center"]} px="6" flexDirection={['column', 'row']} w="100%">
                            <Center alignItems="flex-start" pb={[2, 0]} w={["100%", "225px"]}>
                                <Text isTruncated fontWeight="500" fontSize="16px">{labels?.private_country}</Text>
                            </Center>
                            <Center justifyContent={'flex-start'} justifyItems={'flex-start'} alignItems={'flex-start'} w={['100%', 'calc(100% - 225px)']}>
                                <View w={'100%'}>
                                    <Select
                                        placeholder="Please Select"
                                        minWidth="64"
                                        h="50px"
                                        isDisabled={(setting.is_editable === 1 && event?.attendee_settings?.create_profile == 1) ? false : true}
                                        opacity={setting.is_editable === 1 && event?.attendee_settings?.create_profile == 1 ? '1' : '0.5'}
                                        selectedValue={attendeeData?.info?.private_country}
                                        onValueChange={answer => updateInfoSelect({ answer, name: "private_country" })}
                                    >
                                        {countries.map((answer, key) => (<Select.Item key={key} label={answer.name} value={`${answer.id}`} />))}
                                    </Select>
                                </View>

                            </Center>
                        </HStack>
                    )}
                    {setting?.name === 'email' && (
                        <HStack mb="3" alignItems={["flex-start", "center"]} px="6" flexDirection={['column', 'row']} w="100%">
                            <Center alignItems="flex-start" pb={[2, 0]} w={["100%", "225px"]}>
                                <Text isTruncated fontWeight="500" fontSize="16px">{labels?.email}</Text>
                            </Center>
                            <Center justifyContent={'flex-start'} justifyItems={'flex-start'} alignItems={'flex-start'} w={['100%', 'calc(100% - 225px)']}>
                                <Input w="100%"
                                    h={'50px'}
                                    placeholder={labels?.email}
                                    isReadOnly={true}
                                    opacity={'0.5'}
                                    onChangeText={(answer) => {
                                        updateAttendeeFeild('email', answer);
                                    }}
                                    value={attendeeData?.email}
                                />
                            </Center>
                        </HStack>
                    )}
                    {setting?.name === 'gender' && (
                        <HStack mb="3" alignItems={["flex-start", "center"]} px="6" flexDirection={['column', 'row']} w="100%">
                            <Center alignItems="flex-start" pb={[2, 0]} w={["100%", "225px"]}>
                                <Text isTruncated fontWeight="500" fontSize="16px">{labels?.gender}</Text>
                            </Center>
                            <Center justifyContent={'flex-start'} justifyItems={'flex-start'} alignItems={'flex-start'} w={['100%', 'calc(100% - 225px)']}>

                                <Radio.Group space="5" value={gender} name="MyRadioGroup" onChange={(gender) => { setGender(gender); }}>
                                    <HStack space="3" alignItems="center">
                                        <Radio
                                            isDisabled={(setting.is_editable === 1 && event?.attendee_settings?.create_profile == 1) ? false : true}
                                            value={'male'}
                                            opacity={setting.is_editable === 1 && event?.attendee_settings?.create_profile == 1 ? '1' : '0.5'}> Male </Radio>
                                        <Radio
                                            isDisabled={(setting.is_editable === 1 && event?.attendee_settings?.create_profile == 1) ? false : true}
                                            value={'female'}
                                            opacity={setting.is_editable === 1 && event?.attendee_settings?.create_profile == 1 ? '1' : '0.5'}> Female </Radio>
                                        <Radio
                                            isDisabled={(setting.is_editable === 1 && event?.attendee_settings?.create_profile == 1) ? false : true}
                                            value={'n/a'}
                                            opacity={setting.is_editable === 1 && event?.attendee_settings?.create_profile == 1 ? '1' : '0.5'}> N/A </Radio>
                                    </HStack>

                                </Radio.Group>
                            </Center>
                        </HStack>
                    )}
                    {setting?.name === 'birth_date' && (
                        <HStack mb="3" alignItems={["flex-start", "center"]} px="6" flexDirection={['column', 'row']} w="100%">
                            <Center alignItems="flex-start" pb={[2, 0]} w={["100%", "225px"]}>
                                <Text isTruncated fontWeight="500" fontSize="16px">{labels?.BIRTHDAY_YEAR}</Text>
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
                        <HStack mb="3" alignItems={["flex-start", "center"]} px="6" flexDirection={['column', 'row']} w="100%">
                            <Center alignItems="flex-start" pb={[2, 0]} w={["100%", "225px"]}>
                                <Text isTruncated fontWeight="500" fontSize="16px">{labels?.date_of_issue_passport}</Text>
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
                        <HStack mb="3" alignItems={["flex-start", "center"]} px="6" flexDirection={['column', 'row']} w="100%">
                            <Center alignItems="flex-start" pb={[2, 0]} w={["100%", "225px"]}>
                                <Text isTruncated fontWeight="500" fontSize="16px">{labels?.date_of_expiry_passport}</Text>
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
                        <HStack mb="3" alignItems={["flex-start", "center"]} px="6" flexDirection={['column', 'row']} w="100%">
                            <Center alignItems="flex-start" pb={[2, 0]} w={["100%", "225px"]}>
                                <Text isTruncated fontWeight="500" fontSize="16px">{labels?.EMPLOYMENT_DATE}</Text>
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
                        <HStack mb="3" alignItems={["flex-start", "center"]} px="6" flexDirection={['column', 'row']} w="100%">
                            <Center alignItems="flex-start" pb={[2, 0]} w={["100%", "225px"]}>
                                <Text isTruncated fontWeight="500" fontSize="16px">{labels?.country}</Text>
                            </Center>
                            <Center justifyContent={'flex-start'} justifyItems={'flex-start'} alignItems={'flex-start'} w={['100%', 'calc(100% - 225px)']}>
                                <View w={'100%'}>
                                    <Select
                                        placeholder="Please Select"
                                        minWidth="64"
                                        w="100%"
                                        h="50px"
                                        isDisabled={setting.is_editable === 1 ? false : true}
                                        opacity={setting.is_editable === 1 && event?.attendee_settings?.create_profile == 1 ? '1' : '0.5'}
                                        selectedValue={attendeeData?.info?.country}
                                        onValueChange={answer => updateInfoSelect({ answer, name: "country" })}
                                    >
                                        {countries.map((answer, key) => (<Select.Item key={key} label={answer.name} value={`${answer.id}`} />))}
                                    </Select>
                                </View>
                            </Center>
                        </HStack>
                    )}
                    {setting?.name === 'spoken_languages' && (
                        <HStack mb="3" alignItems={["flex-start", "center"]} px="6" flexDirection={['column', 'row']} w="100%">
                            <Center alignItems="flex-start" pb={[2, 0]} w={["100%", "225px"]}>
                                <Text isTruncated fontWeight="500" fontSize="16px">{labels?.SPOKEN_LANGUAGE}</Text>
                            </Center>
                            <Center justifyContent={'flex-start'} justifyItems={'flex-start'} alignItems={'flex-start'} w={['100%', 'calc(100% - 225px)']}>
                                <DropDown
                                    label={labels?.SPOKEN_LANGUAGE}
                                    listitems={languages}
                                    required={false}
                                    opacity={setting.is_editable === 1 && event?.attendee_settings?.create_profile == 1 ? '1' : '0.5'}
                                    isDisabled={setting.is_editable === 1 ? false : true}
                                    isMulti={true}
                                    selected={(attendeeData?.SPOKEN_LANGUAGE && typeof attendeeData.SPOKEN_LANGUAGE === 'string' ? attendeeData.SPOKEN_LANGUAGE.split(",").map((lang: string) => ({ 'label': lang.trim(), 'value': lang.trim() })) : [])}
                                    onChange={(item: any) => {
                                        updateSelect({ item, name: "SPOKEN_LANGUAGE" });
                                    }}
                                />
                            </Center>
                        </HStack>
                    )}

                    {setting?.name === 'show_custom_field' && (
                        customFields.map((question, i) => (
                            <HStack mb="3" key={i} alignItems="flex-start" px="6" flexDirection={['column', 'row']} zIndex={100 - i} w="100%">
                                <Center alignItems="flex-start" pb={[2, 0]} w={["100%", "225px"]}>
                                    <Text isTruncated fontWeight="500" fontSize="16px">{question?.name}</Text>
                                </Center>
                                <Center justifyContent={'flex-start'} justifyItems={'flex-start'} alignItems={'flex-start'} w={['100%', 'calc(100% - 225px)']}>
                                    <ReactSelect
                                        styles={Selectstyles2}
                                        isDisabled={(setting.is_editable === 1 && event?.attendee_settings?.create_profile == 1) ? false : true}
                                        placeholder={question.name}
                                        components={{ IndicatorSeparator: null }}
                                        options={question.children_recursive.map((item: any, index: number) => {
                                            return {
                                                label: item.name,
                                                value: item.id,
                                                key: index,
                                            };
                                        })}
                                        value={customFieldData[`custom_field_id_q${i}`] !== undefined ? customFieldData[`custom_field_id_q${i}`] : null}
                                        isMulti={question.allow_multiple === 1 ? true : false}
                                        onChange={(item: any) => {
                                            console.log(item);
                                            updateCustomFieldSelect({ item, name: `custom_field_id_q${i}` });
                                        }}
                                    />
                                </Center>
                            </HStack>
                        ))
                    )}
                    {setting?.name === 'phone' && (
                        <HStack mb="3" alignItems={["flex-start", "center"]} px="6" flexDirection={['column', 'row']} w="100%">
                            <Center alignItems="flex-start" pb={[2, 0]} w={["100%", "225px"]}>
                                <Text isTruncated fontWeight="500" fontSize="16px">{labels?.phone}</Text>
                            </Center>
                            <Center alignItems="flex-start" w={['100%', 'calc(100% - 225px)']}>
                                <HStack w="100%">
                                    <Center w="100px">
                                        <Select
                                            placeholder="Please Select"
                                            w={'100%'}
                                            h="50px"
                                            isDisabled={setting?.is_editable === 1 ? false : true}
                                            opacity={setting.is_editable === 1 && event?.attendee_settings?.create_profile == 1 ? '1' : '0.5'}
                                            selectedValue={attendeeData?.info?.callingCode}
                                            onValueChange={answer => updateInfoSelect({ answer, name: "callingCode" })}>
                                            {callingCodes.map((answer, key) => (<Select.Item key={key} label={answer.name} value={`${answer.id}`} />))}
                                        </Select>
                                    </Center>
                                    <Center pl="2" w="calc(100% - 100px)">
                                        <Input w="100%"
                                            h={'50px'}
                                            placeholder={labels?.phone}
                                            isReadOnly={setting.is_editable === 1 && event?.attendee_settings?.create_profile == 1 ? false : true}
                                            opacity={setting.is_editable === 1 && event?.attendee_settings?.create_profile == 1 ? '1' : '0.5'}
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
                        <HStack mb="3" alignItems="start" flexDirection={['column', 'row']} px="6" w="100%" >

                            <HStack mb="0" alignItems="start" flexDirection={['column', 'row']} w="100%" >
                                <Center alignItems="flex-start" pb={[2, 0]} w={["100%", "225px"]}>
                                    <Text isTruncated fontWeight="500" fontSize="16px">Profile picture</Text>
                                </Center>
                                <Center alignItems="flex-start" w={['100%', 'calc(100% - 225px)']}>
                                    <HStack w="100%">
                                        <VStack w={'100%'} space={2}>
                                            <Center w="150px">
                                                {((attendeeData && attendeeData?.image && attendeeData?.image !== "") || attendeeData?.blob_image !== undefined) ?
                                                    <LoadImage path={attendeeData?.blob_image !== undefined ? attendeeData?.blob_image : `${_env.eventcenter_base_url}/assets/attendees/${attendeeData?.image}`} w="150px" />
                                                    : <LoadImage path={`https://via.placeholder.com/155.png`} w="150px" />}
                                            </Center>
                                            <Button w={180} px={4} py={3} leftIcon={<Icon as={AntDesign} color={'primary.text'} name="upload" size="lg" />} isDisabled={(setting.is_editable === 1 && event?.attendee_settings?.create_profile == 1) ? false : true} onPress={() => {
                                                if (inputFileRef.current) {
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
                                                style={{ display: 'none' }}
                                                accept="image/*"
                                                placeholder={labels?.phone}
                                                readOnly={setting.is_editable === 1 && event?.attendee_settings?.create_profile == 1 ? false : true}
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
                        <HStack mb="3" alignItems="start" px="3" w="100%" >

                            <HStack mb="3" alignItems="start" flexDirection={['column', 'row']} w="100%" >
                                <Center alignItems="flex-start" width={'225px'} pb={[2, 0]} maxW={["100%", "225px"]}>
                                    <Text isTruncated fontWeight="500" fontSize="16px">Resume</Text>
                                </Center>
                                <Center alignItems="flex-start" w={['100%', 'calc(100% - 225px)']}>
                                    <HStack w="100%">
                                        <VStack w={'100%'} space={2}>
                                            <Center mb={3} w="150px">
                                                {typeof attendee.attendee_cv == 'string' ?
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
                                                {typeof attendeeData.attendee_cv === 'object' ? attendeeData.attendee_cv.name :
                                                    attendee.attendee_cv === 'string' ? <Text fontSize="md">{attendee.attendee_cv}</Text> :
                                                        <Text fontSize="md">{attendeeData.attendee_cv}</Text>}


                                            </Center>

                                            <Button w={180} px={4} py={3} leftIcon={<Icon as={AntDesign} color={'primary.text'} name="upload" size="lg" />}
                                                isDisabled={(setting.is_editable === 1 && event?.attendee_settings?.create_profile == 1) ? false : true}
                                                onPress={() => {
                                                    if (inputresumeFileRef.current) {
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
                                                style={{ display: 'none' }}
                                                accept="application/pdf"
                                                placeholder={labels?.phone}
                                                readOnly={setting.is_editable === 1 && event?.attendee_settings?.create_profile == 1 ? false : true}
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
                    {setting?.name === 'website' && <HStack pb={3} borderBottomWidth={1} borderBottomColor={'primary.bordercolor'} mb="3" alignItems={["flex-start", "center"]} px="6" w="100%">
                        <Center w="42" h="42" rounded={6} mr={3} alignItems={["center"]} bg={'primary.darkbox'}>
                            <Icon color={'primary.text'} as={AntDesign} name="link" size={'lg'} />
                        </Center>
                        <Center justifyContent={'flex-start'} justifyItems={'flex-start'} alignItems={'flex-start'} w="calc(100% - 60px)">
                            <Input w="100%"
                                placeholder={"Website"}
                                isReadOnly={setting.is_editable === 1 && event?.attendee_settings?.create_profile == 1 ? false : true}
                                opacity={setting.is_editable === 1 && event?.attendee_settings?.create_profile == 1 ? '1' : '0.5'}
                                bg={'transparent'}
                                borderWidth={0}
                                onChangeText={(answer) => {
                                    updateAttendeeInfoFeild('website', answer);
                                }}
                                value={attendeeData?.info?.website}
                            />
                        </Center>
                    </HStack>}
                    {setting?.name === 'facebook' && <HStack pb={3} borderBottomWidth={1} borderBottomColor={'primary.bordercolor'} mb="3" alignItems={["flex-start", "center"]} px="6" w="100%">
                        <Center w="42" h="42" rounded={6} mr={3} alignItems={["center"]} bg={'primary.darkbox'}>
                            <Icon as={Ionicons} color={'primary.text'} name="logo-facebook" size={'lg'} />
                        </Center>
                        <Center justifyContent={'flex-start'} justifyItems={'flex-start'} alignItems={'flex-start'} w="calc(100% - 60px)">
                            <Input w="100%"
                                placeholder={"Facebook"}
                                isReadOnly={setting.is_editable === 1 && event?.attendee_settings?.create_profile == 1 ? false : true}
                                opacity={setting.is_editable === 1 && event?.attendee_settings?.create_profile == 1 ? '1' : '0.5'}
                                bg={'transparent'}
                                borderWidth={0}
                                onChangeText={(answer) => {
                                    updateAttendeeInfoFeild('facebook', answer);
                                }}
                                value={attendeeData?.info?.facebook}
                            />
                        </Center>
                    </HStack>}
                    {setting?.name === 'twitter' && <HStack pb={3} borderBottomWidth={1} borderBottomColor={'primary.bordercolor'} mb="3" alignItems={["flex-start", "center"]} px="6" w="100%">
                        <Center w="42" h="42" rounded={6} mr={3} alignItems={["center"]} bg={'primary.darkbox'}>
                            <IcoTwitterXsm width={20} height={20} />
                        </Center>
                        <Center justifyContent={'flex-start'} justifyItems={'flex-start'} alignItems={'flex-start'} w="calc(100% - 60px)">
                            <Input w="100%"
                                placeholder={"Twitter"}
                                isReadOnly={setting.is_editable === 1 && event?.attendee_settings?.create_profile == 1 ? false : true}
                                opacity={setting.is_editable === 1 && event?.attendee_settings?.create_profile == 1 ? '1' : '0.5'}
                                bg={'transparent'}
                                borderWidth={0}
                                onChangeText={(answer) => {
                                    updateAttendeeInfoFeild('twitter', answer);
                                }}
                                value={attendeeData?.info?.twitter}
                            />
                        </Center>
                    </HStack>}
                    {setting?.name === 'linkedin' && <HStack pb={3} borderBottomWidth={1} borderBottomColor={'primary.bordercolor'} mb="3" alignItems={["flex-start", "center"]} px="6" w="100%">
                        <Center w="42" h="42" rounded={6} mr={3} alignItems={["center"]} bg={'primary.darkbox'}>
                            <Icon as={Ionicons} color={'primary.text'} name="logo-linkedin" size={'lg'} />
                        </Center>
                        <Center justifyContent={'flex-start'} justifyItems={'flex-start'} alignItems={'flex-start'} w="calc(100% - 60px)">
                            <Input w="100%"
                                placeholder={"LinkedIn"}
                                isReadOnly={setting.is_editable === 1 && event?.attendee_settings?.create_profile == 1 ? false : true}
                                opacity={setting.is_editable === 1 && event?.attendee_settings?.create_profile == 1 ? '1' : '0.5'}
                                bg={'transparent'}
                                borderWidth={0}
                                onChangeText={(answer) => {
                                    updateAttendeeInfoFeild('linkedin', answer);
                                }}
                                value={attendeeData?.info?.linkedin}
                            />
                        </Center>
                    </HStack>}
                </VStack>
            ))}

            {event?.gdpr_settings?.enable_gdpr === 1 &&
                <HStack mb="3" mt="3" alignItems={["flex-start", "center"]} px="6" flexDirection={['column', 'row']} w="100%">
                <HStack alignItems={'center'} w={['100%', 'calc(100% - 225px)']}>
                    <Checkbox colorScheme={'secondary'} isDisabled={event?.attendee_settings?.create_profile == 1 ? false : true} defaultIsChecked={attendee?.current_event_attendee?.gdpr === 1 ? true : false} value='gdpr' onChange={(isSelected) => {
                        updateAttendeeFeild('gdpr', isSelected);
                    }} size="md"></Checkbox>
                    <Text color={'primary.text'} ml={4}>{event?.gdpr?.inline_text}</Text>
                    <Pressable onPress={() => {openModal(event?.gdpr?.subject, event?.gdpr?.description)}}>
                        <Text underline color={'primary.text'}>{event?.gdpr?.link}</Text>
                    </Pressable>
                </HStack>
            </HStack>}
            {event?.attendee_settings?.enable_foods === 1 &&
                <HStack mb="3" mt="3" alignItems={["flex-start", "center"]} px="6" flexDirection={['column', 'row']} w="100%">
                     <HStack alignItems={'center'} w={['100%', 'calc(100% - 225px)']}>
                        <Checkbox colorScheme={'secondary'} isDisabled={event?.attendee_settings?.create_profile == 1 ? false : true} defaultIsChecked={attendee?.current_event_attendee?.accept_foods_allergies === 1 ? true : false} value='gdpr' onChange={(isSelected) => {
                            updateAttendeeFeild('accept_foods_allergies', isSelected);
                        }} size="md"></Checkbox>
                        <Text color={'primary.text'} ml={4}>{event?.food_disclaimer?.inline_text}</Text>
                    <Pressable onPress={() => {openModal(event?.food_disclaimer?.subject, event?.food_disclaimer?.description)}}>
                        <Text underline color={'primary.text'}>{event?.food_disclaimer?.link}</Text>
                    </Pressable>
                    </HStack>
                </HStack>
            }
            <HStack mb="3" alignItems={["flex-start", "center"]} px="6" flexDirection={['column', 'row']} w="100%">
                <Button
                    minW={225}
                    py="2"
                    px="5"
                    mx={'auto'}
                    shadow={3}
                    colorScheme="primary"
                    isLoading={updatingAttendee}
                    onPress={() => {
                        updateAttendeeData();
                    }}
                >
                    <Text fontSize="2xl" fontWeight={600}>SAVE</Text>
                </Button>
            </HStack>
						{success_message && <Box width={'100%'} px={3} py={3}><HStack m={'auto'}  p={3} rounded={5} bg={'success.500'} space="3" w={'320px'} alignItems="center">
								<Text fontSize="md">profile updated successfully</Text>
								<Spacer />
								<IconButton
									variant="unstyled"
									p={2}
									rounded={'full'}
									icon={<Icon size="md" as={AntDesign} name="close" color="white" />}
									onPress={()=>{
									UpdateSuccess(false)
									}}
									
								/>
								
								
						</HStack></Box>}
						
        </Container>
    )
}
