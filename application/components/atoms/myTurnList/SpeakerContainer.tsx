import DynamicIcon from 'application/utils/DynamicIcon'
import { Text, Center, HStack, View, Avatar, Box, Pressable, Button } from 'native-base'
import React, { useState } from 'react'

const SpeakerContainer = () => {
  const [sendRequest,setSendRequest]=useState(false)
  return (
    <>
    <View rounded={'10px'} bg={'#2C74A0'}  width={'100%'} height={"202px"} flexDirection={'column'} justifyContent={'space-between'}>
    <View pl={'4'} pt={'4'} pr={'5'}>

     <HStack  alignItems="start" width={'100%'} justifyContent={'space-between'}>
        <Text fontSize={'sm'}>Delegate # : 6543</Text>
        <Box alignSelf={'flex-end'}>
        <Avatar bg="cyan.500" 
        width= "70px"
        height= "70px"
        source={{
      uri: "https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
    }}/>
        </Box>
        <Text fontSize={'sm'}>Network group: Students</Text>
     </HStack>
     <HStack  space="3" alignItems="center" flexDirection={'column'} pt={'8px'}>
        <Box flexDirection={'row'} alignItems={'center'}>
        <Text fontSize={'lg'} fontWeight={'medium'}>Stephen Hendry</Text>
        <Text fontSize={'lg'} fontWeight={'medium'} mx={'1'}>|</Text>
      <Text fontSize={'sm'}> Global INC - Social media Expert</Text>
        </Box>
      <Text fontSize={'sm'} pt={'4px'}>(Speaking now)</Text>
     </HStack>
    </View>

     <HStack bg={"#059DE0"}  height={'43px'} width={'100%'} justifyContent={'center'} roundedBottom={'10px'} alignItems={'center'}>
        <DynamicIcon iconType={'checkIn'} iconProps={{ width:24,height: 24 }}/>
       <Text fontSize={'2xl'} ml={'6px'} fontWeight={'semibold'}>12:45:63</Text>
     </HStack>
     
    </View>
    {/*  */}
    <View height={"105px"} bg={'primary.box'} rounded={'10px'} pl={'10px'} py={'5'} pr={'18px'} my={'14px'} width={'100%'} >
        <HStack justifyContent={'space-between'} width={'100%'} alignItems={'center'}>
    <Box flexDirection={'row'} alignItems={'center'}>
    <Avatar bg="cyan.500" 
        width= "64px"
        height= "64px"
        source={{
            uri: "https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
        }}/>
        <View flexDirection={'column'} ml={'14px'}>
       <Text fontWeight={'medium'} fontSize={'lg'}> Mike Hechson </Text>
        <Text fontWeight={'medium'} fontSize={'lg'}>Marketing sales person</Text>
        </View>
    </Box>
    <Box flexDirection={'row'} alignItems={'center'}>
      <Pressable
        mr={'4'}
        onPress={()=>{
          setSendRequest(true)
        }}
      
      >
   {!sendRequest? <DynamicIcon iconType={'hand'} iconProps={{ width: 20,height: 26}}/>
  :<Button maxWidth={'120px'} width={'100%'}>
<Text fontWeight={'semibold'} fontSize={'md'} isTruncated width={'100%'}>Cancel request</Text>
  </Button>
  }
      </Pressable>
      
    <Text  fontWeight={'medium'} fontSize={'lg'}># 05</Text>
    </Box>
    </HStack>
    </View>
    </>

  )
}

export default SpeakerContainer