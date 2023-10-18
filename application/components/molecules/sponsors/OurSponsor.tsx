import React from 'react'
import { Container } from 'native-base'
import IconWithLeftHeading from 'application/components/atoms/headings/IconWithLeftHeading'
import DynamicIcon from 'application/utils/DynamicIcon';
import UseSponsorService from 'application/store/services/UseSponsorService';
import BoxView from 'application/components/atoms/sponsors/BoxView';
import { Sponsor } from 'application/models/sponsor/Sponsor';

const OurSponsor = () => {

    const { our_sponsors, categories, FetchSponsors, category_id, query } = UseSponsorService();

    React.useEffect(() => {
        FetchSponsors({ category_id: category_id, query: query, screen: 'our-sponsors' });
    }, []);

    return (
        <Container w="100%" maxW="100%">
            <IconWithLeftHeading icon={<DynamicIcon iconType="sponsors" iconProps={{ width: 22, height: 24 }} />} title="OUR SPONSORS" />
            {our_sponsors.length > 0 && our_sponsors.map((sponsor: Sponsor, key: number) =>
                <BoxView sponsor={sponsor} k={key} key={key} w='100%' />
            )}
        </Container>
    )
}

export default OurSponsor