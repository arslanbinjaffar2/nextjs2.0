import React from 'react'
import { Image } from 'native-base';
import { useWindowDimensions } from 'react-native';

const RectangleView = ({url}:{url:string}) => {
    const { width } = useWindowDimensions();
    return (
        <Image
            source={{
                uri: url ?? 'https://wallpaperaccess.com/full/316101.jpg'
            }}
            alt=""
            resizeMode="cover"
            w="100%"
            h={[(width - 30) * 0.24, 600 * 0.24]}
            rounded="10"
        />
    )
}

export default RectangleView