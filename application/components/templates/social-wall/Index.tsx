import React, { useEffect, useState } from 'react'
import { Box, Image } from 'native-base'
import SquareBox from 'application/components/atoms/social-wall/SquareBox';
import AddPost from 'application/components/atoms/social-wall/AddPost';
import BannerAds from 'application/components/atoms/banners/BannerAds'

const Index = () => {


  return (
    <>
      <AddPost />
      <Box w="100%">
        <SquareBox />
        <SquareBox />
        <SquareBox />
      </Box>
      <Box width={"100%"} height={"5%"}>
        <BannerAds module_name={'social_wall'} module_type={'listing'} />
      </Box>
    </>
  );
}

export default Index