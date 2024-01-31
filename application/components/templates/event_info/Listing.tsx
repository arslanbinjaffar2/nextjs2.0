import React from 'react'
import { Box, Text } from 'native-base';
import RectangleView from 'application/components/atoms/event_info/RectangleView';
import UseInfoService from 'application/store/services/UseInfoService';
import { Info } from 'application/models/Info';
import UseEventService from 'application/store/services/UseEventService';

const Listing = (props: any) => {
    
    const { event  } = UseEventService();

    const { info } = UseInfoService();

    const [filteredInfo, setFilteredInfo] = React.useState<Info[]>([]);

    const filteredData = React.useMemo(() => {
        if(info == null) return [];
        var infos=info
        var filteredInfos = infos.filter((i) => {
            if (i?.type === "page" || (i?.type === "folder" && (i?.subItems.length > 0 || i?.subMenuItems.length > 0))) {
                return true;
            }
        });
        if(props.searchText == '' || props.searchText == undefined) return filteredInfos;
        return filteredInfos.filter((i) => i?.detail?.name?.toLowerCase().includes(props.searchText.toLowerCase()));
    }, [info, props.searchText]);

    React.useEffect(() => {
        setFilteredInfo(filteredData);
    }, [props.searchText,info])
    

    return (
        <>
            <Box mb="3" bg="primary.box" p="0" w="100%" rounded={props.rounded} overflow="hidden">
                {/* {((info && props?.searchText == '') || (info && props?.searchText == undefined) ) && (info.length > 0  ? info.map((row: any, key: number) =>
                    <RectangleView key={key} {...row} cms={props.cms} />
                ): <Box padding={5}>
                <Text>{event?.labels?.EVENT_NORECORD_FOUND}</Text>
            </Box> )} */}
                {(filteredInfo.length > 0 ? filteredInfo.map((row: any, key: number) =>
                    <RectangleView key={key} {...row} cms={props.cms} />
                ) : <Box padding={5}>
                <Text>{event?.labels?.EVENT_NORECORD_FOUND}</Text>
            </Box>)}
            </Box>
        </>
    )

}

export default Listing