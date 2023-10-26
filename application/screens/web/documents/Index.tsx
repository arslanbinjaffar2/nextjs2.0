import * as React from 'react';
import PropTypes from 'prop-types';
import Master from 'application/screens/web/layouts/Master';
import UseDocumentService from 'application/store/services/UseDocumentService';
import IndexTemplate from 'application/components/templates/documents/web/Index';

type indexProps = {
  navigation: unknown
}

const Index = ({ navigation }: indexProps) => {

  const { FetchDocuments } = UseDocumentService();

  React.useEffect(() => {
    FetchDocuments({ speaker_id: 0, sponsor_id: 0, exhibitor_id: 0, agenda_id: 0 });
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
