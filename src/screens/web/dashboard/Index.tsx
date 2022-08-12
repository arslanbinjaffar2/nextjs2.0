import * as React from 'react';
import PropTypes from 'prop-types';
import Layout from '@src/containers/mobile/Layout';
import { images } from '@src/styles';
import { Box, Center, Container, Divider, Flex, Heading, HStack, Image, Pressable, ScrollView, Text, VStack } from 'native-base';
import Icosettings from '@src/assets/icons/Icosettings';
import Icoreload from '@src/assets/icons/Icoreload';
import IcoBell from '@src/assets/icons/IcoBell'
import Notification from '@src/components/atoms/Notification';
import OurExhibitors from '@src/components/molecules/OurExhibitors';
import Sidebar from '@src/containers/web/Sidebar';
import VideoBox from '@src/components/atoms/Videos/VideoBox';
import OurPrograms from '@src/components/molecules/OurPrograms';
import OurSpeakers from '@src/components/molecules/OurSpeakers';

const Index = ({ navigation }: any) => {

  return (
    <Layout>
      <Flex w="100%" h="100%" direction="column">
        <ScrollView>
          <Center mx="auto" maxW="1200px" w="100%" py="40px" px="15px">
            <Container maxW="100%" w="100%">
              <HStack w="100%" alignItems="flex-start" space="5">
                <Center alignItems="flex-start" w="265px">
                  <Pressable onPress={() => { console.log('hello') }}>
                    <Image alt='logo' source={images.Logo} w="225px" h="48px" alignSelf={'center'} />
                  </Pressable>
                </Center>
                <Center w="600px">
                  <VStack pb="0" space={0} w="100%">
                    <Heading fontSize="3xl">JANUAR VISION DANMARK</Heading>
                    <Heading pb="1" fontSize="xl">KØBENHAVN 29 JANUAR 11:30 - 16:30</Heading>
                    <Heading fontSize="lg" bold>DR Koncerthus STUDIO 2, 2300 København S</Heading>
                  </VStack>
                </Center>
                <Center alignItems="flex-end" w="265px">
                  <HStack space="5">
                    <Box><Pressable onPress={() => { console.log('hello') }}><Icosettings width={32} height={32} /></Pressable></Box>
                    <Box><Pressable onPress={() => { console.log('hello') }}><Icoreload width={34} height={34} /></Pressable></Box>
                    <Box><Pressable onPress={() => { console.log('hello') }}><IcoBell width={32} height={32} /></Pressable></Box>
                  </HStack>
                </Center>
              </HStack>
            </Container>
            <Container maxW="100%" w="100%">
              <HStack pt="3" space="5" alignItems="flex-start">
                <Sidebar navigation={navigation} />
                <Center alignItems="flex-start" justifyContent="flex-start" w="600px">
                  <VideoBox />
                  <OurPrograms />
                  <OurSpeakers />
                </Center>
                <Center alignItems="flex-start" w="265px">
                  <Notification title="UPCOMING SESSION" desc="Workshop 2 - The right path" location="Room 242" date="11-03-2022" time="11-00 to 13-00" />
                  <Notification title="NOTIFICATIONS" desc="Talk on world health is rescheduled - see more…" date="11-03-2022" time="11-00" location={''} />
                  <Divider mb="1" bg="transparent" />
                  <OurExhibitors />
                </Center>
              </HStack>
            </Container>
          </Center>
        </ScrollView>
      </Flex>

    </Layout>
  );
};

Index.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default Index;
