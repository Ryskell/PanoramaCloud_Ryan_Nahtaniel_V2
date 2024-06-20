export interface Article {
  id: number;
  title: string;
  description: string;
  author: User;
  comments: Comment[];
  likes: Like[];
}


export interface User {
  id: number;
  email: string;
  name: string;
  articles: Article[];
  comments: Comment[];
  likes: Like[];
}

export interface Comment {
  id: number;
  content: string;
  authorId: number;
  articleId: number;
  author: User;
  article: Article;
}

export interface Like {
  id: number;
  userId: number;
  articleId: number;
  user: User;
  article: Article;
}
