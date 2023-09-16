import * as React from 'react';
import { Box, Container, HStack, Icon, Spacer, Text, VStack, Divider, Button } from 'native-base';
import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons'
import { useState } from 'react';
import IcoLongArrow from 'application/assets/icons/IcoLongArrow';
import { createParam } from 'solito';
import UseLoadingService from 'application/store/services/UseLoadingService';
import UsePollService from 'application/store/services/UsePollService';
import { FormData } from 'application/models/poll/Detail';
import WebLoading from 'application/components/atoms/WebLoading';
import MultipleAnswer from 'application/components/atoms/polls/questions/MultipleAnswer';
import SingleAnswer from 'application/components/atoms/polls/questions/SingleAnswer';
import DropdownAnswer from 'application/components/atoms/polls/questions/DropdownAnswer';
import WordCloudAnswer from 'application/components/atoms/polls/questions/WordCloudAnswer';
import MatrixAnswer from 'application/components/atoms/polls/questions/MatrixAnswer';
import OpenQuestionAnswer from 'application/components/atoms/polls/questions/OpenQuestionAnswer';
import NumberAnswer from 'application/components/atoms/polls/questions/NumberAnswer';
import DateAnswer from 'application/components/atoms/polls/questions/DateAnswer';


type ScreenParams = { id: string }

const { useParam } = createParam<ScreenParams>()

const Detail = () => {

  const [tabs, settabs] = useState<string | null>('ABOUT');

  const [steps, setsteps] = useState<number>(0);

  const [completed, setcompleted] = useState<boolean>(false);

  const { loading, scroll } = UseLoadingService();

  const { FetchPollDetail, detail } = UsePollService();

  const [formData, setFormData] = useState<FormData>({});

  const updateFormData = (question_id:number, type:string, answer:any) => {
    let newFormData = formData;
    if(newFormData[question_id] === undefined){
      newFormData[question_id] = {
        answer:null,
        comment:null
      };
    }
    if(type === 'multiple'){
       if(newFormData[question_id].answer !== null && newFormData[question_id].answer.length > 0){
        newFormData[question_id].answer = !newFormData[question_id].answer.includes(answer) ?
         [...newFormData[question_id].answer, answer] : 
         newFormData[question_id].answer.filter((id:number)=> ( id !== answer ))
       } else{
          newFormData[question_id].answer = [answer]
       }        
    }
    else if(type === 'single'){
      newFormData[question_id].answer = [answer]
    }
    else if(type === 'dropdown'){
      newFormData[question_id].answer = [answer]
    }
    setFormData(newFormData);
    console.log(newFormData);
  }


    const [id] = useParam('id');

    React.useEffect(() => {
        if (id) {
          FetchPollDetail({ id: Number(id) });
        }
    }, [id]);

    const stepIndicatorWidth = detail !== null ? 100/(detail.questions.length) : 10;

  return (
    <>
      {loading && detail === null ? (
                <WebLoading />
            ) : (
            <Container mb="3" maxW="100%" w="100%">
              <HStack mb="3" pt="2" w="100%" space="3" alignItems="center">
                <HStack space="3" alignItems="center">
                  <Icon as={AntDesign} name="arrowleft" size="xl" color="primary.text" />
                  <Text fontSize="2xl">BACK</Text>
                </HStack>
                <Spacer />
                <Text isTruncated pr="6" fontSize="lg">{detail?.topic}</Text>
              </HStack>
              <HStack bg="primary.box" overflow="hidden" borderWidth="1" borderColor="primary.bdBox" mb="4" space="0" w="100%" rounded="2xl">
                {detail?.questions.length! > 0 && detail?.questions.map((item, key)=>(
                    <Box key={key} bg={steps >= key ? 'primary.500' : 'transparent'} h="22px" w={`${stepIndicatorWidth}%`} />
                ))}
              </HStack>
              {!completed && <Box w="100%" bg="primary.box" borderWidth="1" borderColor="primary.bdBox" rounded="10">
                {detail?.questions.length! > 0 &&  detail?.questions[steps] !== undefined && (
                  <>
                    {detail?.questions[steps].question_type === 'matrix' && <MatrixAnswer question={detail?.questions[steps]} formData={formData} updateFormData={updateFormData} />}
                    {detail?.questions[steps].question_type === 'multiple' && <MultipleAnswer question={detail?.questions[steps]} formData={formData} updateFormData={updateFormData}  />}
                    {detail?.questions[steps].question_type === 'single' && <SingleAnswer question={detail?.questions[steps]} formData={formData} updateFormData={updateFormData} />}
                    {detail?.questions[steps].question_type === 'dropdown' && <DropdownAnswer question={detail?.questions[steps]} formData={formData} updateFormData={updateFormData} />}
                    {detail?.questions[steps].question_type === 'open' && <OpenQuestionAnswer question={detail?.questions[steps]} formData={formData} updateFormData={updateFormData} />}
                    {detail?.questions[steps].question_type === 'number' && <NumberAnswer question={detail?.questions[steps]} formData={formData} updateFormData={updateFormData} />}
                    {detail?.questions[steps].question_type === 'date' && <DateAnswer question={detail?.questions[steps]} formData={formData} updateFormData={updateFormData} />}
                    {detail?.questions[steps].question_type === 'date_time' && 'datetime'}
                    {detail?.questions[steps].question_type === 'world_cloud' && <WordCloudAnswer question={detail?.questions[steps]} formData={formData} updateFormData={updateFormData} />}
                  </>
                )}
                <Box py="0" px="4" w="100%">
                  <Divider mb="15" opacity={0.27} bg="primary.text" />
                  <HStack mb="3" space="3" alignItems="center">
                    {steps > 0 && <Button
                      isDisabled={steps <= 0 ? true : false}
                      bg="transparent"
                      p="2"
                      textTransform={'uppercase'}
                      fontSize="lg"
                      leftIcon={<Icon size="md" as={SimpleLineIcons} name="arrow-left" color="primary.text" />}
                      colorScheme="primary"
                      onPress={() => {
                        setsteps(steps - 1);
                      }}
                    >
                      previous
                    </Button>}
                    <Spacer />
                    {steps < (detail?.questions.length! -1)  && <Button
                      bg="transparent"
                      isDisabled={steps >= (detail?.questions.length! -1) ? true : false}
                      p="2"
                      textTransform={'uppercase'}
                      fontSize="lg"
                      rightIcon={<Icon size="md" as={SimpleLineIcons} name="arrow-right" color="primary.text" />}
                      colorScheme="primary"
                      onPress={() => {
                        setsteps(steps + 1);
                      }}
                    >
                      next
                    </Button>}
                  </HStack>
                  {steps === (detail?.questions.length! - 1) && <Box w="100%" mb="6">
                    <Box m="auto" w="230px" bg="primary.darkbox" p="0" rounded="sm" overflow="hidden">
                      <Button
                        w="48px"
                        py="3"
                        px="1"
                        leftIcon={<IcoLongArrow />}
                        colorScheme="primary"
                        onPress={() => {
                          setcompleted(true)
                        }}
                      />
                    </Box>
                  </Box>}
                </Box>
              </Box>}
              {completed && <Box borderWidth="1" borderColor="primary.bdBox" w="100%" bg="primary.box" p="5" py="8" rounded="10px">
                <VStack alignItems="center" space="5">
                  <Box bg="primary.500" w="67px" h="67px" borderWidth="1" borderColor="primary.text" rounded="100%" alignItems="center" justifyContent="center">
                    <Icon size="4xl" color="primary.text" as={Ionicons} name="checkmark" />
                  </Box>
                  <Text fontSize="lg">Thanks for submitting.</Text>
                </VStack>
              </Box>}
            </Container>
      )}
    </>
  );
};

export default Detail;
