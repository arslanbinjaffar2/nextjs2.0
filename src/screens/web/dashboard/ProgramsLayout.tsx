import * as React from 'react';
import PropTypes from 'prop-types';
import { Box, Button, Center, Container, Heading, HStack, Icon, IconButton, Input, Spacer, Text, VStack, ZStack } from 'native-base';
import { AntDesign } from '@expo/vector-icons';
import { SimpleLineIcons  } from '@expo/vector-icons'
import WebMainLayout from '@src/screens/web/dashboard/WebMainLayout';


type indexProps = {
  navigation: unknown
}

const ProgramsLayout = ({ navigation }: indexProps) => {

  return (
    <WebMainLayout navigation={navigation}>
      <HStack mb="3" pt="2" w="100%" space="3" alignItems="center">
        <Text fontSize="2xl">PROGRAMS</Text>
        <Spacer />
        <Input  rounded="lg" w="60%" bg="primary.box" borderWidth={0} placeholder="Search" leftElement={<Icon ml="2" color="primary.text" size="lg" as={AntDesign} name="search1"  />}  />
      </HStack>
      <HStack mb="3" space={1} justifyContent="center" w="100%">
        <Button  onPress={() => console.log('first')} borderWidth="1px" py={0} borderColor="primary.darkbox" borderRightRadius="0" borderLeftRadius={8} h="42px" bg="primary.box" w="33.3%" _text={{fontWeight: '600'}}>Q & A</Button>
        <Button onPress={() => console.log('first')} borderRadius="0" borderWidth="1px" py={0} color="primary.100" borderColor="primary.darkbox" h="42px" bg="primary.box" w="33.3%" _text={{fontWeight: '600'}}>SPEAKERS LIST</Button>
        <Button onPress={() => console.log('first')} borderWidth="1px" py={0} color="primary.100" borderColor="primary.darkbox" borderLeftRadius="0" borderRightRadius={8}   h="42px" bg="primary.box" w="33.3%" _text={{fontWeight: '600'}}>SPEAKERS LIST</Button>
      </HStack>
      {/*  */}
      <Container mb="3" rounded="lg" bg="primary.box" w="100%" maxW="100%">
        <Heading py="1" fontSize="2xl" w="100%" textAlign="center">PROGRAM</Heading>
        <HStack py="1" w="100%" bg="primary.darkbox" space="0" alignItems="center">
          <Center alignItems="flex-start" w="10%">
            <IconButton
              p="0"
              w="40px"
              variant="transparent"
              icon={<Icon size="md" as={SimpleLineIcons} name="arrow-left" color="primary.text" />}
              onPress={()=>{
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
              onPress={()=>{
                console.log('hello')
              }}
            />
          </Center>
        </HStack>
        {[...Array(4)].map((item,k) => 
          <Box w="100%" key={k} borderBottomWidth={k===3 ? 0 : 1} borderColor="primary.text" py="2">
            <HStack pl="30px" alignItems="flex-start" minH="55px" space={0} justifyContent="flex-start">
              <Box position="absolute" left="0" top="0" w="15px">
                <ZStack>
                  {[...Array(k+1)].map((track,i) =>
                    <Box key={i} bg='red.600' borderWidth="1" borderColor="primary.darkbox" w="15px" mt={`${i*10}px`} h={`${55 - (i*10)}px`} borderRightRadius="10" shadow={2} />
                  )}
                </ZStack>
              </Box>
              <HStack pt="2" w="100%" space="5" alignItems="center" justifyContent="space-between">
                <VStack w="40px" space="0">
                  <Text lineHeight="22px">08:50</Text>
                  <Text lineHeight="22px">09:45</Text>
                </VStack>
      
                <Text lineHeight="22px" maxW={['62%','70%','40%']} alignSelf="flex-start">
                  First point in the agenda, with room for two lines of text.
                </Text>
                <Spacer />
                <Text fontSize="xs">Text</Text>
                
              </HStack>
            </HStack>
          </Box>)}
      </Container>
      {/*  */}


    </WebMainLayout>

  );
};

ProgramsLayout.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default ProgramsLayout;
