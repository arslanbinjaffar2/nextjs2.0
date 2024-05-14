import React, { useEffect } from 'react'
import { Box, Container, HStack, Icon, Spacer, Text, VStack, Divider, Button, ScrollView, Pressable, Heading, TextArea } from 'native-base';
import AntDesign from '@expo/vector-icons/AntDesign';
import UseProgramService from 'application/store/services/UseProgramService';
import DynamicIcon from 'application/utils/DynamicIcon';
import UseLoadingService from 'application/store/services/UseLoadingService';
import in_array from "in_array";
import UseToastService from 'application/store/services/UseToastService';
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
             <HStack mb={3} space="1" alignItems="center">
                <Pressable onPress={() => save(1)}><Icon size={'xl'} as={AntDesign} name={rate >= 1 ? "star" :"staro"} color={rate >= 1 ? "secondary.500" :"primary.text"}  /></Pressable>
                <Pressable onPress={() => save(2)}><Icon size={'xl'} as={AntDesign} name={rate >= 2 ? "star" :"staro"}  color={rate >= 2 ? "secondary.500" :"primary.text"}  /></Pressable>
                <Pressable onPress={() => save(3)}><Icon size={'xl'} as={AntDesign} name={rate >= 3 ? "star" :"staro"}  color={rate >= 3 ? "secondary.500" :"primary.text"}  /></Pressable>
                <Pressable onPress={() => save(4)}><Icon size={'xl'} as={AntDesign} name={rate >= 4 ? "star" :"staro"}  color={rate >= 4 ? "secondary.500" :"primary.text"}  /></Pressable>
                <Pressable onPress={() => save(5)}><Icon size={'xl'} as={AntDesign} name={rate >= 5 ? "star" :"staro"}  color={rate >= 5 ? "secondary.500" :"primary.text"}  /></Pressable>
              </HStack>
              <Text fontSize="md" color={'primary.text'}>Please give us your feedback here…</Text>
              
              </Box>
          </Box>
        </>
        }
    </>
  )
}

export default SessionRating