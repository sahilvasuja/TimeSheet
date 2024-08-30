import axios from 'axios';

export const fetchPosts = async () => {
  const response = await axios.get('https://api.socialcontinent.xyz/api/v1/post/suggested');
  return response.data;
};
