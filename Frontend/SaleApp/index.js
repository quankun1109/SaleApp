import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import {Login} from './screens/index';


AppRegistry.registerComponent(appName, () => () => <Login />);
