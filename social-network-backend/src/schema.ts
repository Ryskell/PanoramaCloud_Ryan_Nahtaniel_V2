import { gql } from 'graphql-tag';

const typeDefs = gql`
type User {
  id: ID!
  email: String!
  name: String!
  articles: [Article!]!
  comments: [Comment!]!
  likes: [Like!]!
}

type Article {
  id: ID!
  title: String!
  description: String!
  imageUrl: String
  author: User!
  comments: [Comment!]!
  likes: [Like!]!
  likesCount: Int!
}

type Comment {
  id: ID!
  content: String!
  author: User!
  article: Article!
}

type Like {
  id: ID!
  user: User!
  article: Article!
}

type Query {
  users: [User!]!
  articles: [Article!]!
  topArticles: [Article!]!
  article(id: ID!): Article 
  myArticles: [Article!]!
}

type Mutation {
  signup(email: String!, password: String!, name: String!): User
  login(email: String!, password: String!): String
  createArticle(title: String!, description: String!, imageUrl: String): Article
  createComment(articleId: ID!, content: String!): Comment
  likeArticle(articleId: ID!): Like
  deleteAllLikes: Int
  deleteAllComments: Int
  deleteArticle(id: ID!): Article
}
`;

export default typeDefs;
