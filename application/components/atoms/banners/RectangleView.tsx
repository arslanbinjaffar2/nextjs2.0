import React from 'react'
import { Image } from 'native-base';

const RectangleView = () => {
    return (
        <Image
            source={{
                uri: 'https://wallpaperaccess.com/full/316101.jpg'
            }}
            alt="Alternate Text"
            w="100%"
            h="140px"
            rounded="10"
            mt={3}
        />
    )
}

export default RectangleView