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
    FeedPage,
    FeedOrderPage,
    ProfileOrderPage } from '../../pages';
import BaseLayout from '../layouts/base-layout';
import { Location } from 'history';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useLocation,
  useHistory } from 'react-router-dom';
import { useEffect } from 'react';
import ProtectedRoute from '../protected-route/protected-route';
import { useDispatch } from '../../services/hooks';
import { getUserDataThunk } from '../../services/actions/user';
import { getIngredientsThunk } from '../../services/actions/burger-ingredients';
import IngredientDetails from '../modal/ingredient-details/ingredient-details';
import Modal from '../modal/modal';
import FeedOrderInfo from '../feed-order-info/feed-order-info';
import ProfileForm from '../profile-form/profile-form';
import { TIngredientWithCount } from '../../services/types/data';
 
export default function App() {

  const dispatch = useDispatch();
  const refreshToken = localStorage.getItem('refreshToken');

  useEffect(() => {
      if (refreshToken) {
        dispatch(getUserDataThunk());
      }
      dispatch(getIngredientsThunk());
  //eslint-disable-next-line
  }, []);

  return (
    <Router>
        <ModalSwitch />
    </Router>
  );
}

interface IState {
  background?: Location;
  ingredient?: TIngredientWithCount;
  order?: any
}

function ModalSwitch() {

  let history = useHistory();
  const location = useLocation<IState>();

  const background = history.action === 'PUSH' && location.state && location.state.background;
  const ingredient = location.state && location.state.ingredient;
  const order = location.state && location.state.order;

  const onClose = () => {
    history.goBack();
  };

  return (
    <BaseLayout>
      <Switch location={ background || location } >
        <Route path="/" exact><HomePage /></Route>
        <Route path="/feed" exact><FeedPage /></Route>
        <Route path="/feed/:id" exact><FeedOrderPage /></Route>
        <ProtectedRoute path="/profile" exact>
          <ProfilePage><ProfileForm /></ProfilePage>
        </ProtectedRoute>
        <ProtectedRoute path="/profile/orders" exact>
          <ProfilePage><ProfileOrdersPage /></ProfilePage>
        </ProtectedRoute>
        <ProtectedRoute path="/profile/orders/:id" exact><ProfileOrderPage /></ProtectedRoute>
        <Route path="/login" exact><LoginPage /></Route>
        <Route path="/register" exact><RegisterPage /></Route>
        <Route path="/forgot-password" exact><ForgotPasswordPage /></Route>
        <Route path="/reset-password" exact><ResetPasswordPage /></Route>
        <Route path="/ingredient/:id" exact><IngredientPage /></Route>
        <Route><NotFoundPage /></Route>
      </Switch>

      { (background && ingredient) && (
        <Route path="/ingredient/:id" render={() => {
            return (
              <Modal onClose={onClose}>
                <IngredientDetails ingredient={ingredient} />
              </Modal>
            );
          }} /> 
      )}
      { (background && order) && (
        <Route path="/feed/:id" render={() => {
            return (
              <Modal onClose={onClose}>
                <FeedOrderInfo order={order} />
              </Modal>
            );
          }} /> 
      )}
      { (background && order) && (
        <Route path="/profile/orders/:id" render={() => {
            return (
              <Modal onClose={onClose}>
                <FeedOrderInfo order={order} />
              </Modal>
            );
          }} /> 
      )}
      
    </BaseLayout>
  );
}
