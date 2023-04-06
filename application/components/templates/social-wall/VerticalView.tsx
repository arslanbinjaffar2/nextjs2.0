import React from 'react'
import { Box } from 'native-base'
import SquareBox from 'application/components/atoms/social-wall/SquareBox';
import AddPost from 'application/components/atoms/social-wall/AddPost';

const VerticalView = () => {

    return (
        <>
            <AddPost />
            <Box w="100%">
                <SquareBox />
                <SquareBox />
                <SquareBox />
            </Box>
        </>
    )

}

export default VerticalView