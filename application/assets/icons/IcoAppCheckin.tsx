import * as React from 'react';
import Svg, { SvgProps, G, Path, Rect } from 'react-native-svg';
import { getColorScheme } from 'application/styles/colors';
import UseEventService from 'application/store/services/UseEventService';

const IcoAppCheckin = (props: SvgProps) => {
  const { event } = UseEventService()
  const colors = getColorScheme(event?.settings?.app_background_color ?? '#343d50', event?.settings?.app_text_mode);
  return (
  <Svg
    width={props.width}
    height={props.height}
    viewBox="0 0 63.726 59.353"
  >
    <G id="Group_691" data-name="Group 691" transform="translate(-670 -962.5)">
      <Path
        id="Path_1683"
        data-name="Path 1683"
        d="M19.221,390.773H3.919v-15.3h15.3ZM6.438,388.254H16.7V377.99H6.438Z"
        transform="translate(675.953 597.032)"
        fill={props.color ? props.color : colors.text}
      />
      <Rect
        id="Rectangle_133"
        data-name="Rectangle 133"
        width={5.466}
        height={5.466}
        transform="translate(685.338 976.875)"
        fill={props.color ? props.color : colors.text}
      />
      <Path
        id="Path_1684"
        data-name="Path 1684"
        d="M19.221,400.239H3.919v-15.3h15.3ZM6.438,397.72H16.7V387.456H6.438Z"
        transform="translate(675.953 611.41)"
        fill={props.color ? props.color : colors.text}
      />
      <Rect
        id="Rectangle_134"
        data-name="Rectangle 134"
        width={5.466}
        height={5.466}
        transform="translate(685.338 1001.812)"
        fill={props.color ? props.color : colors.text}
      />
      <Path
        id="Path_1685"
        data-name="Path 1685"
        d="M29.2,390.693H13.9v-15.3H29.2Zm-12.783-2.519H26.682V377.91H16.418Z"
        transform="translate(691.111 596.91)"
        fill={props.color ? props.color : colors.text}
      />
      <Rect
        id="Rectangle_135"
        data-name="Rectangle 135"
        width={5.466}
        height={5.466}
        transform="translate(710.476 977.767)"
        fill={props.color ? props.color : colors.text}
      />
      <Path
        id="Path_1686"
        data-name="Path 1686"
        d="M1.259,390.414A1.26,1.26,0,0,1,0,389.155V371.5H17.655a1.259,1.259,0,0,1,0,2.519H2.519v15.136a1.26,1.26,0,0,1-1.259,1.259"
        transform="translate(670 591)"
        fill={props.color ? props.color : colors.text}
      />
      <Path
        id="Path_1687"
        data-name="Path 1687"
        d="M17.655,406.469H0V388.813a1.259,1.259,0,1,1,2.519,0V403.95H17.655a1.259,1.259,0,0,1,0,2.519"
        transform="translate(670 615.385)"
        fill={props.color ? props.color : colors.text}
      />
      <Path
        id="Path_1688"
        data-name="Path 1688"
        d="M35.445,390.414a1.26,1.26,0,0,1-1.259-1.259V374.019H19.049a1.259,1.259,0,0,1,0-2.519H36.7v17.655a1.26,1.26,0,0,1-1.259,1.259"
        transform="translate(697.021 591)"
        fill={props.color ? props.color : colors.text}
      />
      <Path
        id="Path_1689"
        data-name="Path 1689"
        d="M36.7,406.469H19.049a1.259,1.259,0,0,1,0-2.519H34.186V388.813a1.259,1.259,0,1,1,2.519,0Z"
        transform="translate(697.021 615.385)"
        fill={props.color ? props.color : colors.text}
      />
      <Rect
        id="Rectangle_136"
        data-name="Rectangle 136"
        width={5.466}
        height={5.466}
        transform="translate(705.01 996.548)"
        fill={props.color ? props.color : colors.text}
      />
      <Rect
        id="Rectangle_137"
        data-name="Rectangle 137"
        width={5.466}
        height={5.466}
        transform="translate(714.847 996.548)"
        fill={props.color ? props.color : colors.text}
      />
      <Rect
        id="Rectangle_138"
        data-name="Rectangle 138"
        width={5.466}
        height={5.466}
        transform="translate(714.847 1005.291)"
        fill={props.color ? props.color : colors.text}
      />
      <Rect
        id="Rectangle_139"
        data-name="Rectangle 139"
        width={5.466}
        height={5.466}
        transform="translate(705.01 1005.291)"
        fill={props.color ? props.color : colors.text}
      />
    </G>
  </Svg>
)};

export default IcoAppCheckin;
