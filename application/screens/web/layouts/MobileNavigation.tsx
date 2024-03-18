import React from 'react';
import {  useWindowDimensions } from 'react-native';
import { Box, View, Pressable, Text, HStack, Center, IconButton, Icon, VStack } from 'native-base'
import { SafeAreaView } from "react-native-safe-area-context";
import Slider from "react-slick";
import IcoDashboard from 'application/assets/icons/IcoDashboard';
import DynamicIcon from 'application/utils/DynamicIcon';
import AntDesign from '@expo/vector-icons/AntDesign';
import UseEventService from '../../../store/services/UseEventService'
import UseEnvService from 'application/store/services/UseEnvService'
import { useRouter } from 'solito/router'
import in_array from 'in_array'
import IcoLogin from 'application/assets/icons/IcoLogin'
import UseAuthService from 'application/store/services/UseAuthService'


const MobileNavigation = () => {
  const { event, modules } = UseEventService()
  const { push, back } = useRouter()
  const { response } = UseAuthService();
  const router = useRouter()
  const width = useWindowDimensions();
  const sliderRef = React.useRef<Slider>(null);
   const settings = {
      dots: false,
      arrows: false,
      infinite: false,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
      swipeToSlide: true,
    };
  return (
    <SafeAreaView edges={['left']}>
      <HStack pt={4} space="0" alignItems="center">
        <Center  size="8">
          <IconButton
            variant="unstyled"
            icon={<Icon size="md" as={AntDesign} name="left" color="primary.text" />}
            onPress={()=>{
              if (sliderRef.current) {
                sliderRef.current.slickPrev();
              }
            }}
            
          />
          
          
        </Center>
         <View w={width.width - 100}>
          <Slider
          ref={sliderRef}
           {...settings}>
            <Box>
              <Pressable
                p="0"
                display={'flex'}
                alignItems={'center'}
                justifyContent={'center'}
                borderWidth="0"
                onPress={()=>{
                  push(`/${event.url}`)
                }}
              >
                <IcoDashboard width="24" height="24" />
                <Text textAlign={'center'} pt={1} fontSize={'sm'}>Dashboard</Text>
              </Pressable>
            </Box>
            {modules.map((module, index) => (
              <Box key={index}>
                {module.show_on_dashboard === 1 && (
                  <Pressable
                    p="0"
                    display={'flex'}
                    alignItems={'center'}
                    justifyContent={'center'}
                    borderWidth="0"
                    onPress={() => {
                      if (in_array(module?.alias, ['practical-info', 'general-info', 'additional-info'])) {
                        router.push(`/${event.url}/${module?.alias}/event-info/0`)
                      } else if (in_array(module?.alias, ['information_pages'])) {
                        if(module?.section_type === 'link') {
                          push(`${event.url}`)
                        } else {
                          router.push(`/${event.url}/information-pages${module?.section_type === 'child_section' ? '/sub' : ''}/${module?.id}`)
                        }
                      } else if (module?.alias === 'my-registrations') {
                        push(`/${event.url}/attendees/detail/${response?.data?.user?.id}`)
                      } else {
                        router.push(`/${event.url}/${module?.alias}`)
                      }
                    }}
                  >
                    <DynamicIcon iconType={module?.alias.replace('-', '_')} iconProps={{ width: 24, height: 21 }} />
                    <Text textAlign={'center'} pt={1} fontSize={'sm'}>{module.name}</Text>
                  </Pressable>
                )}
              </Box>
            ))}
          </Slider>
      </View>
        <Center  size="8">
          <IconButton
            variant="unstyled"
            icon={<Icon size="md" as={AntDesign} name="right" color="primary.text" />}
            onPress={()=>{
              if (sliderRef.current) {
                sliderRef.current.slickNext();
              }
            }}

          />
        </Center>
      </HStack>
      
     
     </SafeAreaView>
  )
}

export default MobileNavigation