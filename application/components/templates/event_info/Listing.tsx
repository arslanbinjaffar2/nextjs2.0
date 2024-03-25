import React from 'react'
import { Box, Text } from 'native-base';
import RectangleView from 'application/components/atoms/event_info/RectangleView';
import UseInfoService from 'application/store/services/UseInfoService';
import { Info } from 'application/models/Info';
import UseEventService from 'application/store/services/UseEventService';
import BannerAds from 'application/components/atoms/banners/BannerAds'

const Listing = (props: any) => {
    
    const { event  } = UseEventService();

    const { info } = UseInfoService();
    console.log("🚀 ~ Listing ~ info:", info)

    const [filteredInfo, setFilteredInfo] = React.useState<Info[]>([]);

    const filteredData = React.useMemo(() => {
        if(info == null) return [];
        var infos=info
        var filteredInfos = infos.filter((i) => {
            if (i?.type === "page" || i?.type === "link" || (i?.type === "folder" && ((i?.subItems && i.subItems.length > 0) || (i?.subMenuItems && i.subMenuItems.length > 0)))) {
                return true;
            }
        });
        if(props.searchText == '' || props.searchText == undefined) return filteredInfos;
        return filteredInfos.filter((i) => i?.detail?.name?.toLowerCase().includes(props.searchText.toLowerCase()));
    }, [info, props.searchText]);

    React.useEffect(() => {
        setFilteredInfo(filteredData);
    }, [props.searchText,info])
     
    
    const checkInfo=info?info:[]
    return (
        <>
            <Box mb="3" bg={`${checkInfo.length > 0 ? "primary.box" : ""}`} p="0" w="100%" rounded={props.rounded} overflow="hidden">
                {(filteredInfo.length > 0 ? filteredInfo.map((row: any, key: number) =>
                    <RectangleView index={key} key={key} {...row} cms={props.cms} />
                ) : <Box padding={5} bg={"primary.500"}>
                    <Text>{event?.labels?.GENERAL_NO_RECORD}</Text>
                </Box>)}
            </Box>
            <Box width={"100%"} height={"5%"}>
                <BannerAds module_name={'information_pages'} module_type={'listing'} />
            </Box>
        </>
    )

}

export default Listing