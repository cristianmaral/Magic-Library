import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import {  createStackNavigator } from 'react-navigation-stack';

import Welcome from './pages/Welcome';
import Login from './pages/Login';
import Register from './pages/Register';

const Routes = createAppContainer(
  createStackNavigator({
    Welcome,
    Login,
    Register
  })
);

export default Routes;