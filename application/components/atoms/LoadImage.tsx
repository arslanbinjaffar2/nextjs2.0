import React from 'react';
import { Image } from 'native-base';
import { Platform } from 'react-native';

const LoadImage = (props: any) => {
    return (
        Platform.OS === 'web' ? (
            <img src={props.path} width={props.w} height={props.h} />
        ) : (
            <Image
                source={{
                    uri: props.path
                }}
                alt={props?.title || ''}
                w={props.w}
                h={props.h}
            />
        )
    )
}

export default LoadImage