import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: any }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type Product = {
  __typename?: 'Product';
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  price?: Maybe<Scalars['String']>;
  imgUrl?: Maybe<Scalars['String']>;
  comments?: Maybe<Array<Maybe<Comment>>>;
};

export type Comment = {
  __typename?: 'Comment';
  id?: Maybe<Scalars['ID']>;
  productId?: Maybe<Scalars['ID']>;
  content?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['String']>;
  score?: Maybe<Scalars['Float']>;
};

export type Query = {
  __typename?: 'Query';
  products?: Maybe<Array<Maybe<Product>>>;
  getProduct?: Maybe<Product>;
};


export type QueryGetProductArgs = {
  id: Scalars['ID'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addProduct?: Maybe<Product>;
  deleteProduct?: Maybe<Scalars['String']>;
  addComment?: Maybe<Comment>;
};


export type MutationAddProductArgs = {
  name?: Maybe<Scalars['String']>;
  price?: Maybe<Scalars['String']>;
  imgUrl?: Maybe<Scalars['String']>;
};


export type MutationDeleteProductArgs = {
  id?: Maybe<Scalars['ID']>;
};


export type MutationAddCommentArgs = {
  content: Scalars['String'];
  score?: Maybe<Scalars['Float']>;
  productId: Scalars['ID'];
};

export enum CacheControlScope {
  Public = 'PUBLIC',
  Private = 'PRIVATE'
}


export type ProductsQueryVariables = Exact<{ [key: string]: never; }>;


export type ProductsQuery = (
  { __typename?: 'Query' }
  & { products?: Maybe<Array<Maybe<(
    { __typename?: 'Product' }
    & Pick<Product, 'id' | 'name' | 'price' | 'imgUrl'>
  )>>> }
);

export type AddProductMutationVariables = Exact<{
  name?: Maybe<Scalars['String']>;
  price?: Maybe<Scalars['String']>;
  imgUrl?: Maybe<Scalars['String']>;
}>;


export type AddProductMutation = (
  { __typename?: 'Mutation' }
  & { addProduct?: Maybe<(
    { __typename?: 'Product' }
    & Pick<Product, 'id' | 'name' | 'price' | 'imgUrl'>
  )> }
);

export type DeleteProductMutationVariables = Exact<{
  id?: Maybe<Scalars['ID']>;
}>;


export type DeleteProductMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteProduct'>
);

export type GetProductQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GetProductQuery = (
  { __typename?: 'Query' }
  & { getProduct?: Maybe<(
    { __typename?: 'Product' }
    & Pick<Product, 'name' | 'price' | 'imgUrl'>
    & { comments?: Maybe<Array<Maybe<(
      { __typename?: 'Comment' }
      & Pick<Comment, 'id' | 'content' | 'score' | 'createdAt'>
    )>>> }
  )> }
);

export type AddCommentMutationVariables = Exact<{
  content: Scalars['String'];
  score?: Maybe<Scalars['Float']>;
  productId: Scalars['ID'];
}>;


export type AddCommentMutation = (
  { __typename?: 'Mutation' }
  & { addComment?: Maybe<(
    { __typename?: 'Comment' }
    & Pick<Comment, 'id'>
  )> }
);


export const ProductsDocument = gql`
    query Products {
  products {
    id
    name
    price
    imgUrl
  }
}
    `;

/**
 * __useProductsQuery__
 *
 * To run a query within a React component, call `useProductsQuery` and pass it any options that fit your needs.
 * When your component renders, `useProductsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProductsQuery({
 *   variables: {
 *   },
 * });
 */
export function useProductsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<ProductsQuery, ProductsQueryVariables>) {
        return ApolloReactHooks.useQuery<ProductsQuery, ProductsQueryVariables>(ProductsDocument, baseOptions);
      }
export function useProductsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<ProductsQuery, ProductsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<ProductsQuery, ProductsQueryVariables>(ProductsDocument, baseOptions);
        }
export type ProductsQueryHookResult = ReturnType<typeof useProductsQuery>;
export type ProductsLazyQueryHookResult = ReturnType<typeof useProductsLazyQuery>;
export type ProductsQueryResult = ApolloReactCommon.QueryResult<ProductsQuery, ProductsQueryVariables>;
export const AddProductDocument = gql`
    mutation AddProduct($name: String, $price: String, $imgUrl: String) {
  addProduct(name: $name, price: $price, imgUrl: $imgUrl) {
    id
    name
    price
    imgUrl
  }
}
    `;
export type AddProductMutationFn = ApolloReactCommon.MutationFunction<AddProductMutation, AddProductMutationVariables>;

/**
 * __useAddProductMutation__
 *
 * To run a mutation, you first call `useAddProductMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddProductMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addProductMutation, { data, loading, error }] = useAddProductMutation({
 *   variables: {
 *      name: // value for 'name'
 *      price: // value for 'price'
 *      imgUrl: // value for 'imgUrl'
 *   },
 * });
 */
export function useAddProductMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<AddProductMutation, AddProductMutationVariables>) {
        return ApolloReactHooks.useMutation<AddProductMutation, AddProductMutationVariables>(AddProductDocument, baseOptions);
      }
export type AddProductMutationHookResult = ReturnType<typeof useAddProductMutation>;
export type AddProductMutationResult = ApolloReactCommon.MutationResult<AddProductMutation>;
export type AddProductMutationOptions = ApolloReactCommon.BaseMutationOptions<AddProductMutation, AddProductMutationVariables>;
export const DeleteProductDocument = gql`
    mutation DeleteProduct($id: ID) {
  deleteProduct(id: $id)
}
    `;
export type DeleteProductMutationFn = ApolloReactCommon.MutationFunction<DeleteProductMutation, DeleteProductMutationVariables>;

/**
 * __useDeleteProductMutation__
 *
 * To run a mutation, you first call `useDeleteProductMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteProductMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteProductMutation, { data, loading, error }] = useDeleteProductMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteProductMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeleteProductMutation, DeleteProductMutationVariables>) {
        return ApolloReactHooks.useMutation<DeleteProductMutation, DeleteProductMutationVariables>(DeleteProductDocument, baseOptions);
      }
export type DeleteProductMutationHookResult = ReturnType<typeof useDeleteProductMutation>;
export type DeleteProductMutationResult = ApolloReactCommon.MutationResult<DeleteProductMutation>;
export type DeleteProductMutationOptions = ApolloReactCommon.BaseMutationOptions<DeleteProductMutation, DeleteProductMutationVariables>;
export const GetProductDocument = gql`
    query GetProduct($id: ID!) {
  getProduct(id: $id) {
    name
    price
    imgUrl
    comments {
      id
      content
      score
      createdAt
    }
  }
}
    `;

/**
 * __useGetProductQuery__
 *
 * To run a query within a React component, call `useGetProductQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProductQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProductQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetProductQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetProductQuery, GetProductQueryVariables>) {
        return ApolloReactHooks.useQuery<GetProductQuery, GetProductQueryVariables>(GetProductDocument, baseOptions);
      }
export function useGetProductLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetProductQuery, GetProductQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetProductQuery, GetProductQueryVariables>(GetProductDocument, baseOptions);
        }
export type GetProductQueryHookResult = ReturnType<typeof useGetProductQuery>;
export type GetProductLazyQueryHookResult = ReturnType<typeof useGetProductLazyQuery>;
export type GetProductQueryResult = ApolloReactCommon.QueryResult<GetProductQuery, GetProductQueryVariables>;
export const AddCommentDocument = gql`
    mutation addComment($content: String!, $score: Float, $productId: ID!) {
  addComment(content: $content, score: $score, productId: $productId) {
    id
  }
}
    `;
export type AddCommentMutationFn = ApolloReactCommon.MutationFunction<AddCommentMutation, AddCommentMutationVariables>;

/**
 * __useAddCommentMutation__
 *
 * To run a mutation, you first call `useAddCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addCommentMutation, { data, loading, error }] = useAddCommentMutation({
 *   variables: {
 *      content: // value for 'content'
 *      score: // value for 'score'
 *      productId: // value for 'productId'
 *   },
 * });
 */
export function useAddCommentMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<AddCommentMutation, AddCommentMutationVariables>) {
        return ApolloReactHooks.useMutation<AddCommentMutation, AddCommentMutationVariables>(AddCommentDocument, baseOptions);
      }
export type AddCommentMutationHookResult = ReturnType<typeof useAddCommentMutation>;
export type AddCommentMutationResult = ApolloReactCommon.MutationResult<AddCommentMutation>;
export type AddCommentMutationOptions = ApolloReactCommon.BaseMutationOptions<AddCommentMutation, AddCommentMutationVariables>;