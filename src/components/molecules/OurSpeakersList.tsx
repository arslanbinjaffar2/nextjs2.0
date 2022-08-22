/* eslint-disable @typescript-eslint/no-unsafe-call */
import React from 'react';
import { SimpleLineIcons  } from '@expo/vector-icons'
import { Avatar, Box, Button, Center, HStack,  Icon,  IconButton, Pressable, Spacer, Text, VStack } from 'native-base'
import IcoLike from '@src/assets/icons/Icolike';
import { useState } from 'react';
import IcoRaiseHand from '@src/assets/icons/IcoRaiseHand';

type BoxProps = {
  border: number
}
type ListProps = {}
const SpeakerList = () => {
  return (
    <React.Fragment>
      <HStack bg="primary.box" py="5" mb="2" rounded="lg" px="3" w="100%" space="0" alignItems="center" justifyContent="space-between">
        <Center alignItems="flex-start" w="60%" p="0">
          <HStack  space="3" alignItems="center">
            <Avatar
              source={{
                uri:'https://pbs.twimg.com/profile_images/1369921787568422915/hoyvrUpc_400x400.jpg'
              }}
            
            >
            SS
            </Avatar>
            <VStack  space="0">
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
            onPress={()=>{console.log('hello')}}
          />
          <Text fontSize="lg"># 05</Text>
        </HStack>
      
      </HStack>
      <Box mb="2" p="0">
        <Text fontSize="lg">Total Speakers :30</Text>
      </Box>
      <Box w="100%" mb="3" bg="primary.box" p="0" rounded="lg">
        {[...Array(5)].map( (k,i) => 
          <HStack key={i} borderBottomWidth={ i === 4 ? '0' : '1px'} borderColor="primary.text" px="3" py="3" w="100%" space="0" alignItems="center">
            <Center alignItems="flex-start" w="70%" p="0">
              <HStack  space="3" alignItems="center">
                <Avatar
                  source={{
                    uri:'https://pbs.twimg.com/profile_images/1369921787568422915/hoyvrUpc_400x400.jpg'
                  }}
            
                >
            SS
                </Avatar>
                <VStack  space="0">
                  <Text fontSize="lg">Stephen Hendry</Text>
                  <Text fontSize="lg">Global INC - Social media Expert</Text>
                </VStack>
          
              </HStack>
        
            </Center>
            <Spacer />
            <Center p="0">
              <Icon as={SimpleLineIcons} name="arrow-right" size="md" color="primary.text"  />
            </Center>
          
          </HStack>)}
      </Box>
      
    </React.Fragment>
  )
}

const BoxList = ({border}: BoxProps) => {
  return (
    <Box w="100%" borderBottomWidth={border} borderColor={border === 1 ? 'primary.text' : 'transparent'} py="3">
      <HStack px="3" w="100%" space="0" alignItems="center" justifyContent="space-between">
        <Center alignItems="flex-start" w="60%" p="0">
          <HStack  space="3" alignItems="center">
            <Avatar
              source={{
                uri:'https://pbs.twimg.com/profile_images/1369921787568422915/hoyvrUpc_400x400.jpg'
              }}
            
            >
            SS
            </Avatar>
            <VStack  space="0">
              <Text fontSize="lg">Stephen Hendry</Text>
              <Text fontSize="lg">This is my question</Text>
            </VStack>
          
          </HStack>
        
        </Center>
        <Spacer />
        <HStack w="120px" space="3" alignItems="center">
          <IconButton
            variant="transparent"
            icon={<IcoLike width={26} height={24} />}
            onPress={()=>{console.log('hello')}}
          />
          <Spacer />
          <Text fontSize="lg">3 min</Text>
        
        </HStack>
      
      </HStack>
    </Box>
  )
}

const OurSpeakersList = () => {
  const [tab, setTab] = useState(true)
  return (
    <>
      <HStack mb="3" space={1} justifyContent="center" w="100%">
        <Button onPress={() => setTab(true)} borderWidth="1px" py={0} borderColor="primary.darkbox" borderRightRadius="0" borderLeftRadius={8} h="42px" bg={tab ? 'primary.box' : 'primary.darkbox'} w="50%" _text={{fontWeight: '600'}}>Q & A</Button>
        <Button onPress={() => setTab(false)} borderWidth="1px" py={0} color="primary.100" borderColor="primary.darkbox" borderLeftRadius="0" borderRightRadius={8} h="42px" bg={!tab ? 'primary.box' : 'primary.darkbox'} w="50%" _text={{fontWeight: '600'}}>SPEAKERS LIST</Button>
      </HStack>
      {tab && <React.Fragment>
        <HStack mb="3" space="10" alignItems="center">
          <Pressable
            p="0"
            borderWidth="0"
            onPress={()=>{console.log('hello')}}>
            <Text opacity="1" fontSize="md" bold underline>RECENT</Text>
          </Pressable>
          <Pressable
            p="0"
            borderWidth="0"
            onPress={()=>{console.log('hello')}}>
            <Text opacity="0.5" fontSize="md">POPULAR</Text>
          </Pressable>
          <Pressable
            p="0"
            borderWidth="0"
            onPress={()=>{console.log('hello')}}>
            <Text opacity="0.5" fontSize="md">ARCHIVE</Text>
          </Pressable>
        </HStack>
        <Box mb="3" w="100%" bg="primary.box" p="0" rounded="lg">
          {[...Array(5)].map((i:number,k:number) =>
            <React.Fragment key={k}>
              <BoxList border={k === 4 ? 0 : 1} />
            </React.Fragment>
          )}
        </Box>
      </React.Fragment>}
      {!tab &&  <React.Fragment>
        <SpeakerList />
      </React.Fragment>}
    </>
    
  )
}

export default OurSpeakersList