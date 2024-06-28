import * as React from 'react';
import Svg, { SvgProps , G , Path, Defs , ClipPath, Rect} from "react-native-svg";
import { getColorScheme } from 'application/styles/colors';
import UseEventService from 'application/store/services/UseEventService';

const IcoClipboard = (props: SvgProps) => {
  const { event } = UseEventService()
  const colors = getColorScheme(event?.settings?.app_background_color ?? '#343d50', event?.settings?.app_text_mode);
  return (
<Svg
    width={14}
    height={18}
    viewBox="0 0 14 18"
    {...props}
  >
    <Defs>
      <ClipPath id="clip-path">
        <Rect
          id="Rectangle_4109"
          data-name="Rectangle 4109"
          width={14}
          height={18}
          fill={colors.text ? colors.text : '#fff'}
        />
      </ClipPath>
    </Defs>
    <G id="Group_5539" data-name="Group 5539" >
      <Path
        id="Rectangle_4108"
        data-name="Rectangle 4108"
        d="M1.331-.5H11.669A1.833,1.833,0,0,1,13.5,1.331V13.51a1.833,1.833,0,0,1-1.831,1.831H1.331A1.833,1.833,0,0,1-.5,13.51V1.331A1.833,1.833,0,0,1,1.331-.5ZM11.669,14.264a.755.755,0,0,0,.754-.754V1.331a.755.755,0,0,0-.754-.754H1.331a.755.755,0,0,0-.754.754V13.51a.755.755,0,0,0,.754.754Z"
        transform="translate(0.5 2.118)"
        fill={colors.text ? colors.text : '#fff'}
      />
      <Path
        id="Line_235"
        data-name="Line 235"
        d="M.038,3.813A.538.538,0,0,1-.5,3.275V.038a.538.538,0,1,1,1.077,0V3.275A.538.538,0,0,1,.038,3.813Z"
        transform="translate(3.749 0.5)"
        fill={colors.text ? colors.text : '#fff'}
      />
      <Path
        id="Line_236"
        data-name="Line 236"
        d="M.038,3.813A.538.538,0,0,1-.5,3.275V.038a.538.538,0,1,1,1.077,0V3.275A.538.538,0,0,1,.038,3.813Z"
        transform="translate(10.419 0.5)"
        fill={colors.text ? colors.text : '#fff'}
      />
      <Path
        id="Line_237"
        data-name="Line 237"
        d="M8.052.577H.038A.538.538,0,1,1,.038-.5H8.052a.538.538,0,1,1,0,1.077Z"
        transform="translate(2.955 7.353)"
        fill={colors.text ? colors.text : '#fff'}
      />
      <Path
        id="Line_238"
        data-name="Line 238"
        d="M8.052.577H.038A.538.538,0,1,1,.038-.5H8.052a.538.538,0,1,1,0,1.077Z"
        transform="translate(2.955 10.576)"
        fill={colors.text ? colors.text : '#fff'}
      />
      <Path
        id="Line_239"
        data-name="Line 239"
        d="M3.586.577H.038A.538.538,0,1,1,.038-.5H3.586a.538.538,0,1,1,0,1.077Z"
        transform="translate(2.955 13.799)"
        fill={colors.text ? colors.text : '#fff'}
      />
    </G>
  </Svg>
)};

export default IcoClipboard;
