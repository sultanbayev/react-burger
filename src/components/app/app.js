import React, { useEffect } from 'react';
import AppHeader from '../app-header/app-header';
import Main from '../main/main';
import Modal from '../modal/modal';

function App() {
  
  const [ingredients, setIngredients] = React.useState([])
  const url = 'https://norma.nomoreparties.space/api/ingredients';
  // const [modal, setModal] = React.useState({
  //   visible: false,
  //   content: null,
  // });

  useEffect(() => {
    try {
      fetch(url)
        .then(response => response.json())
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
      <Main ingredients={ingredients} />
      {/* <Modal ></Modal> */}
    </>
  );
}

export default App;
