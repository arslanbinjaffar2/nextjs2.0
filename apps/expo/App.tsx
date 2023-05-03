import 'react-native-gesture-handler';
import { StatusBar } from 'react-native';
import RootStack from 'application/navigations/RootStack';
import { Provider } from 'application/provider/mobile'
import { store } from 'application/store/Index'
import { Provider as ReduxProvider } from 'react-redux'
import { NODE_ENV, APP_API_BASE_URL, APP_MSW_ENABLED, APP_EVENTCENTER_BASE_URL } from '@env';

const App = () => {

  const env = {
    enviroment: NODE_ENV,
    api_base_url: APP_API_BASE_URL,
    msw_enabled: APP_MSW_ENABLED,
    eventcenter_base_url: APP_EVENTCENTER_BASE_URL,
  }
  return (
    <ReduxProvider store={store}>
      {env && (
        <Provider env={env}>
          <StatusBar />
          <RootStack />
        </Provider>
      )}
    </ReduxProvider>
  );
};

export default App;
