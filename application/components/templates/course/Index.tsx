import React, { useState } from 'react'
import { Box, CheckIcon, Container, HStack, Icon, IconButton, Image, Input, Select, Spacer, Text, View } from 'native-base'
import NextBreadcrumbs from 'application/components/atoms/NextBreadcrumbs';
import UseEventService from 'application/store/services/UseEventService';
import AntDesign from '@expo/vector-icons/AntDesign';
import Entypo from '@expo/vector-icons/Entypo';
import DynamicIcon from 'application/utils/DynamicIcon';

const Index = () => {
  const [service, setService] = useState("")
  const { modules } = UseEventService();
  const module = modules.find((module) => module.alias === 'Course');
  const [mode,setMode]=React.useState("list")
  const [play,setPlay]=useState(false)
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
            p={mode=="list"?1:0}
            variant="transparent"
            icon={<Icon size="xl" as={Entypo} name="menu" color="primary.text" />}
            onPress={()=>setMode('list')}
          />
          <IconButton
            p={mode=="grid"?1:0}
            variant="transparent"
            icon={<Icon size="xl" as={Entypo} name="grid" color="primary.text" 
            onPress={()=>setMode('grid')}
            />}
          />
        </HStack>
        {/*  */}
     {mode=='list'&&  <HStack w="100%" mb="3" space="1" bg="primary.box" rounded={'md'} alignItems="center" flexDirection={'column'} justifyContent="flex-end">
          {new Array(5).fill('').map((item,index,arr)=>{  
            return(
        <Box pt={'20px'} pb={'14px'} px={'16px'} w={'100%'}  flexDirection={'row'} alignItems={'center'}
        borderBottomColor={'primary.border'} borderBottomWidth={arr.length-1==index?'0px':'1px'}
        >
          <Text  fontSize="xs" position={'absolute'} zIndex={'999'} top={'47%'} left={'58'}>
     <DynamicIcon iconType={'playCompleteIcon'} iconProps={{ width:36,height:36 }}/>
          </Text>
          
          <Text position={'absolute'} textTransform={'uppercase'} zIndex={'999'} top={'8'} left={'5'}  fontSize="xs" fontWeight={'semibold'} bg={'black'} borderRadius={'13px'} px={'10px'} py={'4px'}>popular</Text>
        <Image 
        position={'relative'}
        borderRadius={'10px'}
        w={'128px'}
        height={' 102px'}
        source={{
      uri: "https://wallpaperaccess.com/full/317501.jpg"
    }} alt="Alternate Text"  />
    <View marginLeft={'16px'}>
      <Text  fontSize="lg" fontWeight={'semibold'}>How finding and sharing information online has evolved…</Text>
      <Text opacity={'1'} fontSize="xs" fontWeight={'medium'} color={'primary.text'} my={'4px'} bg="primary.box" w={'55px'} borderRadius={'13px'} textAlign={'center'} p={'1'}>42 min</Text>
      <Text  fontSize="sm" fontWeight={'medium'}>By : Doug Rose</Text>
      
    </View>
    
        </Box>
            )
          })}
        </HStack>}
     {mode=='grid'&&   <HStack display={'flex'} mb="3" pt="2" w="100%" space="0" alignItems="center" flexDirection={'row'} justifyContent={'space-between'} flexWrap={'wrap'}
        >
        {new Array(2).fill('').map(()=>{
          return(
        <Box  w={'48%'}  bg="primary.box"  my={'3'}  rounded={'md'}  borderBottomColor={'primary.border'} flexDirection={'column'} pt={'20px'} pb={'14px'} px={'16px'}> 
          <Text position={'absolute'} textTransform={'uppercase'} zIndex={'9999'} top={'8'} left={'5'}  fontSize="xs" fontWeight={'semibold'} bg={'black'} borderRadius={'13px'} px={'10px'} py={'4px'}>popular</Text>
          <Text  fontSize="xs" position={'absolute'} zIndex={'999'} top={'30%'} left={'40%'} onPress={()=>setPlay(!play)}>
            {play
            ?
            <DynamicIcon iconType={'playIcon'} iconProps={{ width:36,height:36 }} />
            :
            <DynamicIcon iconType={'playCompleteIcon'} iconProps={{ width:36,height:36 }} />
          }
          </Text>
        <Image 
        position={'relative'}
        w={'289px'}
        borderRadius={'10px'}
        height={'140px'}
        source={{
      uri: "https://wallpaperaccess.com/full/317501.jpg"
    }} alt="Alternate Text"  />
    <View flexDirection={'row'} alignItems={'center'} justifyContent={'space-between'} pt={'18px'} pb={'5px'}>
      <Text  fontSize="sm" fontWeight={'medium'}>By : Doug Rose</Text>
    <Text opacity={'1'} fontSize="xs" fontWeight={'medium'} color={'primary.text'} my={'4px'} bg="primary.box" w={'55px'} borderRadius={'13px'} textAlign={'center'} p={'1'}>42 min</Text>
    </View>
      <Text  noOfLines={2} fontSize="lg" fontWeight={'semibold'} textBreakStrategy='highQuality'>How finding and sharing information
      {"\n"}
       online has evolved…</Text>

        </Box>
          )
        })}
        </HStack>}
      </Container>

    </>
  )
}

export default Index