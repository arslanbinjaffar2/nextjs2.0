import React from 'react'
import { Box, Container, View } from 'native-base'
import IconWithLeftHeading from 'application/components/atoms/headings/IconWithLeftHeading'
import DynamicIcon from 'application/utils/DynamicIcon';
import UseSponsorService from 'application/store/services/UseSponsorService';
import UseEventService from 'application/store/services/UseEventService';
import BoxView from 'application/components/atoms/sponsors/BoxView';
import { Sponsor } from 'application/models/sponsor/Sponsor';
import Slider from "react-slick";
import { useWindowDimensions } from 'react-native';

type AppProps = {
  expand?: boolean;
};

const OurSponsor = ({ expand = false }: AppProps) => {
    const { our_sponsors, categories, FetchOurSponsors, category_id, query } = UseSponsorService();
     const settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow:our_sponsors?.length > 4 ? 4 : our_sponsors?.length,
      slidesToScroll: 1,
      autoplay: true,
      arrows: false,
      centerMode: false,
      vertical: true,
      verticalSwiping: true,
      beforeChange: function(currentSlide: any, nextSlide: any) {},
      afterChange: function(currentSlide: any) {}
    };

    const {width} = useWindowDimensions();


    const { modules, event } = UseEventService();

    React.useEffect(() => {
        if(modules.filter((module: any, key: number) => module.alias === 'sponsors').length > 0) { 
            FetchOurSponsors();
        }
    }, []);

    return (
        <Container nativeID={expand ? 'ebs-sponsors-slider-expand' : 'ebs-sponsors-slider'}  w={expand ? '100%' : 265} maxW="100%">
            {modules.filter((module: any, key: number) => module.alias === 'sponsors').length > 0 && our_sponsors?.length > 0 && (
                <>
                    <View mb={3}  w={expand ? '100%' : 265}>
                        <IconWithLeftHeading icon={<DynamicIcon iconType="sponsors" iconProps={{ width: 22, height: 24 }} />} title={event?.labels?.MOBILE_APP_OUR_SPONSORS?.toUpperCase()} />
                    </View>
                    
                    {our_sponsors?.length > 4 ? <div style={{width: expand ? width - 30 : '265px'}}>
                        <Slider {...settings}>
                            {our_sponsors?.length > 0 && our_sponsors.map((sponsor: Sponsor, key: number) =>
                            <Box key={key}  w={expand ? '100%' : 265} height={180} p="0" rounded="lg">
                                <BoxView sponsor={sponsor} k={key} screen="our-sponsors"  w='100%' />
                            </Box>
                            )}
                         </Slider>
                        </div> : (
                        <>
                        {our_sponsors?.length > 0 && our_sponsors.map((sponsor: Sponsor, key: number) =>
                            <Box key={key}  w={expand ? '100%' : 265} height={180} p="0" rounded="lg">
                                <BoxView sponsor={sponsor} k={key} screen="our-sponsors"  w='100%' />
                            </Box>
                            )}
                        </>
                    )}
                </>
            )}
        </Container>
    )
}

export default OurSponsor