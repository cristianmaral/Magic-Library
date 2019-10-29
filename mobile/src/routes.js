import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Admin from './pages/Admin';
import Auth from './pages/Auth';
import Book from './pages/Book';
import Login from './pages/Login';
import Main from './pages/Main';
import Register from './pages/Register';
import Search from './pages/Search';
import Welcome from './pages/Welcome';

const WelcomeStack = createStackNavigator(
  {
    Welcome,
    Login,
    Register
  },
  {
    defaultNavigationOptions: {
      headerTintColor: '#483b78',
      headerTitleStyle: { marginLeft: 0 }
    }
  }
);

const AdminStack = createStackNavigator(
  {
    Admin
  }
);

const MainStack = createStackNavigator(
  {
    Main,
    Book,
    Search
  },
  {
    defaultNavigationOptions: {
      headerTintColor: '#483b78',
      headerTitleStyle: { marginLeft: 0 }
    }
  }
);

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