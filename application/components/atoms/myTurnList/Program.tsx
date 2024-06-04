import React, { useEffect } from 'react'
import { Pressable, HStack, ZStack, View, IconButton, Text, Box, VStack, Center } from 'native-base'
import { Platform } from 'react-native';
import UseEventService from 'application/store/services/UseEventService';
import UseLoadingService from 'application/store/services/UseLoadingService';
import moment from 'moment';
import { Program } from 'application/models/program/Program';
import { GENERAL_TIME_FORMAT_WITHOUT_SECONDS } from 'application/utils/Globals';


const ProgramContainer = ({ details }: { details: Program }) => {
  const { event } = UseEventService();

  return (
    <>
      <Box w="100%" py="3" bg={'primary.box'} rounded={'10px'} mb={'14px'}>
        <HStack pl="30px" alignItems="center" minH="55px" space={0} justifyContent="flex-start">
          <Box width={['35px', '35px']} h={'55px'} ml="-30px">
            {Platform.OS === 'web' && details?.program_tracks && event?.agenda_settings?.show_tracks == 1 && <Box width={['35px', '35px']} h={'55px'} ml="-30px">
              <ZStack top={'50%'} mt={`-${details.program_tracks.slice(0, 3).length === 3 ? 10 : details.program_tracks.slice(0, 3).length === 2 ? 20 : 30}px`} reversed>
                {details?.program_tracks?.length > 0 && details.program_tracks.slice(0, 3).map((track: any, i: number) =>
                  <Box key={i} bg={track.color ? track.color : '#fff'} borderWidth="1" borderColor="primary.darkbox" w={'15px'} top={`-${i * 10}px`} height={`${i === 0 && details?.program_tracks?.length === 1 ? '55px' : '35px'}`} borderRightRadius="10" shadow={2} />
                )}
              </ZStack>
            </Box>}
          </Box>
          <HStack pt="0" w="100%" space="5" alignItems="center" >
            <VStack w={["45px", "60px"]} space="0">
              {(event.agenda_settings?.agenda_display_time == 1 && details?.hide_time == 0) && <>
                <Text lineHeight="22px">{moment(`${details.info.date} ${details.info.start_time}`, 'DD-MM-YYYY HH:mm:ss').format(GENERAL_TIME_FORMAT_WITHOUT_SECONDS)}</Text>
                <Text lineHeight="22px">{moment(`${details.info.date} ${details.info.end_time}`, 'DD-MM-YYYY HH:mm:ss').format(GENERAL_TIME_FORMAT_WITHOUT_SECONDS)}</Text>
              </>}
            </VStack>
            <VStack maxW={['calc(100% - 148px)', 'calc(100% - 100px)']} space="1" >

              <Text fontSize="md" lineHeight="22px">
                {details?.info?.topic}
              </Text>

            </VStack>


          </HStack>
        </HStack>
      </Box>

    </>
  )
}

export default ProgramContainer