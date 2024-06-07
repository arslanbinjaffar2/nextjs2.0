import DynamicIcon from 'application/utils/DynamicIcon'
import { Avatar, Box, Button, HStack, Modal, Pressable, Text, View, VStack } from 'native-base'
import React, { Dispatch, SetStateAction, useState } from 'react'
import FileIconByType from '../documents/FileIconByType'

const MyDocuments = () => {
  return (
    <>
    <VStack  bg={'primary.box'} width={'100%'} py={'5'} rounded={'10px'}>
        {new Array(5).fill('').map((_,index,arr)=>{
            return(
                <Box borderBottomWidth={index !== arr.length-1 ? 2 : 0}  width={'100%'}>
                <SingleDocument key={index}/>
                </Box>
            )
        })}
    </VStack>
    
    </>
  )
}

export default MyDocuments



function SingleDocument() {
    const [showShareAccountDropDown, setShowShareAccountDropDown] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false)

    return(
        <>
        <HStack justifyContent={'space-between'} width={'100%'} alignItems={'center'} pl={'4'} pr={'5'} py={'4'}>
        <View flexDirection={'row'} alignItems={'flex-start'}>
        <FileIconByType type={"pdf"} />
          <Box ml={3}>
            <Text fontWeight={'medium'}>Project status report doc.pdf</Text>
            <Text fontSize={'xs'} fontWeight={'medium'} pt={'6px'}>389.0 KB | 14-03-2024</Text>
          </Box>
        </View>
        <View flexDirection={'row'} style={{ gap:12 }} alignItems={'center'}>
            <Pressable
               
                onPress={()=>{
                    console.log('hello')
                }}
            
            >
            <DynamicIcon iconType="email" iconProps={{ width:20, height:15 }} />
            </Pressable>
            <Pressable
               position={'relative'}
                onPress={()=>{
                    console.log('hello')
                }}
            
            >
            <DynamicIcon iconType="download_2" iconProps={{ width:16, height:16 }} />
            </Pressable>
            <Pressable
            onPress={()=>{
                setShowShareAccountDropDown(!showShareAccountDropDown)
            }}
            >
            <DynamicIcon iconType="share_account" iconProps={{ width:16, height:16 }} />
            {showShareAccountDropDown && <ShareAccountDropDown />}
            </Pressable>
            <Pressable
            onPress={()=>{
                console.log('hello')
            }}
            >
            <DynamicIcon iconType="share" iconProps={{ width:16, height:18 }} />
            </Pressable>
            <Pressable
            onPress={()=>{
                setShowDeleteModal(true)
            }}
            >
            <DynamicIcon iconType="delete_icon" iconProps={{ width:16, height:18 }} />
            </Pressable>
        </View>
    </HStack>
    <DeleteModal
    isOpen={showDeleteModal}
    setIsOpen={setShowDeleteModal}
    />
        </>
    )
}



function ShareAccountDropDown(){

    return(
        <>
        <View px={'14px'} py={2} bg={'amber.500'} position={'absolute'} width={'190px'} top={0} right={0}  height={'214px'} style={{ zIndex:999  }} overflowY={'scroll'}
        nativeID='shareAccountDropDown'
        >
            <Text pb={'2'} fontWeight={'medium'} fontSize={'md'}>Document shared with</Text>
             <Box borderBottomWidth={1} />
             <HStack flexDirection={'column'}>
                {new Array(4).fill('').map((_,index,arr)=>{
                    return(
                        <Box borderBottomWidth={index !== arr.length-1 ? 1 : 0}  width={'100%'} py={'2'} flexDirection={'row'}
                       
                        >
                         <Avatar size={'xs'} bg="green.500" source={{
                uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
                }}/>
                <Text ml={'2'} fontStyle={'sm'} fontWeight={'medium'}>Stephen Hendry</Text>
                        </Box>
                    )
                })}
                <Pressable
                   flexDirection={'row'}
                   alignItems={'center'}
                    onPress={()=>{
                        console.log('hello')
                    }}
                
                >
                    <Text mr={'2px'} fontSize={'xs'}>View  more 5</Text>
                    <DynamicIcon iconType="dropdown" iconProps={{ width:20, height:11 }} />
                </Pressable>
                
             </HStack>
        </View>
      
        </>
    )
}


function DeleteModal({isOpen,setIsOpen}:{isOpen:boolean,setIsOpen:Dispatch<SetStateAction<boolean>>}){
    return(
        <>
          <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} safeAreaTop={true}>
        <Modal.Content maxWidth="480" >
          <Modal.CloseButton />
          <Modal.Header flexDirection={'row'} alignItems={'center'} style={{ gap:14 }} borderBottomWidth={0} px={'6'} pt={'6'} pb={'0'}>
          <DynamicIcon iconType="delete_icon" iconProps={{ width:24, height:27 }} />
            <Text fontSize={'2xl'} fontWeight={'medium'}>Delete</Text>
            </Modal.Header>
          <Modal.Body px={'6'} pt={'4'} pb={'5'}>
            <Text fontSize={'xl'} fontWeight={'medium'}>Are you sure you want to delete this document?</Text>
            <Text pt={3}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</Text>
          </Modal.Body>
          <Modal.Footer justifyContent={'space-between'} p={0}>
            <Button.Group space={2} width={'100%'} justifyContent={'space-between'}  p={0}>
              <Button bg={'primary.button'} width={'50%'} p={'4'}
              
              _text={{ fontSize:'2xl',fontWeight:'medium' }}
              onPress={() => {
              setIsOpen(false);
            }}>
                Cancel
              </Button>
              <Text borderLeftWidth={1}></Text>
              <Button bg={'primary.button'} width={'50%'} onPress={() => {
              setIsOpen(false);
            }}
            _text={{ fontSize:'2xl',fontWeight:'medium' }}
            >
               YES
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
        </>
    )
}


