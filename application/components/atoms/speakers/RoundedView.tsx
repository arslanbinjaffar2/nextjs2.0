import React from 'react';
import { Box, Image } from 'native-base';

const RoundedView = (props: any) => {
    return (
        <Box w='100%' borderRadius={200} bg="primary.400" pb="100%" position="relative">
            <Image
                position="absolute"
                left="0"
                top="0"
                w="100%"
                h="100%"
                borderRadius={200}
                source={{ uri: props?.speaker?.image }}
                alt={props?.speaker?.text}
            />
        </Box>
    )
}

export default RoundedView;