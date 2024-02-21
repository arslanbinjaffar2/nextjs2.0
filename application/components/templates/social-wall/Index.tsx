import React, { useEffect, useState } from 'react'
import { Box, Image, Text, Button, Select, CheckIcon, HStack} from 'native-base'
import SquareBox from 'application/components/atoms/social-wall/SquareBox';
import AddPost from 'application/components/atoms/social-wall/AddPost';
import UseLoadingService from 'application/store/services/UseLoadingService';
import UseSocialWallService from 'application/store/services/UseSocialWallService';
import WebLoading from 'application/components/atoms/WebLoading';
import LoadMore from 'application/components/atoms/LoadMore';
import in_array from "in_array";
import { Post } from 'application/models/socialWall/SocialWall';
import { SelectSortBy } from 'application/store/slices/SocialWall.Slice';
import UseBannerService from 'application/store/services/UseBannerService'
import UseEnvService from 'application/store/services/UseEnvService'
import { Banner } from 'application/models/Banner'

const Index = () => {
    const { loading,scroll, processing } = UseLoadingService();
  
    const { FetchSocialWallPosts, posts, page, last_page, sort_by } = UseSocialWallService();
    const [sortBy, setSortBy] = React.useState<string>(sort_by);

    const { banners, FetchBanners } = UseBannerService();
    const { _env } = UseEnvService()
    const [filteredBanners, setFilteredBanners] = useState<Banner[]>([]);

    useEffect(() => {
      const filteredBanner = banners.filter((banner: Banner) => {
        return banner.module_name == 'social_wall' && banner.module_type == 'listing'
      });
      setFilteredBanners(filteredBanner);
    }, [banners]);

    useEffect(()=>{
        FetchSocialWallPosts({page:1,sort_by:sortBy});
    },[]);
  
    React.useEffect(() => {
      if(page<last_page){
        FetchSocialWallPosts({page:page+1,sort_by:sortBy});
      }
    }, [scroll]);

    useEffect(()=>{
      getPosts()
    },[sortBy]);
  
  function getPosts() {
    FetchSocialWallPosts({page:1,sort_by:sortBy});
  }
  
    return (
        <>
          <AddPost />
          
          <Select mb={2} selectedValue={sortBy} minWidth="200" accessibilityLabel="" placeholder="" _selectedItem={{
              bg: "teal.600",
              endIcon: <CheckIcon size="5" />
            }} mt={1} onValueChange={itemValue => setSortBy(itemValue)}>
            <Select.Item label="Latest Posts" value="id" />
            <Select.Item label="Most Discussed Posts" value="comments_count" />
            <Select.Item label="Most Liked Posts" value="likes_count" />
          </Select>

          {(in_array('social_wall_posts', processing)) && page === 1 ? (
              <WebLoading />
          ):(
            <>
              <Box w="100%" key='post-lising'>
                  {posts.map((post:Post)=>{
                      return <SquareBox key={post.id} post={post} />
                      })}
              </Box>
              { posts.length === 0 ? (
                <Text>No Posts Found</Text>
              ): page === last_page && !(in_array('social_wall_posts', processing)) ? (
                <Box overflow="hidden" bg="primary.box" w="100%" rounded="lg" key='no-posts'>
                    <Box padding={5}>
                            <Text>There are no more posts</Text>
                        </Box>
                </Box>
              ):null}

            </>
          )}
          {(in_array('social_wall_posts', processing)) && page > 1 && (
            <LoadMore />
          )}
            
        </>
    )

  useEffect(() => {
    FetchBanners();
  }, []);

  return (
    <>
      <AddPost />
      <Box w="100%">
        <SquareBox />
        <SquareBox />
        <SquareBox />
      </Box>
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
  );
}

export default Index