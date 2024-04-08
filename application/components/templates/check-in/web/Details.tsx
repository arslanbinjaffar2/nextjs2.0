import IcoEmail from 'application/assets/icons/small/IcoEmail'
import NextBreadcrumbs from 'application/components/atoms/NextBreadcrumbs'
import { UseEventService } from 'application/store/services'
import { Box, Button, Center, HStack, IconButton, Image, Text, VStack } from 'native-base'
import React from 'react'
import UseCheckInOutService from 'application/store/services/UseCheckInOutService';
import moment from 'moment'
import { GENERAL_DATE_FORMAT } from 'application/utils/Globals'
import in_array from "in_array";
import UseLoadingService from 'application/store/services/UseLoadingService';
import WebLoading from 'application/components/atoms/WebLoading';

const CheckInDetails = () => {
    const { event, modules } = UseEventService();
    const module = modules.find((module) => module.alias == "checkIn");
    const { FetchOrderDetail,orderDetail } = UseCheckInOutService();
    const { scroll, processing } = UseLoadingService();
    
    React.useEffect(() => {
        FetchOrderDetail();
    }, [])

  return (
    <VStack w={'100%'}>
          <NextBreadcrumbs module={module} title={"CHECK-IN DETAILS"} />
        <HStack  space="3" alignItems="center">
        {/* <Box flexDirection={'row'} alignItems="center" >
          <Button
              px={4}
              py={2}
              w={'24px'}
              h={'16px'}
              shadow={3}
                  />
                  <Text ml={'2'} fontSize={'2xl'}>BACK</Text>
              </Box>
              <Text fontSize={'2xl'} textAlign={'center'} w={'100%'}>CHECK-IN DETAILS</Text> */}
              
        </HStack>
        { in_array('checking-in-out-order-detail',processing) ? (
          <>
            <Box mt={10}>
            <WebLoading />
            </Box>
          </>
        ):(
          <>
          <HStack  space="4" alignItems="center"  justifyContent={'end'} w={'100%'}>
            {/* <Box flexDirection={'row'} justifyContent={'space-between'} style> */}
            <Text fontSize="md" >Order number: {orderDetail?.order_no}</Text>
            <Text fontSize="md" >Order date: {moment(orderDetail?.order_date).format(GENERAL_DATE_FORMAT)}</Text>
              {/* </Box> */}
          </HStack>
          <HStack  mt={'14px'} alignItems="flex-start" justifyContent={'center'} flexDirection={'column'} w={'100%'}>
              <HStack space={[15, 93]} flexDirection={'row'} w={'100%'} alignItems={'center'}  bg={'primary.darkbox'} p={'2'}
              roundedTop={'md'} 
              >
                  <Text fontSize="md">Qty</Text>
                  <Text fontSize="md">Items</Text>
                </HStack>
            
                {orderDetail && orderDetail.items.map((item,key,items)=>{
                    return(
                        <HStack space={[15,93]} flexDirection={'row'} w={'100%'} minWidth={'224'} 
                        justifyContent={'flex-start'}
                        alignItems={'center'}  bg={'primary.box'} p={'5'}
                            borderBottomColor={"primary.bordercolor"}
                            roundedBottom={key == items.length - 1 ? "md" : ""}
                            borderBottomWidth={key !== items.length-1?"1":"0"}

                        >
                            <Text fontSize="md">{item.qty}</Text>
                            <Text fontSize="md">{item.name}</Text>

                        </HStack>
                    )
                })}

                {!orderDetail || orderDetail.items.length == 0 ? (
                  <Box p={3} mb="3" rounded="lg" w="100%">
                    <Text>{event?.labels?.GENERAL_NO_RECORD}</Text>
                  </Box>
                ):null}
            
          </HStack>
          </>
        )}
      </VStack>
  )
}

export default CheckInDetails