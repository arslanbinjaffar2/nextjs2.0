import * as React from 'react';
import Svg, { SvgProps, G, Path } from 'react-native-svg';
import { getColorScheme } from 'application/styles/colors';
import UseEventService from 'application/store/services/UseEventService';

const survey = (props: SvgProps) => {
  const { event } = UseEventService()
  const colors = getColorScheme(event?.settings?.app_background_color ?? '#343d50', event?.settings?.app_text_mode);
  return (
  <Svg
    width={props.width}
    height={props.height}
    viewBox="0 0 46.238 64"
  >
    <G
      id="Group_689"
      data-name="Group 689"
      transform="translate(-656.925 -785.001)"
    >
      <Path
        id="Path_1748"
        data-name="Path 1748"
        d="M7.83,16.483a1.75,1.75,0,0,1-1.738-1.735V7.48A1.74,1.74,0,0,1,7.83,5.746h7.864a7.453,7.453,0,0,1,14.508,0h7.863A1.741,1.741,0,0,1,39.8,7.478v7.264a1.749,1.749,0,0,1-1.728,1.74Zm.649-8.351V14.1H37.411V8.132H29.639a1.75,1.75,0,0,1-1.7-1.518,5.068,5.068,0,0,0-10,.038,1.739,1.739,0,0,1-1.69,1.48Zm7.107-1.867-.007.04ZM30.3,6.234v0"
        transform="translate(657.101 785)"
        fill={colors.text ? colors.text : '#fff'}
      />
      <Path
        id="Path_1749"
        data-name="Path 1749"
        d="M42.209,63.736H4.03A4.036,4.036,0,0,1,0,59.7V13.166A4.035,4.035,0,0,1,4.031,9.137H7.2v2.387H4.03a1.646,1.646,0,0,0-1.646,1.646V59.707A1.646,1.646,0,0,0,4.03,61.354H42.2a1.646,1.646,0,0,0,1.646-1.646V13.166A1.646,1.646,0,0,0,42.2,11.519H38.754V9.132H42.21a4.033,4.033,0,0,1,4.028,4.028V59.7a4.034,4.034,0,0,1-4.028,4.028"
        transform="translate(656.925 785.265)"
        fill={colors.text ? colors.text : '#fff'}
      />
      <Path
        id="Path_1750"
        data-name="Path 1750"
        d="M15.412,31.87H9.553a2.817,2.817,0,0,1-2.819-2.814V25.285a2.816,2.816,0,0,1,2.814-2.811h5.859a2.815,2.815,0,0,1,2.811,2.811v3.771a2.817,2.817,0,0,1-2.811,2.814M9.553,24.86a.426.426,0,0,0-.427.425v3.771a.429.429,0,0,0,.427.427h5.859a.429.429,0,0,0,.425-.427V25.285a.426.426,0,0,0-.425-.425Z"
        transform="translate(657.12 785.651)"
        fill={colors.text ? colors.text : '#fff'}
      />
      <Path
        id="Path_1751"
        data-name="Path 1751"
        d="M15.837,46.2V47.32a.429.429,0,0,1-.425.427H9.553a.429.429,0,0,1-.427-.427V43.549a.426.426,0,0,1,.427-.425h2.959V40.738H9.548a2.815,2.815,0,0,0-2.814,2.811V47.32a2.817,2.817,0,0,0,2.819,2.814h5.854a2.817,2.817,0,0,0,2.811-2.814V46.2Z"
        transform="translate(657.12 786.18)"
        fill={colors.text ? colors.text : '#fff'}
      />
      <Path
        id="Path_1752"
        data-name="Path 1752"
        d="M13.935,47.743,10.1,45.609a.9.9,0,0,1,.87-1.57L13.4,45.4l5.312-7.483a.893.893,0,1,1,1.5.965c-.014.022-.029.043-.045.064Z"
        transform="translate(657.204 786.086)"
        fill={colors.text ? colors.text : '#fff'}
      />
      <Path
        id="Path_1753"
        data-name="Path 1753"
        d="M39.112,28.265H25.936a1.194,1.194,0,1,1-.07-2.386c.024,0,.046,0,.07,0H39.112a1.194,1.194,0,1,1,.07,2.386c-.024,0-.046,0-.07,0"
        transform="translate(657.64 785.75)"
        fill={colors.text ? colors.text : '#fff'}
      />
      <Path
        id="Path_1754"
        data-name="Path 1754"
        d="M39.112,46.531H25.936a1.194,1.194,0,1,1-.07-2.386c.024,0,.046,0,.07,0H39.112a1.194,1.194,0,1,1,.07,2.386c-.024,0-.046,0-.07,0"
        transform="translate(657.64 786.279)"
        fill={colors.text ? colors.text : '#fff'}
      />
    </G>
  </Svg>
)};

export default survey;
