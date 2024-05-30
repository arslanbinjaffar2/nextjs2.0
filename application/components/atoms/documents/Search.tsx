import React from 'react';
import { Input, Icon } from 'native-base'
import AntDesign from '@expo/vector-icons/AntDesign';
import UseDocumentService from 'application/store/services/UseDocumentService';
import debounce from 'lodash.debounce';
import { Keyboard } from 'react-native';
import UseEventService from 'application/store/services/UseEventService';

type AppProps = {
    w?: string,
}



const Search = ({  w }: AppProps) => {

    const { FilterDocuments, query, documents, document_id } = UseDocumentService();
    const { event, modules  } = UseEventService();


    const searchInputRef = React.useRef<any>(null);

    React.useEffect(() => {
        return () => {
            search.cancel();
        };
    }, []);

    const search = React.useMemo(() => {
        return debounce(function (query: string, document_id:number) {
            FilterDocuments({ document_id: document_id, query: query });
            Keyboard.dismiss();
        }, 1000);
    }, []);

    React.useEffect(() => {
        if (query) {
            searchInputRef.current.focus();
        }
        searchInputRef.current.value = query;
    }, [query])

    return (
        <Input w={['100%',w ? w : '60%']}
        outlineStyle={ 'none'}
        _hover={{ borderColor:"transparent" }}
        rounded="10" ref={searchInputRef} bg="primary.box" borderWidth={0} borderColor="primary.text" placeholder={event?.labels?.GENERAL_SEARCH} 
        leftElement={<Icon ml="2" color="primary.text" size="lg" as={AntDesign} name="search1" />} onChangeText={(text: string) => {
            search(text, (documents.length > 0 ? (documents[0]?.directory_id !== undefined ? documents[0]?.directory_id : documents[0]?.parent_id) : document_id));
        }} />
    )

}

export default Search