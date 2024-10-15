import * as React from 'react';
import Svg, { SvgProps, G, Path } from 'react-native-svg';
import { getColorScheme } from 'application/styles/colors';
import UseEventService from 'application/store/services/UseEventService';

const IcoRejectHand = (props: SvgProps) => {
  const { event } = UseEventService()
  const colors = getColorScheme(event?.settings?.app_background_color ?? '#343d50', event?.settings?.app_text_mode);
  return (
    <Svg
      width={30}
      height={39.716}
      viewBox="0 0 30 39.716"
      {...props}
    >
      <Path
        id="Union_115"
        data-name="Union 115"
        d="M5.139,39.945A1,1,0,0,1,4.8,38.572L27.459.857a1,1,0,1,1,1.714,1.03L6.512,39.6a1,1,0,0,1-1.373.342Zm7.985-1.907a1.551,1.551,0,0,1-1.209-.855l-1.274-2.638.88-1.445c.169.215.311.41.424.582l1.387,2.872a25.659,25.659,0,0,0,3.021.129c1.282,0,2.678-.036,4.03-.071,1.148-.03,2.231-.058,3.075-.058a.554.554,0,0,1,.214-.106c.018,0,.018,0,.016-.029a11.069,11.069,0,0,1,.724-2.737l.5-1.278L26.231,25.7l1.635-9.1c.061-.37.149-.778.236-1.172.32-1.471.652-2.993-.236-3.29a2.263,2.263,0,0,0-.71-.131c-.67,0-1.137.409-1.467,1.288l-1.9,6.956c-.044.113-.117.181-.194.181a.125.125,0,0,1-.09-.039.194.194,0,0,1-.05-.142l.22-7.12,1.646-2.7-.023.743a2.862,2.862,0,0,1,1.856-.661,3.868,3.868,0,0,1,1.227.214A2.442,2.442,0,0,1,30,13.364a12.8,12.8,0,0,1-.367,2.363l-.014.063c-.081.372-.157.722-.208,1.037a.045.045,0,0,0,0,.011l0,.011-1.635,9.1a.045.045,0,0,0,0,.011l0,.013-1.321,6.709a1.548,1.548,0,0,1-.071.247l-.487,1.249a13.526,13.526,0,0,0-.636,2.2,1.5,1.5,0,0,1-.976,1.454,1.611,1.611,0,0,1-.815.221c-.8,0-1.832.026-2.927.054l-.107,0-.07,0c-1.338.034-2.722.07-4,.07A26.732,26.732,0,0,1,13.124,38.038ZM8,31.572C6.8,30.418,5.5,29.264,4.744,28.628l-.064-.057C3.138,27.114,1,24.958.237,23.052a3.233,3.233,0,0,1,.4-3.136A3.574,3.574,0,0,1,3.476,18.4a2.867,2.867,0,0,1,1.976.776c.028.027.054.054.08.082L8.846,22.9,6.322,10.58c-.006-.036-.013-.07-.017-.105a3.9,3.9,0,0,1,.664-3.026,3,3,0,0,1,4.613.052,5.066,5.066,0,0,1,1.049,2.457l.544,1.625.085-6.126V5.444a3.41,3.41,0,0,1,.712-2.206,3.057,3.057,0,0,1,2.434-.958,2.95,2.95,0,0,1,3.23,3.165l.024.6a3.041,3.041,0,0,1,2.461-1.1,4.445,4.445,0,0,1,.758.068,2.764,2.764,0,0,1,1.041.4l-.794,1.3a1.15,1.15,0,0,0-.521-.226,2.83,2.83,0,0,0-.484-.044A1.571,1.571,0,0,0,20.493,7.9L19.9,12.01l-1.469,2.415-.359-8.947c0-1.175-.515-1.7-1.669-1.7-1.126,0-1.555.46-1.584,1.7l-.2,14.767c0,.064-.017.1-.039.1-.078,0-.251-.433-.322-.618L11.1,10.292c-.148-1.156-.781-2.4-1.818-2.4a1.376,1.376,0,0,0-.159.01,1.336,1.336,0,0,0-.943.493,2.646,2.646,0,0,0-.328,1.9l2.827,13.8c.033.257.1.549.174.859.167.714.34,1.451.066,1.758a.448.448,0,0,1-.276.094c-.552,0-1.3-.924-1.951-1.741a10.712,10.712,0,0,0-.839-.97l-3.5-3.844a1.256,1.256,0,0,0-.88-.346,2.008,2.008,0,0,0-1.585.91,1.782,1.782,0,0,0-.2,1.705c.656,1.636,2.643,3.632,4.082,4.99.014.012,1.49,1.259,3.034,2.731L8,31.571v0Z"
        transform="translate(0 -0.372)"
        fill={props.color ? props.color : colors.text}
      />
    </Svg>
)};

export default IcoRejectHand;