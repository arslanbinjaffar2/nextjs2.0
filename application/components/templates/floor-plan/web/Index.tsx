import React, { useEffect, useState } from 'react'
import { Box, Button, Container, Divider, HStack, Icon, Image, Input, Pressable, Radio, Spacer, Text, View, VStack } from 'native-base';
import AntDesign from '@expo/vector-icons/AntDesign';
import UseLoadingService from 'application/store/services/UseLoadingService';
import UseFloorPlanService from 'application/store/services/UseFloorPlanService';
import WebLoading from 'application/components/atoms/WebLoading';
import { FloorPlan,FloorPlanCategory } from 'application/models/floorPlans/FloorPlans';
import UseEventService from 'application/store/services/UseEventService';
import NextBreadcrumbs from 'application/components/atoms/NextBreadcrumbs';
import { useRouter } from 'solito/router';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons'
import IcoSort from 'application/assets/icons/small/IcoSort';
import NoRecordFound from 'application/components/atoms/NoRecordFound';
import SectionLoading from 'application/components/atoms/SectionLoading';
const Index = () => {
  const { loading } = UseLoadingService();
  const { push, back } = useRouter()
  const [query, setQuery] = React.useState("");
  const [toggle, setToggle] = React.useState<boolean>(false)

  const { FetchFloorPlans, floor_plans, sponsorCount,exhibitorCount,labels,categories } = UseFloorPlanService();    
  const { event, modules } = UseEventService();
  const module = modules.find((module) => {
    return module.alias === 'plans'
  });

  const [selectedfilter, setSelectedfilter] = useState('sponsors');
  const [search, setSearch] = useState('');
  const [filteredFloorPlans, setFilteredFloorPlans] = useState<FloorPlan[]>([]);
  const [filteredCategories, setFilteredCategories] = useState<FloorPlanCategory[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<FloorPlanCategory[]>([]);


  useEffect(()=>{
      FetchFloorPlans();
  },[]);

  useEffect(() => {
    filterFloorPlans();
  },[floor_plans]);

  function selectCategory(category: FloorPlanCategory) {
    if (isSelected(category.id)) {
      setSelectedCategories(selectedCategories.filter(sCategory => sCategory.id !== category.id));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  }

  function filterFloorPlans(){
    const searchFiltered = search ? floor_plans.filter(floorPlan => floorPlan.floor_plan_name.toLowerCase().includes(search.toLowerCase())) : floor_plans;
    if(selectedCategories.length < 1){
      setFilteredFloorPlans(searchFiltered);
      return;
    }
    // filter and keep all the floor plans which have any of the selected categories.id in floorPlan.categories.id
    const filtered = searchFiltered.filter(floorPlan => {
      if (!floorPlan.categories) {
        return [];
      }
      return floorPlan?.categories.some(category => selectedCategories.some(sCategory => sCategory.id === category.id));
    });
    setFilteredFloorPlans(filtered);
  }

  function isSelected(id:number) {
    return selectedCategories.some(category => category.id === id);
  }

  function filterCategories() {
    const filtered= categories.filter(category => category.cat_type === selectedfilter);
    setFilteredCategories(filtered);
  }

  useEffect(() => {
    filterCategories();
  },[categories]);

  useEffect(() => {
    setSelectedCategories([]);
    filterCategories();
  },[selectedfilter]);

  useEffect(() => {
    filterFloorPlans();
  },[selectedCategories]);

  useEffect(() => {
    filterFloorPlans();
  },[search]);
  return (
    <>
      {
        loading ? (
          <SectionLoading />
        ) : (
          <>
            <NextBreadcrumbs module={module} />

            <Container pt="2" maxW="100%" w="100%">
              <HStack display={["block","flex"]} mb="3" pt="2" w="100%" space="3" alignItems="center">
                <Text fontSize="2xl">{module?.name}</Text>
                <Spacer />
                <HStack  space="1" alignItems="center">
                 <Input rounded="10" w={'320px'} bg="primary.box" borderWidth={0} value={search} placeholder={event.labels?.GENERAL_SEARCH} onChangeText={setSearch} leftElement={<Icon ml="2" color="primary.text" size="lg" as={AntDesign} name="search1" />} />
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
                  <IcoSort width="20px" height="18px" color={'primary.text'} />
                 </Button>
                 
                </HStack>
                
              </HStack>
 
              {toggle && <Box mb={4} w="100%" bg="primary.box" overflow="hidden"  rounded="10px">
              <Text px={4} bg={'primary.darkbox'} py={1} fontSize="lg">{labels?.FLOOR_PLAN_ADVANCED_FILTERS}</Text>

                <Box p={4} w={'100%'}>
                  <Radio.Group  name="MyRadioGroup" value={selectedfilter} onChange={nextValue => {setSelectedfilter(nextValue);}}>
                    <HStack    alignItems="center">
                    <Box flexDirection={'row'}  alignItems="center" >
                      <Radio  value="sponsors"
                      width={'18px'}
                      height={'18px'}
                      >{labels?.FLOOR_PLAN_SPONSORS_LABEL}</Radio>
                      <Text fontSize={'lg'}>
                      ({sponsorCount})
                      </Text>
                    </Box>
                      <Box flexDirection={'row'}  alignItems="center" ml={'2'}>
                      <Radio
                       width={'18px'}
                       height={'18px'}
                      value="exhibitors">{labels?.FLOOR_PLAN_EXHIBITORS_LABEL}</Radio>
                      <Text fontSize={'lg'} >
                      ({exhibitorCount})
                      </Text>
                      </Box>
                    </HStack>
                    
                  </Radio.Group>
                </Box>
                <HStack flexWrap={'wrap'}  p={4} borderTopColor={'primary.bordercolor'} borderTopWidth={1}  alignItems="center"
               >
                  {filteredCategories.map((category:FloorPlanCategory) => (
                    <Pressable
                      p="0"
                      borderWidth="0"
                      onPress={()=>{
                        selectCategory(category)
                      }}
                      bg={isSelected(category?.id) ? 'secondary.500' : 'primary.box'}
                      px={4} py={1} rounded={'full'}   alignItems="center" 
                      mb={'8px'}
                      mr={'6px'}>
                        <HStack  space="2" alignItems="center" justifyContent={'center'}>
                          {isSelected(category?.id) && <Icon color={'primary.text'} as={AntDesign} name="check"  />}
                          <Text  fontSize="lg">{category?.info[0]?.value} ({category?.pins_count})</Text>
                        </HStack>
                        
                      
                    </Pressable>
                    
                  ))}
                  
                </HStack>
                
                
              </Box>}
              <Box w="100%" bg="primary.box" overflow="hidden" rounded={'10px'}>
               
                <VStack mb="0" w="100%" space="0">
                  {filteredFloorPlans.map((plan: FloorPlan,i) => (
                    <Pressable
                      p="0"
                      borderWidth="0"
                      onPress={()=>{push(`/${event.url}/plans/detail/${plan.id}`)}}
                    >
                      <HStack p={4} borderTopWidth={i === 0 ? 0 : 1} borderTopColor="primary.bordercolor"  space="3" alignItems="center">
                        <Text fontWeight={500} fontSize="16px" >{plan?.floor_plan_name}</Text>
                        <Spacer />
                         <Icon size="md" as={SimpleLineIcons} name="arrow-right" color={'primary.text'} />
                      </HStack>
                      
                    </Pressable>
                    
                    
                  ))}
                  {filteredFloorPlans.length < 1 &&  <NoRecordFound/>
                  }
                </VStack>
              </Box>
            </Container>
          </>
        )}
    </>
  )
}

export default Index