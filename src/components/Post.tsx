import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { FaThumbsUp, FaComment, FaShare, FaThumbsDown, FaPaperPlane } from 'react-icons/fa';
import { likePostRequest , addCommentRequest} from '../features/posts/postsSlice';
// import { likePost } from '../features/posts/postsSlice';
interface Author {
  pfp: string;
  display_name: string;
  username: string;
}

interface Image {
  url: string;
  caption: string;
}

interface PostProps {
  post: {
    author: Author;
    images: Image[];
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
console.log(post, '40')
const [commentText, setCommentText] = useState('');

const { hash, author, text, images, likes, isLiked, comments, reposts } = post;
const handleLike = () => {
    if (!isLiked) {
        console.log('45')
      dispatch(likePostRequest(hash));
      // Simulate API call if necessary
    }
  };
  const handleAddComment = () => {
    if (commentText.trim()) {
      dispatch(addCommentRequest({ hash, comment: commentText }));
      setCommentText(''); // Clear the input after adding comment
    }
  };
  return (
    <div className="w-6/12 mx-auto my-4 p-4 bg-gray-300 shadow-md rounded-lg">
      <div className="flex items-center mb-4">
        <img className="w-12 h-12 rounded-full object-cover mr-4" src={post.author.pfp} alt={post.author.username} />
        <div>
          <strong className="block text-lg font-semibold">@{post.author.username}</strong>
          
        </div>
      </div>
    <div className="mb-4">
        {post.images.length > 0 && (
          <div className="flex justify-center mx-auto sm:grid-cols-2 lg:grid-cols-3 gap-2">
            {post.images.map((image, index) => (
              <img key={index} className="w-full h-auto object-cover mx-auto rounded-lg" src={image.url} alt={image.caption} />
            ))}
          </div>
        )}
        <p className="mt-4 text-gray-800">{post.text}</p>
      </div>
      <div className='flex items-center justify-around'>
      <span className='text-gray-600'>{likes.count} like</span>
      <span className='text-gray-600'>{comments.count} comments</span>
      <span className='text-gray-600'>{reposts} reposts</span>
      </div>
      <hr className='border b-2 border-gray-400'></hr>
      <div className="post-actions flex items-center justify-around my-2">
        <button onClick={handleLike} disabled={isLiked} className="flex items-center flex-col">
          <FaThumbsUp color={isLiked ? 'blue' : 'gray'} />
          <span>Like</span>
        </button>
        
        <button className="flex items-center flex-col">
         
          <FaComment />
          <span>Comment</span>
        </button>
        <button className="flex items-center flex-col">
          <FaShare />
          <span>Share</span>
        </button>
      </div>
      {/* <div className="add-comment mt-4">
        <input
          type="text"
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          placeholder="Add a comment..."
          className="comment-input"
        />
        <button onClick={handleAddComment} className="comment-button">
          Comment
        </button>
      </div> */}
<div className="add-comment flex items-center  mt-4">
        <input
          type="text"
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          placeholder="Add a comment..."
          className="comment-input flex-grow p-2 rounded-l-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button onClick={handleAddComment} className="comment-button flex items-center p-3 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600">
          <FaPaperPlane />
        </button>
      </div>
    </div>
  );
};

export default Post;
