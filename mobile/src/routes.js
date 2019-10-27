import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Auth from './pages/Auth';
import Welcome from './pages/Welcome';
import Login from './pages/Login';
import Register from './pages/Register';
import Admin from './pages/Admin';
import Main from './pages/Main';

const WelcomeStack = createStackNavigator({
  Welcome,
  Login,
  Register
});

const AdminStack = createStackNavigator({
  Admin
});

const MainStack = createStackNavigator({
  Main
});

const Routes = createAppContainer(
  createSwitchNavigator(
    {
      Auth,
      WelcomeStack,
      AdminStack,
      MainStack
    },
    {
      initialRouteName: 'Auth'
    }
  )
);

export default Routes;