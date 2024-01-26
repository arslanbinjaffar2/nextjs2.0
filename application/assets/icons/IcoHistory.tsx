import * as React from 'react';
import Svg, { SvgProps, G, Line } from 'react-native-svg';
import { getColorScheme } from 'application/styles/colors';
import UseEventService from 'application/store/services/UseEventService';

const IcoHistory = (props: SvgProps) => {

  const { event } = UseEventService()
  const colors = getColorScheme(event?.settings?.app_background_color ?? '#343d50', event?.settings?.app_text_mode);
  
  return (
  <Svg
    
    width={14.5}
    height={12.5}
    viewBox="0 0 14.5 12.5"
    {...props}
  >
    <G id="Group_635" data-name="Group 635" transform="translate(0.75 0.75)">
      <Line
        id="Line_73"
        data-name="Line 73"
        x2={13}
        fill="none"
        stroke={colors.text ? colors.text : "#fff"}
        strokeLinecap="round"
        strokeWidth={1.5}
      />
      <Line
        id="Line_74"
        data-name="Line 74"
        x2={7}
        transform="translate(6 4)"
        fill="none"
        stroke={colors.text ? colors.text : "#fff"}
        strokeLinecap="round"
        strokeWidth={1.5}
      />
      <Line
        id="Line_76"
        data-name="Line 76"
        x2={7}
        transform="translate(0 7)"
        fill="none"
        stroke={colors.text ? colors.text : "#fff"}
        strokeLinecap="round"
        strokeWidth={1.5}
      />
      <Line
        id="Line_77"
        data-name="Line 77"
        x2={13}
        transform="translate(0 11)"
        fill="none"
        stroke={colors.text ? colors.text : "#fff"}
        strokeLinecap="round"
        strokeWidth={1.5}
      />
    </G>
  </Svg>
)};

export default IcoHistory;
