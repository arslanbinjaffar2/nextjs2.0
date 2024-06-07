import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";
import { getColorScheme } from 'application/styles/colors';
import UseEventService from 'application/store/services/UseEventService';
    const SVGComponent = (props: SvgProps) => {
        const { event } = UseEventService()
        const colors = getColorScheme(event?.settings?.app_background_color ?? '#343d50', event?.settings?.app_text_mode);
    return(
        <Svg
        width={props.width}
        height={props.height}
        viewBox="0 0 16 17.882"
        {...props}
        >
    <Path
      id="share_24dp_FILL0_wght200_GRAD0_opsz24"
      d="M153.649-842.118a2.273,2.273,0,0,1-1.667-.686,2.266,2.266,0,0,1-.688-1.667,2.441,2.441,0,0,1,.032-.389,2.049,2.049,0,0,1,.1-.379l-7.287-4.293a2.512,2.512,0,0,1-.8.607,2.251,2.251,0,0,1-.981.218,2.27,2.27,0,0,1-1.667-.686,2.266,2.266,0,0,1-.686-1.665,2.273,2.273,0,0,1,.686-1.667,2.266,2.266,0,0,1,1.667-.688,2.252,2.252,0,0,1,.981.218,2.513,2.513,0,0,1,.8.607l7.287-4.293a2.051,2.051,0,0,1-.1-.379,2.44,2.44,0,0,1-.032-.389,2.27,2.27,0,0,1,.686-1.667,2.266,2.266,0,0,1,1.665-.686,2.274,2.274,0,0,1,1.667.686,2.263,2.263,0,0,1,.688,1.665,2.273,2.273,0,0,1-.686,1.667,2.266,2.266,0,0,1-1.667.688,2.251,2.251,0,0,1-.981-.218,2.513,2.513,0,0,1-.8-.607l-7.287,4.293a2.053,2.053,0,0,1,.1.377,2.407,2.407,0,0,1,.032.386,2.477,2.477,0,0,1-.032.39,2.039,2.039,0,0,1-.1.381L151.862-846a2.512,2.512,0,0,1,.8-.607,2.251,2.251,0,0,1,.981-.218,2.27,2.27,0,0,1,1.667.686,2.266,2.266,0,0,1,.686,1.665,2.274,2.274,0,0,1-.686,1.667A2.264,2.264,0,0,1,153.649-842.118Zm0-14.118a1.36,1.36,0,0,0,1-.415,1.36,1.36,0,0,0,.415-1,1.36,1.36,0,0,0-.415-1,1.36,1.36,0,0,0-1-.415,1.36,1.36,0,0,0-1,.415,1.36,1.36,0,0,0-.415,1,1.36,1.36,0,0,0,.415,1A1.36,1.36,0,0,0,153.647-856.235Zm-11.294,6.588a1.36,1.36,0,0,0,1-.415,1.359,1.359,0,0,0,.415-1,1.36,1.36,0,0,0-.415-1,1.36,1.36,0,0,0-1-.415,1.36,1.36,0,0,0-1,.415,1.36,1.36,0,0,0-.415,1,1.359,1.359,0,0,0,.415,1A1.36,1.36,0,0,0,142.353-849.647Zm11.294,6.588a1.36,1.36,0,0,0,1-.415,1.36,1.36,0,0,0,.415-1,1.359,1.359,0,0,0-.415-1,1.36,1.36,0,0,0-1-.415,1.36,1.36,0,0,0-1,.415,1.359,1.359,0,0,0-.415,1,1.36,1.36,0,0,0,.415,1A1.36,1.36,0,0,0,153.647-843.059ZM153.647-857.647ZM142.353-851.059ZM153.647-844.471Z"
      transform="translate(-140 860)"
      fill={props.color ? props.color : colors.text}
      />
  </Svg>
);
}
export default SVGComponent;
