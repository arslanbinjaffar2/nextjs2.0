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
    const { push } = useRouter()
    const { loading } = UseLoadingService();
    const { myNotes, FetchMyNotes, emailMyNotes } = UseNoteService();
    const { AddToast } = UseToastService()
    const { modules, event } = UseEventService();
    const module = modules.find((module) => module.alias === 'my_notes');
    function getValueByNameModule(name: string) {
        let ModuleName:any = modules.find((module: any) => module.alias == name);
        ModuleName=ModuleName?.icon.replace('.png', '') 
        return ModuleName
    }
  
    React.useEffect(() => {
        FetchMyNotes();
    }, []);
    return (
        <>
            {(loading && myNotes) ? (
                <SectionLoading />
            ) : (
                <>
                    <HStack display={"flex"} mb="3" pt="2" w="100%" justifyContent={'space-between'} alignItems="center">
                        <Text fontSize="2xl">
                            {module?.name}
                        </Text>
                        <Spacer />
                        <Box flexDirection={'row'} alignItems={'center'}>
                            <Pressable
                                onPress={() => {
                                    emailMyNotes()
                                    AddToast({ toast: { message: "Congratulations! Your notes has been sent through email", status: "success" } })
                                }}
                            >
                                <DynamicIcon iconType={'mail'} iconProps={{ width: 28, height: 14 }} />
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
                                        <Box flexDirection={'row'} alignItems={'center'}>

                                        <DynamicIcon iconType={getValueByNameModule('agendas')} iconProps={{ width: 16, height: 16 }} />
                                        <Text textTransform={'capitalize'} fontSize="lg" ml={'6px'}>Program ({myNotes.program_notes.length})</Text>
                                        </Box>
                                        <Spacer />
                                        {myNotes.program_notes.length > 0 &&
                                            <Icon as={SimpleLineIcons} name="arrow-right" size="md" color="primary.text" />
                                        }
                                    </HStack>
                                </Pressable>
                            }

                            {myNotes && myNotes.exhibitor_notes &&
                                <Pressable onPress={() => {
                                    push(`/${event.url}/my_notes/detail/exhibitors`)
                                }}>
                                    <HStack borderTopWidth={"1px"} borderTopColor="primary.bordercolor" px="4" py="5" space="4" alignItems="center">
                                    <Box flexDirection={'row'} alignItems={'center'}>
                                    <DynamicIcon iconType={getValueByNameModule('exhibitors')}  iconProps={{ width: 16, height: 16 }} />
                                        <Text textTransform={'capitalize'} fontSize="lg" ml={'6px'}>Exhibitor ({myNotes.exhibitor_notes.length})</Text>
                                    </Box>

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
                                    <Box flexDirection={'row'} alignItems={'center'}>

                                    <DynamicIcon iconType={getValueByNameModule('sponsors')}   iconProps={{ width: 16, height: 16 }} />
                                        <Text textTransform={'capitalize'} fontSize="lg" ml={'6px'}>Sponsor ({myNotes.sponsor_notes.length})</Text>
                                    </Box>

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
                                    <Box flexDirection={'row'} alignItems={'center'}>
                                       <DynamicIcon iconType={getValueByNameModule('ddirectory')} iconProps={{ width: 16, height: 16 }} />
                                        <Text textTransform={'capitalize'} fontSize="lg" ml={'6px'}>Document ({myNotes.directory_notes.length})</Text>
                                    </Box>

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
