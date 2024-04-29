import React, { useEffect } from 'react'
import { Box, Button, Container, Divider, HStack, Icon, Image, Input, Pressable, Radio, Spacer, Text, VStack } from 'native-base';
import AntDesign from '@expo/vector-icons/AntDesign';
import UseLoadingService from 'application/store/services/UseLoadingService';
import UseFloorPlanService from 'application/store/services/UseFloorPlanService';
import WebLoading from 'application/components/atoms/WebLoading';
import { FloorPlan } from 'application/models/floorPlans/FloorPlans';
import UseEventService from 'application/store/services/UseEventService';
import NextBreadcrumbs from 'application/components/atoms/NextBreadcrumbs';
import { useRouter } from 'solito/router';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons'
import IcoSort from 'application/assets/icons/small/IcoSort';
const Index = () => {
  const { loading } = UseLoadingService();
  const { push, back } = useRouter()
  const [query, setQuery] = React.useState("");
  const [toggle, setToggle] = React.useState<boolean>(false)

  const { FetchFloorPlans, floor_plans, sponsorCount,exhibitorCount } = UseFloorPlanService();
  const { event, modules } = UseEventService();
  const module = modules.find((module) => {
    return module.alias === 'plans'
  })
  useEffect(()=>{
      FetchFloorPlans();
  },[]);

  return (
    <>
      {
        loading ? (
          <WebLoading />
        ) : (
          <>
            <NextBreadcrumbs module={module} />

            <Container pt="2" maxW="100%" w="100%">
              <HStack display={["block","flex"]} mb="3" pt="2" w="100%" space="3" alignItems="center">
                <Text textTransform="capitalize" fontSize="2xl">{module?.name ?? "FLoor Plan"}</Text>
                <Spacer />
                <HStack  space="1" alignItems="center">
                 <Input rounded="10" w={'320px'} bg="primary.box" borderWidth={0} value={query} placeholder={event.labels?.GENERAL_SEARCH} onChangeText={setQuery} leftElement={<Icon ml="2" color="primary.text" size="lg" as={AntDesign} name="search1" />} />
                 <Spacer />
                 <Button
                  w={'42px'}
                  h={'40px'}
                  bg={toggle ? 'primary.500' : 'primary.box'}
                  colorScheme="primary"
                  onPress={()=>{
                   setToggle(!toggle)
                  }}
                 
                 >
                  <IcoSort width="20px" height="18px" />
                 </Button>
                 
                </HStack>
                
              </HStack>
              {toggle && <Box mb={4} w="100%" bg="primary.box" overflow="hidden" rounded="10px">
                <Text bg={'primary.darkbox'} px={4} py={1} fontSize="lg">Advance filters</Text>
                <Box p={4} w={'100%'}>
                  <Radio.Group  name="MyRadioGroup">
                    <HStack fontSize={'lg'}  space="3" alignItems="center">
                      <Radio _text={{fontSize: 'lg'}} value="one">Sponsors (30)</Radio>
                      <Radio _text={{fontSize: 'lg'}}  value="two">Exhibitors (24)</Radio>
                    </HStack>
                    
                  </Radio.Group>
                </Box>
                <HStack flexWrap={'wrap'}  p={4} borderTopColor={'primary.bordercolor'} borderTopWidth={1} space="3" alignItems="center">
                  <Pressable
                    p="0"
                    borderWidth="0"
                    onPress={()=>{
                      console.log('hello')
                    }}
                  
                  >
                    <HStack px={6} py={2} rounded={'full'} bg={'secondary.500'} space="3" alignItems="center" mb={3}>
                      <Icon size="md" as={AntDesign} name="check" color={'primary.text'} />
                      <Text  fontSize="lg">Gold  (53)</Text>
                    </HStack>
                    
                  </Pressable>
                  <Pressable
                    p="0"
                    borderWidth="0"
                    onPress={()=>{
                      console.log('hello')
                    }}
                  
                  >
                    <HStack px={6} py={2} rounded={'full'} bg={'primary.box'} space="3" alignItems="center" mb={3}>
                      <Text  fontSize="lg">Silver (23)</Text>
                    </HStack>
                    
                  </Pressable>
                  <Pressable
                    p="0"
                    borderWidth="0"
                    onPress={()=>{
                      console.log('hello')
                    }}
                  
                  >
                    <HStack px={6} py={2} rounded={'full'} bg={'primary.box'} space="3" alignItems="center" mb={3}>
                      <Text  fontSize="lg">Silver (23)</Text>
                    </HStack>
                    
                  </Pressable>
                  <Pressable
                    p="0"
                    borderWidth="0"
                    onPress={()=>{
                      console.log('hello')
                    }}
                  
                  >
                    <HStack px={6} py={2} rounded={'full'} bg={'primary.box'} space="3" alignItems="center" mb={3}>
                      <Text  fontSize="lg">Silver (23)</Text>
                    </HStack>
                    
                  </Pressable>
                  <Pressable
                    p="0"
                    borderWidth="0"
                    onPress={()=>{
                      console.log('hello')
                    }}
                  
                  >
                    <HStack px={6} py={2} rounded={'full'} bg={'primary.box'} space="3" alignItems="center" mb={3}>
                      <Text  fontSize="lg">Silver (23)</Text>
                    </HStack>
                    
                  </Pressable>
                  <Pressable
                    p="0"
                    borderWidth="0"
                    onPress={()=>{
                      console.log('hello')
                    }}
                  
                  >
                    <HStack px={6} py={2} rounded={'full'} bg={'primary.box'} space="3" alignItems="center" mb={3}>
                      <Text  fontSize="lg">Silver (23)</Text>
                    </HStack>
                    
                  </Pressable>
                  
                </HStack>
                
                
              </Box>}
              <Box w="100%" bg="primary.box" overflow="hidden" rounded="10px">
               
                <VStack mb="0" w="100%" space="0">
                  {floor_plans.filter((plan) => {
                    if (query !== '') {
                      if (plan.floor_plan_name.toLowerCase().indexOf(query.toLowerCase()) > -1) {
                        return plan;
                      }
                    } else {
                      return plan;
                    }
                  }).map((plan: FloorPlan,i) => (
                    <Pressable
                      p="0"
                      borderWidth="0"
                      onPress={()=>{push(`/${event.url}/plans/detail/${plan.id}`)}}
                    >
                      <HStack p={4} borderTopWidth={i === 0 ? 0 : 1} borderTopColor="primary.bordercolor"  space="3" alignItems="center">
                        <Text fontWeight={500} fontSize="16px" >{plan.floor_plan_name}</Text>
                        <Spacer />
                         <Icon size="md" as={SimpleLineIcons} name="arrow-right" color={'primary.text'} />
                      </HStack>
                      
                    </Pressable>
                    
                    
                  ))}
                </VStack>
              </Box>
            </Container>
          </>
        )}
    </>
  )
}

export default Index

{/* <Container pt="2" maxW="100%" w="100%">
              <HStack mb="3" pt="2" w="100%" space="3" alignItems="center">
                <Text textTransform="uppercase" fontSize="2xl">FLoor Plan</Text>
              </HStack>
              <Image
                source={{
                  uri: 'https://wallpaperaccess.com/full/317510.jpg'
                }}
                alt="Alternate Text"
                w="100%"
                h="650px"
                rounded="10"
                mb="3"
              />
              <Box w="100%" bg="primary.box" overflow="hidden" rounded="10px">
                <Input bg="transparent" rounded="0" w="100%" borderWidth={0} placeholder={event.labels?.GENERAL_SEARCH} leftElement={<Icon ml="2" color="primary.text" size="lg" as={AntDesign} name="search1" />} />
                <Divider w="100%" bg="primary.text" h="1px" />
                <VStack mb="10" w="100%" space="0">
                  <Text borderBottomWidth="1" borderBottomColor="primary.bordercolor" px="3" py="2" fontSize="md">A1, Amnesty youth</Text>
                  <Text borderBottomWidth="1" borderBottomColor="primary.bordercolor" px="3" py="2" fontSize="md">A2, Ungdomssken & UU kobenhavn</Text>
                  <Text borderBottomWidth="1" borderBottomColor="primary.bordercolor" px="3" py="2" fontSize="md">A3, Dansk Industry (DI)</Text>
                </VStack>
              </Box>
              </Container> */}