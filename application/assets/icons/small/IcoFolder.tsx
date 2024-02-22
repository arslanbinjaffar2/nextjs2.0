import * as React from 'react';
import Svg, { SvgProps , G , Path } from "react-native-svg";
import { getColorScheme } from 'application/styles/colors';
import UseEventService from 'application/store/services/UseEventService';

const IcoFolder = (props: SvgProps) => {
  const { event } = UseEventService()
  const colors = getColorScheme(event?.settings?.app_background_color ?? '#343d50', event?.settings?.app_text_mode);
  return (
  <Svg
    width={22.046}
    height={16.9}
    viewBox="0 0 22.046 16.9"
    {...props}
  >
    <G id="folder" transform="translate(0 -47.619)" opacity={0.697}>
      <G id="Group_49" data-name="Group 49" transform="translate(0 47.619)">
        <Path
          id="Path_142"
          data-name="Path 142"
          d="M20.1,49.836H11.148l-1.783-2.12a.27.27,0,0,0-.216-.1h-7.2A1.965,1.965,0,0,0,0,49.586V62.554a1.965,1.965,0,0,0,1.945,1.965H20.1a1.965,1.965,0,0,0,1.945-1.965V51.8A1.965,1.965,0,0,0,20.1,49.836Z"
          transform="translate(0 -47.619)"
          fill={colors.text ? colors.text : '#e3e3e3'}
        />
      </G>
    </G>
  </Svg>
)};

export default IcoFolder;
