import React, { useCallback, useEffect } from 'react';
import AppHeader from '../app-header/app-header';
import Main from '../main/main';
import Modal from '../modal/modal';
import { URL } from '../../utils/constants';
 
function App() {
  
  const [ingredients, setIngredients] = React.useState([])

  const [modal, setModal] = React.useState({
    visible: false,
    content: null,
  });

  const onModalClose = useCallback(() => {
    setModal({
      ...modal,
      visible: false,
      content: null,
    })
  }, [modal])

  const onModalOpen = useCallback((content) => {
    setModal({
      ...modal,
      visible: true,
      content,
    })
  }, [modal])

  useEffect(() => {
    try {
      fetch(URL)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Ошибка сети')
          }
          return response.json();
        })
        .then(data => {
          if (data.success) setIngredients(data.data)
        })
    } catch (error) {
      console.log("error", error);
    }
  }, [])

  return (
    <>
      <AppHeader />
      <Main ingredients={ingredients} onModalOpen={onModalOpen} />
      {modal.visible && modal.content && <Modal onModalClose={onModalClose}>{modal.content}</Modal>}
    </>
  );
}

export default App;
