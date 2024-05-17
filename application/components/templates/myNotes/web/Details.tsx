import React from 'react'
import CustomNotes from '../../../atoms/myNotes/customNotes'
import {HStack, Icon, Input, Spacer, Text, View, VStack } from 'native-base'
import { UseEventService } from 'application/store/services';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useRouter } from 'next/router';
const Details = () => {
  const { event } = UseEventService();
  const router = useRouter();
  const { type } = router.query;
    const Moduletype:any=type
  return (
    <>
    <HStack display={["block","flex"]} mb="3" pt="2" w="100%" space="3" alignItems="center">
                <Text fontSize="2xl">
                {Moduletype}
                </Text>
                <Spacer />
                <Input rounded="10" w={['100%','60%']} bg="primary.box" borderWidth={0} 
                borderColor={'transparent'}
                placeholder={event.labels?.GENERAL_SEARCH} onChangeText={(text: string) => {
                  
                }} leftElement={<Icon ml="2" color="primary.text" size="lg" as={AntDesign} name="search1" />} />
  </HStack>
    <VStack bg={"primary.box"} rounded={'10px'}>
        {new Array(5).fill('').map((item,key,arr)=>
        <>
            <CustomNotes/>
            {arr.length - 1 > key && (
            <View borderBottomColor={'primary.border'} borderBottomWidth={1} />
          )}
            
            
        </>
            )}
    </VStack>
   
    </>
  )
}

export default Details