import BaseLayout from '../layouts/base-layout';
import HomePage from '../../pages/home/home';
import NotFoundPage from '../../pages/not-found/not-found';
import LoginPage from '../../pages/login/login';
import RegisterPage from '../../pages/register/register';
import ForgotPasswordPage from '../../pages/forgot-password/forgot-password';
import ResetPasswordPage from '../../pages/reset-password/reset-password';
import ProfilePage from '../../pages/profile/profile';
import IngredientPage from '../../pages/ingredient/ingredient';
import { Provider } from 'react-redux';
import { store } from '../../redux/store';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import PrivateRoute from '../private-route/private-route';
 
function App() {

  return (   
    <Provider store={store}>
      <Router>
        <BaseLayout>
          <Switch>
            <PrivateRoute path="/" exact><HomePage /></PrivateRoute>
            <PrivateRoute path="/profile" exact><ProfilePage /></PrivateRoute>
            <Route path="/login" exact><LoginPage /></Route>
            <Route path="/register" exact><RegisterPage /></Route>
            <Route path="/forgot-password" exact><ForgotPasswordPage /></Route>
            <Route path="/reset-password" exact><ResetPasswordPage /></Route>
            <PrivateRoute path="/ingredient/:id" exact><IngredientPage /></PrivateRoute>
            <Route><NotFoundPage path="*" /></Route>
          </Switch>
        </BaseLayout>
      </Router>
    </Provider>
  );
}

export default App;
