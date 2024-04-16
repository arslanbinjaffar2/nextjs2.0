// import ReactDOM from 'react-dom/client'
import React from 'react';
import useMapplicStore from './MapplicStore';
import { View, Input, Icon, HStack, Button, Box, Pressable, Text, Badge, Spacer } from 'native-base';
import AntDesign from '@expo/vector-icons/AntDesign';
const SidebarMapplic = (json) => {
	const openLocation = useMapplicStore(state => state.openLocation);
	const closeLocation = useMapplicStore(state => state.closeLocation);
	const [active, setactive] = React.useState('sponsor');
	const [data, setdata] = React.useState(null);
	const [filteredGroups, setFilteredGroups] = React.useState([]);
	const [search, setSearch] = React.useState('');
	const [activeIndex, setactiveIndex] = React.useState(0)


	React.useEffect(() => {
		if (typeof json === 'object' && json !== null) {
			setdata(json.json);
			return;
		}
	     fetch(json.json)
        .then(response => response.json())
        .then(data => setdata(data));
	}, [json])

	React.useEffect(() => {
		if (!data) {
			setFilteredGroups([]);
			return;
		}
	
		const filteredGroups = data.groups.map(group => {
			const children = data.locations.filter(list => list.group.includes(group.id) && list.cat_type === active);
			const filteredChildren = children.filter(child => child.title.toLowerCase().includes(search.toLowerCase()) || child.about.toLowerCase().includes(search.toLowerCase()));
			return { ...group, children: filteredChildren };
		}).filter(group => group.children.length > 0);
		setFilteredGroups(filteredGroups);
		
	}, [data, search, active]);
	
  return (
	<View mt={5} w={'100%'}>
      <Input mb={5} rounded="10" w={['100%']} bg="primary.box" borderWidth={0} value={search} placeholder={'Search'} onChangeText={(text) => {
                    setSearch(text);
                }} leftElement={<Icon ml="2" color="primary.text" size="lg" as={AntDesign} name="search1" />} />
      <HStack mb={5} space="2">
          <Button
            rounded={'full'}
            colorScheme="primary"
            bg={active === 'sponsor'  ? 'primary.500' :'primary.box'}
            py={2}
            px={6}
            _text={{fontSize: 'lg'}}
            onPress={()=>{
              setactive('sponsor'); closeLocation()
            }}>
            Sponsor
          </Button>
          <Button
           rounded={'full'}
            py={2}
            px={6}
            _text={{fontSize: 'lg'}}
            bg={active === 'exhibitor' ? 'primary.500' :'primary.box'}
            colorScheme="primary"
            onPress={()=>{
              setactive('exhibitor');closeLocation()
            }}>
            Exibitor
          </Button>
                
      </HStack>
			<Box w={'100%'} bg={'primary.box'} rounded={8} overflow={'hidden'}>
				{filteredGroups.filter(item => item.type === active).map((group, k) => 
				<>
					<View key={group.id} w={'100%'} mt={k === 0 ? 0 : 1}>
            <Pressable
              p="0"
              borderWidth="0"
              w={'100%'}
              onPress={()=>{
                setactiveIndex(activeIndex === k ? null : k)
              }}>
             <HStack py={2} bg={'primary.darkbox'} px={3} space="3" alignItems="center">
              <Badge  bg={group.color ? group.color: ''} shadow="1" w="14px" h="14px" p="0" rounded="100%" />
              <Text fontWeight={500} fontSize="lg">{group.name} ({group.children.length})</Text>
              <Spacer />
              <Icon as={AntDesign} name={activeIndex === k ? "caretup" :"caretdown"} color={'primary.text'}  />
             </HStack>
            </Pressable>
					</View>
					{activeIndex === k && 
          <View w={'100%'}>
						{group.children.map((list,i) => 
            <>
                <Pressable
                  key={list.id}
                  p="3"
                  borderTopColor="primary.text"
                  borderTopWidth={i === 0 ? 0 : 1}
                  w={'100%'}
                  onPress={()=>{
                    openLocation(list.id)
                  }}>
                  <HStack  w={'100%'}  space="1" alignItems="center">
                    <Text fontWeight={500} fontSize={'md'}>{list.title}</Text>
                    <Spacer />
                    {list.about && <Text>{list.about}</Text>}
                  </HStack>
                </Pressable>
            </>
						)}
					</View>
          }
				</>	
				)}
				{filteredGroups.length < 1 && <Text p={3}>{'labels?.GENERAL_NO_RECORD'}</Text>}
			</Box>
	</View>
  )
}

export default SidebarMapplic

