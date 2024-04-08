import * as React from 'react';
import Svg, { SvgProps, G, Path } from 'react-native-svg';
import { getColorScheme } from 'application/styles/colors';
import UseEventService from 'application/store/services/UseEventService';

const general_info = (props: SvgProps) => {
  const { event } = UseEventService()
  const colors = getColorScheme(event?.settings?.app_background_color ?? '#343d50', event?.settings?.app_text_mode);
  return (
  <Svg
    width={props.width}
    height={props.height}
    viewBox="0 0 64 48.823"
  >
    <G
      id="Group_683"
      data-name="Group 683"
      transform="translate(-669.501 -428)"
    >
      <Path
        id="Path_1648"
        data-name="Path 1648"
        d="M51.17,93.669H5.835A5.339,5.339,0,0,1,.5,88.335v-32A5.339,5.339,0,0,1,5.835,51H51.17A5.339,5.339,0,0,1,56.5,56.334v32a5.339,5.339,0,0,1-5.334,5.334m-45.336-40a2.669,2.669,0,0,0-2.667,2.667v32A2.669,2.669,0,0,0,5.835,91H51.17a2.669,2.669,0,0,0,2.667-2.667v-32a2.669,2.669,0,0,0-2.667-2.667Z"
        transform="translate(669 377)"
        fill={props.color ? props.color : colors.text}
      />
      <Path
        id="Path_1649"
        data-name="Path 1649"
        d="M54.418,90.852H6.052a1.333,1.333,0,0,1,0-2.667H54.418A.38.38,0,0,0,54.8,87.8V57.714a1.333,1.333,0,1,1,2.667,0V87.8a3.052,3.052,0,0,1-3.048,3.048"
        transform="translate(676.035 385.972)"
        fill={props.color ? props.color : colors.text}
      />
      <Path
        id="Path_1650"
        data-name="Path 1650"
        d="M10.156,81.57a4.576,4.576,0,0,1-2.08-.477A2.533,2.533,0,0,1,6.6,78.906L6.228,56.95a2.5,2.5,0,0,1,1.229-2.128,4.607,4.607,0,0,1,4.237-.259l19.967,9.269A2.6,2.6,0,0,1,33.3,65.984a2.467,2.467,0,0,1-1.237,2.245L12.473,80.92a4.211,4.211,0,0,1-2.317.651M8.9,57.062l.371,21.8a2.86,2.86,0,0,0,1.747-.173L30.331,66.179l-19.762-9.2a1.977,1.977,0,0,0-1.672.08"
        transform="translate(678.546 382.281)"
        fill={props.color ? props.color : colors.text}
      />
    </G>
  </Svg>
)};

export default general_info;
