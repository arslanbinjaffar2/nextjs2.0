import * as React from 'react';
import { Container, Box, Text, Pressable, HStack, Spacer, Icon, Input, View } from 'native-base';
import UseLoadingService from 'application/store/services/UseLoadingService';
import SectionLoading from 'application/components/atoms/SectionLoading';
import UseEventService from 'application/store/services/UseEventService';
import UseNoteService from 'application/store/services/UseNoteService';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import { useRouter } from 'solito/router';
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
        ModuleName=ModuleName?.icon.replace('.png', '').replace('-','_').replace('-icon','_icon') 
        return ModuleName
    }
    function getModuleName(name: string) {
        let module:any = modules.find((module: any) => module.alias == name);
        return module?.name 
    }
    const moudlesList = ["agendas", "exhibitors", "sponsors","ddirectory"];
    const myNotesKeys = {
        agendas: "program_notes",
        exhibitors: "exhibitor_notes",
        sponsors: "sponsor_notes",
        ddirectory: "directory_notes"
    };
    
    function showModules() {
        const foundModule = modules
        ?.filter(module => moudlesList.includes(module?.alias))
        ?.sort((a, b) => {
            const aKey = myNotesKeys?.[a.alias as keyof typeof myNotesKeys] || `${a.alias}_notes`;
            const bKey = myNotesKeys?.[b.alias as keyof typeof myNotesKeys] || `${b.alias}_notes`;
            const aLength = myNotes?.[aKey]?.length || 0;
            const bLength = myNotes?.[bKey]?.length || 0;
            return aLength - bLength;
        });
        const myNotesList = Object.values(myNotesKeys).filter(noteKey => myNotes?.[noteKey]?.length > 0) || [];
        return {
            foundModule,
            myNotesList
        };
    }
    React.useEffect(() => {
        FetchMyNotes();
    }, []);
   
    return (
        <>
            {(loading) ? (
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
                                <DynamicIcon iconType={'sendMail'} iconProps={{ width: 28, height: 14 }} />
                            </Pressable>

                        </Box>

                    </HStack>
                    <Container pt="2" maxW="100%" w="100%" >
                        <Box mb="3" bg={`${myNotes ? "primary.box" : ""}`} p="0"  w="100%"  overflow="hidden" rounded={"lg"} >
                        {myNotes && !loading && showModules().foundModule.map(({alias,show_on_dashboard },index) => {
                        const noteKey = myNotesKeys?.[alias  as keyof typeof myNotesKeys] || `${alias}_notes`;
                        return (
                            <View key={alias} width={"100%"}>
                            {show_on_dashboard==1 && 

                                <Pressable key={alias} onPress={() => {
                                    if(alias=="agendas"){
                                        push(`/${event.url}/my_notes/detail/programs`)
                                    }else{
                                        push(`/${event.url}/my_notes/detail/${alias.toLowerCase()}`)
                                    }
                                }}>
                                <HStack width={"100%"} borderTopWidth={index ==0 ? "0px" : "1px"} borderTopColor="primary.bordercolor" px={["3", "4"]} py="5" space="4" alignItems="center" justifyContent={'space-between'}>
                                <View flexDirection={'row'} alignItems={getModuleName(alias).length>100?"start":"center"} width={"calc(100% - 30px)"}>
                                <DynamicIcon iconType={getValueByNameModule(alias)} iconProps={{ width: 16, height: 16 }} />
                                <Text overflow={'hidden'}  textTransform={'capitalize'} fontSize="lg" ml={'6px'}  >
                                            {getModuleName(alias)} ({myNotes?.[noteKey]?.length || 0})
                                </Text>
                                    </View>
                                    {myNotes?.[noteKey]?.length > 0 && (
                                        <Icon as={SimpleLineIcons} name="arrow-right" size="md" color="primary.text" />
                                    )}
                                    </HStack>
                                    </Pressable>
                                }
                                </View>
                        );
                    })}
                                           {/* {myNotes && myNotes.program_notes && modules?.find((module) => (module?.alias == 'agendas')) &&
                                <Pressable onPress={() => {
                                    push(`/${event.url}/my_notes/detail/programs`)
                                }}>
                                    <HStack borderTopColor="primary.bordercolor" px={["3","4"]}  py="5" space="4" alignItems="center" justifyContent={'space-between'}>
                                        <Box flexDirection={'row'} alignItems={'center'} >
                                        <DynamicIcon iconType={getValueByNameModule('agendas')} iconProps={{ width: 16, height: 16 }} />
                                        <Text textTransform={'capitalize'} fontSize="lg" ml={'6px'}>{getModuleName('agendas')} ({myNotes.program_notes.length})</Text>
                                        </Box>
                                        {myNotes.program_notes.length > 0 &&
                                            <Icon as={SimpleLineIcons} name="arrow-right" size="md" color="primary.text" />
                                        }
                                    </HStack>
                                </Pressable>
                            }

                            {myNotes && myNotes.exhibitor_notes && modules?.find((module) => (module?.alias == ''))?.show_on_dashboard==1  &&
                                <Pressable onPress={() => {
                                    push(`/${event.url}/my_notes/detail/exhibitors`)
                                }}>
                                    <HStack borderTopWidth={"1px"} borderTopColor="primary.bordercolor" px={["3","4"]} py="5" space="4" alignItems="center" justifyContent={'space-between'}>
                                    <Box flexDirection={'row'} alignItems={'center'}>
                                    <DynamicIcon iconType={getValueByNameModule('exhibitors')}  iconProps={{ width: 16, height: 16 }} />
                                        <Text textTransform={'capitalize'} fontSize="lg" ml={'6px'}>{getModuleName('exhibitors')} ({myNotes..length})</Text>
                                    </Box>

                                        {myNotes.exhibitor_notes.length > 0 &&
                                            <Icon as={SimpleLineIcons} name="arrow-right" size="md" color="primary.text" />
                                        }
                                    </HStack>
                                </Pressable>
                            }
                            {myNotes && myNotes.sponsor_notes && modules?.find((module) => (module?.alias == ''))?.show_on_dashboard==1 &&
                                <Pressable onPress={() => {
                                    push(`/${event.url}/my_notes/detail/sponsors`)
                                }}>
                                    <HStack borderTopWidth={"1px"} borderTopColor="primary.bordercolor" px={["3","4"]}  py="5" space="4" alignItems="center"
                                    justifyContent={'space-between'}
                                    >
                                        {console.log(module,"sponsors")}
                                    <Box flexDirection={'row'} alignItems={'center'}>

                                    <DynamicIcon iconType={getValueByNameModule('sponsors')}   iconProps={{ width: 16, height: 16 }} />
                                        <Text textTransform={'capitalize'} fontSize="lg" ml={'6px'}>{getModuleName('sponsors')} ({myNotes.sponsor_notes.length})</Text>
                                    </Box>

                                        {myNotes.sponsor_notes.length > 0 &&
                                            <Icon as={SimpleLineIcons} name="arrow-right" size="md" color="primary.text" />
                                        }
                                    </HStack>
                                </Pressable>
                            }

                            {myNotes && myNotes.directory_notes && modules?.find((module) => (module?.alias == ''))?.show_on_dashboard==1  &&
                                <Pressable onPress={() => {
                                    push(`/${event.url}/my_notes/detail/directory`)
                                }}>
                                    <HStack  borderTopColor={myNotes.length>1?"":"primary.bordercolor"} px={["3","4"]}  py="5" space="4" alignItems="center" justifyContent={
                                        'space-between'
                                    }>
                                        {console.log(myNotes,"mynotes")}
                                    <Box flexDirection={'row'} alignItems={'center'}>
                                       <DynamicIcon iconType={getValueByNameModule('ddirectory')} iconProps={{ width: 16, height: 16 }} />
                                        <Text textTransform={'capitalize'} fontSize="lg" ml={'6px'}>{getModuleName('ddirectory')} ({myNotes.directory_notes.length})</Text>
                                    </Box>

                                        {myNotes.directory_notes.length > 0 &&
                                            <Icon as={SimpleLineIcons} name="arrow-right" size="md" color="primary.text" />
                                        }
                                    </HStack>
                                </Pressable>
                            }  */}
                        </Box>
                    </Container>
                </>
            )}

        </>
    );
};

export default Index;
