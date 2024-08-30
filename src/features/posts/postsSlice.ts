// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';


// interface Author {
//   soconId: number;
//   pfp: string;
//   display_name: string;
//   username: string;
//   rewardPoints: number;
// }

// interface Image {
//   url: string;
//   caption: string;
//   type: number;
// }

// interface Like {
//   count: number;
//   author: Author;
// }

// interface Comment {
//   hash: string;
//   text: string;
//   timestamp: number;
//   type: number;
//   images: string[];
//   author: Author;
// }

// interface Post {
//   hash: string;
//   timestamp: number;
//   text: string;
//   isPrivate: boolean;
//   type: number;
//   hashtags: string[];
//   author: Author;
//   isLiked: boolean;
//   isSaved: boolean;
//   isARepost: boolean;
//   images: Image[];
//   shares: number;
//   reposts: number;
//   likes: Like;
//   comments: {
//     count: number;
//     comment: Comment;
//   };
// }

// interface PostsState {
//   posts: Post[];
//   status: 'idle' | 'loading' | 'succeeded' | 'failed';
//   error: string | null;
// }

// const initialState: PostsState = {
//   posts: [],
//   status: 'idle',
//   error: null,
// };

// export const fetchPostsRequest = createAsyncThunk('posts/fetchPosts', async () => {
//   const response = await axios.get('https://api.socialcontinent.xyz/api/v1/post/suggested');
//   return response.data; // Adjust this if the structure is different
// });
// export const fetchPostsFailure = (error: any) => ({
//     type: 'FETCH_POSTS_FAILURE',
//     payload: error,
//   });
// const postsSlice = createSlice({
//   name: 'posts',
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchPostsRequest.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(fetchPostsRequest.fulfilled, (state, action) => {
//         state.status = 'succeeded';
//         state.posts = action.payload;
//       })
//       .addCase(fetchPostsRequest.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.error.message || 'Failed to fetch posts';
//       });
//   },
// });

// export default postsSlice.reducer;


import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from './postsTypes';

interface PostsState {
  posts: Post[];
  loading: boolean;
}

const initialState: PostsState = {
  posts: [],
  loading: false,
};

const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    fetchPostsRequest(state) {
      state.loading = true;
    },
    fetchPostsSuccess(state, action: PayloadAction<Post[]>) {
      state.loading = false;
      state.posts = action.payload;
    },
    // likePost(state, action: PayloadAction<string>) {
    //     const post = state.posts.find((post) => post.hash === action.payload);
    //     if (post && !post.isLiked) {
    //       post.likes.count += 1;
    //       post.isLiked = true;
    //     }
    //   },
    // likePost(state, action: PayloadAction<string>) {
    //   const post = state.posts.find((post) => post.id === action.payload);
    //   if (post) post.likes += 1;
    // },
    // Add reducers for comments, reposts...
    likePostRequest(state, action: PayloadAction<string>) {
        const post = state.posts.find((post) => post.hash === action.payload);
        if (post) {
          post.isLiked = !post.isLiked; 
          post.likes.count = post.isLiked ? post.likes.count + 1 : post.likes.count - 1; 
        }
        state.error = null;
      },
      likePostSuccess(state, action: PayloadAction<{ hash: string; likes: number; isLiked: boolean }>) {
        const post = state.posts.find((post) => post.hash === action.payload.hash);
        if (post) {
          post.likes.count = action.payload.likes;
          post.isLiked = action.payload.isLiked;
        }
      },
      likePostFailure(state, action: PayloadAction<string>) {
        const post = state.posts.find((post) => post.hash === action.payload);
        if (post) {
          post.isLiked = !post.isLiked;
          post.likes.count = post.isLiked ? post.likes.count + 1 : post.likes.count - 1; 
        }
        state.error = 'Failed to update like status';
      },
      addCommentRequest(state, action: PayloadAction<{ hash: string; comment: string }>) {
        const post = state.posts.find((post) => post.hash === action.payload.hash);
        if (post) {
          post.comments.count += 1; // Optimistically update comment count
          post.comments.comment = action.payload.comment; // Optionally, store the comment text
        }
      },
      addCommentSuccess(state, action: PayloadAction<{ hash: string; comment: string }>) {
        const post = state.posts.find((post) => post.hash === action.payload.hash);
        if (post) {
          post.comments.count += 1;
          post.comments.comment = action.payload.comment;
        }
      },
      addCommentFailure(state, action: PayloadAction<string>) {
        state.error = 'Failed to add comment';
      },
      repostPostRequest(state, action: PayloadAction<string>) {
        const post = state.posts.find((post) => post.hash === action.payload);
        if (post) {
          post.reposts += 1; // Optimistically increment the repost count
        }
        state.error = null;
      },
      repostPostSuccess(state, action: PayloadAction<{ hash: string; reposts: number }>) {
        const post = state.posts.find((post) => post.hash === action.payload.hash);
        if (post) {
          post.reposts = action.payload.reposts;
        }
      },
      repostPostFailure(state, action: PayloadAction<string>) {
        const post = state.posts.find((post) => post.hash === action.payload);
        if (post) {
          post.reposts -= 1; // Revert the repost count
        }
        state.error = 'Failed to update repost status';
      },
  },
});

export const { fetchPostsRequest, fetchPostsSuccess, likePostRequest, likePostSuccess, likePostFailure, addCommentRequest, addCommentSuccess, addCommentFailure,  repostPostRequest, repostPostSuccess, repostPostFailure   } = postSlice.actions;
export default postSlice.reducer;
