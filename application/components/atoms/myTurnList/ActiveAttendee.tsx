import DynamicIcon from 'application/utils/DynamicIcon'
import { Text, HStack, View, Avatar, Box, Pressable, Button } from 'native-base'
import React, { useState } from 'react'

const ActiveAttendee = () => {
    const [sendRequest, setSendRequest] = useState(false)
    return (
        <>
            <View height={"105px"} bg={'primary.box'} rounded={'10px'} pl={'10px'} py={'5'} pr={'18px'} my={'14px'} width={'100%'} >
                <HStack justifyContent={'space-between'} width={'100%'} alignItems={'center'}>
                    <Box flexDirection={'row'} alignItems={'center'}>
                        <Avatar bg="cyan.500"
                            width="64px"
                            height="64px"
                            source={{
                                uri: "https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                            }} />
                        <View flexDirection={'column'} ml={'14px'}>
                            <Text fontWeight={'medium'} fontSize={'lg'}> Mike Hechson </Text>
                            <Text fontWeight={'medium'} fontSize={'lg'}>Marketing sales person</Text>
                        </View>
                    </Box>
                    <Box flexDirection={'row'} alignItems={'center'}>
                        <Pressable
                            mr={'4'}
                            onPress={() => {
                                setSendRequest(true)
                            }}

                        >
                            {!sendRequest ? <DynamicIcon iconType={'hand'} iconProps={{ width: 20, height: 26 }} />
                                : <Button maxWidth={'120px'} width={'100%'}>
                                    <Text fontWeight={'semibold'} fontSize={'md'} isTruncated width={'100%'}>Cancel request</Text>
                                </Button>
                            }
                        </Pressable>

                        <Text fontWeight={'medium'} fontSize={'lg'}># 05</Text>
                    </Box>
                </HStack>
            </View>
        </>

    )
}

export default ActiveAttendee