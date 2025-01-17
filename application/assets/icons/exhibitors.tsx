import * as React from 'react';
import Svg, { SvgProps, G, Path, Rect } from 'react-native-svg';
import { getColorScheme } from 'application/styles/colors';
import UseEventService from 'application/store/services/UseEventService';

const exhibitors = (props: SvgProps) => {
  const { event } = UseEventService()
  const colors = getColorScheme(event?.settings?.app_background_color ?? '#343d50', event?.settings?.app_text_mode);
  return (
  <Svg
    width={props.width}
    height={props.height}
    viewBox="0 0 53.552 57.04"
  >
    <G
      id="Group_685"
      data-name="Group 685"
      transform="translate(-670 -517.714)"
    >
      <Path
        id="Path_1653"
        data-name="Path 1653"
        d="M42.353,180.239H4.327V157.19a3.342,3.342,0,0,1,3.337-3.339H39.017a3.341,3.341,0,0,1,3.337,3.339ZM6.66,177.905H40.02V157.19a1.007,1.007,0,0,0-1-1.006H7.664a1.007,1.007,0,0,0-1,1.006Z"
        transform="translate(673.436 394.516)"
        fill={props.color ? props.color : colors.text}
      />
      <Path
        id="Path_1654"
        data-name="Path 1654"
        d="M50.62,195.818H45.9v-2.333H50.62a1.6,1.6,0,0,0,1.6-1.6V144.643a1.6,1.6,0,0,0-1.6-1.6H4.929a1.6,1.6,0,0,0-1.6,1.6v47.243a1.6,1.6,0,0,0,1.6,1.6h4v2.333h-4A3.936,3.936,0,0,1,1,191.886V144.643a3.935,3.935,0,0,1,3.929-3.929H50.62a3.936,3.936,0,0,1,3.932,3.929v47.243a3.936,3.936,0,0,1-3.932,3.932"
        transform="translate(669 377)"
        fill={props.color ? props.color : colors.text}
      />
      <Rect
        id="Rectangle_132"
        data-name="Rectangle 132"
        width={37.249}
        height={2.333}
        transform="translate(678.15 554.576)"
        fill={props.color ? props.color : colors.text}
      />
      <Path
        id="Path_1655"
        data-name="Path 1655"
        d="M15.358,152.3a5.045,5.045,0,1,1,5.045-5.045,5.051,5.051,0,0,1-5.045,5.045m0-7.756a2.711,2.711,0,1,0,2.711,2.711,2.714,2.714,0,0,0-2.711-2.711"
        transform="translate(681.417 378.997)"
        fill={props.color ? props.color : colors.text}
      />
      <Path
        id="Path_1656"
        data-name="Path 1656"
        d="M32.009,163.168l-4.384-11.132a2.694,2.694,0,0,0-2.443-1.934H14.828a2.667,2.667,0,0,0-2.41,1.976L8.552,163.121l-2.2-.77,3.843-10.964a4.97,4.97,0,0,1,4.583-3.617l10.458,0a5.013,5.013,0,0,1,4.59,3.491l4.359,11.053Z"
        transform="translate(676.132 386.405)"
        fill={props.color ? props.color : colors.text}
      />
      <Path
        id="Path_1657"
        data-name="Path 1657"
        d="M9.815,158.944a1.166,1.166,0,0,1-1.071-1.626l2.329-5.411a1.157,1.157,0,0,1,1.533-.609,1.169,1.169,0,0,1,.611,1.531l-2.331,5.409a1.164,1.164,0,0,1-1.071.707"
        transform="translate(679.199 390.979)"
        fill={props.color ? props.color : colors.text}
      />
      <Path
        id="Path_1658"
        data-name="Path 1658"
        d="M17.134,158.944a1.164,1.164,0,0,1-1.071-.707l-2.331-5.409a1.167,1.167,0,0,1,2.144-.922l2.329,5.411a1.166,1.166,0,0,1-1.071,1.626"
        transform="translate(685.85 390.979)"
        fill={props.color ? props.color : colors.text}
      />
    </G>
  </Svg>
)};

export default exhibitors;
