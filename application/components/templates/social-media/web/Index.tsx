import React, { useEffect, useState } from 'react'

import { Box, Center, Container, Flex, HStack, Icon, Text, Pressable, Image } from 'native-base'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import UseLoadingService from '../../../../store/services/UseLoadingService'; 
import UseSocialMediaService from '../../../../store/services/UseSocialMediaService'; 
import WebLoading from 'application/components/atoms/WebLoading';
import {  Linking } from 'react-native';
import { useWindowDimensions } from 'react-native';
import BannerAds from 'application/components/atoms/banners/BannerAds'
import UseEventService from 'application/store/services/UseEventService';
import NextBreadcrumbs from 'application/components/atoms/NextBreadcrumbs';
import NoRecordFound from 'application/components/atoms/NoRecordFound';
import SectionLoading from 'application/components/atoms/SectionLoading';
import DynamicIcon from 'application/utils/DynamicIcon';

const index = () => {
  const { width } = useWindowDimensions();
  const mounted = React.useRef(false);
    const { loading } = UseLoadingService();
    const { event, modules } = UseEventService()
    const { FetchSocialMedias, socialMedia } = UseSocialMediaService();
    useEffect(() => {
      FetchSocialMedias();
    }, []);
    const module = modules.find((module) => module.alias === 'social-media');
    const XtwiiterIconWidth = width <= 479 ? 64 : 90;
    const XtwiiterIconHeight = width <= 479 ? 64 : 192;
  return (
    <>
      {
        loading ? (
            <SectionLoading />
        ):(
          <>
          <NextBreadcrumbs module={module} />
   {socialMedia.length > 0  &&   <Container pt="2" maxW="100%" w="100%">
            <HStack mb="3" pt="2" w="100%" space="3" alignItems="center">
              <Text fontSize="2xl">{modules?.find((socialMedia)=>(socialMedia.alias == 'social-media'))?.name ?? ""}</Text>
            </HStack>
            <Box w="100%" mb="3" bg="primary.box" p={["4","8"]} pb="1" rounded="10px">
              <Flex direction="row" flexWrap="wrap">
                {socialMedia.length > 0 && socialMedia.map((link)=>{
                  if(link.value !== ''){
                    return <Center mb="8" w={["33%","25%"]} alignItems="center" justifyContent="center">
                    <Pressable
                    onPress={async () => {
                      
                        const url: any = link.name !== 'twitter_hash_tag' ? `${link.select_type}${link.value}` : `https://x.com/search?q=${link.value}&src=hash`;
                        const supported = await Linking.canOpenURL(url);
                        if (supported) {
                            await Linking.openURL(url);
                        }
                    }}>
                    
                    <Box w={["75px","90px"]} h={["75px","90px"]} shadow="1" bg={SocialStyleOptions[link.name].color} rounded="100%" alignItems="center" justifyContent="center">
                      {SocialStyleOptions[link.name].icon == "x-twitter" ?
                      <DynamicIcon iconType={"xtwitter"} iconProps={{width:XtwiiterIconWidth,height:XtwiiterIconHeight}}/>
                        :<Icon textAlign="center" color="#fff" size={["4xl","5xl"]} as={FontAwesome} name={SocialStyleOptions[link.name].icon} />}
                    </Box>
                  </Pressable>
                  </Center>
                  }
                })}
                
              </Flex>
            </Box>
          </Container>}
          {socialMedia.length <= 0 &&
          <NoRecordFound  bg="primary.box"/>
          }
          </>
       )
      }
        <BannerAds module_name={'social'} module_type={'listing'} />
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
    color:'#000',
    icon:'x-twitter',
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

