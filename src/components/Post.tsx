import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { FaThumbsUp, FaComment, FaShare, FaThumbsDown, FaPaperPlane, FaShareAlt } from 'react-icons/fa';
import { likePostRequest , addCommentRequest, repostPostRequest} from '../features/posts/postsSlice';
import PostHeader from './PostHeader';
import PostMedia from './PostMedia';
import PostActions from './PostActions';
import AddComment from './AddComment';
import { daysAgo } from '../../src/utils/dateUtils';
interface Author {
  pfp: string;
  display_name: string;
  username: string;
}

interface Media {
    url: string;
    caption: string;
    type: 0 | 1; 
  }

interface PostProps {
  post: {
    author: Author;
    images: Media[];
    hash: any,
    likes: {
      count: number;
      author: Author;
    };
    comments: {
      count: number;
      comment: {
        text: string;
        author: Author;
      };
    };
    text: string;
    timestamp: number;
    shares: number;
    reposts: number;
  };
}

const Post: React.FC<PostProps> = ({ post }) => {
    const dispatch = useDispatch();
console.log(post.reposts    , '40')
const [commentText, setCommentText] = useState('');

const { hash, author, text, images, likes, isLiked,timestamp, comments, reposts, isARepost } = post;
console.log(reposts, 'reposts')
// const handleLike = () => {
//     if (!isLiked) {
//         console.log('45')
//       dispatch(likePostRequest(hash));
//       // Simulate API call if necessary
//     }
//   };
  const handleLike = () => {
    if (post.isLiked) {
        console.log("61")
      dispatch(likePostRequest(post.hash, 'unlike')); 
    } else {
     console.log("64")
      dispatch(likePostRequest(post.hash, 'like')); 
    }
  };
  const handleAddComment = (commentText: string) => {
    if (commentText.trim()) {
      dispatch(addCommentRequest({ hash: post.hash, comment: commentText }));
      
    }
  };
  const handleRepost = () => {
    dispatch(repostPostRequest(hash));
  };
  return (
    <>
    {
        reposts<=0 ?  
        <div className="w-6/12 mx-auto my-4 p-4 bg-gray-300  shadow-md rounded-lg">
            <div className='flex justify-between'>
            <PostHeader author={post.author} timestamp={post.timestamp} />
            <button onClick={handleRepost} className="flex items-center flex-col">
                  <FaShareAlt />
                  <span>Repost</span>
                </button>
            </div>
             
             <PostMedia media={post.images} />
        <div>
           
    </div>
   
      <div className='flex items-center my-2 justify-around'>
      <span className='text-gray-600'>{likes.count} like</span>
      <span className='text-gray-600'>{comments.count} comments</span>
      <span className='text-gray-600'>{reposts} reposts</span>
      </div>
      <hr className='border b-2 border-gray-400'></hr>
     
      <PostActions isLiked={post?.isLiked} handleLike={handleLike} />
      <AddComment handleAddComment={handleAddComment} />
      
    </div> : 
      
            <div className="repost-info mt-4 w-6/12 p-4 bg-gray-100  mx-auto  rounded-lg border border-gray-200">
                 <h5 className="text-md font-semibold mb-2">Reposted from: SomeOne</h5>
 
            <div className="w-11/12 mx-auto my-4 p-4 bg-gray-300  shadow-md rounded-lg">
             <PostHeader author={post.author} timestamp={post.timestamp} />
             <PostMedia media={post.images} />
            <div>    
            </div>
   
    
      
    </div>

   
    <div className='flex items-center my-2 justify-around'>
      <span className='text-gray-600'>{likes.count} like</span>
      <span className='text-gray-600'>{comments.count} comments</span>
      <span className='text-gray-600'>{reposts} reposts</span>
      </div>
      <hr className='border b-2 border-gray-400'></hr>
     
      <PostActions isLiked={post?.isLiked} handleLike={handleLike} />
      <AddComment handleAddComment={handleAddComment} />
    </div>
            
            
          
    
    }
   
    </>
  );
};

export default Post;
