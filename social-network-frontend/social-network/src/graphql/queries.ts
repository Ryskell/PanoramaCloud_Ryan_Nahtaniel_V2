import { gql } from '@apollo/client';

export const GET_USERS = gql`
  query GetUsers {
    users {
      id
      email
      name
    }
  }
`;

export const GET_ARTICLES = gql`
  query GetArticles {
    articles {
      id
      title
      description
      imageUrl
      likes {
        id
      }
    }
  }
`;

export const GET_TOP_ARTICLES = gql`
  query GetTopArticles {
    topArticles {
      id
      title
      description
      imageUrl
      likesCount
    }
  }
`;

export const GET_ARTICLE = gql`
  query GetArticle($id: ID!) {
    article(id: $id) {
      id
      title
      description
      imageUrl
      author {
        id
        name
      }
      comments {
        id
        content
        author {
          id
          name
        }
      }
      likes {
        id
      }
    }
  }
`;

export const GET_MY_ARTICLES = gql`
  query GetMyArticles {
    myArticles {
      id
      title
      description
      imageUrl
      likes {
        id
      }
    }
  }
`;
