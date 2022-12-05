import React from 'react'
import { Box, Center, HStack, Text } from 'native-base'
import IcoExhibitors from 'applications/app/assets/icons/IcoExhibitors'

type BoxProps = {
  image: HTMLElement,
  category: string,
  bg: string,
  speakers: number
}

const BoxItem = ({ image, category, bg, speakers }: BoxProps) => {
  return (
    <Box mb="3" w="100%" bg="primary.box" p="0" borderWidth="1" borderColor="primary.bdBox" rounded="10">
      {image && <Center pt="5" pb="3" px="1" alignItems="center" w="100%">
        {image}
      </Center>}
      <HStack pb="3" space="3" alignItems="center">
        <Center alignItems="flex-start" w="50%">
          {category && <Box bg={bg ? bg : 'primary.400'} borderWidth="1" borderColor="primary.bdBox" borderRightRadius="10" shadow="1" w="auto" px="2">
            <Text fontSize="xs">{category}</Text>
          </Box>}
        </Center>
        <Center pr="6" alignItems="flex-end" w="50%">
          {speakers && <HStack space="3" alignItems="center">
            <IcoExhibitors width="16" height="16" />
            <Text fontSize="md">{speakers}</Text>
          </HStack>}
        </Center>
      </HStack>
    </Box>
  )
}

export default BoxItem