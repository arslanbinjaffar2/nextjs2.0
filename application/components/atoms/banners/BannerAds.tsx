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
     module_id,
   }: {
    module_name: string;
    module_type?: string;
    module_id?: number;
}) => {
  const { _env } = UseEnvService();
  const { event } = UseEventService();
  const [filteredBanners, setFilteredBanners] = useState<Banner[]>([]);
  const [currentBanner, setCurrentBanner] = React.useState(0);
  const { banners, FetchBanners } = UseBannerService();

  useEffect(() => {
    const filtered = banners.filter((banner: Banner) => {
      if (module_name === 'dashboard') {
        var moduleType = banner.module_type.split(',');
        return (
          banner.module_name === module_name &&
          moduleType.includes(module_type ?? '')
        );
      } else {
        var moduleType = banner.module_type.split(',');
        if (module_type !== 'detail' && module_type !== '') {
          return (
            banner.module_name === module_name &&
            moduleType.includes(module_type ?? '')
          );
        } else {
          let id = 0;
          if (banner.agenda_id !== 0) {
            id = banner.agenda_id;
          } else if (banner.sponsor_id !== 0) {
            id = banner.sponsor_id;
          } else if (banner.exhibitor_id !== 0) {
            id = banner.exhibitor_id;
          }
          if (module_type === 'detail' && module_id === id) {
            return (
              banner.module_name === module_name &&
              moduleType.includes(module_type)
            );
          }
        }
      }
    });
    // Further processing with filteredBanner
    console.log('filtered:',filtered)
    setFilteredBanners(filtered)
  }, [banners, module_name, module_type, module_id]);


  useEffect(() => {
    if(banners.length === 0){
      FetchBanners();
    }
  }, []);

  const { push } = useRouter();

  const handleBannerClick = (banner: Banner) => {
    if (module_name === 'dashboard') {
      if (banner.sponsor_id != 0) {
        push(`/${event.url}/sponsors/detail/${banner.sponsor_id}`);
      } else if (banner.exhibitor_id) {
        push(`/${event.url}/exhibitors/detail/${banner.exhibitor_id}`);
      } else if (banner.agenda_id != 0) {
        push(`/${event.url}/agendas/detail/${banner.agenda_id}`);
      }
      else if (banner.other_link_url) {
        window.open(banner.other_link_url, '_blank');
        return;
      }
    }
    let url ;
    if (banner.module_name === 'sponsors') {
      url=`/${event.url}/${banner.module_name}/detail/${banner.sponsor_id}`;
    } else if(banner.module_name === 'exhibitors'){
      url=`/${event.url}/${banner.module_name}/detail/${banner.exhibitor_id}`;
    }else if(banner.module_name === 'agendas'){
      url=`/${event.url}/${banner.module_name}/detail/${banner.agenda_id}`;
    } else if (banner.other_link_url) {
      window.open(banner.other_link_url, '_blank');
      return;
    }
    if (url) {
      push(url);
    }
  };
  useEffect(() => {
    const bannerInterval = setInterval(() => {
      // setCurrentBanner((prevState) => (prevState + 1) % filteredBanners.length);
      setCurrentBanner((prevIndex) => (prevIndex + 1) % filteredBanners.length);
    }, 5000);
    return () => {
      clearInterval(bannerInterval);
    };
  }, [filteredBanners]);
  const currentBannerImage = filteredBanners[currentBanner]?.image;
  return (
    <>
      {filteredBanners.map((banner:Banner,index)=>
       <Box style={{ display: index === currentBanner ? 'block' : 'none', maxWidth: '100%', maxHeight: '100%' }}>
         <TouchableOpacity onPress={() => handleBannerClick(banner)}>
           <View w={'100%'} h={'100%'}>
             <Box width="full" my={5}>
               <RectangleView url={`${_env.eventcenter_base_url}/assets/banners/${banner.image}`} />
             </Box>
           </View>
         </TouchableOpacity>
        </Box>
      )}
    </>
  );
};

export default BannerAds;
