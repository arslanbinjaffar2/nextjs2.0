import * as React from 'react';
import PropTypes from 'prop-types';
import Master from 'application/screens/mobile/layouts/Master';
import Header from 'application/screens/mobile/layouts/headers/Header';
import { Center } from 'native-base';
import IndexTemplate from 'application/components/templates/documents/mobile/Index';
import UseDocumentService from 'application/store/services/UseDocumentService';
import { useIsFocused } from '@react-navigation/native';

const Index = ({ navigation }: any) => {

    const { FetchDocuments } = UseDocumentService();

    const isFocused = useIsFocused();

    React.useEffect(() => {
        FetchDocuments({ speaker_id: 0, sponsor_id: 0, exhibitor_id: 0, agenda_id: 0 });
    }, [isFocused])

    return (
        <Master navigation={navigation}>
            <Header minimal={false} navigation={navigation} />
            <Center w={'100%'} px={15}>
                <IndexTemplate />
            </Center>
        </Master>
    );
};

Index.propTypes = {
    navigation: PropTypes.object.isRequired,
};

export default Index;
