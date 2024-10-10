import * as React from 'react';
import NewChatBox from 'application/components/atoms/chat/NewChatBox';
import { createParam } from 'solito';
import { store } from 'application/store/Index';
import { getParticipantInfoApi } from 'application/store/api/Chat.Api';
import { Avatar, HStack, Text } from 'native-base';
import SectionLoading from 'application/components/atoms/SectionLoading';
import { Attendee } from 'application/models/chat/Chat';
import NoRecordFound from 'application/components/atoms/NoRecordFound';
import UseEnvService from 'application/store/services/UseEnvService';
import { UseEventService } from 'application/store/services';
import NextBreadcrumbs from 'application/components/atoms/NextBreadcrumbs';
import { useRouter } from 'solito/router';


type indexProps = {
  navigation: unknown
}

type ScreenParams = { id: string }
const { useParam } = createParam<ScreenParams>()

const NewChatAttendee = ({ navigation }: indexProps) => {
  const [_id] = useParam('id');
  const [userIds, setUserIds] = React.useState<number[]>([]);
  const [loadingParticipantInfo, setLoadingParticipantInfo] = React.useState<boolean>(false);
  const [attendee, setAttendee] = React.useState<any>(null);
  const {_env} = UseEnvService();
  const {push} = useRouter();

  React.useEffect(() => {
    if(_id){
      fetchParticipantInfo();
    }
  }, [_id]);


  async function fetchParticipantInfo() {
    const mystate=store.getState()
    setLoadingParticipantInfo(true);
    try {
      const response = await getParticipantInfoApi({user_id:_id},mystate); // Call the API function
      console.log('response', response);
      if(response.status === 200 && response?.data?.data?.attendee?.id){
        setAttendee(response?.data?.data?.attendee);
        setUserIds([Number(_id)]);
      }
      setLoadingParticipantInfo(false);

    } catch (error) {
      console.log('error', error);
    }
  }

  React.useEffect(() => {
    if(Number(attendee?.current_event_attendee?.speaker) === 1 && event?.speaker_settings?.chat !== 1){
      if(modules?.filter((module: any) => module?.alias === 'chat').length > 0){
        push(`/${event?.url}/chat`)
      }
    }
  }, [attendee]);

  // get image of sender 
  const getSenderImage = (image: string) => {
    // source={{ uri: `${_env.eventcenter_base_url}/assets/attendees/${ shouldShow(attendeeToShow?.field_settings?.profile_picture) ? attendeeToShow?.image:''}` }}
    if(image){
      return `${_env?.eventcenter_base_url}/assets/attendees/${image}`;
    }
    return '';
  };

   // Function to get the first letters of the first and last name
   const getFirstLetters = (name: string) => {
    if(name){
      const names = name.split(' ');
      return (names[0].substring(0, 1) + names[1].substring(0, 1)).toUpperCase();
    }
    return '';
  };

    // get image of sender 
    const getAttendeeImage = (attendee: Attendee) => {
      const field_setting = attendee?.sort_field_setting?.profile_picture; 
      
      if(Number(field_setting?.status) === 1 && Number(field_setting?.is_private) === 0){ 
            return `${_env.eventcenter_base_url}/assets/attendees/${attendee?.image}`
      }else{
        return '';
      }
    };
  
    function getValue(attendee: Attendee,field: string){
      const ignoredFields=['id','first_name']
      if(ignoredFields.includes(field)){
        return attendee?.[field as keyof Attendee]
      }
      
      const field_setting = attendee?.sort_field_setting?.[field]; 
     
      if(Number(field_setting?.status) === 1 && Number(field_setting?.is_private) === 0){ 
            return attendee?.[field as keyof Attendee]
      }else{
        return '';
      }
      
    }
  
    function getFullname(attendee: Attendee){
      return `${getValue(attendee,'first_name')} ${getValue(attendee,'last_name')}`
     }

  const {event,modules} = UseEventService();
  const module = modules.find(m => m.alias === 'chat');

  return (
      <>
      <NextBreadcrumbs module={module} title={event?.labels?.CHAT_NEW} />
      {loadingParticipantInfo ? <SectionLoading h='80px' />:(
        <>
        {attendee?(
          <>
          <HStack bg={'primary.box'} p={1} pt={2} rounded={'20px'}  space="1" alignItems="center" width="100%">
              
              <Avatar
                size={'lg'}
                source={{
                  uri: getAttendeeImage(attendee)
                }}>
                {getFirstLetters(getFullname(attendee))}
              </Avatar>
              <Text fontSize="14px">{getFullname(attendee)}</Text> 
            </HStack>
          </>
        ):(
          <NoRecordFound/>
        )}
        </>
      )}

      <NewChatBox user_ids={userIds} />
      </>
  );
};

export default NewChatAttendee;
