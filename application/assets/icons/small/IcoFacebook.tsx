import * as React from 'react';
import Svg, { SvgProps,Ellipse, Path } from 'react-native-svg';
import { getColorScheme } from 'application/styles/colors';
import UseEventService from 'application/store/services/UseEventService';

const IcoFacebook = (props: SvgProps) => {
  const { event } = UseEventService()
  const colors = getColorScheme(event?.settings?.app_background_color ?? '#343d50', event?.settings?.app_text_mode);
return (
  <Svg
    width={28.623}
    height={28.623}
    viewBox="0 0 28.623 28.623"
    {...props}
  >
    <Ellipse
      id="Ellipse_4"
      data-name="Ellipse 4"
      cx={14.312}
      cy={14.312}
      rx={14.312}
      ry={14.312}
      transform="translate(0 0)"
      fill={colors.text ? colors.text : '#fff'}
    />
    <Path
      id="Path_192"
      data-name="Path 192"
      d="M-215.713-350.234h-2.372v8.459H-221.6v-8.459h-1.672v-2.988h1.672v-1.934a3.3,3.3,0,0,1,3.548-3.548l2.6.011v2.9h-1.89a.716.716,0,0,0-.746.815v1.759h2.679Zm0,0"
      transform="translate(233.651 364.551)"
      fill={colors.text ? colors.text : '#fff'}
    />
  </Svg>
)};

export default IcoFacebook;
