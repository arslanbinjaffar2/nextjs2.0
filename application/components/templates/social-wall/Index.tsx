import React from 'react'
import AddPost from 'application/components/atoms/social-wall/AddPost';
import PostListing from 'application/components/atoms/social-wall/PostListing';

const Index = () => {

    return (
        <>
          <AddPost />
          <PostListing attendee_id={0} />
        </>
    )

}

export default Index