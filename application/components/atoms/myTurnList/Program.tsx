import React, { useEffect } from 'react'
import { Pressable ,HStack,ZStack,View, IconButton,Text,Box,VStack,Center} from 'native-base'
import UseEventService from 'application/store/services/UseEventService';
import UseProgramService from 'application/store/services/UseProgramService';
import UseLoadingService from 'application/store/services/UseLoadingService';
import moment from 'moment';
const ProgramContainer = ({id}:{id:any}) => {
    const { event } = UseEventService();  
    const { programs} = UseProgramService();
    const program=programs.find((program:any)=>program.id);
  return(
    <>
               <Box w="100%"  py="3" bg={'primary.box'} rounded={'10px'} mb={'14px'}>
              <HStack pl="30px" alignItems="center" minH="55px" space={0} justifyContent="flex-start">
                <Box  width={['35px','35px']} h={'55px'} ml="-30px">
                    <ZStack top={'50%'} mt={`-20px`}  reversed height={"100%"}>  
                        <Box  bg={'#F5B761'} borderWidth="1" borderColor="primary.darkbox" w={'15px'} top={`-10px`}   height={"100%"} borderRightRadius="10" shadow={2} />
                    </ZStack>
                  </Box>
                <HStack pt="0" w="100%" space="5" alignItems="center" >
                <VStack w={["45px","60px"]} space="0">
                      {/* {(event.agenda_settings?.agenda_display_time == 1 && program?.hide_time == 0)  &&<>
                      <Text lineHeight="22px">{moment(`${program.info.date} ${program.start_time}`).format('HH:mm')}</Text>
                      <Text lineHeight="22px">{moment(`${program.info.date} ${program.end_time}`).format('HH:mm')}</Text>
                      </>} */}
                          <Text lineHeight="22px">08:50 </Text>
                      <Text lineHeight="22px">09:45</Text>
                    </VStack>
                  <VStack maxW={['calc(100% - 148px)','calc(100% - 100px)']} space="1" >
                 
                    <Text fontSize="md" lineHeight="22px">
                      {/* {program?.info?.topic} */}
                      The Impact of Globalization on Modern Economies 2024 and the new World order created
                    </Text>

                  </VStack>

               
                </HStack>
              </HStack>
            </Box>

    </>
  )
}

export default ProgramContainer