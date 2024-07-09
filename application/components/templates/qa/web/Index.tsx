import React, { useEffect } from 'react'
import { Box, Container, HStack, Icon, IconButton, Pressable, Spacer, Text, VStack, ZStack, View, Center } from 'native-base';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import Slider from "react-slick";
import UseLoadingService from 'application/store/services/UseLoadingService';
import UseProgramService from 'application/store/services/UseProgramService';
import WebLoading from 'application/components/atoms/WebLoading';
import in_array from "in_array";
import moment from 'moment';
import { useWindowDimensions } from 'react-native';
import { useRouter } from 'solito/router';
import { useRouter as AA } from 'next/router';
import AntDesign from '@expo/vector-icons/AntDesign';
import UseEventService from 'application/store/services/UseEventService';
import NextBreadcrumbs from 'application/components/atoms/NextBreadcrumbs';
import SectionLoading from 'application/components/atoms/SectionLoading';
import { Platform } from 'react-native';
import IntersectionObserverComponent from 'application/components/atoms/IntersectionObserverComponent';

const LazySlider = ({ programs, onChange }: any) => {

	const { width } = useWindowDimensions();
	const [currentIndex, setCurrentIndex] = React.useState<number>(0);
	const sliderRef = React.useRef<Slider>(null);
	const router = AA();
	React.useEffect(() => {
		let indexFromQuery = router.asPath.split('currentIndex=')[1];
		const currentIndex = indexFromQuery ? parseInt(indexFromQuery) : 0;
		setCurrentIndex(currentIndex);
	}, [])
	const settings = {
		dots: false,
		arrows: false,
		infinite: false,
		speed: 500,
		swipe: true,
		slidesToShow: 7,
		slidesToScroll: 3,
		swipeToSlide: true,
		focusOnSelect: true,
		responsive: [
			{
				breakpoint: 600,
				settings: {
					infinite: false,
					slidesToShow: 3,
					slidesToScroll: 1,
				}
			},
		]
	};
	return (
		<>
			<Box mt={'4'} mb={1} bg={'primary.darkbox'} w={'100%'} p={4}>
				<HStack w={['100%']}>
					<View w={[width - 120, width - 120, 'calc(100% - 70px)']}>
						<Slider
							ref={sliderRef}
							{...settings}>
							{programs?.map((item: any, index: any) =>
								<Pressable key={index} onPress={() => {
									setCurrentIndex(index);
									onChange(index)

								}}>
									<Box justifyContent={'center'} display={'flex'} alignItems={'center'} w={'60px'} h={'60px'} px={2} bg={currentIndex === index ? "secondary.500" : "primary.box"} rounded="md">
										<VStack space="1">
											<Text fontSize={'sm'} textTransform={'uppercase'} textAlign={'center'} fontWeight={'400'} color={currentIndex === index ? "primary.text" : "primary.text"}>{moment(item[0]?.date).format('ddd')}</Text>
											<Text fontSize={'md'} textAlign={'center'} color={currentIndex === index ? "primary.text" : "primary.text"} fontWeight={500}>{moment(item[0]?.date).format('D')}</Text>
										</VStack>

									</Box>
								</Pressable>
							)
							}
						</Slider>
					</View>
					<Spacer />
					{programs.length > 7 && <HStack space="0" alignItems="center">
						<Center>
							<IconButton
								variant="unstyled"
								p={1}
								icon={<Icon size="md" as={AntDesign} name="left" color="primary.text" />}
								onPress={() => {
									if (sliderRef.current) {
										sliderRef.current.slickPrev();
									}
								}}
							/>
						</Center>
						<Center>
							<IconButton
								variant="unstyled"
								p={1}
								icon={<Icon size="md" as={AntDesign} name="right" color="primary.text" />}
								onPress={() => {
									if (sliderRef.current) {
										sliderRef.current.slickNext();
									}
								}}
							/>
						</Center>

					</HStack>}

				</HStack>
			</Box>
		</>
	)
}

const Index = () => {

    const mounted = React.useRef(false);

    const { processing } = UseLoadingService();
    const router = AA();
    const { event, modules } = UseEventService();

    const [tab, setTab] = React.useState<'pending'| 'completed'>('pending')

    const [query, setQuery] = React.useState('');
    
    const { programs, FetchPrograms, track_id, page, total_pages} = UseProgramService();
    
    const { push } = useRouter()

    const [dates, setDates] = React.useState<any>([]);
	  const [currentIndex, setCurrentIndex] = React.useState<number>();

    React.useEffect(() => {
      let indexFromQuery = router.asPath.split('currentIndex=')[1];
      const currentIndex = indexFromQuery ? parseInt(indexFromQuery) : 0;
      setDates(programs[currentIndex]);
      setCurrentIndex(currentIndex);
    }, [])
  
    React.useEffect(() => {
      if (currentIndex !== undefined) {
        const queryParams = { ...router.query, ['currentIndex']: currentIndex };
  
        router.push({
          pathname: router.pathname,
          query: queryParams,
        });
  
      }
    }, [currentIndex]);
  
    React.useEffect(() => {
      console.log(programs, 'programs')
      if (currentIndex !== undefined) {
        setDates(programs[currentIndex]);
      }
    }, [programs])

    React.useEffect(() => {
      mounted.current = true;
        return () => { mounted.current = false; };
    }, []);

    function loadMore() {
      if (mounted.current) {
        FetchPrograms({ query: query, page: page + 1, screen: "qa", id: 0, track_id: track_id });
      }
    }

    useEffect(() => {
        // FetchPrograms();
        FetchPrograms({ page: 1, query: '', screen: 'qa', id: 0, track_id: track_id });
    }, []);

    const module = modules.find((module) => module.alias === 'qa');
    const handleChange = (value: any) => {
      setCurrentIndex(value);
      setDates(programs[value]);
    }
  return (
    <>
    {
        in_array('qa-listing', processing) ? (
            <WebLoading />
        ):(
          <>
            <NextBreadcrumbs module={module} />
          
        <Container pt="2" maxW="100%" w="100%">
        <HStack mb="3" pt="2" w="100%" space="3" alignItems="center">
          <Text  fontSize="2xl">Ask a question</Text>
        </HStack>
        {programs.length > 0 && dates?.length > 0 ?
        <Box w="100%" rounded="10" bg="primary.box" borderWidth="0" borderColor="primary.bdBox">
        {programs.length > 0 && <LazySlider onChange={handleChange} programs={programs} />}
          {programs.length > 0 && dates?.length > 0 && dates?.map((program: any, k: any) =>
            <Box w="100%" key={k} borderTopWidth={k === 0 ? 0 : 1} borderColor="primary.bordercolor" py="3">
              <Pressable onPress={() => { push(`/${event.url}/qa/detail/${program.id}`) }}>
              <HStack pl="30px" alignItems="center" minH="55px" space={0} justifyContent="flex-start">
              {Platform.OS === 'web' && event?.agenda_settings?.show_tracks == 1 && <Box  width={['35px','35px']} h={'55px'} ml="-30px">
                    <ZStack top={'50%'} mt={`-${program.program_tracks.slice(0,3).length === 3 ?  10 : program.program_tracks.slice(0,3).length === 2 ? 20 : 30 }px`}  reversed>
                      {program?.program_tracks?.length > 0 && program.program_tracks.slice(0,3).map((track: any, i: number) =>
                        <Box key={i} bg={track.color ? track.color : '#fff'} borderWidth="1" borderColor="primary.darkbox" w={'15px'} top={`-${i*10}px`}   height={`${i === 0 && program?.program_tracks?.length === 1 ? '55px' : '35px'}`} borderRightRadius="10" shadow={2} />
                      )}
                    </ZStack>
                  </Box>}
                <HStack pt="0" w="100%" space="5" alignItems="center" justifyContent="space-between">
                <VStack w={["45px","60px"]} space="0">
                      {(event.agenda_settings?.agenda_display_time == 1 && program?.hide_time == 0)  &&<>
                      <Text lineHeight="22px">{moment(`${program.date} ${program.start_time}`).format('HH:mm')}</Text>
                      <Text lineHeight="22px">{moment(`${program.date} ${program.end_time}`).format('HH:mm')}</Text>
                      </>}
                    </VStack>
                  <VStack maxW={['calc(100% - 148px)','calc(100% - 175px)']} space="1">
                    <Pressable
                      onPress={() => {
                        push(`/${event.url}/qa/detail/${program.id}`)
                      }}
                    >
                    <Text fontSize="md" lineHeight="22px">
                      {program?.topic}
                    </Text>
                    </Pressable>

                  </VStack>

                  <Spacer />
                  <HStack pr="3" space="5" alignItems="center">
                    <IconButton
                      bg="transparent"
                      p="1"
                      _hover={{ bg: 'transparent' }}
                      icon={<Icon size="md" as={SimpleLineIcons} name="arrow-right" color="primary.text" />}
                      onPress={() => {
                        push(`/${event.url}/qa/detail/${program.id}`)
                      }}

                    />
                  </HStack>
                </HStack>
              </HStack>
              </Pressable>
            </Box>)}
        </Box>
        : <SectionLoading />}
        {page < total_pages && total_pages > 1 &&
          <IntersectionObserverComponent onIntersect={loadMore} />
        }
      </Container>
      </>)
    }
    </>
  )
}

export default Index


