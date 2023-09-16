import * as React from 'react';
import { Center, Heading, HStack, Icon, IconButton, Text } from 'native-base';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons'
import RectangleDetailView from 'application/components/atoms/programs/RectangleDetailView';
import WorkshopRectangleDetailView from 'application/components/atoms/programs/workshops/RectangleDetailView';
import TrackRectangleDetailView from 'application/components/atoms/programs/tracks/RectangleDetailView';
import { Program } from 'application/models/program/Program'

type AppProps = {
    programs: any[],
    section: string
}

const SlideView = ({ programs, section }: AppProps) => {

    return (
        <>
            {section === 'program' && (
                <>
                    {programs?.map((dates: any, index: any) =>
                        <React.Fragment key={index}>
                            <HStack my={3} py="2" w="100%" bg="primary.darkbox" space="0" alignItems="center">
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
                                                <RectangleDetailView program={workshop_program} k={i} border={program.workshop_programs?.length !== (i + 1)} />
                                            )}
                                        </React.Fragment>
                                    ) : (
                                        <RectangleDetailView program={program} k={key} border={dates?.length !== (key + 1) && !dates[key + 1]?.workshop_programs} />
                                    )}
                                </React.Fragment>
                            )}
                        </React.Fragment>
                    )}
                </>
            )}
            {section === 'tracks' && (
                programs?.map((program: any, key: any) =>
                    <TrackRectangleDetailView key={key} program={program} k={key} />
                )
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
