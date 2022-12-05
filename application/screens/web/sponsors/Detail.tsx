import * as React from 'react';
import PropTypes from 'prop-types';
import { Box, Container, HStack, Icon, Spacer, Text, VStack, Image, Divider, Avatar, TextArea, Button } from 'native-base';
import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons'
import Master from 'applications/app/screens/web/layouts/Master';
import { useState } from 'react';
import IcoExhibitors from 'applications/app/assets/icons/IcoExhibitors';
import Icouser from 'applications/app/assets/icons/small/Icouser';
import Icodocument from 'applications/app/assets/icons/small/Icodocument';
import MultipleAnswer from 'applications/app/components/atoms/surveys/MultipleAnswer';

type indexProps = {
  navigation: unknown
}

const Detail = ({ navigation }: indexProps) => {
  const [tabs, settabs] = useState<string | null>('ABOUT');
  return (
    <Master navigation={navigation}>
      <Container overflow="hidden" mb="4" mt="5" maxW="100%" w="100%" bg="primary.box" rounded="10">
        <Box w="100%" bg="primary.500" p="0">
          <Image
            source={{
              uri: 'https://wallpaperaccess.com/full/39050.jpg'
            }}
            alt="Alternate Text"
            size="full"
            w="100%"
            h="160px"
            rounded="10"
            mb="5"
          />
          <Box w="100%" px="5">
            <HStack w="100%" mb="1" space="3" alignItems="flex-start">
              <Text maxW="80%" fontSize="xl">Water cleaning in Africa</Text>
              <Spacer />
              <Icon as={Ionicons} size="xl" name="heart" color="primary.text" />

            </HStack>
            <HStack w="100%" mb="3" space="0" alignItems="center">
              <Text fontSize="md">Marketing</Text>
              <Spacer />
              <HStack alignItems="center" space="2">
                <IcoExhibitors width="16px" height="16px" />
                <Text fontSize="md">109</Text>

              </HStack>

            </HStack>
            <Box mb="4" w="100%">
              <Divider mb="3" bg="primary.text" />
              <Text w="100%" fontSize="16px">Gul Ahmad is, firm, organization, etc., that finances and buysthe time to broadcast a radio or television program so as to advertise a product, a political party, etc. person who makes a pledge or promise on behalf of another.</Text>
            </Box>
          </Box>

        </Box>
        <Box w="100%" p="0">
          <HStack px="3" py="1" bg="primary.darkbox" w="100%" space="3" alignItems="center">
            <Icouser />
            <Text fontSize="lg">Contact person(s)</Text>
          </HStack>
          {[...Array(3)].map((item, k) => <HStack key={`item-${k}`} py="3" px="2" space="4" alignItems="center" borderBottomWidth={k === 2 ? 0 : 1} borderColor="primary.text">
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
            <Spacer />
            <Icon size="md" as={SimpleLineIcons} name="arrow-right" color="primary.text" />
          </HStack>)}
        </Box>
        <Box p="0" w="100%">
          <HStack px="3" py="1" bg="primary.darkbox" w="100%" space="3" alignItems="center">
            <Icodocument width="15px" height="18px" />
            <Text fontSize="lg">Documents</Text>
          </HStack>
          <Box w="100%" py="4">
            <HStack px="5" w="100%" space="0" alignItems="center" justifyContent="space-between">
              <VStack bg="red" w="100%" maxW={['95%', '80%', '70%']} space="0">
                <HStack space="3" alignItems="center">
                  <Icon size="md" as={AntDesign} name="pdffile1" color="primary.text" />
                  <Text fontSize="md">10 things we can do to help</Text>
                </HStack>

              </VStack>
              <Spacer />
              <Icon size="lg" as={AntDesign} name="download" color="primary.text" />
            </HStack>
          </Box>
        </Box>

      </Container>
      <Container mb="3" maxW="100%" w="100%">
        <Text mb="3" fontSize="lg" textTransform="uppercase">Available Survey</Text>
        <Box w="100%" bg="primary.box" borderWidth="1" borderColor="primary.bdBox" rounded="10">
          <Box py="3" px="4" w="100%">
            <Text mb="3" fontSize="lg">Tillykke med valget som tilli…</Text>
            <HStack bg="primary.box" overflow="hidden" borderWidth="1" borderColor="primary.bdBox" mb="4" space="0" w="100%" rounded="2xl">
              <Box bg="primary.500" h="22px" w="33.33%" />
              <Box borderLeftWidth="1" borderRightWidth="1" borderColor="primary.bdBox" bg="primary.500" h="22px" w="33.33%" />
              <Box bg="transparent" h="22px" w="33.33%" />

            </HStack>
          </Box>
          <MultipleAnswer req={true} title="What types of workouts will I be doing on DAMY Programs? Does it include cardio and weights?" />
          <Box py="0" px="4" w="100%">
            <Divider mb="15" opacity={0.27} bg="primary.text" />
            <HStack mb="3" space="3" alignItems="center">
              <Button
                bg="transparent"
                p="2"
                textTransform={'uppercase'}
                fontSize="lg"
                leftIcon={<Icon size="md" as={SimpleLineIcons} name="arrow-left" color="primary.text" />}
                colorScheme="primary"
                onPress={() => {
                  console.log('hello')
                }}

              >
                previous
              </Button>
              <Spacer />
              <Button
                bg="transparent"
                p="2"
                textTransform={'uppercase'}
                fontSize="lg"
                rightIcon={<Icon size="md" as={SimpleLineIcons} name="arrow-right" color="primary.text" />}
                colorScheme="primary"
                onPress={() => {
                  console.log('hello')
                }}

              >
                next
              </Button>
            </HStack>
          </Box>
        </Box>

      </Container>
    </Master>

  );
};

Detail.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default Detail;
