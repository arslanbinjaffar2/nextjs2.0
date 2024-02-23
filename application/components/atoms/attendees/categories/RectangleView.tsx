import React from 'react'
import { Box, HStack, Text, VStack, ZStack, Pressable } from 'native-base'
import { Category } from 'application/models/event/Category'
import UseAttendeeService from 'application/store/services/UseAttendeeService';
import UseEventService from 'application/store/services/UseEventService';
import { useRouter } from 'solito/router'
import { useNavigation } from '@react-navigation/native';
import { Platform } from 'react-native';
import { useSearchParams, usePathname } from 'next/navigation'

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

    const { push } = useRouter()

    const pathname = usePathname()
    
    const searchParams = useSearchParams()

    const tabQueryParam = searchParams.get('tab')

    const createQueryString = React.useCallback(
        (array:{name: string, value: string}[]) => {
          const params = new URLSearchParams(searchParams.toString())
          array.forEach((i)=>{
              params.set(i.name, i.value)
          });
          return params.toString()
        },
        [searchParams]
    )

    const navigation: any = Platform.OS !== "web" ? useNavigation() : false;

    return (
        <Box w="100%" key={k} borderBottomWidth={border ? 1 : 0} borderColor="primary.bordercolor" py="3">
            <Pressable
                onPress={() => {
                    if (category.parent_id > 0) {
                        if (updateTab) updateTab('category-attendee');
                        push(pathname + '?' + createQueryString([{name:'tab', value:'category-attendee'}, {name:'category_id', value:`${category.id}`}]))
                        UpdateCategory({ category_id: category.id, category_name: category.name, parent_id:category.parent_id });
                        if (screen === "detail") {
                            if (Platform.OS === "web") {
                                push(`/${event.url}/speakers`);
                            } else {
                                navigation.replace('app', {
                                    screen: 'speakers'
                                })
                            }
                        }
                    } else {
                        // FetchCategories({ parent_id: category.id, query: query, page: 1, cat_type: 'speakers' })
                        push(pathname + '?' + createQueryString([{name:'tab', value:'sub-category'}, {name:'category_id', value:`${category.id}`}]))
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