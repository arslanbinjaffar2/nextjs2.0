import 'react-native-gesture-handler';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import RootStack from 'app/navigations/RootStack';
import { Provider } from 'app/provider'

const App = () => {
  return (
      <Provider>
        <StatusBar />
        <RootStack />
      </Provider>
  );
};

export default App;
