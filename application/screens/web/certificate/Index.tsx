import * as React from 'react';
import PropTypes from 'prop-types';
import UseCertificateService from 'application/store/services/UseCertificateService';
import IndexTemplate from 'application/components/templates/certificate/web/Index';

type indexProps = {
  navigation: unknown
}

const Index = ({ navigation }: indexProps) => {

  const { FetchCertificate } = UseCertificateService();

  React.useEffect(() => {
    FetchCertificate();
  }, [])

  return (
      <IndexTemplate />
  );
};

Index.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default Index;
