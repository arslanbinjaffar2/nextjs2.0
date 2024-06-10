import * as React from "react";
import Svg, { Defs, SvgProps, ClipPath, Rect, G, Path } from "react-native-svg";
import { getColorScheme } from 'application/styles/colors';
import UseEventService from 'application/store/services/UseEventService';
const SVGComponent = (props: SvgProps) => {
    const { event } = UseEventService()
    const colors = getColorScheme(event?.settings?.app_background_color ?? '#343d50', event?.settings?.app_text_mode);
    return (
    <Svg
        width={props.width}
        height={props.height}
        viewBox="0 0 22 23.833"
        {...props}
    >
        <Defs>
            <ClipPath >
                <Rect
                    id="Rectangle_3586"
                    data-name="Rectangle 3586"
                    width={22}
                    height={23.833}
                    fill={props.color ? props.color : colors.text}
                    stroke={props.color ? props.color : colors.text}
                    strokeWidth={0.4}
                />
            </ClipPath>
        </Defs>
        <G id="Group_1971" data-name="Group 1971">
            <Path
                id="Path_1877"
                data-name="Path 1877"
                d="M1.048,21.915a1.481,1.481,0,0,1-.421-.148A1.094,1.094,0,0,1,0,20.708q0-2.889,0-5.779,0-3.355,0-6.71A1.225,1.225,0,0,1,.506,7.195l.374-.3c.26-.209.519-.417.785-.619a.684.684,0,0,0,.287-.588q-.005-1.431,0-2.862,0-1.22,0-2.44C1.946.18,2,0,2.238,0H19.755c.212,0,.255.214.254.385q0,1.263,0,2.527,0,1.4,0,2.8a.644.644,0,0,0,.268.551c.269.207.533.418.8.63l.381.3a1.226,1.226,0,0,1,.507,1.024q0,2.46,0,4.92,0,3.785-.007,7.57a1.619,1.619,0,0,1-.144.618,1.043,1.043,0,0,1-.557.517,1.978,1.978,0,0,1-.827.1H2.174a5.886,5.886,0,0,1-1.127-.027m9.939-7.452A1.681,1.681,0,0,0,10,14.8L.77,21.493H21.053l-.536-.477a.917.917,0,0,0-.083-.07l-1.687-1.224q-3.411-2.476-6.825-4.95a1.592,1.592,0,0,0-.937-.309m1.625.25,8.852,6.425V8.3ZM.494,21.136l8.85-6.425L.494,8.3ZM2.441.747c0,.049-.007.093-.007.138V2.692q0,3.073,0,6.146a.585.585,0,0,0,.273.506q2.253,1.628,4.5,3.26l1.28.928,1.232.889.139-.077a2.319,2.319,0,0,1,1.127-.318,2.275,2.275,0,0,1,1.117.316l.136.077.192-.133.131-.092,1.409-1.022q2.623-1.9,5.25-3.8a.679.679,0,0,0,.31-.6q-.007-3.157,0-6.313V.449H2.46ZM20.015,8.789l1.418-1.027-1.418-1.13ZM.523,7.761l1.4,1.016V6.643Z"
                transform="translate(0 1.833)"
                fill={props.color ? props.color : colors.text}
                stroke={props.color ? props.color : colors.text}
                strokeWidth={0.4}
            />
        </G>
    </Svg>
)};
export default SVGComponent;
