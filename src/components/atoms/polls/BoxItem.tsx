import React from 'react'
import { Box, HStack, Text, VStack } from 'native-base'

const BoxItem = () => {
  return (
    <Box w="100%" borderBottomWidth='1' borderColor="primary.text" py="2">
      <HStack pt="2" w="100%" space="3" alignItems="flex-start" justifyContent="space-between">
        <VStack  space="5">
          <Text fontSize="lg">Text</Text>
        </VStack>
				
      </HStack>
    </Box>
    
  )
}

export default BoxItem