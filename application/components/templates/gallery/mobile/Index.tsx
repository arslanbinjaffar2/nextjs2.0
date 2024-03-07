import React from 'react'
import { Box, Container, Divider, HStack, Icon, Image, Input, Text, VStack, Stack } from 'native-base';
import AntDesign from '@expo/vector-icons/AntDesign';
import UseLoadingService from 'application/store/services/UseLoadingService';
import UseGalleryService from 'application/store/services/UseGalleryService';
import UseEnvService from 'application/store/services/UseEnvService';
import MobileLoading from 'application/components/atoms/MobileLoading';
import {useFocusEffect } from '@react-navigation/native'
import { GalleryImage } from 'application/models/gallery/GalleryImage';

const Index = () => {
  const { loading } = UseLoadingService();

  const [query, setQuery] = React.useState("");

  const { FetchGalleryImages, gallery_images } = UseGalleryService();
  const { _env } = UseEnvService();


  useFocusEffect(React.useCallback(() => {
    FetchGalleryImages();
  }, [])
  );
  
  return (
    <Container maxW="100%" h={'100%'} w="100%">
      {
          loading ? (
              <MobileLoading />
          ):(
              <Container pt="2" maxW="100%" w="100%">
              <HStack mb="3" pt="2" w="100%" space="3" alignItems="center">
                <Text textTransform="uppercase" fontSize="2xl">Gallery Mobile</Text>
              </HStack>
              <Box w="100%" bg="primary.box" overflow="hidden" rounded="10px">
                <Input bg="transparent" rounded="0" w="100%" borderWidth={0} value={query} onChangeText={setQuery} placeholder="Search" leftElement={<Icon ml="2" color="primary.text" size="lg" as={AntDesign} name="search1" />} />
                <Divider w="100%" bg="primary.text" h="1px" />
                <VStack mb="10" w="100%" space="0">
                <Stack direction="row" mb="2.5" mt="1.5" space={3}>
                  {gallery_images.filter((gallery_image)=>{
                      if(query !== ''){
                          if(gallery_image.name.toLowerCase().indexOf(query.toLowerCase()) > -1){
                              return gallery_image;
                          }
                      }else{
                          return gallery_image;
                      }
                    }).map((gallery_image:GalleryImage)=>(
                      <Image source={{
                        uri:  `${_env.eventcenter_base_url}/assets/imagegallery/${gallery_image.image}` 
                      }} alt="" size="xl" key={gallery_image.id} />
                    ))}
                  </Stack>
                </VStack>
              </Box>
              </Container>
      )}
    </Container>
  )
}

export default Index