import * as React from 'react';
import PropTypes from 'prop-types';
import Master from 'application/screens/web/layouts/Master';
import UseEventService from 'application/store/services/UseEventService';
import NextBreadcrumbs from 'application/components/atoms/NextBreadcrumbs';
import Indextemplate from 'application/components/templates/events/web/upcoming/Details'
type indexProps = {
  navigation: unknown
}

const Index = ({ navigation }: indexProps) => {
  return (
    <>
      <Indextemplate/>
    </>
  );
};

Index.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default Index;
