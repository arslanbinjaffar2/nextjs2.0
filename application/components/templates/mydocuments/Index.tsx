import React, { useState } from 'react'
import { Input, Text, View,Icon, Box, Button } from 'native-base'
import { UseEventService } from 'application/store/services/UseEventService';
import { UseLoadingService } from 'application/store/services/UseLoadingService';
import AntDesign from '@expo/vector-icons/AntDesign'
import MyDocuments from 'application/components/atoms/mydocuments/MyDocuments';
import SharedDocuments from 'application/components/atoms/mydocuments/SharedDocuments';
import AddFile from 'application/components/atoms/mydocuments/AddFile/Index';

const Index = () => {
    const { event, modules } = UseEventService();
    const { processing } = UseLoadingService();
    const [searchTerm, setSearchTerm] = useState("");
    const [mySearchkeywords, setMySearchKeywords] = useState([]);
    const [tab, setTab] = useState('MY DOCUMENTS');
    const [addFile, setAddFile] = useState(false);
  return (
    <View width={'100%'}>
 {!addFile && <>
     <View flexDirection={'row'} justifyContent={'space-between'} alignItems={'center'} w={'100%'}>
        <Text width={145}>MY DOCUMENTS</Text>
        <Box flexDirection={'row'} justifyContent={'center'} alignItems={'center'} w={['', 'calc(100% - 145px)']}>
        <Input rounded="10" w={312} bg="primary.box" borderWidth={0}
            borderColor={'transparent'}
            value={searchTerm} placeholder={event.labels?.GENERAL_SEARCH} onChangeText={(text: string) => {
                setSearchTerm(text);
            }} leftElement={<Icon ml="2" color="primary.text" size="lg" as={AntDesign} name="search1" />} />
            <Button width={106} height={38} ml={'3'} onPress={()=>setAddFile(true)}>
                <Box flexDirection={'row'} justifyContent={'center'} alignItems={'center'}>
            <Icon ml="2" color="primary.text" size="lg" as={AntDesign} name="plus" />
            <Text fontSize={'md'} fontWeight={'semibold'} ml={'6px'}>Add Files</Text>
                </Box>
            </Button>
            </Box>
     </View>
     <View flexDirection={'row'} justifyContent={'center'} alignItems={'center'} w={'100%'} style={{gap: 4}} 
     my={3}
     >
        <Button bg={'primary.box'} padding={'10px'} roundedLeft={'10'} roundedRight={'0'} width={'50%'} textAlign={'center'} 
        onPress={()=>setTab('MY DOCUMENTS')} _text={{ fontSize:'md', fontWeight:'semibold' }}
        >MY DOCUMENTS (0)</Button>
        <Button bg={'primary.box'} padding={'10px'} roundedRight={'10'} roundedLeft={'0'} width={'50%'} textAlign={'center'}
        _text={{ fontSize:'md', fontWeight:'semibold' }}
        onPress={()=>setTab('SHARED DOCUMENTS')}
        >SHARED DOCUMENTS (3)</Button>
     </View>
     {tab === 'MY DOCUMENTS' &&
     <MyDocuments /> }
     {tab=="SHARED DOCUMENTS" &&
     <SharedDocuments />
     }
    </>}

     {addFile && <AddFile />}
    </View>
  )
}

export default Index