import * as React from 'react';
import Svg, { SvgProps, G, Path,Circle } from 'react-native-svg';
import { getColorScheme } from 'application/styles/colors';
import UseEventService from 'application/store/services/UseEventService';

const myattendees = (props: SvgProps) => {
  const { event } = UseEventService()
  const colors = getColorScheme(event?.settings?.app_background_color ?? '#343d50', event?.settings?.app_text_mode);
  return (
    <Svg
      width={props.width}
      height={props.height}
      viewBox="0 0 25.611 25.333"
      {...props}
    >
      <G
        id="Group_5473"
        data-name="Group 5473"
        transform="translate(-16.945 -19.584)"
      >
        <G id="_1" data-name={1} transform="translate(18.744 20.749)">
          <G id="attendees" transform="translate(-1.301 -0.666)">
            <Path
              id="Path_27"
              data-name="Path 27"
              d="M101.616,525.47a1.69,1.69,0,0,0,1.437.011.476.476,0,0,0,.143-.1,1.771,1.771,0,0,1,1.271-.479,3.6,3.6,0,0,1,3.211,1.726,4.638,4.638,0,0,1,.767,1.965c.187.885.223,1.789.338,2.683a10.35,10.35,0,0,0,.622,2.443,8.289,8.289,0,0,0,.547,1.248,1.116,1.116,0,0,1,.1.239c.116.37-.005.539-.406.549-.351.008-.7,0-1.054,0h-2.54c-.428,0-.571.218-.51.648a2.087,2.087,0,0,0,.989,1.365,11.693,11.693,0,0,0,2.108,1.2"
              transform="translate(-89.292 -524.895)"
              fill="none"
              stroke={colors.text ? colors.text : '#fff'}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
            />
            <Path
              id="Path_106"
              data-name="Path 106"
              d="M-172.061,255.378a13.722,13.722,0,0,1-1.625-.6,2.926,2.926,0,0,1-1.368-1.073.873.873,0,0,1,.119-1.223,7.4,7.4,0,0,0,.985-1.292,1.618,1.618,0,0,1,.406-.552,3.138,3.138,0,0,0,1.073-1.344,1.44,1.44,0,0,0-.036-1.608.323.323,0,0,1-.038-.236,9.409,9.409,0,0,0,.1-1.891,3.613,3.613,0,0,0-.31-1.414,1.408,1.408,0,0,0-.963-.871.767.767,0,0,1-.622-.494,1.628,1.628,0,0,0-.979-.861,4.584,4.584,0,0,0-2.562-.028,9.5,9.5,0,0,0-2.637,1.007,2.168,2.168,0,0,0-.673.476,4.289,4.289,0,0,0-.879,2.255,11.37,11.37,0,0,0-.076,1.7.939.939,0,0,1-.118.506.847.847,0,0,0-.149.5c.005.063.006.135-.095.12l.1.148a3.478,3.478,0,0,0,.786,1.624,1.911,1.911,0,0,0,.456.382.968.968,0,0,1,.308.339,6.528,6.528,0,0,0,.565.822l-.764-1.173.925,1.364c-.054-.063-.109-.126-.16-.191l.541.83a.735.735,0,0,0-.036-.13l.107.157c-.114-.007-.09.076-.1.144a2.976,2.976,0,0,1-.019.335,2.266,2.266,0,0,1-1.055,1.49,9.889,9.889,0,0,1-2.376.976,12,12,0,0,0-1.891.7,2.709,2.709,0,0,0-1.515,1.914,12.893,12.893,0,0,0-.234,2.086c-.014.38.009.452.455.452,4.407,0,10.8-.009,15.209-.009"
              transform="translate(186.869 -237.819)"
              fill="none"
              stroke={colors.text ? colors.text : '#fff'}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
            />
            <G
              id="Ellipse_7"
              data-name="Ellipse 7"
              transform="translate(14.231 13.952)"
              fill="none"
              stroke={colors.text ? colors.text : '#fff'}
              strokeWidth={1}
            >
              <Circle cx={5.441} cy={5.441} r={5.441} stroke="none" />
              <Circle cx={5.441} cy={5.441} r={4.941} fill="none" />
            </G>
          </G>
        </G>
        <G
          id="Group_750"
          data-name="Group 750"
          transform="translate(-961.838 -236.918)"
        >
          <Path
            id="Icon_awesome-check-circle"
            data-name="Icon awesome-check-circle"
            d="M3.086,1.824A1.262,1.262,0,1,1,1.824.562,1.262,1.262,0,0,1,3.086,1.824Zm-1.408.668.936-.936a.081.081,0,0,0,0-.115L2.5,1.326a.081.081,0,0,0-.115,0l-.763.763-.356-.356a.081.081,0,0,0-.115,0l-.115.115a.081.081,0,0,0,0,.115l.529.529A.081.081,0,0,0,1.678,2.492Z"
            transform="translate(998.574 272.631)"
            fill={colors.text ? colors.text : '#fff'}
          />
          <G
            id="Group_5416"
            data-name="Group 5416"
            transform="translate(996.98 273.759)"
          >
            <Path
              id="Path_1582"
              data-name="Path 1582"
              d="M6765.207,387.717v3.469l1.825-1.332,1.667,1.332v-2.766"
              transform="translate(-6765.207 -386.14)"
              fill="none"
              stroke={colors.text ? colors.text : '#fff'}
              strokeWidth={0.8}
            />
            <Path
              id="Path_1583"
              data-name="Path 1583"
              d="M6966.98,274.119v-2.5h1.979"
              transform="translate(-6966.98 -271.618)"
              fill="none"
              stroke={colors.text ? colors.text : '#fff'}
              strokeLinejoin="round"
              strokeWidth={0.8}
            />
          </G>
        </G>
      </G>
    </Svg>
)};

export default myattendees;
