import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import userReducer from './slices/userSlice';
import adminReducer from './slices/adminSlice';

// Updated persist config
const persistConfig = {
  key: 'newRoot', // Updated key to invalidate old persisted state
  version: 1,
  storage,
};

// Combine reducers
const rootReducers = combineReducers({
  user: userReducer, // Ensure keys match expected state
  admin: adminReducer,
});

// Persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducers);

// Configure store
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
        ignoredPaths: ['register'],
      },
    }),
});

// Export persistor and store
export const persistor = persistStore(store);
export default store;