import { UseEventService } from 'application/store/services';
import { getColorScheme } from 'application/styles/colors';
import * as React from 'react';
import Svg, { SvgProps, Path, Rect } from 'react-native-svg';


const IcoTwitterX = (props: SvgProps) => {
  const { event } = UseEventService()
  const colors = getColorScheme(event?.settings?.app_background_color ?? '#343d50', event?.settings?.app_text_mode);
return (
  <Svg
  width={props.width}
  height={props.height}
  viewBox="0 0 29.928 29.79"
    {...props}
  >
    <Rect
      width={29.928}
      height={29.79}
      rx={14.895}
    />
    <Path
      id="Path_1"
      data-name="Path 1"
      d="M148.238,148.35h1.951l-4.261,4.871,5.013,6.628h-3.925l-3.074-4.019-3.518,4.019h-1.952l4.558-5.21-4.809-6.289h4.025l2.779,3.674Zm-.685,10.331h1.081l-6.977-9.225H140.5Z"
      transform="translate(-129.608 -139.181)"
      fill={props.color ? props.color : colors.text}
    />
  </Svg>
)};

export default IcoTwitterX;
