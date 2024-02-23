import React, { useEffect, useState } from 'react';
import { Image } from 'native-base';
import { Banner } from 'application/models/Banner';
import UseEnvService from 'application/store/services/UseEnvService';
import UseBannerService from 'application/store/services/UseBannerService'
const { banners, FetchBanners} = UseBannerService();
const BannerAds = ({ module_name, module_type }: { banners: Banner[], module_name: string, module_type: string }) => {
  const { _env } = UseEnvService();
  const [filteredBanners, setFilteredBanners] = useState<Banner[]>([]);

  useEffect(() => {
    const filteredBanner = banners.filter((banner: Banner) => {
      return banner.module_name === module_name && banner.module_type === module_type;
    });
    setFilteredBanners(filteredBanner);
  }, [banners]);
  React.useEffect(() => {
    FetchBanners();
  }, []);
  console.log(module_name);
  return (
    <>
      {filteredBanners.map((banner, index) => (
       console.log(banner.image),

        <Image
          key={index}
          source={{ uri: `${_env.eventcenter_base_url}/assets/banners/${banner.image}` }}
          alt="Banner Image"
          width="100%"
          height="100%"
        />
      ))}
    </>
  );
};

export default BannerAds;
