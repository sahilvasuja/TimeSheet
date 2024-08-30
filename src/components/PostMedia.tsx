import React from 'react';

interface Media {
  url: string;
  caption: string;
  type: 0 | 1;
}

interface PostMediaProps {
  media: Media[];
}

const PostMedia: React.FC<PostMediaProps> = ({ media }) => (
  <div className="flex justify-center mx-auto sm:grid-cols-2 lg:grid-cols-3 gap-2">
    {media.map((media, index) =>
      media.type === 0 ? (
        <img key={index} className="w-full h-auto object-cover mx-auto rounded-lg" src={media.url} alt={media.caption} />
      ) : (
        <video key={index} className="w-full h-auto object-cover mx-auto rounded-lg" controls>
          <source src={media.url} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )
    )}
  </div>
);

export default PostMedia;
