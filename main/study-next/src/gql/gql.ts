/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "query FetchBoardsWithSearch($page: Int, $search: String) {\n  fetchBoards(page: $page, search: $search) {\n    _id\n    writer\n    title\n    createdAt\n  }\n}\n\nquery FetchBoardsCount($search: String) {\n  fetchBoardsCount(search: $search)\n}": typeof types.FetchBoardsWithSearchDocument,
    "query FetchTravelproducts($page: Int, $search: String, $isSoldout: Boolean) {\n  fetchTravelproducts(page: $page, search: $search, isSoldout: $isSoldout) {\n    _id\n    name\n    remarks\n    price\n    tags\n    images\n    seller {\n      name\n    }\n  }\n}": typeof types.FetchTravelproductsDocument,
};
const documents: Documents = {
    "query FetchBoardsWithSearch($page: Int, $search: String) {\n  fetchBoards(page: $page, search: $search) {\n    _id\n    writer\n    title\n    createdAt\n  }\n}\n\nquery FetchBoardsCount($search: String) {\n  fetchBoardsCount(search: $search)\n}": types.FetchBoardsWithSearchDocument,
    "query FetchTravelproducts($page: Int, $search: String, $isSoldout: Boolean) {\n  fetchTravelproducts(page: $page, search: $search, isSoldout: $isSoldout) {\n    _id\n    name\n    remarks\n    price\n    tags\n    images\n    seller {\n      name\n    }\n  }\n}": types.FetchTravelproductsDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query FetchBoardsWithSearch($page: Int, $search: String) {\n  fetchBoards(page: $page, search: $search) {\n    _id\n    writer\n    title\n    createdAt\n  }\n}\n\nquery FetchBoardsCount($search: String) {\n  fetchBoardsCount(search: $search)\n}"): (typeof documents)["query FetchBoardsWithSearch($page: Int, $search: String) {\n  fetchBoards(page: $page, search: $search) {\n    _id\n    writer\n    title\n    createdAt\n  }\n}\n\nquery FetchBoardsCount($search: String) {\n  fetchBoardsCount(search: $search)\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query FetchTravelproducts($page: Int, $search: String, $isSoldout: Boolean) {\n  fetchTravelproducts(page: $page, search: $search, isSoldout: $isSoldout) {\n    _id\n    name\n    remarks\n    price\n    tags\n    images\n    seller {\n      name\n    }\n  }\n}"): (typeof documents)["query FetchTravelproducts($page: Int, $search: String, $isSoldout: Boolean) {\n  fetchTravelproducts(page: $page, search: $search, isSoldout: $isSoldout) {\n    _id\n    name\n    remarks\n    price\n    tags\n    images\n    seller {\n      name\n    }\n  }\n}"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;