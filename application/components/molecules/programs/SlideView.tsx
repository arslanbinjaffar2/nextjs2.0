import * as React from 'react';
import { Center, Heading, HStack, Icon, IconButton, Text, FlatList, Box, Pressable, VStack } from 'native-base';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons'
import RectangleDetailView from 'application/components/atoms/programs/RectangleDetailView';
import WorkshopCollapsableView from 'application/components/atoms/programs/WorkshopCollapsableView';
import WorkshopRectangleDetailView from 'application/components/atoms/programs/workshops/RectangleDetailView';
import { Program } from 'application/models/program/Program'
import UseLoadingService from 'application/store/services/UseLoadingService';
import { Platform } from 'react-native';
import in_array from "in_array";
import UseEventService from 'application/store/services/UseEventService';
import { useRouter } from 'next/router';
import moment from 'moment';

type AppProps = {
    programs: Program[],
    section: string,
    my?: number,
    speaker?:number
    dashboard?:boolean
}

const SlideView = ({ programs, section, my, speaker, dashboard }: AppProps) => {

    const { setScrollCounter, scroll, processing } = UseLoadingService();
    
    const { event, modules  } = UseEventService();

    const [dates, setDates] = React.useState<any>([]);
    const [currentIndex, setCurrentIndex] = React.useState<number>();
    const router = useRouter();
   
    React.useEffect(() => {
        let indexFromQuery= router.asPath.split('currentIndex=')[1];
        const currentIndex = indexFromQuery ? parseInt(indexFromQuery) : 0;
        setDates(programs[currentIndex]);
        setCurrentIndex(currentIndex);
    }, [])

    React.useEffect(() => {
        if (currentIndex !== undefined) {
            const queryParams = { ...router.query, ['currentIndex']: currentIndex };

            router.push({
              pathname: router.pathname,
              query: queryParams,
            });

        }
    }, [currentIndex]);
    
    React.useEffect(() => {
        console.log(programs, 'programs')
        if(currentIndex !== undefined){
            setDates(programs[currentIndex]);
        }
      }, [programs])

    const RenderPrograms = ({ programs, dates, currentIndex, setCurrentIndex, dashboard }: any) => {
        
        return (
            <>
                {programs.length > 0 && <Box mt={'4'} bg={'primary.darkbox'}w={'100%'} p={4}>
                <HStack space={3} w={'100%'}>
                    {programs?.map((item: any, index: any) => 
                        <Pressable key={index} onPress={() => {
                            setCurrentIndex(index);
                            setDates(programs[index]);
                        }}>
                            <Box justifyContent={'center'} display={'flex'} alignItems={'center'} w={'80px'} h={'80px'} px={2} bg={currentIndex === index ? "secondary.500" : "primary.box"} rounded="md">
                                <VStack  space="1">
                                <Text fontSize={'sm'} textTransform={'uppercase'} textAlign={'center'} fontWeight={'400'} color={currentIndex === index ? "primary.text" : "primary.text"}>{moment(item[0]?.date).format('ddd')}</Text>
                                <Text fontSize={'md'} textAlign={'center'} color={currentIndex === index ? "primary.text" : "primary.text"}>{moment(item[0]?.date).format('D')}</Text>
                                </VStack>
                                
                            </Box>
                        </Pressable>
                    )
                    }
                </HStack>
                </Box>}
                {dates?.length > 0 && currentIndex !== undefined && <>
                    
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
                                            <Text>{event?.labels?.GENERAL_NO_RECORD}</Text>
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
