import React from 'react'
import { Image } from 'native-base';

const RectangleView = ({url}:{url:string}) => {
    return (
        <Image
            source={{
                uri: url ?? 'https://wallpaperaccess.com/full/316101.jpg'
            }}
            alt="Alternate Text"
            w="100%"
            h="100px"
            rounded="10"
            mt={3}
        />
    )
}

export default RectangleView