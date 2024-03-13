import React, { useEffect } from 'react'
import { Box, Text, Button, Select, CheckIcon, HStack, Center, Menu, Spacer, Icon} from 'native-base'
import SquareBox from 'application/components/atoms/social-wall/SquareBox';
import UseLoadingService from 'application/store/services/UseLoadingService';
import UseSocialWallService from 'application/store/services/UseSocialWallService';
import WebLoading from 'application/components/atoms/WebLoading';
import LoadMore from 'application/components/atoms/LoadMore';
import in_array from "in_array";
import { Post } from 'application/models/socialWall/SocialWall';
import { Pressable } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';

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
        <Box w={'100%'}>
            <HStack px={3} py={1} bg={'primary.darkbox'} roundedTop={'10px'} w={'100%'} alignItems="center">
              <Text fontSize="md" textTransform={'uppercase'}>Post</Text>
              <Spacer />
              <Box>
                <Menu
                  placement="bottom right"
                  bg="primary.box"
                  borderWidth={1}
                  borderColor="#707070"
                  shouldFlip={true}
                  w={180}
                  crossOffset={0}
                  trigger={triggerProps => {
                return <Pressable accessibilityLabel="More options menu" {...triggerProps}>
                          <HStack  space="2" alignItems="center">
                            <Text fontSize="md"> {sortBy === 'id' ? 'Latest Posts' : sortBy === 'comments_count' ? 'Most Discussed Posts' : 'Most Liked Posts'}</Text>
                            <Icon as={AntDesign} name="caretdown" color={'primary.text'}  />
                          </HStack>
                      </Pressable>;
              }}>
                  <Menu.Item  _focus={{bg: ''}} _hover={{bg: 'primary.500'}} textValue='id' onPress={() => setSortBy("id")}>Latest Posts</Menu.Item>
                  <Menu.Item  _focus={{bg: ''}} _hover={{bg: 'primary.500'}} textValue='comments_count' onPress={() => setSortBy("comments_count")}>Most Discussed Posts</Menu.Item>
                  <Menu.Item  _focus={{bg: ''}} _hover={{bg: 'primary.500'}} textValue='likes_count' onPress={() => setSortBy("likes_count")}>Most Liked Posts</Menu.Item>
                </Menu>
              </Box>
            </HStack>
            
            
            {(in_array('social_wall_posts', processing)) && page === 1 ? (
                <Box  w={'100%'} p="4" rounded="lg">
                  <WebLoading />
                </Box>
                
            ):
            (
              <>
                <Box w="100%" key='post-lising'>
                    {posts.map((post:Post, i: number)=>{
                        return <SquareBox index={i} key={post.id} post={post} />
                        })}
                </Box>
                { posts.length === 0 ? (
                  <Text>No Posts Found</Text>
                ): null}
              </>
            )
            }
            {(in_array('social_wall_posts', processing)) && page > 1 && (
              <LoadMore />
            )}
          </Box>    
        </>
    )

}

export default PostListing