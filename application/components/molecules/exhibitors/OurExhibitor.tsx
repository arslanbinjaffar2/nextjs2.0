import React from 'react'
import { Box, Container, View } from 'native-base'
import IconWithLeftHeading from 'application/components/atoms/headings/IconWithLeftHeading'
import DynamicIcon from 'application/utils/DynamicIcon';
import UseExhibitorService from 'application/store/services/UseExhibitorService';
import UseEventService from 'application/store/services/UseEventService';
import BoxView from 'application/components/atoms/exhibitors/BoxView';
import { Exhibitor } from 'application/models/exhibitor/Exhibitor';
import Slider from "react-slick";
import { useWindowDimensions } from 'react-native';

type AppProps = {
  expand?: boolean;
};  
const OurExhibitor = ({ expand = false }: AppProps) => {
  const { our_exhibitors, FetchOurExhibitors} = UseExhibitorService();
 const settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow:our_exhibitors.length > 4 ? 4 : 1 ,
      slidesToScroll: 1,
      autoplay: true,
      arrows: false,
      centerMode: false,
      vertical: true,
      verticalSwiping: true,
      beforeChange: function(currentSlide: any, nextSlide: any) {},
      afterChange: function(currentSlide: any) {}
    };

  const { modules, event } = UseEventService();

  const {width} = useWindowDimensions();

  React.useEffect(() => {
    FetchOurExhibitors();
  }, []);

  return (
    <Container nativeID={expand ? 'ebs-exhibitor-slider-expand' : 'ebs-exhibitor-slider'} w={expand ? '100%' : 265} maxW="100%">
      {modules.filter((module: any, key: number) => module.alias === 'exhibitors').length > 0 && our_exhibitors?.length > 0 && (
        <>
          <View mb={3}  w={expand ? '100%':265}>
            <IconWithLeftHeading icon={<DynamicIcon iconType="exhibitors" iconProps={{ width: 22, height: 24 }} />} title={event?.labels?.MOBILE_APP_OUR_EXHIBITORS?.toUpperCase()} />
          </View>
          
         {our_exhibitors.length > 4 ? <div style={{width: expand ? width - 30 : '265px'}}>
           <Slider {...settings}>
           {our_exhibitors.length > 0 && our_exhibitors.map((exhibitor: Exhibitor, key: number) =>
           <Box key={key}  w={expand ? '100%' : 265} height={180} p="0" rounded="lg">
            <BoxView exhibitor={exhibitor} k={key} screen="our-exhibitors" w='100%' />
           </Box>
           )}
           </Slider>
         </div> : (
          <>
          {our_exhibitors.length > 0 && our_exhibitors.map((exhibitor: Exhibitor, key: number) =>
           <Box key={key}  w={expand ? '100%' : 265} height={180} p="0" rounded="lg">
            <BoxView exhibitor={exhibitor} k={key} screen="our-exhibitors" w='100%' />
           </Box>
           )}
          </>
         )}
        </>
      )}
    </Container>
  )
}

export default OurExhibitor