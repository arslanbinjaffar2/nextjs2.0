import { Box, Spinner } from 'native-base'
import React from 'react'
import { SwipeButton } from 'react-native-expo-swipe-button'
import IcoLongArrow from '../../../assets/icons/IcoLongArrow'
import { getColorScheme } from 'application/styles/colors'
import UseEventService from 'application/store/services/UseEventService'
interface Props{
  loading:boolean | any
  onComplete:()=>void
}
const SwipeBtn = ({loading,onComplete}:Props) => {
  const {event}=UseEventService()
  const colors = getColorScheme(event?.settings?.app_background_color ?? '#343d50', event?.settings?.app_text_mode);
  
  return (
    <>
    <Box position={'relative'} m="auto" w="310px"  p="0" rounded="sm" overflow="hidden">
  <SwipeButton
      Icon={
        <> 
        {
          loading ?
          <Spinner accessibilityLabel="Loading posts" />:
      <IcoLongArrow />
        }    
        </>

    }
    width={310}
    circleSize={60}
    circleBackgroundColor={colors.secondary} 
    iconContainerStyle={{borderWidth:0,borderColor:"transparent",
    backgroundColor:colors.secondary,
    }}
    onComplete={onComplete}
    title=""
    height={60}
    borderRadius={10}
    containerStyle={{ backgroundColor:colors.primary,  borderColor:"transparent",
    borderWidth:0}}
    underlayTitle=""
    underlayTitleStyle={{ color: colors.text ,borderRadius:10,
      borderColor:"transparent",
      borderWidth:0

    }}
    underlayStyle={{ 
      backgroundColor:colors.secondary,
      borderColor:"transparent",
      borderWidth:0
    }}
  />    
  </Box>

    </>
  )
}

export default SwipeBtn