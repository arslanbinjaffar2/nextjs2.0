import React from 'react';
import { Box, Center, Checkbox, Divider, HStack, Input, Radio, Text, TextArea, VStack } from 'native-base';
import Icodocument from 'application/assets/icons/PollCommentIcon';
import { Question } from 'application/models/survey/ResultDetail';
import { Platform } from 'react-native';

type PropTypes = {
  question: Question
  questionNumber:number
}
const WordCloudOptionTypeResult = ({ question, questionNumber  }: PropTypes) => {

    const [groupedResults, setGroupedResults] = React.useState<any[]>([])

    React.useEffect(() => {
        const grouped = question.results.reduce((acc:any, result) => {
            // Extracting date, hour, and minute from created_at timestamp
            const createdAt = new Date(result.created_at);
            const date = `${createdAt.getFullYear()}-${(createdAt.getMonth() + 1).toString().padStart(2, '0')}-${createdAt.getDate().toString().padStart(2, '0')}`;
            const time = `${createdAt.getHours().toString().padStart(2, '0')}:${createdAt.getMinutes().toString().padStart(2, '0')}`;
            
            // Creating a key by combining date, hour, and minute
            const key = `${date} ${time}`;
    
            // Adding the result to the corresponding group
            if (!acc[key]) {
                acc[key] = [];
            }
            acc[key].push(result);
    
            return acc;
        }, {});

        // Converting the object to an array
        const groupedArray = Object.keys(grouped).map(key => ({
            key,
            results: grouped[key]
        }));
       
        setGroupedResults(groupedArray);

    },[question.results]);

  return (
    <>
        {question.results && question.results.length > 0 && <Center maxW="100%" w="100%" mb="3" bg="primary.box" borderWidth="0" borderColor="primary.bdBox" rounded="10">
        <Box mb="3" w="100%">
            <HStack px="3" py="1" bg="primary.darkbox" w="100%" alignItems="center" roundedTop={10}>
                <Text fontWeight="600" maxW="80%" fontSize="lg">Question {`#${questionNumber + 1}`} </Text>
            </HStack>
            <Text px='4' py={4} fontSize="xl">{question?.required_question == '1' && <Text display={Platform.OS === 'web' ? "inline" : 'flex'} color="red.500">*</Text>} {question?.info.question}</Text>

        </Box>
        <Box mb="3" w="100%">
            {groupedResults.map((group) => (
                <>
                <HStack px="3" py="1" bg="primary.darkbox" w="100%" alignItems="center">
                    <Text fontWeight="600" maxW="80%" fontSize="lg">Your Answer</Text>
                </HStack>
                <VStack key={group.key} w="100%" px="3" py="1" space="3" alignItems="flex-start">
                    {group.results.map((answer:any) => (
                        <HStack  space="3" alignItems="center">
                            <Text px='3' fontSize="lg" key={answer.id}>{answer?.answer}</Text>
                        </HStack>
                        
                    ))}
                </VStack>
                {Number(question.enable_comments) === 1 && group.results[0]?.comments !== '' &&
                    <>
                    <HStack px="3" py="1" bg="primary.darkbox" w="100%" space="3" alignItems="center">
                    <Icodocument  />
                    <Text fontSize="lg">Comments</Text>
                    </HStack>
                    <Box py="3" px="4" w="100%">
                        <Text fontSize="md">{group.results[0]?.comments}</Text>
                    </Box>
                    </>
                }
                </>
            ))}

        </Box>
        </Center>}
    </>
  )
}

export default WordCloudOptionTypeResult