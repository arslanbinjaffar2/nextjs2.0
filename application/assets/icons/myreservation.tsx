import * as React from 'react';
import Svg, { SvgProps, G, Path, Defs, ClipPath, Rect } from 'react-native-svg';
import { getColorScheme } from 'application/styles/colors';
import UseEventService from 'application/store/services/UseEventService';

const myreservation = (props: SvgProps) => {
  const { event } = UseEventService()
  const colors = getColorScheme(event?.settings?.app_background_color ?? '#343d50', event?.settings?.app_text_mode);
    return (
     <Svg
      width={24.984}
      height={24.431}
      viewBox="0 0 24.984 24.431"
      {...props}
  >
    <G
      id="Group_5678"
      data-name="Group 5678"
      transform="translate(-27.5 -1577.566)"
    >
      <G id="program" transform="translate(28 1578.137)">
        <Path
          id="Path_32"
          data-name="Path 32"
          d="M-97.221,397.486h-15.155a3.127,3.127,0,0,1-3.123-3.123v-15.74a3.127,3.127,0,0,1,3.123-3.123h17.488a3.127,3.127,0,0,1,3.123,3.123h-1a2.126,2.126,0,0,0-2.123-2.123h-17.488a2.126,2.126,0,0,0-2.123,2.123v15.74a2.126,2.126,0,0,0,2.123,2.123h15.155Z"
          transform="translate(115 -373.626)"
          fill={props.color ? props.color : colors.text}
        />
        <Path
          id="Path_33"
          data-name="Path 33"
          d="M-112.048,397.986A2.957,2.957,0,0,1-115,395.03V378.956A2.957,2.957,0,0,1-112.048,376h17.831a2.957,2.957,0,0,1,2.952,2.956v10.652h-1V378.956A1.956,1.956,0,0,0-94.217,377h-17.831A1.956,1.956,0,0,0-114,378.956V395.03a1.956,1.956,0,0,0,1.952,1.956l17.606,0v1h-.052Z"
          transform="translate(114.5 -374.126)"
          fill={props.color ? props.color : colors.text}
        />
        <G
          id="Group_11"
          data-name="Group 11"
          transform="translate(8.477 -0.07)"
        >
          <Path
            id="Line_18"
            data-name="Line 18"
            d="M0,5.018a.5.5,0,0,1-.5-.5V0A.5.5,0,0,1,0-.5.5.5,0,0,1,.5,0V4.518A.5.5,0,0,1,0,5.018Z"
            transform="translate(0)"
            fill={props.color ? props.color : colors.text}
          />
          <Path
            id="Line_19"
            data-name="Line 19"
            d="M0,5.018a.5.5,0,0,1-.5-.5V0A.5.5,0,0,1,0-.5.5.5,0,0,1,.5,0V4.518A.5.5,0,0,1,0,5.018Z"
            transform="translate(6.777)"
            fill={props.color ? props.color : colors.text}
          />
        </G>
        <Path
          id="Line_20"
          data-name="Line 20"
          d="M14.865.5H0A.5.5,0,0,1-.5,0,.5.5,0,0,1,0-.5H14.865a.5.5,0,0,1,.5.5A.5.5,0,0,1,14.865.5Z"
          transform="translate(4.153 7.402)"
          fill={props.color ? props.color : colors.text}
        />
        <Path
          id="Ellipse_1"
          data-name="Ellipse 1"
          d="M5.146,1A4.146,4.146,0,1,0,9.292,5.146,4.151,4.151,0,0,0,5.146,1m0-1A5.146,5.146,0,1,1,0,5.146,5.146,5.146,0,0,1,5.146,0Z"
          transform="translate(14.192 13.505)"
          fill={props.color ? props.color : colors.text}
        />
        <Path
          id="Icon_awesome-heart"
          data-name="Icon awesome-heart"
          d="M1.393,1.848a1.9,1.9,0,0,1,1.278.5,1.9,1.9,0,0,1,1.278-.5,1.749,1.749,0,0,1,1.134.415,1.867,1.867,0,0,1,.657,1.346,1.9,1.9,0,0,1-.527,1.406L3.193,7.1a.727.727,0,0,1-1.047,0L.127,5.015A1.9,1.9,0,0,1-.4,3.609,1.868,1.868,0,0,1,.258,2.263,1.75,1.75,0,0,1,1.393,1.848ZM2.67,3.5l-.493-.508a1.1,1.1,0,0,0-.785-.34.936.936,0,0,0-.616.224A1.075,1.075,0,0,0,.4,3.647a1.1,1.1,0,0,0,.3.812L2.67,6.49,4.638,4.458a1.094,1.094,0,0,0,.3-.811,1.075,1.075,0,0,0-.377-.775.935.935,0,0,0-.615-.224,1.1,1.1,0,0,0-.785.34Z"
          transform="translate(16.668 14.144)"
          fill={props.color ? props.color : colors.text}
        />
      </G>
      <Path
        id="done_FILL0_wght200_GRAD0_opsz24"
        d="M186.915-683.155l-3.684-3.684.529-.529,3.155,3.155L193.7-691l.529.529Z"
        transform="translate(-149.731 2279.125)"
        fill={props.color ? props.color : colors.text}
      />
      <Path
        id="done_FILL0_wght200_GRAD0_opsz24_-_Outline"
        data-name="done_FILL0_wght200_GRAD0_opsz24 - Outline"
        d="M186.915-683.013l-3.825-3.825.67-.67,3.155,3.155,6.787-6.787.67.67Zm-3.542-3.825,3.542,3.542,7.175-7.175-.387-.387-6.787,6.787-3.155-3.155Z"
        transform="translate(-149.731 2279.125)"
        fill={props.color ? props.color : colors.text}
      />
    </G>
  </Svg>
)};

export default myreservation;
