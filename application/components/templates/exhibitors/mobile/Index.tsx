import React from 'react'
import { Box, Button, Container, HStack, Icon, IconButton, Input, Spacer, Text, ScrollView } from 'native-base';
import AntDesign from '@expo/vector-icons/AntDesign';
import Entypo from '@expo/vector-icons/Entypo';
import UseExhibitorService from 'application/store/services/UseExhibitorService';
import RectangleView from 'application/components/atoms/exhibitors/RectangleView';
import CategoryRectangleView from 'application/components/atoms/exhibitors/categories/RectangleView';
import BoxView from 'application/components/atoms/exhibitors/BoxView';
import { Exhibitor } from 'application/models/exhibitor/Exhibitor'
import { ExhibitorCategory } from 'application/models/exhibitor/ExhibitorCategory'
import BannerView from 'application/components/atoms/banners/RectangleView';
import debounce from 'lodash.debounce';
import MobileLoading from 'application/components/atoms/MobileLoading';
import UseLoadingService from 'application/store/services/UseLoadingService';
import UseEventService from 'application/store/services/UseEventService';
import { Keyboard } from 'react-native';

const Index = React.memo(() => {

    const { loading } = UseLoadingService();

    const [tab, setTab] = React.useState('name')

    const [mode, setMode] = React.useState('grid')
    const [searchQuery, setSearch] = React.useState('')

    const { exhibitors, categories, FetchExhibitors, category_id, query } = UseExhibitorService();
    const { event } = UseEventService()

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
            FetchExhibitors({ category_id: category_id, query: query, screen: 'exhibitors' });
            Keyboard.dismiss();
        }, 1000);
    }, []);

    React.useEffect(() => {
        setSearch(query);
    }, [query]);

    return (
        <>
            <Container maxW="100%" h={'93%'} w="100%">
                <HStack mb="3" w="100%" alignItems="center">
                    <Input rounded="10" bg="primary.box" borderWidth={0} value={searchQuery} placeholder={event.labels?.GENERAL_SEARCH} onChangeText={(text: string) => {
                        search(text);
                        setSearch(text);
                    }} leftElement={<Icon ml="2" color="primary.text" size="lg" as={AntDesign} name="search1" />} />
                </HStack>
                {loading ? (
                    <MobileLoading />
                ) : (
                    <>
                        <HStack mb="3" space={1} justifyContent="center" w="100%">
                            <Button onPress={() => setTab('name')} borderWidth="1px" py={0} borderColor="primary.darkbox" borderRightRadius="0" borderLeftRadius={8} h="42px" bg={tab === 'name' ? 'primary.box' : 'primary.darkbox'} w="50%" _text={{ fontWeight: '600' }}>NAME</Button>
                            <Button onPress={() => setTab('category')} borderWidth="1px" py={0} borderColor="primary.darkbox" borderLeftRadius="0" borderRightRadius={8} h="42px" bg={tab === 'category' ? 'primary.box' : 'primary.darkbox'} w="50%" _text={{ fontWeight: '600' }}>CATEGORY</Button>
                        </HStack>
                        {tab === 'name' && <>
                            <HStack w="100%" mb="3" space="1" alignItems="center" justifyContent="flex-end">
                                <Text textTransform="uppercase" fontSize="2xl">Exhibitors</Text>
                                <Spacer />
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
                                        {exhibitors.length > 0 && exhibitors.map((exhibitor: Exhibitor, key: number) =>
                                            <RectangleView exhibitor={exhibitor} k={key} key={key} />
                                        )}
                                    </ScrollView>
                                </Box>
                            }
                            {mode === "grid" &&
                                <Box w="100%">
                                    <ScrollView h={'53%'} w={'100%'}>
                                        <HStack direction="row" flexWrap="wrap" space="0" alignItems="flex-start">
                                            {exhibitors.length > 0 && exhibitors.map((exhibitor: Exhibitor, key: number) =>
                                                <BoxView exhibitor={exhibitor} k={key} key={key} />
                                            )}
                                        </HStack>
                                    </ScrollView>
                                </Box>
                            }
                        </>}
                        {tab === 'category' && <Box w="100%" rounded="10" bg="primary.box" borderWidth="1" borderColor="primary.bdBox">
                            <ScrollView h={'60%'} w={'100%'}>
                                <HStack direction="row" flexWrap="wrap" space="0" alignItems="flex-start">
                                    {categories.length > 0 && categories.map((category: ExhibitorCategory, key: number) =>
                                        <CategoryRectangleView category={category} k={key} key={key} updateTab={updateTab} />
                                    )}
                                </HStack>
                            </ScrollView>
                        </Box>}
                        <BannerView url={''} />
                    </>
                )}
            </Container>
        </>
    )

})

export default Index