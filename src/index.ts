import {AppRegistry} from 'react-native'
import App from "@src/App";

AppRegistry.registerComponent("Ssss", () => App)

AppRegistry.runApplication("Ssss", {
  initialProps: {},
  rootTag: document.getElementById('root'),
})