import { useState } from 'react'
import useMapplicStore from './MapplicStore'
import { motion, AnimatePresence } from 'framer-motion'
import AntDesign from '@expo/vector-icons/AntDesign';
import { RouteButton } from './Routes'
import { replaceVars } from './utils'
import classNames from 'classnames'
import { HStack, Icon, Link, View, Text, Spacer, IconButton } from 'native-base';
import { useRouter } from 'solito/router';

export const Popup = ({location, type}) => {
	const closeLocation = useMapplicStore(state => state.closeLocation);
	const settings = useMapplicStore(state => state.data.settings);
	const { push } = useRouter();

	const [details, setDetails] = useState(false);

	return (
		<>
			<HStack pt={1} pr={2} w={'100%'} justifyContent={'flex-end'} space="3" alignItems="center">
				<IconButton
				variant="unstyled"
				size={'xm'}
				icon={<Icon size="md" as={AntDesign} name="close" color="#888" />}
				onPress={closeLocation}
				
			/>
			</HStack>
			
			{ location.image && (
				<View pb={3} position={'relative'} zIndex={8} display={'flex'} alignItems={'center'} justifyContent={'center'} w={'100%'} >
					<img style={{maxWidth: '120px'}} src={location.image} alt={location?.title} />
				</View>
			)}
			<View px={4} width={'100%'}>
				<HStack mb={2} space="3" alignItems="center">
					{ location.title && <Text fontSize={'16px'} fontWeight={500}>{location.title}</Text> }
					<Spacer />
					{ location.about && <Text fontSize="md"><div dangerouslySetInnerHTML={{__html: replaceVars(location, 'about')}} /></Text>
					 }
					
				</HStack>
				
				{ location?.desc && <div className="mapplic-popup-body" dangerouslySetInnerHTML={{__html: replaceVars(location)}}></div> }

				<Details location={location} field={details} />

				{ (location?.link || location?.hours || location?.phone || settings.wayfinding) && (
					<>
					{ location.link && <HStack mt={2} justifyContent={'center'} alignItems={'center'} w={'100%'} px={3} py={2} borderColor={'#888'} borderTopWidth={1}>
						<Link px={6} py={1} rounded={'full'} shadow={2}  fontSize={'lg'} bg={'primary.500'} color={'primary.hovercolor'} onPress={() => push(location.link)}><Text fontSize="md">Detail</Text>
						 <Icon ml={2} mt={1} color={'primary.hovercolor'} as={AntDesign} name="rightcircleo"  />
						</Link>
						
					</HStack>}
					</>
				)}
			</View>
		</>
	)
}

const Details = ({location, field}) => {
	return (
		<AnimatePresence mode="sync">
			{ field && (
				<motion.div className="mapplic-popup-details" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
					{ field === 'phone' && <a className="mapplic-phone" href={`tel:${location.phone}`}>{location.phone}</a> }
					{ field === 'hours' && <div className="mapplic-hours">{ location?.hours?.split(';').map((line, i) => <div key={i}>{line}</div>) }</div> }
				</motion.div> 
			)}
		</AnimatePresence>
	)
}

const DetailButton = ({location, field, details, setDetails, children}) => {
	if (!location[field]) return null;

	return (
		<button
			className={classNames('mapplic-button mapplic-button-icon', {'mapplic-active': details === field})}
			onClick={() => setDetails(prev => prev === field ? false : field )}
		>
			{ children }
		</button>
	)
}