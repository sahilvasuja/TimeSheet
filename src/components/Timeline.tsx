// import React, { useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { RootState, AppDispatch } from '../store';
// import { fetchPostsRequest } from '../features/posts/postsSlice';
// import Post from './Post';

// const Timeline: React.FC = () => {
//   const dispatch: AppDispatch = useDispatch();
//   const posts = useSelector((state: RootState) => state.posts.posts);
//   const postStatus = useSelector((state: RootState) => state.posts.status);
//   const error = useSelector((state: RootState) => state.posts.error);

//   useEffect(() => {
//     if (postStatus === 'idle') {
//       dispatch(fetchPostsRequest());
//     }
//   }, [postStatus, dispatch]);

//   if (postStatus === 'loading') {
//     return <div>Loading...</div>;
//   }

//   if (postStatus === 'failed') {
//     return <div>Error: {error}</div>;
//   }
// console.log(posts, '26')
//   return (
//     <div className="timeline">
//       {posts.map((post) => (
//         <Post key={post.hash} post={post} />
//       ))}
//     </div>
//   );
// };

// export default Timeline;

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState} from '../store';
 import { fetchPostsRequest } from '../features/posts/postsSlice';
 import Post from './Post';
const Timeline: React.FC = () => {
  const dispatch = useDispatch();
  const { posts, loading } = useSelector((state: RootState) => state.posts);

  useEffect(() => {
    dispatch(fetchPostsRequest());
  }, [dispatch]);
console.log(posts, '50posts')
  return (
    <div className="timeline-container">
      {loading ? (
        <p>Loading posts...</p>
      ) : (
        posts.map((post) => (
          <Post key={post.hash} post={post} />
        ))
      )}
    </div>
  );
};

export default Timeline;
