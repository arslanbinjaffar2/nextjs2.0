import React, { useState } from 'react'
import { Box, CheckIcon, Container, HStack, Icon, IconButton, Image, Input, Select, Spacer, Text, View } from 'native-base'
import NextBreadcrumbs from 'application/components/atoms/NextBreadcrumbs';
import UseEventService from 'application/store/services/UseEventService';
import AntDesign from '@expo/vector-icons/AntDesign';
import Entypo from '@expo/vector-icons/Entypo';

const Index = () => {
  const [service, setService] = useState("")
  const { modules } = UseEventService();
  const module = modules.find((module) => module.alias === 'Course');
  
  return (
    <>
      <NextBreadcrumbs module={module} />
      <Container pt="2" maxW="100%" w="100%">
        <Text textTransform="capitalize" fontSize="2xl">{module?.alias ?? "Course"}</Text>
        <HStack mb="3" pt="2" w="100%" space="3" alignItems="center">
          <Input p={'10px'} rounded="10" w="100%" flex={'1'} bg="primary.box" borderWidth={0} placeholder="Search" leftElement={<Icon ml="2" color="primary.text" size="lg" as={AntDesign} name="search1" />} />
          <Select rounded="10" w="100%" bg="primary.box" flex={'1'} selectedValue={service} p={'10px'} accessibilityLabel="Choose type" placeholder="Choose Service" _selectedItem={{
            bg: "teal.600",
            textTransform: "capitalize",
            endIcon: <CheckIcon size="5"
            />
          }} mt={1} onValueChange={itemValue => setService(itemValue)}>
            <Select.Item label="UX Research" value="ux" />
            <Select.Item label="Web Development" value="web" />
            <Select.Item label="Cross Platform Development" value="cross" />
            <Select.Item label="UI Designing" value="ui" />
            <Select.Item label="Backend Development" value="backend" />
          </Select>
        </HStack>
        {/*  */}
        <HStack w="100%" mb="3" space="1" alignItems="center" justifyContent="flex-end">
          <IconButton
            p="0"
            variant="transparent"
            icon={<Icon size="xl" as={Entypo} name="menu" color="primary.text" />}
          />
          <IconButton
            p="0"
            variant="transparent"
            icon={<Icon size="xl" as={Entypo} name="grid" color="primary.text" />}
          />
        </HStack>
        {/*  */}
        <HStack w="100%" mb="3" space="1" bg="primary.box" rounded={'md'} alignItems="center" flexDirection={'column'} justifyContent="flex-end">
          {new Array(5).fill('').map((item,index,arr)=>{
            return(
        <Box pt={'20px'} pb={'14px'} px={'16px'} w={'100%'}  flexDirection={'row'} alignItems={'center'}
        borderBottomColor={'white'} borderBottomWidth={arr.length-1==index?'0px':'1px'}
        >
          <Text position={'absolute'} zIndex={'9999'} top={'8'} left={'5'} w={'60px'} fontSize="xs" fontWeight={'bold'} bg={'black'} borderRadius={'13px'} px={'10px'} py={'4px'}>popular</Text>
        <Image 
        position={'relative'}
        borderRadius={'10px'}
        w={'128px'}
        source={{
      uri: "https://wallpaperaccess.com/full/317501.jpg"
    }} alt="Alternate Text" size="xl" />
    <View marginLeft={'16px'}>
      <Text  fontSize="lg" fontWeight={'bold'}>How finding and sharing information online has evolved…</Text>
      <Text opacity={'1'} fontSize="xs" fontWeight={'medium'} color={'#000000'} my={'4px'} bg="primary.box" w={'55px'} borderRadius={'13px'} textAlign={'center'} p={'1'}>42 min</Text>
      <Text  fontSize="sm" fontWeight={'medium'}>By : Doug Rose</Text>
      
    </View>
    
        </Box>
            )
          })}
        </HStack>
      </Container>

    </>
  )
}

export default Index