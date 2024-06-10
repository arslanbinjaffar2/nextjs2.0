import React, { useState, useEffect } from 'react';
import { Avatar, Box, Container, Heading, HStack, Icon, Image, Input, Spacer, Text, VStack, Pressable } from 'native-base';
import moment from 'moment';
import AntDesign from '@expo/vector-icons/AntDesign';
import UseEventService from 'application/store/services/UseEventService';
import UseLoadingService from 'application/store/services/UseLoadingService';
import UseQaService from 'application/store/services/UseQaService';
import WebLoading from 'application/components/atoms/WebLoading';
import { useRouter } from 'solito/router';
import Icoquestion from 'application/assets/icons/small/Icoquestion';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import Icocalendar from 'application/assets/icons/small/Icocalendar';
import { GENERAL_DATETIME_FORMAT, GENERAL_DATE_FORMAT } from 'application/utils/Globals';
import { Question } from 'application/models/poll/Detail';
import NoRecordFound from 'application/components/atoms/NoRecordFound';

const Index = () => {
    const { push } = useRouter();
    const { loading } = UseLoadingService();
    const { event, setting_modules } = UseEventService();
    const { my_questions, FetchMyQuestions } = UseQaService();

    const [searchQuery, setSearchQuery] = useState('');
    const [filteredQuestions, setFilteredQuestions] = useState<Question[]>([]);

    useEffect(() => {
        FetchMyQuestions();
    }, []);

    useEffect(() => {
        setFilteredQuestions(my_questions);
    }, [my_questions]);

    useEffect(() => {
        const lowercasedFilter = searchQuery.toLowerCase();
        const filteredData = my_questions.filter((item: Question) => {
            return item.question.toLowerCase().includes(lowercasedFilter);
        });
        setFilteredQuestions(filteredData);
    }, [searchQuery, my_questions]);
    const module = setting_modules?.find((module) => module.alias === 'myquestions');
    return (
        <>
            {loading ? (
                <WebLoading />
            ) : (
                <>
                    <Container pt="2" maxW="100%" w="100%">
                        <HStack mb="3" pt="2" w="100%" space="3" alignItems="center">
                            <Text fontSize="2xl">{module?.name ?? "My Questions"}</Text>
                            <Spacer />
                            <Input
                                rounded="10"
                                w="60%"
                                maxW={290}
                                bg="primary.box"
                                borderWidth={0}
                                placeholder="Search"
                                value={searchQuery}
                                onChangeText={(text) => setSearchQuery(text)}
                                leftElement={<Icon ml="2" color="primary.text" size="lg" as={AntDesign} name="search1" />}
                            />
                        </HStack>
                        <Box mb="3" w="100%" overflow="hidden" bg="primary.box" p="0" rounded="10">
                            {filteredQuestions.length > 0 ? (
                                filteredQuestions.map((question, index) => (
                                    <Pressable
                                        key={index}
                                        onPress={() => {
                                            push(`/${event.url}/settings/myquestions/detail/${question.id}`)
                                        }}
                                    >
                                        <HStack alignItems={'center'} borderTopWidth={index === 0 ? 0 : 1} borderColor="primary.bordercolor" w="100%" p="4" space="5">
                                            <Icoquestion width={22} height={22} />
                                            <VStack w={'calc(100% - 80px)'} space="0">
                                                <HStack mb={2} space="3" alignItems="center">
                                                    <Heading fontSize="16px" fontWeight={500}>
                                                        <div className='ebs-iframe-content-no-margin' dangerouslySetInnerHTML={{ __html: question?.question }}></div>
                                                    </Heading>
                                                    <Spacer />
                                                    <HStack space="3" alignItems="center">
                                                        <HStack space="3" alignItems="center">
                                                            <Icocalendar width={12} height={12} />
                                                            <Text fontWeight={500} fontSize="12px">{moment(question.question_time).format(GENERAL_DATETIME_FORMAT)}</Text>
                                                        </HStack>
                                                    </HStack>
                                                </HStack>
                                                <Text fontSize="sm">{question?.program?.info.find((info:any) => info.name === 'topic')?.value}</Text>
                                            </VStack>
                                            <Icon size="md" as={SimpleLineIcons} name="arrow-right" color={'primary.text'} />
                                        </HStack>
                                    </Pressable>
                                ))
                            ) : (
                                <NoRecordFound/>
                            
                            )}
                        </Box>
                    </Container>
                </>
            )}
        </>
    );
};

export default Index;
