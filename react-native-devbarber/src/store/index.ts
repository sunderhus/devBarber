import { applyMiddleware, createStore } from 'redux';
import createReduxSagaMiddleware from 'redux-saga';
import { BarberState } from './modules/barber/types';
import rootReducer from './modules/rootReducer';
import rootSaga from './modules/rootSaga';

export interface GlobalState {
  barbers: BarberState
}

const sagaMiddleware = createReduxSagaMiddleware();
const middlewares = [sagaMiddleware];

const store = createStore(
  rootReducer,
  applyMiddleware(...middlewares)
);
sagaMiddleware.run(rootSaga);

export default store;
