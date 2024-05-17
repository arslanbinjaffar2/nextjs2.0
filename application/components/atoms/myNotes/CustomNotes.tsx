  import React, { useState } from 'react'
import {VStack,View,Text,Box, HStack, Modal, Image, Icon} from 'native-base'
import DynamicIcon from 'application/utils/DynamicIcon';
import Icocalendar from 'application/assets/icons/small/Icocalendar';
import Icoclock from 'application/assets/icons/small/Icoclock';
import Icopin from 'application/assets/icons/small/Icopin';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Pressable } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useRouter } from 'next/router';
const CustomNotes = () => {
  const router = useRouter();
  const { type } = router.query;
    const Moduletype:any=type
    const [isOpen,setIsOpen]=useState(false)
  return (
    <>
    <VStack flexDirection={'row'}  w={'100%'} p={'16px'}>
    {Moduletype=="sponsors" && <Box w={'114px'} h={'46px'} mr={'16px'}>
        <Image
        src="https://wallpaperaccess.com/full/317501.jpg"
        alt='image'
        width={'100%'}
        height={'100%'}
        rounded={'lg'}
        />
     </Box>}
     {Moduletype=="exhibitors" && <Box w={'114px'} h={'46px'} mr={'16px'}>
        <Image
        src="https://wallpaperaccess.com/full/317501.jpg"
        alt='image'
        width={'100%'}
        height={'100%'}
        rounded={'lg'}
        />
     </Box>}
    {Moduletype=="documents" &&  <Box w={'20px'} h={'20px'} mr={'12px'}>
    <Icon as={AntDesign} name="pdffile1" size="md" color="primary.text" />
     </Box>}
    <HStack   flexDirection={'column'}  w={(Moduletype=="sponsors" || Moduletype=="exhibitors")?'calc(100% - 160px)':'calc(100% - 28px)'}>
       {Moduletype=="programs" && <View flexDirection={'row'} justifyContent={'space-between'}>
            <Text  fontSize="md">Meeting Notes - Project X development</Text>
            <Box flexDirection={'row'} style={{ gap:12 }} alignItems={'center'}>
              <View flexDirection={'row'} style={{ gap:6 }} alignItems={'center'}>
			    <Icocalendar width={16} height={18} />
                <Text  fontSize="xs">05-07-2024</Text>
              </View>
              <View flexDirection={'row'} style={{ gap:6 }} alignItems={'center'}>
              <Icoclock width={16} height={18} />
                <Text  fontSize="xs">12:40 - 01-40</Text>
              </View>
              <View flexDirection={'row'} style={{ gap:6 }} alignItems={'center'}>
              <Icopin width={16} height={18} />
                <Text  fontSize="xs">Denmark DK..</Text>
              </View>
            </Box> 
        </View>}
        {Moduletype=="sponsors" && <View flexDirection={'row'} justifyContent={'space-between'} alignItems={'center'} >
            <Text fontSize={'md'}>HK - Synergy Software Solutions</Text>
            <Box flexDirection={'row'} alignItems={'center'} >
            <DynamicIcon iconType={'help_desk'} iconProps={{ width: 13, height: 12 }} />
             <Text ml={'6px'} fontSize={'xs'}>ALK-14565416-4154413</Text>
             </Box>
        </View>}
        {Moduletype=="exhibitors" && <View flexDirection={'row'} justifyContent={'space-between'} alignItems={'center'} >
            <Text fontSize={'md'}>HK - Synergy Software Solutions</Text>
            <Box flexDirection={'row'} alignItems={'center'} >
            <DynamicIcon iconType={'help_desk'} iconProps={{ width: 13, height: 12 }} />
             <Text ml={'6px'} fontSize={'xs'}>ALK-14565416-4154413</Text>
             </Box>
        </View>}
        {Moduletype=="documents" && <View flexDirection={'row'} justifyContent={'space-between'} alignItems={'center'} >
            <Text fontSize={'md'}>Project status report doc.pdf</Text>
            <Text fontSize={'xs'} ml={'6px'}>389.0 KB | 14-03-2024</Text>
        </View>}
        <View flexDirection={'row'} justifyContent={'space-between'} mt={'8px'}>
            <Text w={'95%'}  fontSize="sm">The future of remote work holds immense potential for both employers and employees. By embracing the benefits and addressing the challenges, companies can create a productive and satisfying remote work environment. As the world continues to evolve, remote work is set to become an integral part of the modern workplace.</Text>
            <Box w={'5%'}>

            <Pressable  onPress={()=>{
              setIsOpen(true)
            }}>
            <DynamicIcon iconType={'editnotes'} iconProps={{ width: 20, height: 20 }} />
            </Pressable>
              </Box>
        </View>
    </HStack>
    </VStack>
    <Modal 
 
        isOpen={isOpen}
        onClose={()=>{
          setIsOpen(false)
        }}
    >
   <Modal.Header height={'42px'} px={'16px'} py={'8px'}  flexDirection={'row'} maxWidth={'520px'} width={'100%'} roundedTop={'10px'} alignItems={'center'}>
   <DynamicIcon iconType={'my_notes'} iconProps={{ width: 20, height: 20 }} />
<Text ml={2}>Notes</Text>
    </Modal.Header>      
    <Modal.Content p={0} maxWidth={'520px'} width={'100%'} roundedBottom={'10px'} roundedTop={0}>
            <Modal.Body position={'relative'} zIndex={1} p={4} >
              <View flexDirection={'column'}>
              <Text>
              The future of remote work holds immense potential for both employers and employees. By embracing the benefits and addressing the challenges, companies can create a productive and satisfying remote work environment. As the world continues to evolve, remote work is set to become an integral part of the modern workplace.
              </Text>
    <Box alignSelf={'flex-end'} flexDirection={'row'} alignItems={'center'} mt={'4'}>
      <View>
      <Pressable
          onPress={()=>{
            setIsOpen(false)
          }}
        
        >
  <Icon as={FontAwesome} name="close" size={'lg'} color={'primary.text'} />
        </Pressable>
      </View>
      <View ml={'12px'}>
        <Pressable
          onPress={()=>{
            console.log('hello')
          }}
        
        >        
      <Icon as={FontAwesome} name="save" size={'lg'} color={'primary.text'} />
        </Pressable>
      </View>
              </Box>
              </View>

            </Modal.Body>
        </Modal.Content>
        </Modal>
    </>

  
  )
}

export default CustomNotes