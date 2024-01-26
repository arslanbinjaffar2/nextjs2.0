import React, { useEffect } from 'react'
import { Box, Text, Button, Select, CheckIcon, HStack} from 'native-base'
import SquareBox from 'application/components/atoms/social-wall/SquareBox';
import AddPost from 'application/components/atoms/social-wall/AddPost';
import UseLoadingService from 'application/store/services/UseLoadingService';
import UseSocialWallService from 'application/store/services/UseSocialWallService';
import WebLoading from 'application/components/atoms/WebLoading';
import LoadMore from 'application/components/atoms/LoadMore';
import in_array from "in_array";
import { Post } from 'application/models/socialWall/SocialWall';
import { SelectSortBy } from 'application/store/slices/SocialWall.Slice';

type AppProps = {
  attendee_id: number,
}

const PostListing = ({ attendee_id }: AppProps) => {
    const { loading,scroll, processing } = UseLoadingService();
  
    const { FetchSocialWallPosts, posts, page, last_page, sort_by } = UseSocialWallService();
    const [sortBy, setSortBy] = React.useState<string>(sort_by);

    useEffect(()=>{
        FetchSocialWallPosts({page:1,sort_by:sortBy,attendee_id:attendee_id});
    },[]);
  
    React.useEffect(() => {
      if(page<last_page){
        FetchSocialWallPosts({page:page+1,sort_by:sortBy,attendee_id:attendee_id});
      }
    }, [scroll]);

    useEffect(()=>{
      getPosts()
    },[sortBy]);
  
  function getPosts() {
    FetchSocialWallPosts({page:1,sort_by:sortBy,attendee_id:attendee_id});
  }
  
    return (
        <>
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

}

export default PostListing