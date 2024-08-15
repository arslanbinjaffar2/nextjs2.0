import * as React from 'react';
import Svg, { SvgProps, G, Rect, Ellipse, Path  } from 'react-native-svg';
import { getColorScheme } from 'application/styles/colors';
import UseEventService from 'application/store/services/UseEventService';

const IcoMobile = (props: SvgProps) => {
  const { event } = UseEventService()
  const colors = getColorScheme(event?.settings?.app_background_color ?? '#343d50', event?.settings?.app_text_mode);
  return (
  <Svg
    width={9.6}
    height={16}
    viewBox="0 0 9.6 16"
    {...props}

  >
     <Path
      id="phone_iphone_24dp_E8EAED_FILL0_wght200_GRAD0_opsz24"
      d="M241.292-864a1.252,1.252,0,0,1-.922-.37,1.252,1.252,0,0,1-.37-.922v-13.415a1.252,1.252,0,0,1,.37-.922,1.252,1.252,0,0,1,.922-.37h7.015a1.252,1.252,0,0,1,.922.37,1.252,1.252,0,0,1,.37.922v13.415a1.252,1.252,0,0,1-.37.922,1.252,1.252,0,0,1-.922.37Zm-.492-3.569v2.277a.471.471,0,0,0,.154.339.471.471,0,0,0,.339.154h7.015a.471.471,0,0,0,.339-.154.471.471,0,0,0,.154-.339v-2.277Zm4,2a.591.591,0,0,0,.432-.184.591.591,0,0,0,.184-.432.591.591,0,0,0-.184-.432.591.591,0,0,0-.432-.184.591.591,0,0,0-.432.184.591.591,0,0,0-.184.432.591.591,0,0,0,.184.432A.591.591,0,0,0,244.8-865.569Zm-4-2.8h8V-877.2h-8Zm0-9.631h8v-.708a.471.471,0,0,0-.154-.339.471.471,0,0,0-.339-.154h-7.015a.471.471,0,0,0-.339.154.471.471,0,0,0-.154.339Zm0,10.431v0Zm0-10.431v0Z"
      transform="translate(-240 880)"
      fill={colors.text ? colors.text : '#e3e3e3'}
      />
  </Svg>
)};

export default IcoMobile;
