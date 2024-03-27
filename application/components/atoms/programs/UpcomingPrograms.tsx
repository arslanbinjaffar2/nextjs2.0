import React from 'react'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { Box, Heading, HStack, Icon, Text } from 'native-base';
import UpcomingBlock from 'application/components/atoms/programs/UpcomingBlock';
import UseProgramService from 'application/store/services/UseProgramService';

const UpcomingPrograms = () => {

  const { upcoming_programs,FetchUpcomingPrograms } = UseProgramService();

  React.useEffect(() => {
    FetchUpcomingPrograms({limit:1});
  }
  ,[])

  return (
    <>
    {upcoming_programs.map((program:any) => {
      return <UpcomingBlock title="UPCOMING SESSION" desc={program.info?.topic} location={program.info?.location} date={program.start_date} time={program.start_time} />
    })}
    </> 
  )
  // <UpcomingBlock title="UPCOMING SESSION" desc="Workshop 2 - The right path" location="Room 242" date="11-03-2022" time="11-00 to 13-00" />

}

export default UpcomingPrograms;