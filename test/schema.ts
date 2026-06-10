/** Internal type. DO NOT USE DIRECTLY. */
type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** Internal type. DO NOT USE DIRECTLY. */
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
/** All built-in and custom scalars, mapped to their actual values */
export interface Scalars {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
}

export interface AB {
  readonly __typename?: 'AB';
  readonly a?: Maybe<Scalars['String']['output']>;
  readonly b?: Maybe<Scalars['String']['output']>;
}

export interface ABInput {
  readonly a?: InputMaybe<Scalars['String']['input']>;
  readonly b?: InputMaybe<Scalars['String']['input']>;
}

export interface HelloWorld {
  readonly __typename?: 'HelloWorld';
  readonly greeting?: Maybe<Scalars['String']['output']>;
  readonly name?: Maybe<Scalars['String']['output']>;
}

export interface Message {
  readonly __typename?: 'Message';
  readonly date?: Maybe<Scalars['String']['output']>;
  readonly message?: Maybe<Scalars['String']['output']>;
  readonly user?: Maybe<Scalars['String']['output']>;
}

export interface Mutation {
  readonly __typename?: 'Mutation';
  readonly inputParam?: Maybe<AB>;
  readonly noParam?: Maybe<NoParam>;
  readonly nonNullableParam?: Maybe<NonNull>;
  readonly nullableParam?: Maybe<Nullable>;
  readonly reset?: Maybe<ReadonlyArray<Maybe<Message>>>;
  readonly sendMessage?: Maybe<Message>;
  readonly updateUser?: Maybe<User>;
}


export interface MutationinputParamArgs {
  input?: InputMaybe<ABInput>;
}


export interface MutationnonNullableParamArgs {
  nonNull: Scalars['String']['input'];
}


export interface MutationnullableParamArgs {
  delay?: InputMaybe<Scalars['Int']['input']>;
  nullable?: InputMaybe<Scalars['String']['input']>;
}


export interface MutationsendMessageArgs {
  message?: InputMaybe<Scalars['String']['input']>;
  user?: InputMaybe<Scalars['String']['input']>;
}


export interface MutationupdateUserArgs {
  haircolor: Scalars['String']['input'];
  username: Scalars['String']['input'];
}

export interface NoParam {
  readonly __typename?: 'NoParam';
  readonly noParam?: Maybe<Scalars['String']['output']>;
}

export interface NonNull {
  readonly __typename?: 'NonNull';
  readonly nonNull: Scalars['String']['output'];
}

export interface Nullable {
  readonly __typename?: 'Nullable';
  readonly nullable?: Maybe<Scalars['String']['output']>;
}

export interface Paged {
  readonly __typename?: 'Paged';
  readonly pages?: Maybe<ReadonlyArray<Maybe<Scalars['Int']['output']>>>;
}

export interface Query {
  readonly __typename?: 'Query';
  readonly helloWorld?: Maybe<HelloWorld>;
  readonly messages?: Maybe<ReadonlyArray<Maybe<Message>>>;
  readonly noParam?: Maybe<NoParam>;
  readonly nonNullParam?: Maybe<NonNull>;
  readonly nullableParam?: Maybe<Nullable>;
  readonly pages?: Maybe<ReadonlyArray<Maybe<Scalars['Int']['output']>>>;
}


export interface QueryhelloWorldArgs {
  greeting?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
}


export interface QuerynonNullParamArgs {
  nonNull: Scalars['String']['input'];
}


export interface QuerynullableParamArgs {
  delay?: InputMaybe<Scalars['Int']['input']>;
  nullable?: InputMaybe<Scalars['String']['input']>;
}


export interface QuerypagesArgs {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
}

export interface Subscription {
  readonly __typename?: 'Subscription';
  readonly messageSent?: Maybe<Message>;
  readonly noParam?: Maybe<NoParam>;
  readonly nonNullParam?: Maybe<NonNull>;
  readonly nullableParam?: Maybe<Nullable>;
  readonly pageAdded?: Maybe<Scalars['Int']['output']>;
}


export interface SubscriptionnonNullParamArgs {
  nonNull: Scalars['String']['input'];
}


export interface SubscriptionnullableParamArgs {
  delay?: InputMaybe<Scalars['Int']['input']>;
  nullable?: InputMaybe<Scalars['String']['input']>;
}

export interface User {
  readonly __typename?: 'User';
  readonly haircolor?: Maybe<Scalars['String']['output']>;
  readonly nickname?: Maybe<Scalars['String']['output']>;
  readonly username?: Maybe<Scalars['String']['output']>;
}

export interface ABInput {
  readonly a?: string | null | undefined;
  readonly b?: string | null | undefined;
}

export type HelloQueryVariables = Exact<{
  name?: string | null | undefined;
  greeting?: string | null | undefined;
}>;


export interface HelloQueryData { readonly helloWorld: { readonly name: string | null, readonly greeting: string | null } | null }

export type InputParamMutationVariables = Exact<{
  input: ABInput;
}>;


export interface InputParamMutationData { readonly inputParam: { readonly a: string | null, readonly b: string | null } | null }

export type MessageSentSubscriptionVariables = Exact<{ [key: string]: never; }>;


export interface MessageSentSubscriptionData { readonly messageSent: { readonly message: string | null } | null }

export type MessagesQueryVariables = Exact<{ [key: string]: never; }>;


export interface MessagesQueryData { readonly messages: ReadonlyArray<{ readonly message: string | null } | null> | null }

export type NoParamMutationVariables = Exact<{ [key: string]: never; }>;


export interface NoParamMutationData { readonly noParam: { readonly noParam: string | null } | null }

export type NoParamQueryVariables = Exact<{ [key: string]: never; }>;


export interface NoParamQueryData { readonly noParam: { readonly noParam: string | null } | null }

export type NoParamSubscriptionVariables = Exact<{ [key: string]: never; }>;


export interface NoParamSubscriptionData { readonly noParam: { readonly noParam: string | null } | null }

export type NonNullableParamMutationVariables = Exact<{
  param: string;
}>;


export interface NonNullableParamMutationData { readonly noParam: { readonly noParam: string | null } | null }

export type NonNullableParamQueryVariables = Exact<{
  nonNull: string;
}>;


export interface NonNullableParamQueryData { readonly nonNullParam: { readonly nonNull: string } | null }

export type NonNullableParamSubscriptionVariables = Exact<{
  nonNull: string;
}>;


export interface NonNullableParamSubscriptionData { readonly nonNullParam: { readonly nonNull: string } | null }

export type NullableParamMutationVariables = Exact<{
  nullable?: string | null | undefined;
  delay?: number | null | undefined;
}>;


export interface NullableParamMutationData { readonly nullableParam: { readonly nullable: string | null } | null }

export type NullableParamQueryVariables = Exact<{
  nullable?: string | null | undefined;
  delay?: number | null | undefined;
}>;


export interface NullableParamQueryData { readonly nullableParam: { readonly nullable: string | null } | null }

export type NullableParamSubscriptionVariables = Exact<{
  nullable?: string | null | undefined;
  delay?: number | null | undefined;
}>;


export interface NullableParamSubscriptionData { readonly nullableParam: { readonly nullable: string | null } | null }

export type PageAddedSubscriptionVariables = Exact<{ [key: string]: never; }>;


export interface PageAddedSubscriptionData { readonly pageAdded: number | null }

export type PaginatedQueryVariables = Exact<{
  offset?: number | null | undefined;
  limit?: number | null | undefined;
}>;


export interface PaginatedQueryData { readonly pages: ReadonlyArray<number | null> | null }

export type UpdateUserMutationVariables = Exact<{
  username: string;
  haircolor: string;
}>;


export interface UpdateUserMutationData { readonly updateUser: { readonly nickname: string | null } | null }


export const HelloQuery = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"HelloQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"greeting"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"helloWorld"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"Argument","name":{"kind":"Name","value":"greeting"},"value":{"kind":"Variable","name":{"kind":"Name","value":"greeting"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"greeting"}}]}}]}}]} as unknown as DocumentNode<HelloQueryData, HelloQueryVariables>;
export const InputParamMutation = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"InputParamMutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ABInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"inputParam"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"a"}},{"kind":"Field","name":{"kind":"Name","value":"b"}}]}}]}}]} as unknown as DocumentNode<InputParamMutationData, InputParamMutationVariables>;
export const MessageSentSubscription = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"MessageSentSubscription"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"messageSent"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<MessageSentSubscriptionData, MessageSentSubscriptionVariables>;
export const MessagesQuery = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"MessagesQuery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"messages"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<MessagesQueryData, MessagesQueryVariables>;
export const NoParamMutation = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"NoParamMutation"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"noParam"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"noParam"}}]}}]}}]} as unknown as DocumentNode<NoParamMutationData, NoParamMutationVariables>;
export const NoParamQuery = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"NoParamQuery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"noParam"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"noParam"}}]}}]}}]} as unknown as DocumentNode<NoParamQueryData, NoParamQueryVariables>;
export const NoParamSubscription = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"NoParamSubscription"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"noParam"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"noParam"}}]}}]}}]} as unknown as DocumentNode<NoParamSubscriptionData, NoParamSubscriptionVariables>;
export const NonNullableParamMutation = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"NonNullableParamMutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"param"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"noParam"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"noParam"}}]}}]}}]} as unknown as DocumentNode<NonNullableParamMutationData, NonNullableParamMutationVariables>;
export const NonNullableParamQuery = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"NonNullableParamQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"nonNull"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nonNullParam"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"nonNull"},"value":{"kind":"Variable","name":{"kind":"Name","value":"nonNull"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nonNull"}}]}}]}}]} as unknown as DocumentNode<NonNullableParamQueryData, NonNullableParamQueryVariables>;
export const NonNullableParamSubscription = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"NonNullableParamSubscription"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"nonNull"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nonNullParam"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"nonNull"},"value":{"kind":"Variable","name":{"kind":"Name","value":"nonNull"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nonNull"}}]}}]}}]} as unknown as DocumentNode<NonNullableParamSubscriptionData, NonNullableParamSubscriptionVariables>;
export const NullableParamMutation = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"NullableParamMutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"nullable"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"delay"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nullableParam"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"nullable"},"value":{"kind":"Variable","name":{"kind":"Name","value":"nullable"}}},{"kind":"Argument","name":{"kind":"Name","value":"delay"},"value":{"kind":"Variable","name":{"kind":"Name","value":"delay"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nullable"}}]}}]}}]} as unknown as DocumentNode<NullableParamMutationData, NullableParamMutationVariables>;
export const NullableParamQuery = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"NullableParamQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"nullable"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"delay"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nullableParam"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"nullable"},"value":{"kind":"Variable","name":{"kind":"Name","value":"nullable"}}},{"kind":"Argument","name":{"kind":"Name","value":"delay"},"value":{"kind":"Variable","name":{"kind":"Name","value":"delay"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nullable"}}]}}]}}]} as unknown as DocumentNode<NullableParamQueryData, NullableParamQueryVariables>;
export const NullableParamSubscription = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"NullableParamSubscription"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"nullable"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"delay"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nullableParam"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"nullable"},"value":{"kind":"Variable","name":{"kind":"Name","value":"nullable"}}},{"kind":"Argument","name":{"kind":"Name","value":"delay"},"value":{"kind":"Variable","name":{"kind":"Name","value":"delay"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nullable"}}]}}]}}]} as unknown as DocumentNode<NullableParamSubscriptionData, NullableParamSubscriptionVariables>;
export const PageAddedSubscription = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"PageAddedSubscription"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"pageAdded"}}]}}]} as unknown as DocumentNode<PageAddedSubscriptionData, PageAddedSubscriptionVariables>;
export const PaginatedQuery = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PaginatedQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"offset"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}},"defaultValue":{"kind":"IntValue","value":"0"}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}},"defaultValue":{"kind":"IntValue","value":"10"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"pages"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"offset"},"value":{"kind":"Variable","name":{"kind":"Name","value":"offset"}}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}}]}]}}]} as unknown as DocumentNode<PaginatedQueryData, PaginatedQueryVariables>;
export const UpdateUserMutation = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateUserMutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"username"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"haircolor"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"username"},"value":{"kind":"Variable","name":{"kind":"Name","value":"username"}}},{"kind":"Argument","name":{"kind":"Name","value":"haircolor"},"value":{"kind":"Variable","name":{"kind":"Name","value":"haircolor"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nickname"}}]}}]}}]} as unknown as DocumentNode<UpdateUserMutationData, UpdateUserMutationVariables>;