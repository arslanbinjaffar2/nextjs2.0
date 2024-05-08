import * as React from 'react';
import { Avatar, Box, Button, Container, Heading, HStack, Icon, Image, Input, Spacer, Text, VStack, Pressable } from 'native-base';
import AntDesign from '@expo/vector-icons/AntDesign';
import UseEventService from 'application/store/services/UseEventService';
import PropTypes from 'prop-types';
import UseLoadingService from 'application/store/services/UseLoadingService';
import UseQaService from 'application/store/services/UseQaService';
import WebLoading from 'application/components/atoms/WebLoading';

const Index = () => {

    const { loading } = UseLoadingService();

    const { event, setting_modules } = UseEventService();

    const module = setting_modules?.find((module) => module.alias === 'myquestions');

    const { my_questions, FetchMyQuestions } = UseQaService();

    React.useEffect(() => {
        FetchMyQuestions();
    }, []);
    return (
        <>
            {loading || my_questions.length <= 0 ? (
                <WebLoading />
            ) : (
                <>
                    <Container pt="2" maxW="100%" w="100%">
                        <HStack mb="3" pt="2" w="100%" space="3" alignItems="center">
                            <Text fontSize="2xl">{module?.name ?? "My Questions"}</Text>
                            <Spacer />
                            <Input rounded="10" w="60%" bg="primary.box" borderWidth={0} placeholder="Search" leftElement={<Icon ml="2" color="primary.text" size="lg" as={AntDesign} name="search1" />} />
                        </HStack>
                        <>
                            <Box mb="3" w="100%" overflow="hidden" bg="primary.box" p="0" rounded="10">
                                {my_questions.length > 0 ? (
                                    my_questions.map((question: any, index: number) => (
                                        <Pressable
                                            onPress={() => {
                                            }}>
                                            <HStack key={index} borderBottomWidth="1" borderColor="primary.bordercolor" w="100%" p="4" space="5">
                                                <Avatar
                                                    source={{
                                                        uri: 'https://pbs.twimg.com/profile_images/1369921787568422915/hoyvrUpc_400x400.jpg'
                                                    }}
                                                >
                                                    MQ
                                                </Avatar>
                                                <VStack space="0">
                                                    <Heading fontSize="md"><span dangerouslySetInnerHTML={{ __html: question?.question }}></span></Heading>
                                                    <Text fontSize="sm" opacity="0.6">{question?.program?.info.find((info: any) => info.name === 'topic')?.value}</Text>
                                                </VStack>
                                                <Spacer />
                                                <VStack alignItems="flex-end" space="2">
                                                    <Text opacity="0.6" fontSize="md">{question.question_time}</Text>
                                                </VStack>
                                            </HStack>
                                        </Pressable>
                                    ))
                                ) : (
                                    <Box p={3} rounded="lg" w="100%">
                                        <Text fontSize="16px">{event?.labels?.GENERAL_NO_RECORD}</Text>
                                    </Box>
                                )}
                            </Box>

                        </>
                    </Container>
                </>
            )}
        </>
    );
};

export default Index;
