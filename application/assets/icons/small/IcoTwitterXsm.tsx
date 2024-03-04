import * as React from 'react';
import Svg, { SvgProps, Path, Rect } from 'react-native-svg';
import { getColorScheme } from 'application/styles/colors';
import UseEventService from 'application/store/services/UseEventService';


const IcoTwitterXsm = (props: SvgProps) => {
  const { event } = UseEventService()
  const colors = getColorScheme(event?.settings?.app_background_color ?? '#343d50', event?.settings?.app_text_mode);
return (
  <Svg
    width={16}
    height={14.437}
    viewBox="0 0 16 14.437"
    {...props}
  >
    <Path
      id="Path_1"
      data-name="Path 1"
      d="M150.821,148.35h2.453l-5.36,6.116,6.305,8.321h-4.937l-3.867-5.046-4.425,5.046h-2.455l5.733-6.541-6.049-7.9h5.062l3.5,4.613Zm-.861,12.971h1.36l-8.776-11.582h-1.459Z"
      transform="translate(-138.22 -148.35)"
      fill={colors.text ? colors.text : '#e3e3e3'}
    />
  </Svg>
)};

export default IcoTwitterXsm;
