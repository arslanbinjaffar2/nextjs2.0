import * as React from 'react';
import Svg, { SvgProps, G, Path, ClipPath, Defs, Rect} from 'react-native-svg';
import { getColorScheme } from 'application/styles/colors';
import UseEventService from 'application/store/services/UseEventService';

const social = (props: SvgProps) => {
  const { event } = UseEventService()
  const colors = getColorScheme(event?.settings?.app_background_color ?? '#343d50', event?.settings?.app_text_mode); 
    return (
<Svg
    id="Group_5664"
    data-name="Group 5664"
    width={26.112}
    height={24}
    viewBox="0 0 26.112 24"
    {...props}
  >
    <Defs>
      <ClipPath id="clip-path">
        <Rect
          id="Rectangle_4121"
          data-name="Rectangle 4121"
          width={26.112}
          height={24}
          fill={props.color ? props.color : colors.text}
          stroke={props.color ? props.color : colors.text}
          strokeWidth={0.1}
        />
      </ClipPath>
    </Defs>
    <G id="Group_5662" data-name="Group 5662" >
      <Path
        id="Path_2360"
        data-name="Path 2360"
        d="M280.318,233.325a6.265,6.265,0,0,0-1.315.048,1.007,1.007,0,0,0-.757,1c-.008.364,0,.728,0,1.1-.212,0-.384,0-.555,0a.38.38,0,0,0-.41.367.372.372,0,0,0,.405.367c.178.005.355,0,.558,0,0,.116,0,.2,0,.292,0,.663,0,1.325,0,1.988,0,.272.139.426.366.425s.365-.158.368-.428c0-.474,0-.949,0-1.423,0-.276,0-.551,0-.853.2,0,.382,0,.56,0a.358.358,0,0,0,.391-.351.364.364,0,0,0-.388-.382c-.178-.007-.356,0-.563,0,0-.35,0-.66,0-.97,0-.346.123-.464.477-.466.254,0,.508.007.761-.005a.354.354,0,0,0,.368-.354.306.306,0,0,0-.268-.357"
        transform="translate(-257.602 -216.756)"
        fill={props.color ? props.color : colors.text}
        stroke={props.color ? props.color : colors.text}
        strokeWidth={0.1}
      />
      <Path
        id="Path_2361"
        data-name="Path 2361"
        d="M278.345,39.577c.005.571.423.818.913.538q1.325-.757,2.643-1.526a.561.561,0,0,0,0-1.044q-1.317-.769-2.642-1.526a.565.565,0,0,0-.917.53c-.005.5,0,1.009,0,1.514s0,1.009,0,1.514m.811-2.7,2.055,1.186-2.055,1.187Z"
        transform="translate(-258.59 -33.354)"
        fill={props.color ? props.color : colors.text}
        stroke={props.color ? props.color : colors.text}
        strokeWidth={0.1}
      />
      <Path
        id="Path_2362"
        data-name="Path 2362"
        d="M32.7,235.37c-.42,0-.841,0-1.261,0s-.855,0-1.283,0a.984.984,0,0,0-1.046,1.037q-.014,1.283,0,2.566a.985.985,0,0,0,1.044,1.042q1.283.013,2.566,0a.982.982,0,0,0,1.034-1.05q.01-1.272,0-2.544A.986.986,0,0,0,32.7,235.37m.39,3.573c0,.293-.112.407-.4.409q-1.26.007-2.521,0c-.278,0-.4-.116-.4-.391q-.007-1.271,0-2.542c0-.274.118-.381.4-.384.42,0,.84,0,1.26,0s.825,0,1.238,0c.309,0,.417.106.418.411q.005,1.249,0,2.5"
        transform="translate(-26.806 -218.336)"
        fill={props.color ? props.color : colors.text}
        stroke={props.color ? props.color : colors.text}
        strokeWidth={0.1}
      />
      <Path
        id="Path_2363"
        data-name="Path 2363"
        d="M51.048,256.261a.993.993,0,1,0,.989,1,.991.991,0,0,0-.989-1m-.01,1.319a.326.326,0,1,1,.034-.651.326.326,0,0,1-.034.651"
        transform="translate(-46.417 -237.897)"
        fill={props.color ? props.color : colors.text}
        stroke={props.color ? props.color : colors.text}
        strokeWidth={0.1}
      />
      <Path
        id="Path_2364"
        data-name="Path 2364"
        d="M23.114,14.9A10.381,10.381,0,0,0,23.1,9.106a4.712,4.712,0,1,0-5.868-6.594,10.358,10.358,0,0,0-8.31.091A4.712,4.712,0,1,0,3.24,9.188a10.386,10.386,0,0,0-.012,5.627A4.712,4.712,0,1,0,8.9,21.436a10.359,10.359,0,0,0,8.349.092,4.712,4.712,0,1,0,5.86-6.628M21.4.71a4,4,0,1,1-4,4,4.007,4.007,0,0,1,4-4M.71,4.713a4,4,0,1,1,4,4,4.007,4.007,0,0,1-4-4m4,18.578a4,4,0,1,1,4-4,4.007,4.007,0,0,1-4,4m8.471-1.639a9.531,9.531,0,0,1-4-.869,4.709,4.709,0,0,0-5.263-6.139A9.669,9.669,0,0,1,3.93,9.359a4.711,4.711,0,0,0,5.265-6.1,9.65,9.65,0,0,1,7.755-.1,4.71,4.71,0,0,0,5.472,6.15,9.67,9.67,0,0,1,.013,5.379,4.711,4.711,0,0,0-5.471,6.188,9.538,9.538,0,0,1-3.781.771M21.4,23.29a4,4,0,1,1,4-4,4.007,4.007,0,0,1-4,4"
        fill={props.color ? props.color : colors.text}
        stroke={props.color ? props.color : colors.text}
        strokeWidth={0.1}
      />
      <Path
        id="Path_2365"
        data-name="Path 2365"
        d="M35.777,41.172l-1.872-2.5,1.7-1.836h-.676L33.6,38.265l-1.071-1.432H30.954l1.776,2.375-1.818,1.964h.676l1.445-1.56,1.167,1.56ZM32.283,37.33l2.5,3.346h-.337l-2.5-3.346Z"
        transform="translate(-28.718 -34.219)"
        fill={props.color ? props.color : colors.text}
        stroke={props.color ? props.color : colors.text}
        strokeWidth={0.1}
      />
      <Path
        id="Path_2366"
        data-name="Path 2366"
        d="M162.826,128.2a1.6,1.6,0,1,0,1.148.468,1.567,1.567,0,0,0-1.148-.468m.959,1.616a.947.947,0,1,1-.277-.682.919.919,0,0,1,.277.682"
        transform="translate(-149.771 -119.099)"
        fill={props.color ? props.color : colors.text}
        stroke={props.color ? props.color : colors.text}
        strokeWidth={0.1}
      />
      <Path
        id="Path_2367"
        data-name="Path 2367"
        d="M127.091,107.508a4.667,4.667,0,0,0-.367-1.843,4.65,4.65,0,0,0-2.5-2.5,4.815,4.815,0,0,0-3.685,0,4.65,4.65,0,0,0-2.5,2.5,4.815,4.815,0,0,0,0,3.685,4.649,4.649,0,0,0,2.5,2.5,4.815,4.815,0,0,0,3.685,0,4.649,4.649,0,0,0,2.5-2.5,4.666,4.666,0,0,0,.367-1.843m-6.117,2.613a4.323,4.323,0,0,1,1.412-.225,4.2,4.2,0,0,1,1.407.23,3.929,3.929,0,0,1,1.072.572,3.742,3.742,0,0,1-1.1.613,4.012,4.012,0,0,1-2.754,0,3.743,3.743,0,0,1-1.1-.614,3.59,3.59,0,0,1,1.068-.576m5.46-2.613a3.884,3.884,0,0,1-.3,1.549,4.094,4.094,0,0,1-.764,1.181,6.005,6.005,0,0,0-1.359-.72,4.838,4.838,0,0,0-3.24,0,6.009,6.009,0,0,0-1.359.72,4.094,4.094,0,0,1-.764-1.181,4.05,4.05,0,1,1,7.791-1.549"
        transform="translate(-109.331 -95.509)"
        fill={props.color ? props.color : colors.text}
        stroke={props.color ? props.color : colors.text}
        strokeWidth={0.1}
      />
    </G>
  </Svg>
)};

export default social;
