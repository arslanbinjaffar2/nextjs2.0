import * as React from 'react';
import Svg, { SvgProps, G, Path } from 'react-native-svg';
import { getColorScheme } from 'application/styles/colors';
import UseEventService from 'application/store/services/UseEventService';

const Icomute = (props: SvgProps) => {

    const { event } = UseEventService()
  const colors = getColorScheme(event?.settings?.app_background_color ?? '#343d50', event?.settings?.app_text_mode);
  
  return (
  <Svg
    
    width={props.width}
    height={props.height}
    viewBox="0 0 36.106 36.273"
  >
    <G
      id="Group_711"
      data-name="Group 711"
      transform="translate(-1593.305 -226.16)"
    >
      <Path
        id="Path_1784"
        data-name="Path 1784"
        d="M412.447,26.4a.676.676,0,0,1-.477-.2l-5.433-5.433a.673.673,0,0,1,.952-.952l5.434,5.431a.673.673,0,0,1-.477,1.15"
        transform="translate(1209.907 229.351)"
        fill={colors.text ? colors.text : '#fff'}
      />
      <Path
        id="Path_1785"
        data-name="Path 1785"
        d="M407.014,26.4a.673.673,0,0,1-.477-1.15l5.434-5.431a.673.673,0,1,1,.952.952L407.491,26.2a.676.676,0,0,1-.477.2"
        transform="translate(1209.907 229.351)"
        fill={colors.text ? colors.text : '#fff'}
      />
      <Path
        id="Path_1786"
        data-name="Path 1786"
        d="M411.543,38.948l-6.138-.042-10.6-9.007h-3.484a2.023,2.023,0,0,1-2.02-2.02V14.007a2.012,2.012,0,0,1,2-2.02l3.5.013,10.6-9.318h6.152a2.022,2.022,0,0,1,2.02,2.02V20.315l-.5.135a8.731,8.731,0,0,0-4.712,3.186,8.6,8.6,0,0,0-1.764,5.236,8.723,8.723,0,0,0,6.116,8.344l1.03.325-.746.781a2.028,2.028,0,0,1-1.453.626M405.9,37.564l4.349.03a10.087,10.087,0,0,1,1.973-18.3V4.7a.674.674,0,0,0-.673-.673h-5.644l-10.6,9.319-3.971-.015a.685.685,0,0,0-.5.2.667.667,0,0,0-.19.471V27.879a.674.674,0,0,0,.673.673H395.3Z"
        transform="translate(1204 223.478)"
        fill={colors.text ? colors.text : '#fff'}
      />
      <Path
        id="Path_1787"
        data-name="Path 1787"
        d="M411.226,34.8a10.093,10.093,0,0,1-10.082-10.079,9.963,9.963,0,0,1,2.038-6.054A10.078,10.078,0,0,1,408.621,15a11.585,11.585,0,0,1,2.614-.347h.052a10.035,10.035,0,0,1,10.018,9.972v.1A10.092,10.092,0,0,1,411.226,34.8M411.208,16a8.379,8.379,0,0,0-2.236.3,8.715,8.715,0,0,0-4.716,3.186,8.593,8.593,0,0,0-1.766,5.236,8.734,8.734,0,1,0,17.468,0v-.1A8.689,8.689,0,0,0,411.282,16Z"
        transform="translate(1208.105 227.628)"
        fill={colors.text ? colors.text : '#fff'}
      />
      <Path
        id="Path_1788"
        data-name="Path 1788"
        d="M412.777,18.49l-.687-.214a8.841,8.841,0,0,0-2.635-.4.26.26,0,0,1-.046,0,8.367,8.367,0,0,0-2.233.3l-.851.233V9.238l.764.105a7.006,7.006,0,0,1,6.037,6.915,6.5,6.5,0,0,1-.18,1.531Zm-3.32-1.962a10.191,10.191,0,0,1,2.295.261,4.964,4.964,0,0,0,.027-.528v0a5.659,5.659,0,0,0-4.107-5.422v5.846a9.164,9.164,0,0,1,1.765-.155Z"
        transform="translate(1209.901 225.751)"
        fill={colors.text ? colors.text : '#fff'}
      />
    </G>
  </Svg>
)};

export default Icomute;
