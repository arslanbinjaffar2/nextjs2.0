import React, { useEffect } from 'react'
import { Box, Text, Button} from 'native-base'
import SquareBox from 'application/components/atoms/social-wall/SquareBox';
import AddPost from 'application/components/atoms/social-wall/AddPost';
import UseLoadingService from 'application/store/services/UseLoadingService';
import UseSocialWallService from 'application/store/services/UseSocialWallService';
import WebLoading from 'application/components/atoms/WebLoading';
import LoadMore from 'application/components/atoms/LoadMore';
import in_array from "in_array";
import { Post } from 'application/models/socialWall/SocialWall';

const Index = () => {
    const { loading,scroll, processing } = UseLoadingService();
  
    const { FetchSocialWallPosts, posts, page, last_page } = UseSocialWallService();

    useEffect(()=>{
        FetchSocialWallPosts({page:1});
    },[]);
  
    React.useEffect(() => {
      if(page<last_page){
        FetchSocialWallPosts({page:page+1});
      }
    }, [scroll]);


  function getPosts() {
    FetchSocialWallPosts({page:1});
  }


    return (
        <>
          <AddPost />
          <Button onPress={getPosts} >Refresh</Button>
          {(in_array('social_wall_posts', processing)) && page === 1 ? (
              <WebLoading />
          ):(
            <>
              <Box w="100%">
                  {posts.map((post:Post)=>{
                      return <SquareBox key={post.id} post={post} />
                      })}
              </Box>
              { posts.length === 0 ? (
                <Text>No Posts Found</Text>
              ): page === last_page && !(in_array('social_wall_posts', processing)) ? (
                <Box overflow="hidden" bg="primary.box" w="100%" rounded="lg">
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

}

export default Index