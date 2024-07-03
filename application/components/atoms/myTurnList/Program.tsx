import React from 'react'
import { HStack, Text, Box, VStack } from 'native-base'
import { Program } from 'application/models/program/Program';
import { colorText } from 'application/styles/colors'
import moment from 'moment';
import { GENERAL_TIME_FORMAT_WITHOUT_SECONDS } from 'application/utils/Globals'
import UseEventService from 'application/store/services/UseEventService';


const ProgramContainer = ({ details }: { details: Program }) => {
  const { event } = UseEventService()
  return (
    <>
      <Box w="100%" py="3" bg={'primary.box'} rounded={'10px'} mb={'14px'}>
        <HStack width={"100%"} px="4" alignItems="center" minH="55px" space={0} justifyContent="flex-start">
          <HStack pt="0" w="100%" space="5" alignItems="center" justifyContent="space-between">
            <VStack w={["45px", "60px"]} space="0">
              {(event.agenda_settings?.agenda_display_time == 1 && details?.hide_time == 0) && <>
                <Text lineHeight="22px">{moment(`${details.info.date} ${details.info.start_time}`, 'DD-MM-YYYY HH:mm:ss').format(GENERAL_TIME_FORMAT_WITHOUT_SECONDS)}</Text>
                <Text lineHeight="22px">{moment(`${details.info.date} ${details.info.end_time}`, 'DD-MM-YYYY HH:mm:ss').format(GENERAL_TIME_FORMAT_WITHOUT_SECONDS)}</Text>
              </>}
            </VStack>
            <VStack maxW={['calc(100% - 148px)', 'calc(100% - 100px)']} space="1" width={'100%'}>
              <Text fontSize="md" lineHeight="22px" textBreakStrategy='simple' >
                {details?.info?.topic}
              </Text>
              <HStack alignItems="flex-start" justifyContent={'flex-start'} display={'flex'} flexWrap={'wrap'}>
                {details?.program_tracks?.length > 0 && details?.program_tracks.map((category: any, i: number) =>
                  <Box borderColor={'primary.box'} borderWidth={1} rounded={'full'} bg={category.color} px={4} py={1} my={1} mr={2} key={i}>
                    <Text color={colorText(category.color)} lineHeight={'sm'} fontSize="sm">{`${category.name}`}</Text>
                  </Box>
                )}
              </HStack>
            </VStack>
          </HStack>
        </HStack>

      </Box>

    </>
  )
}

export default ProgramContainer