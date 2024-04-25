import * as React from 'react';
import Svg, { SvgProps, Defs, ClipPath, Rect, G, Path } from 'react-native-svg';
import { getColorScheme } from 'application/styles/colors';
import UseEventService from 'application/store/services/UseEventService';

const Icopin = (props: SvgProps) => {
  const { event } = UseEventService()
  const colors = getColorScheme(event?.settings?.app_background_color ?? '#343d50', event?.settings?.app_text_mode);
  return (
  <Svg
    width={10.333}
    height={15}
    viewBox="0 0 10.333 15"
    {...props}
  >
    <Path
      id="Path_1572"
      data-name="Path 1572"
      d="M28.667,962.862a5.088,5.088,0,0,1,3.649,1.5,5.405,5.405,0,0,1,1.517,3.843,5.175,5.175,0,0,1-.75,2.754l-3.667,6.46a.859.859,0,0,1-1.5,0l-3.667-6.46a5.175,5.175,0,0,1-.749-2.754,5.405,5.405,0,0,1,1.517-3.843A5.088,5.088,0,0,1,28.667,962.862Zm0,13.856,3.548-6.249a4.167,4.167,0,1,0-7.1,0Zm0-11.343a2.654,2.654,0,1,1-2.654,2.654A2.657,2.657,0,0,1,28.667,965.375Zm0,4.308a1.654,1.654,0,1,0-1.654-1.654A1.656,1.656,0,0,0,28.667,969.683Z"
      transform="translate(-23.5 -962.862)"
      fill={colors.text ? colors.text : '#fff'}
    />
  </Svg>
)};

export default Icopin;
