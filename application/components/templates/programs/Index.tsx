import * as React from 'react';
import { Button, Container, HStack, Spacer, Text } from 'native-base';
import { useState } from 'react';
import Search from 'application/components/atoms/Search';
import SlideView from 'application/components/molecules/programs/SlideView';
import UseProgramService from 'application/store/services/UseProgramService';
import in_array from "in_array";
import SectionLoading from 'application/components/atoms/SectionLoading';
import UseLoadingService from 'application/store/services/UseLoadingService';
import UseAuthService from 'application/store/services/UseAuthService';

const Index = () => {

    const [tab, setTab] = useState<string>('program');

    const mounted = React.useRef(false);

    const { FetchPrograms, programs, page, id, query, track_id } = UseProgramService();

    const { loading, scroll, processing } = UseLoadingService();

    const { response } = UseAuthService();

    React.useEffect(() => {
        if (mounted.current) {
            if (in_array(tab, ['program', 'my-program'])) {
                console.log(tab)
                FetchPrograms({ page: 1, query: '', screen: tab, id: tab === 'my-program' ? response?.data?.user?.id : 0, track_id: track_id });
            } else if (tab === "track") {
                //Tracks
            }
        }
    }, [tab]);

    React.useEffect(() => {
        if (mounted.current) {
            if (in_array(tab, ['program', 'my-program'])) {
                FetchPrograms({ query: '', page: page + 1, screen: tab, id: tab === 'my-program' ? response?.data?.user?.id : 0, track_id: track_id });
            } else if (tab === "track") {
                //Tracks
            }
        }
    }, [scroll]);

    React.useEffect(() => {
        mounted.current = true;
        return () => { mounted.current = false; };
    }, []);

    return (
        <>
            <HStack mb="3" pt="2" w="100%" space="3" alignItems="center">
                <Text fontSize="2xl">PROGRAMS</Text>
                <Spacer />
                <Search />
            </HStack>
            <HStack mb="3" space={1} justifyContent="center" w="100%">
                <Button onPress={() => setTab('program')} borderWidth="1px" py={0} borderColor="primary.darkbox" borderRightRadius="0" borderLeftRadius={8} h="42px" bg={in_array(tab, ['program']) ? 'primary.darkbox' : 'primary.box'} w={'33%'} _text={{ fontWeight: '600' }}>PROGRAMS</Button>
                <Button onPress={() => setTab('my-program')} borderRadius="0" borderWidth="1px" py={0} borderColor="primary.darkbox" h="42px" bg={tab === 'my-program' ? 'primary.darkbox' : 'primary.box'} w={'33%'} _text={{ fontWeight: '600' }}>MY PROGRAMS</Button>
                <Button onPress={() => setTab('track')} borderWidth="1px" py={0} borderColor="primary.darkbox" borderLeftRadius="0" borderRightRadius={8} h="42px" bg={tab === 'track' ? 'primary.darkbox' : 'primary.box'} w={'33%'} _text={{ fontWeight: '600' }}>TRACKS</Button>
            </HStack>
            <>
                {in_array(tab, ['program', 'my-program']) && <Container mb="3" rounded="10" bg="primary.box" w="100%" maxW="100%">
                    {in_array('programs', processing) && page === 1 ? (
                        <SectionLoading />
                    ) : (
                        <SlideView section="program" programs={programs} />
                    )}
                </Container>}
            </>
            <>
                {tab === 'TRACKS' && <Container mb="3" rounded="10" bg="primary.box" w="100%" maxW="100%">
                    <SlideView section="tracks" />
                </Container>}
            </>
        </>
    );
};

export default Index;
