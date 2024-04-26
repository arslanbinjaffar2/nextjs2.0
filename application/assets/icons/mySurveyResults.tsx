import * as React from 'react';
import Svg, { SvgProps, G, Path } from 'react-native-svg';
import { getColorScheme } from 'application/styles/colors';
import UseEventService from 'application/store/services/UseEventService';

const mySurveyResults = (props: SvgProps) => {
  const { event } = UseEventService()
  const colors = getColorScheme(event?.settings?.app_background_color ?? '#343d50', event?.settings?.app_text_mode);
  return (
    <Svg
      width={25}
      height={25}
      viewBox="0 0 19.375 26.812"
      fill={props.color ? props.color : colors.text}
      {...props}
    >
      <Path
        id="Union_44"
        data-name="Union 44"
        d="M.5,26.812a.5.5,0,0,1-.5-.5V4.438a.5.5,0,0,1,.5-.5H2.625v-.8a.729.729,0,0,1,.728-.728H6.648a3.123,3.123,0,0,1,6.078,0h3.3a.729.729,0,0,1,.728.728v.8h2.125a.5.5,0,0,1,.5.5V26.312a.5.5,0,0,1-.5.5Zm.5-1H18.374V4.937H16.75v1.24a.73.73,0,0,1-.728.729H3.353a.73.73,0,0,1-.728-.729V4.937H1ZM3.625,5.906H15.75v-2.5H12.5a.728.728,0,0,1-.717-.619,2.123,2.123,0,0,0-4.192,0,.729.729,0,0,1-.718.619H3.625Zm-1,15.875v-4.5H5.969v1H3.625v2.5H7V19.99H8v1.791Zm1.6-2.623A.5.5,0,0,1,4.9,18.42l.868.795,2.092-2.947a.5.5,0,0,1,.815.579L5.923,20.718Zm6.945.873a.5.5,0,1,1,0-1h5.521a.5.5,0,1,1,0,1Zm-8.26-6.406V9.688H7.718v3.937Zm1-1H6.719V10.688H3.906Zm7.26-.469a.5.5,0,1,1,0-1h5.521a.5.5,0,1,1,0,1Z"
        fill={props.color ? props.color : colors.text}
      />
    </Svg>
)};

export default mySurveyResults;
