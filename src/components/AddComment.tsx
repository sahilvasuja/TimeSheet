// AddComment.tsx
import React, { useState } from 'react';
import { FaPaperPlane } from 'react-icons/fa';

interface AddCommentProps {
  handleAddComment: (commentText: string) => void;
}

const AddComment: React.FC<AddCommentProps> = ({ handleAddComment }) => {
  const [commentText, setCommentText] = useState('');
  const handleSubmit = () => {
    if (commentText.trim()) {
      handleAddComment(commentText);
      setCommentText('');
    }
  };
  return (
    <div className="add-comment flex items-center mt-4">
      <input
        type="text"
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
        placeholder="Add a comment..."
        className="comment-input flex-grow p-2 rounded-l-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button onClick={handleSubmit} className="comment-button flex items-center p-3 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600">
        <FaPaperPlane />
      </button>
    </div>
  );
};

export default AddComment;
