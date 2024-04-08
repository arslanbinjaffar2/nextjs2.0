import * as React from 'react';
import Svg, { SvgProps, G, Path, Rect } from 'react-native-svg';
import { getColorScheme } from 'application/styles/colors';
import UseEventService from 'application/store/services/UseEventService';

const mybookings = (props: SvgProps) => {
  const { event } = UseEventService()
  const colors = getColorScheme(event?.settings?.app_background_color ?? '#343d50', event?.settings?.app_text_mode);
  return (
  <Svg
    width={16}
    height={33.75}
    viewBox="0 0 16 33.75"
    {...props}
  >
    <Path
      id="Path_1878"
      data-name="Path 1878"
      d="M472.412,518.88h-6.525a1.115,1.115,0,0,1-1.118-1.111V515.4a1.1,1.1,0,0,1,.342-.8l-1.282-1.881a.319.319,0,0,1-.11.018h-2.266a2,2,0,0,1-2-1.991V487.121a2,2,0,0,1,2-1.991h11.994a2,2,0,0,1,2,1.991v23.624a2,2,0,0,1-1.765,1.976l-.489,1.887a1.1,1.1,0,0,1,.33.788v2.372a1.115,1.115,0,0,1-1.118,1.111Zm-6.525-3.887a.406.406,0,0,0-.409.4v2.373a.406.406,0,0,0,.409.4h6.525a.406.406,0,0,0,.409-.4V515.4a.406.406,0,0,0-.409-.4Zm0-.708h6.525a.7.7,0,0,1,.137.009l1.569-6.073a1.345,1.345,0,0,0-1.145-1.857l-4.76-1.014a.356.356,0,0,1-.281-.345v-4.464a1.127,1.127,0,0,0-1.115-1.136h-.235a1.092,1.092,0,0,0-.785.33,1.129,1.129,0,0,0-.33.818l.082,7.985a.355.355,0,0,1-.241.339.351.351,0,0,1-.4-.125l-2.015-2.739a1.109,1.109,0,0,0-1.89.656,1.384,1.384,0,0,0,.253,1.032l4.5,6.6a.9.9,0,0,1,.128-.006Zm-5.728-6.11v2.571a1.289,1.289,0,0,0,1.295,1.282h1.905l-2.629-3.853Zm14.586.449-.861,3.331a1.288,1.288,0,0,0,.861-1.209Zm-14.586-1.154h.208a2.188,2.188,0,0,1-.061-.9,1.817,1.817,0,0,1,3.108-1.038.211.211,0,0,1,.034.04l1.383,1.881-.061-6.076-.547.333a.358.358,0,0,1-.385-.009.353.353,0,0,1-.15-.354l.635-3.536-2.577-2.525a.352.352,0,0,1,.2-.6l3.591-.495,1.621-3.215a.357.357,0,0,1,.314-.2h0a.347.347,0,0,1,.315.2l1.585,3.237,3.582.54a.35.35,0,0,1,.284.244.364.364,0,0,1-.092.363l-2.611,2.492.589,3.545a.356.356,0,0,1-.143.345.35.35,0,0,1-.372.024l-1.976-1.047v4.006l4.482.956a2.255,2.255,0,0,1,1.511.977c.04.067.076.14.11.211V489.145H460.149v18.327Zm8.345-7.631,1.811.959-.5-3.023a.364.364,0,0,1,.1-.315l2.226-2.122-3.053-.458a.352.352,0,0,1-.266-.2l-1.353-2.763-1.386,2.745a.361.361,0,0,1-.269.192l-3.06.421,2.2,2.153a.354.354,0,0,1,.1.314l-.528,2.947.235-.143a1.849,1.849,0,0,1,.534-1.313,1.8,1.8,0,0,1,1.289-.537h.235a1.828,1.828,0,0,1,1.685,1.142Zm-8.345-11.4h14.586v-1.313a1.289,1.289,0,0,0-1.295-1.282H461.456a1.291,1.291,0,0,0-1.295,1.282v1.313Zm8.934-.968H465.81a.354.354,0,1,1,0-.708h3.282a.354.354,0,0,1,0,.708Z"
      transform="translate(-459.45 -485.13)"
      fill={colors.text ? colors.text : '#fff'}
    />
  </Svg>
)};

export default mybookings;
