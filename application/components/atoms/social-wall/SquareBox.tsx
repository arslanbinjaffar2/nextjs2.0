import React, { useState, useEffect, useRef } from 'react'
import { Avatar, Box, HStack, VStack, Text, Image, Spacer, Button, Divider, Center, Menu, Icon, Pressable, Modal, Popover, ScrollView } from 'native-base'
import IcoLike from 'application/assets/icons/Icolike'
import IcoMessage from 'application/assets/icons/IcoMessage'
// import IcoSharePost from 'application/assets/icons/IcoSharePost'
// import IcoMessagealt from 'application/assets/icons/IcoMessagealt'
import Icolikealt from 'application/assets/icons/Icolikealt'
import { Comment, NewComment, Post } from 'application/models/socialWall/SocialWall'
import UseEnvService from 'application/store/services/UseEnvService';
import UseAuthService from 'application/store/services/UseAuthService';
import useSocialWallService from 'application/store/services/UseSocialWallService'
import NewCommentBox from 'application/components/atoms/social-wall/NewCommentBox';
import CommentBox from 'application/components/atoms/social-wall/CommentBox';
import UseEventService from 'application/store/services/UseEventService';
import LoadImage from 'application/components/atoms/LoadImage';
import { useRouter } from 'solito/router';
import Entypo from '@expo/vector-icons/Entypo';
import AntDesign from '@expo/vector-icons/AntDesign';
import { GalleryImage } from 'application/models/gallery/GalleryImage';
import WebLoading from 'application/components/atoms/WebLoading';


type AppProps = {
  post: Post,
  index: number,
}

const SquareBox = ({ post, index }: AppProps) => {

  const { push } = useRouter();
  const { _env } = UseEnvService();
  const { response } = UseAuthService();
  const { event } = UseEventService();
  const { LikeSocialWallPost, labels, SaveSocialWallComment, LikeSocialWallComment, DeleteSocialWallPost } = useSocialWallService();

  const [activepopup, setactivepopup] = React.useState(false);
  const [deleteprocessing, setdeleteprocessing] = React.useState(false);
  const [modalImage, setModalImage] = useState<string>("")

  const [toggleReplay, settoggleReplay] = useState(null)
  const [commnetid, setcommnetid] = useState(null)
  const [hiddenReplies, setHiddenReplies] = useState<{ [commentId: number]: number }>({});
  const [commentsSortBy, setCommentsSortBy] = useState<string>('top');
  const [sortedComments, setSortedComments] = useState<any>([]);
  const [showCommentBox, setShowCommentBox] = useState(false);

  const [isLiked, setIsLiked] = useState<boolean>(
    post.likes.some(like => like.attendee_id === response?.data?.user?.id)
  );
  const [likesCount, setlikesCount] = useState<number>(
    post.likes_count
  );

  function likePost() {
    setIsLiked(!isLiked);
    setlikesCount(isLiked ? likesCount - 1 : likesCount + 1);
    LikeSocialWallPost({ id: post.id })
  }

  function deletePost() {
    setdeleteprocessing(true)
    DeleteSocialWallPost({ id: post.id })
  }

  function saveComment(newComment: NewComment, commentId: number) {
    SaveSocialWallComment({ ...newComment })
    handleToggleReplies(commentId)
  }

  function likeComment(id: number) {
    LikeSocialWallComment({ id: id })
  }

  const handleChildClick = (a: any, b: any) => {
    settoggleReplay(a);
    setcommnetid(b)
    handleToggleReplies(b)
    // You can perform any actions needed with the received data
  };

  useEffect(() => {

    const sortedComments = [...post.comments].sort((a: Comment, b: Comment) => {
      if (commentsSortBy === 'top') {
        const aTotalInteractions = a.likes.length + a.replies.length;
        const bTotalInteractions = b.likes.length + b.replies.length;
        return bTotalInteractions - aTotalInteractions;
      } else {
        console.log(new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      }
    });
    setSortedComments(sortedComments)

    // if (showCommentBox && commentBoxRef.current) {
    //   commentBoxRef.current.focusInput();
    // }

  }, [post.comments, commentsSortBy, showCommentBox]);


  const handleToggleReplies = (commentId: number) => {
    setHiddenReplies((prevState) => {
      const currentSetting = prevState[commentId] ?? 1; // Use nullish coalescing operator
      const totalReplies = post.comments.find((comment) => comment.id === commentId)?.replies.length ?? 0;

      return {
        ...prevState,
        [commentId]: currentSetting === 1 ? totalReplies : 1,
      };
    });
  };



  const handleCommentsSortBy = (sortBy: string) => {
    setCommentsSortBy(sortBy);
  };

  const commentBoxRef = useRef<{ focusInput: () => void }>(null);

  const handleSomeAction = () => {
    setShowCommentBox(current => {
      if (!current) {
        // When showing the comment box, focus the input.
        setTimeout(() => commentBoxRef.current?.focusInput(), 0);
      }
      return !current;
    });
  };

  return (
    <>
       {deleteprocessing && <Box mb={3}><WebLoading /></Box>}
      {!deleteprocessing && <Box mb="3" w="100%" py={3} bg={'primary.box'} roundedTop={index === 0 ? 0 : 10} roundedBottom={10} borderWidth="0" borderColor="primary.box">
      <VStack space="3">


        {/* button to delete post */}
        <HStack space="1" alignItems="center">
          <Center>
            <HStack space="3" px={4} alignItems="center" key="rd90">
              <Avatar
                borderWidth={1}
                borderColor="primary.bordercolor"
                size="md"
                source={{
                  uri: `${_env.eventcenter_base_url}/assets/attendees/${post.attendee.image}`
                }}
              >
                { post.attendee?.first_name && post.attendee?.last_name ? post.attendee?.first_name?.substring(0,1) + post.attendee?.last_name?.substring(0,1) : post.attendee?.first_name?.substring(0,1)}
              </Avatar>
              <VStack space="0" >
                <Text fontSize="lg" key="full_name_att" fontWeight="600">{post.attendee.full_name}</Text>
                <Text fontSize="sm" key="time_attendee_post">{post.created_at_formatted}</Text>
              </VStack>
            </HStack>
          </Center>
          <Spacer />
          <Center>
            {post.attendee.id === response?.data?.user?.id && (
              <HStack px={3} w={'100%'} justifyContent={'flex-end'} space="3" alignItems="center">
                <Menu
                  placement="bottom right"
                  bg="primary.boxsolid"
                  borderWidth={0}
                  borderColor="#707070"
                  shouldFlip={true}
                  w={180}
                  crossOffset={0}
                  trigger={(triggerProps) => {
                    return <Button w={'30px'} bg={'transparent'} _focus={{ bg: '' }} _hover={{ bg: '' }} height={'30px'} rounded={'full'} p={0} {...triggerProps} ><Icon color={'primary.text'} as={Entypo} name="dots-three-horizontal" />
                    </Button>
                  }}

                >
                  <Menu.Item _focus={{ bg: '' }} _hover={{ bg: 'primary.500' }} onPress={() => { push(`/${event.url}/social_wall/edit/${post.id}`) }}>{event?.labels?.GENERAL_EDIT}</Menu.Item>
                  <Menu.Item _focus={{ bg: '' }} _hover={{ bg: 'primary.500' }} onPress={() => { deletePost() }}>{event?.labels?.GENERAL_DELETE}</Menu.Item>
                </Menu>
              </HStack>

            )}

          </Center>

        </HStack>


        <Text px={4} key="p-content" fontSize="md">{post.content}</Text>
        {(post.type === 'image' || post.type === 'text') && post.image !== '' && (
          <Pressable
            p="0"
            borderWidth="0"
            onPress={() => {
              setactivepopup(true);
              setModalImage(post.image)
            }}
          >
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

              <Modal
                size={'full'}
                isOpen={activepopup}
                onClose={() => { }}
              >
                <Modal.Content maxW={['350px', '780px']} >
                  <Modal.Body p={0} justifyContent="flex-end">
                    <Modal.CloseButton borderWidth={1} borderColor={'white'} rounded={'50%'} zIndex={999} onPress={() => { setactivepopup(false); setModalImage('') }} />
                    <LoadImage width={'100%'} path={`${_env.eventcenter_base_url}/assets/social_wall/${modalImage}`} alt={''} />
                  </Modal.Body>
                </Modal.Content>
              </Modal>
            </Center>
          </Pressable>
        )}

        {post.type === 'video' && post.image !== '' && (
          <Center w={'100%'} px={4}>
            <video
              width="100%"
              height="295px"
              controls
              src={`${_env.eventcenter_base_url}/assets/social_wall/${post.image}`}
            />
          </Center>
        )}
        <HStack space="1" w={'100%'} px={4}>
          <HStack space="1" alignItems="center">

            <Text fontSize="sm"></Text>
            <Popover
              placement='bottom left'
              trigger={(triggerProps) => {
                return <Button p={0} variant={'unstyled'} bg={'transparent'} _hover={{ bg: 'transparent' }} leftIcon={<Icolikealt />} {...triggerProps} >{likesCount}</Button>
              }}

            >
              <Popover.Content shadow={3} p={0} borderWidth={0}  minW={220} maxW={260} bg={'primary.boxsolid'}>
                <Popover.Body bg={'primary.boxsolid'} borderTopWidth="0" p={0} rounded={6}>
                  <Box bg={'primary.boxsolid'} py={3} borderWidth="0" borderColor="primary.box">
                    <HStack width={'100%'} px={3} mb={2} space="1" alignItems="center">
                    {post.likes.length > 0 ? (
                        <>
                        <Icolikealt width={20} height={20} />
                        <Text fontSize="md" fontWeight={500}>{labels?.SOCIAL_WALL_LIKES}</Text>
                        </>
                      ) : (
                        <Text fontSize="md" fontWeight={500}>{labels?.SOCIAL_WALL_NO_LIKES_FOR_POST}</Text>
                      )}
                    </HStack>


                    <ScrollView maxHeight={200}>
                      {post.likes.map((like) => (
                        <>
                          <Divider  my={3} bg={'primary.bordercolor'} />
                          <HStack key={like.id} alignItems="center" px={3}>
                            <Avatar
                              borderWidth={1}
                              borderColor="primary.boxsolidtext"
                              size="sm"
                              source={{
                                uri: `${_env.eventcenter_base_url}/assets/attendees/${like.attendee.image}`,
                              }}
                            >
                              {like.attendee?.first_name && like.attendee?.last_name ? like.attendee?.first_name?.substring(0,1) + like.attendee?.last_name?.substring(0,1) : like.attendee?.first_name?.substring(0,1)}
                            </Avatar>
                            <Text color={'primary.boxsolidtext'} fontSize="md" ml={3}>{like.attendee.full_name}</Text>
                          </HStack>
                        </>
                      ))}
                    </ScrollView>
                  </Box>
                </Popover.Body>
              </Popover.Content>
            </Popover>
          </HStack>
          <Spacer />
          <HStack space="3" alignItems="center" key="commentbtn">
            <HStack space="1" alignItems="center">
              <Text fontSize="sm">{post.comments_count} {labels?.SOCIAL_WALL_COMMENT}</Text>
            </HStack>
            {/* <HStack space="1" alignItems="center">
              <Text fontSize="sm">{post.comments_count} Shares</Text>
            </HStack> */}
          </HStack>
        </HStack>

        <HStack key="rd99" px="3" space="0" alignItems="center">
          <HStack py={3} borderBottomWidth="1" w={'100%'} flexWrap={'wrap'} borderTopWidth="1" borderColor="primary.bordercolor" space="2" alignItems="center" key="likebtn">
            <Center alignItems={'flex-start'}>
              <Button
                colorScheme="unstyled"
                bg={'transparent'}
                px={1}
                py={0}
                _hover={{ bg: 'transparent' }}
                leftIcon={<Icon position={'relative'} top={'-2px'} as={AntDesign} name={isLiked ? 'like1' : 'like2'} color={isLiked ? 'secondary.500' : 'primary.text'} />}
                onPress={() => {
                  likePost()
                }}
              >
                <Text color={isLiked ? 'secondary.500' : 'primary.text'}>{labels?.SOCIAL_WALL_LIKE}</Text>

              </Button>
            </Center>
            <Spacer />
            <Center  alignItems={'flex-center'}>
              <Button
                colorScheme="unstyled"
                bg={'transparent'}
                _hover={{ bg: 'transparent' }}
                px={1}
                py={0}
                leftIcon={<IcoMessage width="18px" height="18px" />}
                onPress={handleSomeAction}

              >
                {labels?.SOCIAL_WALL_COMMENTS}
              </Button>
            </Center>
            {/* <Center flex={1} alignItems={'flex-end'}>
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
            </Center> */}
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
        {showCommentBox &&
          <>
            {sortedComments.length > 0 &&
              <HStack px={3} py={1} roundedTop={'10px'} w={'100%'}>
                <Box ml={'auto'}>
                  <Menu
                    placement="bottom right"
                    bg="primary.boxsolid"
                    borderWidth={0}
                    borderColor="#707070"
                    shouldFlip={true}
                    w={180}
                    crossOffset={0}
                    trigger={triggerProps => {
                      return (
                        <Pressable accessibilityLabel="More options menu" {...triggerProps}>
                          <HStack space="2" alignItems="center">
                            <Text fontSize="md">
                              {commentsSortBy === 'top' ? labels?.SOCIAL_WALL_TOP_COMMENTS : commentsSortBy === 'newest' ? labels?.SOCIAL_WALL_NEWEST : labels?.SOCIAL_WALL_MOST_LIKED_COMMNETS}
                            </Text>
                            <Icon as={AntDesign} name="caretdown" color={'primary.text'} />
                          </HStack>
                        </Pressable>
                      );
                    }}
                  >
                    <Menu.Item _text={{color: 'primary.boxsolidtext'}}  _focus={{ bg: '' }} _hover={{ bg: 'primary.500' }} textValue="id" onPress={() => handleCommentsSortBy('top')}>
                      {labels?.SOCIAL_WALL_TOP_COMMENTS}
                    </Menu.Item>
                    <Menu.Item
                      _text={{color: 'primary.boxsolidtext'}} 
                      _focus={{ bg: '' }}
                      _hover={{ bg: 'primary.500' }}
                      textValue="comments_newest"
                      onPress={() => handleCommentsSortBy('newest')}
                    >
                      {labels?.SOCIAL_WALL_NEWEST}
                    </Menu.Item>
                  </Menu>
                </Box>
              </HStack>
            }

            <VStack overflowY={'auto'} maxHeight={'250px'}>
              {sortedComments.map((comment: Comment) => {
                const totalReplies: number = comment.replies.length ? comment.replies.length : 0;
                const visibleReplies = toggleReplay && commnetid === comment.id ? comment.replies.length : (hiddenReplies[comment.id] ?? 1);
                
                const remainingReplies = totalReplies - visibleReplies;

                return <React.Fragment key={comment.id}>
                  <Box overflow={'hidden'} w={'100%'}>
                    <CommentBox onChildClick={handleChildClick} secondlevel={false} comment={comment} key={comment.id} />
                    {comment.replies.slice(0, visibleReplies).map((reply: Comment) => (
                      <CommentBox onChildClick={handleChildClick} secondlevel={true} comment={reply} key={reply.id} hiddenReplies={remainingReplies} toggleHiddenReplies={() => handleToggleReplies(comment.id)} />
                    ))}
                    {toggleReplay && commnetid === comment.id && <Divider bg={'primary.bordercolor'} zIndex={2} height={'calc(100% - 64px)'} width={'1px'} position={'absolute'} left={'35px'} top={'32px'} />}
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
                          { response?.data?.user?.first_name && response?.data?.user?.last_name ? response?.data?.user?.first_name?.substring(0,1) + response?.data?.user?.last_name?.substring(0,1) : response?.data?.user?.first_name?.substring(0,1)}
                        </Avatar>
                      </Center>
                      <Center w={'calc(100% - 45px)'}>
                        <NewCommentBox post_id={post.id} parent_id={comment.id} saveComment={saveComment} labels={labels} />
                      </Center>

                    </HStack>}
                  </Box>

                </React.Fragment>
              })}
            </VStack>

            <HStack w={'100%'} pt={0} px={4} py={3} borderTopWidth={0} borderTopColor={'primary.bordercolor'} space="3" >
              <Center>
                <Avatar
                  borderWidth={1}
                  borderColor="primary.text"
                  size="md"
                  source={{
                    uri: `${_env.eventcenter_base_url}/assets/attendees/${response?.data?.user?.image}`
                  }}
                >
                  { response?.data?.user?.first_name && response?.data?.user?.last_name ? response?.data?.user?.first_name?.substring(0,1) + response?.data?.user?.last_name?.substring(0,1) : response?.data?.user?.first_name?.substring(0,1)}
                </Avatar>
              </Center>
              {/* <Text fontSize="md" fontWeight="600">{response?.data?.user?.first_name} {response?.data?.user?.last_name}</Text> */}
              {/* add a input with button */}
              <Center w={'calc(100% - 60px)'}>
                <NewCommentBox post_id={post.id} parent_id={0} saveComment={saveComment} labels={labels} ref={commentBoxRef} />
              </Center>

            </HStack>
          </>}
      </VStack>
    </Box>}
    </>
  )

}

export default SquareBox