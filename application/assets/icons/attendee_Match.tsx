import * as React from "react";
import Svg, { SvgProps, Defs, ClipPath, Rect, G, Path } from "react-native-svg";
import { getColorScheme } from 'application/styles/colors';
import UseEventService from 'application/store/services/UseEventService';
const SVGComponent = (props: SvgProps) =>{
const { event } = UseEventService()
const colors = getColorScheme(event?.settings?.app_background_color ?? '#343d50', event?.settings?.app_text_mode);
    
return(
<Svg
    id="Group_5315"
    data-name="Group 5315"
    width={props.width}
    height={props.height}
    viewBox="0 0 20 21.92"
    {...props}
  >
    <Defs>
      <ClipPath id="clip-path">
        <Rect
          id="Rectangle_4094"
          data-name="Rectangle 4094"
          width={props.width}
          height={props.height}
          fill={props.color ? props.color : colors.text}
        />
      </ClipPath>
    </Defs>
    <G id="Group_5314" data-name="Group 5314">
      <Path
        id="Path_2335"
        data-name="Path 2335"
        d="M12.911,118.717l-.508.715q-1.074,1.514-2.153,3.026a2.89,2.89,0,0,0-.558,1.747c.008,1.568,0,3.137.006,4.705a.209.209,0,0,1-.16.238c-.837.311-1.67.633-2.5.951-.05.019-.1.034-.183.06v-.206c0-1.917-.007-3.833,0-5.75a2.9,2.9,0,0,0-.564-1.761q-2.6-3.64-5.18-7.29c-.032-.044-.061-.09-.108-.159h9.141q-.022-.221-.022-.447t.02-.42H.838c-.056,0-.111,0-.166,0a.708.708,0,0,0-.534.292.744.744,0,0,0,.059.934q2.695,3.8,5.392,7.589a2.08,2.08,0,0,1,.4,1.265c-.01,2.016,0,4.033,0,6.049a.757.757,0,0,0,.189.6,2.549,2.549,0,0,0,.365.242h.3a.093.093,0,0,1,.025-.021l3.125-1.183a.714.714,0,0,0,.565-.82c0-1.63,0-3.26,0-4.889a1.985,1.985,0,0,1,.383-1.206q1.16-1.618,2.307-3.245l.537-.758a4.477,4.477,0,0,1-.871-.26"
        transform="translate(0 -109.178)"
        fill={props.color ? props.color : colors.text}
      />
      <Path
        id="Path_2336"
        data-name="Path 2336"
        d="M278.582,129.8a1.5,1.5,0,0,0-1.546-1.418h-2.491a1.608,1.608,0,0,0-1.084.4,1.36,1.36,0,0,0-.467,1.018v.775a.3.3,0,0,0,.609,0v-.774a.757.757,0,0,1,.263-.565,1,1,0,0,1,.677-.25h2.494a.888.888,0,0,1,.939.816v.85a.3.3,0,0,0,.3.3h0a.3.3,0,0,0,.3-.308Z"
        transform="translate(-261.157 -122.817)"
        fill={props.color ? props.color : colors.text}
        stroke={props.color ? props.color : colors.text}
        strokeWidth={0.1}
      />
      <Path
        id="Path_2337"
        data-name="Path 2337"
        d="M307.792,62.616a1.421,1.421,0,1,0-1.421-1.421,1.422,1.422,0,0,0,1.421,1.421m-.815-1.423a.815.815,0,1,1,.815.815.816.816,0,0,1-.815-.815"
        transform="translate(-293.087 -57.818)"
        fill={props.color ? props.color : colors.text}
        stroke={props.color ? props.color : colors.text}
        strokeWidth={0.1}
      />
      <Path
        id="Path_2338"
        data-name="Path 2338"
        d="M218.974,0a5.369,5.369,0,0,0-5.353,4.949c-.01.139-.016.279-.016.42s.006.3.019.447a5.371,5.371,0,0,0,3.121,4.438,5.234,5.234,0,0,0,.842.3A5.369,5.369,0,1,0,218.974,0m0,9.879a4.506,4.506,0,0,1-4.488-4.063q-.022-.221-.022-.447t.02-.42a4.51,4.51,0,1,1,4.491,4.93"
        transform="translate(-204.343)"
        fill={props.color ? props.color : colors.text}
      />
    </G>
  </Svg>
);
}

export default SVGComponent;
