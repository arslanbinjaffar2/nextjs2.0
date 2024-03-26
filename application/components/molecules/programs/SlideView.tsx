import * as React from 'react';
import { Center, Heading, HStack, Icon, IconButton, Text, FlatList, Box, Pressable, VStack, View, Spacer } from 'native-base';
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
import { useRouter } from 'next/router';
import moment from 'moment';

type AppProps = {
	programs: Program[],
	section: string,
	my?: number,
	speaker?: number
	dashboard?: boolean
}

const LazySlider = ({ programs, onChange }: any) => {

	const { width } = useWindowDimensions();
	const [currentIndex, setCurrentIndex] = React.useState<number>(0);
	const sliderRef = React.useRef<Slider>(null);
	const router = useRouter();
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
const SlideView = ({ programs, section, my, speaker, dashboard }: AppProps) => {

	const { setScrollCounter, scroll, processing } = UseLoadingService();

	const { event, modules } = UseEventService();

	const [dates, setDates] = React.useState<any>([]);
	const [currentIndex, setCurrentIndex] = React.useState<number>();
	const router = useRouter();


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


	const RenderPrograms = ({ programs, dates, currentIndex, setCurrentIndex, dashboard }: any) => {

		return (
			<>
				
				{dates?.length > 0 && currentIndex !== undefined && <>

					{dates?.map((program: Program, key: number) => {
						if (program.workshop_programs?.length > 0) {
							let newProgram = { ...program };
							if (dashboard == true) {
								newProgram.workshop_programs = dates.length <= 5 ? program.workshop_programs.slice(0, (5 - (dates.length - 1))) : (dates.length > 5 ? program.workshop_programs.slice(0, 1) : program.workshop_programs);
							}
							return <WorkshopCollapsableView section={section} speaker={speaker} program={newProgram} k={key} border={dates?.length !== (key + 1) && !dates[key + 1]?.workshop_programs} />
						}
						else {
							return <RectangleDetailView workshop={false} section={section} speaker={speaker} program={program} k={key} border={dates?.length !== (key + 1) && !dates[key + 1]?.workshop_programs} />
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
	return (
		<>
			{in_array(section, ['program', 'my-program', 'track-program']) && (
				<>
					{Platform.OS === 'web' ? (
						<>
							<LazySlider onChange={handleChange} programs={programs} />
							{programs.length > 0 && <RenderPrograms programs={programs} dates={dashboard == true ? dates.slice(0, 5) : dates} dashboard={dashboard} currentIndex={currentIndex} setCurrentIndex={setCurrentIndex} />}
							{programs.length <= 0 &&
								<Box overflow="hidden" bg="primary.box" w="100%" rounded="lg">
									<Box padding={5}>
										<Text>{event?.labels?.EVENT_NORECORD_FOUND}</Text>
									</Box>
								</Box>
							}

						</>
					) : (
						<FlatList
							style={{ width: '100%' }}
							data={programs}
							renderItem={({ item }: any) => {
								return (
									<>
										<LazySlider onChange={handleChange} programs={programs} />
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
