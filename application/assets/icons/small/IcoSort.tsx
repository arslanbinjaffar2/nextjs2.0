import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';
import { getColorScheme } from 'application/styles/colors';
import UseEventService from 'application/store/services/UseEventService';

const IcoSort = (props: SvgProps) => {
  const { event } = UseEventService()
  const colors = getColorScheme(event?.settings?.app_background_color ?? '#343d50', event?.settings?.app_text_mode);
  return (
<Svg
    width={21}
    height={13.208}
    viewBox="0 0 21 13.208"
    {...props}
  >
    <Path
      id="filter_list_FILL0_wght100_GRAD0_opsz24"
      d="M180.344-655.792v-.909h3.279v.909Zm-4.773-5.649v-.909H188.4v.909ZM172-667.091V-668h20v.909Z"
      transform="translate(-171.5 668.5)"
      fill={props.color ? props.color : colors.text}
      stroke={props.color ? props.color : colors.text}
      strokeWidth={1}
    />
  </Svg>
)};

export default IcoSort;
