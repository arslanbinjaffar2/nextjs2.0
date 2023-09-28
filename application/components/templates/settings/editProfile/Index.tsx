import React from 'react'

import { Text, Container, Box, Divider, Input, Checkbox, Radio, Select, Button } from 'native-base';
import WebLoading from 'application/components/atoms/WebLoading';
import UseEditProfileService from 'application/store/services/UseEditProfileService'
import UseLoadingService from 'application/store/services/UseLoadingService';
import { Attendee, Attendeefeildsettings, CallingCode, Country, Labels, Language, Setting } from 'application/models/settings/EditProfile';
import UseEventService from 'application/store/services/UseEventService';
import { Event } from 'application/models/Event';
import DateTimePicker from 'application/components/atoms/DateTimePicker';
import moment from 'moment';
import IcoLongArrow from 'application/assets/icons/IcoLongArrow';
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
     attendee:Attendee ,
     languages:Language[], 
     callingCodes:CallingCode[], 
     countries:Country[], 
     settings:Setting[], 
     labels:Labels | null, 
     customFields:any[]
     event:Event
     attendee_feild_settings:Attendeefeildsettings|null
     updatingAttendee:boolean,
     updateAttendee:(data:any)=>void
};


const EditProfileFrom = ({ attendee, languages, callingCodes, countries, settings, labels,  customFields, event, attendee_feild_settings, updateAttendee, updatingAttendee }:formProps) => {
    const [attendeeData, setAttendeeData] = React.useState(attendee)

    React.useEffect(() => {
        setAttendeeData({
          ...attendeeData,
          phone: attendeeData?.phone && attendeeData.phone.split("-")[1],
          callingCode : attendeeData?.phone && attendeeData.phone.split("-")[0]
        });
      }, []);

    const updateAttendeeFeild = (name:string, value:any) => {
        setAttendeeData({
          ...attendeeData,
          [name]: value,
        });
      };

    const updateAttendeeInfoFeild = (name:string, value:any) => {
        setAttendeeData({
          ...attendeeData,
          info: {
            ...attendeeData?.info,
            [name]: value,
          },
        });
    };

    const updateDate = (obj:any) => {
        setAttendeeData({
          ...attendeeData,
          [obj.name]: (typeof obj.item === 'object' && obj.item !== null) ? obj.item.format("YYYY-MM-DD") : obj.item,
        });
      };
    
      const updateInfoDate = (obj:any) => {
        setAttendeeData({
          ...attendeeData,
          info: {
            ...attendeeData.info,
            [obj.name]: (typeof obj.item === 'object' && obj.item !== null) ? obj.item.format("YYYY-MM-DD") : obj.item,
          },
        });
    
      };
    
      const updateSelect = (obj:any) => {
        setAttendeeData({
          ...attendeeData,
          [obj.name]: obj.item,
        });
      };
    
      const updateInfoSelect = (obj:any) => {
        setAttendeeData({
          ...attendeeData,
          info: {
            ...attendeeData.info,
            [obj.name]: obj.item,
          },
        });
      };
      
      const updateAttendeeData = () => {    
        let attendeeObj:any = {
          phone: `${attendeeData?.callingCode}-${attendeeData?.phone}`,
        };
    
        let infoObj = {
            ...attendeeData.info,
        }
    
        let settings = {
          gdpr: attendeeData.gdpr
        }
    
    
        if (attendeeData.email) attendeeObj.email = attendeeData.email;
        if (attendeeData.first_name) attendeeObj.first_name = attendeeData.first_name;
        if (attendeeData.last_name) attendeeObj.last_name = attendeeData.last_name;
        if (attendeeData.FIRST_NAME_PASSPORT) attendeeObj.FIRST_NAME_PASSPORT = attendeeData.FIRST_NAME_PASSPORT;
        if (attendeeData.LAST_NAME_PASSPORT) attendeeObj.LAST_NAME_PASSPORT = attendeeData.LAST_NAME_PASSPORT;
        if (attendeeData.BIRTHDAY_YEAR) attendeeObj.BIRTHDAY_YEAR = attendeeData.BIRTHDAY_YEAR;
        if (attendeeData.EMPLOYMENT_DATE) attendeeObj.EMPLOYMENT_DATE = attendeeData.EMPLOYMENT_DATE;
        if (attendeeData.image) attendeeObj.image = attendeeData.image;
        if (attendeeData.attendee_cv) attendeeObj.att_cv = attendeeData.attendee_cv;
        
    
        const data = {
          attendeeObj,
          settings,
          infoObj
        };
            updateAttendee(data);
      };

  return (
    <Container mb="3" maxW="100%" w="100%">
        {settings?.map((setting:Setting, index:number)=>(
            <React.Fragment key={index}>
                {setting?.name === 'initial'  && (
                    <Box mb="3" py="3" px="4" w="100%">
                        <Text fontWeight="600" mb="3" maxW="80%" fontSize="lg">{labels?.initial}</Text>
                        <Input w="100%" 
                            placeholder={labels?.initial} 
                            isReadOnly={setting.is_editable === 1 ? false : true}
                            onChangeText={(answer)=>{
                                updateAttendeeInfoFeild('initial', answer);
                            }}
                            value={attendeeData?.info?.initial}
                            />
                    </Box>
                )}
                {setting?.name === 'first_name'  && (
                    <Box mb="3" py="3" px="4" w="100%">
                        <Text fontWeight="600" mb="3" maxW="80%" fontSize="lg">{labels?.first_name}</Text>
                        <Input w="100%" 
                            placeholder={labels?.first_name} 
                            isReadOnly={setting.is_editable === 1 ? false : true}
                            onChangeText={(answer)=>{
                                updateAttendeeFeild('first_name', answer);
                            }}
                            value={attendeeData?.first_name}
                            />
                    </Box>
                )}
                {setting?.name === 'last_name'  && (
                    <Box mb="3" py="3" px="4" w="100%">
                        <Text fontWeight="600" mb="3" maxW="80%" fontSize="lg">{labels?.last_name}</Text>
                        <Input w="100%" 
                            placeholder={labels?.last_name} 
                            isReadOnly={setting.is_editable === 1 ? false : true}
                            onChangeText={(answer)=>{
                                updateAttendeeFeild('last_name', answer);
                            }}
                            value={attendeeData?.last_name}
                            />
                    </Box>
                )}
                {setting?.name === 'bio_info'  && (
                    <Box mb="3" py="3" px="4" w="100%">
                        <Text fontWeight="600" mb="3" maxW="80%" fontSize="lg">{labels?.about}</Text>
                        <Input w="100%" 
                            placeholder={labels?.about} 
                            isReadOnly={setting.is_editable === 1 ? false : true}
                            onChangeText={(answer)=>{
                                updateAttendeeInfoFeild('about', answer);
                            }}
                            value={attendeeData?.info?.about}
                            />
                    </Box>
                )}
                {setting?.name === 'age'  && (
                    <Box mb="3" py="3" px="4" w="100%">
                        <Text fontWeight="600" mb="3" maxW="80%" fontSize="lg">{labels?.age}</Text>
                        <Input w="100%" 
                            placeholder={labels?.age} 
                            isReadOnly={setting.is_editable === 1 ? false : true}
                            onChangeText={(answer)=>{
                                updateAttendeeInfoFeild('age', answer);
                            }}
                            value={attendeeData?.info?.age}
                            />
                    </Box>
                )}
                {setting?.name === 'first_name_passport'  && (
                    <Box mb="3" py="3" px="4" w="100%">
                        <Text fontWeight="600" mb="3" maxW="80%" fontSize="lg">{labels?.FIRST_NAME_PASSPORT}</Text>
                        <Input w="100%" 
                            placeholder={labels?.FIRST_NAME_PASSPORT} 
                            isReadOnly={setting.is_editable === 1 ? false : true}
                            onChangeText={(answer)=>{
                                updateAttendeeFeild('FIRST_NAME_PASSPORT', answer);
                            }}
                            value={attendeeData?.FIRST_NAME_PASSPORT}
                            />
                    </Box>
                )}
                {setting?.name === 'last_name_passport'  && (
                    <Box mb="3" py="3" px="4" w="100%">
                        <Text fontWeight="600" mb="3" maxW="80%" fontSize="lg">{labels?.LAST_NAME_PASSPORT}</Text>
                        <Input w="100%" 
                            placeholder={labels?.LAST_NAME_PASSPORT} 
                            isReadOnly={setting.is_editable === 1 ? false : true}
                            onChangeText={(answer)=>{
                                updateAttendeeFeild('LAST_NAME_PASSPORT', answer);
                            }}
                            value={attendeeData?.LAST_NAME_PASSPORT}
                            />
                    </Box>
                )}
                {setting?.name === 'place_of_birth'  && (
                    <Box mb="3" py="3" px="4" w="100%">
                        <Text fontWeight="600" mb="3" maxW="80%" fontSize="lg">{labels?.place_of_birth}</Text>
                        <Input w="100%" 
                            placeholder={labels?.place_of_birth} 
                            isReadOnly={setting.is_editable === 1 ? false : true}
                            onChangeText={(answer)=>{
                                updateAttendeeInfoFeild('place_of_birth', answer);
                            }}
                            value={attendeeData?.info?.place_of_birth}
                            />
                    </Box>
                )}
                {setting?.name === 'passport_no'  && (
                    <Box mb="3" py="3" px="4" w="100%">
                        <Text fontWeight="600" mb="3" maxW="80%" fontSize="lg">{labels?.passport_no}</Text>
                        <Input w="100%" 
                            placeholder={labels?.passport_no} 
                            isReadOnly={setting.is_editable === 1 ? false : true}
                            onChangeText={(answer)=>{
                                updateAttendeeInfoFeild('passport_no', answer);
                            }}
                            value={attendeeData?.info?.passport_no}
                            />
                    </Box>
                )}
                {setting?.name === 'company_name'  && (
                    <Box mb="3" py="3" px="4" w="100%">
                        <Text fontWeight="600" mb="3" maxW="80%" fontSize="lg">{labels?.company_name}</Text>
                        <Input w="100%" 
                            placeholder={labels?.company_name} 
                            isReadOnly={setting.is_editable === 1 ? false : true}
                            onChangeText={(answer)=>{
                                updateAttendeeInfoFeild('company_name', answer);
                            }}
                            value={attendeeData?.info?.company_name}
                            />
                    </Box>
                )}
                {setting?.name === 'title'  && (
                    <Box mb="3" py="3" px="4" w="100%">
                        <Text fontWeight="600" mb="3" maxW="80%" fontSize="lg">{labels?.title}</Text>
                        <Input w="100%" 
                            placeholder={labels?.title} 
                            isReadOnly={setting.is_editable === 1 ? false : true}
                            onChangeText={(answer)=>{
                                updateAttendeeInfoFeild('title', answer);
                            }}
                            value={attendeeData?.info?.title}
                            />
                    </Box>
                )}
                {setting?.name === 'organization'  && (
                    <Box mb="3" py="3" px="4" w="100%">
                        <Text fontWeight="600" mb="3" maxW="80%" fontSize="lg">{labels?.organization}</Text>
                        <Input w="100%" 
                            placeholder={labels?.organization} 
                            isReadOnly={setting.is_editable === 1 ? false : true}
                            onChangeText={(answer)=>{
                                updateAttendeeInfoFeild('organization', answer);
                            }}
                            value={attendeeData?.info?.organization}
                            />
                    </Box>
                )}
                {setting?.name === 'department'  && (
                    <Box mb="3" py="3" px="4" w="100%">
                        <Text fontWeight="600" mb="3" maxW="80%" fontSize="lg">{labels?.department}</Text>
                        <Input w="100%" 
                            placeholder={labels?.department} 
                            isReadOnly={setting.is_editable === 1 ? false : true}
                            onChangeText={(answer)=>{
                                updateAttendeeInfoFeild('department', answer);
                            }}
                            value={attendeeData?.info?.department}
                            />
                    </Box>
                )}
                {setting?.name === 'show_industry'  && (
                    <Box mb="3" py="3" px="4" w="100%">
                        <Text fontWeight="600" mb="3" maxW="80%" fontSize="lg">{labels?.industry}</Text>
                        <Input w="100%" 
                            placeholder={labels?.industry} 
                            isReadOnly={setting.is_editable === 1 ? false : true}
                            onChangeText={(answer)=>{
                                updateAttendeeInfoFeild('industry', answer);
                            }}
                            value={attendeeData?.info?.industry}
                            />
                    </Box>
                )}
                {setting?.name === 'show_job_tasks'  && (
                    <Box mb="3" py="3" px="4" w="100%">
                        <Text fontWeight="600" mb="3" maxW="80%" fontSize="lg">{labels?.jobs}</Text>
                        <Input w="100%" 
                            placeholder={labels?.jobs} 
                            isReadOnly={setting.is_editable === 1 ? false : true}
                            onChangeText={(answer)=>{
                                updateAttendeeInfoFeild('jobs', answer);
                            }}
                            value={attendeeData?.info?.jobs}
                            />
                    </Box>
                )}
                {setting?.name === 'interest'  && (
                    <Box mb="3" py="3" px="4" w="100%">
                        <Text fontWeight="600" mb="3" maxW="80%" fontSize="lg">{labels?.interests}</Text>
                        <Input w="100%" 
                            placeholder={labels?.interests} 
                            isReadOnly={setting.is_editable === 1 ? false : true}
                            onChangeText={(answer)=>{
                                updateAttendeeInfoFeild('interests', answer);
                            }}
                            value={attendeeData?.info?.interests}
                            />
                    </Box>
                )}
                {setting?.name === 'network_group'  && (
                    <Box mb="3" py="3" px="4" w="100%">
                        <Text fontWeight="600" mb="3" maxW="80%" fontSize="lg">{labels?.network_group}</Text>
                        <Input w="100%" 
                            placeholder={labels?.network_group} 
                            isReadOnly={setting.is_editable === 1 ? false : true}
                            onChangeText={(answer)=>{
                                updateAttendeeInfoFeild('network_group', answer);
                            }}
                            value={attendeeData?.info?.network_group}
                            />
                    </Box>
                )}
                {setting?.name === 'delegate_number'  && (
                    <Box mb="3" py="3" px="4" w="100%">
                        <Text fontWeight="600" mb="3" maxW="80%" fontSize="lg">{labels?.delegate}</Text>
                        <Input w="100%" 
                            placeholder={labels?.delegate} 
                            isReadOnly={setting.is_editable === 1 ? false : true}
                            onChangeText={(answer)=>{
                                updateAttendeeInfoFeild('delegate_number', answer);
                            }}
                            value={attendeeData?.info?.delegate_number}
                            />
                    </Box>
                )}
                {setting?.name === 'table_number'  && (
                    <Box mb="3" py="3" px="4" w="100%">
                        <Text fontWeight="600" mb="3" maxW="80%" fontSize="lg">{labels?.table_number}</Text>
                        <Input w="100%" 
                            placeholder={labels?.table_number} 
                            isReadOnly={setting.is_editable === 1 ? false : true}
                            onChangeText={(answer)=>{
                                updateAttendeeInfoFeild('table_number', answer);
                            }}
                            value={attendeeData?.info?.table_number}
                            />
                    </Box>
                )}
                {setting?.name === 'pa_street'  && (
                    <Box mb="3" py="3" px="4" w="100%">
                        <Text fontWeight="600" mb="3" maxW="80%" fontSize="lg">{labels?.private_street}</Text>
                        <Input w="100%" 
                            placeholder={labels?.private_street} 
                            isReadOnly={setting.is_editable === 1 ? false : true}
                            onChangeText={(answer)=>{
                                updateAttendeeInfoFeild('private_street', answer);
                            }}
                            value={attendeeData?.info?.private_street}
                            />
                    </Box>
                )}
                {setting?.name === 'pa_house_no'  && (
                    <Box mb="3" py="3" px="4" w="100%">
                        <Text fontWeight="600" mb="3" maxW="80%" fontSize="lg">{labels?.private_house_number}</Text>
                        <Input w="100%" 
                            placeholder={labels?.private_house_number} 
                            isReadOnly={setting.is_editable === 1 ? false : true}
                            onChangeText={(answer)=>{
                                updateAttendeeInfoFeild('private_house_number', answer);
                            }}
                            value={attendeeData?.info?.private_house_number}
                            />
                    </Box>
                )}
                {setting?.name === 'pa_post_code'  && (
                    <Box mb="3" py="3" px="4" w="100%">
                        <Text fontWeight="600" mb="3" maxW="80%" fontSize="lg">{labels?.private_post_code}</Text>
                        <Input w="100%" 
                            placeholder={labels?.private_post_code} 
                            isReadOnly={setting.is_editable === 1 ? false : true}
                            onChangeText={(answer)=>{
                                updateAttendeeInfoFeild('private_post_code', answer);
                            }}
                            value={attendeeData?.info?.private_post_code}
                            />
                    </Box>
                )}
                {setting?.name === 'pa_city'  && (
                    <Box mb="3" py="3" px="4" w="100%">
                        <Text fontWeight="600" mb="3" maxW="80%" fontSize="lg">{labels?.private_city}</Text>
                        <Input w="100%" 
                            placeholder={labels?.private_city} 
                            isReadOnly={setting.is_editable === 1 ? false : true}
                            onChangeText={(answer)=>{
                                updateAttendeeInfoFeild('private_city', answer);
                            }}
                            value={attendeeData?.info?.private_city}
                            />
                    </Box>
                )}
                {setting?.name === 'pa_country'  && (
                    <Box mb="3" py="3" px="4" w="100%">
                        <Text fontWeight="600" mb="3" maxW="80%" fontSize="lg">{labels?.private_country}</Text>
                        <Select
                            placeholder="Please Select"
                            minWidth="64"
                            h="50px"
                            isDisabled={setting?.is_editable === 1 ? false : true}
                            selectedValue={attendeeData.info.private_country}
                            onValueChange={answer => updateInfoSelect({ answer, name: "private_country" })}
                            >
                            {countries.map((answer, key)=>(<Select.Item  key={key} label={answer.name} value={`${answer.id}`} />))}
                        </Select>
                    </Box>
                )}
                {setting?.name === 'email'  && (
                    <Box mb="3" py="3" px="4" w="100%">
                        <Text fontWeight="600" mb="3" maxW="80%" fontSize="lg">{labels?.email}</Text>
                        <Input w="100%" 
                            placeholder={labels?.email} 
                            isReadOnly={true}
                            onChangeText={(answer)=>{
                                updateAttendeeFeild('email', answer);
                            }}
                            value={attendeeData?.email}
                            />
                    </Box>
                )}
                {setting?.name === 'gender'  && (
                    <Box mb="3" py="3" px="4" w="100%">
                        <Text fontWeight="600" mb="3" maxW="80%" fontSize="lg">{labels?.gender}</Text>
                        <Radio.Group space="5" defaultValue={attendeeData.info.gender} name="MyRadioGroup"  onChange={gender => {updateAttendeeInfoFeild('gender', gender);}}>
                                <Radio value={'male'}> Male </Radio>
                                <Radio value={'female'}> Female </Radio>
                        </Radio.Group>
                    </Box>
                )}
                {setting?.name === 'birth_date'  && (
                    <Box mb="3" py="3" px="4" w="100%">
                        <Text fontWeight="600" mb="3" maxW="80%" fontSize="lg">{labels?.BIRTHDAY_YEAR}</Text>
                        <DateTimePicker 
                            readOnly={setting?.is_editable === 1 ? false : true}
                            onChange={(item:any) => {
                                updateDate({ item, name: "BIRTHDAY_YEAR" });
                              }}
                            value={attendeeData.BIRTHDAY_YEAR !== '' && attendeeData.BIRTHDAY_YEAR !== '0000-00-00' && attendeeData.BIRTHDAY_YEAR !== '0000-00-00 00:00:00' ? moment(attendeeData.BIRTHDAY_YEAR).format('YYYY-MM-DD') : ''}
                            showdate={"YYYY-MM-DD"}
                        />

                    </Box>
                )}
                {setting?.name === 'date_of_issue_passport'  && (
                    <Box mb="3" py="3" px="4" w="100%">
                        <Text fontWeight="600" mb="3" maxW="80%" fontSize="lg">{labels?.date_of_issue_passport}</Text>
                        <DateTimePicker 
                            readOnly={setting?.is_editable === 1 ? false : true}
                            onChange={(item:any) => {
                                updateInfoDate({ item, name: "date_of_issue_passport" });
                              }}
                            value={attendeeData?.info?.date_of_issue_passport !== '' && attendeeData?.info?.date_of_issue_passport !== '0000-00-00' && attendeeData?.info?.date_of_issue_passport !== '0000-00-00 00:00:00' ? moment(attendeeData?.info?.date_of_issue_passport).format('YYYY-MM-DD') : ''}
                            showdate={"YYYY-MM-DD"}
                        />

                    </Box>
                )}
                {setting?.name === 'date_of_expiry_passport'  && (
                    <Box mb="3" py="3" px="4" w="100%">
                        <Text fontWeight="600" mb="3" maxW="80%" fontSize="lg">{labels?.date_of_expiry_passport}</Text>
                        <DateTimePicker 
                            readOnly={setting?.is_editable === 1 ? false : true}
                            onChange={(item:any) => {
                                updateInfoDate({ item, name: "date_of_expiry_passport" });
                              }}
                            value={attendeeData?.info?.date_of_expiry_passport !== '' && attendeeData?.info?.date_of_expiry_passport !== '0000-00-00' && attendeeData?.info?.date_of_expiry_passport !== '0000-00-00 00:00:00' ? moment(attendeeData?.info?.date_of_expiry_passport).format('YYYY-MM-DD') : ''}
                            showdate={"YYYY-MM-DD"}
                        />
                    </Box>
                )}
                {setting?.name === 'employment_date'  && (
                    <Box mb="3" py="3" px="4" w="100%">
                        <Text fontWeight="600" mb="3" maxW="80%" fontSize="lg">{labels?.EMPLOYMENT_DATE}</Text>
                        <DateTimePicker 
                            readOnly={setting?.is_editable === 1 ? false : true}
                            onChange={(item:any) => {
                                updateInfoDate({ item, name: "EMPLOYMENT_DATE" });
                              }}
                            value={attendeeData?.EMPLOYMENT_DATE !== '' && attendeeData?.EMPLOYMENT_DATE !== '0000-00-00' && attendeeData?.EMPLOYMENT_DATE !== '0000-00-00 00:00:00' ? moment(attendeeData?.EMPLOYMENT_DATE).format('YYYY-MM-DD') : ''}
                            showdate={"YYYY-MM-DD"}
                        />
                    </Box>
                )}
                {setting?.name === 'country'  && (
                    <Box mb="3" py="3" px="4" w="100%">
                        <Text fontWeight="600" mb="3" maxW="80%" fontSize="lg">{labels?.country}</Text>
                        <Select
                            placeholder="Please Select"
                            minWidth="64"
                            h="50px"
                            isDisabled={setting?.is_editable === 1 ? false : true}
                            selectedValue={attendeeData.info.country}
                            onValueChange={answer => updateInfoSelect({ answer, name: "country" })}
                            >
                            {countries.map((answer, key)=>(<Select.Item  key={key} label={answer.name} value={`${answer.id}`} />))}
                        </Select>
                    </Box>
                )}
                {setting?.name === 'phone'  && (
                    <Box mb="3" py="3" px="4" w="100%">
                        <Text fontWeight="600" mb="3" maxW="80%" fontSize="lg">{labels?.phone}</Text>
                        <Box flexDirection={'row'}>
                            <Select
                                placeholder="Please Select"
                                minWidth="64"
                                w={'49%'}
                                h="50px"
                                isDisabled={setting?.is_editable === 1 ? false : true}
                                selectedValue={attendeeData?.callingCode}
                                onValueChange={answer => updateInfoSelect({ answer, name: "phone" })}
                                >
                                {callingCodes.map((answer, key)=>(<Select.Item  key={key} label={answer.name} value={`${answer.id}`} />))}
                            </Select>
                            <Input w="49%" 
                                placeholder={labels?.phone} 
                                isReadOnly={setting.is_editable === 1 ? false : true}
                                onChangeText={(answer)=>{
                                    updateAttendeeFeild('phone', answer);
                                }}
                                value={attendeeData?.phone.split("-")[1]}
                                />
                        </Box>
                    </Box>
                )}
            </React.Fragment>
        ))}
        {attendee_feild_settings?.website === 1 && <Box mb="3" py="3" px="4" w="100%">
            <Text fontWeight="600" mb="3" maxW="80%" fontSize="lg">Website</Text>
            <Input w="100%" 
                placeholder={"Website"} 
                isReadOnly={true}
                onChangeText={(answer)=>{
                    updateAttendeeInfoFeild('website', answer);
                }}
                value={attendeeData?.info?.website}
                />
        </Box>  }        
        {attendee_feild_settings?.facebook === 1 &&  <Box mb="3" py="3" px="4" w="100%">
            <Text fontWeight="600" mb="3" maxW="80%" fontSize="lg">Facebook</Text>
            <Input w="100%" 
                placeholder={"Facebook"} 
                isReadOnly={true}
                onChangeText={(answer)=>{
                    updateAttendeeInfoFeild('facebook', answer);
                }}
                value={attendeeData?.info?.facebook}
                />
        </Box>  }        
        {attendee_feild_settings?.twitter === 1 && <Box mb="3" py="3" px="4" w="100%">
            <Text fontWeight="600" mb="3" maxW="80%" fontSize="lg">Twitter</Text>
            <Input w="100%" 
                placeholder={"Twitter"} 
                isReadOnly={true}
                onChangeText={(answer)=>{
                    updateAttendeeInfoFeild('twitter', answer);
                }}
                value={attendeeData?.info?.twitter}
                />
        </Box>  }        
        {attendee_feild_settings?.linkedin === 1 &&  <Box mb="3" py="3" px="4" w="100%">
            <Text fontWeight="600" mb="3" maxW="80%" fontSize="lg">LinkedIn</Text>
            <Input w="100%" 
                placeholder={"LinkedIn"} 
                isReadOnly={true}
                onChangeText={(answer)=>{
                    updateAttendeeInfoFeild('linkedin', answer);
                }}
                value={attendeeData?.info?.linkedin}
                />
        </Box> }         
        {attendee?.current_event_attendee.gdpr === 1 &&  <Box mb="3" py="3" px="4" w="100%">
            <Checkbox defaultIsChecked={attendee.current_event_attendee.gdpr === 1 ? true : false} value='gdpr' onChange={(isSelected)=>{ 
                    updateAttendeeFeild('gdpr', isSelected);
              }} size="md"   >GDPR</Checkbox>
        </Box> }         
         <Box mb="3" py="3" px="4" w="100%">
                   
            <Button
                w="100%"
                py="3"
                px="1"
                leftIcon={<IcoLongArrow />}
                colorScheme="primary"
                isLoading={updatingAttendee}
                onPress={() => {
                    updateAttendeeData();
                }}
            />
        </Box>          
    </Container>
  )
}
