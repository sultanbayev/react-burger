import BaseLayout from '../layouts/base-layout';
import HomePage from '../../pages/home/home';
import NotFoundPage from '../../pages/not-found/not-found';
import LoginPage from '../../pages/login/login';
import RegisterPage from '../../pages/register/register';
import ForgotPasswordPage from '../../pages/forgot-password/forgot-password';
import ResetPasswordPage from '../../pages/reset-password/reset-password';
import ProfilePage from '../../pages/profile/profile';
import IngredientPage from '../../pages/ingredient/ingredient';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ProtectedRoute from '../protected-route/protected-route';
import AuthProvider from '../auth-provider/auth-provider';
import { Provider } from 'react-redux';
import { store } from '../../redux/store';
 
function App() {  
  return (
    <Provider store={store}>
      <AuthProvider>
        <Router>
          <BaseLayout>
            <Switch>
              <Route path="/" exact><HomePage /></Route>
              <ProtectedRoute path="/profile" exact><ProfilePage /></ProtectedRoute>
              <Route path="/login" exact><LoginPage /></Route>
              <Route path="/register" exact><RegisterPage /></Route>
              <Route path="/forgot-password" exact><ForgotPasswordPage /></Route>
              <Route path="/reset-password" exact><ResetPasswordPage /></Route>
              <Route path="/ingredient/:id" exact><IngredientPage /></Route>
              <Route><NotFoundPage path="*" /></Route>
            </Switch>
          </BaseLayout>
        </Router>
      </AuthProvider>
    </Provider>
  );
}

export default App;
