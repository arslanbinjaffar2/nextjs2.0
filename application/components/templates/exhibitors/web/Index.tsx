import React, { useEffect, useState, useRef } from 'react';
import { Box, Button, Container, HStack, Icon, IconButton, Input, Spacer, Text, ScrollView, Image } from 'native-base';
import AntDesign from '@expo/vector-icons/AntDesign';
import Entypo from '@expo/vector-icons/Entypo';
import UseExhibitorService from 'application/store/services/UseExhibitorService';
import RectangleView from 'application/components/atoms/exhibitors/RectangleView';
import CategoryRectangleView from 'application/components/atoms/exhibitors/categories/RectangleView';
import BoxView from 'application/components/atoms/exhibitors/BoxView';
import { Exhibitor } from 'application/models/exhibitor/Exhibitor';
import BannerView from 'application/components/atoms/banners/RectangleView';
import debounce from 'lodash.debounce';
import WebLoading from 'application/components/atoms/WebLoading';
import UseLoadingService from 'application/store/services/UseLoadingService';
import { ExhibitorCategory } from 'application/models/exhibitor/ExhibitorCategory';
import UseEventService from 'application/store/services/UseEventService';
import { useSearchParams, usePathname } from 'next/navigation';
import { useRouter } from 'solito/router';
import BannerAds from 'application/components/atoms/banners/BannerAds';
import NextBreadcrumbs from 'application/components/atoms/NextBreadcrumbs';
import NoRecordFound from 'application/components/atoms/NoRecordFound';
import SectionLoading from 'application/components/atoms/SectionLoading';
import IntersectionObserverComponent from 'application/components/atoms/IntersectionObserverComponent';
import LoadMore from 'application/components/atoms/LoadMore';
import in_array from "in_array";

const Index = React.memo(() => {
    const { push, back } = useRouter();
    const searchParams = useSearchParams();
    const tabQueryParam = searchParams.get('tab');
    const modeQueryParam = searchParams.get('mode');
    const categoryIdQueryParam = searchParams.get('category_id');
    const [page, setPage] = useState(1);
    const createQueryString = React.useCallback(
        (name: string, value: string) => {
            const params = new URLSearchParams(searchParams.toString());
            params.set(name, value);
            if (name === 'tab' && value === 'name') {
                params.delete('category_id');
            }
            return params.toString();
        },
        [searchParams]
    );
    const { event, modules } = UseEventService();
    const { loading, scroll, processing } = UseLoadingService();
    const [tab, setTab] = React.useState(tabQueryParam !== null ? tabQueryParam : event?.exhibitor_settings?.exhibitor_list);
    const [mode, setMode] = React.useState(modeQueryParam ? modeQueryParam : 'grid');
    const [searchQuery, setSearch] = React.useState('');
    const { exhibitors, labels, categories, FetchExhibitors, category_id, query, total_pages } = UseExhibitorService();
    const mounted = useRef(false);

    React.useEffect(() => {
        FetchExhibitors({ category_id: Number((categoryIdQueryParam !== null && tab === 'category-exhibitors' ) ? categoryIdQueryParam : 0), query: '', page: 1, screen: 'exhibitors' });
        setTab(tabQueryParam !== null ? tabQueryParam : event?.exhibitor_settings?.exhibitor_list);
        setPage(1);  // Reset the page number when the tab changes
    }, [tabQueryParam]);

    const updateTab = (tab: string) => {
        setTab(tab);
    };

    useEffect(() => {
        return () => {
            search.cancel();
        };
    }, []);

    const search = React.useMemo(() => {
        return debounce(function (query: string) {
            FetchExhibitors({ category_id: Number((categoryIdQueryParam !== null && tab === 'category-exhibitors' ) ? categoryIdQueryParam : 0), query: query, page: 1, screen: 'exhibitors' });
            setPage(1);  // Reset the page number on search
        }, 1000);
    }, []);

    React.useEffect(() => {
        setSearch(query);
    }, [query]);

    useEffect(() => {
        mounted.current = true;
        return () => { mounted.current = false; };
    }, []);

    const loadMore = () => {
        if (mounted.current && page < total_pages) {
            const nextPage = page + 1;
            FetchExhibitors({ page: nextPage, category_id: Number((categoryIdQueryParam !== null && tab === 'category-exhibitors') ? categoryIdQueryParam : 0), query: searchQuery, screen: 'exhibitors' });
            setPage(nextPage);
        }
    };

    const module = modules.find((module) => module.alias === 'exhibitors');
    console.log(categories, 'categories');
    const category = categories.find((category) => category.id === Number(categoryIdQueryParam));
    
    return (
        <>
            <NextBreadcrumbs module={module} title={category?.name}/>
            <Container h="100%" pt="4" maxW="100%" w="100%">  
                    <HStack display={['block','flex']} mb="3" pt="2" w="100%" space="3" alignItems="center">
                        <Text pb={[3,0]} fontSize="2xl">{modules?.find((exhibitors)=>(exhibitors.alias === 'exhibitors'))?.name ?? ""}</Text>
                        <Spacer />
                        <Input rounded="10" w={['100%','60%']} bg="primary.box" borderWidth={0} value={searchQuery} placeholder={event.labels?.GENERAL_SEARCH} onChangeText={(text: string) => {
                            search(text);
                            setSearch(text);
                        }} leftElement={<Icon ml="2" color="primary.text" size="lg" as={AntDesign} name="search1" />} />
                    </HStack>
                {(event?.exhibitor_settings?.exhibitorTab === 1) && (
                    <HStack mb="3" space={1} justifyContent="center" w="100%">
                        {(event?.exhibitor_settings?.exhibitorTab === 1 || event?.exhibitor_settings?.exhibitor_list === 'name') && <Button _hover={{_text: {color: 'primary.hovercolor'}}} onPress={() => {
                            setTab('name');
                            FetchExhibitors({ category_id: 0, query: '', screen: 'exhibitors' });
                            push(`/${event.url}/exhibitors` + '?' + createQueryString('tab', 'name'));
                        }} borderWidth="0px" py={0} borderColor="primary.box" borderLeftRadius={8} borderRightRadius={(event?.exhibitor_settings?.exhibitorTab === 1 || event?.exhibitor_settings?.exhibitor_list === 'category') ? 0 : 8} h="42px" bg={tab === 'name' ? 'primary.boxbutton' : 'primary.box'} w={(event?.exhibitor_settings?.exhibitorTab === 1 || event?.exhibitor_settings?.exhibitor_list === 'category') ? "50%": "100%"} _text={{ fontWeight: '600' }}>{labels?.EXHIBITORS_NAME}</Button>}
                        {(event?.exhibitor_settings?.exhibitorTab === 1 || event?.exhibitor_settings?.exhibitor_list === 'category') && <Button _hover={{_text: {color: 'primary.hovercolor'}}} onPress={() => {
                            setTab('category');
                            FetchExhibitors({ category_id: 0, query: '', screen: 'exhibitors' });
                            push(`/${event.url}/exhibitors` + '?' + createQueryString('tab', 'category'));
                        }} borderWidth="0px" py={0} borderColor="primary.box" borderLeftRadius={(event?.exhibitor_settings?.exhibitorTab === 1 || event?.exhibitor_settings?.exhibitor_list === 'name') ? 0 : 8} borderRightRadius={8} h="42px" bg={tab === 'category' || tab === 'category-exhibitors' ? 'primary.boxbutton' : 'primary.box'} w={(event?.exhibitor_settings?.exhibitorTab === 1 || event?.exhibitor_settings?.exhibitor_list === 'name') ? "50%": "100%"} _text={{ fontWeight: '600' }}>{labels?.EXHIBITORS_CATEGORY}</Button>}
                    </HStack>
                )}
                {loading ? (
                    <SectionLoading />
                ) : (
                    <>
                        {(tab === 'name' || tab === 'category-exhibitors') && <>
                            {exhibitors.length > 0 &&
                                <HStack w="100%" mb="3" space="1" alignItems="center" justifyContent="flex-end">
                                    <IconButton
                                        opacity={mode === "list" ? 100 : 50}
                                        p="0"
                                        variant="transparent"
                                        icon={<Icon size="xl" as={Entypo} name="menu" color="primary.text" />}
                                        onPress={() => {
                                            setMode('list');
                                            push(`/${event.url}/exhibitors` + '?' + createQueryString('mode', 'list'));
                                        }}
                                    />
                                    <IconButton
                                        p="0"
                                        opacity={mode === "grid" ? 100 : 50}
                                        variant="transparent"
                                        icon={<Icon size="xl" as={Entypo} name="grid" color="primary.text" />}
                                        onPress={() => {
                                            setMode('grid');
                                            push(`/${event.url}/exhibitors` + '?' + createQueryString('mode', 'grid'));
                                        }}
                                    />
                                </HStack>
                            }
                            {mode === "list" &&
                                <Box mb={3} w="100%" rounded="10" bg="primary.box" borderWidth={"0"} borderColor="primary.box">
                                    <ScrollView h={'53%'}>
                                        {exhibitors.length > 0 && exhibitors.map((exhibitor: Exhibitor, key: number) =>
                                            <RectangleView exhibitor={exhibitor} border={exhibitors.length === 0 ? 0 : exhibitors.length > 0 && key === exhibitors.length - 1 ? 0 : 1} key={key} />
                                        )}
                                    </ScrollView>
                                </Box>
                            }
                            {mode === "grid" &&
                                <Box w="100%">
                                    <ScrollView h={'53%'} w={'100%'}>
                                        <HStack direction="row" flexWrap="wrap" space="0" alignItems="flex-start">
                                            {exhibitors.length > 0 && exhibitors.map((exhibitor: Exhibitor, key: number) =>
                                                <BoxView exhibitor={exhibitor} k={key} />
                                            )}
                                        </HStack>
                                    </ScrollView>
                                </Box>
                            }
                            {exhibitors.length <= 0 &&
                                <NoRecordFound mb="3" bg="primary.box" />
                            }
                        </>}
                        {tab === 'category' && <Box w="100%" rounded="10" bg={categories.length > 0 ? "primary.box" : ""} borderWidth="0" borderColor="primary.bdBox">
                            <ScrollView h={'60%'} w={'100%'}>
                                <HStack direction="row" flexWrap="wrap" space="0" alignItems="flex-start">
                                    {categories.length > 0 ?
                                        categories.map((category: ExhibitorCategory, key: number) =>
                                            <CategoryRectangleView category={category} k={key} key={key} updateTab={updateTab} />
                                        )
                                        :
                                        <NoRecordFound mb="3" bg="primary.box" />
                                    }
                                </HStack>
                            </ScrollView>
                        </Box>}
                        <BannerAds module_name={'exhibitors'} module_type={'listing'} />
                    </>
                )}
                {console.log(page, 'current page')}
                {(in_array('exhibitors', processing)) && (page < total_pages && total_pages > 1) && (
                    <LoadMore />
                )}
                {!loading && !in_array('exhibitors', processing) && (total_pages > 1) && (
                    <>
                       {console.log('dfdfdfd')}
                        <IntersectionObserverComponent onIntersect={loadMore} />
                    </>
                )}
            </Container>
        </>
    );
});

export default Index;
