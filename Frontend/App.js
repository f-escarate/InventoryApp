import MainContainer from './navigation/MainContainer'
import { LogBox } from 'react-native';

LogBox.ignoreLogs(['Invalid prop `textStyle` of type `array` supplied to `Cell`, expected `object`.']);

export default function App() {
  return (
    <MainContainer />
  );
}
