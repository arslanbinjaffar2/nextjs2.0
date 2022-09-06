import * as React from 'react';
import PropTypes from 'prop-types';
import { Avatar, Box, Button, Container, Heading, HStack, Icon, Image, Input, Spacer, Text, VStack} from 'native-base';
import Master from '@src/screens/web/layouts/Master';
import {AntDesign} from '@expo/vector-icons';
import BoxItem from '@src/components/atoms/exhibitors/BoxItem';


type indexProps = {
  navigation: unknown
}

const Index = ({ navigation }: indexProps)  => {
  const [tab, setTab] = React.useState(true)
  return (
    <Master navigation={navigation}>
      <Container pt="2" maxW="100%" w="100%">
        <HStack mb="3" pt="2" w="100%" space="3" alignItems="center">
          <Text textTransform="uppercase" fontSize="2xl">Sponsors</Text>
          <Spacer />
          <Input  rounded="lg" w="60%" bg="primary.box" borderWidth={0} placeholder="Search" leftElement={<Icon ml="2" color="primary.text" size="lg" as={AntDesign} name="search1"  />}  />
        </HStack>
        <HStack mb="3" space={1} justifyContent="center" w="100%">
          <Button onPress={() => setTab(true)} borderWidth="1px" py={0} borderColor="primary.darkbox" borderRightRadius="0" borderLeftRadius={8} h="42px" bg={tab ? 'primary.box' : 'primary.darkbox'} w="50%" _text={{fontWeight: '600'}}>NAME</Button>
          <Button onPress={() => setTab(false)} borderWidth="1px" py={0} color="primary.100" borderColor="primary.darkbox" borderLeftRadius="0" borderRightRadius={8} h="42px" bg={!tab ? 'primary.box' : 'primary.darkbox'} w="50%" _text={{fontWeight: '600'}}>CATEGORY</Button>
        </HStack>
        <>
          <HStack direction="row" flexWrap="wrap" space="0" alignItems="flex-start">
            <Box w="49%">
              <BoxItem
                image={<Image source={{ uri: 'https://wallpaperaccess.com/full/31751.jpg' }} alt="Alternate Text" w="210px" h="72px" />}
                category="Technology"
                bg="#E03C30"
                speakers={109}
              />
            </Box>
            <Spacer w="2%" />
            <Box w="49%">
              <BoxItem
                image={<Image source={{ uri: 'https://wallpaperaccess.com/full/31751.jpg' }} alt="Alternate Text" w="210px" h="72px" />}
                category="Technology"
                bg="#E03C30"
                speakers={109}
              />
            </Box>
            <Box w="49%">
              <BoxItem
                image={<Image source={{ uri: 'https://wallpaperaccess.com/full/31751.jpg' }} alt="Alternate Text" w="210px" h="72px" />}
                category="Technology"
                bg="#E03C30"
                speakers={109}
              />
            </Box>
          </HStack>
        
        
          
        </>
        <>
          {!tab && <Box mb="3" w="100%" overflow="hidden" bg="primary.box" p="0" rounded="lg">
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
