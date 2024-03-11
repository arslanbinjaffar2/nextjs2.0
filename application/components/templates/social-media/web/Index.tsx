import React, { useEffect } from 'react'

import { Box, Center, Container, Flex, HStack, Icon, Text, Pressable, Image } from 'native-base'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import UseLoadingService from '../../../../store/services/UseLoadingService'; 
import UseSocialMediaService from '../../../../store/services/UseSocialMediaService'; 
import WebLoading from 'application/components/atoms/WebLoading';
import { Linking } from 'react-native';
import { Banner } from 'application/models/Banner'
import UseBannerService from 'application/store/services/UseBannerService'
import UseEnvService from 'application/store/services/UseEnvService'
import UseEventService from 'application/store/services/UseEventService';
import NextBreadcrumbs from 'application/components/atoms/NextBreadcrumbs';

const index = () => {

  const mounted = React.useRef(false);
  const { banners, FetchBanners} = UseBannerService();
  const { _env } = UseEnvService()
  const { event, modules } = UseEventService()

  const { loading } = UseLoadingService();
  const [filteredBanners, setFilteredBanners] = React.useState<Banner[]>([]);

  const { FetchSocialMedias, socialMedia } = UseSocialMediaService();
  useEffect(()=>{
    const filteredBanner=banners.filter((banner  : Banner)=>{
      return banner.module_name == 'social' && banner.module_type == 'listing'
    })

  setFilteredBanners(filteredBanner);
  },[banners]);
  useEffect(() => {
    FetchSocialMedias();
  }, []);
  React.useEffect(() => {
    FetchBanners();
  }, []);
  const module = modules.find((module) => module.alias === 'social-media');
  return (
    <>
      {
        loading ? (
            <WebLoading />
        ):(
          <>
          <NextBreadcrumbs module={module} />
        <Container pt="2" maxW="100%" w="100%">
            <HStack mb="3" pt="2" w="100%" space="3" alignItems="center">
              <Text textTransform="uppercase" fontSize="2xl">{modules?.find((socialMedia)=>(socialMedia.alias == 'social-media'))?.name ?? ""}</Text>
            </HStack>
            <Box w="100%" mb="3" bg="primary.box" p={["4","8"]} pb="1" rounded="10px">
              <Flex direction="row" flexWrap="wrap">
                {socialMedia.length > 0 && socialMedia.map((link)=>{
                  if(link.value !== ''){
                    return <Center mb="8" w={["33%","25%"]} alignItems="center" justifyContent="center">
                    <Pressable
                    onPress={async () => {
                      
                        const url: any = link.name !== 'twitter_hash_tag' ? `${link.select_type}${link.value}` : `https://twitter.com/search?q=${link.value}&src=hash`;
                        const supported = await Linking.canOpenURL(url);
                        if (supported) {
                            await Linking.openURL(url);
                        }
                    }}>
                    
                    <Box w={["75px","90px"]} h={["75px","90px"]} shadow="1" bg={SocialStyleOptions[link.name].color} rounded="100%" alignItems="center" justifyContent="center">
                      <Icon textAlign="center" color="#fff" size={["3xl","5xl"]} as={FontAwesome} name={SocialStyleOptions[link.name].icon} />
                    </Box>
                  </Pressable>
                  </Center>
                  }
                })}
                
              </Flex>
            </Box>
          </Container>
          </>
       )
      }
      <Box width={"100%"} height={"5%"}>
        {filteredBanners.map((banner, k) =>
          <Image
            key={k}
            source={{ uri: `${_env.eventcenter_base_url}/assets/banners/${banner.image}` }}
            alt="Image"
            width="100%"
            height="100%"
          />
        )}
      </Box>
  </>
  )
}

export default index


export const SocialStyleOptions:any = {
  facebook:{
    color:'#314A7E',
    icon:'facebook',
  },
  twitter:{
    color:'#339DC3',
    icon:'twitter',
  },
  twitter_hash_tag:{
    color:'#339DC3',
    icon:'hashtag',
  },
  flickr:{
    color:'#314A7E',
    icon:'flickr',
  },
  linkedin:{
    color:'#005983',
    icon:'linkedin',
  },
  youtube:{
    color:'#E52D27',
    icon:'youtube',
  },
  vimeo:{
    color:'#0A819F',
    icon:'vimeo',
  },
  rss:{
    color:'#D45E1E',
    icon:'rss',
  },
  instagram:{
    color:{
      linearGradient: {
        colors: ['#fdf497', '#fdf497', '#fd5949', '#d6249f', '#285AEB'],
        start: [0, 0, 0, 0, 0],
        end: [1, 0, 0, 0, 0]
      }
    },
    icon:'instagram',
  },
}

