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
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useLocation,
  useHistory } from 'react-router-dom';
import { useEffect } from 'react';
import ProtectedRoute from '../protected-route/protected-route';
import { useDispatch, useSelector } from 'react-redux';
import { getUserData } from '../../services/actions/user';
import { fetchIngredients } from '../../services/actions/burger-ingredients';
import IngredientDetails from '../modal/ingredient-details/ingredient-details';
import Modal from '../modal/modal';
import { USER_WS_CONNECTION_START, WS_CONNECTION_START } from '../../services/actions/wsActions';
import FeedOrderInfo from '../feed-order-info/feed-order-info';
import ProfileForm from '../profile-form/profile-form';
 
export default function App() {

  const dispatch = useDispatch();
  const { isAuthorised } = useSelector(store => store.user);
  const refreshToken = localStorage.getItem('refreshToken');

  useEffect(() => {
      if (refreshToken) {
        dispatch(getUserData());
      }
      dispatch(fetchIngredients());
      //eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (isAuthorised) {
      dispatch({ type: WS_CONNECTION_START });
      dispatch({ type: USER_WS_CONNECTION_START});
    }
    //eslint-disable-next-line
  }, [isAuthorised]);

  return (
    <Router>
        <ModalSwitch />
    </Router>
  );
}

function ModalSwitch() {

  let history = useHistory();
  const location = useLocation();

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
        <Route><NotFoundPage path="*" /></Route>
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
