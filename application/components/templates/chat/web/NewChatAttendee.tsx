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



type indexProps = {
  navigation: unknown
}

type ScreenParams = { id: string }
const { useParam } = createParam<ScreenParams>()

const NewChatAttendee = ({ navigation }: indexProps) => {
  const [_id] = useParam('id');
  const [userIds, setUserIds] = React.useState<number[]>([]);
  const [loadingParticipantInfo, setLoadingParticipantInfo] = React.useState<boolean>(false);
  const [attendee, setAttendee] = React.useState<Attendee|null>(null);
  const {_env} = UseEnvService();

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

  return (
      <>
      {loadingParticipantInfo ? <SectionLoading h='80px' />:(
        <>
        {attendee?(
          <>
          <HStack bg={'primary.box'} p={1} rounded={'20px'}  space="1" alignItems="center" width="100%">
              
              <Avatar
                size={'lg'}
                source={{
                  uri: getSenderImage(attendee?.image)
                }}>
                {getFirstLetters(`${attendee?.first_name} ${attendee?.last_name}`)}
              </Avatar>
              <Text fontSize="14px">{attendee?.first_name} {attendee?.last_name}</Text> 
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