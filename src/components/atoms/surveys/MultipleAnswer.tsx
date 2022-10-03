import React from 'react';
import { Box, Checkbox, Divider, Text, VStack } from 'native-base';
type PropTypes = {
    title: string,
    req: boolean
}

const MultipleAnswer = ({title, req}: PropTypes) => {
  return (
    <Box w="100%" mb="3">
      <Text mb="3" maxW="80%" fontSize="lg">{title} {req && <Text display="inline"  color="red.500">*</Text>}</Text>
      <Divider mb="5" opacity={0.27} bg="primary.text" />
      <VStack space="4">
        {[...Array(5)].map((item,k) =>
          <Checkbox key={k} size="md" value="checkbox">weights and functional training</Checkbox>
        )}
      </VStack>
    </Box>
  )
}

export default MultipleAnswer