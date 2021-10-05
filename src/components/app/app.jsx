import {
    HomePage,
    LoginPage,
    RegisterPage,
    ForgotPasswordPage,
    ResetPasswordPage,
    ProfilePage,
    IngredientPage,
    NotFoundPage,
    ProfileOrdersPage,
    FeedPage } from '../../pages';
import BaseLayout from '../layouts/base-layout';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useLocation,
  useHistory } from 'react-router-dom';
import { useEffect } from 'react';
import ProtectedRoute from '../protected-route/protected-route';
import { useDispatch } from 'react-redux';
import { getUserData } from '../../services/actions/user';
import { fetchIngredients } from '../../services/actions/burger-ingredients';
import IngredientDetails from '../modal/ingredient-details/ingredient-details';
import Modal from '../modal/modal';
 
export default function App() {

  const dispatch = useDispatch();

  useEffect(() => {
      const token = localStorage.getItem('refreshToken');
      token && dispatch(getUserData());
      dispatch(fetchIngredients());
      //eslint-disable-next-line
  }, []);

  return (
        <Router>
            <ModalSwitch />
        </Router>
  );
}

function ModalSwitch() {

  let history = useHistory();
  const location = useLocation();

  const background = (history.action === 'PUSH') ? (location.state && location.state.background) : undefined;
  const ingredient = location.state && location.state.ingredient;

  return (
    <BaseLayout>
      <Switch location={ background || location } >
        <Route path="/" exact><HomePage /></Route>
        <ProtectedRoute path="/profile" exact><ProfilePage /></ProtectedRoute>
        <ProtectedRoute path="/profile/orders" exact><ProfileOrdersPage /></ProtectedRoute>
        <Route path="/login" exact><LoginPage /></Route>
        <Route path="/register" exact><RegisterPage /></Route>
        <Route path="/forgot-password" exact><ForgotPasswordPage /></Route>
        <Route path="/reset-password" exact><ResetPasswordPage /></Route>
        <Route path="/ingredient/:id" exact><IngredientPage /></Route>
        <Route path="/feed" exact><FeedPage /></Route>
        <Route><NotFoundPage path="*" /></Route>
      </Switch>

      {background && ingredient && <Route path="/ingredient/:id" render={() => {
          const onClose = () => {
            history.goBack();
          };
          return <Modal onClose={onClose}><IngredientDetails ingredient={ingredient} /></Modal>;
        }} />}
    </BaseLayout>
  );
}
