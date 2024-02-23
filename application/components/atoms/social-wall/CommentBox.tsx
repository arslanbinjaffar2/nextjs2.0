import React, { useState } from 'react'
import { Avatar, Box, Center, Divider, HStack, Icon, IconButton, Pressable, Spacer, Text, VStack } from 'native-base'
import IcoLike from 'application/assets/icons/Icolike'
import { Comment } from 'application/models/socialWall/SocialWall'
import UseLoadingService from 'application/store/services/UseLoadingService';
import UseEnvService from 'application/store/services/UseEnvService';
import UseAuthService from 'application/store/services/UseAuthService';
import useSocialWallService from 'application/store/services/UseSocialWallService'
import AntDesign from '@expo/vector-icons/AntDesign';


type AppProps = {
  comment: Comment,
  secondlevel: boolean,
  onChildClick: (a: any,b:any) => void
}
const CommentBox = ({ comment, secondlevel,onChildClick }: AppProps) => {
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
          SS
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
              <Text fontSize={'sm'} color={isLiked ? 'primary.500' : 'primary.text'}>Like</Text>
            </Pressable>
             
          {!secondlevel &&  <Pressable
              p="0"
              borderWidth="0"
              onPress={handleClick}
            
            >
              <Text fontWeight={500} fontSize={'sm'}>Reply</Text>
            </Pressable>}
          </HStack>
        </VStack>
        
      </HStack>
    {secondlevel && <Divider bg={'primary.bordercolor'} zIndex={2} height={'calc(100% - 65px)'} width={'1px'} position={'absolute'} left={'35px'} top={'32px'} />}
    </>
    )

}

export default CommentBox