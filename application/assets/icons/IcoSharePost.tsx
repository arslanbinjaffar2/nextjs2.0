import * as React from 'react';
import Svg, { SvgProps, G, Path } from 'react-native-svg';
import { getColorScheme } from 'application/styles/colors';
import UseEventService from 'application/store/services/UseEventService';

const IcoSharePost = (props: SvgProps) => {
  const { event } = UseEventService()
  const colors = getColorScheme(event?.settings?.app_background_color ?? '#343d50', event?.settings?.app_text_mode);
  return (
  <Svg
    
    width={16.771}
    height={14.221}
    viewBox="0 0 16.771 14.221"
    {...props}
  >
    <G id="_1" data-name={1} transform="translate(0.801 -4.232)">
      <G id="Group_39" data-name="Group 39" transform="translate(-0.301 5.334)">
        <Path
          id="Path_78"
          data-name="Path 78"
          d="M99.934,178.867v3.649H86V172h4.019"
          transform="translate(-86 -169.897)"
          fill="none"
          stroke={colors.text ? colors.text : '#fff'}
          strokeLinecap="round"
          strokeMiterlimit={10}
          strokeWidth={1}
        />
        <Path
          id="Path_79"
          data-name="Path 79"
          d="M101,175.676a6.788,6.788,0,0,1,6.31-3.418v2.1l4.207-3.681L107.31,167v2.366C103.507,169.834,101.324,171.861,101,175.676Z"
          transform="translate(-96.005 -167)"
          fill="none"
          stroke={colors.text ? colors.text : '#fff'}
          strokeMiterlimit={10}
          strokeWidth={1}
        />
      </G>
    </G>
  </Svg>
)};

export default IcoSharePost;
