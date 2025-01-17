import React from 'react'
import { Icon, Input } from 'native-base'
import AntDesign from '@expo/vector-icons/AntDesign';
import UseEventService from 'application/store/services/UseEventService';

const { event} = UseEventService();

const Search = () => {
    return (
        <Input rounded="10" w="60%" bg="primary.box" borderWidth={1} borderColor="primary.bordercolor" placeholder={event.labels?.GENERAL_SEARCH} leftElement={<Icon ml="2" color="primary.text" size="lg" as={AntDesign} name="search1" />} />
    )
}

export default Search