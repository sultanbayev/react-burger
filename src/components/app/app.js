import React, { useCallback, useEffect, useReducer } from 'react';
import AppHeader from '../app-header/app-header';
import Main from '../main/main';
import Modal from '../modal/modal';
import { URL } from '../../constants/constants';
import { CLOSE_MODAL, OPEN_MODAL } from '../../constants/actions';
import reducer from '../../reducers/modal';
import { IngredientsContext, ModalContext } from './context';
 
function App() {
  const [ingredients, setIngredients] = React.useState([])
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
      fetch(URL)
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          return Promise.reject(response);
        })
        .then(data => {
          if (data.success) setIngredients(data.data)
        })
    } catch (error) {
      console.log("Что-то пошло не так.", error);
    }
  }, [])

  return (
    <>
      <AppHeader />
      <ModalContext.Provider value={{onModalOpen, onModalClose}}>
        <IngredientsContext.Provider value={ingredients}>
          <Main />
        </IngredientsContext.Provider>
        {modalState.visible && modalState.content && <Modal>{modalState.content}</Modal>}
      </ModalContext.Provider>
    </>
  );
}

export default App;
