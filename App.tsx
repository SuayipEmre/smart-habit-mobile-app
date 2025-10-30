
import './global.css';
import { Text, View } from 'react-native';
import { Provider } from 'react-redux';
import RootNavigator from '@/navigation/RootNavigator';
import { store } from '@/store/app/store';

export default function App() {
  return (
    <Provider store={store}>
      <RootNavigator />
    </Provider>
  );
}
