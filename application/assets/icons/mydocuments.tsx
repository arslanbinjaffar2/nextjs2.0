import * as React from 'react';
import Svg, { SvgProps, G, Path, Rect } from 'react-native-svg';
import { getColorScheme } from 'application/styles/colors';
import UseEventService from 'application/store/services/UseEventService';

const mydocuments = (props: SvgProps) => {
  const { event } = UseEventService()
  const colors = getColorScheme(event?.settings?.app_background_color ?? '#343d50', event?.settings?.app_text_mode);
  return (
  <Svg
    width={props.width}
    height={props.height}
    viewBox="0 0 59.917 63.986"
  >
    <G
      id="Group_696"
      data-name="Group 696"
      transform="translate(-1013.615 -104.191)"
    >
      <Path
        id="Path_1719"
        data-name="Path 1719"
        d="M30.648,473.755H7.782a6.274,6.274,0,0,1-6.267-6.27V423.954a6.271,6.271,0,0,1,6.267-6.267H38.664a6.273,6.273,0,0,1,6.267,6.267v26.752H42.207V423.954a3.546,3.546,0,0,0-3.542-3.542H7.782a3.546,3.546,0,0,0-3.542,3.542v43.531a3.548,3.548,0,0,0,3.542,3.545H30.648Z"
        transform="translate(1012.1 -313.496)"
        fill={props.color ? props.color : colors.text}
      />
      <Path
        id="Path_1720"
        data-name="Path 1720"
        d="M33.271,426.407H5.2a1.362,1.362,0,0,1,0-2.725H33.271a1.362,1.362,0,0,1,0,2.725"
        transform="translate(1016.098 -303.156)"
        fill={props.color ? props.color : colors.text}
      />
      <Path
        id="Path_1721"
        data-name="Path 1721"
        d="M33.271,430.528H5.2a1.362,1.362,0,0,1,0-2.725H33.271a1.362,1.362,0,0,1,0,2.725"
        transform="translate(1016.098 -296.049)"
        fill={props.color ? props.color : colors.text}
      />
      <Path
        id="Path_1722"
        data-name="Path 1722"
        d="M21.972,434.65H5.2a1.362,1.362,0,0,1,0-2.725H21.972a1.362,1.362,0,0,1,0,2.725"
        transform="translate(1016.098 -288.939)"
        fill={props.color ? props.color : colors.text}
      />
      <Path
        id="Path_1730"
        data-name="Path 1730"
        d="M31.446,457.787l-2.7-.39,4.305-29.858a3.553,3.553,0,0,0-2.948-4.082l-13.746-2.234.439-2.687,13.738,2.232a6.272,6.272,0,0,1,5.218,7.158Z"
        transform="translate(1037.703 -312.03)"
        fill={props.color ? props.color : colors.text}
      />
      <Rect
        id="Rectangle_142"
        data-name="Rectangle 142"
        width={2.723}
        height={21.045}
        transform="translate(1028.023 160.283) rotate(-73.257)"
        fill={props.color ? props.color : colors.text}
      />
      <Path
        id="Path_1725"
        data-name="Path 1725"
        d="M22.748,449.354a2.321,2.321,0,0,1-1.678-.714l-6.327-6.564a5.915,5.915,0,0,1,.6-8.354,5.71,5.71,0,0,1,7.422.169,5.71,5.71,0,0,1,7.414-.2l.272.245a5.912,5.912,0,0,1,.174,8.362l-6.158,6.346a2.477,2.477,0,0,1-1.719.708m-3.807-14.2a2.961,2.961,0,0,0-1.856.654,3.2,3.2,0,0,0-.292,4.477l5.978,6.193,5.891-6.071a3.166,3.166,0,0,0,.883-2.267,3.5,3.5,0,0,0-1.084-2.332l.858-1.057-.858,1.057a2.98,2.98,0,0,0-4.06.294l-1.61,1.706-1.619-1.665a3.031,3.031,0,0,0-2.232-.989"
        transform="translate(1032.414 -288.082)"
        fill={props.color ? props.color : colors.text}
      />
      <Path
        id="Path_1724"
        data-name="Path 1724"
        d="M26.727,460.891A15.578,15.578,0,1,1,42.3,445.313a15.6,15.6,0,0,1-15.577,15.578m0-28.43A12.853,12.853,0,1,0,39.58,445.313a12.867,12.867,0,0,0-12.853-12.853"
        transform="translate(1028.718 -292.715)"
        fill={props.color ? props.color : colors.text}
      />
    </G>
  </Svg>
)};

export default mydocuments;
