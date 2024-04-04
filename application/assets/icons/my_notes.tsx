import * as React from 'react';
import Svg, { SvgProps,Defs, ClipPath, Rect, G, Path  } from 'react-native-svg';
import { getColorScheme } from 'application/styles/colors';
import UseEventService from 'application/store/services/UseEventService';

const my_notes = (props: SvgProps) => {
  const { event } = UseEventService()
  const colors = getColorScheme(event?.settings?.app_background_color ?? '#343d50', event?.settings?.app_text_mode);
  return (
  <Svg
    id="Group_5692"
    width={21.366}
    height={26}
    viewBox="0 0 21.366 26"
    {...props}
  >
    <Defs>
      <ClipPath id="clip-path">
        <Rect
          id="Rectangle_4126"
          data-name="Rectangle 4126"
          width={21.366}
          height={26}
          fill="none"
        />
      </ClipPath>
    </Defs>
    <G
      id="Group_5689"
      data-name="Group 5689"
      transform="translate(0 0)"
      clipPath="url(#clip-path)"
    >
      <Path
        id="Path_2372"
        data-name="Path 2372"
        d="M7.759,12.617H3.341a.486.486,0,1,0,0,.971H7.759a.486.486,0,1,0,0-.971"
        transform="translate(-0.082 -0.364)"
        fill={props.color ? props.color : colors.text}
      />
      <Path
        id="Path_2373"
        data-name="Path 2373"
        d="M7.354,15.82H3.341a.486.486,0,1,0,0,.971H7.354a.486.486,0,1,0,0-.971"
        transform="translate(-0.082 -0.456)"
        fill={props.color ? props.color : colors.text}
      />
      <Path
        id="Path_2374"
        data-name="Path 2374"
        d="M12.32,5.26a1.109,1.109,0,0,0-.4-.282,1.327,1.327,0,0,0-1.088,0,1.16,1.16,0,0,0-.369.243l-.01.01L6.5,9.193a.373.373,0,0,0-.126.214L5.93,11.019a.508.508,0,0,0,.126.466.477.477,0,0,0,.35.146.668.668,0,0,0,.126-.019l1.612-.437a.482.482,0,0,0,.214-.126L12.32,7.086a1.307,1.307,0,0,0,0-1.826m-.69,1.146L7.765,10.271l-.67.185.185-.67,3.865-3.865a.337.337,0,0,1,.476.01.347.347,0,0,1,.01.476"
        transform="translate(-0.171 -0.14)"
        fill={props.color ? props.color : colors.text}
      />
      <Path
        id="Path_2375"
        data-name="Path 2375"
        d="M18.447,18.214l-.1-.1a2.251,2.251,0,0,0-1.777-.466,2.172,2.172,0,0,0-.68.233,1.613,1.613,0,0,0-.291.185,1.015,1.015,0,0,0-.2.165,2.112,2.112,0,0,0-1.059-.554,2.052,2.052,0,0,0-.971,0,2.113,2.113,0,0,0-.942.447,2.293,2.293,0,0,0-.767,2.195,2.089,2.089,0,0,0,.427.961v.01a.911.911,0,0,0,.087.117l1.02,1.059.66.68.282.291.612.631a.854.854,0,0,0,.631.272.943.943,0,0,0,.651-.262l2.5-2.574a2.33,2.33,0,0,0-.078-3.292m-.622,2.612-1.5,1.544-.738.767-.01.01-.194.194-.058-.068-.35-.359-.427-.447h-.01L13.31,21.2a.669.669,0,0,0,.078-.029.183.183,0,0,1-.078.019l-.4-.408a1.432,1.432,0,0,1-.262-.456,1.363,1.363,0,0,1,.4-1.447,1.059,1.059,0,0,1,.32-.185,1.16,1.16,0,0,1,.476-.1,1.084,1.084,0,0,1,.5.107,1.068,1.068,0,0,1,.447.311l.6.612.214-.214.291-.3L16,19a1.134,1.134,0,0,1,.573-.34,1.194,1.194,0,0,1,1.165.214l.018.02.02.018a1.352,1.352,0,0,1,.049,1.913"
        transform="translate(-0.335 -0.508)"
        fill={props.color ? props.color : colors.text}
      />
      <Path
        id="Path_2376"
        data-name="Path 2376"
        d="M19.52,15.23a7.908,7.908,0,0,0-.932-.777,7.191,7.191,0,0,0-1.078-.583,6.034,6.034,0,0,0-1.272-.379V6.6a2.037,2.037,0,0,0-2.02-2.049h-.243A1.544,1.544,0,0,0,12.45,3.284H6.866v-1.1a2.187,2.187,0,0,0-4.373,0v1.1H1.564A1.554,1.554,0,0,0,0,4.838V19.221a1.549,1.549,0,0,0,.456,1.1,1.456,1.456,0,0,0,.5.34,1.641,1.641,0,0,0,.612.126h.524a1.719,1.719,0,0,0-.01.223,1.968,1.968,0,0,0,.175.758,1.156,1.156,0,0,0,.087.146,1.741,1.741,0,0,0,.369.486,1.937,1.937,0,0,0,1.34.534H9.644l.175.291a7.908,7.908,0,0,0,.777.932A6.311,6.311,0,0,0,19.52,15.23M15.267,6.6v6.788a1.574,1.574,0,0,0-.214-.01A6.2,6.2,0,0,0,14,13.462V5.518h.2A1.065,1.065,0,0,1,15.267,6.6m-11.8-4.41a1.215,1.215,0,0,1,2.431,0v1.1H5.734l0-.712a1.053,1.053,0,0,0-2.105,0l0,.713H3.464ZM4.6,4.256h.165v.16a.485.485,0,0,0,.485.487h0a.485.485,0,0,0,.486-.485V4.256h.162V4.7a.641.641,0,0,1-.189.459.651.651,0,0,1-.459.191h0a.65.65,0,0,1-.65-.647Zm.166-.971H4.6l0-.712c0-.089.163-.088.163,0Zm-3.2,16.529a.589.589,0,0,1-.592-.592V4.838a.587.587,0,0,1,.592-.583H3.625v.451A1.621,1.621,0,0,0,5.245,6.324h0A1.623,1.623,0,0,0,6.866,4.7V4.256H12.45a.584.584,0,0,1,.583.583v8.876c-.058.019-.117.029-.165.049-.1.039-.185.068-.272.107a6.647,6.647,0,0,0-1.068.583h-.01a6.73,6.73,0,0,0-1.7,1.7v.01a6.647,6.647,0,0,0-.583,1.068,6.272,6.272,0,0,0-.5,2.457.554.554,0,0,0,.01.126ZM4.1,21.96a1.012,1.012,0,0,1-1.049-.981,1.3,1.3,0,0,1,.01-.194H8.838a5.837,5.837,0,0,0,.33,1.175Zm10.955,3.069a5.317,5.317,0,0,1-4.234-2.1,2.036,2.036,0,0,1-.214-.291,4.661,4.661,0,0,1-.379-.68,4.933,4.933,0,0,1-.4-1.175.01.01,0,0,0-.01-.01,5.2,5.2,0,0,1-.1-.961.554.554,0,0,1-.01-.126,5.357,5.357,0,0,1,5.341-5.341,1.574,1.574,0,0,1,.214.01c.1,0,.194.01.291.019a3.965,3.965,0,0,1,.68.107,5.34,5.34,0,0,1-1.185,10.547"
        transform="translate(0 0)"
        fill={props.color ? props.color : colors.text}
      />
    </G>
  </Svg>
)};

export default my_notes;
