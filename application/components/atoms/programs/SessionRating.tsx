import React, { useEffect } from 'react'
import { Box, Container, HStack, Icon, Spacer, Text, VStack, Divider, Button, ScrollView, Pressable, Heading, TextArea, Spinner, Center } from 'native-base';
import AntDesign from '@expo/vector-icons/AntDesign';
import UseProgramService from 'application/store/services/UseProgramService';
import DynamicIcon from 'application/utils/DynamicIcon';
import UseLoadingService from 'application/store/services/UseLoadingService';
import in_array from "in_array";
import UseEventService from 'application/store/services/UseEventService';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { func } from 'application/styles';

type AppProps = {
  program_id: any,
}

type Rating = {
  rate: number,
  comment: string
}

const SessionRating = ({ program_id }: AppProps) => {
  const { detail, rating, SaveRating, FetchRating } = UseProgramService();
  const { processing } = UseLoadingService();
  const [currentRating, setCurrentRating] = React.useState<Rating>({ rate: 0, comment: '' });
  const { event } = UseEventService();

  useEffect(() => {
    if (detail.program !== undefined) {
      FetchRating({ program_id: program_id ?? 0 });
    }
  }
    , [])

  useEffect(() => {
    if (detail.program !== undefined) {
      FetchRating({ program_id: program_id ?? 0 });
    }
  }
    , [detail])

  useEffect(() => {
    if (rating !== null) {
      setCurrentRating({ rate: rating?.rate ?? 0, comment: rating?.comment ?? '' });
    } else {
      setCurrentRating({ rate: 0, comment: '' });
    }
  }, [rating])

  function save() {
    if (currentRating?.rate !== 0 && !in_array('program-ratings', processing) && detail?.program?.id) {
      SaveRating({ program_id: program_id ?? 0, rate: currentRating?.rate, comment: currentRating?.comment });
    }
  }
  const tab1 = React.useRef<HTMLDivElement>(null);
  console.log(currentRating,"currentrating")
  console.log(event?.settings?.primary_color,'first')
  return (
    <>
      {detail.program !== undefined &&
        <>
          <Box ref={tab1} p="0" w="100%" bg={'primary.box'} mb={5} rounded={8}>
            {in_array('program-ratings', processing) ? (
              <>
                <Center h={tab1.current?.clientHeight} display={'flex'} alignItems={'center'} justifyContent={'center'}>
                  <Spinner size="sm" />
                </Center>

              </>
            ) : (
              <>
                <HStack px="3" py="1" bg="primary.darkbox" w="100%" space="3" alignItems="center" roundedTop={8}>
                <DynamicIcon iconType={ "star" } iconProps={{ width: 16, height: 16}} />
                  <Text fontSize="lg">{event?.labels?.PROGRAM_RATING ?? "session rating"}</Text>
                </HStack>
                <Box py="3" px="4" w="100%">
                  <HStack mb={3} space="1" alignItems="center">
                    <Pressable onPress={() => setCurrentRating({ ...currentRating, rate: 1 })}>
                    <DynamicIcon iconType={currentRating?.rate >= 1 ? "staro" : "star"} iconProps={{ width: 23, height: 24, color: `${currentRating?.rate >= 1 ? event?.settings?.primary_color : undefined}` }} />
                    {/* <Icon size={'xl'} as={AntDesign} name={currentRating?.rate >= 1 ? "staro" : "star"} color={currentRating?.rate >= 2 ? "secondary.500" : "primary.text"} /> */}

                      </Pressable>
                    <Pressable onPress={() => setCurrentRating({ ...currentRating, rate: 2 })}>
                      <DynamicIcon iconType={currentRating?.rate >=2 ? "staro" : "star"} iconProps={{ width: 23, height: 24, color: `${currentRating?.rate >= 2 ? event?.settings?.primary_color : undefined}` }} />
                      {/* <Icon size={'xl'} as={AntDesign} name={currentRating?.rate >= 2 ? "staro" : "star"} color={currentRating?.rate >= 2 ? "secondary.500" : "primary.text"} /> */}
                      </Pressable>
                    <Pressable onPress={() => setCurrentRating({ ...currentRating, rate: 3 })}>
                    <DynamicIcon iconType={currentRating?.rate >=3 ? "staro" : "star"} iconProps={{ width: 23, height: 24, color: `${currentRating?.rate >= 3 ? event?.settings?.primary_color : undefined}` }} />
                    {/* <Icon size={'xl'} as={AntDesign} name={currentRating?.rate >= 3 ? "staro" : "star"} color={currentRating?.rate >= 2 ? "secondary.500" : "primary.text"} /> */}
                    
                      </Pressable>
                    <Pressable onPress={() => setCurrentRating({ ...currentRating, rate: 4 })}>
                    <DynamicIcon iconType={currentRating?.rate >=4 ? "staro" : "star"} iconProps={{ width: 23, height: 24, color: `${currentRating?.rate >= 4 ? event?.settings?.primary_color : undefined}` }} />

                      {/* <Icon size={'xl'} as={AntDesign} name={currentRating?.rate >= 4 ? "staro" : "star"} color={currentRating?.rate >= 4 ? "secondary.500" : "primary.text"} /> */}
                    </Pressable>
                    <Pressable onPress={() => setCurrentRating({ ...currentRating, rate: 5 })}>
                    <DynamicIcon iconType={currentRating?.rate >=5 ? "staro" : "star"} iconProps={{ width: 23, height: 24, color: `${currentRating?.rate >= 5 ? event?.settings?.primary_color : undefined}` }} />
                      {/* <Icon size={'xl'} as={AntDesign} name={currentRating?.rate >= 5 ? "staro" : "star"} color={currentRating?.rate >= 5 ? "secondary.500" : "primary.text"} /> */}
                    </Pressable>
                  </HStack>
                  <TextArea p="0" h="60px"
                    focusOutlineColor="transparent"
                    _focus={{ bg: 'transparent' }}
                    value={currentRating?.comment ?? ''}
                    onChangeText={(text) => { setCurrentRating({ ...currentRating, comment: text }) }}
                    borderWidth="0" fontSize="md" placeholder={event?.labels?.NATIVE_APP_GIVE_FEEDBACK} autoCompleteType={undefined} />

                  <HStack justifyContent={'flex-end'} alignItems={'flex-end'} space={2}>
                    {in_array('save-program-ratings', processing) ?
                      <Spinner mb={1} size="sm" />
                      :
                      <Pressable onPress={() => save()}>
                        <DynamicIcon iconType={'save'} iconProps={{ width: 20, height: 20 }} />
                        </Pressable>
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