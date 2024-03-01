import React from 'react'
import { Icon, Input } from 'native-base'
import AntDesign from '@expo/vector-icons/AntDesign';
import debounce from 'lodash.debounce';
import UseProgramService from 'application/store/services/UseProgramService';
import in_array from "in_array";
import UseEventService from 'application/store/services/UseEventService';

type AppProps = {
    tab: string,
    w?: string,
}

const Search = ({ tab, w }: AppProps) => {

    const { FetchPrograms,FetchTracks , query, id, track_id } = UseProgramService();

    const { event } = UseEventService();

    const [searchQuery, setSearch] = React.useState('')

    React.useEffect(() => {
        return () => {
            search.cancel();
        };
    }, []);

    const search = React.useMemo(() => {
        return debounce(function (query: string) {
            if (in_array(tab, ['program', 'my-program'])) {
                FetchPrograms({ query: query, page: 1, screen: tab, id: tab === 'my-program' ? id : 0, track_id: track_id });
            }else if(tab === "track") {
                FetchTracks({ query: query, page: 1, screen: tab, track_id: 0 });
            }
        }, 1000);
    }, [tab]);

    React.useEffect(() => {
        setSearch(query);
    }, [query]);

    return (
        <Input rounded="10" w={['100%',w ? w : '60%']} bg="primary.box" borderWidth={0} value={searchQuery} placeholder={event.labels.GENERAL_SEARCH} onChangeText={(text: string) => {
            search(text);
            setSearch(text);
        }} leftElement={<Icon ml="2" color="primary.text" size="lg" as={AntDesign} name="search1" />} />
    )
}

export default Search