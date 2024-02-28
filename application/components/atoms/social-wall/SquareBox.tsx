import React, { useState } from 'react'
import { Avatar, Box, HStack, VStack, Text, Image, Spacer, IconButton, Button, Divider, Input, Center, Link } from 'native-base'
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
import { useRouter } from 'solito/router'


type AppProps = {
  post: Post,
  index: number,
}

const SquareBox = ({ post, index }: AppProps) => {

  const { push } = useRouter();
  const { _env } = UseEnvService();
  const { response } = UseAuthService();
  const { event } = UseEventService();
  const { LikeSocialWallPost,SaveSocialWallComment,LikeSocialWallComment, DeleteSocialWallPost } =useSocialWallService();

  const [toggleReplay, settoggleReplay] = useState(null)
  const [commnetid, setcommnetid] = useState(null)

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
 const handleChildClick = (a: any, b: any) => {
    settoggleReplay(a);
    setcommnetid(b)
    // You can perform any actions needed with the received data
  };
  return (
    <Box mb="3"  w="100%" py={3}  bg={'primary.box'} roundedTop={ index === 0 ? 0 : 10 } roundedBottom={10} borderWidth="1" borderColor="primary.box">
      <VStack space="3">
        {/* button to delete post */}
        {post.attendee.id === response?.data?.user?.id && (
          <HStack px={4} justifyContent={'flex-end'} width={'100%'}>
          <Button onPress={() => {
            deletePost()
          }} variant="unstyled" alignSelf="flex-end" p="0" m="0">
            <Text fontSize="xs" color="primary.text">Delete</Text>
          </Button>
          <Button onPress={() => {
            push(`/${event.url}/social_wall/edit/${post.id}`)
          }} variant="unstyled" alignSelf="flex-end" p="0" m="0">
            <Text fontSize="xs" color="primary.text">Edit</Text>
          </Button>
      </HStack>
        )}
        <HStack space="3" px={4} alignItems="center" key="rd90">
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
        <Text px={4} key="p-content" fontSize="md">{post.content}</Text>
        {(post.type === 'image' || post.type === 'text') && post.image !== '' &&(
          <Center w={'100%'} px={4}>
            <Image
              source={{
                uri: `${_env.eventcenter_base_url}/assets/social_wall/${post.image}`
              }}
              alt="Alternate Text"
              w="100%"
              h="295px"
              rounded="10"   
            />
          </Center>
          
        )}

        {post.type === 'video' && post.image !== '' &&(
          <Center w={'100%'} px={4}>
            <video
              width="100%"
              height="295px"
              controls
              src={`${_env.eventcenter_base_url}/assets/social_wall/${post.image}`}
            />
          </Center>
        )}
        <HStack  space="1" w={'100%'} px={4}>
           <HStack space="1" alignItems="center">
              <Icolikealt />
              <Text fontSize="sm">{likesCount}</Text>
            </HStack>
            <Spacer />
          <HStack space="3" alignItems="center" key="commentbtn">
            <HStack space="1" alignItems="center">
              <Text fontSize="sm">{post.comments_count} Comments</Text>
            </HStack>
            <HStack space="1" alignItems="center">
              <Text fontSize="sm">{post.comments_count} Shares</Text>
            </HStack>
          </HStack>
        </HStack>
        
        <HStack key="rd99" px="3" space="0" alignItems="center">
          <HStack  py={3} borderBottomWidth="1" w={'100%'} flexWrap={'wrap'} borderTopWidth="1" borderColor="primary.bordercolor" space="2" alignItems="center" key="likebtn">
            <Center flex={1} alignItems={'flex-start'}>
                <Button
                  colorScheme="unstyled"
                  bg={isLiked ? 'primary.500' : 'transparent'}
                  px={1}
                  py={0}
                  leftIcon={<IcoLike width="18px" height="18px" />}
                  onPress={()=>{
                    likePost()
                  }}
                
                >
                  Like
                </Button>
            </Center>
            <Center flex={1}>
              <Button
                  colorScheme="unstyled"
                  bg={'transparent'}
                  _hover={{bg: 'transparent'}}
                  px={1}
                  py={0}
                  leftIcon={<IcoMessage width="18px" height="18px" />}
                  onPress={()=>{
                   console.log('hello')
                  }}
                
                >
                  Comments
                </Button>
            </Center>
             <Center flex={1} alignItems={'flex-end'}>
              <Button
                  colorScheme="unstyled"
                  bg={'transparent'}
                  _hover={{bg: 'transparent'}}
                  px={1}
                  py={0}
                  leftIcon={<IcoSharePost width="18px" height="18px" />}
                  onPress={()=>{
                   console.log('hello')
                  }}
                
                >
                  Share
                </Button>
            </Center>
          </HStack>
        </HStack>
        {/* new comment section */}
        {/* <HStack>
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
        </HStack> */}
          
        {post.comments.map((comment: Comment) => {
          return <React.Fragment key={comment.id}>
            <Box overflow={'hidden'} w={'100%'}>
              <CommentBox onChildClick={handleChildClick}  secondlevel={false} comment={comment} key={comment.id} />
              {comment.replies.map((reply: Comment) => 
                <CommentBox onChildClick={handleChildClick}  secondlevel={true} comment={reply} key={reply.id} />
              )}
             {toggleReplay && commnetid === comment.id && <Divider bg={'primary.bordercolor'} zIndex={2} height={'calc(100% - 65px)'} width={'1px'} position={'absolute'} left={'35px'} top={'32px'} />}
            {toggleReplay && commnetid === comment.id && <HStack w={'100%'} py={2} pl={'65px'} pr={3} space="2" alignItems="center">
              <Center>
                <Divider w={'4'} position={'absolute'} left={'-30px'} top={3} bg={'primary.bordercolor'} />
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
              </Center>
              <Center w={'calc(100% - 45px)'}>
                <NewCommentBox post_id={post.id} parent_id={comment.id} saveComment={saveComment} />
              </Center>
              
            </HStack>}
            </Box>
            
          </React.Fragment>
        })}
        <HStack w={'100%'} px={4} py={3} borderTopWidth={1} borderTopColor={'primary.bordercolor'} space="3" >
           <Center>
                <Avatar
                  borderWidth={1}
                  borderColor="primary.text"
                  size="md"
                  source={{
                    uri: `${_env.eventcenter_base_url}/assets/attendees/${response?.data?.user?.image}`
                  }}
                >
                  SS
                </Avatar>
            </Center>
            {/* <Text fontSize="md" fontWeight="600">{response?.data?.user?.first_name} {response?.data?.user?.last_name}</Text> */}
            {/* add a input with button */}
            <Center w={'calc(100% - 60px)'}>
              <NewCommentBox post_id={post.id} parent_id={0} saveComment={saveComment} />
            </Center>
            
          </HStack>
      </VStack>
    </Box>
  )

}

export default SquareBox