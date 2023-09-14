import * as React from 'react';
import PropTypes from 'prop-types';
import Master from 'application/screens/mobile/layouts/Master';
import Header from 'application/screens/mobile/layouts/headers/Header';
import { Center, VStack, ScrollView, Divider, Heading, HStack, Container, IconButton, Icon, Button } from 'native-base';
import { useState } from 'react';
import ExhibitorsListing from 'application/components/molecules/exhibitors/Listing';
import UpcomingBlock from 'application/components/atoms/programs/UpcomingBlock';
import ProgramListing from 'application/components/templates/programs/Listing';
import SpeakerRoundedList from 'application/components/templates/speakers/RoundedList';
import ModulesTopBar from 'application/components/atoms/ModulesTopBar';
import Stream from 'application/components/organisms/programs/videos/Stream';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons'
import PollRectangleView from 'application/components/atoms/polls/RectangleView';

const Index = ({ navigation }: any) => {

  const [scroll, setScroll] = useState(false);

  return (
    <Master navigation={navigation}>
      <Header minimal={scroll} navigation={navigation} />
      <Center w={'100%'} px={15}>
        <Divider mx="auto" w="160px" bg="primary.text" my="5" />
        <ScrollView h="85%" onScroll={(event: { nativeEvent: { contentOffset: { y: number; }; }; }) => setScroll(event.nativeEvent.contentOffset.y > 40 ? true : false)}>
          <VStack pb="2" space={0} alignItems="center" w="100%">
            <Heading fontSize="3xl">JANUAR VISION DANMARK</Heading>
            <Heading fontSize="xl">KØBENHAVN 29 JANUAR 11:30 - 16:30</Heading>
          </VStack>
          <VStack mb="3" space={0} alignItems="center" w="100%">
            <Heading fontSize="lg" bold>DR Koncerthus</Heading>
            <Heading fontSize="lg" bold>STUDIO 2, 2300 København S</Heading>
          </VStack>
          <ModulesTopBar />
          <HStack w="100%" space="4%">
            <Center w="48%">
              <UpcomingBlock title="UPCOMING SESSION" desc="Workshop 2 - The right path" location="Room 242" date="11-03-2022" time="11-00 to 13-00" />
            </Center>
            <Center w="48%">
              <UpcomingBlock title="UPCOMING SESSION" desc="Workshop 2 - The right path" location="Room 242" date="11-03-2022" time="11-00 to 13-00" />
            </Center>
          </HStack>
          <Stream />
          <ProgramListing />
          <SpeakerRoundedList />
          <ExhibitorsListing />
          <Container mb="3" rounded="10" bg="primary.box" w="100%" maxW="100%">
            <Heading py="1" fontSize="2xl" w="100%" textAlign="center">POLLS</Heading>
            <HStack py="1" w="100%" bg="primary.darkbox" space="0" alignItems="center">
              <Center alignItems="flex-start" w="10%">
                <IconButton
                  p="0"
                  w="40px"
                  variant="transparent"
                  icon={<Icon size="md" as={SimpleLineIcons} name="arrow-left" color="primary.text" />}
                  onPress={() => {
                    console.log('hello')
                  }}
                />
              </Center>
              <Center w="80%">
                <Heading fontSize="lg">Wednesday - Oktober 7</Heading>
              </Center>
              <Center alignItems="flex-end" w="10%">
                <IconButton
                  p="0"
                  w="40px"
                  variant="transparent"
                  icon={<Icon size="md" as={SimpleLineIcons} name="arrow-right" color="primary.text" />}
                  onPress={() => {
                    console.log('hello')
                  }}
                />
              </Center>
            </HStack>
            <PollRectangleView />
            <PollRectangleView />
            <Center py="3" px="2" w="100%" alignItems="flex-end">
              <Button p="1" _hover={{ bg: 'transparent', _text: { color: 'primary.500' }, _icon: { color: 'primary.500' } }} bg="transparent" width={'auto'} rightIcon={<Icon as={SimpleLineIcons} name="arrow-right" size="sm" />}>
                Show all
              </Button>
            </Center>
          </Container>
        </ScrollView>
      </Center>
    </Master>
  );
};

Index.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default Index;
