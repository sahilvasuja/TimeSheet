import React from 'react';

interface Author {
  pfp: string;
  username: string;
}

interface PostHeaderProps {
  author: Author;
  timestamp: number;
}

const PostHeader: React.FC<PostHeaderProps> = ({ author }) => (
  <div className="flex items-center mb-4">
    <img className="w-12 h-12 rounded-full object-cover mr-4" src={author.pfp} alt={author.username} />
    <div>
      <strong className="block text-lg font-semibold">@{author.username}</strong>
    </div>
  </div>
);

export default PostHeader;
