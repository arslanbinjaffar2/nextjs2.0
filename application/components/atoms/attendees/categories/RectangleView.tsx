import React from 'react'
import { Box, HStack, Icon, Spacer, Text, VStack, ZStack, IconButton, Pressable } from 'native-base'
import { Category } from 'application/models/event/Category'
import UseAttendeeService from 'application/store/services/UseAttendeeService';
import UseEventService from 'application/store/services/UseEventService';
import UseEnvService from 'application/store/services/UseEnvService';
import { useRouter } from 'solito/router'

type AppProps = {
    category: Category,
    k: number
    navigation: boolean,
    border: boolean
    screen: string
    updateTab?: (tab: string) => void
}

const RectangleView = ({ k, category, border, updateTab, screen }: AppProps) => {

    const { UpdateCategory, FetchCategories, query } = UseAttendeeService();

    const { event } = UseEventService();

    const { _env } = UseEnvService()

    const { push } = useRouter()

    return (
        <Box w="100%" key={k} borderBottomWidth={border ? 1 : 0} borderColor="primary.text" py="3">
            <Pressable
                onPress={() => {
                    if (category.parent_id > 0) {
                        if (updateTab) updateTab('attendee');
                        UpdateCategory({ category_id: category.id });
                        if (screen === "detail") {
                            push(`/${event.url}/speakers`);
                        }
                    } else {
                        FetchCategories({ parent_id: category.id, query: query, page: 1, cat_type: 'speakers' })
                    }
                }}>
                <HStack pl="30px" alignItems="center" minH="55px" space={0}>
                    <Box position="absolute" left="0" top="0">
                        <ZStack>
                            <Box bg={category.color} borderWidth="1" borderColor="primary.darkbox" w="15px" mt='0px' h={`58px`} borderRightRadius="10" shadow={2} />
                        </ZStack>
                    </Box>
                    <HStack pt="0" w="100%" space="5" alignItems="center" justifyContent="space-between">
                        <VStack maxW={['62%', '70%', '40%']} space="1">
                            <Text fontSize="lg" lineHeight="22px">
                                {category.name}
                            </Text>
                        </VStack>
                    </HStack>
                </HStack>
            </Pressable>
        </Box>
    )
}

export default RectangleView