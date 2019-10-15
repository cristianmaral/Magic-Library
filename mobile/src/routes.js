import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Welcome from './pages/Welcome';
import Login from './pages/Login';
import Register from './pages/Register';
import Admin from './pages/Admin';
import BookList from './pages/BookList';

const WelcomeStack = createStackNavigator({
  Welcome,
  Login,
  Register
});

const AdminStack = createStackNavigator({
  Admin
});

const BookListStack = createStackNavigator({
  BookList
});

const Routes = createAppContainer(
  createSwitchNavigator({
    WelcomeStack,
    AdminStack,
    BookListStack
  })
);

export default Routes;