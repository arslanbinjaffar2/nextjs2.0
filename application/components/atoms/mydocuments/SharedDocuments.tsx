import DynamicIcon from 'application/utils/DynamicIcon'
import { Avatar, Box, HStack, Pressable, Text, View, VStack } from 'native-base'
import React from 'react'
import FileIconByType from '../documents/FileIconByType'

const SharedDocument = () => {
  return (
    <>
    <VStack  bg={'primary.box'} width={'100%'} py={'5'} rounded={'10px'}>
        {new Array(5).fill('').map((_,index,arr)=>{
            return(
                <Box borderBottomWidth={index !== arr.length-1 ? 2 : 0}  width={'100%'}>
                <SingleSharedDocument key={index}/>
                </Box>
            )
        })}
    </VStack>
    
    </>
  )
}

export default SharedDocument



function SingleSharedDocument() {
    return(
        <>
        <HStack justifyContent={'space-between'} width={'100%'} alignItems={'center'} pl={'4'} pr={'5'} py={'4'}>
        <View flexDirection={'row'} alignItems={'flex-start'}>
        <FileIconByType type={"pdf"} />
          <Box ml={3}>
            <Text fontWeight={'medium'}>Project status report doc.pdf</Text>
            <Text fontSize={'xs'} fontWeight={'medium'} pt={'6px'}>389.0 KB | 14-03-2024</Text>
          </Box>
        </View>
        <View flexDirection={'row'}  alignItems={'center'}>
            <Pressable
               
                onPress={()=>{
                    console.log('hello')
                }}
            
            >
            <DynamicIcon iconType="download_2" iconProps={{ width:16, height:16 }} />
            </Pressable>
          
        </View>
    </HStack>
        </>
    )
}

