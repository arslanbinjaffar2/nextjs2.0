import * as React from 'react';
import PropTypes from 'prop-types';
import { Avatar, Box, Button, Center, Checkbox, Container, Heading, HStack, Icon, IconButton, Image, Input, ScrollView, Spacer, Spinner, Text, TextArea, VStack } from 'native-base';
import { UseEventService } from 'application/store/services';
import NextBreadcrumbs from 'application/components/atoms/NextBreadcrumbs';
import Entypo from '@expo/vector-icons/Entypo';
import Feather from '@expo/vector-icons/Feather';
import UseChatService from 'application/store/services/UseChatService';
import { useDebouncedCallback } from "use-debounce";
import UseLoadingService from 'application/store/services/UseLoadingService';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Group, Attendee } from 'application/models/chat/Chat';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import UseEnvService from 'application/store/services/UseEnvService';
import NoRecordFound from 'application/components/atoms/NoRecordFound';
import NewChatBox from 'application/components/atoms/chat/NewChatBox';


type SelectedItem = {
  type: string,
  value: Attendee | Group | any
}

type indexProps = {
  navigation: unknown
}


const NewChat = ({navigation}: indexProps) => {
  const {event,modules} = UseEventService();
  const module = modules.find((module) => module.alias === 'chat');
  const {NewChatSearch,new_chat_search_results,SetNewChatError} = UseChatService();
  const [selectedItems, setSelectedItems] = React.useState<SelectedItem[]>([]);
  const {processing} = UseLoadingService();
  const [selectedtab, setSelectedTab] = React.useState<string>('attendee');

  const [search, setSearch] = React.useState<string>('');

  const {_env} = UseEnvService();


  const debouncedSearch = useDebouncedCallback((value:any) => {
    setSearch(value);
  }, 500);

  React.useEffect(() => {
    NewChatSearch({search: search})
  }, [search]);

  function selectItem(item: SelectedItem) {
    setSelectedItems([...selectedItems, item])
  }

  function removeItem(item: SelectedItem) {
    setSelectedItems(selectedItems.filter((i) => i.value.id !== item.value.id))
  }

  // get image of sender 
  const getSenderImage = (image: string) => {
    // source={{ uri: `${_env.eventcenter_base_url}/assets/attendees/${ shouldShow(attendeeToShow?.field_settings?.profile_picture) ? attendeeToShow?.image:''}` }}
    if(image){
      return `${_env.eventcenter_base_url}/assets/attendees/${image}`;
    }
    return '';
  };

   // Function to get the first letters of the first and last name
   const getFirstLetters = (name: string) => {
    const names = name.split(' ');
    return (names[0].substring(0, 1) + names[1].substring(0, 1)).toUpperCase();
  };

  React.useEffect(() => {
    SetNewChatError({error:null});
  },[selectedItems])

  React.useEffect(() => {
    console.log('new_chat_search_results.groups: ',new_chat_search_results.groups);
  },[new_chat_search_results])

  return (
      <>
      <NextBreadcrumbs module={module} title={event?.labels?.CHAT_NEW} />
      <Container pt="2" maxW="100%" w="100%">
        <HStack flexWrap={'wrap'} mb="3" pt="2" w="100%" space="0" alignItems="center">
          <Text mb={3}  textAlign={'center'} width={'100%'} fontSize="2xl">{event?.labels?.CHAT_NEW}</Text>
          <Input  rounded="10" w="100%" bg="primary.box" borderWidth={0} placeholder={event?.labels?.GENERAL_SEARCH} onChangeText={(text)=>debouncedSearch(text)} leftElement={processing.includes('new-chat-search') ?
          <Spinner p={0} maxHeight={26} maxWidth={26} ml={2} mr={1} color="primary.text" /> : <Icon ml="2" color="primary.text" size="lg" as={AntDesign} name="search1"  />}  />
        </HStack>

       

        {/* Selected Items */}
          <HStack pb={3} borderBottomWidth={4} borderBottomColor={'primary.darkbox'} w={'100%'} mb={3} flexWrap={'wrap'} space="1" alignItems="center">
            
            {selectedItems.map((item,k) =>
              <HStack bg={'primary.box'} p={1} rounded={'20px'}  space="1" alignItems="center">
              {item.type == 'attendee' ? (
              <Avatar
                size={'xs'}
                source={{
                  uri: getSenderImage(item?.value?.image)
                }}>
                {getFirstLetters(`${item?.value?.full_name}`)}
              </Avatar>):(
              <Avatar size={'xs'}>
                <Icon size={'xs'} color={'primary.text'} as={MaterialIcons} name="groups"  />
              </Avatar>
              )}
              <Text fontSize="14px">{item.type === 'attendee' ? `${item.value?.first_name} ${item.value?.last_name}` : item.value?.name}</Text>
                <IconButton variant="unstyled" p={0} mx={1} size={'xs'}
                  icon={<Icon size="xs" as={AntDesign} name="close" color="primary.text" />}
                  onPress={()=>{removeItem(item)}}/> 
            </HStack>
          )}
          </HStack>
        {/* Tabs */}
        <Button.Group mb={3}>
         <Button isPressed={selectedtab === 'attendee'} px="6" py="1" rounded="20px" bg={"primary.box"} borderWidth="0"
          _text={{ fontSize: 'lg', color: "primary.hovercolor" }}
          _hover={{_text: {color: 'primary.hovercolor'}}} borderColor="primary.bdBox" colorScheme="primary"
          onPress={() => {
              setSelectedTab('attendee')
          }}
          >
            {event?.labels?.EVENTSITE_ATTENDEES}
          </Button>
         <Button
            isPressed={selectedtab === 'group'} px="6" py="1" rounded="20px" bg={"primary.box"} borderWidth="0"
            _text={{ fontSize: 'lg', color: "primary.hovercolor" }}
            _hover={{_text: {color: 'primary.hovercolor'}}} borderColor="primary.bdBox" colorScheme="primary"
            onPress={() => {setSelectedTab('group')}}>
            {event?.labels?.GENERAL_ATTENDEES_GROUP}
          </Button>
        </Button.Group>
        
         <VStack mb="3" overflow="hidden" bg="primary.box" rounded="10" w="100%" space="0">
          {/* Attendee Results */}
          {selectedtab === 'attendee' && (
            <>
            {new_chat_search_results.attendees?.length == 0 && <NoRecordFound />}
            {new_chat_search_results.attendees.filter((attendee: any) => {
              if (Number(attendee?.current_event_attendee?.speaker) === 1 && event?.speaker_settings?.chat !== 1) {
                return false;
              }
              return true;
            }).map((attendee,k) =>
              <HStack key={k} alignItems={'center'} borderTopWidth={k === 0 ? 0 : 1} borderColor="primary.bordercolor" w="100%" p="4" space="4">
               <Checkbox  value={`${attendee.id}`} isChecked={selectedItems.some((item) => item.type == 'attendee' && item.value.id === attendee.id)} onChange={(value) => {
                if(value) {
                  selectItem({type: 'attendee', value: attendee})
                } else {
                  removeItem({type: 'attendee', value: attendee})
                }
               }} />
                 <Avatar source={{uri: getSenderImage(attendee?.image)}}>
                   {getFirstLetters(`${attendee?.first_name} ${attendee?.last_name}`)}
                 </Avatar>
                 <VStack space="0">
                   <Heading fontWeight={500} fontSize="lg">{attendee?.first_name} {attendee?.last_name}</Heading>
                 </VStack>
               </HStack>)}
            </>
          )}
          {/* Group Results */}
          {selectedtab === 'group' && (
            <>
            {new_chat_search_results.groups?.length == 0 && <NoRecordFound />}
            {new_chat_search_results.groups.map((parent_group,k) =>
              <>
                <Box  bg="primary.darkbox" px={2}>
                  {parent_group?.parent?.name}
                </Box>
                
                {/* sub groups start */}
                {parent_group?.sub_groups?.map((group,k) =>
                  <HStack key={k} alignItems={'center'} borderTopWidth={k === 0 ? 0 : 1} borderColor="primary.bordercolor" w="100%" p="4" space="4">
                  <Checkbox value={group?.id?.toString()} isChecked={selectedItems.some((item) => item?.type == 'group' && item?.value?.id === group?.id)} onChange={(value) => {
                    if(value) {
                      selectItem({type: 'group', value: group})
                    } else {
                      removeItem({type: 'group', value: group})
                    }
                    }} />
                  <Avatar backgroundColor={group?.color ? group.color : undefined}>
                      <Icon color={'primary.text'} as={MaterialIcons} name="groups"  />
                  </Avatar>
                  <VStack space="0">
                    <Heading fontWeight={500} fontSize="lg">{group?.name}</Heading>
                  </VStack>
                </HStack>
                )}
                {/* sub groups end */}

              </>
              )}
            </>
          )}
        </VStack>
        {/* New Message */}
        <NewChatBox user_ids={selectedItems.filter((item) => item.type === 'attendee').map((item) => item.value.id)} group_ids={selectedItems.filter((item) => item.type === 'group').map((item) => item.value.id)} />
      </Container>
      </>
  );
};

export default NewChat;
