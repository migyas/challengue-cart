import { persistStore } from 'redux-persist';
import { createStore } from 'redux';
import resistedReducers from './persistReducers'

import rootReducer from './modules/rootReducer';

const store = createStore(
    resistedReducers(rootReducer),
    
);

const persistor = persistStore(store);

export {store, persistor}; 