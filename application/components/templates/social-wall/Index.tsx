import React, { useEffect, useState } from 'react'
import { Box, Image } from 'native-base'
import SquareBox from 'application/components/atoms/social-wall/SquareBox';
import AddPost from 'application/components/atoms/social-wall/AddPost';
import PostListing from 'application/components/atoms/social-wall/PostListing';
import UseBannerService from 'application/store/services/UseBannerService'
import UseEnvService from 'application/store/services/UseEnvService'
import { Banner } from 'application/models/Banner'

const Index = () => {
  const { banners, FetchBanners } = UseBannerService();
  const { _env } = UseEnvService()
  const [filteredBanners, setFilteredBanners] = useState<Banner[]>([]);

  useEffect(() => {
    const filteredBanner = banners.filter((banner: Banner) => {
      return banner.module_name == 'social_wall' && banner.module_type == 'listing'
    });
    setFilteredBanners(filteredBanner);
  }, [banners]);

  useEffect(() => {
    FetchBanners();
  }, []);

    return (
        <>
          <AddPost />
          <PostListing attendee_id={0} />  
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

export default Index