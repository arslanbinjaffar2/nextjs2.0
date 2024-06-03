import * as React from 'react';
import { Center, Heading, HStack, Icon, IconButton, Text, FlatList, Box, Pressable, VStack, View, Spacer, Button } from 'native-base';
import Slider from "react-slick";
import RectangleDetailView from 'application/components/atoms/programs/RectangleDetailView';
import WorkshopCollapsableView from 'application/components/atoms/programs/WorkshopCollapsableView';
import WorkshopRectangleDetailView from 'application/components/atoms/programs/workshops/RectangleDetailView';
import { Program } from 'application/models/program/Program'
import UseLoadingService from 'application/store/services/UseLoadingService';
import { Platform, useWindowDimensions } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import in_array from "in_array";
import UseEventService from 'application/store/services/UseEventService';
import UseProgramService from 'application/store/services/UseProgramService';
import { useRouter } from 'next/router';
import moment from 'moment';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import Icocalendar from 'application/assets/icons/small/Icocalendar'

type AppProps = {
	programs: Program[],
	section: string,
	my?: number,
	speaker?: number
	dashboard?: boolean,
	screen?: string
}

const LazySlider = ({ programs, onChange }: any) => {

	const { width } = useWindowDimensions();
	const sliderRef = React.useRef<Slider>(null);
	const router = useRouter();
	const { select_day } = UseProgramService();

	const [currentIndex, setCurrentIndex] = React.useState<number>(() => {
		let indexFromQuery = router.asPath.split('currentIndex=')[1];
		let currentIndex = 0;
		if(indexFromQuery){
			currentIndex = parseInt(indexFromQuery);
		}else if(select_day) {
			currentIndex=select_day;
		}
		return currentIndex;
	});

	const settings = {
		dots: false,
		arrows: false,
		infinite: false,
		speed: 500,
		swipe: true,
		initialSlide: currentIndex,
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
			<Box mt={'2'} mb={1} bg={'primary.darkbox'} w={'100%'} p={4}>
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
const SlideView = ({ programs, section, my, speaker, dashboard, screen }: AppProps) => {

	const { setScrollCounter, scroll, processing } = UseLoadingService();

	const { event, modules } = UseEventService();

	const [dates, setDates] = React.useState<any>([]);
	const [currentIndex, setCurrentIndex] = React.useState<number>();
	const router = useRouter();
	const { select_day } = UseProgramService();
	const [selectedMonth,setSelectedMonth] = React.useState<string>('');


	React.useEffect(() => {
		let indexFromQuery = router.asPath.split('currentIndex=')[1];
		let currentIndex = 0;
		if(indexFromQuery){
			currentIndex = parseInt(indexFromQuery);
		}else if(select_day) {
			currentIndex=select_day;
		}
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
			console.log('monthsL: ', programs)
			// setSelectedMonth('');

		}else{
			// setSelectedMonth('');
		}
	}, [currentIndex]);

	React.useEffect(() => {
		console.log(programs, 'programs')
		if (currentIndex !== undefined) {
			setDates(programs[currentIndex]);
		}
	}, [programs])

	React.useEffect(() => {
		if(dates && dates.length > 0){
			setSelectedMonth(moment(dates[0]?.date).format('MMMM YYYY'));
		}
	}, [dates])


	const RenderPrograms = ({ programs, dates, currentIndex, setCurrentIndex, dashboard,handleShowAllButton,limit }: any) => {
		const [skipShowAllCalculation,setSkipShowAllCalculation]=React.useState<boolean>(false);
		
		React.useEffect(()=>{
			if(!skipShowAllCalculation && dashboard == true){
				dates?.map((program: Program, key: number) => {
					if (program?.workshop_programs?.length > limit) {
						handleShowAllButton(true);
						setSkipShowAllCalculation(true);
						return false;
					}
					else {
						handleShowAllButton(false);
					}
				});

			}else{
				setSkipShowAllCalculation(false);
			}
		},[dates])

		return (
			<>
				
				{dates?.length > 0 && currentIndex !== undefined && <>

					{dates?.map((program: Program, key: number) => {
						if (program?.workshop_programs?.length > 0) {
							let newProgram = { ...program };
							if (dashboard == true) {
								newProgram.workshop_programs = dates.length <= limit ? program.workshop_programs.slice(0, (limit)) : (dates.length > limit ? program.workshop_programs.slice(0, 1) : program.workshop_programs);
							}
							return <WorkshopCollapsableView currentIndex={currentIndex} section={section} speaker={speaker} program={newProgram} k={key} border={dates?.length !== (key + 1) && !dates[key + 1]?.workshop_programs} />
						}
						else {
							return <RectangleDetailView currentIndex={currentIndex} workshop={false} section={section} speaker={speaker} program={program} k={key} border={dates?.length !== (key + 1) && !dates[key + 1]?.workshop_programs} />
						}
					}
					)}
				</>}
			</>
		)
	}

	const totalPrograms = (programs: any) => {
		let total = 0;
		programs.forEach((program: any) => total += program.length);
		return total;
	}
	const handleChange = (value: any) => {
		setCurrentIndex(value);
		setDates(programs[value]);
	}
	const { push } = useRouter();
	const limit = 5;
	const [showAllButton,setShowallButton]=React.useState<boolean>(false);
	function handleShowAllButton(workshopsMoreThanLimit:boolean){
		if(dashboard != true){
			setShowallButton(false);
			return;
		}

		if(workshopsMoreThanLimit || (dates?.length > limit)){
			setShowallButton(true);
		}else{
			setShowallButton(false);
		}
	}
	return (
		<>
			{in_array(section, ['program', 'my-program', 'track-program']) && (
				<>
					{Platform.OS === 'web' ? (
						<>
							{screen && screen !== 'qa' &&
								<Heading pt="2" fontSize="26px" w="100%" textAlign="center" fontWeight={500}>
								{section === 'program' || section === 'track-program' ? modules?.find((module) => (module.alias == 'agendas'))?.name:null}
								{section === 'my-program' ? modules?.find((module) => (module.alias == 'myprograms'))?.name:null}
								</Heading>
							}
							{selectedMonth && <HStack space={2} alignItems={'center'} px={4} marginTop={screen && screen === 'qa' ? 2 : 0}><Icocalendar width={20} height={20} /><Text fontWeight={500} fontSize="lg">{selectedMonth}</Text>
							</HStack>}
							<LazySlider onChange={handleChange} programs={programs} />
							{programs?.length > 0 && <RenderPrograms handleShowAllButton={handleShowAllButton} limit={limit} programs={programs} dates={dashboard == true ? dates?.slice(0, limit) : dates} dashboard={dashboard} currentIndex={currentIndex} setCurrentIndex={setCurrentIndex} />}
							{programs?.length <= 0 &&
								<Box overflow="hidden" w="100%" rounded="lg">
									<Box padding={5}>
										<Text>{event?.labels?.GENERAL_NO_RECORD}</Text>
									</Box>
								</Box>
							}
							{showAllButton && <Center py="3" px="2" w="100%" alignItems="flex-end">
								<Button onPress={() => {
								push(`/${event.url}/agendas?currentIndex=${currentIndex}`)
								}} p="1" _hover={{ bg: 'transparent', _text: { color: 'primary.500' }, _icon: { color: 'primary.500' } }} bg="transparent" width={'auto'} rightIcon={<Icon as={SimpleLineIcons} name="arrow-right" size="sm" />}>
								{event.labels?.GENERAL_SEE_ALL}
								</Button>
							</Center>}

						</>
					) : (
						<FlatList
							style={{ width: '100%' }}
							data={programs}
							renderItem={({ item }: any) => {
								return (
									<>
										{programs.length > 0 && <LazySlider onChange={handleChange} programs={programs} />}
										<RenderPrograms programs={item} />
									</>
								);
							}}
							keyExtractor={(item, index) => index.toString()}
							onEndReached={async () => {
								if (totalPrograms(programs) >= 20) {
									setScrollCounter(scroll + 1);
								}
							}}
							onEndReachedThreshold={0.1}
						/>
					)}
				</>
			)}
			{section === 'workshops' && (
				programs?.map((program: any, key: any) =>
					<WorkshopRectangleDetailView key={key} program={program} k={key} />
				)
			)}
		</>
	);
};

export default SlideView;
