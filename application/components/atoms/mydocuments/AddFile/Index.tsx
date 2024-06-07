import React from 'react'
import { Box, Button, HStack, Input, Pressable, Text, View } from 'native-base'
import DynamicIcon from 'application/utils/DynamicIcon'

const AddFile = () => {
  return (
    <View width={'100%'} >
    <Text fontSize={'2xl'} fontWeight={'medium'} textAlign={'center'}>ADD FILES</Text>
    <HStack  bg={'primary.box'} borderWidth={1} rounded={'lg'} width={'100%'} flexDirection={'column'} p={'6'}>
       <Box width={'100%'} justifyContent={'space-between'} flexDirection={'row'} display={'flex'} alignItems={'center'}>
       <Text>File caption</Text>
       <Input  placeholder="Input" w="419" height={49} bg={'primary.soild'}/>
       </Box>
       <Box width={'100%'}  flexDirection={'row'} display={'flex'} alignItems={'center'} style={{ gap:16 }} mt={4}>
    <Text>Upload Document *</Text>
    <View flexDirection={'row'}  alignItems={'center'} style={{ gap:8 }}>
    <Button width={36} height={36} bg={'primary.box'} ml={1}>
    <DynamicIcon iconType={'upload'} iconProps={{width:16,height:16}}/>
    </Button>
    <Text>Installing Demyst’s Libraries.pdf</Text>
    <Pressable
    
      onPress={()=>{
        console.log('hello')
      }}
    
    >
    <DynamicIcon iconType={'close'} iconProps={{width:12,height:12}}/>
    </Pressable>
    
    </View>

       </Box>
    </HStack>
    
    </View>
  )
}

export default AddFile