import * as React from 'react';
import Svg, { SvgProps, G, Path, Rect } from 'react-native-svg';
import { getColorScheme } from 'application/styles/colors';
import UseEventService from 'application/store/services/UseEventService';

const help_desk = (props: SvgProps) => {
  const { event } = UseEventService()
  const colors = getColorScheme(event?.settings?.app_background_color ?? '#343d50', event?.settings?.app_text_mode);
  return(
    <Svg
      width={props.width}
      height={props.height}
      viewBox="0 0 19.534 24"
      {...props}
    >
      <Path
        id="Union_32"
        data-name="Union 32"
        d="M2,24a2,2,0,0,1-2-2V12.815a2,2,0,0,1,2-2H3.63L5.351,6.131A2.123,2.123,0,0,1,7.318,4.648h.131l2.13,1.57,2.3-1.57H12a2.1,2.1,0,0,1,1.935,1.4l1.97,4.771h1.63a2,2,0,0,1,2,2V22a2,2,0,0,1-2,2ZM.8,12.815V22A1.2,1.2,0,0,0,2,23.2H17.533a1.2,1.2,0,0,0,1.2-1.2V12.815a1.2,1.2,0,0,0-1.2-1.2H2A1.2,1.2,0,0,0,.8,12.815ZM12.027,8.4l1,2.322a.357.357,0,0,1,.027.094h1.984L13.189,6.338a1.328,1.328,0,0,0-1.076-.884L9.563,7.2,7.2,5.455a1.35,1.35,0,0,0-1.089.94l0,.008-1.62,4.413h1.64a.357.357,0,0,1,.027-.094l1-2.322a.4.4,0,1,1,.734.317l-.9,2.1H12.2l-.9-2.1a.4.4,0,0,1,.734-.317ZM9.13,21.332a.515.515,0,1,1,.373.159A.52.52,0,0,1,9.13,21.332Zm.031-2.357v-.2a2.506,2.506,0,0,1,.227-1.083,3.493,3.493,0,0,1,.9-1.062,3.018,3.018,0,0,0,.581-.69,1.412,1.412,0,0,0,.181-.714,1.3,1.3,0,0,0-.407-.984,1.561,1.561,0,0,0-1.138-.4,1.54,1.54,0,0,0-.884.226,1.881,1.881,0,0,0-.569.634l-.095.167L7.3,14.536l.1-.181a2.567,2.567,0,0,1,.851-.919A2.306,2.306,0,0,1,9.5,13.115a2.2,2.2,0,0,1,1.683.639,2.094,2.094,0,0,1,.594,1.472,2.234,2.234,0,0,1-.241,1.021,2.721,2.721,0,0,1-.671.84,3.281,3.281,0,0,0-.81.9,1.822,1.822,0,0,0-.165.787v.2ZM7.767,2.164A2.165,2.165,0,1,1,9.932,4.329,2.165,2.165,0,0,1,7.767,2.164Zm.8,0A1.364,1.364,0,1,0,9.932.8,1.366,1.366,0,0,0,8.567,2.164Z"
        fill={props.color ? props.color : colors.text}
      />
    </Svg>
  )};

export default help_desk;
