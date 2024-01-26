import React, { useEffect } from 'react'
import { Box, Text, Button, Select, CheckIcon, HStack, Center, Menu, Spacer} from 'native-base'
import SquareBox from 'application/components/atoms/social-wall/SquareBox';
import AddPost from 'application/components/atoms/social-wall/AddPost';
import UseLoadingService from 'application/store/services/UseLoadingService';
import UseSocialWallService from 'application/store/services/UseSocialWallService';
import WebLoading from 'application/components/atoms/WebLoading';
import LoadMore from 'application/components/atoms/LoadMore';
import in_array from "in_array";
import { Post } from 'application/models/socialWall/SocialWall';
import { SelectSortBy } from 'application/store/slices/SocialWall.Slice';
import { Pressable } from 'react-native';

const Index = () => {

    return (
        <>
          <AddPost />
          
          <Box w={'100%'} bg={'primary.box'} rounded="10px" borderWidth="1" borderColor="primary.box">
            <HStack bg={'primary.darkbox'} roundedTop={'10px'} w={'100%'} alignItems="center">
              <Select mb={2} selectedValue={sortBy} minWidth="200" accessibilityLabel="" placeholder="" _selectedItem={{
                  bg: "teal.600",
                  endIcon: <CheckIcon size="5" />
                }} mt={1} onValueChange={itemValue => setSortBy(itemValue)}>
                <Select.Item label="Latest Posts" value="id" />
                <Select.Item label="Most Discussed Posts" value="comments_count" />
                <Select.Item label="Most Liked Posts" value="likes_count" />
              </Select>
              <Spacer />
              <Box>
                <Menu
                  placement="bottom right"
                  bg="primary.darkbox"
                  borderWidth={1}
                  borderColor="#707070"
                  shouldFlip={true}
                  w={180}
                  trigger={triggerProps => {
                return <Pressable accessibilityLabel="More options menu" {...triggerProps}>
                       <Text fontSize="lg"> {sortBy === 'id' ? 'Latest Posts' : sortBy === 'comments_count' ? 'Most Discussed Posts' : 'Most Liked Posts'}</Text>
                      </Pressable>;
              }}>
                  <Menu.Item onPress={() => setSortBy("id")}>Latest Posts</Menu.Item>
                  <Menu.Item onPress={() => setSortBy("comments_count")}>Most Discussed Posts</Menu.Item>
                  <Menu.Item onPress={() => setSortBy("likes_count")}>Most Liked Posts</Menu.Item>
                </Menu>
              </Box>
            </HStack>
            
            
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
                  <Box overflow="hidden" w="100%"key='no-posts'>
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
          </Box>
            
        </>
    )

}

export default Index