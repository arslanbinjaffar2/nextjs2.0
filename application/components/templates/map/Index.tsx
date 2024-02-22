import React, { useEffect } from 'react'
import { Box, Container, HStack, Image, Text} from 'native-base';
import UseMapService from 'application/store/services/UseMapService';
import SectionLoading from 'application/components/atoms/SectionLoading';
import UseLoadingService from 'application/store/services/UseLoadingService';
import UseEventService from 'application/store/services/UseEventService';
import UseEnvService from 'application/store/services/UseEnvService';
import LoadImage from 'application/components/atoms/LoadImage';
import { Banner } from 'application/models/Banner'
import UseBannerService from 'application/store/services/UseBannerService'

const Index = () => {
    const { loading } = UseLoadingService();
    const { event  } = UseEventService();
    const { _env } = UseEnvService();
    const { banners, FetchBanners} = UseBannerService();

    const { map, FetchMap} = UseMapService()
    React.useEffect(()=>{
            FetchMap();
    },[])
  const [filteredBanners, setFilteredBanners] = React.useState<Banner[]>([]);
  useEffect(()=>{
    const filteredBanner=banners.filter((banner  : Banner)=>{
      return banner.module_name == 'maps' && banner.module_type == 'listing'
    })

    setFilteredBanners(filteredBanner);
  },[banners]);
  React.useEffect(() => {
    FetchBanners();
  }, []);
  return (
    <>
        {loading ? 
            <SectionLoading/>
        :
            <Container pt="2" maxW="100%" w="100%">
                <HStack mb="3" pt="2" w="100%" space="3" alignItems="center">
                <Text textTransform="uppercase" fontSize="2xl">{event?.labels?.EVENTSITE_MAP}</Text>
                </HStack>
                {map && map?.url && map?.url !== '' && <Box mb="3" w="100%" overflow="hidden" bg="primary.box" p="0" rounded="10">
                    <iframe 
                    style={{border: 'none'}}
                     src={map?.url ? map?.url : "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2250.0526149119282!2d12.540472516030071!3d55.67068520578965!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x465253991407ea6b%3A0xb98bf0442b09ac6d!2sEventbuizz!5e0!3m2!1sen!2s!4v1662112095755!5m2!1sen!2s" }
                     width="100%" 
                     height="450" 
                     allowFullScreen 
                     loading="lazy" 
                     referrerPolicy="no-referrer-when-downgrade" 
                     />
                </Box>}
                {(map &&  map?.image && map?.image !== '' && (map?.url === undefined || map?.url === '')) && 
                    <Box width={'100%'}>
                        <LoadImage
                            path={`${map?.image}`}
                            alt="Alternate Text"
                            width="100%"
                            height="auto"
                            rounded="10"
                        />
                    </Box>
                }
                {!map && <Box overflow="hidden" bg="primary.box" w="100%" rounded="lg" p={5}>
                    <Text>{event.labels?.EVENT_NORECORD_FOUND}</Text>
                </Box>}
            </Container>
        }
      <Box width={"100%"} height={"5%"}>
        {filteredBanners.map((banner, k) =>
          <Image
            key={k}
            source={{ uri: `${_env.eventcenter_base_url}/assets/banners/${banner.image}` }}
            alt="Image"
            width="100%"
            height="100%"
          />
        )}
      </Box>
    </>
    
  )
}

export default Index