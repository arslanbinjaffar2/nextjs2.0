import { Box, Spinner } from 'native-base'
import React from 'react'
import { SwipeButton } from 'react-native-expo-swipe-button'
import IcoLongArrow from '../../../assets/icons/IcoLongArrow'
import { getColorScheme } from 'application/styles/colors'
import UseEventService from 'application/store/services/UseEventService'
import UseSubRegistrationService from 'application/store/services/UseSubRegistrationService';
interface Props{
  loading:boolean | any,
  onComplete:()=>void
}
const SwipeBtn = ({loading,onComplete}:Props) => {
  const {event}=UseEventService();
  const { SubmitPageScroll } = UseSubRegistrationService()
  const colors = getColorScheme(event?.settings?.app_background_color ?? '#343d50', event?.settings?.app_text_mode);
  return (
    <>
    <Box  position={'relative'} m="auto" w="100%" maxW={250}  p="0" rounded="sm" overflow="hidden">
    {!loading && <SwipeButton
        Icon={
          <> 
          {
            loading ?
            <Spinner accessibilityLabel="Loading posts" />:
        <IcoLongArrow />
          }    
          </>

      }
      width={250}
      circleSize={60}
      circleBackgroundColor={event.settings?.secondary_color} 
      iconContainerStyle={{borderWidth:0,borderColor:"transparent",
      backgroundColor:event.settings?.secondary_color,
      }}
      onComplete={onComplete}
      onSwipeStart={() => SubmitPageScroll(false)}
      onSwipeEnd={() => SubmitPageScroll(true)}
      title=""
      height={60}
      borderRadius={10}
      goBackToStart={true}
      containerStyle={{ backgroundColor:event.settings?.primary_color,  borderColor:"transparent",
      borderWidth:0}}
      underlayTitle=""
      underlayTitleStyle={{ color: colors.text ,borderRadius:10,
        borderColor:"transparent",
        borderWidth:0

      }}
      underlayStyle={{ 
        backgroundColor:event.settings?.secondary_color,
        borderColor:"transparent",
        borderWidth:0
      }}
    />}
    {loading && <Box my={'10px'} bg="secondary.500" p="0" height={'60px'} rounded="10px">
      <Spinner mt={5} accessibilityLabel="Loading posts" />
    </Box>}
        
  </Box>

    </>
  )
}

export default SwipeBtn