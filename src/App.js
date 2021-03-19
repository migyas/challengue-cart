import React from 'react';
import { PersistGate } from 'redux-persist/integration/react'; 
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import GlobalStyles from './styles/global';
import Routes from './routes';
import { store, persistor } from './store';

const App = () => ( 
  <>
    <BrowserRouter>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <Routes />
          <GlobalStyles />
        </PersistGate>
      </Provider>
    </BrowserRouter>
  </>
);

export default App;