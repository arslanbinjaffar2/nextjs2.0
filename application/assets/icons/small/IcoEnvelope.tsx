import * as React from 'react';
import Svg, { SvgProps , G , Path } from "react-native-svg";
import { getColorScheme } from 'application/styles/colors';
import UseEventService from 'application/store/services/UseEventService';

const IcoEnvelope = (props: SvgProps) => {
  const { event } = UseEventService()
  const colors = getColorScheme(event?.settings?.app_background_color ?? '#343d50', event?.settings?.app_text_mode);
  return (
 <Svg
    width={17.947}
    height={12.131}
    viewBox="0 0 17.947 12.131"
    {...props}
  >
    <G id="mail" transform="translate(0.25 0.25)">
      <G id="Group_39" data-name="Group 39">
        <Path
          id="Path_116"
          data-name="Path 116"
          d="M16.552,85.333H.895A.9.9,0,0,0,0,86.228v9.842a.9.9,0,0,0,.895.895H16.552a.9.9,0,0,0,.895-.895V86.228A.9.9,0,0,0,16.552,85.333ZM16.216,86,9.238,91.238a.935.935,0,0,1-1.029,0L1.23,86Zm-3.728,5.579,3.8,4.7.013.013H1.143l.013-.013,3.8-4.7a.336.336,0,0,0-.522-.422L.671,95.812V86.423l7.135,5.351a1.6,1.6,0,0,0,1.834,0l7.135-5.351v9.389L13.01,91.161a.336.336,0,0,0-.522.422Z"
          transform="translate(0 -85.333)"
          fill={colors.text ? colors.text : '#e3e3e3'}
          stroke={colors.text ? colors.text : '#e3e3e3'}
          strokeWidth={0.5}
        />
      </G>
    </G>
  </Svg>
)};

export default IcoEnvelope;
