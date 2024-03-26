import * as React from 'react';
import PropTypes from 'prop-types';
// import Master from 'application/screens/web/layouts/Master';
// import UseDocumentService from 'application/store/services/UseDocumentService';
import IndexTemplate from 'application/components/templates/document-send-email/web/index';

type indexProps = {
  navigation: unknown
}

const Index = ({ navigation }: indexProps) => {



  return (
      <IndexTemplate />
  );
};

Index.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default Index;
