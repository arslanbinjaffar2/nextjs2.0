import * as React from 'react';
import PropTypes from 'prop-types';
import { Avatar, Box, Button, Container, Heading, HStack, Icon, Image, Input, Spacer, Text, VStack} from 'native-base';
import Master from 'application/screens/web/layouts/Master';
import AntDesign from '@expo/vector-icons/AntDesign';


type indexProps = {
  navigation: unknown
}

const Index = ({ navigation }: indexProps)  => {
  const [tab, setTab] = React.useState(true)
  return (
    <Master navigation={navigation}>
      <Container pt="2" maxW="100%" w="100%">
        <HStack mb="3" pt="2" w="100%" space="3" alignItems="center">
          <Text textTransform="uppercase" fontSize="2xl">Chats</Text>
          <Spacer />
          <Input  rounded="10" w="60%" bg="primary.box" borderWidth={0} placeholder="Search" leftElement={<Icon ml="2" color="primary.text" size="lg" as={AntDesign} name="search1"  />}  />
        </HStack>
        <HStack mb="3" space={1} justifyContent="center" w="100%">
          <Button onPress={() => setTab(true)} borderWidth="1px" py={0} borderColor="primary.darkbox" borderRightRadius="0" borderLeftRadius={8} h="42px" bg={tab ? 'primary.box' : 'primary.darkbox'} w="50%" _text={{fontWeight: '600'}}>CHATS</Button>
          <Button onPress={() => setTab(false)} borderWidth="1px" py={0} color="primary.100" borderColor="primary.darkbox" borderLeftRadius="0" borderRightRadius={8} h="42px" bg={!tab ? 'primary.box' : 'primary.darkbox'} w="50%" _text={{fontWeight: '600'}}>ATTENDEE GROUPS</Button>
        </HStack>
        <>
          {tab && <>
            <Box mb="3" w="100%" overflow="hidden" bg="primary.box" p="0" rounded="10">
              <HStack borderBottomWidth="1" borderColor="primary.text" w="100%" p="4" space="5">
                <Avatar
                  source={{
                    uri:'https://pbs.twimg.com/profile_images/1369921787568422915/hoyvrUpc_400x400.jpg'
                  }}
                >
                SS
                  <Avatar.Badge borderWidth="1" bg="green.500" />
                </Avatar>
                <VStack  space="0">
                  <Heading fontSize="lg">Janet Fowler</Heading>
                  <Text isTruncated fontSize="md" opacity="0.6">I’m going to San Francisco</Text>
                </VStack>
                <Spacer />
                <VStack alignItems="flex-end" space="2">
                  <Text opacity="0.6" fontSize="md">now</Text>
                  <Avatar.Badge position="static" borderWidth="0" bg="green.500" size={4} />
                </VStack>
              </HStack>
              <HStack borderBottomWidth="1" borderColor="primary.text" w="100%" p="4" space="5">
                <Avatar
                  source={{
                    uri:'https://pbs.twimg.com/profile_images/1369921787568422915/hoyvrUpc_400x400.jpg'
                  }}
                >
                HS
                  <Avatar.Badge borderWidth="1" bg="red.500" />
                </Avatar>
                <VStack  space="0">
                  <Heading fontSize="lg">Jason Boyd</Heading>
                  <Text isTruncated fontSize="md" opacity="0.6">Sound goods.</Text>
                </VStack>
                <Spacer />
                <VStack alignItems="flex-end" space="2">
                  <Text opacity="0.6" fontSize="md">16:00</Text>
                </VStack>
              
              </HStack>
              <HStack borderBottomWidth="1" borderColor="primary.text" w="100%" p="4" space="5">
                <Avatar
                  source={{
                    uri:'https://pbs.twimg.com/profile_images/1369921787568422915/hoyvrUpc_400x400.jpg'
                  }}
                >
                SS
                </Avatar>
                <VStack  space="0">
                  <Heading fontSize="lg">Nicholas Dunn</Heading>
                  <Text isTruncated fontSize="md" opacity="0.6">See you there!</Text>
                </VStack>
                <Spacer />
                <VStack alignItems="flex-end" space="2">
                  <Text opacity="0.6" fontSize="md">18:00</Text>
                </VStack>
              </HStack>
              <HStack borderBottomWidth="0" borderColor="primary.text" w="100%" p="4" space="5">
                <Avatar
                  source={{
                    uri:'https://pbs.twimg.com/profile_images/1369921787568422915/hoyvrUpc_400x400.jpg'
                  }}
                >
                SS
                </Avatar>
                <VStack  space="0">
                  <Heading fontSize="lg">Janet Fowler</Heading>
                  <Text isTruncated fontSize="md" opacity="0.6">I’m going to San Francisco</Text>
                </VStack>
                <Spacer />
                <VStack alignItems="flex-end" space="2">
                  <Text opacity="0.6" fontSize="md">21:00</Text>
                  <Avatar.Badge position="static" borderWidth="0" bg="primary.secondary" size={4} />
                </VStack>
              </HStack>
            </Box>
            <Box alignItems="center" w="100%">
              <Button
                maxW="350px"
                w="100%"
                _text={{fontSize: 'xl',fontWeight: '600'}}
                colorScheme="primary"
                onPress={()=>{
                  console.log('hello')
                }}
              >
                NEW CHAT
              </Button>     
            </Box> 
          </>}
        </>
        <>
          {!tab && <Box mb="3" w="100%" overflow="hidden" bg="primary.box" p="0" rounded="10">
            <HStack borderBottomWidth="1" borderColor="primary.text" w="100%" p="4" space="5">
              <Avatar
                source={{
                  uri:'https://pbs.twimg.com/profile_images/1369921787568422915/hoyvrUpc_400x400.jpg'
                }}
                
              >
                EB
              </Avatar>
              <VStack  space="0">
                <Heading fontSize="lg">Event Buizz</Heading>
                <Text isTruncated fontSize="md" opacity="0.6">Mike, Alex, Christian and 3 others</Text>
              </VStack>
              <Spacer />
              <VStack alignItems="flex-end" space="2">
                <Text opacity="0.6" fontSize="md">now</Text>
              </VStack>
              
            </HStack>
            <HStack borderBottomWidth="1" borderColor="primary.text" w="100%" p="4" space="5">
              <Avatar
                source={{
                  uri:'https://pbs.twimg.com/profile_images/1369921787568422915/hoyvrUpc_400x400.jpg'
                }}
                
              >
                EB
              </Avatar>
              <VStack  space="0">
                <Heading fontSize="lg">Event Buizz</Heading>
                <Text isTruncated fontSize="md" opacity="0.6">Mike, Alex, Christian and 3 others</Text>
              </VStack>
              <Spacer />
              <VStack alignItems="flex-end" space="2">
                <Text opacity="0.6" fontSize="md">now</Text>
              </VStack>
              
            </HStack>
            <HStack borderBottomWidth="0" borderColor="primary.text" w="100%" p="4" space="5">
              <Avatar
                source={{
                  uri:'https://pbs.twimg.com/profile_images/1369921787568422915/hoyvrUpc_400x400.jpg'
                }}
                
              >
                HS
              </Avatar>
              <VStack  space="0">
                <Heading fontSize="lg">Jason Boyd</Heading>
                <Text isTruncated fontSize="md" opacity="0.6">Sound goods.</Text>
              </VStack>
              <Spacer />
              <VStack alignItems="flex-end" space="2">
                <Text opacity="0.6" fontSize="md">16:00</Text>
              </VStack>
              
            </HStack>
          </Box>}
          
        </>
      </Container>
      
    </Master>
  );
};

Index.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default Index;
