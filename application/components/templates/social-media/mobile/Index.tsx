import React, { useEffect } from 'react'

import { Box, Center, Container, Flex, HStack, Icon, Pressable, Text } from 'native-base';
import FontAwesome from '@expo/vector-icons/FontAwesome'
import UseLoadingService from '../../../../store/services/UseLoadingService'; 
import UseSocialMediaService from '../../../../store/services/UseSocialMediaService'; 
import {useFocusEffect } from '@react-navigation/native'
import MobileLoading from 'application/components/atoms/MobileLoading';
import { Linking } from 'react-native';
import { SocialStyleOptions } from '../web';

const index = () => {

  const mounted = React.useRef(false);

    const { loading } = UseLoadingService();
    
    const { FetchSocialMedias, socialMedia } = UseSocialMediaService();

    useFocusEffect(React.useCallback(() => {
      FetchSocialMedias();
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
              <Text textTransform="uppercase" fontSize="2xl">Social media</Text>
            </HStack>
            <Box w="100%" mb="3" bg="primary.box" p="8" pb="1" rounded="10px">
              <Flex direction="row" flexWrap="wrap">
                {socialMedia.length > 0 && socialMedia.map((link)=>{
                  if(link.value !== ''){
                    return <Center mb="8" w="25%" alignItems="center" justifyContent="center">
                    <Pressable
                    onPress={async () => {
                      
                        const url: any = link.name !== 'twitter_hash_tag' ? `${link.select_type}${link.value}` : `https://twitter.com/search?q=${link.value}&src=hash`;
                        const supported = await Linking.canOpenURL(url);
                        if (supported) {
                            await Linking.openURL(url);
                        }
                    }}>
                    
                    <Box w="90px" h="90px" shadow="1" bg={SocialStyleOptions[link.name].color} rounded="100%" alignItems="center" justifyContent="center">
                      <Icon textAlign="center" color="#fff" size="5xl" as={FontAwesome} name={SocialStyleOptions[link.name].icon} />
                    </Box>
                  </Pressable>
                  </Center>
                  }
                })}
                
              </Flex>
            </Box>
          </Container>
       )
      }
  </Container>
  )
}

export default index


