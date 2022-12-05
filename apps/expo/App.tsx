import 'react-native-gesture-handler';
import { StatusBar } from 'react-native';
import RootStack from 'application/navigations/RootStack';
import { Provider } from 'application/provider/mobile'

const App = () => {
  return (
      <Provider>
        <StatusBar />
        <RootStack />
      </Provider>
  );
};

export default App;
