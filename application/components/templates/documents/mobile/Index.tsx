import React from 'react'
import { Container, HStack, Spacer, Text } from 'native-base';
import UseLoadingService from 'application/store/services/UseLoadingService';
import ListingLayout2 from 'application/components/molecules/documents/ListingLayout2';
import MobileLoading from 'application/components/atoms/MobileLoading';
import { Platform } from 'react-native';
import Search from 'application/components/atoms/documents/Search';

const Index = React.memo(() => {

    const { loading } = UseLoadingService();

    return (
        <Container pt="2" maxW="100%" h={'100%'} w="100%">
            {loading ? (
                <MobileLoading />
            ) : (
                <>
                    <HStack mb="3" pt="2" w="100%" space="3" alignItems="center">
                        {Platform.OS === "web" && (
                            <>
                                <Text textTransform="uppercase" fontSize="2xl">Documents</Text>
                                <Spacer />
                            </>
                        )}
                        <Search />
                    </HStack>
                    <ListingLayout2 />
                </>
            )}
        </Container>
    )

})

export default Index