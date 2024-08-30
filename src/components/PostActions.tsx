// PostActions.tsx
import React from 'react';
import { FaThumbsUp, FaComment, FaShare } from 'react-icons/fa';

interface PostActionsProps {
  isLiked: boolean;
  handleLike: () => void;
}

const PostActions: React.FC<PostActionsProps> = ({ isLiked, handleLike }) => (
  <div className="post-actions flex items-center justify-between my-2 mx-4">
    <button onClick={handleLike}  className="flex items-center flex-col">
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
);

export default PostActions;
