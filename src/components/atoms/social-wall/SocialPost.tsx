import React from 'react'
import { Avatar, Box, HStack, VStack, Text, Image, Spacer, IconButton, Button, Divider } from 'native-base'
import IcoLike from '@src/assets/icons/Icolike'
import IcoMessage from '@src/assets/icons/IcoMessage'
import IcoSharePost from '@src/assets/icons/IcoSharePost'
import IcoMessagealt from '@src/assets/icons/IcoMessagealt'
import Icolikealt from '@src/assets/icons/Icolikealt'

const  SocialPost = () => {
  return (
    <Box mb="3" borderWidth="1" borderColor="primary.bdBox" w="100%" bg="primary.box" p="4" rounded="10px" overflow="hidden">
      <VStack  space="3">
        <HStack  space="3" alignItems="center">
          <Avatar
            borderWidth={1}
            borderColor="primary.text"
            size="md"
            source={{
              uri:'https://pbs.twimg.com/profile_images/1369921787568422915/hoyvrUpc_400x400.jpg'
            }}
            
          >
            SS
          </Avatar>
          <VStack  space="0" >
            <Text  fontSize="lg" fontWeight="600">Mike Zanita</Text>
            <Text  fontSize="sm">3 days ago</Text>
          </VStack>
          
        </HStack>
        <Text mb="3" fontSize="md">Technology, the application of scientific knowledge to the practical aims of human life or, as it is sometimes phrased,to the change </Text>

        <Image
          source={{
            uri:'https://wallpaperaccess.com/full/3175001.jpg'
          }}
          alt="Alternate Text"
          w="100%"
          h="295px"
          rounded="10"
          mb="2"
              
        />
        <HStack pb="3" borderBottomWidth="1" borderBottomColor="primary.text" space="3" alignItems="center">
          <HStack  space="2" alignItems="center">
            <IconButton
              variant="unstyled"
              icon={<IcoLike width="18px" height="18px" />}
              onPress={()=>{
                console.log('hello')
              }}
              
            />
            <IconButton
              variant="unstyled"
              icon={<IcoMessage width="18px" height="18px" />}
              text="text"
              onPress={()=>{
                console.log('hello')
              }}
              
            />
            <IconButton
              variant="unstyled"
              icon={<IcoSharePost width="18px" height="15px" />}
              onPress={()=>{
                console.log('hello')
              }}
              
            />
            
            
          </HStack>
          <Spacer />
          <HStack  space="3" alignItems="center">
            <HStack  space="1" alignItems="center">
              <Text fontSize="sm">5</Text>
              <Icolikealt />
            </HStack>
            <Divider type="vertical" w="1px" h="10px" bg="primary.text" />
            
            <HStack  space="1" alignItems="center">
              <Text fontSize="sm">5</Text>
              <IcoMessagealt />
            </HStack>
            
            
          </HStack>
          
        </HStack>
        
        <HStack  space="3" alignItems="center">
          <Avatar
            borderWidth={1}
            borderColor="primary.text"
            size="sm"
            source={{
              uri:'https://pbs.twimg.com/profile_images/1369921787568422915/hoyvrUpc_400x400.jpg'
            }}
            
          >
            SS
          </Avatar>
          <VStack  space="0" >
            <Text  fontSize="md" fontWeight="600">Mike Zanita</Text>
            <Text  fontSize="sm">3 days ago</Text>
          </VStack>
          
        </HStack>    
        
      </VStack>
      
    </Box>
   
  )
}

export default SocialPost