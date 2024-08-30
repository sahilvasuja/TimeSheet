import { all } from 'redux-saga/effects';
import { watchPostSagas } from './posts/postsSaga';

export default function* rootSaga() {
  yield all([watchPostSagas()]);
}
