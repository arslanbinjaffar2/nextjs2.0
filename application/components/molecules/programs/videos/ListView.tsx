/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React from 'react'
import { HStack } from 'native-base'
import { ScrollView } from 'react-native-gesture-handler';
import BoxView from 'application/components/atoms/programs/videos/BoxView';

const ListView = () => {

    const videos = [
        {
            image: 'https://wallpaperaccess.com/full/317501.jpg',
            text: 'Video 1',
        },
        {
            image: 'https://wallpaperaccess.com/full/317501.jpg',
            text: 'Video 1',
        },
        {
            image: 'https://wallpaperaccess.com/full/317501.jpg',
            text: 'Video 1',
        },
        {
            image: 'https://wallpaperaccess.com/full/317501.jpg',
            text: 'Video 1',
        },
        {
            image: 'https://wallpaperaccess.com/full/317501.jpg',
            text: 'Video 1',
        },
        {
            image: 'https://wallpaperaccess.com/full/317501.jpg',
            text: 'Video 1',
        }
    ];

    return (
        <ScrollView horizontal={true} style={{
            marginHorizontal: 20
        }}>
            <HStack space="3">
                {videos.map((video: any, key: any) =>
                    <BoxView key={key} video={video} />
                )}
            </HStack>
        </ScrollView>
    )
}

export default ListView
