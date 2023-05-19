import React from 'react'
import { Box } from 'native-base';
import RectangleView from 'application/components/atoms/event_info/RectangleView';
import UseInfoService from 'application/store/services/UseInfoService';

const Listing = (props: any) => {

    const { info } = UseInfoService();

    return (
        <>
            <Box mb="3" bg="primary.box" p="0" w="100%" rounded={props.rounded} overflow="hidden">
                {info && info.map((row: any, key: number) =>
                    <RectangleView key={key} {...row} />
                )}
            </Box>
        </>
    )

}

export default Listing