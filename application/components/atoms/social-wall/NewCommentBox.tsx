import React from 'react'
import { HStack, Button, Text, Input, Icon, Pressable } from 'native-base'
import { NewComment } from 'application/models/socialWall/SocialWall'
import Ionicons from '@expo/vector-icons/Ionicons';


type AppProps = {
  post_id: number,
  parent_id: number,
  saveComment: Function,
}
const NewCommentBox = ({ post_id,parent_id,saveComment }: AppProps) => {

    const [commentData, setCommentData] = React.useState<NewComment>({
        post_id: post_id,
        parent_id: parent_id,
        comment: '',
    });
    
    const inputCommentRef = React.useRef<HTMLInputElement | null>(null);
    function postComment() {
      if(commentData.comment === ''){
        return false;
      }
      saveComment(commentData);
      if(inputCommentRef.current){
        inputCommentRef.current.value = '';
      }
    }


    return (
        <HStack w={'100%'} space="2" alignItems="center">
              <Input
                w={'100%'}
                onChange={(e) => {
                  setCommentData({
                        ...commentData,
                        comment: e.nativeEvent.text,
                    });
                }}
                rightElement={<Pressable onPress={() => postComment()}><Icon mr={2} as={Ionicons} name='send' color={'primary.text'} /></Pressable>}
                  onKeyPress={(a:any) => {
                    if (a.key === 'Enter') {
                      postComment();
                    }
                  }}
                ref={inputCommentRef}
                placeholder={parent_id === 0 ? 'Add New comment' : 'Reply to this comment'}
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

export default NewCommentBox