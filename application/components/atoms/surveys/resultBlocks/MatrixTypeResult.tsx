import React from 'react';
import { Box, Center, Checkbox, Divider, HStack, Input, Radio, ScrollView, Text, TextArea, VStack } from 'native-base';
import Icodocument from 'application/assets/icons/PollCommentIcon';
import { Question } from 'application/models/survey/ResultDetail';
import { Platform, useWindowDimensions } from 'react-native';
import UseSurveyService from 'application/store/services/UseSurveyService';
import UseEventService from 'application/store/services/UseEventService';

type PropTypes = {
  question: Question,
  questionNumber:number
}
const MatrixTypeResult = ({ question, questionNumber }: PropTypes) => {
  const { survey_labels } = UseSurveyService();
  const { event } = UseEventService();
  const {width} = useWindowDimensions();
  const [matrix, setmatrix] = React.useState(false)



  return (
    <>
      {question.results && question.results.length > 0 && <Center maxW="100%" w="100%" mb="3" bg="primary.box" borderWidth="0" borderColor="primary.bdBox" rounded="10">
        
      <Box mb="3" w="100%">
            <HStack px="3" py="1" bg="primary.darkbox" w="100%" alignItems="center" roundedTop={10}>
                <Text fontWeight="600" maxW="80%" fontSize="lg">Question {`#${questionNumber + 1}`} </Text>
            </HStack>
            {/* <Divider mb="5" opacity={0.27} bg="primary.text" /> */}
            <Text px='4' py={4} fontSize="xl">{question?.required_question == '1' && <Text display={Platform.OS === 'web' ? "inline" : 'flex'} color="red.500">*</Text>} {question?.info.question}</Text>

        </Box>
        <Box mb="3" w="100%">
          <HStack px="3" py="1" bg="primary.darkbox" w="100%" alignItems="center">
                <Text fontWeight="600" maxW="80%" fontSize="lg">{survey_labels?.POLL_YOUR_ANSWER}</Text>
            </HStack>
          <ScrollView onScroll={(e) => {if (e.nativeEvent.contentOffset.x > 40) {setmatrix(true)} else {setmatrix(false)}}} w={[width - 60,'100%']} scrollEventThrottle={400} maxW={'100%'} pb="5" showsHorizontalScrollIndicator={true} overflowX={'auto'} showsVerticalScrollIndicator={true}>
            <Box position="relative" w="100%" rounded="lg">
            <HStack space="1" alignItems="center" pb="3">
              <Center  zIndex={9} position={Platform.OS === 'web' ? `sticky`: 'absolute'} left={0} minW="150px" maxW="150px"  flex="1" height="20px"></Center>
              {question?.matrix.map((matrix, k) =>
              <React.Fragment key={k}>
                  <Center minW="100px" flex="1"><Text px='3' fontSize="lg">{matrix.name}</Text></Center>
                </React.Fragment>
              )}
            </HStack>
            <VStack  w="100%" space="0">
              {question?.answer.map((answer, k) =>
              <Radio.Group isReadOnly w="100%" key={answer.id} display={'flex'} name={`group-${k}`} aria-label={answer?.info?.answer}  defaultValue={question?.results?.find((r)=>(r.answer_id == answer.id))?.answer ?? ''}    >
                <HStack w="100%" key={k} space="1" alignItems="center">
                  <Center  pl={1} py={2} zIndex={10} alignItems="flex-start" position={Platform.OS === 'web' ? `sticky`: 'absolute'} left={0} minW="150px" maxW="150px"  flex="1">
                    <Text pl={3} fontSize="lg">
                      {answer?.info?.answer}
                    </Text>
                  </Center>
                  
                  {question.matrix.map((matrix, i) =>
                    <Center  zIndex={9} minW="100px" flex="1" key={matrix.id}>
                    <Radio key={i} value={`${matrix.id}`}  />
                    </Center>
                  )}
                </HStack>
              </Radio.Group>
              )}
              </VStack>
              
            </Box>
          </ScrollView>
        
        </Box>
      
        {Number(question.enable_comments) === 1 && question.results[0]?.comment !== '' &&
              <>
              <HStack px="3" py="1" bg="primary.darkbox" w="100%" space="3" alignItems="center">
              <Icodocument  />
              <Text fontSize="lg">{event?.labels?.GENERAL_YOUR_COMMENT}</Text>
              </HStack>
              <Box py="3" px="4" w="100%">
                  <TextArea
                  p="0"
                  h="30px"
                  isReadOnly
                  focusOutlineColor="transparent"
                  _focus={{ bg: 'transparent' }}
                  defaultValue={question.results[0]?.comment}
                  borderWidth="0" fontSize="md" placeholder="Please write your comment here …" autoCompleteType={undefined} />
              </Box>
              </>
          }
      </Center>}
    </>
  )
}

export default MatrixTypeResult