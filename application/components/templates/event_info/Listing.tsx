import React from 'react'
import { Box } from 'native-base';
import RectangleView from 'application/components/atoms/event_info/RectangleView';
import UseInfoService from 'application/store/services/UseInfoService';
import { Info } from 'application/models/Info';

const Listing = (props: any) => {

    const { info } = UseInfoService();
    return (
        <>
            <Box mb="3" bg="primary.box" p="0" w="100%" rounded={props.rounded} overflow="hidden">
                {((info && props?.searchText == '') || (info && props?.searchText == undefined) )&& info.map((row: any, key: number) =>
                    <RectangleView key={key} {...row} cms={props.cms} />
                )}
                {(info && props?.searchText !== '') && info.filter((i)=>(i?.detail?.name?.toLowerCase().includes(props.searchText.toLowerCase()))).map((row: any, key: number) =>
                    <RectangleView key={key} {...row} cms={props.cms} />
                )}
            </Box>
        </>
    )

}

export default Listing