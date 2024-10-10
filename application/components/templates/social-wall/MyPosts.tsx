import React from 'react'
import PostListing from 'application/components/atoms/social-wall/PostListing';
import { Avatar, Box, HStack, Text, } from 'native-base';
import UseAuthService from 'application/store/services/UseAuthService';
import UseEnvService from 'application/store/services/UseEnvService';
import AddPost from 'application/components/atoms/social-wall/AddPost';



const MyPosts = () => {
  const { _env } = UseEnvService();
  const { response } = UseAuthService();
    return (
        <>
          <Box mb="3" borderWidth="0" borderColor="primary.bdBox" w="100%" bg="primary.box" p="4" rounded="10px" overflow="hidden">
            <HStack space="3" alignItems="center" key="rd90">
               {response?.data?.user?.image && (
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
               )}
              
              <Box>
                <Text fontSize="lg" key="full_name_att" fontWeight="600">{response?.data?.user?.first_name} {response?.data?.user?.last_name}</Text>
                <Text fontSize="sm" key="time_attendee_post">{response?.data?.user?.email}</Text>
              </Box>
            </HStack>
          </Box>
          <AddPost />
          <PostListing attendee_id={response?.data?.user?.id} />
        </>
    )

}

export default MyPosts