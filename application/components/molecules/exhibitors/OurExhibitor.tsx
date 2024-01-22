import React from 'react'
import { Container } from 'native-base'
import IconWithLeftHeading from 'application/components/atoms/headings/IconWithLeftHeading'
import DynamicIcon from 'application/utils/DynamicIcon';
import UseExhibitorService from 'application/store/services/UseExhibitorService';
import UseEventService from 'application/store/services/UseEventService';
import BoxView from 'application/components/atoms/exhibitors/BoxView';
import { Exhibitor } from 'application/models/exhibitor/Exhibitor';
import Slider from "react-slick";

const OurExhibitor = () => {
 const settings = {
      dots: false,
      infinite: true,
      slidesToShow: 4,
      slidesToScroll: 1,
      autoplay: true,
      arrows: false,
      vertical: true,
      verticalSwiping: false,
      beforeChange: function(currentSlide: any, nextSlide: any) {
        console.log("before change", currentSlide, nextSlide);
      },
      afterChange: function(currentSlide: any) {
        console.log("after change", currentSlide);
      }
    };
  const { our_exhibitors, categories, FetchExhibitors, category_id, query } = UseExhibitorService();

  const { modules } = UseEventService();

  React.useEffect(() => {
    FetchExhibitors({ category_id: category_id, query: query, screen: 'our-exhibitors' });
  }, []);

  return (
    <Container w="100%" maxW="100%">
      {modules.filter((module: any, key: number) => module.alias === 'exhibitors').length > 0 && our_exhibitors?.length > 0 && (
        <>
          <IconWithLeftHeading icon={<DynamicIcon iconType="exhibitors" iconProps={{ width: 22, height: 24 }} />} title="OUR EXHIBITORS" />
         <div style={{width: '265px'}}>
           <Slider {...settings}>
           {our_exhibitors.length > 0 && our_exhibitors.map((exhibitor: Exhibitor, key: number) =>
             <div key={key} style={{width: '265px'}}>
               <BoxView exhibitor={exhibitor} k={key} w='100%' />
             </div>
           )}
           </Slider>
         </div>
        </>
      )}
    </Container>
  )
}

export default OurExhibitor