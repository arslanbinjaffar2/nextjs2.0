import React from 'react'
import { Box } from 'native-base'
import AddPost from 'application/components/atoms/social-wall/AddPost';
import UseEventService from 'application/store/services/UseEventService';
import NextBreadcrumbs from 'application/components/atoms/NextBreadcrumbs';
import BannerAds from 'application/components/atoms/banners/BannerAds'
import PostListing from 'application/components/atoms/social-wall/PostListing';

const Index = () => {
  const { modules  } = UseEventService();
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