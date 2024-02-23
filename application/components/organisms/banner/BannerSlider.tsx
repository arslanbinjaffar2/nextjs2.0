import React from 'react'
import { Box, Image } from 'native-base'
import { Banner } from 'application/models/Banner'
import UseEnvService from 'application/store/services/UseEnvService'
import RectangleView from 'application/components/atoms/banners/RectangleView'

const BannerSlider = ({ banners }: { banners: Banner[] }) => {

  const { _env } = UseEnvService();

  const [currentBanner, setCurrentBanner] = React.useState(0);

  React.useEffect(() => {

    const bannerInterval = setInterval(() => {
      setCurrentBanner((prevState) => ((prevState < (banners.length - 1)) ? (prevState + 1) : 0));
    }, 5000)

    return () => {
      clearInterval(bannerInterval);
    }

  }, []);

  return (
    <Box width="full"  my={5}>
      <RectangleView url={`${_env.eventcenter_base_url}/assets/banners/${banners[currentBanner]?.image}`} />
    </Box>
  )

}

export default BannerSlider