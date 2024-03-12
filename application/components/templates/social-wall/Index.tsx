
import React, { useEffect, useState } from 'react'
import { Box, Image, Text, Button, Select, CheckIcon, HStack} from 'native-base'
import SquareBox from 'application/components/atoms/social-wall/SquareBox';
import AddPost from 'application/components/atoms/social-wall/AddPost';
import PostListing from 'application/components/atoms/social-wall/PostListing';
import BannerAds from 'application/components/atoms/banners/BannerAds'
import UseEventService from 'application/store/services/UseEventService';
import NextBreadcrumbs from 'application/components/atoms/NextBreadcrumbs';

const Index = () => {

  const { modules } = UseEventService();
  const module = modules.find((module) => module.alias === 'social_wall');

  return (
    <>
     <NextBreadcrumbs module={module} />
      <AddPost />
      <PostListing attendee_id={0} />  
      <Box width={"100%"} height={"5%"}>
        <BannerAds module_name={'social_wall'} module_type={'listing'} />
      </Box>
      </>
  )
}

export default Index