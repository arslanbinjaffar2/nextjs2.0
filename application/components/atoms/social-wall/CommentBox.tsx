import React, { useState } from 'react'
import { Avatar, Box, HStack, IconButton, Text, VStack } from 'native-base'
import IcoLike from 'application/assets/icons/Icolike'
import { Comment } from 'application/models/socialWall/SocialWall'
import UseLoadingService from 'application/store/services/UseLoadingService';
import UseEnvService from 'application/store/services/UseEnvService';
import UseAuthService from 'application/store/services/UseAuthService';
import useSocialWallService from 'application/store/services/UseSocialWallService'


type AppProps = {
  comment: Comment,
}
const CommentBox = ({ comment }: AppProps) => {
  const { _env } = UseEnvService();
  const { response } = UseAuthService();
  const { processing } = UseLoadingService();
  const { LikeSocialWallComment } =useSocialWallService();
  const [isLiked, setIsLiked] = useState<boolean>(
    comment.likes.some(like => like.attendee_id === response?.data?.user?.id)
  );
  const [likesCount, setlikesCount] = useState<number>(
    comment.likes.length
  );

  function likeComment(id:number) {
    setIsLiked(!isLiked);
    setlikesCount(isLiked ? likesCount - 1 : likesCount + 1);
    LikeSocialWallComment({id:id})
  }


    return (
      <HStack space="3" px={5} alignItems="flex-start" key={'m-' + comment.id}>
        <Avatar
          borderWidth={1}
          borderColor="primary.text"
          size="sm"
          source={{
            uri: `${_env.eventcenter_base_url}/assets/attendees/${comment.attendee.image}`,
          }}
        >
          SS
        </Avatar>
        <VStack  space="0">
          <Box  bg="primary.darkbox" mb={2} px="3" py={2}  rounded="lg">
          <Text key="cmntfn" fontSize="md" fontWeight="600">
            {comment.attendee.full_name}
          </Text>
          <Text key="cmntcn" fontSize="sm" fontWeight="300">
            {comment.comment}
          </Text>
          </Box>
          
          <Text key="cmntdt" fontSize="xs">
            {comment.created_at_formatted} {likesCount} likes
          </Text>
          <IconButton
            icon={<IcoLike width="18px" height="18px" />}
            onPress={() => {
              likeComment(comment.id)
            }}
            {...(isLiked ? { variant: 'solid' } : { variant: 'unstyled' })}
          />
        </VStack>
      </HStack>
    )

}

export default CommentBox