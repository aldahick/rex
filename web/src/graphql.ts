import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
export type Maybe<T> = T | undefined;
export type InputMaybe<T> = T | undefined;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never;
    };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  DateTime: { input: Date; output: Date };
};

export enum IAuthClientType {
  Mobile = "MOBILE",
  Web = "WEB",
}

export enum IAuthPermission {
  AdminMedia = "ADMIN_MEDIA",
  AdminNotes = "ADMIN_NOTES",
  AdminRoles = "ADMIN_ROLES",
  AdminSteam = "ADMIN_STEAM",
  AdminUsers = "ADMIN_USERS",
  Media = "MEDIA",
  Notes = "NOTES",
  Transcriptions = "TRANSCRIPTIONS",
}

export type IAuthToken = {
  __typename?: "AuthToken";
  token: Scalars["String"]["output"];
  user: IUser;
  userId: Scalars["ID"]["output"];
};

export type IConfig = {
  __typename?: "Config";
  createAnonymousUsers: Scalars["Boolean"]["output"];
  mediaDataLimit?: Maybe<Scalars["Int"]["output"]>;
};

export type IMediaItem = {
  __typename?: "MediaItem";
  children?: Maybe<IMediaItem[]>;
  key: Scalars["String"]["output"];
  type: IMediaItemType;
};

export enum IMediaItemType {
  Directory = "DIRECTORY",
  File = "FILE",
  Series = "SERIES",
}

export type IMutation = {
  __typename?: "Mutation";
  addMediaDownload: IProgress;
  addRoleToUser: Scalars["Boolean"]["output"];
  createAuthToken: IAuthToken;
  createAuthTokenGoogle: IAuthToken;
  createAuthTokenLocal: IAuthToken;
  createMedia: Scalars["Boolean"]["output"];
  createMediaUpload: Scalars["String"]["output"];
  createNote: INote;
  createRole: IRole;
  createUser: IUser;
  deleteMedia: Scalars["Boolean"]["output"];
  deleteRole: Scalars["Boolean"]["output"];
  fetchSteamGames: IProgress;
  removeNote: Scalars["Boolean"]["output"];
  setUserPassword: Scalars["Boolean"]["output"];
  startTranscription: ITranscription;
  updateNoteBody: Scalars["Boolean"]["output"];
  updateRole: Scalars["Boolean"]["output"];
  updateRolePermissions: Scalars["Boolean"]["output"];
};

export type IMutationAddMediaDownloadArgs = {
  destinationKey: Scalars["String"]["input"];
  sync?: InputMaybe<Scalars["Boolean"]["input"]>;
  url: Scalars["String"]["input"];
};

export type IMutationAddRoleToUserArgs = {
  roleId: Scalars["ID"]["input"];
  userId: Scalars["ID"]["input"];
};

export type IMutationCreateAuthTokenArgs = {
  userId: Scalars["String"]["input"];
};

export type IMutationCreateAuthTokenGoogleArgs = {
  clientType: IAuthClientType;
  googleIdToken: Scalars["String"]["input"];
};

export type IMutationCreateAuthTokenLocalArgs = {
  password: Scalars["String"]["input"];
  username: Scalars["String"]["input"];
};

export type IMutationCreateMediaArgs = {
  data: Scalars["String"]["input"];
  key: Scalars["String"]["input"];
};

export type IMutationCreateMediaUploadArgs = {
  key: Scalars["String"]["input"];
};

export type IMutationCreateNoteArgs = {
  title: Scalars["String"]["input"];
};

export type IMutationCreateRoleArgs = {
  name: Scalars["String"]["input"];
};

export type IMutationCreateUserArgs = {
  email: Scalars["String"]["input"];
  password?: InputMaybe<Scalars["String"]["input"]>;
  username?: InputMaybe<Scalars["String"]["input"]>;
};

export type IMutationDeleteMediaArgs = {
  key: Scalars["String"]["input"];
};

export type IMutationDeleteRoleArgs = {
  id: Scalars["ID"]["input"];
};

export type IMutationRemoveNoteArgs = {
  id: Scalars["ID"]["input"];
};

export type IMutationSetUserPasswordArgs = {
  password: Scalars["String"]["input"];
  userId: Scalars["ID"]["input"];
};

export type IMutationStartTranscriptionArgs = {
  mediaKey: Scalars["String"]["input"];
};

export type IMutationUpdateNoteBodyArgs = {
  body: Scalars["String"]["input"];
  id: Scalars["ID"]["input"];
};

export type IMutationUpdateRoleArgs = {
  id: Scalars["ID"]["input"];
  name: Scalars["String"]["input"];
};

export type IMutationUpdateRolePermissionsArgs = {
  id: Scalars["ID"]["input"];
  permissions: IAuthPermission[];
};

export type INote = {
  __typename?: "Note";
  body: Scalars["String"]["output"];
  createdAt: Scalars["DateTime"]["output"];
  id: Scalars["ID"]["output"];
  title: Scalars["String"]["output"];
};

export type IProgress = {
  __typename?: "Progress";
  action: Scalars["String"]["output"];
  createdAt: Scalars["DateTime"]["output"];
  id: Scalars["ID"]["output"];
  logs: IProgressLog[];
  status: IProgressStatus;
};

export type IProgressLog = {
  __typename?: "ProgressLog";
  createdAt: Scalars["DateTime"]["output"];
  text: Scalars["String"]["output"];
};

export enum IProgressStatus {
  Complete = "COMPLETE",
  Created = "CREATED",
  Errored = "ERRORED",
  InProgress = "IN_PROGRESS",
}

export type IQuery = {
  __typename?: "Query";
  config: IConfig;
  mediaItem?: Maybe<IMediaItem>;
  note: INote;
  notes: INote[];
  progress: IProgress;
  progresses: IProgress[];
  roles: IRole[];
  steamGames: ISteamGame[];
  steamPlayer: ISteamPlayer;
  steamPlayers: ISteamPlayer[];
  transcriptions: ITranscription[];
  user: IUser;
  users: IUser[];
};

export type IQueryMediaItemArgs = {
  key: Scalars["String"]["input"];
};

export type IQueryNoteArgs = {
  id: Scalars["ID"]["input"];
};

export type IQueryProgressArgs = {
  id: Scalars["ID"]["input"];
};

export type IQueryProgressesArgs = {
  ids: Scalars["ID"]["input"][];
};

export type IQuerySteamGamesArgs = {
  page: Scalars["Int"]["input"];
  search: Scalars["String"]["input"];
};

export type IQuerySteamPlayerArgs = {
  steamId64: Scalars["String"]["input"];
};

export type IQuerySteamPlayersArgs = {
  steamIds64: Scalars["String"]["input"][];
};

export type IQueryUserArgs = {
  id?: InputMaybe<Scalars["ID"]["input"]>;
};

export type IRole = {
  __typename?: "Role";
  id: Scalars["ID"]["output"];
  name: Scalars["String"]["output"];
  permissions: IAuthPermission[];
};

export type ISteamGame = {
  __typename?: "SteamGame";
  id: Scalars["Int"]["output"];
  name: Scalars["String"]["output"];
};

export type ISteamPlayer = {
  __typename?: "SteamPlayer";
  avatarUrl: Scalars["String"]["output"];
  id: Scalars["String"]["output"];
  nickname: Scalars["String"]["output"];
  ownedGames: ISteamGame[];
  playingGame?: Maybe<ISteamGame>;
  profileUrl: Scalars["String"]["output"];
};

export type ITranscription = {
  __typename?: "Transcription";
  filename: Scalars["String"]["output"];
  id: Scalars["ID"]["output"];
  pdf?: Maybe<IMediaItem>;
  status: ITranscriptionStatus;
};

export enum ITranscriptionStatus {
  Complete = "COMPLETE",
  Created = "CREATED",
  Errored = "ERRORED",
  Started = "STARTED",
}

export type IUser = {
  __typename?: "User";
  email: Scalars["String"]["output"];
  id: Scalars["ID"]["output"];
  permissions?: Maybe<IAuthPermission[]>;
  roles?: Maybe<IRole[]>;
  username?: Maybe<Scalars["String"]["output"]>;
};

export type IStorableAuthTokenFragment = {
  __typename?: "AuthToken";
  token: string;
  user: {
    __typename?: "User";
    id: string;
    username?: string | undefined;
    roles?:
      | Array<{
          __typename?: "Role";
          id: string;
          name: string;
          permissions: IAuthPermission[];
        }>
      | undefined;
  };
};

export type ICreateAuthTokenGoogleMutationVariables = Exact<{
  googleIdToken: Scalars["String"]["input"];
}>;

export type ICreateAuthTokenGoogleMutation = {
  __typename?: "Mutation";
  authToken: {
    __typename?: "AuthToken";
    token: string;
    user: {
      __typename?: "User";
      id: string;
      username?: string | undefined;
      roles?:
        | Array<{
            __typename?: "Role";
            id: string;
            name: string;
            permissions: IAuthPermission[];
          }>
        | undefined;
    };
  };
};

export type ICreateAuthTokenLocalMutationVariables = Exact<{
  username: Scalars["String"]["input"];
  password: Scalars["String"]["input"];
}>;

export type ICreateAuthTokenLocalMutation = {
  __typename?: "Mutation";
  authToken: {
    __typename?: "AuthToken";
    token: string;
    user: {
      __typename?: "User";
      id: string;
      username?: string | undefined;
      roles?:
        | Array<{
            __typename?: "Role";
            id: string;
            name: string;
            permissions: IAuthPermission[];
          }>
        | undefined;
    };
  };
};

export type IConfigQueryVariables = Exact<{ [key: string]: never }>;

export type IConfigQuery = {
  __typename?: "Query";
  config: { __typename?: "Config"; createAnonymousUsers: boolean };
};

export type ICreateUserMutationVariables = Exact<{
  email: Scalars["String"]["input"];
  username: Scalars["String"]["input"];
  password: Scalars["String"]["input"];
}>;

export type ICreateUserMutation = {
  __typename?: "Mutation";
  createUser: { __typename?: "User"; id: string };
};

export type IMediaItemQueryVariables = Exact<{
  key: Scalars["String"]["input"];
}>;

export type IMediaItemQuery = {
  __typename?: "Query";
  mediaItem?:
    | {
        __typename?: "MediaItem";
        key: string;
        type: IMediaItemType;
        children?:
          | Array<{
              __typename?: "MediaItem";
              key: string;
              type: IMediaItemType;
            }>
          | undefined;
      }
    | undefined;
};

export type ICreateMediaUploadMutationVariables = Exact<{
  key: Scalars["String"]["input"];
}>;

export type ICreateMediaUploadMutation = {
  __typename?: "Mutation";
  uploadUrl: string;
};

export type IDeleteMediaMutationVariables = Exact<{
  key: Scalars["String"]["input"];
}>;

export type IDeleteMediaMutation = {
  __typename?: "Mutation";
  deleteMedia: boolean;
};

export type ITranscriptionsQueryVariables = Exact<{ [key: string]: never }>;

export type ITranscriptionsQuery = {
  __typename?: "Query";
  transcriptions: Array<{
    __typename?: "Transcription";
    id: string;
    status: ITranscriptionStatus;
    filename: string;
    pdf?: { __typename?: "MediaItem"; key: string } | undefined;
  }>;
};

export type IStartTranscriptionMutationVariables = Exact<{
  key: Scalars["String"]["input"];
}>;

export type IStartTranscriptionMutation = {
  __typename?: "Mutation";
  transcription: { __typename?: "Transcription"; id: string };
};

export type ICreateNoteMutationVariables = Exact<{
  title: Scalars["String"]["input"];
}>;

export type ICreateNoteMutation = {
  __typename?: "Mutation";
  createNote: { __typename?: "Note"; id: string };
};

export type IRemoveNoteMutationVariables = Exact<{
  id: Scalars["ID"]["input"];
}>;

export type IRemoveNoteMutation = {
  __typename?: "Mutation";
  removeNote: boolean;
};

export type IUpdateNoteBodyMutationVariables = Exact<{
  id: Scalars["ID"]["input"];
  body: Scalars["String"]["input"];
}>;

export type IUpdateNoteBodyMutation = {
  __typename?: "Mutation";
  updateNoteBody: boolean;
};

export type IListNoteFragment = {
  __typename?: "Note";
  id: string;
  createdAt: Date;
  title: string;
};

export type INoteQueryVariables = Exact<{
  id: Scalars["ID"]["input"];
}>;

export type INoteQuery = {
  __typename?: "Query";
  note: {
    __typename?: "Note";
    body: string;
    id: string;
    createdAt: Date;
    title: string;
  };
};

export type INotesQueryVariables = Exact<{ [key: string]: never }>;

export type INotesQuery = {
  __typename?: "Query";
  notes: Array<{
    __typename?: "Note";
    id: string;
    createdAt: Date;
    title: string;
  }>;
};

export type IProgressQueryVariables = Exact<{
  id: Scalars["ID"]["input"];
}>;

export type IProgressQuery = {
  __typename?: "Query";
  progress: {
    __typename?: "Progress";
    id: string;
    action: string;
    createdAt: Date;
    status: IProgressStatus;
    logs: Array<{ __typename?: "ProgressLog"; createdAt: Date; text: string }>;
  };
};

export const StorableAuthTokenFragmentDoc = gql`
    fragment StorableAuthToken on AuthToken {
  token
  user {
    id
    username
    roles {
      id
      name
      permissions
    }
  }
}
    `;
export const ListNoteFragmentDoc = gql`
    fragment ListNote on Note {
  id
  createdAt
  title
}
    `;
export const CreateAuthTokenGoogleDocument = gql`
    mutation CreateAuthTokenGoogle($googleIdToken: String!) {
  authToken: createAuthTokenGoogle(googleIdToken: $googleIdToken, clientType: WEB) {
    ...StorableAuthToken
  }
}
    ${StorableAuthTokenFragmentDoc}`;
export type ICreateAuthTokenGoogleMutationFn = Apollo.MutationFunction<
  ICreateAuthTokenGoogleMutation,
  ICreateAuthTokenGoogleMutationVariables
>;

/**
 * __useCreateAuthTokenGoogleMutation__
 *
 * To run a mutation, you first call `useCreateAuthTokenGoogleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateAuthTokenGoogleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createAuthTokenGoogleMutation, { data, loading, error }] = useCreateAuthTokenGoogleMutation({
 *   variables: {
 *      googleIdToken: // value for 'googleIdToken'
 *   },
 * });
 */
export function useCreateAuthTokenGoogleMutation(
  baseOptions?: Apollo.MutationHookOptions<
    ICreateAuthTokenGoogleMutation,
    ICreateAuthTokenGoogleMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    ICreateAuthTokenGoogleMutation,
    ICreateAuthTokenGoogleMutationVariables
  >(CreateAuthTokenGoogleDocument, options);
}
export type CreateAuthTokenGoogleMutationHookResult = ReturnType<
  typeof useCreateAuthTokenGoogleMutation
>;
export type CreateAuthTokenGoogleMutationResult =
  Apollo.MutationResult<ICreateAuthTokenGoogleMutation>;
export type CreateAuthTokenGoogleMutationOptions = Apollo.BaseMutationOptions<
  ICreateAuthTokenGoogleMutation,
  ICreateAuthTokenGoogleMutationVariables
>;
export const CreateAuthTokenLocalDocument = gql`
    mutation CreateAuthTokenLocal($username: String!, $password: String!) {
  authToken: createAuthTokenLocal(username: $username, password: $password) {
    ...StorableAuthToken
  }
}
    ${StorableAuthTokenFragmentDoc}`;
export type ICreateAuthTokenLocalMutationFn = Apollo.MutationFunction<
  ICreateAuthTokenLocalMutation,
  ICreateAuthTokenLocalMutationVariables
>;

/**
 * __useCreateAuthTokenLocalMutation__
 *
 * To run a mutation, you first call `useCreateAuthTokenLocalMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateAuthTokenLocalMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createAuthTokenLocalMutation, { data, loading, error }] = useCreateAuthTokenLocalMutation({
 *   variables: {
 *      username: // value for 'username'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useCreateAuthTokenLocalMutation(
  baseOptions?: Apollo.MutationHookOptions<
    ICreateAuthTokenLocalMutation,
    ICreateAuthTokenLocalMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    ICreateAuthTokenLocalMutation,
    ICreateAuthTokenLocalMutationVariables
  >(CreateAuthTokenLocalDocument, options);
}
export type CreateAuthTokenLocalMutationHookResult = ReturnType<
  typeof useCreateAuthTokenLocalMutation
>;
export type CreateAuthTokenLocalMutationResult =
  Apollo.MutationResult<ICreateAuthTokenLocalMutation>;
export type CreateAuthTokenLocalMutationOptions = Apollo.BaseMutationOptions<
  ICreateAuthTokenLocalMutation,
  ICreateAuthTokenLocalMutationVariables
>;
export const ConfigDocument = gql`
    query Config {
  config {
    createAnonymousUsers
  }
}
    `;

/**
 * __useConfigQuery__
 *
 * To run a query within a React component, call `useConfigQuery` and pass it any options that fit your needs.
 * When your component renders, `useConfigQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useConfigQuery({
 *   variables: {
 *   },
 * });
 */
export function useConfigQuery(
  baseOptions?: Apollo.QueryHookOptions<IConfigQuery, IConfigQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<IConfigQuery, IConfigQueryVariables>(
    ConfigDocument,
    options,
  );
}
export function useConfigLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    IConfigQuery,
    IConfigQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<IConfigQuery, IConfigQueryVariables>(
    ConfigDocument,
    options,
  );
}
export function useConfigSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<
    IConfigQuery,
    IConfigQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<IConfigQuery, IConfigQueryVariables>(
    ConfigDocument,
    options,
  );
}
export type ConfigQueryHookResult = ReturnType<typeof useConfigQuery>;
export type ConfigLazyQueryHookResult = ReturnType<typeof useConfigLazyQuery>;
export type ConfigSuspenseQueryHookResult = ReturnType<
  typeof useConfigSuspenseQuery
>;
export type ConfigQueryResult = Apollo.QueryResult<
  IConfigQuery,
  IConfigQueryVariables
>;
export const CreateUserDocument = gql`
    mutation CreateUser($email: String!, $username: String!, $password: String!) {
  createUser(email: $email, username: $username, password: $password) {
    id
  }
}
    `;
export type ICreateUserMutationFn = Apollo.MutationFunction<
  ICreateUserMutation,
  ICreateUserMutationVariables
>;

/**
 * __useCreateUserMutation__
 *
 * To run a mutation, you first call `useCreateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserMutation, { data, loading, error }] = useCreateUserMutation({
 *   variables: {
 *      email: // value for 'email'
 *      username: // value for 'username'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useCreateUserMutation(
  baseOptions?: Apollo.MutationHookOptions<
    ICreateUserMutation,
    ICreateUserMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<ICreateUserMutation, ICreateUserMutationVariables>(
    CreateUserDocument,
    options,
  );
}
export type CreateUserMutationHookResult = ReturnType<
  typeof useCreateUserMutation
>;
export type CreateUserMutationResult =
  Apollo.MutationResult<ICreateUserMutation>;
export type CreateUserMutationOptions = Apollo.BaseMutationOptions<
  ICreateUserMutation,
  ICreateUserMutationVariables
>;
export const MediaItemDocument = gql`
    query MediaItem($key: String!) {
  mediaItem(key: $key) {
    key
    type
    children {
      key
      type
    }
  }
}
    `;

/**
 * __useMediaItemQuery__
 *
 * To run a query within a React component, call `useMediaItemQuery` and pass it any options that fit your needs.
 * When your component renders, `useMediaItemQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMediaItemQuery({
 *   variables: {
 *      key: // value for 'key'
 *   },
 * });
 */
export function useMediaItemQuery(
  baseOptions: Apollo.QueryHookOptions<
    IMediaItemQuery,
    IMediaItemQueryVariables
  > &
    (
      | { variables: IMediaItemQueryVariables; skip?: boolean }
      | { skip: boolean }
    ),
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<IMediaItemQuery, IMediaItemQueryVariables>(
    MediaItemDocument,
    options,
  );
}
export function useMediaItemLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    IMediaItemQuery,
    IMediaItemQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<IMediaItemQuery, IMediaItemQueryVariables>(
    MediaItemDocument,
    options,
  );
}
export function useMediaItemSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<
    IMediaItemQuery,
    IMediaItemQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<IMediaItemQuery, IMediaItemQueryVariables>(
    MediaItemDocument,
    options,
  );
}
export type MediaItemQueryHookResult = ReturnType<typeof useMediaItemQuery>;
export type MediaItemLazyQueryHookResult = ReturnType<
  typeof useMediaItemLazyQuery
>;
export type MediaItemSuspenseQueryHookResult = ReturnType<
  typeof useMediaItemSuspenseQuery
>;
export type MediaItemQueryResult = Apollo.QueryResult<
  IMediaItemQuery,
  IMediaItemQueryVariables
>;
export const CreateMediaUploadDocument = gql`
    mutation CreateMediaUpload($key: String!) {
  uploadUrl: createMediaUpload(key: $key)
}
    `;
export type ICreateMediaUploadMutationFn = Apollo.MutationFunction<
  ICreateMediaUploadMutation,
  ICreateMediaUploadMutationVariables
>;

/**
 * __useCreateMediaUploadMutation__
 *
 * To run a mutation, you first call `useCreateMediaUploadMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateMediaUploadMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createMediaUploadMutation, { data, loading, error }] = useCreateMediaUploadMutation({
 *   variables: {
 *      key: // value for 'key'
 *   },
 * });
 */
export function useCreateMediaUploadMutation(
  baseOptions?: Apollo.MutationHookOptions<
    ICreateMediaUploadMutation,
    ICreateMediaUploadMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    ICreateMediaUploadMutation,
    ICreateMediaUploadMutationVariables
  >(CreateMediaUploadDocument, options);
}
export type CreateMediaUploadMutationHookResult = ReturnType<
  typeof useCreateMediaUploadMutation
>;
export type CreateMediaUploadMutationResult =
  Apollo.MutationResult<ICreateMediaUploadMutation>;
export type CreateMediaUploadMutationOptions = Apollo.BaseMutationOptions<
  ICreateMediaUploadMutation,
  ICreateMediaUploadMutationVariables
>;
export const DeleteMediaDocument = gql`
    mutation DeleteMedia($key: String!) {
  deleteMedia(key: $key)
}
    `;
export type IDeleteMediaMutationFn = Apollo.MutationFunction<
  IDeleteMediaMutation,
  IDeleteMediaMutationVariables
>;

/**
 * __useDeleteMediaMutation__
 *
 * To run a mutation, you first call `useDeleteMediaMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteMediaMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteMediaMutation, { data, loading, error }] = useDeleteMediaMutation({
 *   variables: {
 *      key: // value for 'key'
 *   },
 * });
 */
export function useDeleteMediaMutation(
  baseOptions?: Apollo.MutationHookOptions<
    IDeleteMediaMutation,
    IDeleteMediaMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    IDeleteMediaMutation,
    IDeleteMediaMutationVariables
  >(DeleteMediaDocument, options);
}
export type DeleteMediaMutationHookResult = ReturnType<
  typeof useDeleteMediaMutation
>;
export type DeleteMediaMutationResult =
  Apollo.MutationResult<IDeleteMediaMutation>;
export type DeleteMediaMutationOptions = Apollo.BaseMutationOptions<
  IDeleteMediaMutation,
  IDeleteMediaMutationVariables
>;
export const TranscriptionsDocument = gql`
    query Transcriptions {
  transcriptions {
    id
    status
    filename
    pdf {
      key
    }
  }
}
    `;

/**
 * __useTranscriptionsQuery__
 *
 * To run a query within a React component, call `useTranscriptionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useTranscriptionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTranscriptionsQuery({
 *   variables: {
 *   },
 * });
 */
export function useTranscriptionsQuery(
  baseOptions?: Apollo.QueryHookOptions<
    ITranscriptionsQuery,
    ITranscriptionsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<ITranscriptionsQuery, ITranscriptionsQueryVariables>(
    TranscriptionsDocument,
    options,
  );
}
export function useTranscriptionsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    ITranscriptionsQuery,
    ITranscriptionsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    ITranscriptionsQuery,
    ITranscriptionsQueryVariables
  >(TranscriptionsDocument, options);
}
export function useTranscriptionsSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<
    ITranscriptionsQuery,
    ITranscriptionsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    ITranscriptionsQuery,
    ITranscriptionsQueryVariables
  >(TranscriptionsDocument, options);
}
export type TranscriptionsQueryHookResult = ReturnType<
  typeof useTranscriptionsQuery
>;
export type TranscriptionsLazyQueryHookResult = ReturnType<
  typeof useTranscriptionsLazyQuery
>;
export type TranscriptionsSuspenseQueryHookResult = ReturnType<
  typeof useTranscriptionsSuspenseQuery
>;
export type TranscriptionsQueryResult = Apollo.QueryResult<
  ITranscriptionsQuery,
  ITranscriptionsQueryVariables
>;
export const StartTranscriptionDocument = gql`
    mutation StartTranscription($key: String!) {
  transcription: startTranscription(mediaKey: $key) {
    id
  }
}
    `;
export type IStartTranscriptionMutationFn = Apollo.MutationFunction<
  IStartTranscriptionMutation,
  IStartTranscriptionMutationVariables
>;

/**
 * __useStartTranscriptionMutation__
 *
 * To run a mutation, you first call `useStartTranscriptionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useStartTranscriptionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [startTranscriptionMutation, { data, loading, error }] = useStartTranscriptionMutation({
 *   variables: {
 *      key: // value for 'key'
 *   },
 * });
 */
export function useStartTranscriptionMutation(
  baseOptions?: Apollo.MutationHookOptions<
    IStartTranscriptionMutation,
    IStartTranscriptionMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    IStartTranscriptionMutation,
    IStartTranscriptionMutationVariables
  >(StartTranscriptionDocument, options);
}
export type StartTranscriptionMutationHookResult = ReturnType<
  typeof useStartTranscriptionMutation
>;
export type StartTranscriptionMutationResult =
  Apollo.MutationResult<IStartTranscriptionMutation>;
export type StartTranscriptionMutationOptions = Apollo.BaseMutationOptions<
  IStartTranscriptionMutation,
  IStartTranscriptionMutationVariables
>;
export const CreateNoteDocument = gql`
    mutation CreateNote($title: String!) {
  createNote(title: $title) {
    id
  }
}
    `;
export type ICreateNoteMutationFn = Apollo.MutationFunction<
  ICreateNoteMutation,
  ICreateNoteMutationVariables
>;

/**
 * __useCreateNoteMutation__
 *
 * To run a mutation, you first call `useCreateNoteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateNoteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createNoteMutation, { data, loading, error }] = useCreateNoteMutation({
 *   variables: {
 *      title: // value for 'title'
 *   },
 * });
 */
export function useCreateNoteMutation(
  baseOptions?: Apollo.MutationHookOptions<
    ICreateNoteMutation,
    ICreateNoteMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<ICreateNoteMutation, ICreateNoteMutationVariables>(
    CreateNoteDocument,
    options,
  );
}
export type CreateNoteMutationHookResult = ReturnType<
  typeof useCreateNoteMutation
>;
export type CreateNoteMutationResult =
  Apollo.MutationResult<ICreateNoteMutation>;
export type CreateNoteMutationOptions = Apollo.BaseMutationOptions<
  ICreateNoteMutation,
  ICreateNoteMutationVariables
>;
export const RemoveNoteDocument = gql`
    mutation RemoveNote($id: ID!) {
  removeNote(id: $id)
}
    `;
export type IRemoveNoteMutationFn = Apollo.MutationFunction<
  IRemoveNoteMutation,
  IRemoveNoteMutationVariables
>;

/**
 * __useRemoveNoteMutation__
 *
 * To run a mutation, you first call `useRemoveNoteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveNoteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeNoteMutation, { data, loading, error }] = useRemoveNoteMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useRemoveNoteMutation(
  baseOptions?: Apollo.MutationHookOptions<
    IRemoveNoteMutation,
    IRemoveNoteMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<IRemoveNoteMutation, IRemoveNoteMutationVariables>(
    RemoveNoteDocument,
    options,
  );
}
export type RemoveNoteMutationHookResult = ReturnType<
  typeof useRemoveNoteMutation
>;
export type RemoveNoteMutationResult =
  Apollo.MutationResult<IRemoveNoteMutation>;
export type RemoveNoteMutationOptions = Apollo.BaseMutationOptions<
  IRemoveNoteMutation,
  IRemoveNoteMutationVariables
>;
export const UpdateNoteBodyDocument = gql`
    mutation UpdateNoteBody($id: ID!, $body: String!) {
  updateNoteBody(id: $id, body: $body)
}
    `;
export type IUpdateNoteBodyMutationFn = Apollo.MutationFunction<
  IUpdateNoteBodyMutation,
  IUpdateNoteBodyMutationVariables
>;

/**
 * __useUpdateNoteBodyMutation__
 *
 * To run a mutation, you first call `useUpdateNoteBodyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateNoteBodyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateNoteBodyMutation, { data, loading, error }] = useUpdateNoteBodyMutation({
 *   variables: {
 *      id: // value for 'id'
 *      body: // value for 'body'
 *   },
 * });
 */
export function useUpdateNoteBodyMutation(
  baseOptions?: Apollo.MutationHookOptions<
    IUpdateNoteBodyMutation,
    IUpdateNoteBodyMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    IUpdateNoteBodyMutation,
    IUpdateNoteBodyMutationVariables
  >(UpdateNoteBodyDocument, options);
}
export type UpdateNoteBodyMutationHookResult = ReturnType<
  typeof useUpdateNoteBodyMutation
>;
export type UpdateNoteBodyMutationResult =
  Apollo.MutationResult<IUpdateNoteBodyMutation>;
export type UpdateNoteBodyMutationOptions = Apollo.BaseMutationOptions<
  IUpdateNoteBodyMutation,
  IUpdateNoteBodyMutationVariables
>;
export const NoteDocument = gql`
    query Note($id: ID!) {
  note(id: $id) {
    ...ListNote
    body
  }
}
    ${ListNoteFragmentDoc}`;

/**
 * __useNoteQuery__
 *
 * To run a query within a React component, call `useNoteQuery` and pass it any options that fit your needs.
 * When your component renders, `useNoteQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNoteQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useNoteQuery(
  baseOptions: Apollo.QueryHookOptions<INoteQuery, INoteQueryVariables> &
    ({ variables: INoteQueryVariables; skip?: boolean } | { skip: boolean }),
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<INoteQuery, INoteQueryVariables>(
    NoteDocument,
    options,
  );
}
export function useNoteLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<INoteQuery, INoteQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<INoteQuery, INoteQueryVariables>(
    NoteDocument,
    options,
  );
}
export function useNoteSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<
    INoteQuery,
    INoteQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<INoteQuery, INoteQueryVariables>(
    NoteDocument,
    options,
  );
}
export type NoteQueryHookResult = ReturnType<typeof useNoteQuery>;
export type NoteLazyQueryHookResult = ReturnType<typeof useNoteLazyQuery>;
export type NoteSuspenseQueryHookResult = ReturnType<
  typeof useNoteSuspenseQuery
>;
export type NoteQueryResult = Apollo.QueryResult<
  INoteQuery,
  INoteQueryVariables
>;
export const NotesDocument = gql`
    query Notes {
  notes {
    ...ListNote
  }
}
    ${ListNoteFragmentDoc}`;

/**
 * __useNotesQuery__
 *
 * To run a query within a React component, call `useNotesQuery` and pass it any options that fit your needs.
 * When your component renders, `useNotesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNotesQuery({
 *   variables: {
 *   },
 * });
 */
export function useNotesQuery(
  baseOptions?: Apollo.QueryHookOptions<INotesQuery, INotesQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<INotesQuery, INotesQueryVariables>(
    NotesDocument,
    options,
  );
}
export function useNotesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<INotesQuery, INotesQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<INotesQuery, INotesQueryVariables>(
    NotesDocument,
    options,
  );
}
export function useNotesSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<
    INotesQuery,
    INotesQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<INotesQuery, INotesQueryVariables>(
    NotesDocument,
    options,
  );
}
export type NotesQueryHookResult = ReturnType<typeof useNotesQuery>;
export type NotesLazyQueryHookResult = ReturnType<typeof useNotesLazyQuery>;
export type NotesSuspenseQueryHookResult = ReturnType<
  typeof useNotesSuspenseQuery
>;
export type NotesQueryResult = Apollo.QueryResult<
  INotesQuery,
  INotesQueryVariables
>;
export const ProgressDocument = gql`
    query Progress($id: ID!) {
  progress(id: $id) {
    id
    action
    createdAt
    status
    logs {
      createdAt
      text
    }
  }
}
    `;

/**
 * __useProgressQuery__
 *
 * To run a query within a React component, call `useProgressQuery` and pass it any options that fit your needs.
 * When your component renders, `useProgressQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProgressQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useProgressQuery(
  baseOptions: Apollo.QueryHookOptions<
    IProgressQuery,
    IProgressQueryVariables
  > &
    (
      | { variables: IProgressQueryVariables; skip?: boolean }
      | { skip: boolean }
    ),
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<IProgressQuery, IProgressQueryVariables>(
    ProgressDocument,
    options,
  );
}
export function useProgressLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    IProgressQuery,
    IProgressQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<IProgressQuery, IProgressQueryVariables>(
    ProgressDocument,
    options,
  );
}
export function useProgressSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<
    IProgressQuery,
    IProgressQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<IProgressQuery, IProgressQueryVariables>(
    ProgressDocument,
    options,
  );
}
export type ProgressQueryHookResult = ReturnType<typeof useProgressQuery>;
export type ProgressLazyQueryHookResult = ReturnType<
  typeof useProgressLazyQuery
>;
export type ProgressSuspenseQueryHookResult = ReturnType<
  typeof useProgressSuspenseQuery
>;
export type ProgressQueryResult = Apollo.QueryResult<
  IProgressQuery,
  IProgressQueryVariables
>;
