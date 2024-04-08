import * as React from "react";
import Svg, { G,SvgProps, Path, Circle } from "react-native-svg";
import { getColorScheme } from 'application/styles/colors';
import UseEventService from 'application/store/services/UseEventService';
const SVGComponent = (props: SvgProps) => {
    const { event } = UseEventService()
    const colors = getColorScheme(event?.settings?.app_background_color ?? '#343d50', event?.settings?.app_text_mode);
    return (
   <Svg
    id="Group_1977"
    data-name="Group 1977"
    width={18.125}
    height={29.256}
    viewBox="0 0 18.125 29.256"
    {...props}
  >
    <G id="Group_3" data-name="Group 3">
      <Path
        id="Rectangle_13"
        data-name="Rectangle 13"
        d="M.936-1.525h13.2A2.464,2.464,0,0,1,16.6.936V25.27a2.464,2.464,0,0,1-2.461,2.461H.936A2.464,2.464,0,0,1-1.525,25.27V.936A2.464,2.464,0,0,1,.936-1.525Zm13.2,28.455a1.661,1.661,0,0,0,1.66-1.66V.936a1.661,1.661,0,0,0-1.66-1.66H.936A1.661,1.661,0,0,0-.723.936V25.27a1.661,1.661,0,0,0,1.66,1.66Z"
        transform="translate(1.525 1.525)"
        fill={colors.text ? colors.text : '#fff'}
      />
      <Path
        id="Line_6"
        data-name="Line 6"
        d="M15.882-.741H-1.124a.4.4,0,0,1-.4-.392.4.4,0,0,1,.4-.392H15.882a.4.4,0,0,1,.4.392A.4.4,0,0,1,15.882-.741Z"
        transform="translate(1.682 25.777)"
        fill={colors.text ? colors.text : '#fff'}
      />
      <Path
        id="Line_7"
        data-name="Line 7"
        d="M15.882-.741H-1.124a.4.4,0,0,1-.4-.392.4.4,0,0,1,.4-.392H15.882a.4.4,0,0,1,.4.392A.4.4,0,0,1,15.882-.741Z"
        transform="translate(1.682 5.372)"
        fill={colors.text ? colors.text : '#fff'}
      />
      <Path
        id="Line_8"
        data-name="Line 8"
        d="M.181-.741H-1.133a.392.392,0,0,1-.392-.392.392.392,0,0,1,.392-.392H.181a.392.392,0,0,1,.392.392A.392.392,0,0,1,.181-.741Z"
        transform="translate(9.537 3.436)"
        fill={colors.text ? colors.text : '#fff'}
      />
      <Circle
        id="Ellipse_1"
        data-name="Ellipse 1"
        cx={1.005}
        cy={1.005}
        r={1.005}
        transform="translate(8.057 25.766)"
        fill={colors.text ? colors.text : '#fff'}
      />
      <Path
        id="Path_5"
        data-name="Path 5"
        d="M337.911,491.061h-8.454a1.165,1.165,0,0,1-1.162-1.166V481.5a1.165,1.165,0,0,1,1.162-1.166h8.454a1.165,1.165,0,0,1,1.162,1.166v8.393A1.165,1.165,0,0,1,337.911,491.061Zm-8.454-9.942a.367.367,0,0,0-.348.382v8.393a.367.367,0,0,0,.348.382h8.454a.367.367,0,0,0,.348-.382V481.5a.367.367,0,0,0-.348-.382Z"
        transform="translate(-324.741 -471.394)"
        fill={colors.text ? colors.text : '#fff'}
      />
      <Path
        id="Path_6"
        data-name="Path 6"
        d="M340.606,495.1a.391.391,0,0,1-.182-.045l-1.659-.871-1.659.871a.392.392,0,0,1-.569-.414l.317-1.844-1.341-1.309a.392.392,0,0,1,.218-.669l1.853-.269.829-1.68a.392.392,0,0,1,.7,0l.829,1.68,1.853.269a.392.392,0,0,1,.218.669l-1.341,1.309.317,1.844a.392.392,0,0,1-.387.459Zm-1.841-1.751a.393.393,0,0,1,.182.045l1.138.6-.217-1.264a.392.392,0,0,1,.113-.347l.92-.9-1.271-.184a.392.392,0,0,1-.3-.214l-.569-1.152-.569,1.152a.392.392,0,0,1-.3.214l-1.271.184.92.9a.392.392,0,0,1,.113.347l-.217,1.264,1.138-.6A.392.392,0,0,1,338.765,493.351Z"
        transform="translate(-329.825 -477.573)"
        fill={colors.text ? colors.text : '#fff'}
      />
    </G>
  </Svg>
)};
export default SVGComponent;
