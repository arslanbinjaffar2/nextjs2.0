import * as React from 'react';
import PropTypes from 'prop-types';
import Master from 'application/screens/web/layouts/Master';
import IndexTemplate from 'application/components/templates/exhibitors/web/Index';
import UseExhibitorService from 'application/store/services/UseExhibitorService';

type indexProps = {
  navigation: unknown
}

const Index = ({ navigation }: indexProps) => {

  const { FetchExhibitors } = UseExhibitorService();

  React.useEffect(() => {
    FetchExhibitors({ category_id: 0, query: '' });
  }, [])

  return (
    <Master>
      <IndexTemplate />
    </Master>
  );
};

Index.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default Index;
