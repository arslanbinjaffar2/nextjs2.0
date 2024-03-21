import React, { useEffect } from 'react'
import { Box, Button, Container, HStack, Icon, IconButton, Input, Spacer, Text, ScrollView, Image } from 'native-base'
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
import UseEnvService from 'application/store/services/UseEnvService'
import BannerAds from 'application/components/atoms/banners/BannerAds'
import NextBreadcrumbs from 'application/components/atoms/NextBreadcrumbs';

import { useRouter } from 'solito/router'
import { useSearchParams, usePathname } from 'next/navigation'
const Index = React.memo(() => {

    const { push, back } = useRouter()

    const pathname = usePathname()

    const searchParams = useSearchParams()

    const tabQueryParam = searchParams.get('tab')

    const modeQueryParam = searchParams.get('mode')

    const categoryIdQueryParam = searchParams.get('category_id')

    const createQueryString = React.useCallback(
        (name: string, value: string) => {
            const params = new URLSearchParams(searchParams.toString())
            params.set(name, value)

            return params.toString()
        },
        [searchParams]
    )

    const { event, modules } = UseEventService()

    const { loading } = UseLoadingService();
    const { _env } = UseEnvService()

    const [tab, setTab] = React.useState(tabQueryParam !== null ? tabQueryParam : event?.sponsor_settings?.sponsor_list);

    const [mode, setMode] = React.useState(modeQueryParam ? modeQueryParam : 'grid')

    const [searchQuery, setSearch] = React.useState('')

    const { sponsors,labels, categories, FetchSponsors, category_id, query } = UseSponsorService();

    React.useEffect(() => {
        FetchSponsors({ category_id: Number((categoryIdQueryParam !== null && tabQueryParam == 'category-sponsor') ? categoryIdQueryParam : 0), query: '', screen: 'sponsors' });
        setTab(tabQueryParam !== null ? tabQueryParam : event?.sponsor_settings?.sponsor_list)
    }, [tabQueryParam]);


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
            FetchSponsors({ category_id: Number((categoryIdQueryParam !== null && tab == 'category-sponsor') ? categoryIdQueryParam : 0), query: query, screen: 'sponsors' });
        }, 1000);
    }, []);

    React.useEffect(() => {
        setSearch(query);
    }, [query]);
    const module = modules.find((module) => module.alias === 'sponsors');
    const category = categories.find((category) => {
        return category.id === Number(categoryIdQueryParam)
    })
    return (
        <>
            <NextBreadcrumbs module={module} title={category?.name} />
            <Container h="100%" alignItems={'flex-start'} pt="4" maxW="100%" w="100%">
                <HStack mb="3" pt="2" w="100%" space="3" alignItems="center">
                    <Text textTransform="uppercase" fontSize="2xl">{modules?.find((sponsors)=>(sponsors.alias == 'sponsors'))?.name ?? ""}</Text>
                    <Spacer />
                    <Input rounded="10" w={'60%'} bg="primary.box" borderWidth={0} value={searchQuery} placeholder={event.labels.GENERAL_SEARCH} onChangeText={(text: string) => {
                        search(text);
                        setSearch(text);
                    }} leftElement={<Icon ml="2" color="primary.text" size="lg" as={AntDesign} name="search1" />} />
                </HStack>
                {(event?.sponsor_settings?.sponsorTab == 1 || event?.sponsor_settings?.sponsor_list == 'category') && (
                    <HStack mb="3" space={1} justifyContent="center" w="100%">
                    {(event?.sponsor_settings?.sponsorTab == 1 || event?.sponsor_settings?.sponsor_list == 'name') && <Button onPress={() => {
                        setTab('name')
                        FetchSponsors({ category_id: 0, query: '', screen: 'sponsors' });
                        push(`/${event.url}/sponsors` + '?' + createQueryString('tab', 'name'))
                    }} 
                    borderWidth="1px" py={0} borderColor="primary.box" borderRightRadius={(event?.sponsor_settings?.sponsorTab == 1 || event?.sponsor_settings?.sponsor_list == 'category') ? 0 : 8} borderLeftRadius={8} h="42px" bg={tab === 'name' ? 'primary.boxbutton' : 'primary.box'} w={(event?.sponsor_settings?.sponsorTab == 1 || event?.sponsor_settings?.sponsor_list == 'category') ? "50%" : '100%'} _text={{ fontWeight: '600' }}>{labels?.SPONSOR_NAME}</Button>}
                    {(event?.sponsor_settings?.sponsorTab == 1 || event?.sponsor_settings?.sponsor_list == 'category') && <Button onPress={() => {
                        setTab('category')
                        FetchSponsors({ category_id: 0, query: '', screen: 'sponsors' });
                        push(`/${event.url}/sponsors` + '?' + createQueryString('tab', 'category'))

                        }} borderWidth="1px" py={0} borderColor="primary.box" borderLeftRadius={(event?.sponsor_settings?.sponsorTab == 1 || event?.sponsor_settings?.sponsor_list == 'name') ? 0 : 8} borderRightRadius={8} h="42px" bg={tab === 'category' ? 'primary.boxbutton' : 'primary.box'} w={(event?.sponsor_settings?.sponsorTab == 1 || event?.sponsor_settings?.sponsor_list == 'name') ? "50%" : "100%"} _text={{ fontWeight: '600' }}>{labels?.SPONSOR_CATEGORY}</Button>}
                    </HStack>
                    )}

                {loading ? (
                    <WebLoading />
                ) : (
                    <>
                        {(tab === 'name' || tab === 'category-sponsor') && <>
                            {sponsors.length > 0 && (
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
                                    setMode('grid')
                                    push(`/${event.url}/sponsors` + '?' + createQueryString('mode', 'grid'))
                                }}

                            />
                        </HStack>
                        )}
                        {mode === "list" &&
                                    <Box w="100%" rounded="10" bg="primary.box" borderWidth={sponsors.length > 0 ?"1":"0"} borderColor="primary.box">
                                <ScrollView h={'53%'}>
                                    {sponsors.length > 0 && sponsors.map((sponsor: Sponsor, key: number) =>
                                        <RectangleView border={sponsors.length === 0 ? 0 : sponsors.length > 0 && key === sponsors.length-1 ? 0 : 1} sponsor={sponsor}  key={key} />
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
                        {sponsors.length <= 0 &&
                            <Box p={3} mb="3" bg="primary.box" rounded="lg" w="100%">
                                <Text>{event?.labels?.GENERAL_NO_RECORD}</Text>
                            </Box>
                        }
                    </>}

                    {tab === 'category' && (
                                <Box w="100%" rounded="10" bg="primary.box" borderWidth={categories.length > 0 ? "1":"0"} borderColor="primary.bdBox">
                          {categories.length > 0 ? (
                            <ScrollView h={'60%'} w={'100%'}>
                                <HStack direction="row" flexWrap="wrap" space="0" alignItems="flex-start">
                                    {categories.map((category: SponsorCategory, key: number) => (
                                      <CategoryRectangleView category={category} k={key} key={key} updateTab={updateTab} />
                                    ))}
                                </HStack>
                            </ScrollView>
                          ) : (
                            <Box p={3}>
                                <Text>{event?.labels?.GENERAL_NO_RECORD}</Text>
                            </Box>
                          )}
                      </Box>
                    )}
                    <Box width={"100%"} height={"5%"}>
                        <BannerAds module_name={'sponsors'} module_type={'listing'} />
                    </Box>
                    </>
                )}

                </Container>
                </>
    )
})

export default Index