import React, { useEffect } from 'react'
import { Box, Container, HStack, Icon, Spacer, Text, VStack, Divider, Button, ScrollView, Pressable, Heading, TextArea } from 'native-base';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import UseProgramService from 'application/store/services/UseProgramService';
import DynamicIcon from 'application/utils/DynamicIcon';
import UseLoadingService from 'application/store/services/UseLoadingService';
import in_array from "in_array";
import UseEventService from '../../../store/services/UseEventService'

type AppProps = {
  program_id: any,
}

const SessionRating = ({program_id}:AppProps) => {
  const { detail,rating,SaveRating,FetchRating } = UseProgramService();
  const { processing } = UseLoadingService();
  const [rate, setRate] = React.useState(0);
  const { event  } = UseEventService();
  useEffect(()=>{
    if(detail.program !== undefined){
      FetchRating({program_id:program_id ?? 0});
    }
  }
  ,[])

  useEffect(()=>{
    if(detail.program !== undefined){
      FetchRating({program_id:program_id ?? 0});
    }
  }
  ,[detail])

  useEffect(()=>{
    if(rating !== null){
      setRate(rating.rate);
    }
  }
  ,[rating])


  useEffect(()=>{
    if(rating !== null){
      setRate(rating.rate ?? 0);
    }else{
      setRate(0);
    }
  },[rating])

  function save(value:number){
    setRate(value);
    if(value!==0 && !in_array('program-rating',processing) && detail?.program?.id){
      SaveRating({program_id:program_id ?? 0,rate:value,comment:''});
    }
  }
  return (
    <>
        {detail.program !== undefined && 
        <>
          <Box p="0" w="100%" bg={'primary.box'} mb={5} rounded={8}>
              <HStack px="3" py="1" bg="primary.darkbox" w="100%" space="3" alignItems="center" roundedTop={8}>
                  <DynamicIcon iconType={'my_notes'} iconProps={{ width: 15, height: 18 }} />
                  <Text fontSize="lg">{event?.labels?.PROGRAM_RATING}</Text>
              </HStack>
              <Box py="3" px="4" w="100%">
             <Text> rating: {rate}</Text>
              <Pressable onPress={() => save(1)}><Text>1</Text></Pressable>
              <Pressable onPress={() => save(2)}><Text>2</Text></Pressable>
              <Pressable onPress={() => save(3)}><Text>3</Text></Pressable>
              <Pressable onPress={() => save(4)}><Text>4</Text></Pressable>
              <Pressable onPress={() => save(5)}><Text>5</Text></Pressable>
              </Box>
          </Box>
        </>
        }
    </>
  )
}

export default SessionRating