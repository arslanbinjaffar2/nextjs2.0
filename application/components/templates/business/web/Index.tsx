import React, { useState, useEffect } from 'react'
import { Box, Button, Center, Container, Flex, HStack, Icon, Input, Pressable, Spacer, Switch, Text,Image, VStack } from 'native-base';
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
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons'
import RectangleView from 'application/components/atoms/attendees/RectangleView';
import NextBreadcrumbs from 'application/components/atoms/NextBreadcrumbs';
import BannerAds from 'application/components/atoms/banners/BannerAds'


const Index = () => {
    const { loading, scroll } = UseLoadingService();

    const { _env } = UseEnvService();
  
    const { event, modules  } = UseEventService();

    const [showAttendees, setShowAttendees] = useState(false);

    const { keywords, FetchNetworkInterests, searchMatchAttendees, searchingAttendees, FetchSearchMatchAttendees } = UseNetworkInterestService();
    
    const { push } = useRouter()

    useEffect(() => {
        FetchNetworkInterests();
    }, [])


  return (
    <>
        {loading && <SectionLoading />}
        {(!loading  && keywords.length <=0 ) && <Text>No keyword found</Text>} 
        {(!loading  && keywords.length > 0 ) && <ManageKeywords 
          keywords={keywords} 
          searchMatchAttendees={searchMatchAttendees} 
          searchingAttendees={searchingAttendees}
          FetchSearchMatchAttendees={FetchSearchMatchAttendees}
          showAttendees={showAttendees}
          setShowAttendees={setShowAttendees}
         />}
          <Box width={"100%"} height={"5%"}>
            <BannerAds module_name={'business'} module_type={'listing'} />
          </Box>    
    </>
  )
}

export default Index



const ManageKeywords = ({keywords,  searchMatchAttendees, searchingAttendees, FetchSearchMatchAttendees, showAttendees, setShowAttendees }:{keywords:Keyword[],searchMatchAttendees:Attendee[]|null, searchingAttendees:boolean, FetchSearchMatchAttendees:(payload:any)=>void, showAttendees:boolean, setShowAttendees:React.Dispatch<React.SetStateAction<boolean>>}) => {
  
  const { event, modules } = UseEventService();
  const { _env } = UseEnvService();

  const [interestkeywords, setInterestKeywords] = useState(keywords);
  const [mykeywords, setMyKeywords] = useState<any>([]);
  const [filteredkeywords, setFilteredKeywords] = useState<Keyword[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState<any[]>([]);

  const setFilter= (kid:any)=>{
    setSearchTerm("");
    if(kid !== 0){
      if(!filters.includes(kid)) {
        setFilters([...filters, kid])
      }else{
        setFilters([...filters.filter((item:any)=>( item !== kid))])
      }
    }else{
      setFilters([]);
    }
  }

  const setSearch = (value:any)=>{
    // setSearchTerm(value);
    if(value.length < 1){
      setFilters([]);
      return;
    }
    const filterIds = interestkeywords?.filter((kword)=> {
      if(kword?.name?.toLowerCase().indexOf(searchTerm?.toLowerCase()) > -1){
          return true;
        }
      else if(kword?.children?.filter((subkey)=>( subkey?.name?.toLowerCase().indexOf(searchTerm?.toLowerCase()) > -1))?.length! > 0){
        return true;
      }
      else{
        return false;
      }
    })?.map((kword)=>(kword?.id));
    setFilters([ ...filterIds ]);
  }

  useEffect(() => {
    if(filters?.length > 0)
    {
      setFilteredKeywords([...interestkeywords?.filter((kword)=> (filters?.indexOf(kword?.id) !== -1) )])
    }
    else{
      setFilteredKeywords([])
    }
  }, [filters])
 
  
  const addMyKeyword = (kid:any) =>{
    if(mykeywords?.indexOf(kid) === -1) {
      setMyKeywords([...mykeywords, kid])
    }else{
      setMyKeywords([...mykeywords?.filter((item:any)=>( item !== kid))])
    }
  }

  const { push } = useRouter()
  const module = modules.find((module) => module.alias === 'business');
  const navigation: any = Platform.OS !== "web" ? useNavigation() : false;

  return (
    <>
    <NextBreadcrumbs module={module} />
                {showAttendees ? (
                    <Container  pt="2" maxW="100%" w="100%" >
                      <HStack mb="3" pt="2" w="100%" space="3" alignItems="center">
                      <Text textTransform="uppercase" fontSize="2xl">{modules?.find((attendees)=>(attendees.alias == 'attendees'))?.name ?? ""}</Text>
                    </HStack>
                    {searchingAttendees && <SectionLoading/>}
                    {searchMatchAttendees && <Box bg="primary.box" maxW="100%" w="100%" mb={2} p={2} rounded={8}>
                      {searchMatchAttendees.map((attendee: any, k: number) =>
                          <RectangleView attendee={attendee} border={searchMatchAttendees.length - 1 == k ? 0 : 1 } speaker={0} disableMarkFavroute/>
                      )}
                    </Box>}              
                    {!searchingAttendees && !searchMatchAttendees && <Box overflow="hidden" mb={3} bg="primary.box" w="100%" rounded="lg" padding={5}><Text textTransform="uppercase" fontSize="xl">{event.labels.EVENT_NORECORD_FOUND}</Text></Box>} 
                    {!searchingAttendees && <Box w="100%" mb="3" alignItems="center">
                      <Button
                          size="lg"
                          minH="58px"
                          w="100%"
                          maxW="400px"
                          shadow="1"
                          textTransform="uppercase"
                          _text={{ fontWeight: 600, fontSize: '2xl' }}
                          colorScheme="primary"
                          onPress={() => {
                            setShowAttendees(false);
                          }}
                      >
                          Back
                      </Button>
                    </Box>}
                    </Container>

                 )  : (<Container pt="2" maxW="100%" w="100%">
                    <HStack mb="3" pt="2" w="100%" space="3" alignItems="center">
                    <Text textTransform="uppercase" fontSize="2xl">{modules?.find((network)=>(network.alias == 'business'))?.name ?? ""}</Text>
                    </HStack>
                    <HStack mx="-2" space="0" alignItems="center" flexWrap="wrap">
                    <Center mb="3" px="1">
                        <Button
                        px="6"
                        py="1"
                        rounded="20px"
                        bg={((filters?.indexOf(0) !== -1) || filters?.length == 0) ? "primary.500" : "primary.box"}
                        borderWidth="1"
                        _text={{ fontSize: 'lg' }}
                        borderColor="primary.bdBox"
                        colorScheme="primary"
                        onPress={() => {
                            setFilter(0)
                        }}
                        >
                        All
                        </Button>
                    </Center>
                    {interestkeywords?.map((keyword)=>(
                        <Center key={keyword.id} mb="3" px="1">
                            <Button
                            px="6"
                            py="1"
                            rounded="20px"
                            bg={filters?.indexOf(keyword?.id) !== -1 ? "primary.500" :"primary.box" }
                            borderWidth="1"
                            borderColor="primary.bdBox"
                            _text={{ fontSize: 'lg' }}
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
                    <Input  value={searchTerm} onChangeText={(value)=>{ setSearchTerm(value); setSearch(value) }} rounded="10" w="100%" bg="primary.box" borderWidth={1} borderColor="primary.darkbox" placeholder="Search" leftElement={<Icon ml="2" color="primary.text" size="lg" as={AntDesign} name="search1" />} />
                    </Box>
                    <Box minH="250px" w="100%" mb="3" bg="primary.box" pt="4" px="5" pb="1" rounded="10px">
                    {filteredkeywords?.length > 0 ? filteredkeywords?.map((keyword:Keyword)=>(
                        <React.Fragment key={keyword?.id}>
                            <Text mb="2" fontSize="lg">{keyword?.name}</Text>
                            <Flex mx="-2" mb="1" direction="row" flexWrap="wrap">
                                {keyword?.children?.map((childWord:Keyword)=>(
                                    <CheckboxWrapp key={childWord.id}  addMyKeyword={() => addMyKeyword(childWord.id)} checked={mykeywords?.indexOf(childWord?.id) !== -1 ? true : false} title={childWord?.name} />
                                ))}
                            </Flex>
                        </React.Fragment>
                    )) : (searchTerm.length < 1) ? interestkeywords?.map((keyword:Keyword)=>(
                        <React.Fragment key={keyword?.id}>
                            <Text mb="2" fontSize="lg">{keyword?.name}</Text>
                            <Flex mx="-2" mb="1" direction="row" flexWrap="wrap">
                                {keyword?.children?.map((childWord:Keyword)=>(
                                    <CheckboxWrapp key={childWord.id} addMyKeyword={() => addMyKeyword(childWord.id)} checked={mykeywords?.indexOf(childWord?.id) !== -1 ? true : false} title={childWord?.name} />
                                ))}
                            </Flex>
                        </React.Fragment>
                    )):(
                      <Text textTransform="uppercase" fontSize="xl">{event.labels.EVENT_NORECORD_FOUND}</Text>
                    )
                  }
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
                        textTransform="uppercase"
                        _text={{ fontWeight: 600, fontSize: '2xl' }}
                        colorScheme="primary"
                        onPress={() => {
                          FetchSearchMatchAttendees(mykeywords);
                          setShowAttendees(true);
                        }}
                    >
                        Match search
                    </Button>
                    </Box>
                </Container>)}
    </>
  )
}


type checkboxProps = {
    title: string,
    checked: boolean,
    addMyKeyword: () => void,
}
  
const CheckboxWrapp = ({ title, checked, addMyKeyword}: checkboxProps) => {
    return (
      <Button
        bg={checked ? 'primary.500' : 'primary.darkbox'}
        px="3"
        py="1"
        mx="1"
        mb="3"
        _hover={{ bg: checked ? 'primary.500' : 'primary.darkbox' }}
        _pressed={{ bg: checked ? 'primary.500' : 'primary.darkbox' }}
        _text={{ fontSize: 'lg' }}
        rounded="20px"
        leftIcon={<Icon as={AntDesign} name={checked ? 'check' : 'plus'} />}
        onPress={() => {
            addMyKeyword();
        }}
  
      >
        {title}
      </Button>
    )
  }


