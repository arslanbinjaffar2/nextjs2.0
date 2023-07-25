import React from 'react'
import { Avatar, Box, HStack, Icon, Spacer, Text, VStack, ZStack, Button, IconButton } from 'native-base'
import DynamicIcon from 'application/utils/DynamicIcon';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Sponsor, Category } from 'application/models/Sponsor'
import UseSponsorService from 'application/store/services/UseSponsorService';

type AppProps = {
    sponsor: Sponsor,
    k: number
}

const RectangleView = ({ k, sponsor }: AppProps) => {

    const { settings, MakeFavourite } = UseSponsorService();

    return (
        <Box w="100%" k={k} borderBottomWidth={k === 3 ? 0 : 1} borderColor="primary.text" py="3">
            <HStack pl="30px" alignItems="center" minH="55px" space={0} justifyContent="flex-start">
                <Box position="absolute" left="0" top="0" w="15px">
                    <ZStack>
                        {sponsor.categories.length > 0 && sponsor.categories.map((category: Category, i: number) =>
                            <Box key={i} bg={`${category.color}`} borderWidth="1" borderColor="primary.darkbox" w="15px" mt={`${i * 10}px`} h={`${55 - (i * 10)}px`} borderRightRadius="10" shadow={2} />
                        )}
                    </ZStack>
                </Box>
                <HStack pt="0" w="100%" space="5" alignItems="center" justifyContent="space-between">
                    <VStack maxW={['62%', '70%', '40%']} space="0">
                        <Text fontSize="lg" lineHeight="22px">
                            {sponsor.name}
                        </Text>
                        <Text fontSize="md">
                            {sponsor.categories.length > 0 && sponsor.categories.map((category: Category, i: number) =>
                                <React.Fragment key={i}>
                                    {`${category.info.name}${(i + 1) < sponsor.categories.length ? ', ' : ''}`}
                                </React.Fragment>
                            )}
                        </Text>
                    </VStack>
                    <Spacer />
                    <HStack pr="3" space="5" alignItems="center">
                        {sponsor.booth && (
                            <Button
                                p="1"
                                leftIcon={<DynamicIcon iconType="exhibitors" iconProps={{ width: 16, height: 16 }} />}
                                bg="transparent"
                                onPress={() => {
                                    console.log('hello')
                                }}
                            >
                                {sponsor.booth}
                            </Button>
                        )}
                        {settings?.mark_favorite === 1 && (
                            <IconButton
                                bg="transparent"
                                p="1"
                                _hover={{ bg: 'primary.500' }}
                                icon={<Icon size="xl" as={Ionicons} name={sponsor.attendee_sponsors.length > 0 ? 'heart' : 'heart-outline'} color="primary.darkbox" />}
                                onPress={() => {
                                    MakeFavourite({ sponsor_id: sponsor.id });
                                }}
                            />
                        )}
                    </HStack>
                </HStack>
            </HStack>
        </Box>
    )
}

export default RectangleView