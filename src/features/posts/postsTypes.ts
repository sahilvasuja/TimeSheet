export interface Post {
    id: string;
    author: string;
    
    image?: string;
    
    comments: any;
    reposts: number;
    hash: string;
  text: string;
  likes: any;
  isLiked: boolean;
  }
  
  export interface PostsState {
    posts: Post[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
  }
  