import gql from 'graphql-tag';
import * as VueApolloComposable from '@vue/apollo-composable';
import { Ref } from 'vue';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type ReactiveFunction<TParam> = () => TParam;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Article = {
  __typename?: 'Article';
  author: User;
  comments: Array<Comment>;
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  imageUrl?: Maybe<Scalars['String']['output']>;
  likes: Array<Like>;
  likesCount: Scalars['Int']['output'];
  title: Scalars['String']['output'];
};

export type Comment = {
  __typename?: 'Comment';
  article: Article;
  author: User;
  content: Scalars['String']['output'];
  id: Scalars['ID']['output'];
};

export type Like = {
  __typename?: 'Like';
  article: Article;
  id: Scalars['ID']['output'];
  user: User;
};

export type Mutation = {
  __typename?: 'Mutation';
  createArticle?: Maybe<Article>;
  createComment?: Maybe<Comment>;
  deleteAllComments?: Maybe<Scalars['Int']['output']>;
  deleteAllLikes?: Maybe<Scalars['Int']['output']>;
  deleteArticle?: Maybe<Article>;
  likeArticle?: Maybe<Like>;
  login?: Maybe<Scalars['String']['output']>;
  signup?: Maybe<User>;
};


export type MutationCreateArticleArgs = {
  description: Scalars['String']['input'];
  imageUrl?: InputMaybe<Scalars['String']['input']>;
  title: Scalars['String']['input'];
};


export type MutationCreateCommentArgs = {
  articleId: Scalars['ID']['input'];
  content: Scalars['String']['input'];
};


export type MutationDeleteArticleArgs = {
  id: Scalars['ID']['input'];
};


export type MutationLikeArticleArgs = {
  articleId: Scalars['ID']['input'];
};


export type MutationLoginArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationSignupArgs = {
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type Query = {
  __typename?: 'Query';
  article?: Maybe<Article>;
  articles: Array<Article>;
  myArticles: Array<Article>;
  topArticles: Array<Article>;
  users: Array<User>;
};


export type QueryArticleArgs = {
  id: Scalars['ID']['input'];
};

export type User = {
  __typename?: 'User';
  articles: Array<Article>;
  comments: Array<Comment>;
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  likes: Array<Like>;
  name: Scalars['String']['output'];
};

export type SignupMutationVariables = Exact<{
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  name: Scalars['String']['input'];
}>;


export type SignupMutation = { __typename?: 'Mutation', signup?: { __typename?: 'User', id: string, email: string, name: string } | null };

export type LoginMutationVariables = Exact<{
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login?: string | null };

export type CreateArticleMutationVariables = Exact<{
  title: Scalars['String']['input'];
  description: Scalars['String']['input'];
  imageUrl?: InputMaybe<Scalars['String']['input']>;
}>;


export type CreateArticleMutation = { __typename?: 'Mutation', createArticle?: { __typename?: 'Article', id: string, title: string, description: string, imageUrl?: string | null, author: { __typename?: 'User', id: string, name: string } } | null };

export type CreateCommentMutationVariables = Exact<{
  articleId: Scalars['ID']['input'];
  content: Scalars['String']['input'];
}>;


export type CreateCommentMutation = { __typename?: 'Mutation', createComment?: { __typename?: 'Comment', id: string, content: string, author: { __typename?: 'User', id: string, name: string } } | null };

export type LikeArticleMutationVariables = Exact<{
  articleId: Scalars['ID']['input'];
}>;


export type LikeArticleMutation = { __typename?: 'Mutation', likeArticle?: { __typename?: 'Like', id: string, user: { __typename?: 'User', id: string, name: string }, article: { __typename?: 'Article', id: string, title: string } } | null };

export type DeleteArticleMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteArticleMutation = { __typename?: 'Mutation', deleteArticle?: { __typename?: 'Article', id: string } | null };

export type GetUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUsersQuery = { __typename?: 'Query', users: Array<{ __typename?: 'User', id: string, email: string, name: string }> };

export type GetArticlesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetArticlesQuery = { __typename?: 'Query', articles: Array<{ __typename?: 'Article', id: string, title: string, description: string, imageUrl?: string | null, likes: Array<{ __typename?: 'Like', id: string }> }> };

export type GetTopArticlesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetTopArticlesQuery = { __typename?: 'Query', topArticles: Array<{ __typename?: 'Article', id: string, title: string, description: string, imageUrl?: string | null, likesCount: number }> };

export type GetArticleQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetArticleQuery = { __typename?: 'Query', article?: { __typename?: 'Article', id: string, title: string, description: string, imageUrl?: string | null, author: { __typename?: 'User', id: string, name: string }, comments: Array<{ __typename?: 'Comment', id: string, content: string, author: { __typename?: 'User', id: string, name: string } }>, likes: Array<{ __typename?: 'Like', id: string }> } | null };

export type GetMyArticlesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMyArticlesQuery = { __typename?: 'Query', myArticles: Array<{ __typename?: 'Article', id: string, title: string, description: string, imageUrl?: string | null, likes: Array<{ __typename?: 'Like', id: string }> }> };


export const SignupDocument = gql`
    mutation Signup($email: String!, $password: String!, $name: String!) {
  signup(email: $email, password: $password, name: $name) {
    id
    email
    name
  }
}
    `;

/**
 * __useSignupMutation__
 *
 * To run a mutation, you first call `useSignupMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useSignupMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useSignupMutation({
 *   variables: {
 *     email: // value for 'email'
 *     password: // value for 'password'
 *     name: // value for 'name'
 *   },
 * });
 */
export function useSignupMutation(options: VueApolloComposable.UseMutationOptions<SignupMutation, SignupMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<SignupMutation, SignupMutationVariables>> = {}) {
  return VueApolloComposable.useMutation<SignupMutation, SignupMutationVariables>(SignupDocument, options);
}
export type SignupMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<SignupMutation, SignupMutationVariables>;
export const LoginDocument = gql`
    mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password)
}
    `;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useLoginMutation({
 *   variables: {
 *     email: // value for 'email'
 *     password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(options: VueApolloComposable.UseMutationOptions<LoginMutation, LoginMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<LoginMutation, LoginMutationVariables>> = {}) {
  return VueApolloComposable.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
}
export type LoginMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<LoginMutation, LoginMutationVariables>;
export const CreateArticleDocument = gql`
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

/**
 * __useCreateArticleMutation__
 *
 * To run a mutation, you first call `useCreateArticleMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useCreateArticleMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useCreateArticleMutation({
 *   variables: {
 *     title: // value for 'title'
 *     description: // value for 'description'
 *     imageUrl: // value for 'imageUrl'
 *   },
 * });
 */
export function useCreateArticleMutation(options: VueApolloComposable.UseMutationOptions<CreateArticleMutation, CreateArticleMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<CreateArticleMutation, CreateArticleMutationVariables>> = {}) {
  return VueApolloComposable.useMutation<CreateArticleMutation, CreateArticleMutationVariables>(CreateArticleDocument, options);
}
export type CreateArticleMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<CreateArticleMutation, CreateArticleMutationVariables>;
export const CreateCommentDocument = gql`
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

/**
 * __useCreateCommentMutation__
 *
 * To run a mutation, you first call `useCreateCommentMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useCreateCommentMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useCreateCommentMutation({
 *   variables: {
 *     articleId: // value for 'articleId'
 *     content: // value for 'content'
 *   },
 * });
 */
export function useCreateCommentMutation(options: VueApolloComposable.UseMutationOptions<CreateCommentMutation, CreateCommentMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<CreateCommentMutation, CreateCommentMutationVariables>> = {}) {
  return VueApolloComposable.useMutation<CreateCommentMutation, CreateCommentMutationVariables>(CreateCommentDocument, options);
}
export type CreateCommentMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<CreateCommentMutation, CreateCommentMutationVariables>;
export const LikeArticleDocument = gql`
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

/**
 * __useLikeArticleMutation__
 *
 * To run a mutation, you first call `useLikeArticleMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useLikeArticleMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useLikeArticleMutation({
 *   variables: {
 *     articleId: // value for 'articleId'
 *   },
 * });
 */
export function useLikeArticleMutation(options: VueApolloComposable.UseMutationOptions<LikeArticleMutation, LikeArticleMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<LikeArticleMutation, LikeArticleMutationVariables>> = {}) {
  return VueApolloComposable.useMutation<LikeArticleMutation, LikeArticleMutationVariables>(LikeArticleDocument, options);
}
export type LikeArticleMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<LikeArticleMutation, LikeArticleMutationVariables>;
export const DeleteArticleDocument = gql`
    mutation DeleteArticle($id: ID!) {
  deleteArticle(id: $id) {
    id
  }
}
    `;

/**
 * __useDeleteArticleMutation__
 *
 * To run a mutation, you first call `useDeleteArticleMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useDeleteArticleMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useDeleteArticleMutation({
 *   variables: {
 *     id: // value for 'id'
 *   },
 * });
 */
export function useDeleteArticleMutation(options: VueApolloComposable.UseMutationOptions<DeleteArticleMutation, DeleteArticleMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<DeleteArticleMutation, DeleteArticleMutationVariables>> = {}) {
  return VueApolloComposable.useMutation<DeleteArticleMutation, DeleteArticleMutationVariables>(DeleteArticleDocument, options);
}
export type DeleteArticleMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<DeleteArticleMutation, DeleteArticleMutationVariables>;
export const GetUsersDocument = gql`
    query GetUsers {
  users {
    id
    email
    name
  }
}
    `;

/**
 * __useGetUsersQuery__
 *
 * To run a query within a Vue component, call `useGetUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUsersQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useGetUsersQuery();
 */
export function useGetUsersQuery(options: VueApolloComposable.UseQueryOptions<GetUsersQuery, GetUsersQueryVariables> | Ref<VueApolloComposable.UseQueryOptions<GetUsersQuery, GetUsersQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<GetUsersQuery, GetUsersQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<GetUsersQuery, GetUsersQueryVariables>(GetUsersDocument, {}, options);
}
export function useGetUsersLazyQuery(options: VueApolloComposable.UseQueryOptions<GetUsersQuery, GetUsersQueryVariables> | Ref<VueApolloComposable.UseQueryOptions<GetUsersQuery, GetUsersQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<GetUsersQuery, GetUsersQueryVariables>> = {}) {
  return VueApolloComposable.useLazyQuery<GetUsersQuery, GetUsersQueryVariables>(GetUsersDocument, {}, options);
}
export type GetUsersQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<GetUsersQuery, GetUsersQueryVariables>;
export const GetArticlesDocument = gql`
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

/**
 * __useGetArticlesQuery__
 *
 * To run a query within a Vue component, call `useGetArticlesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetArticlesQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useGetArticlesQuery();
 */
export function useGetArticlesQuery(options: VueApolloComposable.UseQueryOptions<GetArticlesQuery, GetArticlesQueryVariables> | Ref<VueApolloComposable.UseQueryOptions<GetArticlesQuery, GetArticlesQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<GetArticlesQuery, GetArticlesQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<GetArticlesQuery, GetArticlesQueryVariables>(GetArticlesDocument, {}, options);
}
export function useGetArticlesLazyQuery(options: VueApolloComposable.UseQueryOptions<GetArticlesQuery, GetArticlesQueryVariables> | Ref<VueApolloComposable.UseQueryOptions<GetArticlesQuery, GetArticlesQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<GetArticlesQuery, GetArticlesQueryVariables>> = {}) {
  return VueApolloComposable.useLazyQuery<GetArticlesQuery, GetArticlesQueryVariables>(GetArticlesDocument, {}, options);
}
export type GetArticlesQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<GetArticlesQuery, GetArticlesQueryVariables>;
export const GetTopArticlesDocument = gql`
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

/**
 * __useGetTopArticlesQuery__
 *
 * To run a query within a Vue component, call `useGetTopArticlesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTopArticlesQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useGetTopArticlesQuery();
 */
export function useGetTopArticlesQuery(options: VueApolloComposable.UseQueryOptions<GetTopArticlesQuery, GetTopArticlesQueryVariables> | Ref<VueApolloComposable.UseQueryOptions<GetTopArticlesQuery, GetTopArticlesQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<GetTopArticlesQuery, GetTopArticlesQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<GetTopArticlesQuery, GetTopArticlesQueryVariables>(GetTopArticlesDocument, {}, options);
}
export function useGetTopArticlesLazyQuery(options: VueApolloComposable.UseQueryOptions<GetTopArticlesQuery, GetTopArticlesQueryVariables> | Ref<VueApolloComposable.UseQueryOptions<GetTopArticlesQuery, GetTopArticlesQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<GetTopArticlesQuery, GetTopArticlesQueryVariables>> = {}) {
  return VueApolloComposable.useLazyQuery<GetTopArticlesQuery, GetTopArticlesQueryVariables>(GetTopArticlesDocument, {}, options);
}
export type GetTopArticlesQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<GetTopArticlesQuery, GetTopArticlesQueryVariables>;
export const GetArticleDocument = gql`
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

/**
 * __useGetArticleQuery__
 *
 * To run a query within a Vue component, call `useGetArticleQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetArticleQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param variables that will be passed into the query
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useGetArticleQuery({
 *   id: // value for 'id'
 * });
 */
export function useGetArticleQuery(variables: GetArticleQueryVariables | Ref<GetArticleQueryVariables> | ReactiveFunction<GetArticleQueryVariables>, options: VueApolloComposable.UseQueryOptions<GetArticleQuery, GetArticleQueryVariables> | Ref<VueApolloComposable.UseQueryOptions<GetArticleQuery, GetArticleQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<GetArticleQuery, GetArticleQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<GetArticleQuery, GetArticleQueryVariables>(GetArticleDocument, variables, options);
}
export function useGetArticleLazyQuery(variables?: GetArticleQueryVariables | Ref<GetArticleQueryVariables> | ReactiveFunction<GetArticleQueryVariables>, options: VueApolloComposable.UseQueryOptions<GetArticleQuery, GetArticleQueryVariables> | Ref<VueApolloComposable.UseQueryOptions<GetArticleQuery, GetArticleQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<GetArticleQuery, GetArticleQueryVariables>> = {}) {
  return VueApolloComposable.useLazyQuery<GetArticleQuery, GetArticleQueryVariables>(GetArticleDocument, variables, options);
}
export type GetArticleQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<GetArticleQuery, GetArticleQueryVariables>;
export const GetMyArticlesDocument = gql`
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

/**
 * __useGetMyArticlesQuery__
 *
 * To run a query within a Vue component, call `useGetMyArticlesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMyArticlesQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useGetMyArticlesQuery();
 */
export function useGetMyArticlesQuery(options: VueApolloComposable.UseQueryOptions<GetMyArticlesQuery, GetMyArticlesQueryVariables> | Ref<VueApolloComposable.UseQueryOptions<GetMyArticlesQuery, GetMyArticlesQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<GetMyArticlesQuery, GetMyArticlesQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<GetMyArticlesQuery, GetMyArticlesQueryVariables>(GetMyArticlesDocument, {}, options);
}
export function useGetMyArticlesLazyQuery(options: VueApolloComposable.UseQueryOptions<GetMyArticlesQuery, GetMyArticlesQueryVariables> | Ref<VueApolloComposable.UseQueryOptions<GetMyArticlesQuery, GetMyArticlesQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<GetMyArticlesQuery, GetMyArticlesQueryVariables>> = {}) {
  return VueApolloComposable.useLazyQuery<GetMyArticlesQuery, GetMyArticlesQueryVariables>(GetMyArticlesDocument, {}, options);
}
export type GetMyArticlesQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<GetMyArticlesQuery, GetMyArticlesQueryVariables>;