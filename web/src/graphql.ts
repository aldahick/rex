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
  DateTime: { input: string; output: string };
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
  Projects = "PROJECTS",
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
  deleteProjectConfig: Scalars["Boolean"]["output"];
  deleteRole: Scalars["Boolean"]["output"];
  fetchSteamGames: IProgress;
  removeNote: Scalars["Boolean"]["output"];
  setUserPassword: Scalars["Boolean"]["output"];
  updateNoteBody: Scalars["Boolean"]["output"];
  updateProjectConfig: Scalars["Boolean"]["output"];
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

export type IMutationDeleteProjectConfigArgs = {
  adapterType: IProjectAdapterType;
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

export type IMutationUpdateNoteBodyArgs = {
  body: Scalars["String"]["input"];
  id: Scalars["ID"]["input"];
};

export type IMutationUpdateProjectConfigArgs = {
  params: IUpdateProjectConfigParams;
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

export type IProject = {
  __typename?: "Project";
  boards: IProjectBoard[];
  config: IProjectConfig;
  issues: IProjectIssue[];
  sprints: IProjectSprint[];
};

export type IProjectIssuesArgs = {
  sprintId: Scalars["Int"]["input"];
};

export type IProjectSprintsArgs = {
  boardId: Scalars["Int"]["input"];
};

export enum IProjectAdapterType {
  Jira = "JIRA",
}

export type IProjectBoard = {
  __typename?: "ProjectBoard";
  id: Scalars["Int"]["output"];
  name: Scalars["String"]["output"];
};

export type IProjectConfig = {
  __typename?: "ProjectConfig";
  adapterType: IProjectAdapterType;
  apiToken: Scalars["String"]["output"];
  email: Scalars["String"]["output"];
  host: Scalars["String"]["output"];
};

export type IProjectIssue = {
  __typename?: "ProjectIssue";
  id: Scalars["ID"]["output"];
  implementer?: Maybe<IProjectUser>;
  key: Scalars["String"]["output"];
  sprints: IProjectSprint[];
  state: Scalars["String"]["output"];
  statusDurations: IProjectIssueStatusDuration[];
  storyPoints?: Maybe<Scalars["Float"]["output"]>;
  title: Scalars["String"]["output"];
  type: Scalars["String"]["output"];
};

export type IProjectIssueStatusDuration = {
  __typename?: "ProjectIssueStatusDuration";
  fullDuration: Scalars["Int"]["output"];
  status: Scalars["String"]["output"];
  workingDays: Scalars["Int"]["output"];
  workingDuration: Scalars["Int"]["output"];
};

export type IProjectSprint = {
  __typename?: "ProjectSprint";
  end?: Maybe<Scalars["DateTime"]["output"]>;
  id: Scalars["Int"]["output"];
  name: Scalars["String"]["output"];
  start?: Maybe<Scalars["DateTime"]["output"]>;
  state: Scalars["String"]["output"];
};

export type IProjectUser = {
  __typename?: "ProjectUser";
  email?: Maybe<Scalars["String"]["output"]>;
  id: Scalars["ID"]["output"];
  name: Scalars["String"]["output"];
};

export type IQuery = {
  __typename?: "Query";
  config: IConfig;
  mediaItem?: Maybe<IMediaItem>;
  note: INote;
  notes: INote[];
  progress: IProgress;
  progresses: IProgress[];
  project: IProject;
  roles: IRole[];
  steamGames: ISteamGame[];
  steamPlayer: ISteamPlayer;
  steamPlayers: ISteamPlayer[];
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

export type IQueryProjectArgs = {
  adapterType: IProjectAdapterType;
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

export type IUpdateProjectConfigParams = {
  adapterType: IProjectAdapterType;
  apiToken: Scalars["String"]["input"];
  email: Scalars["String"]["input"];
  host: Scalars["String"]["input"];
};

export type IUser = {
  __typename?: "User";
  email: Scalars["String"]["output"];
  id: Scalars["ID"]["output"];
  permissions?: Maybe<IAuthPermission[]>;
  projectConfigs: IProjectConfig[];
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
  createdAt: string;
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
    createdAt: string;
    title: string;
  };
};

export type INotesQueryVariables = Exact<{ [key: string]: never }>;

export type INotesQuery = {
  __typename?: "Query";
  notes: Array<{
    __typename?: "Note";
    id: string;
    createdAt: string;
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
    createdAt: string;
    status: IProgressStatus;
    logs: Array<{
      __typename?: "ProgressLog";
      createdAt: string;
      text: string;
    }>;
  };
};

export type IProjectConfigsQueryVariables = Exact<{ [key: string]: never }>;

export type IProjectConfigsQuery = {
  __typename?: "Query";
  user: {
    __typename?: "User";
    projectConfigs: Array<{
      __typename?: "ProjectConfig";
      adapterType: IProjectAdapterType;
      host: string;
      email: string;
      apiToken: string;
    }>;
  };
};

export type IUpdateProjectConfigMutationVariables = Exact<{
  params: IUpdateProjectConfigParams;
}>;

export type IUpdateProjectConfigMutation = {
  __typename?: "Mutation";
  updated: boolean;
};

export type IDeleteProjectConfigMutationVariables = Exact<{
  adapterType: IProjectAdapterType;
}>;

export type IDeleteProjectConfigMutation = {
  __typename?: "Mutation";
  deleted: boolean;
};

export type IProjectBoardsQueryVariables = Exact<{
  adapterType: IProjectAdapterType;
}>;

export type IProjectBoardsQuery = {
  __typename?: "Query";
  project: {
    __typename?: "Project";
    config: { __typename?: "ProjectConfig"; adapterType: IProjectAdapterType };
    boards: Array<{ __typename?: "ProjectBoard"; id: number; name: string }>;
  };
};

export type IProjectSprintsQueryVariables = Exact<{
  adapterType: IProjectAdapterType;
  boardId: Scalars["Int"]["input"];
}>;

export type IProjectSprintsQuery = {
  __typename?: "Query";
  project: {
    __typename?: "Project";
    config: { __typename?: "ProjectConfig"; adapterType: IProjectAdapterType };
    sprints: Array<{
      __typename?: "ProjectSprint";
      id: number;
      name: string;
      state: string;
      start?: string | undefined;
      end?: string | undefined;
    }>;
  };
};

export type IProjectIssuesQueryVariables = Exact<{
  adapterType: IProjectAdapterType;
  sprintId: Scalars["Int"]["input"];
}>;

export type IProjectIssuesQuery = {
  __typename?: "Query";
  project: {
    __typename?: "Project";
    config: { __typename?: "ProjectConfig"; adapterType: IProjectAdapterType };
    issues: Array<{
      __typename?: "ProjectIssue";
      id: string;
      key: string;
      type: string;
      state: string;
      title: string;
      storyPoints?: number | undefined;
      implementer?:
        | {
            __typename?: "ProjectUser";
            id: string;
            name: string;
            email?: string | undefined;
          }
        | undefined;
      sprints: Array<{
        __typename?: "ProjectSprint";
        id: number;
        name: string;
        state: string;
        start?: string | undefined;
        end?: string | undefined;
      }>;
      statusDurations: Array<{
        __typename?: "ProjectIssueStatusDuration";
        status: string;
        workingDays: number;
        workingDuration: number;
        fullDuration: number;
      }>;
    }>;
  };
};

export type IProjectSprintFragmentFragment = {
  __typename?: "ProjectSprint";
  id: number;
  name: string;
  state: string;
  start?: string | undefined;
  end?: string | undefined;
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
export const ProjectSprintFragmentFragmentDoc = gql`
    fragment ProjectSprintFragment on ProjectSprint {
  id
  name
  state
  start
  end
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
export const ProjectConfigsDocument = gql`
    query projectConfigs {
  user {
    projectConfigs {
      adapterType
      host
      email
      apiToken
    }
  }
}
    `;

/**
 * __useProjectConfigsQuery__
 *
 * To run a query within a React component, call `useProjectConfigsQuery` and pass it any options that fit your needs.
 * When your component renders, `useProjectConfigsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProjectConfigsQuery({
 *   variables: {
 *   },
 * });
 */
export function useProjectConfigsQuery(
  baseOptions?: Apollo.QueryHookOptions<
    IProjectConfigsQuery,
    IProjectConfigsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<IProjectConfigsQuery, IProjectConfigsQueryVariables>(
    ProjectConfigsDocument,
    options,
  );
}
export function useProjectConfigsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    IProjectConfigsQuery,
    IProjectConfigsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    IProjectConfigsQuery,
    IProjectConfigsQueryVariables
  >(ProjectConfigsDocument, options);
}
export function useProjectConfigsSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<
    IProjectConfigsQuery,
    IProjectConfigsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    IProjectConfigsQuery,
    IProjectConfigsQueryVariables
  >(ProjectConfigsDocument, options);
}
export type ProjectConfigsQueryHookResult = ReturnType<
  typeof useProjectConfigsQuery
>;
export type ProjectConfigsLazyQueryHookResult = ReturnType<
  typeof useProjectConfigsLazyQuery
>;
export type ProjectConfigsSuspenseQueryHookResult = ReturnType<
  typeof useProjectConfigsSuspenseQuery
>;
export type ProjectConfigsQueryResult = Apollo.QueryResult<
  IProjectConfigsQuery,
  IProjectConfigsQueryVariables
>;
export const UpdateProjectConfigDocument = gql`
    mutation updateProjectConfig($params: UpdateProjectConfigParams!) {
  updated: updateProjectConfig(params: $params)
}
    `;
export type IUpdateProjectConfigMutationFn = Apollo.MutationFunction<
  IUpdateProjectConfigMutation,
  IUpdateProjectConfigMutationVariables
>;

/**
 * __useUpdateProjectConfigMutation__
 *
 * To run a mutation, you first call `useUpdateProjectConfigMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProjectConfigMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProjectConfigMutation, { data, loading, error }] = useUpdateProjectConfigMutation({
 *   variables: {
 *      params: // value for 'params'
 *   },
 * });
 */
export function useUpdateProjectConfigMutation(
  baseOptions?: Apollo.MutationHookOptions<
    IUpdateProjectConfigMutation,
    IUpdateProjectConfigMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    IUpdateProjectConfigMutation,
    IUpdateProjectConfigMutationVariables
  >(UpdateProjectConfigDocument, options);
}
export type UpdateProjectConfigMutationHookResult = ReturnType<
  typeof useUpdateProjectConfigMutation
>;
export type UpdateProjectConfigMutationResult =
  Apollo.MutationResult<IUpdateProjectConfigMutation>;
export type UpdateProjectConfigMutationOptions = Apollo.BaseMutationOptions<
  IUpdateProjectConfigMutation,
  IUpdateProjectConfigMutationVariables
>;
export const DeleteProjectConfigDocument = gql`
    mutation deleteProjectConfig($adapterType: ProjectAdapterType!) {
  deleted: deleteProjectConfig(adapterType: $adapterType)
}
    `;
export type IDeleteProjectConfigMutationFn = Apollo.MutationFunction<
  IDeleteProjectConfigMutation,
  IDeleteProjectConfigMutationVariables
>;

/**
 * __useDeleteProjectConfigMutation__
 *
 * To run a mutation, you first call `useDeleteProjectConfigMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteProjectConfigMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteProjectConfigMutation, { data, loading, error }] = useDeleteProjectConfigMutation({
 *   variables: {
 *      adapterType: // value for 'adapterType'
 *   },
 * });
 */
export function useDeleteProjectConfigMutation(
  baseOptions?: Apollo.MutationHookOptions<
    IDeleteProjectConfigMutation,
    IDeleteProjectConfigMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    IDeleteProjectConfigMutation,
    IDeleteProjectConfigMutationVariables
  >(DeleteProjectConfigDocument, options);
}
export type DeleteProjectConfigMutationHookResult = ReturnType<
  typeof useDeleteProjectConfigMutation
>;
export type DeleteProjectConfigMutationResult =
  Apollo.MutationResult<IDeleteProjectConfigMutation>;
export type DeleteProjectConfigMutationOptions = Apollo.BaseMutationOptions<
  IDeleteProjectConfigMutation,
  IDeleteProjectConfigMutationVariables
>;
export const ProjectBoardsDocument = gql`
    query projectBoards($adapterType: ProjectAdapterType!) {
  project(adapterType: $adapterType) {
    config {
      adapterType
    }
    boards {
      id
      name
    }
  }
}
    `;

/**
 * __useProjectBoardsQuery__
 *
 * To run a query within a React component, call `useProjectBoardsQuery` and pass it any options that fit your needs.
 * When your component renders, `useProjectBoardsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProjectBoardsQuery({
 *   variables: {
 *      adapterType: // value for 'adapterType'
 *   },
 * });
 */
export function useProjectBoardsQuery(
  baseOptions: Apollo.QueryHookOptions<
    IProjectBoardsQuery,
    IProjectBoardsQueryVariables
  > &
    (
      | { variables: IProjectBoardsQueryVariables; skip?: boolean }
      | { skip: boolean }
    ),
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<IProjectBoardsQuery, IProjectBoardsQueryVariables>(
    ProjectBoardsDocument,
    options,
  );
}
export function useProjectBoardsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    IProjectBoardsQuery,
    IProjectBoardsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<IProjectBoardsQuery, IProjectBoardsQueryVariables>(
    ProjectBoardsDocument,
    options,
  );
}
export function useProjectBoardsSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<
    IProjectBoardsQuery,
    IProjectBoardsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    IProjectBoardsQuery,
    IProjectBoardsQueryVariables
  >(ProjectBoardsDocument, options);
}
export type ProjectBoardsQueryHookResult = ReturnType<
  typeof useProjectBoardsQuery
>;
export type ProjectBoardsLazyQueryHookResult = ReturnType<
  typeof useProjectBoardsLazyQuery
>;
export type ProjectBoardsSuspenseQueryHookResult = ReturnType<
  typeof useProjectBoardsSuspenseQuery
>;
export type ProjectBoardsQueryResult = Apollo.QueryResult<
  IProjectBoardsQuery,
  IProjectBoardsQueryVariables
>;
export const ProjectSprintsDocument = gql`
    query projectSprints($adapterType: ProjectAdapterType!, $boardId: Int!) {
  project(adapterType: $adapterType) {
    config {
      adapterType
    }
    sprints(boardId: $boardId) {
      ...ProjectSprintFragment
    }
  }
}
    ${ProjectSprintFragmentFragmentDoc}`;

/**
 * __useProjectSprintsQuery__
 *
 * To run a query within a React component, call `useProjectSprintsQuery` and pass it any options that fit your needs.
 * When your component renders, `useProjectSprintsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProjectSprintsQuery({
 *   variables: {
 *      adapterType: // value for 'adapterType'
 *      boardId: // value for 'boardId'
 *   },
 * });
 */
export function useProjectSprintsQuery(
  baseOptions: Apollo.QueryHookOptions<
    IProjectSprintsQuery,
    IProjectSprintsQueryVariables
  > &
    (
      | { variables: IProjectSprintsQueryVariables; skip?: boolean }
      | { skip: boolean }
    ),
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<IProjectSprintsQuery, IProjectSprintsQueryVariables>(
    ProjectSprintsDocument,
    options,
  );
}
export function useProjectSprintsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    IProjectSprintsQuery,
    IProjectSprintsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    IProjectSprintsQuery,
    IProjectSprintsQueryVariables
  >(ProjectSprintsDocument, options);
}
export function useProjectSprintsSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<
    IProjectSprintsQuery,
    IProjectSprintsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    IProjectSprintsQuery,
    IProjectSprintsQueryVariables
  >(ProjectSprintsDocument, options);
}
export type ProjectSprintsQueryHookResult = ReturnType<
  typeof useProjectSprintsQuery
>;
export type ProjectSprintsLazyQueryHookResult = ReturnType<
  typeof useProjectSprintsLazyQuery
>;
export type ProjectSprintsSuspenseQueryHookResult = ReturnType<
  typeof useProjectSprintsSuspenseQuery
>;
export type ProjectSprintsQueryResult = Apollo.QueryResult<
  IProjectSprintsQuery,
  IProjectSprintsQueryVariables
>;
export const ProjectIssuesDocument = gql`
    query projectIssues($adapterType: ProjectAdapterType!, $sprintId: Int!) {
  project(adapterType: $adapterType) {
    config {
      adapterType
    }
    issues(sprintId: $sprintId) {
      id
      key
      type
      state
      title
      storyPoints
      implementer {
        id
        name
        email
      }
      sprints {
        ...ProjectSprintFragment
      }
      statusDurations {
        status
        workingDays
        workingDuration
        fullDuration
      }
    }
  }
}
    ${ProjectSprintFragmentFragmentDoc}`;

/**
 * __useProjectIssuesQuery__
 *
 * To run a query within a React component, call `useProjectIssuesQuery` and pass it any options that fit your needs.
 * When your component renders, `useProjectIssuesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProjectIssuesQuery({
 *   variables: {
 *      adapterType: // value for 'adapterType'
 *      sprintId: // value for 'sprintId'
 *   },
 * });
 */
export function useProjectIssuesQuery(
  baseOptions: Apollo.QueryHookOptions<
    IProjectIssuesQuery,
    IProjectIssuesQueryVariables
  > &
    (
      | { variables: IProjectIssuesQueryVariables; skip?: boolean }
      | { skip: boolean }
    ),
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<IProjectIssuesQuery, IProjectIssuesQueryVariables>(
    ProjectIssuesDocument,
    options,
  );
}
export function useProjectIssuesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    IProjectIssuesQuery,
    IProjectIssuesQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<IProjectIssuesQuery, IProjectIssuesQueryVariables>(
    ProjectIssuesDocument,
    options,
  );
}
export function useProjectIssuesSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<
    IProjectIssuesQuery,
    IProjectIssuesQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    IProjectIssuesQuery,
    IProjectIssuesQueryVariables
  >(ProjectIssuesDocument, options);
}
export type ProjectIssuesQueryHookResult = ReturnType<
  typeof useProjectIssuesQuery
>;
export type ProjectIssuesLazyQueryHookResult = ReturnType<
  typeof useProjectIssuesLazyQuery
>;
export type ProjectIssuesSuspenseQueryHookResult = ReturnType<
  typeof useProjectIssuesSuspenseQuery
>;
export type ProjectIssuesQueryResult = Apollo.QueryResult<
  IProjectIssuesQuery,
  IProjectIssuesQueryVariables
>;
