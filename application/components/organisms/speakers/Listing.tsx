import React from 'react';
import SectionLoading from 'application/components/atoms/SectionLoading';
import { Avatar, Box, Center, HStack, Icon, IconButton, Pressable, Spacer, Text, VStack } from 'native-base'
import IcoRaiseHand from 'application/assets/icons/IcoRaiseHand';
import UseAttendeeService from 'application/store/services/UseAttendeeService';
import UseEventService from 'application/store/services/UseEventService';
import { Attendee } from 'application/models/attendee/Attendee';
import RectangleView from 'application/components/atoms/speakers/RectangleView'
import in_array from "in_array";
import UseLoadingService from 'application/store/services/UseLoadingService';

const Listing = () => {

  const { FetchAttendees, attendees, total } = UseAttendeeService();

  const { modules } = UseEventService();

  const { processing } = UseLoadingService();

  React.useEffect(() => {
    if (modules.filter((module: any, key: number) => module.alias === 'speakers').length > 0) {
      FetchAttendees({ query: '', group_id: 0, page: 1, my_attendee_id: 0, speaker: 1, category_id: 0, screen: 'dashboard-speakers', program_id: 0 });
    }
  }, [])

  return (
    <React.Fragment>
      {(in_array('attendee-listing', processing)) ? (
        <SectionLoading h='500px' />
      ) : (
        <>
          <HStack bg="primary.box" py="5" mb="2" rounded="10" px="3" w="100%" space="0" alignItems="center" justifyContent="space-between">
            <Center alignItems="flex-start" w="60%" p="0">
              <HStack space="3" alignItems="center">
                <Avatar
                  source={{
                    uri: 'https://pbs.twimg.com/profile_images/1369921787568422915/hoyvrUpc_400x400.jpg'
                  }}
                >
                  SS
                </Avatar>
                <VStack space="0">
                  <Text fontSize="lg">Stephen Hendry</Text>
                  <Text fontSize="lg">Global INC - Social media Expert</Text>
                </VStack>
              </HStack>
            </Center>
            <Spacer />
            <HStack w="120px" space="1" alignItems="center" justifyContent="flex-end">
              <IconButton
                p="2"
                variant="transparent"
                icon={<IcoRaiseHand width={20} height={27} />}
                onPress={() => { console.log('hello') }}
              />
              <Text fontSize="lg"># 05</Text>
            </HStack>
          </HStack>
          <Box mb="2" p="0">
            <Text fontSize="lg">{`Total Speakers :${total}`}</Text>
          </Box>
          <Box w="100%" mb="3" bg="primary.box" p="0" rounded="10">
            {attendees.map((attendee: Attendee, k: number) =>
              <RectangleView attendee={attendee} k={k} total={attendees?.length} />
            )}
          </Box>
        </>
      )}
    </React.Fragment>
  )
}

export default Listing