import * as React from 'react';
import Svg, { SvgProps, G, Path } from 'react-native-svg';
import { getColorScheme } from 'application/styles/colors';
import UseEventService from 'application/store/services/UseEventService';

const checkIn = (props: SvgProps) => {
  const { event } = UseEventService()
  const colors = getColorScheme(event?.settings?.app_background_color ?? '#343d50', event?.settings?.app_text_mode);
  return (
  <Svg
    width={props.width}
    height={props.height}
    viewBox="0 0 63.999 57.196"
  >
    <G
      id="Group_672"
      data-name="Group 672"
      transform="translate(-226.009 -532.018)"
    >
      <Path
        id="Path_1610"
        data-name="Path 1610"
        d="M21,11.633H6.547a1.237,1.237,0,1,1,0-2.475H21a1.237,1.237,0,0,1,0,2.475"
        transform="translate(233.841 545.526)"
        fill={props.color ? props.color : colors.text}
      />
      <Path
        id="Path_1611"
        data-name="Path 1611"
        d="M28.833,14.818H1.237a1.237,1.237,0,1,1,0-2.475h27.6a1.237,1.237,0,1,1,0,2.475"
        transform="translate(226.009 550.224)"
        fill={props.color ? props.color : colors.text}
      />
      <Path
        id="Path_1612"
        data-name="Path 1612"
        d="M24.134,18H4.423a1.237,1.237,0,1,1,0-2.475H24.134a1.237,1.237,0,1,1,0,2.475"
        transform="translate(230.708 554.923)"
        fill={props.color ? props.color : colors.text}
      />
      <Path
        id="Path_1613"
        data-name="Path 1613"
        d="M19.794,22.756l-6.311-6.311a1.237,1.237,0,0,1,1.75-1.75L20,19.462l10.4-8.1a1.237,1.237,0,1,1,1.52,1.953Z"
        transform="translate(245.361 548.401)"
        fill={props.color ? props.color : colors.text}
      />
      <Path
        id="Path_1614"
        data-name="Path 1614"
        d="M51.747,34.724A23.843,23.843,0,0,1,27.987,57.2c-.47,0-.94,0-1.411-.025a23.717,23.717,0,0,1-16.434-7.945,21.22,21.22,0,0,1-1.633-2.054,1.233,1.233,0,1,1,2-1.435,21.532,21.532,0,0,0,1.46,1.831,21.357,21.357,0,0,0,37.3-12.994A21.085,21.085,0,0,0,43.9,19.131,21.4,21.4,0,0,0,13.732,17.4a1.245,1.245,0,1,1-1.658-1.856A23.52,23.52,0,0,1,27.468,9.553V2.475H23.458a1.225,1.225,0,0,1-1.237-1.237A1.241,1.241,0,0,1,23.458,0H33.977a1.257,1.257,0,0,1,1.237,1.237,1.241,1.241,0,0,1-1.237,1.237H29.943V9.628a23.771,23.771,0,0,1,21.8,25.1"
        transform="translate(238.219 532.018)"
        fill={props.color ? props.color : colors.text}
      />
    </G>
  </Svg>
)};

export default checkIn;
