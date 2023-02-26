import { createStore, applyMiddleware,compose } from "redux";
import createSagaMiddleware from "redux-saga";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import rootReducer, { rootSaga } from "./reducers/rootReducer";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ['reducer'],
};

const sagaMiddleware = createSagaMiddleware();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
let enhancer = process.env.NODE_ENV === 'development' ? composeEnhancers(applyMiddleware(sagaMiddleware)) : applyMiddleware(sagaMiddleware)

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer, enhancer);

export const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);

export default store;
