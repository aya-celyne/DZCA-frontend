import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers , getDefaultMiddleware } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import postReducer from './postSlice';

// Configuration persist
const persistConfig = {
  key: 'root',
  storage,
};

// Combine reducers pour en faire une seule fonction reducer
const rootReducer = combineReducers({
  user: userReducer,
  posts: postReducer,
});

// Créer un reducer persisté
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Créer le store avec le reducer persisté
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Désactiver la vérification de sérialisation
    }),
});

// Initialiser persistor
const persistor = persistStore(store);

export { store, persistor };





