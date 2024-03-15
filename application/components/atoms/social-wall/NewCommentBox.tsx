import React, { useImperativeHandle, RefObject } from 'react'
import { HStack, Button, Text, Input, Icon, Pressable } from 'native-base'
import { NewComment } from 'application/models/socialWall/SocialWall'
import Ionicons from '@expo/vector-icons/Ionicons';


type AppProps = {
  post_id: number,
  parent_id: number,
  saveComment: Function,
  labels?: { SOCIAL_WALL_WRITE_A_REPLY: string };
}

interface NewCommentBoxHandles {
  focusInput: () => void;
}


const NewCommentBox = ({ post_id, parent_id, saveComment, labels }: AppProps, ref: RefObject<NewCommentBoxHandles>) => {

  const [commentData, setCommentData] = React.useState<NewComment>({
    post_id: post_id,
    parent_id: parent_id,
    comment: '',
  });

  const inputCommentRef = React.useRef<HTMLInputElement | null>(null);

  useImperativeHandle(ref, () => ({
    focusInput: () => {
      inputCommentRef.current?.focus();
    },
  }));

  function postComment() {
    if (commentData.comment === '') {
      return false;
    }
    saveComment(commentData, parent_id);
    if (inputCommentRef.current) {
      inputCommentRef.current.value = '';
    }
  }

  return (
    <HStack w={'100%'} space="2" alignItems="center">
      <Input
        borderWidth={0}
        w={'100%'}
        onChange={(e) => {
          setCommentData({
            ...commentData,
            comment: e.nativeEvent.text,
          });
        }}
        rightElement={<Pressable onPress={() => postComment()}><Icon mr={2} as={Ionicons} name='send' color={'primary.text'} /></Pressable>}
        onKeyPress={(a: any) => {
          if (a.key === 'Enter') {
            postComment();
          }
        }}
        ref={inputCommentRef}
        placeholder={parent_id === 0 ? 'Add New comment' : labels?.SOCIAL_WALL_WRITE_A_REPLY}
      />
      {/* <Button
                variant="unstyled"
                onPress={() => {
                  postComment();
                }}
              >
                <Text fontSize="sm" color="primary.text">Send</Text>
              </Button> */}
    </HStack>
  )

}

export default React.forwardRef(NewCommentBox);