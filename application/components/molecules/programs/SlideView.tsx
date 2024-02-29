import * as React from 'react';
import { Center, Heading, HStack, Icon, IconButton, Text, FlatList, Box } from 'native-base';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons'
import RectangleDetailView from 'application/components/atoms/programs/RectangleDetailView';
import WorkshopCollapsableView from 'application/components/atoms/programs/WorkshopCollapsableView';
import WorkshopRectangleDetailView from 'application/components/atoms/programs/workshops/RectangleDetailView';
import { Program } from 'application/models/program/Program'
import UseLoadingService from 'application/store/services/UseLoadingService';
import { Platform } from 'react-native';
import in_array from "in_array";
import UseEventService from 'application/store/services/UseEventService';

type AppProps = {
    programs: Program[],
    section: string,
    my?: number,
    speaker?:number
    dashboard?:boolean
}

const SlideView = ({ programs, section, my, speaker, dashboard }: AppProps) => {

    const { setScrollCounter, scroll } = UseLoadingService();
    
    const { event, modules  } = UseEventService();

    const [dates, setDates] = React.useState<any>([]);
    const [currentIndex, setCurrentIndex] = React.useState<number>();
   
    React.useEffect(() => {
        setDates(programs[0]);
        setCurrentIndex(0);
      }, [])
    
    React.useEffect(() => {
        if(currentIndex !== undefined){
            setDates(programs[currentIndex]);
        }
      }, [programs])

    const RenderPrograms = ({ programs, dates, currentIndex, setCurrentIndex, dashboard }: any) => {
        
        return (
            <>
                {dates?.length > 0 && currentIndex !== undefined && <>
                    <HStack my={my !== undefined ? my : 3} py="2" w="100%" bg="primary.darkbox" space="0" alignItems="center">
                        <Center alignItems="flex-start" w="10%">
                            {currentIndex > 0 && 
                                <IconButton
                                    p="0"
                                    w="40px"
                                    variant="transparent"
                                    icon={<Icon size="md" as={SimpleLineIcons} name="arrow-left" color="primary.text" />}
                                    onPress={() => {
                                        setCurrentIndex(currentIndex - 1);
                                        setDates(programs[currentIndex - 1]);
                                    }}
                                />
                            }
                        </Center>
                        <Center w="80%">
                            <Heading fontWeight={500} fontSize="lg">{dates[0]?.heading_date}</Heading>
                        </Center>
                        <Center alignItems="flex-end" w="10%">
                            {(currentIndex < (programs.length - 1)) &&  programs.length > 1 && 
                                <IconButton
                                    p="0"
                                    w="40px"
                                    variant="transparent"
                                    icon={<Icon size="md" as={SimpleLineIcons} name="arrow-right" color="primary.text" />}
                                    onPress={() => {
                                        setCurrentIndex(currentIndex + 1);
                                        setDates(programs[currentIndex + 1]);
                                    }}
                                />
                            }
                        </Center>
                    </HStack>
                    {dates?.map((program: Program, key: number) => {
                        if(program.workshop_programs?.length > 0){
                            let newProgram ={ ...program};
                            if(dashboard == true){
                                newProgram.workshop_programs = dates.length <= 5 ? program.workshop_programs.slice(0, (5 - (dates.length - 1))) : (dates.length > 5 ? program.workshop_programs.slice(0, 1) : program.workshop_programs);
                            }
                           return <WorkshopCollapsableView  section={section} speaker={speaker} program={newProgram} k={key} border={dates?.length !== (key + 1) && !dates[key + 1]?.workshop_programs} />
                        }
                        else{
                           return <RectangleDetailView workshop={false} section={section} speaker={speaker} program={program} k={key} border={dates?.length !== (key + 1) && !dates[key + 1]?.workshop_programs} />
                        }
                    }
                    )}
                </>}
            </>
        )
    }

    const totalPrograms = (programs: any) => {
        let total = 0;
        programs.forEach((program: any) => total += program.length);
        return total;
    }

    return (
        <>
            {in_array(section, ['program', 'my-program', 'track-program']) && (
                <>
                    {Platform.OS === 'web' ? (
                        <>
                            {/* {programs?.map((item: any, index: any) =>
                                <React.Fragment key={index}>
                                    <RenderPrograms dates={item} />
                                </React.Fragment>
                            )} */}
                            
                             {programs.length > 0 && <RenderPrograms programs={programs} dates={dashboard == true ? dates.slice(0, 5) : dates} dashboard={dashboard} currentIndex={currentIndex} setCurrentIndex={setCurrentIndex} />}
                             {programs.length <= 0 && 
                                <Box overflow="hidden" bg="primary.box" w="100%" rounded="lg">
                                    <Box padding={5}>
                                            <Text>{event?.labels?.EVENT_NORECORD_FOUND}</Text>
                                        </Box>
                                </Box>
                             }

                        </>
                    ) : (
                        <FlatList
                            style={{ width: '100%' }}
                            data={programs}
                            renderItem={({ item }: any) => {
                                return (
                                    <>
                                        <RenderPrograms programs={item} />
                                    </>
                                );
                            }}
                            keyExtractor={(item, index) => index.toString()}
                            onEndReached={async () => {
                                if (totalPrograms(programs) >= 20) {
                                    setScrollCounter(scroll + 1);
                                }
                            }}
                            onEndReachedThreshold={0.1}
                        />
                    )}
                </>
            )}
            {section === 'workshops' && (
                programs?.map((program: any, key: any) =>
                    <WorkshopRectangleDetailView key={key} program={program} k={key} />
                )
            )}
        </>
    );
};

export default SlideView;
