import * as React from 'react';
import Svg, { SvgProps, G, Path } from 'react-native-svg';
import { getColorScheme } from 'application/styles/colors';
import UseEventService from 'application/store/services/UseEventService';

const sponsors = (props: SvgProps) => {
  const { event } = UseEventService()
  const colors = getColorScheme(event?.settings?.app_background_color ?? '#343d50', event?.settings?.app_text_mode);
  return (
  <Svg
    width={props.width}
    height={props.height}
    viewBox="0 0 46.716 63.997"
  >
    <G
      id="Group_684"
      data-name="Group 684"
      transform="translate(-671.996 -469.191)"
    >
      <Path
        id="Path_1651"
        data-name="Path 1651"
        d="M7.645,112.5A1.248,1.248,0,0,1,6.4,111.253,15.94,15.94,0,0,1,22.319,95.331a1.248,1.248,0,1,1,0,2.5A13.442,13.442,0,0,0,8.893,111.253,1.248,1.248,0,0,1,7.645,112.5"
        transform="translate(674.086 381.697)"
        fill={colors.text ? colors.text : '#fff'}
      />
      <Path
        id="Path_1652"
        data-name="Path 1652"
        d="M34.96,156.188a3.058,3.058,0,0,1-2.88-2.017L26.348,139.5l-5.74,14.687a3.024,3.024,0,0,1-.814,1.2,3.062,3.062,0,0,1-4.318-.222L11.7,151.007l-5.483.227a3.493,3.493,0,0,1-1.283-.245,3.16,3.16,0,0,1-1.7-4.125l5.211-13.342a1.245,1.245,0,0,1,1.972-.5,6.877,6.877,0,0,0,2.481,1.358l.948.255a3.351,3.351,0,0,1,2.194,1.19l.182.192a1.139,1.139,0,0,1,.112.107,6.958,6.958,0,0,0,5.034,2.176,6.857,6.857,0,0,0,3.422-.971,1.244,1.244,0,0,1,1.447.115,1.221,1.221,0,0,1,.115.112c.035-.032.067-.067.1-.1a1.252,1.252,0,0,1,1.45-.112,6.776,6.776,0,0,0,8.445-1.2l.312-.332a3.367,3.367,0,0,1,2.2-1.183l.966-.26a6.838,6.838,0,0,0,2.453-1.35,1.245,1.245,0,0,1,1.972.5l5.218,13.354a3.155,3.155,0,0,1-.711,3.464,3.189,3.189,0,0,1-2.241.9L41,151.015l-3.786,4.168a3.032,3.032,0,0,1-1.223.826,3.09,3.09,0,0,1-1.036.18m-5.5-15.583,4.956,12.69a.571.571,0,0,0,.726.364.532.532,0,0,0,.222-.15l4.178-4.6a1.326,1.326,0,0,1,.976-.409l6.064.25h0a.651.651,0,0,0,.429-.187.66.66,0,0,0,.2-.469.65.65,0,0,0-.052-.265l-.012-.03-4.639-11.884a9.414,9.414,0,0,1-1.984.861l-1.026.277a7.727,7.727,0,0,0-.784.23c-.05.045-.115.122-.217.232l-.329.349a9.238,9.238,0,0,1-8.71,2.745M12.23,148.489a1.247,1.247,0,0,1,.923.409l4.173,4.592a.564.564,0,0,0,.8.045.593.593,0,0,0,.15-.227L23.24,140.59a9.264,9.264,0,0,1-1.857.21,9.477,9.477,0,0,1-6.736-2.83.99.99,0,0,1-.12-.11l-.317-.337a2.542,2.542,0,0,0-.247-.257c-.062-.032-.4-.12-.756-.215l-1-.272a9.526,9.526,0,0,1-2.012-.868L5.554,147.8a.7.7,0,0,0-.012.534.659.659,0,0,0,.362.357.859.859,0,0,0,.252.052l6.025-.25Zm9.214-11.508a5.671,5.671,0,0,1-4.185-1.852,4.552,4.552,0,0,0-3.082-1.839l-.8-.222a6.047,6.047,0,0,1-4.14-4.41,6.739,6.739,0,0,0-2.543-4.787,6.422,6.422,0,0,1-1.652-6.055,7.072,7.072,0,0,0,.06-5.548,6.4,6.4,0,0,1,1.428-6.094,6.766,6.766,0,0,0,2.67-4.752,6.089,6.089,0,0,1,4.16-4.567,6.1,6.1,0,0,0,4.49-2.67A5.727,5.727,0,0,1,23.7,92.4a5.745,5.745,0,0,0,5.094.077,5.728,5.728,0,0,1,5.94,1.55,6.068,6.068,0,0,0,4.4,2.78,6.1,6.1,0,0,1,4.35,4.442,6.754,6.754,0,0,0,2.548,4.789,6.427,6.427,0,0,1,1.645,6.052,7.057,7.057,0,0,0-.06,5.55,6.413,6.413,0,0,1-1.435,6.087,6.784,6.784,0,0,0-2.67,4.754,6.091,6.091,0,0,1-4.16,4.572l-.941.26a4.4,4.4,0,0,0-2.967,1.809,5.655,5.655,0,0,1-7.33.9,3.156,3.156,0,0,0-3.514,0,5.7,5.7,0,0,1-3.155.958m.749-42.334a3.3,3.3,0,0,0-2.386,1.073,8.224,8.224,0,0,1-5.95,3.569,3.555,3.555,0,0,0-2.2,2.528,8.908,8.908,0,0,1-3.447,6.192,3.857,3.857,0,0,0-.746,3.459,9.26,9.26,0,0,1-.062,7.148,3.876,3.876,0,0,0,.971,3.424,8.861,8.861,0,0,1,3.319,6.229,3.536,3.536,0,0,0,2.393,2.406l.756.212a6.858,6.858,0,0,1,4.25,2.543,3.177,3.177,0,0,0,4.128.514,5.653,5.653,0,0,1,6.282,0,3.163,3.163,0,0,0,4.105-.509l.01-.012a6.667,6.667,0,0,1,4.145-2.521l.891-.245a3.548,3.548,0,0,0,2.408-2.573A8.909,8.909,0,0,1,44.5,121.9a3.872,3.872,0,0,0,.754-3.459,9.281,9.281,0,0,1,.06-7.143,3.866,3.866,0,0,0-.966-3.422,8.9,8.9,0,0,1-3.324-6.229,3.535,3.535,0,0,0-2.393-2.4,8.185,8.185,0,0,1-5.855-3.684,3.185,3.185,0,0,0-3.1-.759,7.885,7.885,0,0,1-6.858-.077,2.614,2.614,0,0,0-.629-.077"
        transform="translate(669 377)"
        fill={colors.text ? colors.text : '#fff'}
      />
    </G>
  </Svg>
)};

export default sponsors;
