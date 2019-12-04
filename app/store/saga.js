import { all } from 'redux-saga/effects';
import authSagas from '../saga/auth-saga';
import unionSagas from '../saga/union-saga';
import shoppingSagas from '../saga/shopping-saga';
import orderSagas from '../saga/order-saga';

const sagas = [
  ...authSagas,
  ...unionSagas,
  ...shoppingSagas,
  ...orderSagas,
];

export function* rootSaga() {
  yield all([...sagas]);
}
