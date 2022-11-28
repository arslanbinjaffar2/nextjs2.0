import * as React from 'react';
import PropTypes from 'prop-types';
import { Box, Container, HStack, Icon, Spacer, Text, VStack, Image, Divider, Avatar, TextArea, Button, IconButton, ZStack, Select, Checkbox, Center } from 'native-base';
import { AntDesign, Ionicons, Feather } from '@expo/vector-icons';
import Master from 'app/screens/web/layouts/Master';
import { useState } from 'react';
import IcoHistory from 'app/assets/icons/IcoHistory';

type indexProps = {
  navigation: unknown
}

const Detail = ({ navigation }: indexProps) => {
  const [tabs, settabs] = useState<string | null>('ABOUT');
  return (
    <Master navigation={navigation}>
      <Container overflow="hidden" mb="4" maxW="100%" w="100%">
        <HStack mb="3" pt="2" w="100%" space="3" alignItems="center">
          <HStack  space="3" alignItems="center">
            <Icon as={AntDesign} name="arrowleft" size="xl" color="primary.text"  />
            <Text  fontSize="2xl">BACK</Text>
          </HStack>
        </HStack>
        <Box overflow="hidden" w="100%" bg="primary.box" p="0" rounded="10px" borderBottomWidth={1} borderColor="primary.bdBox">
          <Box w="100%"  py="3">
            <HStack pl="30px" alignItems="center" minH="55px" space={0} justifyContent="flex-start">
              <Box position="absolute" left="0" top="0" w="15px">
                <ZStack>
                  {[...Array(1)].map((track, i) =>
                    <Box key={i} bg="#F5B761" borderWidth="1" borderColor="primary.darkbox" w="15px" mt={`${i * 10}px`} h={`${55 - (i * 10)}px`} borderRightRadius="10" shadow={2} />
                  )}
                </ZStack>
              </Box>
              <HStack pt="0" w="100%" space="5" alignItems="center" justifyContent="space-between">
                <VStack space="1">
                  <Text fontSize="md" lineHeight="22px">
                    Tillykke med valget som tillidsrepræsentant
                  </Text>
                </VStack>
              </HStack>
            </HStack>
          </Box>
          <Box w="100%">
            <HStack pl="6"  w="100%" bg="primary.darkbox" mb="3" alignItems="center">
              <Text fontSize="lg">Ask a question</Text>
              <Spacer />
              <Select
                placeholder="Please Select Attendee"
                w="195px"
                rounded="0"
                h="30px"
                borderWidth="1"
              >
                <Select.Item label="Marie Solbakke (Private)" value="js" />
                <Select.Item label="Albert Board" value="ts" />
                <Select.Item label="Mike nelson " value="py" />
              </Select>
              
            </HStack>
            <TextArea focusOutlineColor="transparent" _focus={{bg: 'transparent'}} px="4" py="0" fontSize="lg" w="100%" borderWidth="0" rounded="0" minH="60px" placeholder="Text Area Placeholder"  />
            <HStack px="3" py="2" space="3" alignItems="center">
              <Checkbox my="0"  value="checkbox">Send anonymously</Checkbox>
              <Spacer />
              <IconButton
                variant="transparent"
                icon={<Icon size="lg" as={Feather} name="send" color="white" />}
                onPress={() => { console.log('hello') }}

              />
            </HStack>
          </Box>
          <Box w="100%">
            <HStack px="3" space="0" alignItems="center" bg="primary.darkbox" mb="3">
              <HStack space="2" alignItems="center">
                <IcoHistory  />
                <Text fontSize="lg">History</Text>
              </HStack>
              <Spacer />
              <Text opacity={0.58} fontSize="md">1 Questions</Text>
              
            </HStack>
            <Box mb="10" px="5" w="100%" position="relative">
              <Text position="absolute" right="5" top="0" opacity={0.5} fontSize="sm">3 days ago</Text>
              <VStack w="100%" space="3">
                <HStack w="100%" space="3" alignItems="center">
                  <Avatar
                    size="md"
                    source={{
                      uri:'https://pbs.twimg.com/profile_images/1369921787568422915/hoyvrUpc_400x400.jpg'
                    }}
                  >
                  AB
                  </Avatar>
                  <Text fontWeight="600" fontSize="lg">Mike Zanita</Text>
                 
                </HStack>
                <HStack space="3" alignItems="flex-start">
                  <Text lineHeight="sm" textAlign="center" w="48px" fontSize="2xl">Q:</Text>
                  <Center w="calc(100% - 60px)" pt="1" alignItems="flex-start">
                    <Text fontSize="md">Hello there, what is the process or sign up?</Text>
                  </Center>
                </HStack>
                <HStack w="100%" space="3" alignItems="center">
                  <Avatar
                    size="md"
                    source={{
                      uri:'https://pbs.twimg.com/profile_images/1369921787568422915/hoyvrUpc_400x400.jpg'
                    }}
                  >
                  S
                  </Avatar>
                  <Text fontWeight="600" fontSize="lg">System</Text>
                 
                </HStack>
                <HStack space="3" alignItems="flex-start">
                  <Text lineHeight="sm" textAlign="center" w="48px" fontSize="2xl">Q:</Text>
                  <Center w="calc(100% - 60px)" pt="1" alignItems="flex-start">
                    <Text textAlign="left"  fontSize="md">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren</Text>
                  </Center>
                </HStack>
               
              </VStack>
              
            </Box>
            
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
