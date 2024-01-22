import React, { useEffect } from 'react'
import { Box, Container, Divider, HStack, Icon, Image, Input, Text, VStack, Stack, ScrollView, Spacer, Modal, Pressable } from 'native-base';
import AntDesign from '@expo/vector-icons/AntDesign';
import UseLoadingService from 'application/store/services/UseLoadingService';
import UseGalleryService from 'application/store/services/UseGalleryService';
import UseEnvService from 'application/store/services/UseEnvService';
import WebLoading from 'application/components/atoms/WebLoading';
import { GalleryImage } from 'application/models/gallery/GalleryImage';
import LoadMore from 'application/components/atoms/LoadMore';
import SectionLoading from 'application/components/atoms/SectionLoading';
import in_array from "in_array";
const Index = () => {
  const { loading,scroll, processing } = UseLoadingService();

  const [query, setQuery] = React.useState("");
  const [activepopup, setactivepopup] = React.useState(false);
  const [popupdata, setpopupdata] = React.useState(null);

  const { FetchGalleryImages, gallery_images, page, last_page } = UseGalleryService();
  const { _env } = UseEnvService();

  useEffect(()=>{
    FetchGalleryImages({page:1});
  },[]);

  React.useEffect(() => {
    if(page<last_page){
      FetchGalleryImages({page:page+1});
    }
  }, [scroll]);

  return (
    <>
      {
          loading ? (
              <WebLoading />
          ):(
              <Container pt="2" maxW="100%" w="100%">
              <HStack mb="3" pt="2" w="100%" space="3" alignItems="center">
                <Text textTransform="uppercase" fontSize="2xl">Gallery</Text>
                 <Spacer />
                 <Input rounded="10" w={'60%'} bg="primary.box" borderWidth={0}  placeholder="Search" onChangeText={(text: string) => {}} leftElement={<Icon ml="2" color="primary.text" size="lg" as={AntDesign} name="search1" />} />
              </HStack>
              <Box w="100%"  overflow="hidden"  p="4">
                <VStack mb="10" w="100%" space="0">
                <Stack mx={'-4%'} direction="row"  flexWrap="wrap" alignItems={'flex-start'} justifyContent={'flex-start'} mb="2" space={0}>
                    {gallery_images.map((gallery_image:GalleryImage)=>(
                      <Box bg="primary.box" mb={4} mx={'1%'} rounded={'8'} overflow={'hidden'} width={'48%'} key={gallery_image.id}>
                        <Pressable
                          p="0"
                          borderWidth="0"
                          onPress={()=>{
                           setactivepopup(true);
                           setpopupdata(gallery_image)
                          }}
                        
                        >
                        
                        <LoadImage width={'100%'} path={`${_env.eventcenter_base_url}/assets/imagegallery/${gallery_image.image}` } alt="Alternate Text" />
                        <Text p="3" fontSize={'md'}>{gallery_image.info.find(info => info.name == 'image_title')?.value || ''}</Text>
                        </Pressable>
                      </Box>
                      ))}
    
                </Stack>
                </VStack>
              </Box>
              <Modal
                size={'full'}
                isOpen={activepopup}
                onClose={()=>{}}
                
              >
                <Modal.Content maxW={'780px'} >
                  <Modal.Body p={0} justifyContent="flex-end">
                  <Modal.CloseButton borderWidth={1} borderColor={'white'} rounded={'50%'} zIndex={999} onPress={() => {setactivepopup(false);setpopupdata(null)}}/>
                    <LoadImage width={'100%'} path={`${_env.eventcenter_base_url}/assets/imagegallery/${popupdata?.image}` } alt="Alternate Text" />
                    <Text p="3" textAlign={'center'} fontSize={'md'}>{popupdata?.info.find(info => info.name == 'image_title')?.value || ''}</Text>
                  </Modal.Body>
                </Modal.Content>
              </Modal>
              
              </Container>
      )}
    </>
  )
}

export default Index