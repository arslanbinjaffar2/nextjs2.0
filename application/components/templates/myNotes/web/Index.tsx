import * as React from 'react';
import PropTypes from 'prop-types';
import { Container, Box, Text, Pressable, HStack, Spacer, Icon } from 'native-base';
import UseLoadingService from 'application/store/services/UseLoadingService';
import SectionLoading from 'application/components/atoms/SectionLoading';
import UseEventService from 'application/store/services/UseEventService';
import UseNoteService from 'application/store/services/UseNoteService';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';

type indexProps = {
    navigation: unknown
}

const Index = ({ navigation }: indexProps) => {

    const { loading } = UseLoadingService();
    const { myNotes, FetchMyNotes } = UseNoteService();
    const { event } = UseEventService();

    React.useEffect(() => {
        FetchMyNotes();
    }, []);

    return (
        <>
            {loading ? (
                <SectionLoading />
            ) : (
                <>
                    <Container pt="2" maxW="100%" w="100%">
                        <Box mb="3" bg={`${myNotes ? "primary.box" : ""}`} p="0" w="100%" overflow="hidden">
                            {myNotes && myNotes.program_notes &&
                                <Pressable onPress={() => console.log("🚀 ~ Index ~ key:")}>
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
                                <Pressable onPress={() => console.log("🚀 ~ Index ~ key:")}>
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
                                <Pressable onPress={() => console.log("🚀 ~ Index ~ key:")}>
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
                                <Pressable onPress={() => console.log("🚀 ~ Index ~ key:")}>
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

Index.propTypes = {
    navigation: PropTypes.object.isRequired,
};

export default Index;
