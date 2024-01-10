import * as React from 'react';
import PropTypes from 'prop-types';
import Master from 'application/screens/web/layouts/Master';
import IndexTemplate from 'application/components/templates/sponsors/web/Index';
import UseSponsorService from 'application/store/services/UseSponsorService';

type indexProps = {
  navigation: unknown
}

const Index = ({ navigation }: indexProps) => {

  const { FetchSponsors } = UseSponsorService();

  React.useEffect(() => {
    FetchSponsors({ category_id: 0, query: '', screen: 'sponsors' });
  }, [])

  return (
      <IndexTemplate />
  );
};

Index.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default Index;
