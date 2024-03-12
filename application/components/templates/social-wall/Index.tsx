import React, { useEffect, useState } from 'react'
import { Box, Image } from 'native-base'
import SquareBox from 'application/components/atoms/social-wall/SquareBox';
import AddPost from 'application/components/atoms/social-wall/AddPost';
import BannerAds from 'application/components/atoms/banners/BannerAds'
import PostListing from 'application/components/atoms/social-wall/PostListing';

const Index = () => {


    return (
        <>
          <AddPost />
          <PostListing attendee_id={0} />  
          <Box width={"100%"} height={"5%"}>
            <BannerAds module_name={'social_wall'} module_type={'listing'} />
          </Box>
        </>
    )

}

export default Index