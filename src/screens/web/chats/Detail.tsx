import * as React from 'react';
import PropTypes from 'prop-types';
import { Avatar, Box, Button, Center, Container, Heading, HStack, Icon, IconButton, Image, Input, ScrollView, Spacer, Text, TextArea, VStack} from 'native-base';
import Master from '@src/screens/web/layouts/Master';
import {AntDesign,Entypo,Feather } from '@expo/vector-icons';


type indexProps = {
  navigation: unknown
}

const Detail = ({ navigation }: indexProps)  => {
  return (
    <Master navigation={navigation}>
      <Container pt="2" maxW="100%" w="100%">
        <HStack mb="3" pt="2" w="100%" space="3" alignItems="center">
          <HStack  space="3" alignItems="center">
            <Icon as={AntDesign} name="arrowleft" size="xl" color="primary.text"  />
            <Text  fontSize="2xl">BACK</Text>
          </HStack>
          <Spacer />
          <Text isTruncated pr="6" fontSize="lg">Janet Fowler</Text>
          <Spacer />
          <Avatar
            source={{
              uri:'https://pbs.twimg.com/profile_images/1369921787568422915/hoyvrUpc_400x400.jpg'
            }}
            
          >
            SS
            <Avatar.Badge borderWidth="1" bg="red.500"  />
            
          </Avatar>
          
        </HStack>
        <VStack mb="3" overflow="hidden" bg="primary.box" rounded="10" w="100%" space="0">
          <ScrollView w="100%" minH="450px" py="4" px="3">
            <HStack mb="3" space="0" alignItems="flex-end">
              <Avatar
                source={{
                  uri:'https://pbs.twimg.com/profile_images/1369921787568422915/hoyvrUpc_400x400.jpg'
                }}
                
              >
                SS
                <Avatar.Badge borderWidth="1" bg="green.500"  />
              </Avatar>
              <VStack ml="3" maxW="320" px="3" py="3" rounded="10" borderBottomLeftRadius="0" bg="primary.darkbox" space="1">
                <Text lineHeight="sm" pr="3" fontSize="lg">Hello John, what are you going to do this weekend?</Text>
                <Text opacity="0.8" fontSize="md">17:45</Text>
              </VStack>
              
            </HStack>
            <HStack direction="row-reverse" mb="3" space="0" alignItems="flex-end">
              <Avatar
                source={{
                  uri:'https://pbs.twimg.com/profile_images/1369921787568422915/hoyvrUpc_400x400.jpg'
                }}
                
              >
                SS
                <Avatar.Badge borderWidth="1" bg="green.500"  />
              </Avatar>
              <VStack mr="3" maxW="320" px="3" py="3" rounded="10" borderBottomRightRadius="0" bg="#3F89D0" space="1">
                <Text lineHeight="sm" pr="3" fontSize="lg">Nothing planned, and you?</Text>
                <Text opacity="0.8" textAlign="right" fontSize="md">17:45</Text>
              </VStack>
              
            </HStack>
            
          </ScrollView>
          <Center w="100%" maxW="100%">
            <HStack px="4" py="1" mb="0" bg="primary.darkbox" w="100%" space="2" alignItems="center">
              <Icon size="md" as={Entypo} name="new-message" color="primary.text" />
              <Text fontSize="lg">Write Message </Text>
            </HStack>
            <VStack p="1" w="100%" space="0">
              <TextArea borderWidth="0" borderColor="transparent" fontSize="lg" boxShadow="none" _focus={{bg: 'transparent', borderColor: 'transparent' ,boxShadow: 'none'}} _hover={{borderWidth: 0,boxShadow: 'none',borderColor: 'transparent' }} rounded="10" varient="unstyled" w="100%" p="4" placeholder="Your message…"  />
              <HStack  mb="1" w="100%" space="1" alignItems="flex-end" justifyContent="flex-end">
                <IconButton
                  variant="transparent"
                  icon={<Icon size="lg" as={Entypo} name="emoji-happy" color="primary.text" />}
                  onPress={()=>{
                    console.log('hello')
                  }}
                  
                />
                <IconButton
                  variant="transparent"
                  icon={<Icon size="lg" as={Entypo} name="attachment" color="primary.text" />}
                  onPress={()=>{
                    console.log('hello')
                  }}
                  
                />
                <IconButton
                  variant="transparent"
                  icon={<Icon size="lg" as={Feather} name="send" color="primary.text" />}
                  onPress={()=>{
                    console.log('hello')
                  }}
                  
                />
                
                
              </HStack>
              
            </VStack>
            
            
          </Center>
          
        </VStack>
        <Image
          source={{
            uri:'https://wallpaperaccess.com/full/311401.jpg'
          }}
          alt="Alternate Text"
          w="100%"
          h="150px"
          rounded="10"
          
        />
        
      </Container>
      
    </Master>
  );
};

Detail.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default Detail;
