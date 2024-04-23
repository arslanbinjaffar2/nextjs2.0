import * as React from 'react';
import Svg, { SvgProps, G, Path } from 'react-native-svg';
import { getColorScheme } from 'application/styles/colors';
import UseEventService from 'application/store/services/UseEventService';

const attendees = (props: SvgProps) => {
  const { event } = UseEventService()
  const colors = getColorScheme(event?.settings?.app_background_color ?? '#343d50', event?.settings?.app_text_mode);
  return (
  <Svg
    width={props.width}
    height={props.height}
    viewBox="0 0 64 57.191"
  >
    <G
      id="Group_669"
      data-name="Group 669"
      transform="translate(-235.999 -279.355)"
    >
      <Path
        id="Path_1602"
        data-name="Path 1602"
        d="M48.908,41.385a27.362,27.362,0,0,0-7.834-3.628c-1.741-.486-3.472-1.065-5.161-1.726a6.4,6.4,0,0,1-3.006-2.394,1.04,1.04,0,0,1,.241-1.477,20.239,20.239,0,0,0,2.8-3.712,3.028,3.028,0,0,1,.627-.914A9.014,9.014,0,0,0,39.694,23.7a4.938,4.938,0,0,0,.015-5.392,25.366,25.366,0,0,0,.253-5.005,10.349,10.349,0,0,0-.883-4.094,4.978,4.978,0,0,0-3.533-3.082.772.772,0,0,1-.62-.553A5.521,5.521,0,0,0,31.6,2.664a13.033,13.033,0,0,0-7.289-.1,25.426,25.426,0,0,0-7.087,2.7,6.845,6.845,0,0,0-2.232,1.621,12.34,12.34,0,0,0-2.535,6.477,31.258,31.258,0,0,0-.2,4.626,1.257,1.257,0,0,1-.079.52,3.425,3.425,0,0,0-.586,1.531,1.247,1.247,0,0,0,.054,1.641,10.286,10.286,0,0,0,2.284,4.6,6.145,6.145,0,0,0,1.431,1.211,1.191,1.191,0,0,1,.4.448,18.041,18.041,0,0,0,2.563,3.474.662.662,0,0,1,.108.246,3.256,3.256,0,0,0-.031.374c0,.243-.015.489-.023.617a4.6,4.6,0,0,1-2.117,3.011,24.5,24.5,0,0,1-5.863,2.407,32.25,32.25,0,0,0-5.1,1.882A8.335,8.335,0,0,0,.638,45.819a34.941,34.941,0,0,0-.63,5.6,2.422,2.422,0,0,0,.509,1.9,2.5,2.5,0,0,0,1.948.6H49.561c2.138,0,2.435-1.3,2.45-2.412a32.417,32.417,0,0,0-.238-5.284,6.9,6.9,0,0,0-2.865-4.844M2.571,51.364a32.338,32.338,0,0,1,.576-5.041,5.773,5.773,0,0,1,3.218-4.06,29.671,29.671,0,0,1,4.693-1.728,27.087,27.087,0,0,0,6.49-2.673A7.207,7.207,0,0,0,20.9,33.044c.02-.2.036-.394.046-.612a1.253,1.253,0,0,0-.128-1.682,3.383,3.383,0,0,0-.584-1.039,15.677,15.677,0,0,1-2.238-3.018,3.8,3.8,0,0,0-1.26-1.362,3.769,3.769,0,0,1-.881-.74A7.737,7.737,0,0,1,14.084,20.9a2.6,2.6,0,0,0,.038-.4,1.055,1.055,0,0,1,.225-.645,3.719,3.719,0,0,0,.466-1.971A28.838,28.838,0,0,1,15,13.619a9.814,9.814,0,0,1,1.928-5.072,4.613,4.613,0,0,1,1.452-1.009,23.46,23.46,0,0,1,6.546-2.491,10.574,10.574,0,0,1,5.912.061,2.9,2.9,0,0,1,1.728,1.457,3.181,3.181,0,0,0,2.494,2.071,2.409,2.409,0,0,1,1.646,1.539,8.065,8.065,0,0,1,.7,3.21,22.966,22.966,0,0,1-.228,4.565,2.169,2.169,0,0,0,.3,1.628,2.569,2.569,0,0,1-.046,2.934,7.035,7.035,0,0,1-2.448,3.018,5.235,5.235,0,0,0-1.3,1.731A18.013,18.013,0,0,1,31.4,30.291a3.532,3.532,0,0,0-.545,4.88,8.811,8.811,0,0,0,4.132,3.246,56.613,56.613,0,0,0,5.389,1.8,24.754,24.754,0,0,1,7.071,3.269,4.319,4.319,0,0,1,1.779,3.044,29.722,29.722,0,0,1,.223,4.831Z"
        transform="translate(236 282.621)"
        fill={props.color ? props.color : colors.text}
      />
      <Path
        id="Path_1603"
        data-name="Path 1603"
        d="M44.422,45.785a7.382,7.382,0,0,0-4.181-5.714c-1.416-.7-2.87-1.313-4.324-1.923-1.188-.5-2.373-.993-3.569-1.559a29.672,29.672,0,0,1-5.335-3.044,4.115,4.115,0,0,1-1.941-2.609c-.013-.1-.018-.174-.02-.236a.2.2,0,0,0,.077.013l7.489.005c.622,0,1.242.008,1.864-.005a2.432,2.432,0,0,0,2.043-.9,2.365,2.365,0,0,0,.212-2.153,4.285,4.285,0,0,0-.364-.878,21.093,21.093,0,0,1-1.352-3.093,25.535,25.535,0,0,1-1.534-6.034c-.1-.783-.179-1.572-.259-2.358a43.291,43.291,0,0,0-.622-4.616A13.309,13.309,0,0,0,30.444,5.1,10.523,10.523,0,0,0,21.066.011a5.9,5.9,0,0,0-4.242,1.613,3.1,3.1,0,0,1-2.64-.018,1.28,1.28,0,1,0-1.1,2.309,5.621,5.621,0,0,0,4.8.041,2.5,2.5,0,0,0,.73-.492,3.315,3.315,0,0,1,2.463-.9,8.138,8.138,0,0,1,7.222,3.922,10.921,10.921,0,0,1,1.792,4.631,40.479,40.479,0,0,1,.6,4.424c.082.812.161,1.623.264,2.432a28.009,28.009,0,0,0,1.674,6.59,22.832,22.832,0,0,0,1.508,3.441,1.28,1.28,0,0,1,.072.146c-.517.01-1.042,0-1.564,0l-7.507-.005a2.608,2.608,0,0,0-2.064.812,2.849,2.849,0,0,0-.512,2.417,6.649,6.649,0,0,0,3.067,4.311,31.623,31.623,0,0,0,5.663,3.223c1.2.571,2.422,1.083,3.646,1.592,1.4.589,2.809,1.175,4.2,1.866a4.861,4.861,0,0,1,2.76,3.784c.113.7.192,1.4.246,2.122H37.116a1.28,1.28,0,1,0,0,2.56h5.225a2.444,2.444,0,0,0,1.869-.707,2.036,2.036,0,0,0,.512-1.577,27.012,27.012,0,0,0-.3-2.773"
        transform="translate(255.27 279.355)"
        fill={props.color ? props.color : colors.text}
      />
    </G>
  </Svg>
)};

export default attendees;
