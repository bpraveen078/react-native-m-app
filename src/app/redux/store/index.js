import { createStore, applyMiddleware, combineReducers } from "redux";

import createSagaMiddleware from "redux-saga";
import sagas from "../sagas";
import rootReducer from "../reducers";

// export default () => {
//   const sagaMiddleware = createSagaMiddleware();
//   const middlewares = applyMiddleware(sagaMiddleware);
//   const store = createStore(rootReducer, applyMiddleware(middlewares));
//   sagas.forEach(sagaMiddleware.run);

//   return store;
// };
const sagaMiddleWare = createSagaMiddleware();

const store = createStore(rootReducer, applyMiddleware(sagaMiddleWare));
// sagaMiddleWare.run(rootSaga);
sagas.forEach(sagaMiddleWare.run);
export default store;
