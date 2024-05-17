import * as React from 'react';
import PropTypes from 'prop-types';
import { Container, Box, Text, Pressable, HStack, Spacer, Icon, Input } from 'native-base';
import UseLoadingService from 'application/store/services/UseLoadingService';
import SectionLoading from 'application/components/atoms/SectionLoading';
import UseEventService from 'application/store/services/UseEventService';
import UseNoteService from 'application/store/services/UseNoteService';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import { useRouter } from 'solito/router';
import AntDesign from '@expo/vector-icons/AntDesign';
import DynamicIcon from 'application/utils/DynamicIcon';
import UseToastService from 'application/store/services/UseToastService';

const Index = () => {
    const {push}=useRouter()
    const { loading } = UseLoadingService();
    const { myNotes, FetchMyNotes } = UseNoteService();
    const {AddToast}=UseToastService()
    const { modules,event } = UseEventService();
    const module = modules.find((module) => module.alias === 'my_notes');
    
    React.useEffect(() => {
        FetchMyNotes();
    }, []);
    return (
        <>
            {loading ? (
                <SectionLoading />
            ) : (
                <>
                <HStack display={["block","flex"]} mb="3" pt="2" w="100%" space="3" alignItems="center">
                <Text fontSize="2xl">
                 {module?.name}
                </Text>
                <Spacer />
                <Box w={['100%','60%']} flexDirection={'row'} alignItems={'center'}>

                <Input rounded="10"  bg="primary.box" borderWidth={0} mr={'3'}
                borderColor={'transparent'}
                placeholder={event.labels?.GENERAL_SEARCH} onChangeText={(text: string) => {
                  
                }} leftElement={<Icon ml="2" color="primary.text" size="lg" as={AntDesign} name="search1" />} width={'90%'}/>
                <Pressable
             
                    onPress={()=>{
                        AddToast({toast:{message:"Congratulations! Your notes has been sent through email",status:"success"}})
                    }}
                
                >
                <DynamicIcon iconType={'mail'} iconProps={{ width:26,height:12 }}/>
                </Pressable>
                
                </Box>

            </HStack>
                    <Container pt="2" maxW="100%" w="100%" >
                        <Box mb="3" bg={`${myNotes ? "primary.box" : ""}`} p="0" w="100%" overflow="hidden" rounded={"lg"}>
                            {myNotes && myNotes.program_notes &&
                                <Pressable onPress={() => {
                                    push(`/${event.url}/my_notes/detail/programs`)
                                }}>
                                    <HStack borderTopColor="primary.bordercolor" px="4" py="5" space="4" alignItems="center">
                                        <Text textTransform={'capitalize'} fontSize="lg">Program Notes ({myNotes.program_notes.length})</Text>
                                        <Spacer />
                                        {myNotes.program_notes.length > 0 &&
                                            <Icon as={SimpleLineIcons} name="arrow-right" size="md" color="primary.text" />
                                        }
                                    </HStack>
                                </Pressable>
                            }

                            {myNotes && myNotes.exhibitor_notes &&
                                <Pressable onPress={() =>{
                                    push(`/${event.url}/my_notes/detail/exhibitors`)
                                }}>
                                    <HStack borderTopWidth={"1px"} borderTopColor="primary.bordercolor" px="4" py="5" space="4" alignItems="center">
                                        <Text textTransform={'capitalize'} fontSize="lg">Exhibitor Notes ({myNotes.exhibitor_notes.length})</Text>
                                        <Spacer />
                                        {myNotes.exhibitor_notes.length > 0 &&
                                            <Icon as={SimpleLineIcons} name="arrow-right" size="md" color="primary.text" />
                                        }
                                    </HStack>
                                </Pressable>
                            }
                            {myNotes && myNotes.sponsor_notes &&
                                <Pressable onPress={() => {
                                    push(`/${event.url}/my_notes/detail/sponsors`)
                                }}>
                                    <HStack borderTopWidth={"1px"} borderTopColor="primary.bordercolor" px="4" py="5" space="4" alignItems="center">
                                        <Text textTransform={'capitalize'} fontSize="lg">Sponsor Notes ({myNotes.sponsor_notes.length})</Text>
                                        <Spacer />
                                        {myNotes.sponsor_notes.length > 0 &&
                                            <Icon as={SimpleLineIcons} name="arrow-right" size="md" color="primary.text" />
                                        }
                                    </HStack>
                                </Pressable>
                            }

                            {myNotes && myNotes.directory_notes &&
                                <Pressable onPress={() => {
                                    push(`/${event.url}/my_notes/detail/directory`)
                                }}>
                                    <HStack borderTopWidth={"1px"} borderTopColor="primary.bordercolor" px="4" py="5" space="4" alignItems="center">
                                        <Text textTransform={'capitalize'} fontSize="lg">Document Notes ({myNotes.directory_notes.length})</Text>
                                        <Spacer />
                                        {myNotes.directory_notes.length > 0 &&
                                            <Icon as={SimpleLineIcons} name="arrow-right" size="md" color="primary.text" />
                                        }
                                    </HStack>
                                </Pressable>
                            }
                        </Box>
                    </Container>
                </>
            )}

        </>
    );
};

export default Index;
