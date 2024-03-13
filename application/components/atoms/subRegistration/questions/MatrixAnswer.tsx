import React from 'react';
import { Box, Center, Checkbox, Divider, HStack, Input, Radio, ScrollView, Text, TextArea, VStack } from 'native-base';
import Icowritecomment from 'application/assets/icons/small/Icowritecomment';
import { Question, FormData } from 'application/models/subRegistration/SubRegistration';
import { Platform, useWindowDimensions } from 'react-native';
import UseEventService from 'application/store/services/UseEventService';
type PropTypes = {
  question: Question,
  updates:number,
  onsubmit:number,
  formData: FormData,
  updateFormData: (question_id:number, type:string, answer:any, index?:number) => void
    error:string|null,
    canChangeAnswer?:number

}
const MatrixAnswer = ({ question, formData, updateFormData, error, canChangeAnswer,updates,onsubmit }: PropTypes) => {
  const {width} = useWindowDimensions();
  const [matrix, setmatrix] = React.useState(false)
  const { event } = UseEventService()
  const refElement = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    if (error) {
      if (refElement.current) {
        refElement.current.scrollIntoView({ behavior: "smooth", block: "start", inline: "start" });
      }
    }
  }, [onsubmit])
  return (
    <Center ref={refElement} maxW="100%" w="100%" mb="0">
      <Box mb="3" py="3" px="4" w="100%">
        <Text fontWeight="600" mb="3" maxW="80%" fontSize="lg">{question?.required_question == '1' && <Text display={Platform.OS === 'web' ? "inline" : 'flex'} color="red.500">*</Text>} {question?.info?.[0]?.value}</Text>
        <Divider mb="5" opacity={0.27} bg="primary.text" />
        <ScrollView onScroll={(e) => {if (e.nativeEvent.contentOffset.x > 40) {setmatrix(true)} else {setmatrix(false)}}} w={[width - 60,'100%']} scrollEventThrottle={400} pb="5" showsHorizontalScrollIndicator={true} overflowX={'auto'} showsVerticalScrollIndicator={true}>
          <Box position="relative" w="100%" rounded="lg">
          <HStack space="1" alignItems="center" pb="3">
            <Center zIndex={9} position={Platform.OS === 'web' ? `sticky`: 'absolute'} left={0} minW="150px" maxW="150px"  flex="1" height="20px"></Center>
            {question?.matrix.map((matrix, k) =>
             <React.Fragment key={k}>
                <Center minW="100px" flex="1"><Text isTruncated fontSize="lg">{matrix.name}</Text></Center>
              </React.Fragment>
            )}
          </HStack>
          <VStack  w="100%" space="0">
            {question?.answer.map((answer, k) =>
            <Radio.Group w="100%" isDisabled={ (canChangeAnswer !== undefined && canChangeAnswer == 0) ? true : false } key={answer.id} display={'flex'} name={`group-${k}`} aria-label={answer?.info[0]?.value}  defaultValue={`${formData[question.id]?.answer[answer.id] ?? ''}`}   onChange={matrix_id => {updateFormData(question.id, question.question_type, matrix_id, answer.id);}}>
              <HStack w="100%" key={k} space="1" alignItems="center">
                <Center bg={matrix ? 'primary.500' : ''} nativeID='zindex-9' pl={1} py={2} zIndex={9} alignItems="flex-start" position={Platform.OS === 'web' ? `sticky`: 'absolute'} left={0} minW="150px" maxW="150px"  flex="1">
                  <Text isTruncated fontSize="lg">
                    {answer?.info[0]?.value}
                  </Text>
                </Center>
                
                {question.matrix.map((matrix, i) =>
                  <Center py={2} minW="100px" flex="1" key={matrix.id}>
                   <Radio  isDisabled={ (canChangeAnswer !== undefined && canChangeAnswer == 0) ? true : false } key={i} value={`${matrix.id}`}  />
                  </Center>
                )}
              </HStack>
            </Radio.Group>
            )}
            </VStack>
            
           </Box>
        </ScrollView>
       
      </Box>
      {error && <Box  mb="3" py="3" px="4" backgroundColor="red.100" w="100%">
              <Text color="red.900"> {error} </Text>
      </Box>}
      
      <HStack px="3" py="1" mb={1} bg="primary.darkbox" w="100%" space="3" alignItems="center">
        <Icowritecomment width="15px" height="18px" />
        <Text fontSize="lg">{event?.labels?.GENERAL_YOUR_COMMENT}</Text>
      </HStack>
      <Box py="3" px="4" pb={0} w="100%">
        <TextArea
          p="3"
          mb={1}
          h="100px"
          bg={'primary.darkbox'}
          onChangeText={(text) => updateFormData(question.id, 'comment', text)}
          borderWidth="1" borderColor={'primary.darkbox'} fontSize="md" placeholder={event?.labels?.GENERAL_COMMENT} autoCompleteType={undefined} />
      </Box>
    </Center>
  )
}

export default MatrixAnswer