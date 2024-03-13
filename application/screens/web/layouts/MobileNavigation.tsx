import React from 'react';
import {  useWindowDimensions } from 'react-native';
import { Box, View, Pressable, Text, HStack, Center, IconButton, Icon } from 'native-base';
import { SafeAreaView } from "react-native-safe-area-context";
import Slider from "react-slick";
import IcoDashboard from 'application/assets/icons/IcoDashboard';
import DynamicIcon from 'application/utils/DynamicIcon';
import AntDesign from '@expo/vector-icons/AntDesign';
import UseEventService from '../../../store/services/UseEventService'
import UseEnvService from 'application/store/services/UseEnvService'
import { useRouter } from 'solito/router'


const MobileNavigation = () => {
  const { event, modules } = UseEventService()
  const { push, back } = useRouter()
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
                  console.log('hello')
                }}
              
              >
                <IcoDashboard width="24" height="24" />
                <Text textAlign={'center'} pt={1} fontSize={'sm'}>Dashboard</Text>
              </Pressable>
              
            </Box>
            {modules.filter((module: any) => module.alias === 'attendees' && module.show_on_dashboard === 1).map((module: any, key: number) => (
              <Box key={key}>
              <Pressable
                p="0"
                display={'flex'}
                alignItems={'center'}
                justifyContent={'center'}
                borderWidth="0"
                onPress={()=>{
                  push(`/${event.url}/attendees`)
                }}
              
              >
                <DynamicIcon iconType={'attendees'} iconProps={{ width: 24, height: 21 }} />
                <Text textAlign={'center'} pt={1} fontSize={'sm'}>Attendees</Text>
              </Pressable>
              
            </Box>
              ))}
            {modules.filter((module: any) => module.alias === 'speakers' && module.show_on_dashboard === 1).map((module: any, key: number) => (
              <Box key={key}>
              <Pressable
                p="0"
                display={'flex'}
                alignItems={'center'}
                justifyContent={'center'}
                borderWidth="0"
                onPress={()=>{
                  push(`/${event.url}/speakers`)
                }}

              >
                <DynamicIcon iconType={'speakers'} iconProps={{ width: 24, height: 21 }} />
                <Text textAlign={'center'} pt={1} fontSize={'sm'}>Speakers</Text>
              </Pressable>

            </Box>
            ))}
            {modules.filter((module: any) => module.alias === 'agendas' && module.show_on_dashboard === 1).map((module: any, key: number) => (
              <Box key={key}>
                <Pressable
                  p="0"
                  display={'flex'}
                  alignItems={'center'}
                  justifyContent={'center'}
                  borderWidth="0"
                  onPress={() => {
                    push(`/${event.url}/agendas`)
                  }}
                >
                  <DynamicIcon iconType={'agendas'} iconProps={{ width: 24, height: 21 }} />
                  <Text textAlign={'center'} pt={1} fontSize={'sm'}>
                    Programs
                  </Text>
                </Pressable>
              </Box>
            ))}
            {modules.filter((module: any) => module.alias === 'polls' && module.show_on_dashboard === 1).map((module: any, key: number) => (
              <Box key={key}>
              <Pressable
                p="0"
                display={'flex'}
                alignItems={'center'}
                justifyContent={'center'}
                borderWidth="0"
                onPress={()=>{
                  push(`/${event.url}/polls`)
                }}

              >
                <DynamicIcon iconType={'polls'} iconProps={{ width: 24, height: 21 }} />
                <Text textAlign={'center'} pt={1} fontSize={'sm'}>Polls</Text>
              </Pressable>

            </Box>
            ))}
            {modules.filter((module: any) => module.alias === 'survey' && module.show_on_dashboard === 1).map((module: any, key: number) => (
              <Box key={key}>
              <Pressable
                p="0"
                display={'flex'}
                alignItems={'center'}
                justifyContent={'center'}
                borderWidth="0"
                onPress={()=>{
                  push(`/${event.url}/survey`)
                }}

              >
                <DynamicIcon iconType={'survey'} iconProps={{ width: 24, height: 21 }} />
                <Text textAlign={'center'} pt={1} fontSize={'sm'}>Surveys</Text>
              </Pressable>

            </Box>
              ))}
            {modules.filter((module: any) => module.alias === 'my_notes' && module.show_on_dashboard === 1).map((module: any, key: number) => (
            <Box>
              <Pressable
                p="0"
                display={'flex'}
                alignItems={'center'}
                justifyContent={'center'}
                borderWidth="0"
                onPress={()=>{
                  push(`/${event.url}/my_notes`)
                }}
              
              >
                <DynamicIcon iconType={'my_notes'} iconProps={{ width: 24, height: 21 }} />
                <Text textAlign={'center'} pt={1} fontSize={'sm'}>My Notes</Text>
              </Pressable>
              
            </Box>
            ))}
            {modules.filter((module: any) => module.alias === 'sponsors' && module.show_on_dashboard === 1).map((module: any, key: number) => (
              <Box key={key}>
              <Pressable
                p="0"
                display={'flex'}
                alignItems={'center'}
                justifyContent={'center'}
                borderWidth="0"
                onPress={()=>{
                  push(`/${event.url}/sponsors`)
                }}

              >
                <DynamicIcon iconType={'sponsors'} iconProps={{ width: 24, height: 21 }} />
                <Text textAlign={'center'} pt={1} fontSize={'sm'}>Sponsors</Text>
              </Pressable>

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