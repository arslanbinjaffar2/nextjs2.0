import React from 'react'
import { Box, Button, Container, HStack, Icon, IconButton, Input, Spacer, Text, ScrollView } from 'native-base';
import AntDesign from '@expo/vector-icons/AntDesign';
import Entypo from '@expo/vector-icons/Entypo';
import UseSponsorService from 'application/store/services/UseSponsorService';
import RectangleView from 'application/components/atoms/sponsors/RectangleView';
import CategoryRectangleView from 'application/components/atoms/sponsors/categories/RectangleView';
import BoxView from 'application/components/atoms/sponsors/BoxView';
import { Sponsor } from 'application/models/sponsor/Sponsor'
import BannerView from 'application/components/atoms/banners/RectangleView';
import debounce from 'lodash.debounce';
import WebLoading from 'application/components/atoms/WebLoading';
import UseLoadingService from 'application/store/services/UseLoadingService';
import { SponsorCategory } from 'application/models/sponsor/SponsorCategory';
import UseEventService from 'application/store/services/UseEventService';

const Index = React.memo(() => {

    const { event } = UseEventService()

    const { loading } = UseLoadingService();

    const [tab, setTab] = React.useState(event?.sponsor_settings?.sponsor_list);

    const [mode, setMode] = React.useState('grid')

    const [searchQuery, setSearch] = React.useState('')

    const { sponsors, categories, FetchSponsors, category_id, query } = UseSponsorService();

    const updateTab = (tab: string) => {
        setTab(tab);
    }

    React.useEffect(() => {
        return () => {
            search.cancel();
        };
    }, []);

    const search = React.useMemo(() => {
        return debounce(function (query: string) {
            FetchSponsors({ category_id: category_id, query: query, screen: 'sponsors' });
        }, 1000);
    }, []);

    React.useEffect(() => {
        setSearch(query);
    }, [query]);

    return (
        <>
            {loading ? (
                <WebLoading />
            ) : (
                <Container h="100%" pt="4" maxW="100%" w="100%">
                    <HStack mb="3" pt="2" w="100%" space="3" alignItems="center">
                        <Text textTransform="uppercase" fontSize="2xl">Sponsors</Text>
                        <Spacer />
                        <Input rounded="10" w={'60%'} bg="primary.box" borderWidth={0} value={searchQuery} placeholder="Search" onChangeText={(text: string) => {
                            search(text);
                            setSearch(text);
                        }} leftElement={<Icon ml="2" color="primary.text" size="lg" as={AntDesign} name="search1" />} />
                    </HStack>
                    <HStack mb="3" space={1} justifyContent="center" w="100%">
                       {(event?.sponsor_settings?.sponsorTab == 1 || event?.sponsor_settings?.sponsor_list == 'name') && <Button onPress={() => setTab('name')} borderWidth="1px" py={0} borderColor="primary.darkbox" borderRightRadius={(event?.sponsor_settings?.sponsorTab == 1 || event?.sponsor_settings?.sponsor_list == 'category') ? 0 : 8} borderLeftRadius={8} h="42px" bg={tab === 'name' ? 'primary.box' : 'primary.darkbox'} w={(event?.sponsor_settings?.sponsorTab == 1 || event?.sponsor_settings?.sponsor_list == 'category') ? "50%" : '100%'} _text={{ fontWeight: '600' }}>NAME</Button>}
                       {(event?.sponsor_settings?.sponsorTab == 1 || event?.sponsor_settings?.sponsor_list == 'category') &&<Button onPress={() => setTab('category')} borderWidth="1px" py={0} borderColor="primary.darkbox" borderLeftRadius={(event?.sponsor_settings?.sponsorTab == 1 || event?.sponsor_settings?.sponsor_list == 'name') ? 0 : 8} borderRightRadius={8} h="42px" bg={tab === 'category' ? 'primary.box' : 'primary.darkbox'} w={(event?.sponsor_settings?.sponsorTab == 1 || event?.sponsor_settings?.sponsor_list == 'name') ? "50%" : "100%"} _text={{ fontWeight: '600' }}>CATEGORY</Button>}
                    </HStack>
                    {tab === 'name' && <>
                        <HStack w="100%" mb="3" space="1" alignItems="center" justifyContent="flex-end">
                            <IconButton
                                opacity={mode === "list" ? 100 : 50}
                                p="0"
                                variant="transparent"
                                icon={<Icon size="xl" as={Entypo} name="menu" color="primary.text" />}
                                onPress={() => {
                                    setMode('list')
                                }}

                            />
                            <IconButton
                                p="0"
                                opacity={mode === "grid" ? 100 : 50}
                                variant="transparent"
                                icon={<Icon size="xl" as={Entypo} name="grid" color="primary.text" />}
                                onPress={() => {
                                    setMode('grid')
                                }}

                            />
                        </HStack>
                        {mode === "list" &&
                            <Box w="100%" rounded="10" bg="primary.box" borderWidth="1" borderColor="primary.bdBox">
                                <ScrollView h={'53%'}>
                                    {sponsors.length > 0 && sponsors.map((sponsor: Sponsor, key: number) =>
                                        <RectangleView sponsor={sponsor} k={key} key={key} />
                                    )}
                                </ScrollView>
                            </Box>
                        }
                        {mode === "grid" &&
                            <Box w="100%">
                                <ScrollView h={'53%'} w={'100%'}>
                                    <HStack direction="row" flexWrap="wrap" space="0" alignItems="flex-start">
                                        {sponsors.length > 0 && sponsors.map((sponsor: Sponsor, key: number) =>
                                            <BoxView sponsor={sponsor} k={key} />
                                        )}
                                    </HStack>
                                </ScrollView>
                            </Box>
                        }
                    </>}
                    {tab === 'category' && <Box w="100%" rounded="10" bg="primary.box" borderWidth="1" borderColor="primary.bdBox">
                        <ScrollView h={'60%'} w={'100%'}>
                            <HStack direction="row" flexWrap="wrap" space="0" alignItems="flex-start">
                                {categories.length > 0 && categories.map((category: SponsorCategory, key: number) =>
                                    <CategoryRectangleView category={category} k={key} key={key} updateTab={updateTab} />
                                )}
                            </HStack>
                        </ScrollView>
                    </Box>}
                    <BannerView url={''} />
                </Container>
            )}
        </>
    )

})

export default Index