import React from 'react';
import { Box, Center, Checkbox, Divider, HStack, Radio, Text, TextArea, VStack } from 'native-base';
import Icodocument from 'app/assets/icons/small/Icodocument';

type PropTypes = {
  title: string,
  req: boolean
}

const SingleAnswer = ({ title, req }: PropTypes) => {
  return (
    <Center maxW="100%" w="100%" mb="0">
      <Box mb="3" py="3" px="4" w="100%">
        <Text fontWeight="600" mb="3" maxW="80%" fontSize="lg">{title} {req && <Text display="inline" color="red.500">*</Text>}</Text>
        <Divider mb="5" opacity={0.27} bg="primary.text" />
        <Radio.Group space="5" name="MyRadioGroup">
          {[...Array(5)].map((item, k) =>
            <Radio key={k} value={`one-${k}`}>Answer number -{k}</Radio>
          )}
        </Radio.Group>
      </Box>
      <HStack px="3" py="1" bg="primary.darkbox" w="100%" space="3" alignItems="center">
        <Icodocument width="15px" height="18px" />
        <Text fontSize="lg">Write comment</Text>
      </HStack>
      <Box py="3" px="4" w="100%">
        <TextArea
          p="0"
          h="30px"
          overflow="auto"
          focusOutlineColor="transparent"
          _focus={{ bg: 'transparent' }}
          borderWidth="0" fontSize="md" placeholder="Please write your comment here …" autoCompleteType={undefined} />
      </Box>
    </Center>
  )
}

export default SingleAnswer