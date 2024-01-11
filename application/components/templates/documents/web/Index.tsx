import React from 'react'
import { Container, HStack, Spacer, Text } from 'native-base';
import UseLoadingService from 'application/store/services/UseLoadingService';
import WebLoading from 'application/components/atoms/WebLoading';
import ListingLayout2 from 'application/components/molecules/documents/ListingLayout2';
import Search from 'application/components/atoms/documents/Search';
import in_array from "in_array";

const Index = React.memo(() => {

    const { processing } = UseLoadingService();


    return (
        <>
            {in_array('documents', processing) ? (
                <WebLoading />
            ) : (
                <Container pt="2" maxW="100%" w="100%">
                    <HStack mb="3" pt="2" w="100%" space="3" alignItems="center">
                        <Text textTransform="uppercase" fontSize="2xl">Documents</Text>
                        <Spacer />
                        <Search />
                    </HStack>
                    <ListingLayout2 />
                </Container>
            )}
        </>
    )

})

export default Index