import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';
import { getColorScheme } from 'application/styles/colors';
import UseEventService from 'application/store/services/UseEventService';

const Icouser = (props: SvgProps) => {
  const { event } = UseEventService()
  const colors = getColorScheme(event?.settings?.app_background_color ?? '#343d50', event?.settings?.app_text_mode);
  return (
  <Svg
    id="Group_6"
    data-name="Group 6"
    
    width={18.112}
    height={18.112}
    viewBox="0 0 18.112 18.112"
    {...props}
  >
    <Path
      id="Path_95"
      data-name="Path 95"
      d="M28.556,45.112a9.056,9.056,0,1,1,9.056-9.056,9.056,9.056,0,0,1-9.056,9.056Zm0-17.077a8.021,8.021,0,1,0,8.021,8.021A8.021,8.021,0,0,0,28.556,28.035Z"
      transform="translate(-19.5 -27)"
      fill={colors.text ? colors.text : '#fff'}
    />
    <Path
      id="Path_96"
      data-name="Path 96"
      d="M36.982,51.033a.518.518,0,0,1-.419-.213,8,8,0,0,0-12.929,0,.518.518,0,1,1-.836-.61,9.038,9.038,0,0,1,14.6,0,.517.517,0,0,1-.418.823Z"
      transform="translate(-21.043 -36.409)"
      fill={colors.text ? colors.text : '#fff'}
    />
    <Path
      id="Path_97"
      data-name="Path 97"
      d="M33.743,41.986a3.493,3.493,0,1,1,3.493-3.493,3.493,3.493,0,0,1-3.493,3.493Zm0-5.951A2.458,2.458,0,1,0,36.2,38.493a2.458,2.458,0,0,0-2.458-2.458Z"
      transform="translate(-24.687 -30.86)"
      fill={colors.text ? colors.text : '#fff'}
    />
  </Svg>
)};

export default Icouser;
