/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React from 'react'
import { View } from 'native-base'
import ListView from 'application/components/molecules/programs/videos/ListView';
import StreamBlock from 'application/components/atoms/programs/videos/StreamBlock';

const Stream = () => {
    return (
        <View mb="3" w="100%">
            <StreamBlock />
            <ListView />
        </View>
    )
}

export default Stream
