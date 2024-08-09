import UseEventService from "application/store/services/UseEventService";
import { getColorScheme } from "application/styles/colors";
import * as React from "react";
import Svg, { SvgProps, Rect, Path, Circle,Defs,ClipPath,G } from "react-native-svg";

const EditOrder = (props: SvgProps) => {
     const { event } = UseEventService()
  const colors = getColorScheme(event?.settings?.app_background_color ?? '#343d50', event?.settings?.app_text_mode);
    return(
        <Svg
        id="Group_6209"
        data-name="Group 6209"
        width={props.width}
        height={props.height}
        viewBox="0 0 18 22.151"
        {...props}
      >
        <Defs>
          <ClipPath id="clip-path">
            <Rect
              id="Rectangle_4168"
              data-name="Rectangle 4168"
              width={18}
              height={22.151}
              fill={props.color ? props.color : colors.text}
              stroke={props.color ? props.color : colors.text}
              strokeWidth={0.2}
            />
          </ClipPath>
        </Defs>
        <G id="Group_6208" data-name="Group 6208" >
          <Path
            id="Path_2436"
            data-name="Path 2436"
            d="M25.251,1.944A1.762,1.762,0,0,0,23.291.005C21.934,0,20.577,0,19.22,0c-2.952,0-5.9-.006-8.855,0A1.7,1.7,0,0,0,8.5,1.588c-.05,2.066-.016,4.133-.016,6.236h.7v-.73c0-1.714.006-3.429,0-5.143,0-.629.242-1.114.876-1.2A15.022,15.022,0,0,1,12,.736V1.82H9.948V8.932l.7-.057V2.545c.71-.049,1.36-.2,1.862.466.129.172.524.2.8.2q3.57.022,7.141,0a1.217,1.217,0,0,0,.848-.257c.506-.64,1.118-.431,1.775-.4V19.25H10.6V14.986l-.653.074v4.918H23.78V1.78H21.725V.718c.593,0,1.116-.011,1.638,0A1.063,1.063,0,0,1,24.537,1.86c.007.095,0,.19,0,.286q0,8.929,0,17.858c0,1.037-.335,1.427-1.246,1.428q-6.427.011-12.854,0c-.874,0-1.246-.388-1.25-1.277-.008-1.714,0-3.429,0-5.143V13.559l-.714.075c0,2.221-.006,4.386,0,6.551a1.786,1.786,0,0,0,2.009,1.964q6.391.007,12.783,0a1.761,1.761,0,0,0,1.982-1.918q.022-9.143,0-18.287M19.539,2.5H13.775c-1.018,0-1.017,0-1.016-1.005,0-.233,0-.466,0-.745h8.118c.31,1.67.247,1.75-1.338,1.75"
            transform="translate(-7.261 -0.001)"
            fill={props.color ? props.color : colors.text}
            stroke={props.color ? props.color : colors.text}
            strokeWidth={0.2}
          />
          <Path
            id="Path_2437"
            data-name="Path 2437"
            d="M1.673,60.921,0,62.51c1.342,1.342,2.724,2.617,3.975,4.01.819.912,1.886,1.085,3.029,1.493A6.385,6.385,0,0,0,5.215,64.69c-.149-.145-3.036-3.263-3.542-3.769m3.152,5.215L1.756,63.112l.37-.435,3.061,3.068-.363.391"
            transform="translate(0 -52.215)"
            fill={props.color ? props.color : colors.text}
          />
          <Path
            id="Path_2438"
            data-name="Path 2438"
            d="M37.56,38.86h7.371a.429.429,0,1,0,0-.857H37.56a.429.429,0,0,0,0,.857"
            transform="translate(-31.825 -32.572)"
            fill={props.color ? props.color : colors.text}
          />
          <Path
            id="Path_2439"
            data-name="Path 2439"
            d="M37.56,49.5h3.294a.429.429,0,1,0,0-.857H37.56a.429.429,0,0,0,0,.857"
            transform="translate(-31.825 -41.244)"
            fill={props.color ? props.color : colors.text}
          />
          <Path
            id="Path_2440"
            data-name="Path 2440"
            d="M37.56,61.778h7.371a.429.429,0,1,0,0-.857H37.56a.429.429,0,0,0,0,.857"
            transform="translate(-31.825 -51.552)"
            fill={props.color ? props.color : colors.text}
          />
        </G>
      </Svg>
    );
}
export default EditOrder;
