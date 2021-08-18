import { useCallback } from 'react';
import AppHeader from '../app-header/app-header';
import Main from '../main/main';
import Modal from '../modal/modal';
import { useDispatch, useSelector } from 'react-redux';
import { closeModalWithIngredient } from '../../services/actions/modal';
import { modalContentTypes } from '../../services/utils/constants';
import IngredientDetails from '../modal/ingredient-details/ingredient-details';
import OrderDetails from '../modal/order-details/order-details';
 
function App() {

  const dispatch = useDispatch();
  const modal = useSelector(store => store.modal);

  const onModalClose = useCallback(() => {
    dispatch(closeModalWithIngredient());
  }, [dispatch]);

  const content = modal.content === modalContentTypes.INGREDIENT_DETAILS
    ? <IngredientDetails />
    : <OrderDetails />

  return (
    <>
      <AppHeader />
      <Main />
      { modal.isOpen && <Modal onModalClose={onModalClose}>{content}</Modal> }
    </>
  );
}

export default App;
