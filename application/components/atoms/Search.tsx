import React from 'react'
import { Icon, Input } from 'native-base'
import AntDesign from '@expo/vector-icons/AntDesign';

const Search = () => {
    return (
        <Input rounded="10" w="60%" bg="primary.box" borderWidth={1} borderColor="primary.bordercolor" placeholder="Search" leftElement={<Icon ml="2" color="primary.text" size="lg" as={AntDesign} name="search1" />} />
    )
}

export default Search