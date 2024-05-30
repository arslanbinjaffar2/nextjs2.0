import React, { useEffect } from 'react'
import { useState } from 'react';
import { Button, Container, HStack, Pressable, Spacer, Text, VStack, Icon, Input, Image, Box, View, Flex } from 'native-base'
import RectangleAttendeeView from 'application/components/atoms/attendees/RectangleView';
import RectangleGroupView from 'application/components/atoms/attendees/groups/RectangleView';
import UseAuthService from 'application/store/services/UseAuthService';
import UseAttendeeService from 'application/store/services/UseAttendeeService';
import { Attendee } from 'application/models/attendee/Attendee';
import UseLoadingService from 'application/store/services/UseLoadingService';
import UseEventService from 'application/store/services/UseEventService';
import SectionLoading from 'application/components/atoms/SectionLoading';
import debounce from 'lodash.debounce';
import LoadMore from 'application/components/atoms/LoadMore';
import { Group } from 'application/models/attendee/Group';
import in_array from "in_array";
import AntDesign from '@expo/vector-icons/AntDesign';
import GroupAlphabatically from 'application/utils/GroupAlphabatically';
import { createParam } from 'solito';
import { useRouter } from 'solito/router'
import { useSearchParams, usePathname } from 'next/navigation'
import RectangleCategoryView from 'application/components/atoms/attendees/categories/RectangleView';
import { Category } from 'application/models/event/Category';
import BannerAds from 'application/components/atoms/banners/BannerAds'
import NextBreadcrumbs from 'application/components/atoms/NextBreadcrumbs';
import ButtonElement from 'application/components/atoms/ButtonElement'
import NoRecordFound from 'application/components/atoms/NoRecordFound';

type ScreenParams = { slug: any }

const { useParam } = createParam<ScreenParams>()

type Props = {
    speaker: number,
    screen: string,
    banner_module?:string
}

const Index = ({ speaker, screen, banner_module }: Props) => {

    const { push, back } = useRouter()

    const pathname = usePathname()
    
    const searchParams = useSearchParams()

    const tabQueryParam = searchParams.get('tab')

    const tab1 = React.useRef<HTMLDivElement>();
    const tab2 = React.useRef<HTMLDivElement>();
    const tab3 = React.useRef<HTMLDivElement>();
    const tab4 = React.useRef<HTMLDivElement>();
    const tab5 = React.useRef<HTMLDivElement>();

    const createQueryString = React.useCallback(
        (name: string, value: string) => {
          const params = new URLSearchParams(searchParams.toString())
          params.set(name, value)
     
          return params.toString()
        },
        [searchParams]
    )

    const mounted = React.useRef(false);

    const { scroll, processing } = UseLoadingService();

    const { response } = UseAuthService();

    const { event, modules } = UseEventService();
    const [tab, setTab] = useState<string | null>(tabQueryParam !== null ? tabQueryParam : (speaker === 1 ?  (event?.speaker_settings?.default_display !== 'name' ? 'category' : 'attendee') :  (event?.attendee_settings?.default_display !== 'name' ? 'group' : 'attendee')));

    const alpha = Array.from(Array(26)).map((e, i) => i + 65);

    const alphabet = alpha.map((x) => String.fromCharCode(x));

    const { attendees, FetchAttendees, query, page, FetchGroups, groups, group_id, group_name, category_id, FetchCategories, categories, category_name, parent_id, UpdateCategory, last_page } = UseAttendeeService();

    const [searchQuery, setSearch] = React.useState('')

    const [slug] = useParam('slug');

    useEffect(() => {
        const newTabQueryParam = searchParams.get('tab')
        if(tab !== newTabQueryParam){
            setTab(newTabQueryParam);
        }
        
    }, [searchParams]);

    useEffect(() => {
        if (mounted.current) {
            if (in_array(tab, ['attendee', 'group-attendee', 'my-attendee']) && page < last_page ) {
                FetchAttendees({ query: query, group_id: group_id, page: page + 1, my_attendee_id: tab === "my-attendee" ? response?.data?.user?.id : 0, speaker: speaker, category_id: category_id, screen: speaker ? 'speakers' : 'attendees', program_id: 0 });
            }
        }
    }, [scroll]);

    useEffect(() => {
        if (mounted.current) { 
            if (tab === "group") {
                FetchGroups({ query: query, group_id: 0, page: 1, attendee_id: 0, program_id: 0 });
            } else if (in_array(tab, ['attendee', 'my-attendee', 'category-attendee'])) { console.log('call 2')
                FetchAttendees({ query: query, group_id: 0, page: 1, my_attendee_id: tab === "my-attendee" ? response?.data?.user?.id : 0, speaker: speaker, category_id: category_id, screen: speaker ? 'speakers' : 'attendees', program_id: 0 });
            } else if (in_array(tab, ['category'])) {
                FetchCategories({ parent_id: 0, query: query, page: 1, cat_type: 'speakers' })
            } else if (in_array(tab, ['sub-category'])) {
                FetchCategories({ parent_id: Number((searchParams.get('category_id') !== null ? searchParams.get('category_id') : 0)), query: query, page: 1, cat_type: 'speakers' })
            } else if (in_array(tab, ['sub-group'])) {
                FetchGroups({ query: query, group_id: (Number((searchParams.get('group_id') !== null ? searchParams.get('group_id') : 0))), page: 1, attendee_id: 0, program_id: 0 });
            }else{
                console.log('RIBA')
                UpdateCategory({ category_id: 0, category_name: '', parent_id:0 });
                setTab('attendee');
            }
        }
    }, [tab, category_id]);

    useEffect(() => {
        mounted.current = true;
        return () => { mounted.current = false; };
    }, []);

    useEffect(() => {
        console.log("🚀 ~ useEffect ~ slug:", slug)
        if (slug !== undefined && slug.length === 1) { // Group attendees by slug
            setTab('group-attendee'); console.log('call 3')
            FetchAttendees({ query: query, group_id: slug[0], page: 1, my_attendee_id: 0, speaker: speaker, category_id: 0, screen: speaker ? 'speakers' : 'attendees', program_id: 0 });
        } else if ((slug === undefined || slug.length === 0) && tab === 'attendee' && screen === "my-attendees") {
            setTab('attendee'); console.log('call 4')
            FetchAttendees({ query: '', group_id: 0, page: 1, my_attendee_id: response?.data?.user?.id , speaker: 0, category_id: 0, screen: speaker ? 'speakers' : 'attendees', program_id: 0 });
        } else if ((slug === undefined || slug.length === 0) && tab === 'attendee') {
            setTab('attendee'); console.log('call 4')
            FetchAttendees({ query: '', group_id: 0, page: 1, my_attendee_id: 0, speaker: speaker, category_id: category_id, screen: speaker ? 'speakers' : 'attendees', program_id: 0 });
        }
        else if ((slug === undefined || slug.length === 0) && tab === 'category-attendee') {
            setTab('category-attendee'); console.log('call 4')
            FetchAttendees({ query: '', group_id: 0, page: 1, my_attendee_id: 0, speaker: speaker, category_id: Number((searchParams.get('category_id') !== null ? searchParams.get('category_id') : 0)), screen: 'speakers', program_id: 0 });
        }
         else if ((slug === undefined || slug.length === 0) && tab === 'category') {
            console.log("🚀 ~ Index ~ tab:", tab)
            setTab('category');
            FetchCategories({ parent_id: 0, query: query, page: 1, cat_type: 'speakers' })
        } else if ((slug === undefined || slug.length === 0) && tab === 'sub-category') {
            setTab('sub-category');
            FetchCategories({ parent_id: Number((searchParams.get('category_id') !== null ? searchParams.get('category_id') : 0)), query: query, page: 1, cat_type: 'speakers' })
        } else if ((slug === undefined || slug.length === 0) && tab === 'group') {
            setTab('group');
            FetchGroups({ query: query, group_id: 0, page: 1, attendee_id: 0, program_id: 0 });
        } else if ((slug === undefined || slug.length === 0) && tab === 'sub-group') {
            setTab('sub-group');
            FetchGroups({ query: query, group_id: (Number((searchParams.get('group_id') !== null ? searchParams.get('group_id') : 0))), page: 1, attendee_id: 0, program_id: 0 });
        }
    }, [slug, tab]);

    const updateTab = (tab: string) => {
        setTab(tab); 
    }

    React.useEffect(() => {
        return () => {
            search.cancel();
        };
    }, []);

    const search = React.useMemo(() => {
        return debounce(function (query: string, tab:string) {
            if (tab === "group") {
                FetchGroups({ query: query, group_id: group_id, page: 1, attendee_id: 0, program_id: 0 });
            } else if (tab === "category") {
                FetchCategories({ parent_id: 0, query: query, page: 1, cat_type: 'speakers' })
            } else if (tab === "sub-category") {
                FetchCategories({ parent_id: Number((searchParams.get('category_id') !== null ? searchParams.get('category_id') : 0)), query: query, page: 1, cat_type: 'speakers' })
            }else if (in_array(tab, ['attendee', 'group-attendee', 'my-attendee'])) {console.log('call 5')
                FetchAttendees({ query: query, group_id: group_id, page: 1, my_attendee_id: tab === "my-attendee" ? response?.data?.user?.id : 0, speaker: speaker, category_id: category_id, screen: speaker ? 'speakers' : 'attendees', program_id: 0 });
            }
        }, 1000);
    }, []);

    React.useEffect(() => {
        setSearch(query);
    }, [query]);

    React.useEffect(() => { 
        if (screen === 'my-attendees') {
            setTab('my-attendee');
        }
    }, [screen]);
    const [breadcrumbs, setBreadcrumbs] = useState([]);
    const updateBreadcrumbs = (category: Category) => {
        setBreadcrumbs((prev:any) => {
            const index = prev.findIndex((item: Category) => item.id === category.id);
            if (index !== -1) {
                return prev.slice(0, index + 1);
            } else if (category.parent_id === 0) {
                return [category];
            } else {
                return [...prev, category];
            }
        });
    };

    const goBack = () => {
        setBreadcrumbs((prev) => {
            if (prev.length <= 1) {
                setTab('category');
                push(`/${event.url}/speakers` + '?' + createQueryString('tab', 'category'));
                return [];
            } else {
                const newBreadcrumbs = prev.slice(0, -1);
                const parentCategory = newBreadcrumbs[newBreadcrumbs.length - 1];
                if (parentCategory) {
                    handleNavigation(parentCategory);
                }
                return newBreadcrumbs;
            }
        });
    };

    const handleBreadcrumbClick = (category:Category) => {
        const index = breadcrumbs.findIndex((item: Category) => item.id === category.id);
        if (index !== -1) {
            setBreadcrumbs(breadcrumbs.slice(0, index + 1));
            handleNavigation(category);
        }
    };

    const createQueryStringCat = React.useCallback(
        (array:{name: string, value: string}[]) => {
          const params = new URLSearchParams(searchParams.toString())
          array.forEach((i)=>{
              params.set(i.name, i.value)
          });
          return params.toString()
        },
        [searchParams]
    )

    const handleNavigation = (category: Category) => {
        if (category.parent_id > 0) {
            UpdateCategory({ category_id: category.id, category_name: category.name, parent_id:category.parent_id });
            push(`/${event.url}/speakers?`+ createQueryStringCat([{name:'tab', value:'category-attendee'}, {name:'category_id', value:`${category.id}`}]));
        } else {
            push(pathname + '?' + createQueryStringCat([{name:'tab', value:'sub-category'}, {name:'category_id', value:`${category.id}`}]))
        }
    };

    const module = (speaker === 0 ? (screen === 'attendees' ? modules?.find((attendee) => attendee.alias === 'attendees') : modules?.find((attendee) => attendee.alias === 'my-attendee-list')) : modules?.find((speaker) => speaker.alias === 'speakers'))
    return (
        <>
            <NextBreadcrumbs module={module} />
            <HStack display={["block","flex"]} mb="3" pt="2" w="100%" space="3" alignItems="center" justifyContent={'space-between'}>
                <Text fontSize="2xl" width={'40%'}>
                {speaker === 0 ? (screen === 'attendees' ? 
                    (modules?.find(attendee => attendee.alias === 'attendees')?.name ?? '')
                    :  
                    (modules?.find(attendee => attendee.alias === 'my-attendee-list')?.name ?? '')
                ) 
                : 
                (modules?.find(speaker => speaker.alias === 'speakers')?.name ?? '')

                }
                </Text>
                <Input rounded="10" w={['100%','60%']} bg="primary.box" borderWidth={0} 
                borderColor={'transparent'}
                value={searchQuery} placeholder={event.labels?.GENERAL_SEARCH} onChangeText={(text: string) => {
                    search(text, tab!);
                    setSearch(text);
                }} leftElement={<Icon ml="2" color="primary.text" size="lg" as={AntDesign} name="search1" />} />
              
            </HStack>
            {screen === 'attendees' && (
                <>
                    {speaker === 0 && <HStack mb="3" space={1} overflow={'hidden'} rounded={8} flexWrap={'wrap'} justifyContent="center" w="100%">
                        {(((event?.attendee_settings?.default_display === 'name' || event?.attendee_settings?.tab == 1))) &&  (event?.attendee_settings?.tab == 1 || modules?.some(module => module.alias === 'my-attendee-list')) && 
                            <ButtonElement
                                onPress={() => {
                                    setTab('attendee');
                                    setBreadcrumbs([]);
                                    push(`/${event.url}/attendees` + '?' + createQueryString('tab', 'attendee'))
                                }} 
                                bg={in_array(tab, ['attendee', 'group-attendee']) ? 'primary.boxbutton' : 'primary.box'} 
                               
                            >
                                {event?.labels?.EVENTSITE_BTN_ALL_EVENT_ATTENDEES}
                            </ButtonElement>}
                            {
                                modules?.some(module => module.alias === 'my-attendee-list') && (
                                    <Button
                                        onPress={() => {
                                            setTab('my-attendee')
                                            setBreadcrumbs([]);
                                            push(`/${event.url}/attendees` + '?' + createQueryString('tab', 'my-attendee'))
                                        }} 
                                        borderRadius="0" 
                                        borderWidth="0px" 
                                        py={0} 
                                        borderColor="primary.darkbox" 
                                        h="42px" 
                                        borderRightRadius={(event?.attendee_settings?.default_display != 'name' || event?.attendee_settings?.tab == 1) ? 0 : 8} 
                                        borderLeftRadius={(event?.attendee_settings?.default_display == 'name' || event?.attendee_settings?.tab == 1) ? 0 : 8} 
                                        bg={tab === 'my-attendee' ? 'primary.boxbutton' : 'primary.box'} 
                                        w={event?.attendee_settings?.tab == 1 ? '33%' : '50%'} 
                                        _text={{ fontWeight: '600' }}
                                    >
                                        {modules?.find((module) => (module.alias == 'my-attendee-list'))?.name ?? 'My attendees'}
                                    </Button>
                                )
                            }
                        {(event?.attendee_settings?.default_display !== 'name' || event?.attendee_settings?.tab == 1) &&
                                <ButtonElement
                                    onPress={() => {
                                        setTab('group')
                                        setBreadcrumbs([]);
                                        push(`/${event.url}/attendees` + '?' + createQueryString('tab', 'group'))
                                    }} 
                                  
                                    bg={tab === 'group' ? 'primary.boxbutton' : 'primary.box'} 
                                    >       
                                    {event?.labels?.ATTENDEE_LIST_BY_GROUP}
                                </ButtonElement>
                        }
                    </HStack>}
                    {speaker ===  1 && <HStack overflow={'hidden'} rounded={8} flexWrap={'wrap'}  mb="3" space={1} justifyContent="center" w="100%">
                        
                        {(( event?.speaker_settings?.tab == 1)) &&  
                            <ButtonElement
                                onPress={() => {
                                    setTab('attendee') 
                                    push(`/${event.url}/speakers` + '?' + createQueryString('tab', 'attendee'))
                                    UpdateCategory({ category_id: 0, category_name: '', parent_id:0 });
                                    setBreadcrumbs([]);
                                }} 
                                
                                bg={in_array(tab, ['attendee', 'group-attendee']) ? 'primary.boxbutton' : 'primary.box'} 
                            >
                                {event?.labels?.SPEAKER_NAME}
                            </ButtonElement>
                        }
                        {(event?.speaker_settings?.tab == 1) &&
                            <ButtonElement 
                                onPress={() => {
                                    setTab('category')
                                    push(`/${event.url}/speakers` + '?' + createQueryString('tab', 'category'))
                                    setBreadcrumbs([]);
                                }} 
                                bg={tab === 'category' || tab === 'sub-category' || tab === 'category-attendee' ? 'primary.boxbutton' : 'primary.box'} 
                            >
                               {event?.labels?.SPEAKER_CATEGORY}
                            </ButtonElement>
                        }
                    </HStack>}
                    {group_id > 0 && (
                        <>
                        <HStack mb="1" pt="2" w="100%" space="3">
                            <Pressable
                                onPress={async () => {
                                    setBreadcrumbs([]);
                                    back()
                                }}>
                                    <HStack alignItems={'center'} space={3}>
                                        <Icon as={AntDesign} name="arrowleft" size="xl" color="primary.text" />
                                        <Text>{event?.labels?.GENERAL_BACK}</Text>
                                    </HStack>
                            </Pressable>
                        </HStack>
                        {group_name && (
                            <Text mb={1}  textAlign={'center'} textBreakStrategy='simple' w={'100%'} fontSize="xl">{group_name}</Text>
                        )}
                        </>
                    )}
                      {breadcrumbs.length > 0 && (
                        <HStack alignItems={'center'} mb="3" pt="2" w="100%" space="3">
                            <Text flex="1" textTransform="uppercase" fontSize="sm">
                                {breadcrumbs.map((breadcrumb:any, index) => (
                                    <React.Fragment key={breadcrumb.id}>
                                        <Pressable onPress={() => handleBreadcrumbClick(breadcrumb)}>
                                            <Text textTransform="uppercase" fontSize="sm">
                                                {breadcrumb.name}
                                            </Text>
                                        </Pressable>
                                        {index < breadcrumbs.length - 1 && (
                                            <Icon color={'primary.text'} as={AntDesign} name="right" />
                                        )}
                                    </React.Fragment>
                                ))}
                            </Text>
                            {breadcrumbs.length > 0 && (
                                <Pressable onPress={goBack}>
                                    <Text textTransform="uppercase" fontSize="sm">
                                        <Icon color={'primary.text'} as={AntDesign} name="left" /> Go back
                                    </Text>
                                </Pressable>
                            )}
                        </HStack>
                    )}
                </>
            )}
            {/* {speaker === 0 && ((tab === 'attendee' && attendees.length > 0) || (tab === 'group' && groups.length > 0) || (tab === 'my-attendee' && attendees.length > 0 )) && (
              <VStack w="20px" position="absolute" right={["-16px","-20px"]} top="163px" space="1">
                  {alphabet.map((item, k) =>
                    <React.Fragment key={k}>
                        <Text textAlign="center" color="primary.text" opacity="0.5" fontSize="md">{item}</Text>
                    </React.Fragment>
                  )}
              </VStack>
            )} */}
            <>
                {(in_array('attendee-listing', processing) || in_array('category-listing', processing) || in_array('groups', processing)) && page === 1 ? (
                    <SectionLoading />
                ) : (
                    <>
                        {in_array(tab, ['attendee', 'my-attendee', 'group-attendee', 'category-attendee']) && <Container position="relative" mb="3" rounded="10" bg="primary.box" w="100%" maxW="100%">
                            {speaker === 0 && GroupAlphabatically(attendees, 'first_name').map((map: any, k: number) =>
                                <React.Fragment key={`item-box-${k}`}>
                                    {map?.letter && (
                                        <Text roundedTop={k === 0 ? 10 : 0} w="100%" pl="18px" bg="primary.darkbox">
                                            {map?.letter}
                                            </Text>
                                    )}
                                    {map?.records?.map((attendee: Attendee, k: number) =>
                                        <React.Fragment key={`${k}`}>
                                            <RectangleAttendeeView attendee={attendee} border={map?.records.length === 1 ? 0 : map?.records.length > 1 && k ===  map?.records.length -1 ? 0 : 1 } speaker={speaker} />
                                        </React.Fragment>
                                    )}
                                </React.Fragment>
                            )}
                            {speaker === 1 && attendees?.map((attendee: Attendee, k: number) =>
                                        <React.Fragment key={`${k}`}>
                                            <RectangleAttendeeView attendee={attendee} border={attendees.length > 0 && attendees[attendees.length - 1]?.id !== attendee?.id ? 1 : 0} speaker={speaker} />
                                        </React.Fragment>
                             )}
                            {attendees.length <= 0 &&
                            <NoRecordFound/>
                          
                            }
                        </Container>}
                        {(tab === 'group' || tab === 'sub-group') && <Container mb="3" rounded="10" bg="primary.box" w="100%" maxW="100%">
                            {GroupAlphabatically(groups, 'info').map((map: any, k: number) =>
                                <React.Fragment key={`item-box-group-${k}`}>
                                    {map?.letter && (
                                        <Text roundedTop={k === 0 ? 10 : 0} w="100%" pl="18px" bg="primary.darkbox">
                                            {map?.letter}
                                            </Text>
                                    )}
                                    {map?.records?.map((group: Group, k: number) =>
                                        <React.Fragment key={`${k}`}>
                                            <RectangleGroupView group={group} k={k} border={map?.records.length === 1 ? 0 : map?.records.length > 1 && k ===  map?.records.length -1 ? 0 : 1 } updateTab={updateTab} />
                                        </React.Fragment>
                                    )}
                                </React.Fragment>
                            )}
                            {groups.length <= 0 &&
                            <NoRecordFound />

                            }
                        </Container>}
                        {(tab === 'category' || tab === 'sub-category') && speaker === 1 && <Container mb="3" rounded="10" bg="primary.box" w="100%" maxW="100%">
                            {categories.map((category: Category, k: number) =>
                                <React.Fragment key={`item-box-group-${k}`}>
                                    <RectangleCategoryView category={category} updateBreadcrumbs={updateBreadcrumbs} k={k} border={categories.length != (k + 1)} navigation={true} updateTab={updateTab} screen="listing" />
                                </React.Fragment>
                            )}
                            { categories.length <= 0 &&
                            <NoRecordFound />
                               
                            }
                        </Container>}
                    </>
                )}
                {banner_module &&
                        <BannerAds module_name={banner_module} module_type={'listing'} />
                }
                
            </>
            {(in_array('attendee-listing', processing) || in_array('groups', processing) || in_array('category-listing', processing)) && page > 1 && (
                <LoadMore />
            )}
        </>
    )

}

export default Index