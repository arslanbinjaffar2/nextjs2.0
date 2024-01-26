import React from 'react'
import { HStack, Button, Text, Input } from 'native-base'
import { NewComment } from 'application/models/socialWall/SocialWall'


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
        <HStack space="2" alignItems="center">
              <Input
                onChange={(e) => {
                  setCommentData({
                        ...commentData,
                        comment: e.nativeEvent.text,
                    });
                }}
                ref={inputCommentRef}
                placeholder={parent_id === 0 ? 'Add New comment' : 'Reply to this comment'}
              />
              <Button
                variant="unstyled"
                onPress={() => {
                  postComment();
                }}
              >
                <Text fontSize="sm" color="primary.text">Send</Text>
              </Button>
        </HStack>
    )

}

export default NewCommentBox