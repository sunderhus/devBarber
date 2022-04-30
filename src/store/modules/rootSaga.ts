import { all } from 'redux-saga/effects';
import barberSaga from './barber/sagas';

export default function* rootSaga(): Generator {
  return yield all([barberSaga]);
}
