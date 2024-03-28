import IcoEmail from 'application/assets/icons/small/IcoEmail'
import NextBreadcrumbs from 'application/components/atoms/NextBreadcrumbs'
import { UseEventService } from 'application/store/services'
import { Box, Button, Center, HStack, IconButton, Image, Text, VStack } from 'native-base'
import React from 'react'

const CheckInDetails = () => {
    const { event, modules } = UseEventService();
    const module = modules.find((module) => module.alias.startsWith("check") );
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
          <HStack space={3} flex={'3'}  justifyContent="center" w={'100%'} mt={'15px'}>
              <Box mb="3" w="100%" bg="primary.box" px={'5'} pb={'5'} rounded="10">
             <Box justifyContent={'space-between'} flexDirection={'row'} alignItems={'center'} pt={'18px'}>
                  <Text fontSize={'lg'}>My ticket for</Text>
                      <IconButton
                          variant="transparent"
                          p="1"
                          icon={<IcoEmail />}
                          
                      />
                    </Box>
                      <Box mx="auto" w="190px" h="190px" bg="primary.box" p="3" rounded="10">
                          <Image
                            //   source={{
                            //       uri: checkInOut?.qrCodeImgSrc
                            //   }}
                              alt=""
                              w="164px"
                              h="164px"
                              rounded="10"
                          />
                      </Box>
                  
                      <HStack space="0" alignItems="center" justifyContent={'center'} pt={4}>
                          <Button
                              px={4}
                              py={2}
                              shadow={3}
                          bg={'primary.500'}
                        //   colorScheme="#1C9DE0"
                              minW={190}
                          >
                      <Text fontSize="xl" fontWeight={600}>Check in</Text>
                          </Button>
                      </HStack>
                 
              </Box> 
          </HStack>
            <HStack  space="4" alignItems="center"  justifyContent={'end'} w={'100%'}>
              {/* <Box flexDirection={'row'} justifyContent={'space-between'} style> */}
              <Text fontSize="md" >Order number:45124</Text>
              <Text fontSize="md" >Order date:15-02-2024</Text>
                {/* </Box> */}
            </HStack>
          <HStack  mt={'14px'} alignItems="flex-start" justifyContent={'center'} flexDirection={'column'} w={'100%'}>
              <HStack space={[15, 93]} flexDirection={'row'} w={'100%'} alignItems={'center'}  bg={'primary.darkbox'} p={'2'}
              roundedTop={'md'} 
              >
                  <Text fontSize="md">Qty</Text>
                  <Text fontSize="md">Items</Text>
                </HStack>
            
                {Array(10).fill('').map((item,index,arr)=>{
                    return(
                        <HStack space={[15,93]} flexDirection={'row'} w={'100%'} minWidth={'224'} 
                        justifyContent={'flex-start'}
                        alignItems={'center'}  bg={'primary.box'} p={'5'}
                            borderBottomColor={"primary.bordercolor"}
                            roundedBottom={index == arr.length - 1 ? "md" : ""}
                            borderBottomWidth={index !== arr.length-1?"1":"0"}

                        >
                            <Text fontSize="md">1</Text>
                            <Text fontSize="md">General admission ticket</Text>

                        </HStack>
                    )
                })}
           
            </HStack>
      </VStack>
  )
}

export default CheckInDetails