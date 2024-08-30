import createSagaMiddleware from "@redux-saga/core";
import { configureStore } from "@reduxjs/toolkit";
import postsReducer from '../features/posts/postsSlice';
import rootSaga from '../features/rootSaga';
const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    posts: postsReducer,
  },
  // middleware: [sagaMiddleware],
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),

});
sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;



