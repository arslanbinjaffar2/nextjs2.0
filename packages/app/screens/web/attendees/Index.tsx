import * as React from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { Avatar, Box, Button, Container, HStack, Icon, Input, Spacer, Text, VStack } from 'native-base';
import AntDesign from '@expo/vector-icons/AntDesign';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons'
import Master from 'app/screens/web/layouts/Master';
import BoxItem from 'app/components/atoms/attendees/BoxItem';

type indexProps = {
  navigation: unknown
}

const Index = ({ navigation }: indexProps) => {
  const [tabs, settabs] = useState<string | null>('PROGRAM');
  const alpha = Array.from(Array(26)).map((e, i) => i + 65);
  const alphabet = alpha.map((x) => String.fromCharCode(x));
  return (
    <Master navigation={navigation}>
      <HStack mb="3" pt="2" w="100%" space="3" alignItems="center">
        <Text fontSize="2xl">ATTENDEES</Text>
        <Spacer />
        <Input rounded="10" w="60%" bg="primary.box" borderWidth={1} borderColor="primary.darkbox" placeholder="Search" leftElement={<Icon ml="2" color="primary.text" size="lg" as={AntDesign} name="search1" />} />
      </HStack>
      <HStack mb="3" space={1} justifyContent="center" w="100%">
        <Button onPress={() => settabs('PROGRAM')} borderWidth="1px" py={0} borderColor="primary.darkbox" borderRightRadius="0" borderLeftRadius={8} h="42px" bg={tabs === 'PROGRAM' ? 'primary.darkbox' : 'primary.box'} w="33.3%" _text={{ fontWeight: '600' }}>ALL</Button>
        <Button onPress={() => settabs('MY_PROGRAM')} borderRadius="0" borderWidth="1px" py={0} borderColor="primary.darkbox" h="42px" bg={tabs === 'MY_PROGRAM' ? 'primary.darkbox' : 'primary.box'} w="33.3%" _text={{ fontWeight: '600' }}>MY ATTENDEES</Button>
        <Button onPress={() => settabs('TRACKS')} borderWidth="1px" py={0} borderColor="primary.darkbox" borderLeftRadius="0" borderRightRadius={8} h="42px" bg={tabs === 'TRACKS' ? 'primary.darkbox' : 'primary.box'} w="33.3%" _text={{ fontWeight: '600' }}>GROUPS</Button>
      </HStack>
      <>
        {tabs === 'PROGRAM' && <Container position="relative" mb="3" rounded="10" bg="primary.box" w="100%" maxW="100%">
          <VStack w="20px" position="absolute" right="-20px" top="0" space="1">
            {alphabet && alphabet.map((item,k) =>
              <Text textAlign="center" color="primary.text" opacity="0.5" key={k} fontSize="md">{item}</Text>
            )}
          </VStack>
          <Text w="100%" pl="18px" bg="primary.darkbox">A</Text>
          {[...Array(3)].map((item, k) =>
            <React.Fragment key={`item-box-${k}`}>
              <BoxItem border={k === 2 ? 0 : 1} />
            </React.Fragment>
          )}
          <Text w="100%" pl="18px" bg="primary.darkbox">B</Text>
          {[...Array(3)].map((item, k) =>
            <React.Fragment key={`item-box-alt-${k}`}>
              <BoxItem border={k === 2 ? 0 : 1} />
            </React.Fragment>
          )}
        </Container>}
      </>
      <>
        {tabs === 'MY_PROGRAM' && <Container mb="3" rounded="10" bg="primary.box" w="100%" maxW="100%">
          {[...Array(6)].map((item, k) =>
            <React.Fragment key={`item-box-programs-${k}`}>
              <BoxItem border={k === 5 ? 0 : 1} />
            </React.Fragment>
          )}
        </Container>}
      </>
      <>
        {tabs === 'TRACKS' && <Container mb="3" rounded="10" bg="primary.box" w="100%" maxW="100%">
          {[...Array(7)].map((item, k) =>
            <Box w="100%" key={k} borderBottomWidth={k === 6 ? 0 : 1} borderColor="primary.text" py="4">
              <HStack px="4" alignItems="flex-start" space={0} justifyContent="flex-start">
                <HStack w="100%" space="5" alignItems="center" justifyContent="space-between">
                  <Avatar
                    borderWidth={1}
                    borderColor="primary.darkbox"
                    bg={`danger.${k + 1}00`}
                    source={{
                      uri: 'https://pbs.twimg.com/profile_images/1369921787568422915/hoyvrUpc_400x400.jpg'
                    }}>MC</Avatar>
                  <VStack maxW={['62%', '70%', '40%']} space="0">
                    <Text lineHeight="22px" fontSize="lg">Marketing CEO</Text>
                  </VStack>
                  <Spacer />
                  <HStack space="4" alignItems="center">
                    <Icon size="md" as={SimpleLineIcons} name="arrow-right" color="primary.text" />
                  </HStack>
                </HStack>
              </HStack>
            </Box>)}
        </Container>}
      </>
    </Master>
  );

};

Index.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default Index;
