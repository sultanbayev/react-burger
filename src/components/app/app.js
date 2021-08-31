import BaseLayout from '../layouts/base-layout';
import HomePage from '../../pages/home/home';
import NotFoundPage from '../../pages/not-found/not-found';
import { Provider } from 'react-redux';
import { store } from '../../redux/store';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
 
function App() {

  return (   
    <Provider store={store}>
      <Router>
        <BaseLayout>
          <Switch>
            <Route path="/" exact>
              <HomePage />
            </Route>
            <Route>
              <NotFoundPage path="*" />
            </Route>
          </Switch>
        </BaseLayout>
      </Router>
    </Provider>
  );
}

export default App;
