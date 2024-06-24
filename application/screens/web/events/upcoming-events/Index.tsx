import * as React from 'react';
import PropTypes from 'prop-types';
import Master from 'application/screens/web/layouts/Master';
import UseEventService from 'application/store/services/UseEventService';
import NextBreadcrumbs from 'application/components/atoms/NextBreadcrumbs';
import Indextemplate from 'application/components/templates/events/web/upcoming/Index'
type indexProps = {
  navigation: unknown
}

const Index = ({ navigation }: indexProps) => {
  const { event } = UseEventService()
    const { modules } = UseEventService();
    const module = modules.find((module) => module.alias === 'upcomingEvents');
  return (
    <>
      <NextBreadcrumbs module={module} />
      <Indextemplate/>
    </>
  );
};

Index.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default Index;
