import * as React from 'react';
import Svg, { SvgProps, Defs, ClipPath, Rect, G, Path } from 'react-native-svg';
import { getColorScheme } from 'application/styles/colors';
import UseEventService from 'application/store/services/UseEventService';

const Icoaddcalendar = (props: SvgProps) => {
  const { event } = UseEventService()
  const colors = getColorScheme(event?.settings?.app_background_color ?? '#343d50', event?.settings?.app_text_mode);
  return (
 <Svg
    width={18.928}
    height={18.49}
    viewBox="0 0 18.928 18.49"
    {...props}
  >
    <G
      id="Group_5690"
      data-name="Group 5690"
      transform="translate(-911.6 -609.6)"
    >
      <Path
        id="Path_34"
        data-name="Path 34"
        d="M-73.248,406.785a.4.4,0,0,1-.4-.4v-3.05a.4.4,0,0,1,.4-.4.4.4,0,0,1,.4.4v3.05A.4.4,0,0,1-73.248,406.785Z"
        transform="translate(999.64 219.065)"
        fill={props.color ? props.color : colors.text}
      />
      <Path
        id="Path_2320"
        data-name="Path 2320"
        d="M-73.248,406.785a.4.4,0,0,1-.4-.4v-3.05a.4.4,0,0,1,.4-.4.4.4,0,0,1,.4.4v3.05A.4.4,0,0,1-73.248,406.785Z"
        transform="translate(521.532 550.678) rotate(-90)"
        fill={props.color ? props.color : colors.text}
      />
      <Path
        id="Line_18"
        data-name="Line 18"
        d="M0,3.819a.4.4,0,0,1-.4-.4V0A.4.4,0,0,1,0-.4.4.4,0,0,1,.4,0V3.419A.4.4,0,0,1,0,3.819Z"
        transform="translate(918.415 610)"
        fill={props.color ? props.color : colors.text}
      />
      <Path
        id="Line_19"
        data-name="Line 19"
        d="M0,3.819a.4.4,0,0,1-.4-.4V0A.4.4,0,0,1,0-.4.4.4,0,0,1,.4,0V3.419A.4.4,0,0,1,0,3.819Z"
        transform="translate(923.543 610)"
        fill={props.color ? props.color : colors.text}
      />
      <Path
        id="Line_20"
        data-name="Line 20"
        d="M11.249.4H0A.4.4,0,0,1-.4,0,.4.4,0,0,1,0-.4H11.249a.4.4,0,0,1,.4.4A.4.4,0,0,1,11.249.4Z"
        transform="translate(915.144 615.654)"
        fill={props.color ? props.color : colors.text}
      />
      <Path
        id="Ellipse_1"
        data-name="Ellipse 1"
        d="M4.136.8A3.336,3.336,0,1,0,7.471,4.136,3.339,3.339,0,0,0,4.136.8m0-.8A4.136,4.136,0,1,1,0,4.136,4.136,4.136,0,0,1,4.136,0Z"
        transform="translate(922.257 619.79)"
        fill={props.color ? props.color : colors.text}
      />
      <Path
        id="Path_2321"
        data-name="Path 2321"
        d="M-99.987,392.741h-12.658a2.213,2.213,0,0,1-2.255-2.218V378.358a2.259,2.259,0,0,1,2.255-2.258h13.494a2.259,2.259,0,0,1,2.255,2.258v7.671h-.8v-7.671a1.459,1.459,0,0,0-1.455-1.458h-13.494a1.459,1.459,0,0,0-1.455,1.458v12.164a1.422,1.422,0,0,0,1.455,1.418h12.658Z"
        transform="translate(1026.5 235.35)"
        fill={props.color ? props.color : colors.text}
      />
    </G>
  </Svg>
)};

export default Icoaddcalendar;
