import React from 'react'
import { Icon, Input } from 'native-base'
import AntDesign from '@expo/vector-icons/AntDesign';
import debounce from 'lodash.debounce';
import UseProgramService from 'application/store/services/UseProgramService';

type AppProps = {
    tab: string,
}

const Search = ({ tab }: AppProps) => {

    const { FetchPrograms, query } = UseProgramService();

    const [searchQuery, setSearch] = React.useState('')

    React.useEffect(() => {
        return () => {
            search.cancel();
        };
    }, []);

    const search = React.useMemo(() => {
        return debounce(function (query: string) {
            if (tab === "program") {
                FetchPrograms({ query: query, page: 1, screen: 'my-program' });
            }
        }, 1000);
    }, [tab]);

    React.useEffect(() => {
        setSearch(query);
    }, [query]);

    return (
        <Input rounded="10" w={'60%'} bg="primary.box" borderWidth={0} value={searchQuery} placeholder="Search" onChangeText={(text: string) => {
            search(text);
            setSearch(text);
        }} leftElement={<Icon ml="2" color="primary.text" size="lg" as={AntDesign} name="search1" />} />
    )
}

export default Search