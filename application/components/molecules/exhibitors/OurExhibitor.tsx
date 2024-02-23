import React from 'react'
import { Box, Container } from 'native-base'
import IconWithLeftHeading from 'application/components/atoms/headings/IconWithLeftHeading'
import DynamicIcon from 'application/utils/DynamicIcon';
import UseExhibitorService from 'application/store/services/UseExhibitorService';
import UseEventService from 'application/store/services/UseEventService';
import BoxView from 'application/components/atoms/exhibitors/BoxView';
import { Exhibitor } from 'application/models/exhibitor/Exhibitor';
import Slider from "react-slick";

const OurExhibitor = () => {
  const { our_exhibitors, FetchOurExhibitors} = UseExhibitorService();
 const settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow:our_exhibitors.length >= 4 ? 4 : our_exhibitors.length,
      slidesToScroll: 1,
      autoplay: true,
      arrows: false,
      centerMode: false,
      vertical: true,
      verticalSwiping: true,
      beforeChange: function(currentSlide: any, nextSlide: any) {},
      afterChange: function(currentSlide: any) {}
    };

  const { modules } = UseEventService();

  React.useEffect(() => {
    FetchOurExhibitors();
  }, []);

  return (
    <Container w="100%" maxW="100%">
      {modules.filter((module: any, key: number) => module.alias === 'exhibitors').length > 0 && our_exhibitors?.length > 0 && (
        <>
          <IconWithLeftHeading icon={<DynamicIcon iconType="exhibitors" iconProps={{ width: 22, height: 24 }} />} title="OUR EXHIBITORS" />
         <div style={{width: '265px'}}>
           <Slider {...settings}>
           {our_exhibitors.length > 0 && our_exhibitors.map((exhibitor: Exhibitor, key: number) =>
           <Box key={key}  w={265} height={180} p="0" rounded="lg">
            <BoxView exhibitor={exhibitor} k={key} screen="our-exhibitors" w='100%' />
           </Box>
           )}
           </Slider>
         </div>
        </>
      )}
    </Container>
  )
}

export default OurExhibitor