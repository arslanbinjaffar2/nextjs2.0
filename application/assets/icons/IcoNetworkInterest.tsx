import * as React from 'react';
import Svg, { SvgProps, G, Path } from 'react-native-svg';
import { getColorScheme } from 'application/styles/colors';
import UseEventService from 'application/store/services/UseEventService';

const IcoNetworkInterest = (props: SvgProps) => {

  const { event } = UseEventService()
  const colors = getColorScheme(event?.settings?.app_background_color ?? '#343d50', event?.settings?.app_text_mode);
  
  return (
  <Svg
    width={props.width}
    height={props.height}
    viewBox="0 0 51.756 64.078"
  >
    <G id="Group_687" data-name="Group 687" transform="translate(-671.5 -643)">
      <Path
        id="Path_1659"
        data-name="Path 1659"
        d="M28.86,215.006a.925.925,0,0,1-.924-.924v-2a1.9,1.9,0,0,0-1.969-1.725l-5.932,0a1.866,1.866,0,0,0-2.018,1.772v1.779a.924.924,0,1,1-1.848,0v-1.831a3.684,3.684,0,0,1,3.914-3.566l5.836,0a3.751,3.751,0,0,1,3.867,3.517v2.058a.925.925,0,0,1-.924.924"
        transform="translate(689.018 489.948)"
        fill={props.color ? props.color : colors.text}
      />
      <Path
        id="Path_1660"
        data-name="Path 1660"
        d="M21.12,212.777a3.566,3.566,0,0,1,0-7.132h0a3.568,3.568,0,0,1,3.564,3.561v0a3.572,3.572,0,0,1-3.566,3.569m0-5.284h0a1.717,1.717,0,1,0,1.213.5,1.7,1.7,0,0,0-1.21-.5"
        transform="translate(691.047 485.771)"
        fill={props.color ? props.color : colors.text}
      />
      <Path
        id="Path_1661"
        data-name="Path 1661"
        d="M25.59,225.181a11.09,11.09,0,1,1,11.09-11.09,11.1,11.1,0,0,1-11.09,11.09m0-19.716a8.626,8.626,0,1,0,8.626,8.626,8.635,8.635,0,0,0-8.626-8.626"
        transform="translate(686.575 481.897)"
        fill={props.color ? props.color : colors.text}
      />
      <Path
        id="Path_1662"
        data-name="Path 1662"
        d="M26.743,196.865a.925.925,0,0,1-.924-.924v-2a1.626,1.626,0,0,0-1.533-1.723H19.507a1.609,1.609,0,0,0-1.491,1.676l0,1.873a.924.924,0,0,1-1.848,0v-1.831a3.456,3.456,0,0,1,3.293-3.566H24.33a3.475,3.475,0,0,1,3.337,3.611v1.964a.925.925,0,0,1-.924.924"
        transform="translate(689.016 463.394)"
        fill={props.color ? props.color : colors.text}
      />
      <Path
        id="Path_1663"
        data-name="Path 1663"
        d="M20.619,194.615a3.567,3.567,0,0,1,0-7.135h0a3.572,3.572,0,0,1,3.564,3.564v0a3.572,3.572,0,0,1-3.566,3.569m0-5.286h0a1.721,1.721,0,1,0,1.213.5,1.7,1.7,0,0,0-1.21-.5"
        transform="translate(690.314 459.168)"
        fill={props.color ? props.color : colors.text}
      />
      <Path
        id="Path_1664"
        data-name="Path 1664"
        d="M24.358,205.716a9.858,9.858,0,1,1,9.858-9.858,9.868,9.868,0,0,1-9.858,9.858m0-17.252a7.394,7.394,0,1,0,7.394,7.394,7.4,7.4,0,0,0-7.394-7.394"
        transform="translate(686.575 457)"
        fill={props.color ? props.color : colors.text}
      />
      <Path
        id="Path_1665"
        data-name="Path 1665"
        d="M14.623,205.054a.925.925,0,0,1-.924-.924v-2.006A1.609,1.609,0,0,0,12.21,200.4l-4.653,0a1.584,1.584,0,0,0-1.429,1.668v1.883a.924.924,0,0,1-1.848,0v-1.831A3.433,3.433,0,0,1,7.5,198.555l4.766,0a3.455,3.455,0,0,1,3.28,3.62v1.957a.925.925,0,0,1-.924.924"
        transform="translate(671.598 475.384)"
        fill={props.color ? props.color : colors.text}
      />
      <Path
        id="Path_1666"
        data-name="Path 1666"
        d="M8.692,202.615a3.567,3.567,0,0,1,0-7.135h0a3.572,3.572,0,0,1,3.564,3.564v0a3.572,3.572,0,0,1-3.566,3.569m0-5.286h0a1.717,1.717,0,1,0,1.215.5,1.719,1.719,0,0,0-1.215-.5"
        transform="translate(672.846 470.884)"
        fill={props.color ? props.color : colors.text}
      />
      <Path
        id="Path_1667"
        data-name="Path 1667"
        d="M12.358,213.716a9.858,9.858,0,1,1,9.858-9.858,9.868,9.868,0,0,1-9.858,9.858m0-17.252a7.394,7.394,0,1,0,7.394,7.394,7.4,7.4,0,0,0-7.394-7.394"
        transform="translate(669 468.716)"
        fill={props.color ? props.color : colors.text}
      />
      <Path
        id="Path_1668"
        data-name="Path 1668"
        d="M18.261,209.243a1.229,1.229,0,0,1-.66-.192L11.22,205a1.231,1.231,0,1,1,1.321-2.078l6.383,4.049a1.232,1.232,0,0,1-.663,2.272"
        transform="translate(680.931 481.5)"
        fill={props.color ? props.color : colors.text}
      />
      <Path
        id="Path_1669"
        data-name="Path 1669"
        d="M11.883,198.644a1.232,1.232,0,0,1-.665-2.272l6.386-4.049a1.23,1.23,0,1,1,1.319,2.078l-6.381,4.052a1.221,1.221,0,0,1-.658.192"
        transform="translate(680.931 465.975)"
        fill={props.color ? props.color : colors.text}
      />
    </G>
  </Svg>
)};

export default IcoNetworkInterest;
