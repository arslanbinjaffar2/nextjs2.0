import React, { useEffect, useState } from 'react'
import { Box, View } from 'native-base'
import { Banner } from 'application/models/Banner'
import UseEnvService from 'application/store/services/UseEnvService'
import UseBannerService from 'application/store/services/UseBannerService'
import { Platform, TouchableOpacity } from 'react-native'
import { useRouter } from 'solito/router'
import UseEventService from '../../../store/services/UseEventService'
import RectangleView from 'application/components/atoms/banners/RectangleView'
const BannerAds = ({
     module_name,
     module_type,
     banner_position,
     module_id,
   }: {
    module_name: string;
    module_type?: string;
    banner_position?: string;
    module_id?: number;
}) => {
  const { _env } = UseEnvService();
  const { event } = UseEventService();
  const [filteredBanners, setFilteredBanners] = useState<Banner[]>([]);
  const [currentBanner, setCurrentBanner] = React.useState(0);
  const { banners, FetchBanners } = UseBannerService();

  useEffect(() => {
    const filteredBanner = banners.filter((banner: Banner) => {
      if (module_name === 'dashboard') {
        return (
          banner.module_name === module_name &&
          banner.banner_position === banner_position
        );
      } else {
        if (module_type != 'detail' && module_type) {
          return (
            banner.module_name === module_name &&
            banner.module_type === module_type
          );
        }
        if(module_type == 'detail' && module_id == banner.agenda_id ){
          return (
            banner.module_name === module_name &&
            banner.module_type === module_type
          );
        }
        if(module_type == 'detail' && module_id == banner.sponsor_id ){
          return (
            banner.module_name === module_name &&
            banner.module_type === module_type
          );
        }
        if(module_type == 'detail' && module_id == banner.exhibitor_id ){
          return (
            banner.module_name === module_name &&
            banner.module_type === module_type
          );
        }
      }
    });
    setFilteredBanners(filteredBanner);
  }, [banners]);

  useEffect(() => {
    FetchBanners();
  }, []);

  const { push } = useRouter();

  const handleBannerClick = (banner: Banner) => {
    if (module_name === 'dashboard') {
      if (banner.sponsor_id) {
        push(`/${event.url}/sponsors/detail/${banner.sponsor_id}`);
      } else if (banner.exhibitor_id) {
        push(`/${event.url}/exhibitors/detail/${banner.exhibitor_id}`);
      } else if (banner.agenda_id) {
        push(`/${event.url}/agendas/detail/${banner.agenda_id}`);
      }
    }
    if (banner.module_name === 'sponsors') {
      push(`/${event.url}/${banner.module_name}/detail/${banner.sponsor_id}`);
    } else if(banner.module_name === 'exhibitors'){
      push(`/${event.url}/${banner.module_name}/detail/${banner.exhibitor_id}`);
    }else if(banner.module_name === 'agendas'){
      push(`/${event.url}/${banner.module_name}/detail/${banner.agenda_id}`);
    } else if (banner.other_link_url) {
      push(`/${event.url}/${banner.other_link_url}`);
    }
  };
  useEffect(() => {
    const bannerInterval = setInterval(() => {
      setCurrentBanner((prevBanner) => (prevBanner + 1) % filteredBanners.length);
    }, 5000);
    return () => {
      clearInterval(bannerInterval);
    };
  }, [filteredBanners]);
  const currentBannerImage = filteredBanners[currentBanner]?.image;
  return (
    <>
      {currentBannerImage && (
        <TouchableOpacity onPress={() => handleBannerClick(filteredBanners[currentBanner])}>
          <View style={{ width: '100%', height: '100%' }}>
            <Box width="full" my={5}>
              <RectangleView url={`${_env.eventcenter_base_url}/assets/banners/${currentBannerImage}`} />
            </Box>
          </View>
        </TouchableOpacity>
      )}
    </>
  );
};

export default BannerAds;
