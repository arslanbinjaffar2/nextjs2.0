import React, { useState, useEffect } from 'react'
import { Box, Button, Center, Container, Flex, HStack, Icon, Input, Pressable, Spacer, View, Text, Image, VStack } from 'native-base';
import AntDesign from '@expo/vector-icons/AntDesign'
import SectionLoading from 'application/components/atoms/SectionLoading';
import UseLoadingService from 'application/store/services/UseLoadingService';
import UseEnvService from 'application/store/services/UseEnvService';
import UseEventService from 'application/store/services/UseEventService';
import UseNetworkInterestService from 'application/store/services/UseNetworkInterestService';
import { Keyword } from 'application/models/networkInterest/NetworkInterest';
import { useRouter } from 'solito/router';
import { Attendee } from 'application/models/attendee/Attendee';
import RectangleAttendeeView from 'application/components/atoms/attendees/RectangleView';
import { Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import DynamicIcon from 'application/utils/DynamicIcon';
import BannerAds from 'application/components/atoms/banners/BannerAds'
import NextBreadcrumbs from 'application/components/atoms/NextBreadcrumbs';
import in_array from "in_array";
import { colors } from 'application/styles';
import NoRecordFound from 'application/components/atoms/NoRecordFound';

const Index = () => {
  const { processing, loading } = UseLoadingService();

  const { _env } = UseEnvService();

  const { event, modules } = UseEventService();

  const [showAttendees, setShowAttendees] = useState(false);

  const [enableFilter, setEnableFilter] = useState<boolean>(false);

  const { keywords, FetchNetworkInterests, searchMatchAttendees, searchingAttendees, FetchSearchMatchAttendees } = UseNetworkInterestService();

  useEffect(() => {
    FetchNetworkInterests();
  }, [])

  const module = modules.find((module) => module.alias === 'business');
 console.log(processing)
  return (
    <>
      <NextBreadcrumbs module={module} />
      {loading ? <SectionLoading /> :
        <>
          {enableFilter ?
            <>
              {(!in_array('keywords',processing) && keywords.length <= 0) && <Text pt={5}>No keyword found</Text>}
              {(!in_array('keywords',processing) && keywords.length > 0) && <ManageKeywords
                keywords={keywords}
                searchMatchAttendees={searchMatchAttendees}
                searchingAttendees={searchingAttendees}
                FetchSearchMatchAttendees={FetchSearchMatchAttendees}
                showAttendees={showAttendees}
                setShowAttendees={setShowAttendees}
                setEnableFilter={setEnableFilter}
              />}
            </>
            : 
            <>
            <MatchedAttendeeList
              keywords={keywords}
              searchMatchAttendees={searchMatchAttendees}
              FetchSearchMatchAttendees={FetchSearchMatchAttendees}
              setEnableFilter={setEnableFilter}
              />
               
              </>
            }

          <BannerAds module_name={'business'} module_type={'listing'} />
        </>
      }
    </>
  )
}

export default Index


const MatchedAttendeeList = ({ keywords, searchMatchAttendees, FetchSearchMatchAttendees, setEnableFilter }: { keywords: Keyword[], searchMatchAttendees: Attendee[] | null, FetchSearchMatchAttendees: (payload: any) => void,  setEnableFilter: React.Dispatch<React.SetStateAction<boolean>> }) => {
  const { event, modules } = UseEventService();
  const { processing, loading } = UseLoadingService();

  const [searchTerm, setSearchTerm] = useState("");

  const [mySearchkeywords, setMySearchKeywords] = useState([]);
  const [searching, setSearching] = useState<boolean>(false);
  const [filteredAttendees, setFilteredAttendees] = useState<Attendee[]>([]);

  const processKeywords = (keywords:any) => {
    return keywords?.reduce((ack:any, item:any) => {
      const children = item?.children?.reduce((ack2:any, item2:any) => {
        if (item2?.keywords?.length > 0) {
          return [item2.id, ...ack2];
        } else {
          return ack2;
        }
      }, []);
      if (item?.keywords?.length > 0) {
        return [item?.id, ...children, ...ack];
      } else {
        return [...ack, ...children];
      }
    }, []);
  };

  useEffect(() => {
    const newSearchKeywords = processKeywords(keywords);
    setMySearchKeywords(newSearchKeywords);
  }, [keywords]);

  useEffect(() => {
    const performSearch = async () => {
      if (searchTerm.length > 0) {
        setSearching(true);
        await new Promise(resolve => setTimeout(resolve, 0));
        const filteredAttendees = (searchMatchAttendees?.filter((attendee) =>
          attendee?.first_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          attendee?.last_name?.toLowerCase().includes(searchTerm.toLowerCase())
        )) || [];
        await setFilteredAttendees(filteredAttendees);
        await new Promise(resolve => setTimeout(resolve, 500)); // Adding delay before setting searching to false
        setSearching(false);
      } else {
        setFilteredAttendees(searchMatchAttendees || []);
      }
    };
    performSearch();
  }, [searchTerm, searchMatchAttendees]);

  useEffect(() => {
    if (mySearchkeywords.length > 0) {
      FetchSearchMatchAttendees(mySearchkeywords);
    }
  }, [mySearchkeywords]);

  return (
    <>
      <HStack display={["block", "flex"]} mb="3" pt="2" w="100%" alignItems="center" justifyContent={'space-between'}>
        <Text fontSize="2xl">{event?.labels?.GENERAL_NETWORK_INTEREST_MATCHED_ATTENDEES ?? modules?.find((attendees) => (attendees.alias == 'attendees'))?.name ?? ""}</Text>
        <View flexDirection={'row'} alignItems={'center'} w={['100%', '60%']} justifyContent={'space-between'}
        style={{ gap:8 }}
        >
        <Input rounded="10" w={['88%', '90%']} bg="primary.box" borderWidth={0}
            borderColor={'transparent'}
            value={searchTerm} placeholder={event.labels?.GENERAL_SEARCH} onChangeText={(text: string) => {
              setSearchTerm(text);
            }} leftElement={<Icon ml="2" color="primary.text" size="lg" as={AntDesign} name="search1" />} />
          <Pressable rounded="10" bg="primary.box" p={'8px'} onPress={() => setEnableFilter(true)}>
            <DynamicIcon iconType={'attendee_Match'} iconProps={{ width: 20, height: 22 }} />
          </Pressable>
        </View>
      </HStack>
      {in_array('keywords',processing) || searching || loading || !searchMatchAttendees ? <SectionLoading /> : <>
        <Container position="relative" mb="3" rounded="10" bg="primary.box" w="100%" maxW="100%">
          {filteredAttendees && filteredAttendees?.map((attendee: Attendee, k: number) =>
            <React.Fragment key={`${k}`}>
              <RectangleAttendeeView attendee={attendee} border={filteredAttendees.length > 0 && filteredAttendees[filteredAttendees.length - 1]?.id !== attendee?.id ? 1 : 0} speaker={0} />
            </React.Fragment>
          )}
          {filteredAttendees?.length === 0  &&
            <Box p={3} rounded="lg" w="100%">
              <Text fontSize="16px">{event?.labels?.GENERAL_NO_RECORD}</Text>
            </Box>
          }
        </Container>
      </>}
    </>

  );
}




const ManageKeywords = ({ keywords, searchMatchAttendees, searchingAttendees, FetchSearchMatchAttendees, showAttendees, setShowAttendees, setEnableFilter }: { keywords: Keyword[], searchMatchAttendees: Attendee[] | null, searchingAttendees: boolean, FetchSearchMatchAttendees: (payload: any) => void, showAttendees: boolean, setShowAttendees: React.Dispatch<React.SetStateAction<boolean>>, 
  setEnableFilter: React.Dispatch<React.SetStateAction<boolean>> }) => {

  const { event, modules } = UseEventService();
 const {processing}=UseLoadingService()
  const [interestkeywords, setInterestKeywords] = useState(keywords);
  const [mykeywords, setMyKeywords] = useState<any>([]);
  const [filteredkeywords, setFilteredKeywords] = useState<Keyword[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState<any[]>([]);
  const setFilter = (kid: any) => {
    setSearchTerm("");
    if (kid !== 0) {
      if (!filters.includes(kid)) {
        setFilters([...filters, kid])
      } else {
        setFilters([...filters.filter((item: any) => (item !== kid))])
      }
    } else {
      setFilters([]);
    }
  }

  const setSearch = (value: any) => {
    // setSearchTerm(value);
    if (value.length < 1) {
      setFilters([]);
      return;
    }
    const filterIds = interestkeywords?.filter((kword) => {
      if (kword?.name?.toLowerCase().indexOf(searchTerm?.toLowerCase()) > -1) {
        return true;
      }
      else if (kword?.children?.filter((subkey) => (subkey?.name?.toLowerCase().indexOf(searchTerm?.toLowerCase()) > -1))?.length! > 0) {
        return true;
      }
      else {
        return false;
      }
    })?.map((kword) => (kword?.id));
    setFilters([...filterIds]);
  }

  useEffect(() => {
    if (filters?.length > 0) {
      setFilteredKeywords([...interestkeywords?.filter((kword) => (filters?.indexOf(kword?.id) !== -1))])
    }
    else {
      setFilteredKeywords([])
    }
  }, [])


  const addMyKeyword = (kid: any) => {
    if (mykeywords?.indexOf(kid) === -1) {
      setMyKeywords([...mykeywords, kid])
    } else {
      setMyKeywords([...mykeywords?.filter((item: any) => (item !== kid))])
    }
  }

  const { push } = useRouter()
  const module = modules.find((module) => module.alias === 'business');
  const navigation: any = Platform.OS !== "web" ? useNavigation() : false;

  return (
    <>
     {(in_array('search-match-attendees',processing))?<SectionLoading/>:
     <>
      {showAttendees ? (
        <>
        <Container pt="2" maxW="100%" w="100%" >
         <HStack display={["block", "flex"]} mb="3" pt="2" w="100%" alignItems="center" justifyContent={'space-between'}>
        <Text fontSize="2xl">{event?.labels?.GENERAL_NETWORK_INTEREST_MATCHED_ATTENDEES ?? modules?.find((attendees) => (attendees.alias == 'attendees'))?.name ?? ""}</Text>
        <View flexDirection={'row'} alignItems={'center'} w={['100%', '60%']} justifyContent={'space-between'}
        style={{ gap:8 }}
        >
        <Input rounded="10" w={['88%', '90%']} bg="primary.box" borderWidth={0}
            borderColor={'transparent'}
            value={searchTerm} placeholder={event.labels?.GENERAL_SEARCH} onChangeText={(text: string) => {
              setSearchTerm(text);
            }} leftElement={<Icon ml="2" color="primary.text" size="lg" as={AntDesign} name="search1" />} />
          <Pressable rounded="10" bg="primary.box" p={'8px'} onPress={() => setShowAttendees(false)}>
            <DynamicIcon iconType={'attendee_Match'} iconProps={{ width: 20, height: 22 }} />
          </Pressable>
        </View>
        </HStack>
        <>
       { (in_array('search-match-attendees',processing)) ? <SectionLoading/>:
        <>
          {searchMatchAttendees && <Box bg="primary.box" maxW="100%" w="100%" mb={2} rounded={8}>
            {searchMatchAttendees.map((attendee: any, k: number) =>
              <RectangleAttendeeView attendee={attendee} border={searchMatchAttendees.length - 1 == k ? 0 : 1} speaker={0} />
            )}
          </Box>} 
            </>}
            </>
          {!searchingAttendees && !searchMatchAttendees && <NoRecordFound mb={3} bg="primary.box"/>}
          {/* {!searchingAttendees && <Box w="100%" mb="3" alignItems="center">
            <Button
              size="lg"
              minH="58px"
              w="100%"
              maxW="400px"
              shadow="1"
              _text={{ fontWeight: 600, fontSize: '2xl' }}
              colorScheme="primary"
              onPress={() => {
                setShowAttendees(false);

              }}
            >
              {event?.labels?.GENERAL_BACK}
            </Button>
          </Box>} */}
        </Container>
        </>

      ) : (
      <Container maxW="100%" w="100%">
        <HStack mb="3" pt="2" w="100%" space="3" alignItems="center" justifyContent={'space-between'}>
          <Text fontSize="2xl">{modules?.find((network) => (network.alias == 'business'))?.name ?? ""}</Text>
          <Pressable rounded="10" bg="primary.500" p={'8px'} onPress={() => setEnableFilter(false)}>
            <DynamicIcon iconType={'attendee_Match'} iconProps={{ width: 20, height: 22}} />
          </Pressable>
        </HStack>
        <HStack mx="-2" space="0" alignItems="center" flexWrap="wrap">
          <Center mb="3" px="1">
            <Button
              px="6"
              py="1"
              rounded="20px"
              bg={((filters?.indexOf(0) !== -1) || filters?.length == 0) ? "primary.500" : "primary.box"}
              borderWidth="0"
              _text={{ fontSize: 'lg', color: ((filters?.indexOf(0) !== -1) || filters?.length == 0) ? "primary.hovercolor" : "primary.text" }}
              borderColor="primary.bdBox"
              colorScheme="primary"
              onPress={() => {
                setFilter(0)
              }}
            >
              All
            </Button>
          </Center>
          {interestkeywords?.map((keyword) => (
            <Center key={keyword.id} mb="3" px="1">
              <Button
                px="6"
                py="1"
                rounded="20px"
                bg={filters?.indexOf(keyword?.id) !== -1 ? "primary.500" : "primary.box"}
                borderWidth="0"
                borderColor="primary.bdBox"
                _text={{ fontSize: 'lg', color: filters?.indexOf(keyword?.id) !== -1 ? "primary.hovercolor" : "primary.text" }}
                _hover={{ _text: { color: 'primary.hovercolor' } }}
                colorScheme="primary"
                onPress={() => {
                  setFilter(keyword?.id)
                }}
              >
                {keyword?.name}
              </Button>
            </Center>
          ))}
        </HStack>
        <Box w="100%" mb="3">
          <Input value={searchTerm} onChangeText={(value) => { setSearchTerm(value); setSearch(value) }} rounded="10" w="100%" bg="primary.box" borderWidth={0} borderColor="primary.darkbox" placeholder={event.labels?.GENERAL_SEARCH} leftElement={<Icon ml="2" color="primary.text" size="lg" as={AntDesign} name="search1" />} />
        </Box>
        <Box
  minH="250px"
  w="100%"
  mb="3"
  bg={filteredkeywords?.length === 0 && searchTerm.length > 0 ? "transparent" : "primary.box"}
  pt="4"
  px={filteredkeywords?.length === 0 && searchTerm.length > 0 ?"":"5"}
  pb="1"
  rounded="10px"
>
  {searchTerm.length > 0 && filteredkeywords?.length > 0 ? (
    filteredkeywords.map((keyword: Keyword) => (
      <View key={keyword?.id}>
        <Text mb="2" fontSize="lg">{keyword?.name}</Text>
        <Flex mx="-2" mb="1" direction="row" flexWrap="wrap">
          {keyword?.children?.map((childWord: Keyword) => (
            <CheckboxWrapp
              key={childWord.id}
              addMyKeyword={() => addMyKeyword(childWord.id)}
              checked={mykeywords?.indexOf(childWord?.id) !== -1}
              title={childWord?.name}
            />
          ))}
        </Flex>
      </View>
    ))
  ) : searchTerm.length > 0 && filteredkeywords?.length === 0 ? (
    <NoRecordFound bg="primary.box" />
  ) : searchTerm.length === 0 && interestkeywords?.length > 0 ? (
    interestkeywords.map((keyword: Keyword) => (
      <View key={keyword?.id}>
        <Text mb="2" fontSize="lg">{keyword?.name}</Text>
        <Flex mx="-2" mb="1" direction="row" flexWrap="wrap">
          {keyword?.children?.map((childWord: Keyword) => (
            <CheckboxWrapp
              key={childWord.id}
              addMyKeyword={() => addMyKeyword(childWord.id)}
              checked={mykeywords?.indexOf(childWord?.id) !== -1}
              title={childWord?.name}
            />
          ))}
        </Flex>
      </View>
    ))
  ) : (
    <NoRecordFound bg="primary.box" />
  )}
</Box>

        <Box w="100%" mb="3" alignItems="center">
          <Button
            size="lg"
            minH="58px"
            w="100%"
            maxW="400px"
            isLoading={searchingAttendees}
            isDisabled={searchingAttendees}
            shadow="1"
            _text={{ fontWeight: 600, fontSize: '2xl', color: 'primary.hovercolor' }}
            colorScheme="primary"
            onPress={() => {
              FetchSearchMatchAttendees(mykeywords);
              setShowAttendees(true);
            }}
          >
            {event?.labels?.GENERAL_MATCH_SEARCH}
          </Button>
        </Box>
      </Container>)}
      </>
     }
    </>
  )
}


type checkboxProps = {
  title: string,
  checked: boolean,
  addMyKeyword: () => void,
}

const CheckboxWrapp = ({ title, checked, addMyKeyword }: checkboxProps) => {
  return (
    <Button
      bg={checked ? 'primary.500' : 'primary.darkbox'}
      px="3"
      py="1"
      mx="1"
      mb="3"
      _hover={{ bg: checked ? 'primary.500' : 'primary.darkbox' }}
      _pressed={{ bg: checked ? 'primary.500' : 'primary.darkbox' }}
      _text={{ fontSize: 'lg', color: checked ? 'primary.hovercolor' : 'primary.text' }}
      rounded="20px"
      leftIcon={<Icon color={checked ? 'primary.hovercolor' : 'primary.text'} as={AntDesign} name={checked ? 'check' : 'plus'} />}
      onPress={() => {
        addMyKeyword();
      }}

    >
      {title}
    </Button>
  )
}


