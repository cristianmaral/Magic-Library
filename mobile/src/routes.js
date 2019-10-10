import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import Welcome from './pages/Welcome';
import Login from './pages/Login';
import Register from './pages/Register';

const Routes = createAppContainer(
  createSwitchNavigator({
    Welcome,
    Login,
    Register
  })
);

export default Routes;