import React, { useState } from 'react'
import { Avatar, Box, HStack, VStack, Text, Image, Spacer, IconButton, Button, Divider, Input, Link } from 'native-base'
import IcoLike from 'application/assets/icons/Icolike'
import IcoMessage from 'application/assets/icons/IcoMessage'
import IcoSharePost from 'application/assets/icons/IcoSharePost'
import IcoMessagealt from 'application/assets/icons/IcoMessagealt'
import Icolikealt from 'application/assets/icons/Icolikealt'
import { Comment, NewComment, Post } from 'application/models/socialWall/SocialWall'
import UseEnvService from 'application/store/services/UseEnvService';
import UseAuthService from 'application/store/services/UseAuthService';
import useSocialWallService from 'application/store/services/UseSocialWallService'
import NewCommentBox from 'application/components/atoms/social-wall/NewCommentBox';
import CommentBox from 'application/components/atoms/social-wall/CommentBox';
import UseEventService from 'application/store/services/UseEventService';

type AppProps = {
  post: Post,
}

const SquareBox = ({ post }: AppProps) => {

  const { _env } = UseEnvService();
  const { response } = UseAuthService();
  const { event } = UseEventService();
  const { LikeSocialWallPost,SaveSocialWallComment,LikeSocialWallComment, DeleteSocialWallPost } =useSocialWallService();
  const [isLiked, setIsLiked] = useState<boolean>(
    post.likes.some(like => like.attendee_id === response?.data?.user?.id)
  );
  const [likesCount, setlikesCount] = useState<number>(
    post.likes_count
  );

  function likePost() {
    setIsLiked(!isLiked);
    setlikesCount(isLiked ? likesCount - 1 : likesCount + 1);
    LikeSocialWallPost({id:post.id})
  }

  function deletePost() {
    DeleteSocialWallPost({id:post.id})
  }

  function saveComment(newComment:NewComment) {
    SaveSocialWallComment({...newComment})
  }

  function likeComment(id:number) {
    LikeSocialWallComment({id:id})
  }

  return (
    <Box mb="3"  w="100%">
      <VStack space="3">
        {/* button to delete post */}
        {post.attendee.id === response?.data?.user?.id && (
          <>
          <Button onPress={() => {
            deletePost()
          }} variant="unstyled" alignSelf="flex-end" p="0" m="0">
            <Text fontSize="xs" color="primary.text">Delete</Text>
          </Button>
          <Link href={`/${event.url}/social_wall/edit/${post.id}`}>
            <Text w={'100%'} fontSize='md' lineHeight='sm'>Edit</Text>
          </Link>
      </>
        )}
        <HStack space="3" alignItems="center" key="rd90">
          <Avatar
            borderWidth={1}
            borderColor="primary.text"
            size="md"
            source={{
              uri: `${_env.eventcenter_base_url}/assets/attendees/${post.attendee.image}`
            }}
          >
            SS
          </Avatar>
          <VStack space="0" >
            <Text fontSize="lg" key="full_name_att" fontWeight="600">{post.attendee.full_name}</Text>
            <Text fontSize="sm" key="time_attendee_post">{post.created_at_formatted}</Text>
          </VStack>
        </HStack>
        <Text key="p-content" fontSize="md">{post.content}</Text>
        {(post.type === 'image' || post.type === 'text') && post.image !== '' &&(
          <Image
            source={{
              uri: `${_env.eventcenter_base_url}/assets/social_wall/${post.image}`
            }}
            alt="Alternate Text"
            w="100%"
            h="295px"
            rounded="10"
            mb="2"
            mt="3"
          />
        )}

        {post.type === 'video' && post.image !== '' &&(
          <video
            w="100%"
            h="295px"
            rounded="10"
            mb="2"
            mt="3"
            controls
            src={`${_env.eventcenter_base_url}/assets/social_wall/${post.image}`}
          />
        )}

        <HStack key="rd99" pb="3" borderBottomWidth="1" borderBottomColor="primary.text" space="3" alignItems="center">
          <HStack space="2" alignItems="center" key="likebtn">
            <IconButton
              icon={<IcoLike width="18px" height="18px" />}
              onPress={() => {
                likePost()
              }}
              {...(isLiked ? { variant: 'solid' } : { variant: 'unstyled' })}
            />
            <IconButton
              variant="unstyled"
              icon={<IcoMessage width="18px" height="18px" />}
              onPress={() => {
                console.log('hello')
              }}
            />
            <IconButton
              variant="unstyled"
              icon={<IcoSharePost width="18px" height="15px" />}
              onPress={() => {
                console.log('hello')
              }}
            />
          </HStack>
          <Spacer />
          <HStack space="3" alignItems="center" key="commentbtn">
            <HStack space="1" alignItems="center">
              <Text fontSize="sm">{likesCount}</Text>
              <Icolikealt />
            </HStack>
            <Divider w="1px" h="10px" bg="primary.text" />
            <HStack space="1" alignItems="center">
              <Text fontSize="sm">{post.comments_count}</Text>
              <IcoMessagealt />
            </HStack>
          </HStack>
        </HStack>
        {/* new comment section */}
        <HStack>
          <Avatar
            borderWidth={1}
            borderColor="primary.text"
            size="sm"
            source={{
              uri: `${_env.eventcenter_base_url}/assets/attendees/${response?.data?.user?.image}`
            }}
          >
            SS
          </Avatar>
          <VStack space="0" >
            <Text fontSize="md" fontWeight="600">{response?.data?.user?.first_name} {response?.data?.user?.last_name}</Text>
            {/* add a input with button */}
            <NewCommentBox post_id={post.id} parent_id={0} saveComment={saveComment} />
          </VStack>
        </HStack>
        {post.comments.map((comment: Comment) => {
          return <React.Fragment key={comment.id}>
            <Box >
              <CommentBox comment={comment} key={comment.id} />
              {comment.replies.map((reply: Comment) => {
                <CommentBox comment={reply} key={reply.id} />
              })}
            </Box>
            <NewCommentBox post_id={post.id} parent_id={comment.id} saveComment={saveComment} />
          </React.Fragment>
        })}
      </VStack>
    </Box>
  )

}

export default SquareBox