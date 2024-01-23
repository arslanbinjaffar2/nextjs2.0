import React from 'react'
import { Avatar, Box, HStack, VStack, Text, Image, Spacer, IconButton, Button, Divider } from 'native-base'
import IcoLike from 'application/assets/icons/Icolike'
import IcoMessage from 'application/assets/icons/IcoMessage'
import IcoSharePost from 'application/assets/icons/IcoSharePost'
import IcoMessagealt from 'application/assets/icons/IcoMessagealt'
import Icolikealt from 'application/assets/icons/Icolikealt'
import { Comment, Post } from 'application/models/socialWall/SocialWall'
import UseEnvService from 'application/store/services/UseEnvService';
import UseAuthService from 'application/store/services/UseAuthService';

type AppProps = {
  post: Post,
}

const SquareBox = ({ post }: AppProps) => {

  const { _env } = UseEnvService();
  const { response } = UseAuthService();

  function likePost() {
    var liked=post.likes.some(like => like.attendee_id === response?.data?.user?.id)
    if(liked){
      alert('unlike post')
    }else{
      alert('like post')
    }
  }

  return (
    <Box mb="3" borderWidth="1" borderColor="primary.bdBox" w="100%" bg="primary.box" p="4" rounded="10px" overflow="hidden">
      <VStack space="3">
        <HStack space="3" alignItems="center">
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
            <Text fontSize="lg" fontWeight="600">{post.attendee.full_name}</Text>
            <Text fontSize="sm">{post.created_at_formatted}</Text>
          </VStack>
        </HStack>
        <Text mb="3" fontSize="md">{post.content}</Text>
        <Image
          source={{
            uri: 'https://wallpaperaccess.com/full/3175001.jpg'
          }}
          alt="Alternate Text"
          w="100%"
          h="295px"
          rounded="10"
          mb="2"
        />
        <HStack pb={post.comments.length !== 0 ? "3" : undefined} borderBottomWidth={post.comments.length !== 0 ? "1" : undefined} borderBottomColor="primary.text" space="3" alignItems="center">
          <HStack space="2" alignItems="center">
            <IconButton
              icon={<IcoLike width="18px" height="18px" />}
              onPress={() => {
                likePost()
              }}
              {...(post.likes.some(like => like.attendee_id === response?.data?.user?.id) ? { variant: 'solid' } : { variant: 'unstyled' })}
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
          <HStack space="3" alignItems="center">
            <HStack space="1" alignItems="center">
              <Text fontSize="sm">{post.likes_count}</Text>
              <Icolikealt />
            </HStack>
            <Divider w="1px" h="10px" bg="primary.text" />
            <HStack space="1" alignItems="center">
              <Text fontSize="sm">{post.comments_count}</Text>
              <IcoMessagealt />
            </HStack>
          </HStack>
        </HStack>
        {post.comments.map((comment:Comment) => {
          return <>
                <Box key={comment.id}>
                <HStack space="3" alignItems="center" key={comment.id}>
                    <Avatar
                      borderWidth={1}
                      borderColor="primary.text"
                      size="sm"
                      source={{
                        uri: `${_env.eventcenter_base_url}/assets/attendees/${comment.attendee.image}`
                      }}
                    >
                      SS
                    </Avatar>
                    <VStack space="0" >
                      <Text fontSize="md" fontWeight="600">{post.attendee.full_name} {comment.id}</Text>
                      <Text fontSize="sm" fontWeight="300">{comment.comment}</Text>
                      <Text fontSize="xs">{comment.created_at_formatted}</Text>
                    </VStack>
                </HStack>
                {comment.replies.map((comment:Comment) => {
                  return <HStack space="3" ml="7" alignItems="center" key={"reply-"+comment.id}>
                    <Avatar
                      borderWidth={1}
                      borderColor="primary.text"
                      size="sm"
                      source={{
                        uri: `${_env.eventcenter_base_url}/assets/attendees/${comment.attendee.image}`
                      }}
                    >
                      SS
                    </Avatar>
                    <VStack space="0" >
                      <Text fontSize="md" fontWeight="600">{comment.attendee.full_name} {comment.id}</Text>
                      <Text fontSize="sm" fontWeight="300">{comment.comment}</Text>
                      <Text fontSize="xs">{comment.created_at_formatted}</Text>
                    </VStack>
                  </HStack>
                })}
                </Box>
               
                  
              </>
        })}
      </VStack>
    </Box>
  )

}

export default SquareBox