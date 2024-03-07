import React from 'react'
import { Image } from 'native-base';

const RectangleView = ({url}:{url:string}) => {
    return (
        <Image
            source={{
                uri: url ?? 'https://wallpaperaccess.com/full/316101.jpg'
            }}
            alt=""
            resizeMode="cover"
            w="100%"
            h={["100px","144px"]}
            rounded="10"
        />
    )
}

export default RectangleView