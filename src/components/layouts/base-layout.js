import { useCallback } from 'react';
import AppHeader from '../app-header/app-header';
import Main from '../main/main';
import Modal from '../modal/modal';
import { useDispatch, useSelector } from 'react-redux';
import { closeModalWithIngredient } from '../../redux/actions/modal';
import { modalContentTypes } from '../../utils/constants';
import IngredientDetails from '../modal/ingredient-details/ingredient-details';
import OrderDetails from '../modal/order-details/order-details';

function BaseLayout({ children }) {

    const dispatch = useDispatch();
    const modal = useSelector(store => store.modal);

    const onModalClose = useCallback(() => {
        dispatch(closeModalWithIngredient());
        // eslint-disable-next-line
    }, []);

    // TODO: refactor modal reducer 
    const content = modal.content === modalContentTypes.INGREDIENT_DETAILS
        ? <IngredientDetails />
        : <OrderDetails />

    return (
        <>
            <AppHeader />
            <Main>
                { children }
            </Main>
            { modal.isOpen && <Modal onModalClose={onModalClose}>{content}</Modal> }
        </>
    )
}

export default BaseLayout;