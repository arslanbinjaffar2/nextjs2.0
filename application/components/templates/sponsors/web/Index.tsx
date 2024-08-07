import React, { useEffect, useState, useRef } from 'react';
import { Box, Button, Container, HStack, Icon, IconButton, Input, Spacer, Text, ScrollView } from 'native-base';
import AntDesign from '@expo/vector-icons/AntDesign';
import Entypo from '@expo/vector-icons/Entypo';
import UseSponsorService from 'application/store/services/UseSponsorService';
import RectangleView from 'application/components/atoms/sponsors/RectangleView';
import CategoryRectangleView from 'application/components/atoms/sponsors/categories/RectangleView';
import BoxView from 'application/components/atoms/sponsors/BoxView';
import { Sponsor } from 'application/models/sponsor/Sponsor';
import debounce from 'lodash.debounce';
import WebLoading from 'application/components/atoms/WebLoading';
import UseLoadingService from 'application/store/services/UseLoadingService';
import { SponsorCategory } from 'application/models/sponsor/SponsorCategory';
import UseEventService from 'application/store/services/UseEventService';
import UseEnvService from 'application/store/services/UseEnvService';
import BannerAds from 'application/components/atoms/banners/BannerAds';
import NextBreadcrumbs from 'application/components/atoms/NextBreadcrumbs';
import { useRouter } from 'solito/router';
import { useSearchParams, usePathname } from 'next/navigation';
import NoRecordFound from 'application/components/atoms/NoRecordFound';
import SectionLoading from 'application/components/atoms/SectionLoading';
import IntersectionObserverComponent from 'application/components/atoms/IntersectionObserverComponent';
import LoadMore from 'application/components/atoms/LoadMore';
import in_array from "in_array";

const Index = React.memo(() => {
    const { push, back } = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const tabQueryParam = searchParams.get('tab');
    const modeQueryParam = searchParams.get('mode');
    const categoryIdQueryParam = searchParams.get('category_id');
    const [page, setPage] = useState(1);
    const mounted = useRef(false);

    const createQueryString = React.useCallback(
      (name, value) => {
          const params = new URLSearchParams(searchParams.toString());
          params.set(name, value);
          return params.toString();
      },
      [searchParams]
    );

    const { event, modules } = UseEventService();
    const { loading, scroll, processing } = UseLoadingService();
    const { _env } = UseEnvService();

    const [tab, setTab] = useState(tabQueryParam !== null ? tabQueryParam : event?.sponsor_settings?.sponsor_list);
    const [mode, setMode] = useState(modeQueryParam ? modeQueryParam : 'grid');
    const [searchQuery, setSearch] = useState('');
    const { sponsors, labels, categories, FetchSponsors, category_id, query, total_pages } = UseSponsorService();

    useEffect(() => {
        FetchSponsors({ category_id: Number((categoryIdQueryParam !== null && tabQueryParam === 'category-sponsor') ? categoryIdQueryParam : 0), query: '', page: 1, screen: 'sponsors' });
        setTab(tabQueryParam !== null ? tabQueryParam : event?.sponsor_settings?.sponsor_list);
        setPage(1); // Reset page number on tab change
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
        return debounce(function (query) {
            FetchSponsors({ category_id: Number((categoryIdQueryParam !== null && tab === 'category-sponsor') ? categoryIdQueryParam : 0), query: query, page: 1, screen: 'sponsors' });
            setPage(1); // Reset page number on search
        }, 1000);
    }, []);

    useEffect(() => {
        setSearch(query);
    }, [query]);

    useEffect(() => {
        mounted.current = true;
        return () => { mounted.current = false; };
    }, []);

    const loadMore = () => {
        if (mounted.current && page < total_pages) {
            const nextPage = page + 1;
            FetchSponsors({ page: nextPage, category_id: Number((categoryIdQueryParam !== null && tab === 'category-sponsor') ? categoryIdQueryParam : 0), query: searchQuery, screen: 'sponsors' });
            setPage(nextPage);
        }
    };

    const module = modules.find((module) => module.alias === 'sponsors');
    const category = categories?.find((category) => category.id === Number(categoryIdQueryParam));
    const title = tab === "category-sponsor" ? category?.name : "";

    return (
      <>
          <NextBreadcrumbs module={module} title={title} />
          <Container h="100%" alignItems={'flex-start'} pt="4" maxW="100%" w="100%">
              <HStack display={['block', 'flex']} mb="3" pt="2" w="100%" space="3" alignItems="center">
                  <Text pb={['3', '0']} fontSize="2xl">{modules?.find((sponsors) => (sponsors.alias === 'sponsors'))?.name ?? ""}</Text>
                  <Spacer />
                  <Input rounded="10" w={['100%', '60%']} bg="primary.box" borderWidth={0} value={searchQuery} placeholder={event.labels.GENERAL_SEARCH} onChangeText={(text) => {
                      search(text);
                      setSearch(text);
                  }} leftElement={<Icon ml="2" color="primary.text" size="lg" as={AntDesign} name="search1" />} />
              </HStack>
              
                {(event?.sponsor_settings?.sponsorTab == 1) && (
                    <HStack mb="3" space={1} justifyContent="center" w="100%">
                    {(event?.sponsor_settings?.sponsorTab == 1 || event?.sponsor_settings?.sponsor_list == 'name') && <Button _hover={{_text: {color: 'primary.hovercolor'}}} onPress={() => {
                        setTab('name')
                        FetchSponsors({ category_id: 0, query: '', screen: 'sponsors' });
                        push(`/${event.url}/sponsors` + '?' + createQueryString('tab', 'name'))
                    }} 
                    borderWidth="0px" py={0} borderColor="primary.box" borderRightRadius={(event?.sponsor_settings?.sponsorTab == 1 || event?.sponsor_settings?.sponsor_list == 'category') ? 0 : 8} borderLeftRadius={8} h="42px" bg={tab === 'name' ? 'primary.boxbutton' : 'primary.box'} w={(event?.sponsor_settings?.sponsorTab == 1 || event?.sponsor_settings?.sponsor_list == 'category') ? "50%" : '100%'} _text={{ fontWeight: '600' }}>{labels?.SPONSOR_NAME}</Button>}
                    {(event?.sponsor_settings?.sponsorTab == 1 || event?.sponsor_settings?.sponsor_list == 'category') && <Button _hover={{_text: {color: 'primary.hovercolor'}}} onPress={() => {
                        setTab('category')
                        FetchSponsors({ category_id: 0, query: '', screen: 'sponsors' });
                        push(`/${event.url}/sponsors` + '?' + createQueryString('tab', 'category'))
                        }} borderWidth="0px" py={0} borderColor="primary.box" borderLeftRadius={(event?.sponsor_settings?.sponsorTab == 1 || event?.sponsor_settings?.sponsor_list == 'name') ? 0 : 8} borderRightRadius={8} h="42px" bg={tab === 'category' || tab === 'category-sponsor' ? 'primary.boxbutton' : 'primary.box'}
                                                                                                                                  w={(event?.sponsor_settings?.sponsorTab == 1 || event?.sponsor_settings?.sponsor_list == 'name') ? "50%" : "100%"} _text={{ fontWeight: '600' }}>{labels?.SPONSOR_CATEGORY || "Category"}</Button>}
                    </HStack>
                    )}

                {loading ? (
                    <SectionLoading />
                ) : (
                    <>
                        {(tab === 'name' || tab === 'category-sponsor') && <>
                            {sponsors?.length > 0 && (
                            <HStack w="100%" mb="3" space="1" alignItems="center" justifyContent="flex-end">
                                <IconButton
                                    opacity={mode === "list" ? 100 : 50}
                                    p="0"
                                    variant="transparent"
                                    icon={<Icon size="xl" as={Entypo} name="menu" color="primary.text" />}
                                    onPress={() => {
                                        setMode('list')
                                        push(`/${event.url}/sponsors` + '?' + createQueryString('mode', 'list'))
                                    }}

                            />
                            <IconButton
                                p="0"
                                opacity={mode === "grid" ? 100 : 50}
                                variant="transparent"
                                icon={<Icon size="xl" as={Entypo} name="grid" color="primary.text" />}
                                onPress={() => {
                                    setMode('grid');
                                    push(`/${event.url}/sponsors` + '?' + createQueryString('mode', 'grid'));
                                }}
                              />
                          </HStack>
                        )}
                        {mode === "list" &&
                          <Box mb={3} w="100%" rounded="10" bg="primary.box" borderWidth={0} borderColor="primary.box">
                              <ScrollView h={'53%'}>
                                  {sponsors?.length > 0 && sponsors.map((sponsor: Sponsor, key: number) =>
                                    <RectangleView border={sponsors.length === 0 ? 0 : sponsors.length > 0 && key === sponsors.length - 1 ? 0 : 1} sponsor={sponsor} key={key} />
                                  )}
                              </ScrollView>
                          </Box>
                        }
                        {mode === "grid" &&
                            <Box w="100%">
                                <ScrollView h={'53%'} w={'100%'}>
                                    <HStack direction="row" flexWrap="wrap" space="0" alignItems="flex-start">
                                        {sponsors?.length > 0 && sponsors.map((sponsor: Sponsor, key: number) =>
                                            <BoxView sponsor={sponsor} k={key} />
                                        )}
                                    </HStack>
                                </ScrollView>
                            </Box>
                        }
                        {sponsors?.length <= 0 &&
                        <NoRecordFound mb="3" bg="primary.box"/>
                           
                        }
                    </>}
                    {tab === 'category' && (
                                <Box w="100%" rounded="10" bg="primary.box" borderWidth={0} borderColor="primary.bdBox">
                          {categories?.length > 0 ? (
                            <ScrollView h={'60%'} w={'100%'}>
                                <HStack direction="row" flexWrap="wrap" space="0" alignItems="flex-start">
                                    {categories?.map((category: SponsorCategory, key: number) => (
                                      <CategoryRectangleView category={category} k={key} key={key} updateTab={updateTab} />
                                    ))}
                                </HStack>
                            </ScrollView>
                          ) : (
                            <NoRecordFound />
                          )}
                      </Box>
                    )}
                    <BannerAds module_name={'sponsors'} module_type={'listing'} />
                </>
              )}
              {in_array('sponsors-listing', processing) && (page > 1) && (
                <HStack mt={3} w="100%">
                    <LoadMore />
                </HStack>
              )}
              {!loading && !in_array('sponsors', processing) && (total_pages > 1) && (
                <>
                    <IntersectionObserverComponent onIntersect={loadMore} />
                </>
              )}
          </Container>
      </>
    );
});

export default Index;