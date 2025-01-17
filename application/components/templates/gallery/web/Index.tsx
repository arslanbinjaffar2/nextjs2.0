import React, { useEffect } from 'react'
import { Box, Container, Divider, HStack, Icon, Image, Input, Text, VStack, Stack, ScrollView, Spacer, Modal, Pressable, AspectRatio } from 'native-base';
import AntDesign from '@expo/vector-icons/AntDesign';
import UseLoadingService from 'application/store/services/UseLoadingService';
import UseGalleryService from 'application/store/services/UseGalleryService';
import UseEnvService from 'application/store/services/UseEnvService';
import WebLoading from 'application/components/atoms/WebLoading';
import { GalleryImage } from 'application/models/gallery/GalleryImage';
import LoadMore from 'application/components/atoms/LoadMore';
import LoadImage from 'application/components/atoms/LoadImage';
import in_array from "in_array";
import UseEventService from 'application/store/services/UseEventService';
import NextBreadcrumbs from 'application/components/atoms/NextBreadcrumbs';
import BannerAds from 'application/components/atoms/banners/BannerAds'
import NoRecordFound from 'application/components/atoms/NoRecordFound';
import SectionLoading from 'application/components/atoms/SectionLoading';

const Index = () => {
  const { loading, scroll, processing } = UseLoadingService();

  const [query, setQuery] = React.useState("");
  const [activepopup, setactivepopup] = React.useState(false);
  const [popupdata, setpopupdata] = React.useState<GalleryImage | null>();
  const { event, modules } = UseEventService();
  const [filteredGalleryImages, setFilteredGalleryImages] = React.useState<GalleryImage[]>([]);

  const { FetchGalleryImages, gallery_images, page, last_page } = UseGalleryService();
  const { _env } = UseEnvService();

  useEffect(() => {
    FetchGalleryImages({ page: 1 });
  }, []);

  React.useEffect(() => {
    if (page < last_page) {
      FetchGalleryImages({ page: page + 1 });
    }
  }, [scroll]);
  useEffect(() => {
    const filteredImages = gallery_images.filter((gallery_image) => {
      if (query !== '') {
        const imageTitleInfo = gallery_image.info?.find(info => info.name === 'image_title');
        if (imageTitleInfo && imageTitleInfo.value?.toLowerCase()?.includes(query.toLowerCase())) {
          return true;
        }
      } else {
        return true;
      }
      return false;
    });
    setFilteredGalleryImages(filteredImages);
  }, [gallery_images, query]);

  const module = modules.find((module) => module.alias === 'gallery');
  
  return (
    <>
      {
        (in_array('gallery', processing)) && page === 1 ? (
          <SectionLoading />
        ) : (
          <>
            <NextBreadcrumbs module={module} />
            <Container pt="2" maxW="100%" w="100%">
              <HStack mb="3" pt="2" w="100%" space="3" alignItems="center">
                <Text  fontSize="2xl">{modules?.find((gallery) => (gallery.alias == 'gallery'))?.name ?? 'Gallery'}

                </Text>
                <Spacer />
                <Input rounded="10" w={'60%'} bg="primary.box" borderWidth={0} placeholder={event?.labels?.GENERAL_SEARCH} value={query} onChangeText={setQuery} leftElement={<Icon ml="2" color="primary.text" size="lg" as={AntDesign} name="search1" />} />
              </HStack>
             {filteredGalleryImages.length>0&& <Box w="100%" overflow="hidden" p="4">
                <VStack mb="10" w="100%" space="0">
                <Stack mx={'-4%'} direction="row"  flexWrap="wrap" alignItems={'flex-start'} justifyContent={'flex-start'} mb="2" space={0}>
                {filteredGalleryImages.map((gallery_image:GalleryImage)=>(
                  <Box bg="primary.box" mb={4} mx={'1%'} rounded={'8'} overflow={'hidden'} width={['48%','48%']} key={gallery_image.id}>
                    <Pressable
                      p="0"
                      borderWidth="0"
                      onPress={()=>{
                        setactivepopup(true);
                        setpopupdata(gallery_image)
                      }}
                    
                    >
                    <AspectRatio overflow={'hidden'} bg={'primary.box'} alignItems={'center'} justifyContent={'center'} ratio={{
                      base: 4 / 4,
                     }}>
                    <LoadImage width={'100%'} path={`${_env.eventcenter_base_url}/assets/imagegallery/${gallery_image.image}` } alt={gallery_image?.info.find(info => info.name == 'image_title')?.value || ''} />
                    </AspectRatio>
                    <Text p="3" minH={'48px'} fontSize={'md'}>{gallery_image.info.find(info => info.name == 'image_title')?.value || ''}</Text>
                    </Pressable>
                  </Box>
                  ))}
                </Stack>
                </VStack>
              </Box>}
                  {filteredGalleryImages.length === 0 && (
                    <NoRecordFound
                    bg="primary.box"
                    />
                  
                  )}
              <Modal
                size={'full'}
                isOpen={activepopup}
                onClose={() => { }}
              >
                <Modal.Content maxHeight={'80%'} maxW={['320px','780px']} >
                  <Modal.Body p={0} justifyContent="flex-end">
                  <Modal.CloseButton nativeID='ebs-button-close' borderWidth={1} borderColor={'white'} rounded={'50%'} zIndex={999} onPress={() => {setactivepopup(false);setpopupdata(null)}}/>
                    <HStack position={'relative'} zIndex={-1} w={'100%'}  space="3" alignItems="center" justifyContent={'center'}>
                      <LoadImage width={'auto'} path={`${_env.eventcenter_base_url}/assets/imagegallery/${popupdata?.image}` } alt={popupdata?.info.find(info => info.name == 'image_title')?.value || ''} />
                    </HStack>
                    
                    {popupdata?.info.find(info => info.name == 'image_title')?.value && <Text p="3" textAlign={'center'} fontSize={'md'}>{popupdata?.info.find(info => info.name == 'image_title')?.value || ''}</Text>}
                  </Modal.Body>
                </Modal.Content>
              </Modal>

            </Container>
          </>
        )}
        <BannerAds module_name={'gallery'} module_type={'listing'} />
      {(in_array('gallery', processing)) && page > 1 && (
        <LoadMore />
      )}
    </>
  )
}

export default Index