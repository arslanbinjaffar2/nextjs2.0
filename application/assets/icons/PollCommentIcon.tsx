import * as React from "react";
import { getColorScheme } from 'application/styles/colors';
import UseEventService from 'application/store/services/UseEventService';
const SvgComponent = (props:any) => {
  const { event } = UseEventService()
  const colors = getColorScheme(event?.settings?.app_background_color ?? '#343d50', event?.settings?.app_text_mode);
  return (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={21.846}
    height={17.181}
    {...props}
  >
    <g data-name={1}>
      <g data-name="Group 26">
        <path
          fill="none"
          stroke={props.color ? props.color : colors.text}
          d="M8.908.5C4.265.5.5 3.144.5 6.406c0 2.015 1.437 3.793 3.629 4.858a2.35 2.35 0 0 1-.971 1.843.262.262 0 0 0 .179.451 6.27 6.27 0 0 0 3.776-1.383 11.9 11.9 0 0 0 1.795.136c4.644 0 8.408-2.644 8.408-5.906S13.552.5 8.908.5Z"
          data-name="Path 54"
        />
        <path
          fill="none"
          stroke={props.color ? props.color : colors.text}
          d="M21.346 9.528a5.175 5.175 0 0 0-2.407-4.135 4.9 4.9 0 0 1 .605 2.333c0 3.65-4.213 6.609-9.409 6.609a13.17 13.17 0 0 1-2.537-.245 10.743 10.743 0 0 0 5.34 1.344c.244 0 .485-.009.724-.023a6.157 6.157 0 0 0 3.62 1.27.262.262 0 0 0 .179-.451 3.088 3.088 0 0 1-.934-1.361c2.848-.946 4.819-2.981 4.819-5.341Z"
          data-name="Path 55"
        />
        <g data-name="Group 27">
          <path
            fill={props.color ? props.color : colors.text}
            d="m7.687 7.304-.017-.217a1.912 1.912 0 0 1 .516-1.441 1.829 1.829 0 0 0 .583-1.141c0-.425-.266-.708-.791-.716a1.481 1.481 0 0 0-.841.258l-.2-.525a2.182 2.182 0 0 1 1.191-.333 1.231 1.231 0 0 1 1.391 1.224 2.255 2.255 0 0 1-.716 1.449 1.645 1.645 0 0 0-.475 1.224l.008.217ZM7.504 8.47a.492.492 0 0 1 .5-.525.521.521 0 1 1-.5.525Z"
            data-name="Path 56"
          />
        </g>
      </g>
    </g>
  </svg>
)}
export default SvgComponent
