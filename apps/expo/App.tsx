import 'react-native-gesture-handler';
import { StatusBar } from 'react-native';
import RootStack from 'app/navigations/RootStack';
import { Provider } from 'app/provider/mobile'

const App = () => {
  return (
      <Provider>
        <StatusBar />
        <RootStack />
      </Provider>
  );
};

export default App;
