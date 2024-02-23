import React from 'react'
import { Box, Container } from 'native-base'
import IconWithLeftHeading from 'application/components/atoms/headings/IconWithLeftHeading'
import DynamicIcon from 'application/utils/DynamicIcon';
import UseSponsorService from 'application/store/services/UseSponsorService';
import UseEventService from 'application/store/services/UseEventService';
import BoxView from 'application/components/atoms/sponsors/BoxView';
import { Sponsor } from 'application/models/sponsor/Sponsor';
import Slider from "react-slick";

const OurSponsor = () => {
    const { our_sponsors, categories, FetchOurSponsors, category_id, query } = UseSponsorService();
     const settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow:our_sponsors.length >= 4 ? 4 : our_sponsors.length,
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
        FetchOurSponsors();
    }, []);

    return (
        <Container w="100%" maxW="100%">
            {modules.filter((module: any, key: number) => module.alias === 'sponsors').length > 0 && our_sponsors?.length > 0 && (
                <>
                    <IconWithLeftHeading icon={<DynamicIcon iconType="sponsors" iconProps={{ width: 22, height: 24 }} />} title="OUR SPONSORS" />
                    <div style={{width: '265px'}}>
                        <Slider {...settings}>
                            {our_sponsors.length > 0 && our_sponsors.map((sponsor: Sponsor, key: number) =>
                            <Box key={key}  w={265} height={180} p="0" rounded="lg">
                                <BoxView sponsor={sponsor} k={key} screen="our-sponsors"  w='100%' />
                            </Box>
                            )}
                         </Slider>
                    </div>
                </>
            )}
        </Container>
    )
}

export default OurSponsor