import React, { useEffect } from 'react'
import { Box, Container, HStack, Icon, Spacer, Text, VStack, Divider, Button, ScrollView, Pressable, Heading, TextArea, Spinner, Center } from 'native-base';
import AntDesign from '@expo/vector-icons/AntDesign';
import UseProgramService from 'application/store/services/UseProgramService';
import DynamicIcon from 'application/utils/DynamicIcon';
import UseLoadingService from 'application/store/services/UseLoadingService';
import in_array from "in_array";
import UseEventService from 'application/store/services/UseEventService';
import FontAwesome from '@expo/vector-icons/FontAwesome';

type AppProps = {
  program_id: any,
}

type Rating = {
  rate: number,
  comment: string
}

const SessionRating = ({program_id}:AppProps) => {
  const { detail,rating,SaveRating,FetchRating } = UseProgramService();
  const { processing } = UseLoadingService();
  const [currentRating, setCurrentRating] = React.useState<Rating>({rate:0,comment:''});
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
      setCurrentRating({rate:rating?.rate ?? 0,comment:rating?.comment ?? ''});
    }else{
      setCurrentRating({rate:0,comment:''});
    }
  },[rating])

  function save(){
    if(currentRating?.rate !==0 && !in_array('program-ratings',processing) && detail?.program?.id){
      SaveRating({program_id:program_id ?? 0,rate:currentRating?.rate,comment:currentRating?.comment});
    }
  }
  const tab1 = React.useRef<HTMLDivElement>(null);
  return (
    <>
        {detail.program !== undefined && 
        <>
          <Box ref={tab1} p="0" w="100%" bg={'primary.box'} mb={5} rounded={8}>
            {in_array('program-ratings',processing) ? (
              <>
                 <Center h={tab1.current?.clientHeight} display={'flex'} alignItems={'center'} justifyContent={'center'}>
                    <Spinner size="sm"  />
                 </Center>
                 
              </>
            ):(
              <>
              <HStack px="3" py="1" bg="primary.darkbox" w="100%" space="3" alignItems="center" roundedTop={8}>
                  <DynamicIcon iconType={'my_notes'} iconProps={{ width: 15, height: 18 }} />
                  <Text fontSize="lg">{event?.labels?.PROGRAM_RATING}</Text>
              </HStack>
              <Box py="3" px="4" w="100%">
             <HStack mb={3} space="1" alignItems="center">
                <Pressable onPress={() => setCurrentRating({...currentRating,rate:1 })}><Icon size={'xl'} as={AntDesign} name={currentRating?.rate >= 1 ? "star" :"staro"} color={currentRating?.rate >= 1 ? "secondary.500" :"primary.text"}  /></Pressable>
                <Pressable onPress={() => setCurrentRating({...currentRating,rate:2 })}><Icon size={'xl'} as={AntDesign} name={currentRating?.rate >= 2 ? "star" :"staro"}  color={currentRating?.rate >= 2 ? "secondary.500" :"primary.text"}  /></Pressable>
                <Pressable onPress={() => setCurrentRating({...currentRating,rate:3 })}><Icon size={'xl'} as={AntDesign} name={currentRating?.rate >= 3 ? "star" :"staro"}  color={currentRating?.rate >= 3 ? "secondary.500" :"primary.text"}  /></Pressable>
                <Pressable onPress={() => setCurrentRating({...currentRating,rate:4 })}><Icon size={'xl'} as={AntDesign} name={currentRating?.rate >= 4 ? "star" :"staro"}  color={currentRating?.rate >= 4 ? "secondary.500" :"primary.text"}  /></Pressable>
                <Pressable onPress={() => setCurrentRating({...currentRating,rate:5 })}><Icon size={'xl'} as={AntDesign} name={currentRating?.rate >= 5 ? "star" :"staro"}  color={currentRating?.rate >= 5 ? "secondary.500" :"primary.text"}  /></Pressable>
              </HStack>
              <TextArea p="0" h="60px"
                focusOutlineColor="transparent"
                _focus={{ bg: 'transparent' }}
                value={currentRating?.comment ?? ''}
                onChangeText={(text)=>{ setCurrentRating ({...currentRating,comment:text}) }}
                borderWidth="0" fontSize="md" placeholder={event?.labels?.NATIVE_APP_GIVE_FEEDBACK} autoCompleteType={undefined}   />
                
                <HStack justifyContent={'flex-end'} alignItems={'flex-end'} space={2}>
                  {in_array('save-program-ratings',processing) ? 
                    <Spinner mb={1} size="sm"  />
                  :
                    <Pressable  onPress={() => save()}><Icon as={FontAwesome} name="save" size={'lg'} color={'primary.text'} /></Pressable>
                  }
                </HStack>
              </Box>
              </>
            )}
          </Box>
        </>
        }
    </>
  )
}

export default SessionRating