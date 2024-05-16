import React from 'react'
import CustomNotes from '../../../atoms/myNotes/customNotes'
import { Modal, View, VStack } from 'native-base'

const Details = () => {
  return (
    <>
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