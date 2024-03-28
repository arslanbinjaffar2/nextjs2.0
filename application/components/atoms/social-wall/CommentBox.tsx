import React, { useState } from 'react'
import { Avatar, Box, Center, Divider, HStack, Icon, IconButton, Pressable, Spacer, Text, VStack } from 'native-base'
import IcoLike from 'application/assets/icons/Icolike'
import { Comment } from 'application/models/socialWall/SocialWall'
import UseLoadingService from 'application/store/services/UseLoadingService';
import UseEnvService from 'application/store/services/UseEnvService';
import UseAuthService from 'application/store/services/UseAuthService';
import useSocialWallService from 'application/store/services/UseSocialWallService'
import AntDesign from '@expo/vector-icons/AntDesign';
import IcoSendMore from 'application/assets/icons/small/IcoSendMore'


type AppProps = {
  comment: Comment,
  secondlevel: boolean,
  hiddenReplies?: number,
  onChildClick: (a: any,b:any) => void,
  toggleHiddenReplies?: (a: number) => void;
}
const CommentBox = ({ comment, secondlevel, hiddenReplies, onChildClick, toggleHiddenReplies }: AppProps) => {
  const { _env } = UseEnvService();
  const { response } = UseAuthService();
  const { processing } = UseLoadingService();
  const { LikeSocialWallComment ,labels } =useSocialWallService();
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
const handleClick = () => {
  onChildClick(true,comment.id)

}
    return (
      <>
      <HStack pb={3} position={'relative'} space="3" px={5} pl={secondlevel ? '55px' : '5'} alignItems="flex-start" key={'m-' + comment.id}>
       {secondlevel && <Divider w={'5'} position={'absolute'} left={'35px'} top={3} bg={'primary.bordercolor'} />}
        
        <Avatar
          borderWidth={1}
          borderColor="primary.text"
          size="sm"
          source={{
            uri: `${_env.eventcenter_base_url}/assets/attendees/${comment.attendee.image}`,
          }}
        >
          { comment.attendee?.first_name && comment.attendee?.last_name ? comment.attendee?.first_name?.substring(0,1) + comment.attendee?.last_name?.substring(0,1) : comment.attendee?.first_name?.substring(0,1)}
        </Avatar>
        <VStack  position={'relative'} zIndex={4} maxW={['calc(100% - 55px)']} space="0">
          <Box  bg="primary.darkbox" mb={2} px="3" py={2} position={'relative'}  rounded="lg">
          <Text key="cmntfn" fontSize="md" fontWeight="600">
            {comment.attendee.full_name}
          </Text>
          <Text key="cmntcn" fontSize="sm" fontWeight="300">
            {comment.comment}
          </Text>
          {likesCount > 0 && <HStack position={'absolute'} right={'-15px'} bottom={'-5px'} space="1" alignItems="center">
            <Center p={1} bg={'white'} shadow={1} rounded={'full'}><Icon as={AntDesign} name="like1" size={'xs'} color={'primary.500'}  /></Center>
            <Text color={'primary.text'} fontSize="xs">{likesCount}</Text>
          </HStack>}
          
          </Box>
          <HStack w={'100%'} space="3" alignItems="center">
          <Text fontSize="sm">
            {comment.created_at_formatted} 
          </Text>
            <Pressable
              p="0"
              borderWidth="0"
              onPress={()=>{
                likeComment(comment.id)
              }}
            
            >
              <Text fontWeight={500}  fontSize={'sm'} color={isLiked ? 'primary.500' : 'primary.text'}>{labels?.SOCIAL_WALL_LIKE}</Text>
            </Pressable>
             
          {!secondlevel &&  <Pressable
              p="0"
              borderWidth="0"
              onPress={handleClick}
            
            >
              <Text fontWeight={500} fontSize={'sm'}>{labels?.SOCIAL_WALL_REPLY}</Text>
            </Pressable>}
          </HStack>
        </VStack>
        
      </HStack>
      {hiddenReplies && hiddenReplies > 0 ?
        <HStack pb={3} position={'relative'} space="3" px={5} pl={secondlevel ? '55px' : '5'} alignItems="center">
          {secondlevel && <Divider w={'5'} position={'absolute'} left={'35px'} top={3} bg={'primary.bordercolor'} />}
            <IcoSendMore />
            <VStack pb={0} position={'relative'} space="0"  justifyContent="flex-start">
              <Pressable onPress={() => {
                toggleHiddenReplies && toggleHiddenReplies(comment.parent_id)
              }}>
                <HStack>
                  <Text fontWeight={500} fontSize={'md'}>
                    View {hiddenReplies} more
                  </Text></HStack>

              </Pressable>
            </VStack>
            </HStack>
      : null}
    {secondlevel && <Divider bg={'primary.bordercolor'} zIndex={2} height={'calc(100% - 56px)'} width={'1px'} position={'absolute'} left={'35px'} top={'32px'} />}
    </>
    )

}

export default CommentBox