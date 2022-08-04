import React from 'react';
import { Center, Flex, HStack, Text, VStack } from 'native-base';
type AppProps = {
  title: string,
  icon: HTMLElement
}

const HeadingBox = ({ title, icon }: AppProps) => {
  return (
    <Flex mb="3" alignItems="flex-start" w="100%" flexDirection="row" space="5">
      <Center alignItems="flex-start" w="100%">
        <HStack alignItems="center" space="3">
          {icon}<Text fontSize="xl">{title}</Text>
        </HStack>
      </Center>
    </Flex>
    
  )
}

export default HeadingBox