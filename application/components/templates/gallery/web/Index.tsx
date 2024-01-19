import React, { useEffect } from 'react'
import { Box, Container, Divider, HStack, Icon, Image, Input, Text, VStack, Stack, ScrollView } from 'native-base';
import AntDesign from '@expo/vector-icons/AntDesign';
import UseLoadingService from 'application/store/services/UseLoadingService';
import UseGalleryService from 'application/store/services/UseGalleryService';
import UseEnvService from 'application/store/services/UseEnvService';
import WebLoading from 'application/components/atoms/WebLoading';
import { GalleryImage } from 'application/models/gallery/GalleryImage';
import LoadImage from 'application/components/atoms/LoadImage';
const Index = () => {
  const { loading } = UseLoadingService();

  const [query, setQuery] = React.useState("");

  const { FetchGalleryImages, gallery_images } = UseGalleryService();
  const { _env } = UseEnvService();

  useEffect(()=>{
    FetchGalleryImages();
  },[]);

  return (
    <>
      {
          loading ? (
              <WebLoading />
          ):(
              <Container pt="2" maxW="100%" w="100%">
              <HStack mb="3" pt="2" w="100%" space="3" alignItems="center">
                <Text textTransform="uppercase" fontSize="2xl">Gallery</Text>
              </HStack>
              <Box w="100%" bg="primary.box" overflow="hidden" rounded="10px" p="4">
                <VStack mb="10" w="100%" space="0">
                <Stack direction="row" flexWrap="wrap" mb="2.5" mt="1.5" space={3}>
                    {gallery_images.map((gallery_image:GalleryImage)=>(
                      <Box key={gallery_image.id}>
                        <Image source={{
                          uri:  `${_env.eventcenter_base_url}/assets/imagegallery/${gallery_image.image}` 
                        }} alt="Alternate Text" size="xl" key={gallery_image.id} />
                        <Text>{gallery_image.info.find(info => info.name == 'image_title')?.value || ''}</Text>
                        </Box>
                      ))}
                </Stack>
                </VStack>
              </Box>
              </Container>
      )}
    </>
  )
}

export default Index