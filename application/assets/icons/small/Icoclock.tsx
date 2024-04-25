import * as React from 'react';
import Svg, { SvgProps, Defs, ClipPath, Rect, G, Path } from 'react-native-svg';
import { getColorScheme } from 'application/styles/colors';
import UseEventService from 'application/store/services/UseEventService';

const Icoclock = (props: SvgProps) => {
  const { event } = UseEventService()
  const colors = getColorScheme(event?.settings?.app_background_color ?? '#343d50', event?.settings?.app_text_mode);
  return (
 <Svg
    width={14.2}
    height={17.262}
    viewBox="0 0 14.2 17.262"
    {...props}
  >
    <Path
      id="timer_FILL0_wght200_GRAD0_opsz24"
      d="M164.712-899.125V-900h4.577v.875Zm1.851,9.726h.875v-4.577h-.875Zm.438,6.462a6.815,6.815,0,0,1-2.723-.548,7.067,7.067,0,0,1-2.227-1.5,7.066,7.066,0,0,1-1.5-2.227,6.816,6.816,0,0,1-.548-2.723,6.817,6.817,0,0,1,.548-2.723,7.067,7.067,0,0,1,1.5-2.227,7.067,7.067,0,0,1,2.227-1.5,6.817,6.817,0,0,1,2.723-.548,6.831,6.831,0,0,1,2.46.454,7.614,7.614,0,0,1,2.181,1.286l.956-.956.619.619-.956.956a7.613,7.613,0,0,1,1.286,2.181,6.831,6.831,0,0,1,.454,2.46,6.816,6.816,0,0,1-.548,2.723,7.066,7.066,0,0,1-1.5,2.227,7.067,7.067,0,0,1-2.227,1.5A6.815,6.815,0,0,1,167-882.937Zm0-.875a5.9,5.9,0,0,0,4.331-1.794,5.9,5.9,0,0,0,1.794-4.331,5.9,5.9,0,0,0-1.794-4.331A5.9,5.9,0,0,0,167-896.062a5.9,5.9,0,0,0-4.331,1.794,5.9,5.9,0,0,0-1.794,4.331,5.9,5.9,0,0,0,1.794,4.331A5.9,5.9,0,0,0,167-883.812ZM167-889.937Z"
      transform="translate(-159.9 900.1)"
      fill={colors.text ? colors.text : '#fff'}
      stroke={colors.text ? colors.text : '#fff'}
      strokeWidth={0.2}
    />
  </Svg>
)};

export default Icoclock;
