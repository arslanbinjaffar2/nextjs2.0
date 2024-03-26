import React, { useEffect, useState, useRef } from 'react';
import { Box, Button, HStack, Image, Icon } from 'native-base';
import SquareBox from 'application/components/atoms/social-wall/SquareBox';
import AddPost from 'application/components/atoms/social-wall/AddPost';
import UseBannerService from 'application/store/services/UseBannerService';
import UseEnvService from 'application/store/services/UseEnvService';
import { Banner } from 'application/models/Banner';
import useSocialWallService from 'application/store/services/UseSocialWallService'
import UseEventService from 'application/store/services/UseEventService';
import NextBreadcrumbs from 'application/components/atoms/NextBreadcrumbs';
import BannerAds from 'application/components/atoms/banners/BannerAds';
import PostListing from 'application/components/atoms/social-wall/PostListing';
import AntDesign from '@expo/vector-icons/AntDesign';
import UseSocketService from 'application/store/services/UseSocketService';
import UseSocialWallService from 'application/store/services/UseSocialWallService'

const Index = () => {
  const { modules  } = UseEventService();
  const {labels } = UseSocialWallService();
  const module = modules.find((module) => module.alias === 'social_wall');
  const { socket } = UseSocketService();
  const { event } = UseEventService();
  const { labels } = useSocialWallService();

  const [showNewPostButton, setShowNewPostButton] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const topRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (socket !== null) {
      socket?.on(`event-buizz:social_wall_post_updated_${event.id}`, () => {
        // Just set the flag to show the button without changing the refreshKey
        setShowNewPostButton(true);
      });
    }
    return () => {
      if (socket !== null) {
        socket?.off(`event-buizz:social_wall_post_updated_${event.id}`);
      }
    };
  }, [socket, event.id]);


  const handleNewPostClick = () => {
    if (topRef.current) {
      topRef.current.scrollIntoView({ behavior: "smooth", block: "start", inline: "start"  });
    }
    setRefreshKey(refreshKey => refreshKey + 1);
    setShowNewPostButton(false);
  };

  return (
    <>
      <div ref={topRef}></div>
      <NextBreadcrumbs module={module} />
      <AddPost />
      {showNewPostButton && (
        <HStack nativeID='button-reload-post' w={'100%'} mb={3} alignItems={'center'} justifyContent={'center'} position={'sticky'} top={5} left={0}>
          <Button rounded={'full'} leftIcon={<Icon size="md" as={AntDesign} name="arrowup" color="primary.text" />} px={3} py={2} size={'md'} onPress={handleNewPostClick}>{labels.SOCIAL_WALL_NEW_FEEDS}</Button>
        </HStack>
        
      )}
      <PostListing key={refreshKey} attendee_id={0} />
      <Box width={"100%"} height={"5%"}>
        <BannerAds module_name={'social_wall'} module_type={'listing'} />
      </Box>
    </>
  );
};

export default Index;
