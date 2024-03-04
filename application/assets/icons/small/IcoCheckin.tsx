import * as React from 'react';
import Svg, { SvgProps , G , Path } from "react-native-svg";
import { getColorScheme } from 'application/styles/colors';
import UseEventService from 'application/store/services/UseEventService';

const IcoCheckin = (props: SvgProps) => {
  const { event } = UseEventService()
  const colors = getColorScheme(event?.settings?.app_background_color ?? '#343d50', event?.settings?.app_text_mode);
  return (
<Svg
    width={16.3}
    height={16.3}
    viewBox="0 0 16.3 16.3"
    {...props}
  >
    <Path
      id="login_FILL0_wght100_GRAD0_opsz24"
      d="M180.026-772v-.727h-6.468a.794.794,0,0,1-.571-.26.794.794,0,0,1-.26-.571v-12.883a.794.794,0,0,1,.26-.571.794.794,0,0,1,.571-.26h6.468V-788h-6.468a1.514,1.514,0,0,0-1.117.442,1.514,1.514,0,0,0-.442,1.117v12.883a1.514,1.514,0,0,0,.442,1.117,1.514,1.514,0,0,0,1.117.442Zm.338-4.779.519-.52-2.338-2.338H188v-.727h-9.455l2.338-2.338-.519-.52L177.143-780Z"
      transform="translate(-171.85 788.15)"
      fill={colors.text ? colors.text : '#fff'}
      stroke={colors.text ? colors.text : '#fff'}
      strokeWidth={0.3}
    />
  </Svg>
)};

export default IcoCheckin;
