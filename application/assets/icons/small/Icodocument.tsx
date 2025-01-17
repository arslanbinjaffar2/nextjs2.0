import * as React from 'react';
import Svg, { SvgProps, Path, G } from 'react-native-svg';
import { getColorScheme } from 'application/styles/colors';
import UseEventService from 'application/store/services/UseEventService';

const Icodocument = (props: SvgProps) => {
  const { event } = UseEventService()
  const colors = getColorScheme(event?.settings?.app_background_color ?? '#343d50', event?.settings?.app_text_mode);
  return (
  <Svg
    width={24.691}
    height={24.687}
    viewBox="0 0 64.001 62.836"
    {...props}
  >
    <G id="Group_678" data-name="Group 678" transform="translate(-240 -866)">
      <Path
        id="Path_1623"
        data-name="Path 1623"
        d="M33.908,8.656H3.992a1.317,1.317,0,1,1,0-2.635H33.908a1.317,1.317,0,0,1,0,2.635"
        transform="translate(244.373 875.842)"
        fill={props.color ? props.color : colors.text}
      />
      <Path
        id="Path_1624"
        data-name="Path 1624"
        d="M33.908,13.2H3.992a1.317,1.317,0,0,1,0-2.635H33.908a1.317,1.317,0,0,1,0,2.635"
        transform="translate(244.373 883.266)"
        fill={props.color ? props.color : colors.text}
      />
      <Path
        id="Path_1625"
        data-name="Path 1625"
        d="M33.908,17.74H3.992a1.317,1.317,0,0,1,0-2.635H33.908a1.317,1.317,0,0,1,0,2.635"
        transform="translate(244.373 890.691)"
        fill={props.color ? props.color : colors.text}
      />
      <Path
        id="Path_1626"
        data-name="Path 1626"
        d="M58.541,4,42.47.9,42.444.869A5.3,5.3,0,0,0,39.519,0H5.269A5.236,5.236,0,0,0,1.554,1.528,5.6,5.6,0,0,0,.237,3.715,4.928,4.928,0,0,0,0,5.269V52.692a4.928,4.928,0,0,0,.237,1.554,5.317,5.317,0,0,0,1.317,2.16,5.259,5.259,0,0,0,3.715,1.554h13.99l29.929,4.795a6.748,6.748,0,0,0,1.027.079A6.562,6.562,0,0,0,56.671,57.3l7.245-45.816A6.532,6.532,0,0,0,58.541,4M5.269,55.327a2.642,2.642,0,0,1-2.635-2.635V5.269A2.642,2.642,0,0,1,5.269,2.635h34.25a2.642,2.642,0,0,1,2.635,2.635V52.692a2.642,2.642,0,0,1-2.635,2.635ZM61.334,11.092l-7.272,45.79a3.919,3.919,0,0,1-4.479,3.267L35.8,57.961h3.715a5.285,5.285,0,0,0,5.269-5.269V5.269A4.891,4.891,0,0,0,44.63,4L58.067,6.613a3.925,3.925,0,0,1,3.267,4.479"
        transform="translate(240 866)"
        fill={props.color ? props.color : colors.text}
      />
    </G>
  </Svg>
)};

export default Icodocument;
