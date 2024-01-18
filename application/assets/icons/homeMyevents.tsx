import * as React from 'react';
import Svg, { SvgProps, G, Path } from 'react-native-svg';
import { getColorScheme } from 'application/styles/colors';
import UseEventService from 'application/store/services/UseEventService';

const homeMyevents = (props: SvgProps) => {
  const { event } = UseEventService()
  const colors = getColorScheme(event?.settings?.app_background_color ?? '#343d50', event?.settings?.app_text_mode);
    return (
    <Svg
        width={props.width}
        height={props.height}
        viewBox="0 0 64.064 61.501"
    >
        <G
            id="Group_692"
            data-name="Group 692"
            transform="translate(-1012.6 -288.504)"
        >
            <Path
                id="Path_1738"
                data-name="Path 1738"
                d="M10.75,614.813H3.063A2.565,2.565,0,0,1,.5,612.25v-7.688A2.565,2.565,0,0,1,3.063,602H10.75a2.565,2.565,0,0,1,2.563,2.563v7.688a2.565,2.565,0,0,1-2.563,2.563M3.063,612.25H10.75v-7.688H3.063Zm0-8.969,0,1.281h0Z"
                transform="translate(1012.1 -313.496)"
                fill={colors.text ? colors.text : '#fff'}
            />
            <Path
                id="Path_1741"
                data-name="Path 1741"
                d="M10.75,622.813H3.063A2.565,2.565,0,0,1,.5,620.25v-7.688A2.565,2.565,0,0,1,3.063,610H10.75a2.565,2.565,0,0,1,2.563,2.563v7.688a2.565,2.565,0,0,1-2.563,2.563M3.063,620.25H10.75v-7.688H3.063Zm0-8.969,0,1.281h0Z"
                transform="translate(1012.1 -300.996)"
                fill={colors.text ? colors.text : '#fff'}
            />
            <Path
                id="Path_1746"
                data-name="Path 1746"
                d="M10.75,630.813H3.063A2.565,2.565,0,0,1,.5,628.25v-7.688A2.565,2.565,0,0,1,3.063,618H10.75a2.565,2.565,0,0,1,2.563,2.563v7.688a2.565,2.565,0,0,1-2.563,2.563M3.063,628.25H10.75v-7.688H3.063Zm0-8.969,0,1.281h0Z"
                transform="translate(1012.1 -288.495)"
                fill={colors.text ? colors.text : '#fff'}
            />
            <Path
                id="Path_1739"
                data-name="Path 1739"
                d="M18.75,614.813H11.063A2.565,2.565,0,0,1,8.5,612.25v-7.688A2.565,2.565,0,0,1,11.063,602H18.75a2.565,2.565,0,0,1,2.563,2.563v7.688a2.565,2.565,0,0,1-2.563,2.563m-7.688-2.563H18.75v-7.688H11.063Zm0-8.969,0,1.281h0Z"
                transform="translate(1024.6 -313.496)"
                fill={colors.text ? colors.text : '#fff'}
            />
            <Path
                id="Path_1742"
                data-name="Path 1742"
                d="M18.75,622.813H11.063A2.565,2.565,0,0,1,8.5,620.25v-7.688A2.565,2.565,0,0,1,11.063,610H18.75a2.565,2.565,0,0,1,2.563,2.563v7.688a2.565,2.565,0,0,1-2.563,2.563m-7.688-2.562H18.75v-7.688H11.063Zm0-8.969,0,1.281h0Z"
                transform="translate(1024.6 -300.996)"
                fill={colors.text ? colors.text : '#fff'}
            />
            <Path
                id="Path_1747"
                data-name="Path 1747"
                d="M18.75,630.813H11.063A2.565,2.565,0,0,1,8.5,628.25v-7.688A2.565,2.565,0,0,1,11.063,618H18.75a2.565,2.565,0,0,1,2.563,2.563v7.688a2.565,2.565,0,0,1-2.563,2.563m-7.688-2.562H18.75v-7.688H11.063Zm0-8.969,0,1.281h0Z"
                transform="translate(1024.6 -288.495)"
                fill={colors.text ? colors.text : '#fff'}
            />
            <Path
                id="Path_1740"
                data-name="Path 1740"
                d="M26.75,614.813H19.063A2.565,2.565,0,0,1,16.5,612.25v-7.688A2.565,2.565,0,0,1,19.063,602H26.75a2.565,2.565,0,0,1,2.563,2.563v7.688a2.565,2.565,0,0,1-2.563,2.563m-7.688-2.563H26.75v-7.688H19.063Zm0-8.969,0,1.281h0Z"
                transform="translate(1037.101 -313.496)"
                fill={colors.text ? colors.text : '#fff'}
            />
            <Path
                id="Path_1745"
                data-name="Path 1745"
                d="M25.054,634.587a2.3,2.3,0,0,1-1.671-.712L16.6,626.858a6.151,6.151,0,0,1,.643-8.677,5.945,5.945,0,0,1,7.834.289,5.925,5.925,0,0,1,7.8-.307l.267.236a6.151,6.151,0,0,1,.185,8.7l-6.565,6.781a2.464,2.464,0,0,1-1.714.71m.174-2.493v0m-4.238-12.687a3.34,3.34,0,0,0-2.1.743,3.59,3.59,0,0,0-.343,5.035l6.537,6.757,6.409-6.622a3.589,3.589,0,0,0-.113-5.069l.7-1.094-.7,1.094a3.49,3.49,0,0,0-4.687.236l-1.612,1.655-1.586-1.638a3.4,3.4,0,0,0-2.5-1.1"
                transform="translate(1034.928 -290.299)"
                fill={colors.text ? colors.text : '#fff'}
            />
            <Path
                id="Path_1744"
                data-name="Path 1744"
                d="M29.157,646.313a16.657,16.657,0,1,1,16.657-16.657,16.676,16.676,0,0,1-16.657,16.657m0-30.751a14.094,14.094,0,1,0,14.094,14.094,14.111,14.111,0,0,0-14.094-14.094"
                transform="translate(1030.851 -296.308)"
                fill={colors.text ? colors.text : '#fff'}
            />
            <Path
                id="Path_1743"
                data-name="Path 1743"
                d="M30.1,621.859l-1.855-.835A16.867,16.867,0,0,0,22.8,619.6a18.22,18.22,0,0,0-4.766.29l-1.527.295v-6.337A3.652,3.652,0,0,1,19.85,610L26.464,610a3.7,3.7,0,0,1,3.447,3.946Zm-8.587-4.871q.746,0,1.489.054h.023a19.349,19.349,0,0,1,4.42.922l-.092-4.09a1.152,1.152,0,0,0-1-1.317l-6.388.005a1.1,1.1,0,0,0-.892,1.179l0,3.39a20.9,20.9,0,0,1,2.437-.143"
                transform="translate(1037.1 -300.997)"
                fill={colors.text ? colors.text : '#fff'}
            />
        </G>
    </Svg>
)};

export default homeMyevents;
