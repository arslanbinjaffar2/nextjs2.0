import * as React from 'react';
import Svg, { SvgProps, G, Path } from 'react-native-svg';
import { getColorScheme } from 'application/styles/colors';
import UseEventService from 'application/store/services/UseEventService';

const Icoresume = (props: SvgProps) => {
  const { event } = UseEventService()
  const colors = getColorScheme(event?.settings?.app_background_color ?? '#343d50', event?.settings?.app_text_mode);
  
  return (
  <Svg
    
    width={props.width}
    height={props.height}
    viewBox="0 0 23.116 25.258"
  >
    <G id="Group_951" data-name="Group 951" transform="translate(0.5 0.5)">
      <Path
        id="Path_28"
        data-name="Path 28"
        d="M99.064,401.934H89.738a.567.567,0,1,0,0,1.133h9.331a.567.567,0,1,0-.006-1.133Zm0,0"
        transform="translate(-86.402 -385.34)"
        fill={props.color ? props.color : colors.text}
      />
      <G id="Group_33" data-name="Group 33" transform="translate(2.272 7.974)">
        <Path
          id="Path_21"
          data-name="Path 21"
          d="M528.506-469.931a1.768,1.768,0,0,1,1.018.26,1.434,1.434,0,0,1,.516.9.309.309,0,0,0,.314.279h.5a.286.286,0,0,0,.189-.071.243.243,0,0,0,.09-.19v-.023a2.128,2.128,0,0,0-.331-1.03,2.194,2.194,0,0,0-.887-.78,3.1,3.1,0,0,0-1.409-.3,2.536,2.536,0,0,0-1.9.684,2.737,2.737,0,0,0-.7,1.857c-.006.169-.009.445-.009.819s0,.637.009.8a2.742,2.742,0,0,0,.7,1.862,2.542,2.542,0,0,0,1.908.68,3.1,3.1,0,0,0,1.409-.3,2.193,2.193,0,0,0,.887-.78,2.136,2.136,0,0,0,.33-1.034.23.23,0,0,0-.081-.209.3.3,0,0,0-.2-.071h-.5a.307.307,0,0,0-.2.066.376.376,0,0,0-.111.213,1.393,1.393,0,0,1-.511.9,1.79,1.79,0,0,1-1.023.261c-.991,0-1.489-.538-1.524-1.645-.006-.172-.009-.43-.009-.767s0-.589.009-.749C527.017-469.393,527.516-469.931,528.506-469.931Z"
          transform="translate(-525.889 470.879)"
          fill={props.color ? props.color : colors.text}
        />
        <Path
          id="Path_22"
          data-name="Path 22"
          d="M597.988-469.785a.277.277,0,0,0-.192-.078h-.471a.315.315,0,0,0-.212.076.339.339,0,0,0-.108.147l-1.692,4.893-1.686-4.9a.338.338,0,0,0-.326-.216h-.471a.263.263,0,0,0-.19.081.264.264,0,0,0-.081.19l.02.116,2.024,5.84v0a.422.422,0,0,0,.419.293h.589a.417.417,0,0,0,.41-.3l2.03-5.826.022-.113,0-.016A.258.258,0,0,0,597.988-469.785Z"
          transform="translate(-586.616 469.954)"
          fill={props.color ? props.color : colors.text}
        />
      </G>
      <Path
        id="Path_20"
        data-name="Path 20"
        d="M700.575-272.584l-1.481,1.6v-3.935a.361.361,0,0,0-.36-.36.361.361,0,0,0-.36.36v3.935l-1.492-1.6a.364.364,0,0,0-.512-.018.359.359,0,0,0-.018.508l2.108,2.266a.362.362,0,0,0,.263.115.363.363,0,0,0,.263-.115l2.111-2.266a.359.359,0,0,0-.014-.508A.359.359,0,0,0,700.575-272.584Z"
        transform="translate(-681.444 292.028)"
        fill={props.color ? props.color : colors.text}
      />
      <Path
        id="Path_33"
        data-name="Path 33"
        d="M17.352,6.366v8.989a4.7,4.7,0,0,0-3.419,7.474H3.039A2.536,2.536,0,0,1,.5,20.289V3.039A2.541,2.541,0,0,1,3.039.5h8.777Z"
        transform="translate(-0.5 -0.5)"
        fill="none"
        stroke={props.color ? props.color : colors.text}
        strokeMiterlimit={10}
        strokeWidth={1}
      />
      <Path
        id="Path_34"
        data-name="Path 34"
        d="M13.873.5V4.867A1.692,1.692,0,0,0,15.566,6.56h3.843"
        transform="translate(-2.554 -0.5)"
        fill="none"
        stroke={props.color ? props.color : colors.text}
        strokeMiterlimit={10}
        strokeWidth={1}
      />
      <Path
        id="Path_35"
        data-name="Path 35"
        d="M24.71,22.744a4.71,4.71,0,1,1-5.087-4.7c.127-.008.254-.017.381-.017A4.709,4.709,0,0,1,24.71,22.744Z"
        transform="translate(-2.594 -3.193)"
        fill="none"
        stroke={props.color ? props.color : colors.text}
        strokeMiterlimit={10}
        strokeWidth={1}
      />
    </G>
  </Svg>
)};

export default Icoresume;
