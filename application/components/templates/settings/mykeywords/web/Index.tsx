import React, { useState, useEffect } from 'react'
import { Box, Button, Center, Container, Flex, HStack, Icon, Input, Spacer, Switch, Text } from 'native-base';
import AntDesign from '@expo/vector-icons/AntDesign'
import WebLoading from 'application/components/atoms/WebLoading';
import UseLoadingService from 'application/store/services/UseLoadingService';
import UseEnvService from 'application/store/services/UseEnvService';
import UseEventService from 'application/store/services/UseEventService';
import UseNetworkInterestService from 'application/store/services/UseNetworkInterestService';
import { Keyword } from 'application/models/networkInterest/NetworkInterest';
import in_array from "in_array";
import SectionLoading from 'application/components/atoms/SectionLoading';
import { func } from 'application/styles';


const Index = () => {
    const { loading, scroll, processing } = UseLoadingService();

    const { _env } = UseEnvService();
  
    const { event  } = UseEventService();

    const { keywords, UpdatingMyKeywords, SaveMykeywords, FetchMyKeywords  } = UseNetworkInterestService();

    useEffect(() => {
      FetchMyKeywords();
    }, [])
    

  return (
    <>
        {in_array('keywords', processing) && <SectionLoading />}
        {((!in_array('keywords', processing))  && keywords.length <=0 ) && <Text size={'xl'}>No keyword found</Text>} 
        {((!in_array('keywords', processing))  && keywords.length > 0 ) && <ManageKeywords keywords={keywords} SaveMykerwords={SaveMykeywords} UpdatingMyKeywords={UpdatingMyKeywords} />}
    </>
  )
}

export default Index



const ManageKeywords = ({keywords, SaveMykerwords, UpdatingMyKeywords}:{keywords:Keyword[], UpdatingMyKeywords:boolean, SaveMykerwords:(payload:any)=>void}) => {
    const [interestkeywords, setInterestKeywords] = useState(keywords);
  const [mykeywords, setMyKeywords] = useState(keywords?.reduce((ack:any, item:Keyword)=>{
    const childern = item?.children?.reduce((ack2:any, item2:any)=>{
      if(item2?.keywords?.length > 0){
          return [item2.id, ...ack2]
      }else{
        return ack2
      }
    },[]);
    if(item?.keywords?.length > 0 ){
      return [item?.id, ...childern, ...ack];
    }else{
      return [...ack, ...childern];
    }
  },[]));
  const [filteredkeywords, setFilteredKeywords] = useState<Keyword[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState<any[]>([]);
  const { event} = UseEventService();
  const setFilter= (kid:any)=>{
    setSearchTerm("");
    if(kid !== 0){
      if(filters.indexOf(kid) === -1) {
        setFilters([...filters, kid])
      }else{
        setFilters([...filters.filter((item:any)=>( item !== kid))])
      }
    }else{
      setFilters([]);
    }
    console.log(filters, 'filters');
  }
  const setSearch = (value:any)=>{
    // setSearchTerm(value);
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
      setMyKeywords([...mykeywords?.filter((item)=>( item !== kid))])
    }
  }

  return (
    <Container pt="2" maxW="100%" w="100%">
                    <HStack mb="3" pt="2" w="100%" space="3" alignItems="center">
                    <Text fontSize="2xl">{event?.labels?.EVENTSITE_TAB_NETWORK_INTEREST}</Text>
                    </HStack>
                    <HStack mx="-2" space="0" alignItems="center" flexWrap="wrap">
                    <Center mb="3" px="1">
                        <Button
                        px="6"
                        py="1"
                        rounded="20px"
                        _text={{color: ((filters?.indexOf(0) !== -1) || filters?.length == 0) ? "primary.hovercolor" : "primary.text", fontSize: 'lg'}}
                        _hover={{_text: {color: "primary.hovercolor"}}}
                        bg={((filters?.indexOf(0) !== -1) || filters?.length == 0) ? "primary.500" : "primary.box"}
                        borderWidth="0"
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
                            borderWidth="0"
                            borderColor="primary.bdBox"
                            _text={{color: filters?.indexOf(keyword?.id) !== -1 ? "primary.hovercolor" : "primary.text", fontSize: 'lg'}}
                            _hover={{_text: {color: "primary.hovercolor"}}}
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
                    <Input  value={searchTerm} onChangeText={(value)=>{ setSearchTerm(value); setSearch(value) }} rounded="10" w="100%" bg="primary.box" borderWidth={1} borderColor="primary.darkbox" placeholder={event.labels?.GENERAL_SEARCH} leftElement={<Icon ml="2" color="primary.text" size="lg" as={AntDesign} name="search1" />} />
                    </Box>
                  {filteredkeywords?.length > 0 ? (
                  <Box minH="250px" w="100%" mb="3" bg="primary.box" pt="4" px="5" pb="1" rounded="10px">
                    {filteredkeywords.map((keyword: Keyword) => (
                      <React.Fragment key={keyword?.id}>
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
                      </React.Fragment>
                    ))}
                    <Box w="100%" mb="3" alignItems="center">
                      <Button
                        size="lg"
                        minH="58px"
                        w="100%"
                        maxW="400px"
                        isLoading={UpdatingMyKeywords}
                        isDisabled={UpdatingMyKeywords}
                        shadow="1"
                        _text={{ fontWeight: 600, fontSize: '2xl', color: func.colorType(event?.settings?.primary_color) }}
                        colorScheme="primary"
                        onPress={() => {
                          SaveMykerwords(mykeywords);
                        }}
                      >
                        {event?.labels?.GENERAL_DONE}
                      </Button>
                    </Box>
                  </Box>
                ) : searchTerm ? (
                  <Text fontSize="md" p="4"  rounded="10" w="100%" bg="primary.box">{event.labels.GENERAL_NO_RECORD}</Text>
                ) : (
                  <Box minH="250px" w="100%" mb="3" bg="primary.box" pt="4" px="5" pb="1" rounded="10px">
                    {interestkeywords.map((keyword: Keyword) => (
                      <React.Fragment key={keyword?.id}>
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
                      </React.Fragment>
                    ))}
                    <Box w="100%" mb="3" alignItems="center">
                      <Button
                        size="lg"
                        minH="58px"
                        w="100%"
                        maxW="400px"
                        isLoading={UpdatingMyKeywords}
                        isDisabled={UpdatingMyKeywords}
                        shadow="1"
                        _text={{ fontWeight: 600, fontSize: '2xl', color: func.colorType(event?.settings?.primary_color) }}
                        colorScheme="primary"
                        onPress={() => {
                          SaveMykerwords(mykeywords);
                        }}
                      >
                        {event?.labels?.GENERAL_DONE}
                      </Button>
                    </Box>
                  </Box>
                )}
                </Container>
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
        _text={{ fontSize: 'lg', color: checked ? 'primary.hovercolor' : 'primary.text' }}
        _icon={{color: checked ? 'primary.hovercolor' : 'primary.text'}}
        rounded="20px"
        leftIcon={<Icon  as={AntDesign} name={checked ? 'check' : 'plus'} />}
        onPress={() => {
            addMyKeyword();
        }}
  
      >
        {title}
      </Button>
    )
  }


