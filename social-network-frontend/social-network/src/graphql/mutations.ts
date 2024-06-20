import { gql } from '@apollo/client';

export const SIGNUP = gql`
  mutation Signup($email: String!, $password: String!, $name: String!) {
    signup(email: $email, password: $password, name: $name) {
      id
      email
      name
    }
  }
`;

export const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password)
  }
`;

export const CREATE_ARTICLE = gql`
  mutation CreateArticle($title: String!, $description: String!, $imageUrl: String) {
    createArticle(title: $title, description: $description, imageUrl: $imageUrl) {
      id
      title
      description
      imageUrl
      author {
        id
        name
      }
    }
  }
`;

export const CREATE_COMMENT = gql`
  mutation CreateComment($articleId: ID!, $content: String!) {
    createComment(articleId: $articleId, content: $content) {
      id
      content
      author {
        id
        name
      }
    }
  }
`;

export const LIKE_ARTICLE = gql`
  mutation LikeArticle($articleId: ID!) {
    likeArticle(articleId: $articleId) {
      id
      user {
        id
        name
      }
      article {
        id
        title
      }
    }
  }
`;

export const DELETE_ARTICLE = gql`
  mutation DeleteArticle($id: ID!) {
    deleteArticle(id: $id) {
      id
    }
  }
`;
