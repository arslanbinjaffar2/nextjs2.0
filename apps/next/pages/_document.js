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
        <Head />
        <body style={{ height: "100%", overflow: "hidden" }}>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export const style = `
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
}`;

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