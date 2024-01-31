import React from 'react'
import { Box, HStack, Icon, Spacer, Text, VStack, ZStack, IconButton, Pressable } from 'native-base'
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import { ExhibitorCategory } from 'application/models/exhibitor/ExhibitorCategory'
import UseExhibitorService from 'application/store/services/UseExhibitorService';

type AppProps = {
    updateTab: (tab: string) => void,
    category: ExhibitorCategory,
    k: number
}

const RectangleView = ({ k, category, updateTab }: AppProps) => {

    const { FetchExhibitors } = UseExhibitorService();

    return (
        <Box w="100%" key={k} borderBottomWidth={1} borderColor="primary.box" py="3">
            <Pressable
                onPress={() => {
                    if(category.exhibitors.length > 0){
                        FetchExhibitors({ category_id: category.id, query: '', screen: 'exhibitors' });
                        updateTab('name');
                    }
                }}>
                <HStack pl="30px" alignItems="center" minH="55px" space={0}>
                    <Box position="absolute" left="0" top="0">
                        <ZStack>
                            <Box bg={category.color} borderWidth="1" borderColor="primary.darkbox" w="15px" mt='0px' h={`58px`} borderRightRadius="10" shadow={2} />
                        </ZStack>
                    </Box>
                    <HStack pt="0" w="100%" space="5" alignItems="center" justifyContent="space-between">
                        <VStack maxW={'calc(100% - 80px)'} space="1">
                            <Text fontSize="lg" lineHeight="22px">
                                {category.name}
                            </Text>
                        </VStack>
                        <Spacer />
                        {category.exhibitors.length > 0 && (
                            <HStack pr="3" space="5" alignItems="center">
                                <IconButton
                                    bg="transparent"
                                    p="1"
                                    _hover={{ bg: 'transparent' }}
                                    icon={<Icon size="lg" as={SimpleLineIcons} name="arrow-right" color="primary.text" />}
                                />
                            </HStack>
                        )}
                    </HStack>
                </HStack>
            </Pressable>
        </Box>
    )
}

export default RectangleView