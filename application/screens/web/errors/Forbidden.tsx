import React from "react";
import { Box, Button, Text, View } from "native-base";
import DynamicIcon from "application/utils/DynamicIcon";
import { UseEventService } from "application/store/services";
export default function Forbidden() {
    const { event } = UseEventService()
    return (
        <View w={"100%"} h={500} p={"10"} alignItems="center" justifyContent="center">
            <Box bg="primary.box" w={"100%"} h={"100%"} overflow="hidden"  rounded="lg" p={['20px','50px']} flexDirection={'column'} alignItems={'center'} justifyContent={'center'}>
                <Button height={'64px'} width={'64px'} rounded={'full'}>
                <DynamicIcon iconType={'forbidden_icon'} iconProps={{ width:32,height:32,color:'primary.text' }}/>
                </Button>
                <Text color="primary.text" alignSelf="center" mt={4} fontSize="3xl" fontWeight="bold" textAlign={'center'}>Access Denied</Text>
                <Text color="primary.text" alignSelf="center" mt={3} fontSize="xl" textAlign={'center'}>You are not authorized to access this page.</Text>
                <Button mt={4} onPress={()=>{
                        window.location.href = `/${event.url}/dashboard`
                    }
                } width={['100%','396px']} height={'59px'} shadow={'0px 3px 6px #00000029'} _text={{ fontSize:'2xl',fontWeight:'semibold' }}>Go to Dashboard</Button>
            </Box>
        </View>
    )
}