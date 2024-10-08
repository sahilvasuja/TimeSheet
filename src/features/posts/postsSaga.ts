// import { call, put, takeLatest } from 'redux-saga/effects';
// import axios from 'axios';
// import { fetchPostsRequest } from './postsSlice';

// const API_URL = 'https://api.socialcontinent.xyz/api/v1/post/suggested';

// function* fetchPosts() {
//   try {
//     const response = yield call(axios.get, API_URL);
//     yield put(fetchPostsRequest.fulfilled(response.data, 'fetchPostsRequest', undefined));
//   } catch (error) {
//     yield put(fetchPostsRequest.rejected((error as Error).message, 'fetchPostsRequest', undefined));
//   }
// }

// export function* watchFetchPosts() {
//   yield takeLatest(fetchPostsRequest.pending.type, fetchPosts);
// }


import { call, put, takeLatest } from 'redux-saga/effects';
import { fetchPosts } from '../../services/api';
import axios from 'axios';
import { fetchPostsRequest, fetchPostsSuccess,repostPostRequest, repostPostSuccess, repostPostFailure, likePostRequest, likePostSuccess, likePostFailure, addCommentRequest, addCommentSuccess, addCommentFailure  } from './postsSlice';

function* fetchPostsSaga() {
  try {
    const posts = yield call(fetchPosts);
    yield put(fetchPostsSuccess(posts));
  } catch (error) {
    console.error(error);
  }
}
function* likePostSaga(action: ReturnType<typeof likePostRequest>) {
    try {
      const hash = action.payload;
      const response = yield call(axios.post, `https://api.socialcontinent.xyz/api/v1/post/like`, { hash });
      const { likes, isLiked } = response.data;
  
      yield put(likePostSuccess({ hash, likes, isLiked }));
    } catch (error) {
      yield put(likePostFailure(action.payload));
    }
  }

  function* handleAddComment(action: PayloadAction<{ hash: string; comment: string }>) {
    try {
      const response = yield call(axios.post, `https://api.socialcontinent.xyz/api/v1/post/comment/${action.payload.hash}`, {
        comment: action.payload.comment,
      });
  
      const { comment } = response.data;
  
      yield put(addCommentSuccess({ hash: action.payload.hash, comment }));
    } catch (error) {
      yield put(addCommentFailure(action.payload.hash));
    }
  }
  
  function* repostPostSaga(action: ReturnType<typeof repostPostRequest>) {
    try {
      const hash = action.payload;
      // Send POST request to repost the post
      const response = yield call(axios.post, 'https://api.socialcontinent.xyz/api/v1/post/repost', { hash });
  
      // Extract data from the response
      const { reposts } = response.data;
  
      // Dispatch success action with response data
      yield put(repostPostSuccess({ hash, reposts }));
    } catch (error) {
      // Dispatch failure action with the post hash to revert the optimistic update
      yield put(repostPostFailure(action.payload));
  
      // Optionally handle the error here, e.g., logging or showing an alert
      console.error('Error reposting post:', error);
    }
  }
export function* watchPostSagas() {
  yield takeLatest(fetchPostsRequest.type, fetchPostsSaga, likePostRequest.type, likePostSaga, addCommentRequest.type, handleAddComment, repostPostRequest.type, repostPostSaga);
}
