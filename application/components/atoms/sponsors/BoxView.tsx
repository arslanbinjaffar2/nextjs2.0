import React, { useEffect, useState } from 'react'
import { Box, Image, Spacer, Text, Center, HStack, IconButton, Icon, Pressable, ZStack, Popover, Button, Spinner } from 'native-base'
import { Sponsor, Category } from 'application/models/sponsor/Sponsor'
import DynamicIcon from 'application/utils/DynamicIcon';
import UseEnvService from 'application/store/services/UseEnvService';
import UseSponsorService from 'application/store/services/UseSponsorService';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'solito/router'
import UseEventService from 'application/store/services/UseEventService';
import ExhibitorDefaultImage from 'application/assets/images/exhibitors-default.png';
import UseToastService from 'application/store/services/UseToastService';
import { Linking } from 'react-native';
import { colorText } from 'application/styles/colors';
import UseLoadingService from 'application/store/services/UseLoadingService';
import in_array from 'in_array';


type AppProps = {
    sponsor: Sponsor,
    k: number
    w?: string
    screen?: string
}

const BoxView = ({ k, sponsor, w, screen }: AppProps) => {

    const { _env } = UseEnvService()
    const {AddToast}=UseToastService()
    const { settings, MakeFavourite } = UseSponsorService();
		const { processing }=UseLoadingService();

    const { push } = useRouter()

    const { event } = UseEventService()

    const [isFav,setIsFav] = useState(false)

    useEffect(() => {
        if (sponsor.attendee_sponsors.length > 0) {
            setIsFav(true)
        }else{
            setIsFav(false)
        }
    }, [sponsor.attendee_sponsors])
    
    function toggleFav(){
       if(in_array( `sponsor-fav-${sponsor.id}`,processing)){
            return;
        }
        setIsFav(!isFav);
         MakeFavourite({ sponsor_id: sponsor.id, screen: screen ? screen : 'listing' });
    }
   const [isOpen,setIsOpen]=useState(false)
    return (
        <>
            <Box w={['100%',w ? w : '49%']}>
                <Pressable
                onPress={async () => {
                    if(sponsor?.url && sponsor?.url !== '' && sponsor.url !== 'http://' && sponsor.url !== 'https://'){
                        const url: any = `${sponsor?.url}`;
                        const supported = await Linking.canOpenURL(url);
                        if (supported) {
                            await Linking.openURL(url);
                        }}
                    else{
                        push(`/${event.url}/sponsors/detail/${sponsor.id}`)
                    }
                }}
                    >
                    <Box mb="3" w="100%" bg="primary.box" justifyContent={'flex-end'} p="0" borderWidth="0" borderColor="primary.box" rounded="10">
                        <Text mx={'auto'} isTruncated maxWidth={'75%'} minHeight={'27px'} fontSize="lg" fontWeight={500} textAlign={'center'} my={2}>{event?.sponsor_settings?.sponsorName ? sponsor?.name : ''}</Text>
                        {settings?.mark_favorite === 1 && (
													<Box  position={'absolute'}
                                zIndex={'999999'}
                                right={'4px'}
                                top={'7px'}>
																	 {in_array(`sponsor-fav-${sponsor.id}`,processing) ? (
																				<Spinner width={28} height={28} color={isFav ? 'secondary.500' : 'primary.text'} size="sm"  />
																		):(
																				 <IconButton
																						bg="transparent"
																						p="1"
																						rounded={'full'}
																					_hover={{ bg: 'transparent', _icon: { color: !isFav ? "secondary.500" : "primary.text",name: !isFav ? 'heart' : 'heart-outline' } }}
																						icon={<Icon size="md" as={Ionicons} name={isFav ? 'heart' : 'heart-outline'} color={isFav ? "secondary.500" : "primary.text"} />}
																						onPress={() => {
																								toggleFav();
																						}}
																					
																				/>
																		)}
                           
													</Box>
                        )}
                        <Center mb={3} px="1" alignItems="center" w="100%">
                            {sponsor.logo ? (
                                <Image source={{ uri: `${_env.eventcenter_base_url}/assets/sponsors/large/${sponsor.logo}` }} alt="" w="210px" h="72px" />
                            ) : (
                                <Image source={ExhibitorDefaultImage} alt="" w="210px" h="72px" />
                            )}
                        </Center>
                        <HStack mb={3} space="3" minHeight={'25px'} alignItems="center"  position={'relative'}>
                            {settings?.catTab == 1 && sponsor?.categories.length > 0 && 
                            <HStack alignItems="flex-start" minH={'25px'}  position={'relative'}>
                                <Center alignItems="flex-start" w='120px'  p="0">
                                        <ZStack bg={'primary.400'} minH={'25px'}  position={'relative'} reversed >
                                        {sponsor?.categories.length > 0 && sponsor?.categories.slice(0,3).map((cat, i)=>(
                                            <Pressable
                                            onPress={()=>setIsOpen(true)}
                                            >                                        
                                            <Box
                                        
                                            key={cat.id} bg={cat.color} borderWidth="1"  borderColor="primary.bdBox" borderRightRadius="10" h={'25px'} shadow="1"  w={`${(measureText(sponsor?.categories[0]?.info.name, 14) > 140 ? 140 :  measureText(sponsor?.categories[0]?.info.name, 14)) + 16 + (i * 10)}px`} px="2">
                                                {i== 0 && <Text color={colorText(cat.color)} isTruncated lineHeight={25}  fontSize="sm" >{cat?.info?.name}</Text>}
                                            </Box>
                                            </Pressable>
                                        ))}
                                            {sponsor?.categories.length<=3 &&<Popover
                                                isOpen={isOpen}
                                                placement='top'
                                                onClose={()=>setIsOpen(false)}
                                                trigger={(triggerProps) => {
                                                    return <Button
                                                        bg={'transparent'}
                                                        px={1}
                                                        py={0}
                                                        mr={2}
                                                        position={'relative'}
                                                        top={'1'}
                                                        // left={`${(measureText(sponsor?.categories[0]?.info.name, 14) > 140 ? 140 : measureText(sponsor?.categories[0]?.info.name, 14)) + 28 + (1 * 10)}px`}
                                                        rounded={'full'}
                                                        {...triggerProps}
                                                    >
                                                        {/* {sponsor?.categories.length > 0 && sponsor?.categories.slice(0, 3).map((cat, i) => (
                                                            <Box key={cat.id} bg={cat.color} borderWidth="1" borderColor="primary.bdBox" borderRightRadius="10" h={'25px'} shadow="1" 
                                                            w={`${(measureText(sponsor?.categories[0]?.info.name, 14) > 140 ? 140 : measureText(sponsor?.categories[0]?.info.name, 14)) + 16 + (i * 10)}px`} px="2">
                                                                {i == 0 && <Text color={colorText(cat.color)} isTruncated lineHeight={25} fontSize="sm">{cat?.info?.name}</Text>}
                                                            </Box>
                                                        ))} */}
                                                    </Button>
                                                }}>
                                                <Popover.Content borderColor={'primary.500'} bgColor={'primary.500'}>
                                                    <Popover.Arrow borderColor={'primary.500'} bgColor={'primary.500'} />
                                                    <Popover.Body borderTopWidth="0" borderColor={'primary.500'} bgColor={'primary.500'}>
                                                        <HStack flexWrap={'wrap'} maxW={350} minW={240} space={1}>
                                                            {sponsor.categories.map((category: Category, i: number) => (
                                                                <Box mb="5px" display={'block'} flexShrink={1} key={i} px={3} py={1} bg={category?.color} rounded={'full'}>
                                                                    <Text color={colorText(category.color)} fontSize="sm">{`${category.info.name}`}</Text>
                                                                </Box>
                                                            ))}
                                                        </HStack>
                                                    </Popover.Body>
                                                </Popover.Content>
                                            </Popover>}
																			{settings?.catTab == 1 &&  sponsor.categories.length > 3 &&
																				<>
																				<Spacer />
																					<Popover
																						trigger={(triggerProps) => {
																						return <Button
                                                                                                        _hover={{_text: {color: 'primary.hovercolor'}}}
																										bg={'transparent'}
																										px={1}
																										py={0}
																										mr={2}
                                                                                                        _text={{fontSize: 'sm', lineHeight: 24}}
																										position={'relative'}
																										left={`${(measureText(sponsor?.categories[0]?.info.name, 14) > 140 ? 140 :  measureText(sponsor?.categories[0]?.info.name, 14)) + 28 + (1 * 10)}px`}
																										rounded={'full'}
																										{...triggerProps}
																									>
                                                                                                            {`+${ sponsor.categories.length - 3}`}
																									</Button>
																								}}>
																						<Popover.Content borderColor={'primary.500'} bgColor={'primary.500'}>
																							<Popover.Arrow borderColor={'primary.500'} bgColor={'primary.500'} />
																							<Popover.Body borderTopWidth="0" borderColor={'primary.500'} bgColor={'primary.500'}>
																							<HStack flexWrap={'wrap'} maxW={350} minW={240} space={1}>
																								{sponsor.categories.length > 3 && sponsor.categories.map((category: Category, i: number) =>(
																										<Box mb="5px" display={'block'} flexShrink={1} key={i} px={3} py={1} bg={category?.color} rounded={'full'}>
																												<Text color={colorText(category.color)} fontSize="sm">{`${category.info.name}`}</Text>
																										</Box>
																								))}
																							</HStack>
																							</Popover.Body>
																						</Popover.Content>
																					</Popover>
																					
																					</>}

                                    </ZStack>
                                </Center>
                            </HStack>}
														<Spacer />
                            <Center pr={2} alignItems="flex-end">
                                {sponsor.booth && <HStack space="2" alignItems="center">
                                    <DynamicIcon iconType="exhibitors" iconProps={{ width: 16, height: 16 }} />
                                    <Text maxW={'80px'} isTruncated fontSize="sm">{sponsor.booth}</Text>
                                </HStack>}
                            </Center>
                        </HStack>
                    </Box>
                </Pressable>
            </Box>
            {(k + 1) % 2 === 1 && (
                <Spacer w="2%" />
            )}
        </>
    )
}

export default BoxView

function measureText(str:string, fontSize:number) {
    const widths = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0.2796875,0.2765625,0.3546875,0.5546875,0.5546875,0.8890625,0.665625,0.190625,0.3328125,0.3328125,0.3890625,0.5828125,0.2765625,0.3328125,0.2765625,0.3015625,0.5546875,0.5546875,0.5546875,0.5546875,0.5546875,0.5546875,0.5546875,0.5546875,0.5546875,0.5546875,0.2765625,0.2765625,0.584375,0.5828125,0.584375,0.5546875,1.0140625,0.665625,0.665625,0.721875,0.721875,0.665625,0.609375,0.7765625,0.721875,0.2765625,0.5,0.665625,0.5546875,0.8328125,0.721875,0.7765625,0.665625,0.7765625,0.721875,0.665625,0.609375,0.721875,0.665625,0.94375,0.665625,0.665625,0.609375,0.2765625,0.3546875,0.2765625,0.4765625,0.5546875,0.3328125,0.5546875,0.5546875,0.5,0.5546875,0.5546875,0.2765625,0.5546875,0.5546875,0.221875,0.240625,0.5,0.221875,0.8328125,0.5546875,0.5546875,0.5546875,0.5546875,0.3328125,0.5,0.2765625,0.5546875,0.5,0.721875,0.5,0.5,0.5,0.3546875,0.259375,0.353125,0.5890625]
    const avg = 0.5279276315789471
  return Array.from(str).reduce(
    (acc, cur) => acc + (widths[cur.charCodeAt(0)] ?? avg), 0
  ) * fontSize
}




// function PopUp({children}:{children:React.ReactChildren}){
// return(
//     <>
//         <Popover
//             trigger={(triggerProps) => {
//                 return <Button
//                     bg={'transparent'}
//                     px={1}
//                     py={0}
//                     mr={2}
//                     position={'relative'}
//                     // left={`${(measureText(sponsor?.categories[0]?.info.name, 14) > 140 ? 140 : measureText(sponsor?.categories[0]?.info.name, 14)) + 28 + (1 * 10)}px`}
//                     rounded={'full'}
//                     {...triggerProps}
//                 >
//                     {sponsor?.categories.length > 0 && sponsor?.categories.slice(0, 3).map((cat, i) => (
//                         <Box key={cat.id} bg={cat.color} borderWidth="1" borderColor="primary.bdBox" borderRightRadius="10" h={'25px'} shadow="1"
//                             w={`${(measureText(sponsor?.categories[0]?.info.name, 14) > 140 ? 140 : measureText(sponsor?.categories[0]?.info.name, 14)) + 16 + (i * 10)}px`} px="2">
//                             {i == 0 && <Text color={colorText(cat.color)} isTruncated lineHeight={25} fontSize="sm">{cat?.info?.name}</Text>}
//                         </Box>
//                     ))}
//                 </Button>
//             }}>
//             <Popover.Content borderColor={'primary.500'} bgColor={'primary.500'}>
//                 <Popover.Arrow borderColor={'primary.500'} bgColor={'primary.500'} />
//                 <Popover.Body borderTopWidth="0" borderColor={'primary.500'} bgColor={'primary.500'}>
//                     <HStack flexWrap={'wrap'} maxW={350} minW={240} space={1}>
//                         {sponsor.categories.map((category: Category, i: number) => (
//                             <Box mb="5px" display={'block'} flexShrink={1} key={i} px={3} py={1} bg={category?.color} rounded={'full'}>
//                                 <Text color={colorText(category.color)} fontSize="sm">{`${category.info.name}`}</Text>
//                             </Box>
//                         ))}
//                     </HStack>
//                 </Popover.Body>
//             </Popover.Content>
//         </Popover>
//     </>
// )
// }