import React from 'react';
import { Input, Icon } from 'native-base'
import AntDesign from '@expo/vector-icons/AntDesign';
import UseDocumentService from 'application/store/services/UseDocumentService';
import debounce from 'lodash.debounce';
import { Keyboard } from 'react-native';


const Search = () => {

    const { FilterDocuments, query } = UseDocumentService();

    const searchInputRef = React.useRef<any>(null);

    React.useEffect(() => {
        return () => {
            search.cancel();
        };
    }, []);

    const search = React.useMemo(() => {
        return debounce(function (query: string) {
            FilterDocuments({ document_id: 0, query: query });
            Keyboard.dismiss();
        }, 1000);
    }, []);

    React.useEffect(() => {
        if (query) {
            searchInputRef.current.focus();
        }
    }, [query])

    return (
        <Input rounded="10" ref={searchInputRef} bg="primary.box" borderWidth={1} borderColor="primary.darkbox" placeholder="Search" leftElement={<Icon ml="2" color="primary.text" size="lg" as={AntDesign} name="search1" />} onChangeText={(text: string) => {
            search(text);
        }} />
    )

}

export default Search