import * as React from 'react';
import { Center, Heading, HStack, Icon, IconButton, Text, FlatList, Box } from 'native-base';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons'
import RectangleDetailView from 'application/components/atoms/programs/RectangleDetailView';
import WorkshopRectangleDetailView from 'application/components/atoms/programs/workshops/RectangleDetailView';
import { Program } from 'application/models/program/Program'
import UseLoadingService from 'application/store/services/UseLoadingService';
import { Platform } from 'react-native';
import in_array from "in_array";

type AppProps = {
    programs: Program[],
    section: string,
    my?: number,
    speaker?:number
}

const SlideView = ({ programs, section, my, speaker }: AppProps) => {

    const { setScrollCounter, scroll } = UseLoadingService();

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

    const RenderPrograms = ({ programs, dates, currentIndex, setCurrentIndex }: any) => {
        
        return (
            <>
                {dates.length > 0 && currentIndex !== undefined && <>
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
                            <Heading fontSize="lg">{dates[0]?.heading_date}</Heading>
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
                    {dates?.map((program: Program, key: number) =>
                        <React.Fragment key={key}>
                            {program.workshop_programs?.length > 0 ? (
                                <React.Fragment>
                                    <Text w="100%" pl="30px" bg="primary.darkbox">{program.program_workshop}</Text>
                                    {program.workshop_programs?.map((workshop_program: Program, i: number) =>
                                        <RectangleDetailView section={section} speaker={speaker} program={workshop_program} k={i} border={program.workshop_programs?.length !== (i + 1)} />
                                        )}
                                    <Box w={"100%"} height={2} bg="primary.darkbox"></Box>
                                </React.Fragment>
                            ) : (
                                <RectangleDetailView section={section} speaker={speaker} program={program} k={key} border={dates?.length !== (key + 1) && !dates[key + 1]?.workshop_programs} />
                            )}
                        </React.Fragment>
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
                            
                             {programs.length > 0 && <RenderPrograms programs={programs} dates={dates} currentIndex={currentIndex} setCurrentIndex={setCurrentIndex} />}

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
