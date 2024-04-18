import React from 'react'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { Box, Heading, HStack, Icon, Pressable, Text } from 'native-base';
import UseProgramService from 'application/store/services/UseProgramService';
import UseEventService from 'application/store/services/UseEventService';
import { useRouter } from 'solito/router'
import moment from 'moment';
import { GENERAL_DATE_FORMAT, GENERAL_TIME_FORMAT_WITHOUT_SECONDS } from 'application/utils/Globals';


const UpcomingPrograms = () => {

  const { upcoming_programs,FetchUpcomingPrograms } = UseProgramService();
  const { event,modules } = UseEventService();
  const [show] = React.useState(function(){
    const programModuleEnabled=modules.filter((module: any, key: number) => module.alias === 'agendas').length > 0;
    const myProgramModuleEnabled=modules.filter((module: any, key: number) => module.alias === 'myprograms' || module.alias === 'myagendas').length > 0;
    return programModuleEnabled||myProgramModuleEnabled;
  });
  const { push } = useRouter()

  React.useEffect(() => {
    if(show){
      FetchUpcomingPrograms({limit:1});
    }
  }
  ,[])

  return (
    <>
    {show && upcoming_programs.map((program:any) => {
      return(
        <Box mb="3" w="100%" py="4" px="3" borderWidth="0px" borderColor="primary.box" bg="primary.box" rounded="10">
            <Pressable
              onPress={()=>{
                push(`/${event?.url}/agendas/detail/${program.id}`)
              }}
            >
              <Heading pb={1} fontSize={['md', 'md', 'xl']}>UPCOMING SESSION</Heading>
              <Text lineHeight="sm" fontSize={['13px', 'md']}>{program.info?.topic}</Text>
              {program.info?.location && <HStack><Icon h="20px" lineHeight="5" pt="1" size="16px" color="primary.text" as={MaterialIcons} name="location-pin" /><Text fontSize="md">{program.info?.location}</Text></HStack>}
              <HStack space={['1', '3']}>
                <Text fontSize={['13px', 'md']}>{moment(program.start_date).format(GENERAL_DATE_FORMAT)}</Text>
                {program?.start_time && (program?.end_time || program?.info?.end_time)  && event.agenda_settings?.agenda_display_time == 1 && program?.hide_time == 0 && (
                  <Text fontSize={['13px', 'md']}>{moment(program.start_date +' '+ program.start_time).format(GENERAL_TIME_FORMAT_WITHOUT_SECONDS)} - {moment(program.start_date +' '+ program?.info?.end_time).format(GENERAL_TIME_FORMAT_WITHOUT_SECONDS)}</Text>
                )}
              </HStack>
            </Pressable>
            
          </Box>
      ) 
      
    })}
    </> 
  )
  // <UpcomingBlock title="UPCOMING SESSION" desc="Workshop 2 - The right path" location="Room 242" date="11-03-2022" time="11-00 to 13-00" />

}

export default UpcomingPrograms;