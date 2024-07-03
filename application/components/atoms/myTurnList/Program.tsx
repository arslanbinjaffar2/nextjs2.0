import React from 'react'
import { HStack, Text, Box, VStack } from 'native-base'
import { Program } from 'application/models/program/Program';
import { colorText } from 'application/styles/colors'


const ProgramContainer = ({ details }: { details: Program }) => {
  return (
    <>
      <Box w="100%" py="3" bg={'primary.box'} rounded={'10px'} mb={'14px'}>
        <HStack width={"100%"} px="4" alignItems="center" minH="55px" space={0} justifyContent="flex-start">
          <HStack pt="0" w="100%" space="5" alignItems="center" justifyContent="space-between">
            <VStack space="1" width={'100%'}>
              <Text fontSize="md" lineHeight="22px" textBreakStrategy='simple' >
                {details?.info?.topic}
              </Text>
            </VStack>
          </HStack>
        </HStack>
        <HStack px={4} alignItems="flex-start" justifyContent={'flex-start'} display={'flex'} flexWrap={'wrap'}>
          {details?.program_tracks?.length > 0 && details?.program_tracks.map((category: any, i: number) =>
            <Box borderColor={'primary.box'} borderWidth={1} rounded={'full'} bg={category.color} px={4} py={1} my={1} mr={2} key={i}>
              <Text color={colorText(category.color)} lineHeight={'sm'} fontSize="sm">{`${category.name}`}</Text>
            </Box>
          )}
        </HStack>
      </Box>

    </>
  )
}

export default ProgramContainer