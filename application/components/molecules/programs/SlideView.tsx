import * as React from 'react';
import { Center, Heading, HStack, Icon, IconButton, Text, FlatList } from 'native-base';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons'
import RectangleDetailView from 'application/components/atoms/programs/RectangleDetailView';
import WorkshopRectangleDetailView from 'application/components/atoms/programs/workshops/RectangleDetailView';
import { Program } from 'application/models/program/Program'
import UseLoadingService from 'application/store/services/UseLoadingService';
import { Platform } from 'react-native';

type AppProps = {
    programs: Program[],
    section: string,
    my?: number,
    speaker:number
}

const SlideView = ({ programs, section, my, speaker }: AppProps) => {

    const { setScrollCounter, scroll } = UseLoadingService();

    const RenderPrograms = ({ dates }: { dates: any }) => {

        return (
            <>
                <HStack my={my !== undefined ? my : 3} py="2" w="100%" bg="primary.darkbox" space="0" alignItems="center">
                    <Center alignItems="flex-start" w="10%">
                        <IconButton
                            p="0"
                            w="40px"
                            variant="transparent"
                            icon={<Icon size="md" as={SimpleLineIcons} name="arrow-left" color="primary.text" />}
                            onPress={() => {
                                console.log('hello')
                            }}
                        />
                    </Center>
                    <Center w="80%">
                        <Heading fontSize="lg">{dates[0]?.heading_date}</Heading>
                    </Center>
                    <Center alignItems="flex-end" w="10%">
                        <IconButton
                            p="0"
                            w="40px"
                            variant="transparent"
                            icon={<Icon size="md" as={SimpleLineIcons} name="arrow-right" color="primary.text" />}
                            onPress={() => {
                                console.log('hello')
                            }}
                        />
                    </Center>
                </HStack>
                {dates?.map((program: Program, key: number) =>
                    <React.Fragment key={key}>
                        {program.workshop_programs?.length > 0 ? (
                            <React.Fragment>
                                <Text w="100%" pl="30px" bg="primary.darkbox">{program.program_workshop}</Text>
                                {program.workshop_programs?.map((workshop_program: Program, i: number) =>
                                    <RectangleDetailView speaker={speaker} program={workshop_program} k={i} border={program.workshop_programs?.length !== (i + 1)} />
                                )}
                            </React.Fragment>
                        ) : (
                            <RectangleDetailView speaker={speaker} program={program} k={key} border={dates?.length !== (key + 1) && !dates[key + 1]?.workshop_programs} />
                        )}
                    </React.Fragment>
                )}
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
            {section === 'program' && (
                <>
                    {Platform.OS === 'web' ? (
                        <>
                            {programs?.map((item: any, index: any) =>
                                <React.Fragment key={index}>
                                    <RenderPrograms dates={item} />
                                </React.Fragment>
                            )}
                        </>
                    ) : (
                        <FlatList
                            style={{ width: '100%' }}
                            data={programs}
                            renderItem={({ item }: any) => {
                                return (
                                    <>
                                        <RenderPrograms dates={item} />
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
