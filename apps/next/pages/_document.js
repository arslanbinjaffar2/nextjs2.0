import { default as NativebaseDocument } from "@native-base/next-adapter/document";
import NextDocument, { Html, Head, Main, NextScript } from "next/document";
export { default as ExpoDocument } from "@expo/next-adapter/document";
import EntypoFont from "react-native-vector-icons/Fonts/Entypo.ttf";
import AntDesignFont from "react-native-vector-icons/Fonts/AntDesign.ttf";
import EvilIconsFont from "react-native-vector-icons/Fonts/EvilIcons.ttf";
import FeatherFont from "react-native-vector-icons/Fonts/Feather.ttf";
import FontAwesomeFont from "react-native-vector-icons/Fonts/FontAwesome.ttf";
import FontistoFont from "react-native-vector-icons/Fonts/Fontisto.ttf";
import FoundationFont from "react-native-vector-icons/Fonts/Foundation.ttf";
import IoniconsFont from "react-native-vector-icons/Fonts/Ionicons.ttf";
import MaterialCommunityIconsFont from "react-native-vector-icons/Fonts/MaterialCommunityIcons.ttf";
import MaterialIconsFont from "react-native-vector-icons/Fonts/MaterialIcons.ttf";
import OcticonsFont from "react-native-vector-icons/Fonts/Octicons.ttf";
import SimpleLineIconsFont from "react-native-vector-icons/Fonts/SimpleLineIcons.ttf";
import ZocialFont from "react-native-vector-icons/Fonts/Zocial.ttf";
import AvenirNextCondensed from "application/assets/fonts/AvenirNextCondensed.ttf";
import AvenirNextCondensedMedium from "application/assets/fonts/AvenirNextCondensed-Medium.ttf";
import AvenirNextCondensedDemiBold from "application/assets/fonts/AvenirNextCondensed-DemiBold.ttf";
import AvenirNextCondensedBold from "application/assets/fonts/AvenirNextCondensedBold.ttf";

import * as React from "react";
import { AppRegistry } from "react-native";

class Document extends NativebaseDocument {
  render() {
    return (
      <Html style={{ height: "100%" }}>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        </Head>
        <link
            rel="stylesheet"
            type="text/css"
            charSet="UTF-8"
            href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
          />

          <link
            rel="stylesheet"
            type="text/css"
            href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
          />
        <body style={{ height: "100%", overflow: "hidden" }}>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export const style = `
* {
  scrollbar-width: thin;
  scrollbar-color: #9ca3af transparent
}

::-webkit-scrollbar {
  width: 4px;
  height: 4px
}
::-webkit-scrollbar-corner,::-webkit-scrollbar-track {
  background: transparent
}
::-webkit-scrollbar-thumb {
  background-color: #9ca3af;
  border-radius: 20px;
  border: 3px solid transparent
}
@font-face {
  src: url(${AvenirNextCondensed});
  font-family: Avenir;
  font-weight: 400;
  font-style: normal;
}
@font-face {
  src: url(${AvenirNextCondensedMedium});
  font-family: Avenir;
  font-weight: 500;
  font-style: normal;
}
@font-face {
  src: url(${AvenirNextCondensedDemiBold});
  font-family: Avenir;
  font-weight: 600;
  font-style: normal;
}
@font-face {
  src: url(${AvenirNextCondensedBold});
  font-family: Avenir;
  font-weight: 700;
  font-style: normal;
}
@font-face {
  src: url(${EntypoFont});
  font-family: Entypo;
}
@font-face {
  src: url(${EvilIconsFont});
  font-family: EvilIcons;
}
@font-face {
  src: url(${FontAwesomeFont});
  font-family: FontAwesome;
}
@font-face {
  src: url(${FeatherFont});
  font-family: Feather;
}
@font-face {
  src: url(${IoniconsFont});
  font-family: Ionicons;
}
@font-face {
  src: url(${FoundationFont});
  font-family: Foundation;
}
@font-face {
  src: url(${MaterialIconsFont});
  font-family: MaterialIcons;
}
@font-face {
  src: url(${MaterialCommunityIconsFont});
  font-family: MaterialCommunityIcons;
}
@font-face {
  src: url(${ZocialFont});
  font-family: Zocial;
}
@font-face {
  src: url(${SimpleLineIconsFont});
  font-family: SimpleLineIcons;
}
@font-face {
  src: url(${OcticonsFont});
  font-family: Octicons;
}
@font-face {
  src: url(${FontistoFont});
  font-family: Fontisto;
}
@font-face {
  src: url(${AntDesignFont});
  font-family: AntDesign;
}
@font-face {
  src: url(${IoniconsFont});
  font-family: Ionicons;
}
#__next { id=__next-
  flex-shrink: 0;
  flex-basis: auto;
  flex-direction: column;
  flex-grow: 1;
  display: flex;
  flex: 1;
}
body {
  display: flex;
}
.rdtPicker {
  margin-top:10px !important;
}
.rdtDays, .ebs-date-wrapper,.rdtCount,.styles_react-code-input__CRulA > input {
  font-family: 'Avenir', sans-serif !important;
}
.rdtTime .rdtSwitch,.rdtTimeToggle {
  display: none !important;
}
.rsw-ce {
  min-height: 90px;
}
.rsw-toolbar {
  flex-wrap: wrap;
}
.ebs-iframe-content-no-margin {
  display: flex;
  flex-direction: column;
}
.ebs-iframe-content-no-margin * {
  line-height: 1.2;
  margin: 0;
}
.ebs-iframe-content {
  display: flex;
  flex-direction: column;
  line-height: 1.5;
}
.ebs-iframe-content * {
  margin: 0;
}
.ebs-iframe-content p,.ebs-iframe-content  h1,.ebs-iframe-content  h2,.ebs-iframe-content  h3,.ebs-iframe-content h4,.ebs-iframe-content h5,.ebs-iframe-content h6 {
  margin-bottom: 15px;
}
.ebs-iframe-content img {
  max-width: 100%;
  height: auto;
}
.r-zIndex-1ufr4wv + .r-zIndex-1ufr4wv{
  z-index: 8 !important;
}
.css-view-1dbjc4n,.css-1dbjc4n {
  z-index: unset !important;
}
.css-12a83d4-MultiValueRemove {
  background-color: #000;
}
.r-backgroundColor-16it7h5 {
  backdrop-filter: blur(5px);
}
.no-margin * {margin: 0}
.styles_react-code-input-container__tpiKG  {
  width: 100% !important;
}
.styles_react-code-input__CRulA {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  justify-content: center;
}
.styles_react-code-input__CRulA > input {
  width: 14% !important;
  background: rgba(0,0,0,0.1) !important;
  border-radius: 6px !important;
  border-color: transparent !important;
  color: #fff !important;
  flex: 1 !important;
}
.wrapper-select,.css-b62m3t-container  {
  width: 100%;
}
#ebs-exhibitor-slider .slick-slide,#ebs-sponsors-slider .slick-slide {
 width: 264px !important; 
}
.add-blur-radius {
  backdrop-filter: blur(8px);
} 
#ebs-button-close {
  z-index: 99 !important;
}
.css-3iigni-container {
  width: 100%;
}
#zindex-9,#button-reload-post {
  z-index: 9 !important;
}
.wrapper-select.isDisabled {
  pointer-events: none;
}
#ebs-navigation-slider .slick-list .slick-track {
  margin: auto;
}
svg #svg-elem-1 {
  fill: transparent;
  stroke-dashoffset: 115.09733552923255px;
  stroke-dasharray: 115.09733552923255px;
  -webkit-transition: stroke-dashoffset 0.5s cubic-bezier(0.215, 0.61, 0.355, 1) 0s,
                        fill 0.4s cubic-bezier(0.215, 0.61, 0.355, 1) 0.4s;
          transition: stroke-dashoffset 0.5s cubic-bezier(0.215, 0.61, 0.355, 1) 0s,
                fill 0.4s cubic-bezier(0.215, 0.61, 0.355, 1) 0.4s;
}

svg#active #svg-elem-1 {
  stroke-dashoffset: 0;
}

svg #svg-elem-2 {
  stroke-dashoffset: 96.24777960769379px;
  stroke-dasharray: 96.24777960769379px;
  fill: transparent;
  -webkit-transition: stroke-dashoffset 0.5s cubic-bezier(0.215, 0.61, 0.355, 1) 0.12s,
                        fill 0.4s cubic-bezier(0.215, 0.61, 0.355, 1) 0.5s;
          transition: stroke-dashoffset 0.5s cubic-bezier(0.215, 0.61, 0.355, 1) 0.12s,
                fill 0.4s cubic-bezier(0.215, 0.61, 0.355, 1) 0.5s;
}

svg#active #svg-elem-2 {
  stroke-dashoffset: 0;
}

svg #svg-elem-3 {
   fill: transparent;
  stroke-dashoffset: 25.3505859375px;
  stroke-dasharray: 25.3505859375px;
  -webkit-transition: stroke-dashoffset 0.5s cubic-bezier(0.215, 0.61, 0.355, 1) 0.24s,
                        fill 0.4s cubic-bezier(0.215, 0.61, 0.355, 1) 0.6000000000000001s;
          transition: stroke-dashoffset 0.5s cubic-bezier(0.215, 0.61, 0.355, 1) 0.24s,
                fill 0.4s cubic-bezier(0.215, 0.61, 0.355, 1) 0.6000000000000001s;
}

svg#active #svg-elem-3 {
  stroke-dashoffset: 0;
}
#bg-circle-animation {
  animation-name: example;
  animation-duration: 0.4s;
}
@keyframes example {
  from {transform: scale(0);}
  to {transform: scale(1);}
}
.rsw-toolbar,.rsw-editor {
  border: none !important;
}
div[data-testID="TitleContainer"]+ div {
  border-radius: 10px !important;
  
}
div[data-testID="IconContainer"] {
  border:0px solid transparent !important;
}
div[data-testID="="Button"]{
  border:0px solid transparent !important;
  outline:0px solid transparent !important;
}
.css-view-1dbjc4n{
  border:transparent !important;
}
.add-blur {
  backdrop-filter: blur(8px);
}

`;

export async function getInitialProps({ renderPage }) {
  AppRegistry.registerComponent("Main", () => Main);
  const { getStyleElement } = AppRegistry.getApplication("Main");
  const page = await renderPage();
  const styles = [
    // eslint-disable-next-line react/jsx-key
    <style dangerouslySetInnerHTML={{ __html: style }} />,
    getStyleElement(),
  ];
  return { ...page, styles: React.Children.toArray(styles) };
}
Document.getInitialProps = getInitialProps;

export default Document;