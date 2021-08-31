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
 
function App() {

  return (   
    <Provider store={store}>
      <Router>
        <BaseLayout>
          <Switch>
            <Route path="/" exact><HomePage /></Route>
            <Route path="/profile" exact><ProfilePage /></Route>
            <Route path="/login" exact><LoginPage /></Route>
            <Route path="/register" exact><RegisterPage /></Route>
            <Route path="/forgot-password" exact><ForgotPasswordPage /></Route>
            <Route path="/reset-password" exact><ResetPasswordPage /></Route>
            <Route path="/ingredient/:id" exact><IngredientPage /></Route>
            <Route><NotFoundPage path="*" /></Route>
          </Switch>
        </BaseLayout>
      </Router>
    </Provider>
  );
}

export default App;
