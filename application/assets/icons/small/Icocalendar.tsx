import * as React from 'react';
import Svg, { SvgProps, Defs, ClipPath, Rect, G, Path } from 'react-native-svg';
import { getColorScheme } from 'application/styles/colors';
import UseEventService from 'application/store/services/UseEventService';

const Icocalendar = (props: SvgProps) => {
  const { event } = UseEventService()
  const colors = getColorScheme(event?.settings?.app_background_color ?? '#343d50', event?.settings?.app_text_mode);
  return (
<Svg
    width={17}
    height={18.778}
    viewBox="0 0 17 18.778"
    {...props}
  >
    <G id="calendar.2" transform="translate(0.5 0.5)">
      <Path
        id="Path_286"
        data-name="Path 286"
        d="M18.917,9.9H3.093a.5.5,0,0,1,0-1H18.917a.5.5,0,0,1,0,1Z"
        transform="translate(-3 -2.823)"
        fill={colors.text ? colors.text : '#fff'}
      />
      <Path
        id="Path_287"
        data-name="Path 287"
        d="M16.451,14.06h-.009a.75.75,0,0,1,0-1.5h.009a.75.75,0,0,1,0,1.5Z"
        transform="translate(-4.494 -3.257)"
        fill={colors.text ? colors.text : '#fff'}
      />
      <Path
        id="Path_288"
        data-name="Path 288"
        d="M12.014,14.06H12a.75.75,0,0,1,0-1.5h.009a.75.75,0,0,1,0,1.5Z"
        transform="translate(-4.001 -3.257)"
        fill={colors.text ? colors.text : '#fff'}
      />
      <Path
        id="Path_289"
        data-name="Path 289"
        d="M7.567,14.06H7.558a.75.75,0,0,1,0-1.5h.009a.75.75,0,1,1,0,1.5Z"
        transform="translate(-3.507 -3.257)"
        fill={colors.text ? colors.text : '#fff'}
      />
      <Path
        id="Path_290"
        data-name="Path 290"
        d="M16.451,17.946h-.009a.75.75,0,0,1,0-1.5h.009a.75.75,0,0,1,0,1.5Z"
        transform="translate(-4.494 -3.688)"
        fill={colors.text ? colors.text : '#fff'}
      />
      <Path
        id="Path_291"
        data-name="Path 291"
        d="M12.014,17.946H12a.75.75,0,0,1,0-1.5h.009a.75.75,0,0,1,0,1.5Z"
        transform="translate(-4.001 -3.688)"
        fill={colors.text ? colors.text : '#fff'}
      />
      <Path
        id="Path_292"
        data-name="Path 292"
        d="M7.567,17.946H7.558a.75.75,0,0,1,0-1.5h.009a.75.75,0,0,1,0,1.5Z"
        transform="translate(-3.507 -3.688)"
        fill={colors.text ? colors.text : '#fff'}
      />
      <Path
        id="Path_293"
        data-name="Path 293"
        d="M16.044,5.791a.5.5,0,0,1-.5-.5V2a.5.5,0,0,1,1,0V5.291A.5.5,0,0,1,16.044,5.791Z"
        transform="translate(-4.449 -2)"
        fill={colors.text ? colors.text : '#fff'}
      />
      <Path
        id="Path_294"
        data-name="Path 294"
        d="M7.965,5.791a.5.5,0,0,1-.5-.5V2a.5.5,0,1,1,1,0V5.291A.5.5,0,0,1,7.965,5.791Z"
        transform="translate(-3.552 -2)"
        fill={colors.text ? colors.text : '#fff'}
      />
      <Path
        id="Path_295"
        data-name="Path 295"
        d="M7.241,3.079h7.527a4.844,4.844,0,0,1,3.527,1.267A4.549,4.549,0,0,1,19.5,7.664v8.023a4.53,4.53,0,0,1-1.3,3.4,4.9,4.9,0,0,1-3.446,1.191H7.241A4.856,4.856,0,0,1,3.8,19.067,4.63,4.63,0,0,1,2.5,15.62V7.662a4.515,4.515,0,0,1,1.3-3.4A4.908,4.908,0,0,1,7.241,3.079Zm7.518,16.2c2.412,0,3.741-1.275,3.741-3.591V7.662a3.535,3.535,0,0,0-.913-2.61,3.879,3.879,0,0,0-2.819-.973H7.241C4.829,4.079,3.5,5.352,3.5,7.662V15.62c0,2.359,1.329,3.658,3.741,3.658Z"
        transform="translate(-3 -2)"
        fill={colors.text ? colors.text : '#fff'}
      />
    </G>
  </Svg>
)};

export default Icocalendar;
