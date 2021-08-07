import React, { useCallback, useEffect, useReducer, createContext } from 'react';
import AppHeader from '../app-header/app-header';
import Main from '../main/main';
import Modal from '../modal/modal';
import { INGREDIENTS_URL } from '../../constants/constants';
import { CLOSE_MODAL, OPEN_MODAL } from '../../constants/actions';
import reducer from '../../reducers/modal';

export const ModalContext = createContext();
export const IngredientsContext = createContext();
 
function App() {
  const [ingredientsState, setIngredientsState] = React.useState({
    loading: false,
    success: false,
    data: []
  });
  const [modalState, modalDispatch] = useReducer(reducer, {
    visible: false,
    content: null,
  });

  const onModalClose = useCallback(() => {
    modalDispatch({ type: CLOSE_MODAL })
  }, [])

  const onModalOpen = useCallback((content) => {
    modalDispatch({ type: OPEN_MODAL, payload: { content: content } })
  }, [])

  useEffect(() => {
    try {
      setIngredientsState({...ingredientsState, loading: true})
      fetch(INGREDIENTS_URL)
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          return Promise.reject(response);
        })
        .then(responseData => {
          if (responseData.success) {
            setIngredientsState({
              ...ingredientsState,
              loading: false,
              success: true,
              data: responseData.data,
              // data: [],
            });
          } else {
            setIngredientsState({
              ...ingredientsState,
              loading: false,
              success: false,
              data: [],
            });
          }
        })
    } catch (error) {
      console.log("Что-то пошло не так.", error);
    }
  }, [])

  return (
    <>
      <AppHeader />
      <ModalContext.Provider value={{onModalOpen, onModalClose}}>
        <IngredientsContext.Provider value={ingredientsState}>
          <Main />
        </IngredientsContext.Provider>
        {modalState.visible && modalState.content && <Modal>{modalState.content}</Modal>}
      </ModalContext.Provider>
    </>
  );
}

export default App;
