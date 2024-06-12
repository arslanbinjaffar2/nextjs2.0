import * as React from 'react';
import Svg, { SvgProps, Defs, ClipPath, Rect, G, Path } from 'react-native-svg';
import { getColorScheme } from 'application/styles/colors';
import UseEventService from 'application/store/services/UseEventService';

const Icohotelbed = (props: SvgProps) => {

  const { event } = UseEventService()
  const colors = getColorScheme(event?.settings?.app_background_color ?? '#343d50', event?.settings?.app_text_mode);
  
  return (
  <Svg
    width={props.width}
    height={props.height}
    viewBox="0 0 32.007 23.944"
  >
    <Defs>
      <ClipPath id="clip-path">
        <Rect
          id="Rectangle_146"
          data-name="Rectangle 146"
          width={32.007}
          height={23.944}
          fill="none"
        />
      </ClipPath>
    </Defs>
    <G id="Group_704" data-name="Group 704" transform="translate(0 0)">
      <G
        id="Group_703"
        data-name="Group 703"
        transform="translate(0 0)"
        
      >
        <Path
          id="Path_1806"
          data-name="Path 1806"
          d="M.64,23.944A.64.64,0,0,1,0,23.3V.64a.64.64,0,0,1,1.28,0V23.3a.64.64,0,0,1-.64.64"
          transform="translate(0 0)"
          fill={props.color ? props.color : colors.text}
        />
        <Path
          id="Path_1807"
          data-name="Path 1807"
          d="M24.643,21.232a.641.641,0,0,1-.64-.639L23.975,10.3a.64.64,0,0,1,.639-.641h0a.641.641,0,0,1,.64.638l.028,10.293a.64.64,0,0,1-.639.641Z"
          transform="translate(6.723 2.708)"
          fill={props.color ? props.color : colors.text}
        />
        <Path
          id="Path_1808"
          data-name="Path 1808"
          d="M1.085,11.343a.64.64,0,0,1,0-1.28l30.143-.029a.64.64,0,0,1,0,1.28l-30.141.029Z"
          transform="translate(0.125 2.813)"
          fill={props.color ? props.color : colors.text}
        />
        <Path
          id="Path_1809"
          data-name="Path 1809"
          d="M1.085,16.3a.64.64,0,0,1,0-1.28l30.143-.029a.64.64,0,0,1,0,1.28L1.086,16.3Z"
          transform="translate(0.125 4.204)"
          fill={props.color ? props.color : colors.text}
        />
        <Path
          id="Path_1810"
          data-name="Path 1810"
          d="M28.171,12.086a.64.64,0,0,1-.64-.64V7.989A1.749,1.749,0,0,0,27,6.752a1.836,1.836,0,0,0-1.254-.5H9.585A1.734,1.734,0,0,0,7.792,7.994v3.452a.64.64,0,0,1-1.28,0V7.989A3.047,3.047,0,0,1,9.593,4.968H25.738a3.084,3.084,0,0,1,2.158.869,3.026,3.026,0,0,1,.916,2.143v3.465a.64.64,0,0,1-.64.64"
          transform="translate(1.826 1.393)"
          fill={props.color ? props.color : colors.text}
        />
        <Path
          id="Path_1811"
          data-name="Path 1811"
          d="M4.481,11.369A3.318,3.318,0,1,1,6.829,10.4a3.294,3.294,0,0,1-2.348.973Zm0-5.357a2.038,2.038,0,1,0,0,4.077h0a2.038,2.038,0,0,0,0-4.077M7.8,8.049h0Z"
          transform="translate(0.326 1.326)"
          fill={props.color ? props.color : colors.text}
        />
      </G>
    </G>
  </Svg>
)};

export default Icohotelbed;
