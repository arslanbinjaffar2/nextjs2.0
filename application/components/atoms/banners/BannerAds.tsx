import React, { useEffect, useState } from 'react'
import { Image, View } from 'native-base'
import { Banner } from 'application/models/Banner'
import UseEnvService from 'application/store/services/UseEnvService'
import UseBannerService from 'application/store/services/UseBannerService'
import { Platform, TouchableOpacity } from 'react-native'
import { useRouter } from 'solito/router'
import UseEventService from '../../../store/services/UseEventService'
const BannerAds = ({
 module_name,
 module_type,
}: {
  module_name: string
  module_type: string
}) => {

  const { _env } = UseEnvService()
  const { event } = UseEventService();
  const [filteredBanners, setFilteredBanners] = useState<Banner[]>([])
  const { banners, FetchBanners } = UseBannerService()
  useEffect(() => {
    const filteredBanner = banners.filter((banner: Banner) => {
      return (
        ((banner.module_name === module_name && banner.module_type === module_type) || banner.banner_position === module_type )
      )
    })
    setFilteredBanners(filteredBanner)
  }, [banners])
  React.useEffect(() => {
    FetchBanners()
  }, [])
  const { push } = useRouter()
  const handleBannerClick = (banner: Banner) => {
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
  return (
    <>
      {filteredBanners.map(
        (banner, index) => (
          <View
            key={index}
            onClick={() => handleBannerClick(banner)}
            style={{ width: '100%', height: '100%' }}
          >
            <Image
              key={index}
              source={{
                uri: `${_env.eventcenter_base_url}/assets/banners/${banner.image}`,
              }}
              alt="Banner Image"
              width="100%"
              height="100%"
            />
          </View>
        )
      )}
    </>
    )
  }

  export default BannerAds
