import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
type Maybe<T> = T | undefined;
type InputMaybe<T> = T | undefined;
type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = {
  [_ in K]?: never;
};
type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never;
    };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  DateTime: { input: Date; output: Date };
};

enum IAuthPermission {
  AdminMedia = "ADMIN_MEDIA",
  AdminNotes = "ADMIN_NOTES",
  AdminRoles = "ADMIN_ROLES",
  AdminSteam = "ADMIN_STEAM",
  AdminUsers = "ADMIN_USERS",
  Media = "MEDIA",
  Notes = "NOTES",
  Projects = "PROJECTS",
}

type IAuthToken = {
  __typename?: "AuthToken";
  token: Scalars["String"]["output"];
  user: IUser;
  userId: Scalars["ID"]["output"];
};

type IAuthTokenGoogleParams = {
  idToken: Scalars["String"]["input"];
};

type IAuthTokenLocalParams = {
  password: Scalars["String"]["input"];
  username: Scalars["String"]["input"];
};

type IAuthTokenParams = {
  google?: InputMaybe<IAuthTokenGoogleParams>;
  local?: InputMaybe<IAuthTokenLocalParams>;
  userId?: InputMaybe<Scalars["ID"]["input"]>;
};

type IConfig = {
  __typename?: "Config";
  createAnonymousUsers: Scalars["Boolean"]["output"];
  mediaDataLimit?: Maybe<Scalars["Float"]["output"]>;
};

type ICreateUserParams = {
  email: Scalars["String"]["input"];
  password?: InputMaybe<Scalars["String"]["input"]>;
  username?: InputMaybe<Scalars["String"]["input"]>;
};

type IMediaItem = {
  __typename?: "MediaItem";
  children?: Maybe<IMediaItem[]>;
  key: Scalars["String"]["output"];
  type: IMediaItemType;
};

enum IMediaItemType {
  Directory = "DIRECTORY",
  File = "FILE",
  Series = "SERIES",
}

type IMutation = {
  __typename?: "Mutation";
  addMediaDownload: IProgress;
  createMedia: Scalars["Boolean"]["output"];
  createMediaUpload: Scalars["String"]["output"];
  createRole: IRole;
  createUser: IUser;
  deleteMedia: Scalars["Boolean"]["output"];
  deleteProjectConfig: Scalars["Boolean"]["output"];
  deleteRole: Scalars["Boolean"]["output"];
  fetchSteamGames: IProgress;
  updateProjectConfig: Scalars["Boolean"]["output"];
  updateRole: Scalars["Boolean"]["output"];
  updateRolePermissions: Scalars["Boolean"]["output"];
  updateUser: Scalars["Boolean"]["output"];
};

type IMutationAddMediaDownloadArgs = {
  destinationKey: Scalars["String"]["input"];
  sync?: InputMaybe<Scalars["Boolean"]["input"]>;
  url: Scalars["String"]["input"];
};

type IMutationCreateMediaArgs = {
  data: Scalars["String"]["input"];
  key: Scalars["String"]["input"];
};

type IMutationCreateMediaUploadArgs = {
  key: Scalars["String"]["input"];
};

type IMutationCreateRoleArgs = {
  name: Scalars["String"]["input"];
};

type IMutationCreateUserArgs = {
  params: ICreateUserParams;
};

type IMutationDeleteMediaArgs = {
  key: Scalars["String"]["input"];
};

type IMutationDeleteProjectConfigArgs = {
  adapterType: IProjectAdapterType;
};

type IMutationDeleteRoleArgs = {
  id: Scalars["ID"]["input"];
};

type IMutationUpdateProjectConfigArgs = {
  params: IUpdateProjectConfigParams;
};

type IMutationUpdateRoleArgs = {
  id: Scalars["ID"]["input"];
  name: Scalars["String"]["input"];
};

type IMutationUpdateRolePermissionsArgs = {
  id: Scalars["ID"]["input"];
  permissions: IAuthPermission[];
};

type IMutationUpdateUserArgs = {
  params: IUpdateUserParams;
};

type IProgress = {
  __typename?: "Progress";
  action: Scalars["String"]["output"];
  createdAt: Scalars["DateTime"]["output"];
  id: Scalars["ID"]["output"];
  logs: IProgressLog[];
  status: IProgressStatus;
};

type IProgressLog = {
  __typename?: "ProgressLog";
  createdAt: Scalars["DateTime"]["output"];
  text: Scalars["String"]["output"];
};

enum IProgressStatus {
  Complete = "COMPLETE",
  Created = "CREATED",
  Errored = "ERRORED",
  InProgress = "IN_PROGRESS",
}

type IProject = {
  __typename?: "Project";
  boards: IProjectBoard[];
  config: IProjectConfig;
  issues: IProjectIssue[];
  sprints: IProjectSprint[];
};

type IProjectIssuesArgs = {
  sprintId: Scalars["Int"]["input"];
};

type IProjectSprintsArgs = {
  boardId: Scalars["Int"]["input"];
};

enum IProjectAdapterType {
  Jira = "JIRA",
}

type IProjectBoard = {
  __typename?: "ProjectBoard";
  id: Scalars["Int"]["output"];
  name: Scalars["String"]["output"];
};

type IProjectConfig = {
  __typename?: "ProjectConfig";
  adapterType: IProjectAdapterType;
  apiToken: Scalars["String"]["output"];
  email: Scalars["String"]["output"];
  host: Scalars["String"]["output"];
};

type IProjectIssue = {
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

type IProjectIssueStatusDuration = {
  __typename?: "ProjectIssueStatusDuration";
  fullDuration: Scalars["Int"]["output"];
  status: Scalars["String"]["output"];
  workingDays: Scalars["Int"]["output"];
  workingDuration: Scalars["Int"]["output"];
};

type IProjectSprint = {
  __typename?: "ProjectSprint";
  end?: Maybe<Scalars["DateTime"]["output"]>;
  id: Scalars["Int"]["output"];
  name: Scalars["String"]["output"];
  start?: Maybe<Scalars["DateTime"]["output"]>;
  state: Scalars["String"]["output"];
};

type IProjectUser = {
  __typename?: "ProjectUser";
  email?: Maybe<Scalars["String"]["output"]>;
  id: Scalars["ID"]["output"];
  name: Scalars["String"]["output"];
};

type IQuery = {
  __typename?: "Query";
  authToken: IAuthToken;
  config: IConfig;
  mediaItem?: Maybe<IMediaItem>;
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

type IQueryAuthTokenArgs = {
  params: IAuthTokenParams;
};

type IQueryMediaItemArgs = {
  key: Scalars["String"]["input"];
};

type IQueryProgressArgs = {
  id: Scalars["ID"]["input"];
};

type IQueryProgressesArgs = {
  ids: Scalars["ID"]["input"][];
};

type IQueryProjectArgs = {
  adapterType: IProjectAdapterType;
};

type IQuerySteamGamesArgs = {
  page: Scalars["Int"]["input"];
  search: Scalars["String"]["input"];
};

type IQuerySteamPlayerArgs = {
  steamId64: Scalars["String"]["input"];
};

type IQuerySteamPlayersArgs = {
  steamIds64: Scalars["String"]["input"][];
};

type IQueryUserArgs = {
  id?: InputMaybe<Scalars["ID"]["input"]>;
};

type IRole = {
  __typename?: "Role";
  id: Scalars["ID"]["output"];
  name: Scalars["String"]["output"];
  permissions: IAuthPermission[];
};

type ISteamGame = {
  __typename?: "SteamGame";
  id: Scalars["Int"]["output"];
  name: Scalars["String"]["output"];
};

type ISteamPlayer = {
  __typename?: "SteamPlayer";
  avatarUrl: Scalars["String"]["output"];
  id: Scalars["String"]["output"];
  nickname: Scalars["String"]["output"];
  ownedGames: ISteamGame[];
  playingGame?: Maybe<ISteamGame>;
  profileUrl: Scalars["String"]["output"];
};

type IUpdateProjectConfigParams = {
  adapterType: IProjectAdapterType;
  apiToken: Scalars["String"]["input"];
  email: Scalars["String"]["input"];
  host: Scalars["String"]["input"];
};

type IUpdateUserParams = {
  email?: InputMaybe<Scalars["String"]["input"]>;
  id: Scalars["ID"]["input"];
  password?: InputMaybe<Scalars["String"]["input"]>;
  roleIds?: InputMaybe<Scalars["ID"]["input"][]>;
  username?: InputMaybe<Scalars["String"]["input"]>;
};

type IUser = {
  __typename?: "User";
  email: Scalars["String"]["output"];
  id: Scalars["ID"]["output"];
  permissions?: Maybe<IAuthPermission[]>;
  projectConfigs: IProjectConfig[];
  roles?: Maybe<IRole[]>;
  username?: Maybe<Scalars["String"]["output"]>;
};

type IGetAuthTokenQueryVariables = Exact<{
  params: IAuthTokenParams;
}>;

type IGetAuthTokenQuery = {
  __typename?: "Query";
  authToken: {
    __typename?: "AuthToken";
    token: string;
    user: {
      __typename?: "User";
      id: string;
      email: string;
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

type IAuthTokenFragment = {
  __typename?: "AuthToken";
  token: string;
  user: {
    __typename?: "User";
    id: string;
    email: string;
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

type IGetConfigQueryVariables = Exact<{ [key: string]: never }>;

type IGetConfigQuery = {
  __typename?: "Query";
  config: {
    __typename?: "Config";
    createAnonymousUsers: boolean;
    mediaDataLimit?: number | undefined;
  };
};

type IGetBaseMediaItemQueryVariables = Exact<{
  key: Scalars["String"]["input"];
}>;

type IGetBaseMediaItemQuery = {
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

type IGetDeepMediaItemQueryVariables = Exact<{
  key: Scalars["String"]["input"];
}>;

type IGetDeepMediaItemQuery = {
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
              children?:
                | Array<{
                    __typename?: "MediaItem";
                    key: string;
                    type: IMediaItemType;
                  }>
                | undefined;
            }>
          | undefined;
      }
    | undefined;
};

type ICreateMediaUploadMutationVariables = Exact<{
  key: Scalars["String"]["input"];
}>;

type ICreateMediaUploadMutation = {
  __typename?: "Mutation";
  uploadUrl: string;
};

type IDeleteMediaMutationVariables = Exact<{
  key: Scalars["String"]["input"];
}>;

type IDeleteMediaMutation = { __typename?: "Mutation"; deleteMedia: boolean };

type IAddMediaDownloadMutationVariables = Exact<{
  url: Scalars["String"]["input"];
  destinationKey: Scalars["String"]["input"];
  sync: Scalars["Boolean"]["input"];
}>;

type IAddMediaDownloadMutation = {
  __typename?: "Mutation";
  progress: { __typename?: "Progress"; id: string };
};

type ICreateMediaMutationVariables = Exact<{
  key: Scalars["String"]["input"];
  data: Scalars["String"]["input"];
}>;

type ICreateMediaMutation = { __typename?: "Mutation"; created: boolean };

type IBaseMediaItemFragment = {
  __typename?: "MediaItem";
  key: string;
  type: IMediaItemType;
  children?:
    | Array<{ __typename?: "MediaItem"; key: string; type: IMediaItemType }>
    | undefined;
};

type IDeepMediaItemFragment = {
  __typename?: "MediaItem";
  key: string;
  type: IMediaItemType;
  children?:
    | Array<{
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
      }>
    | undefined;
};

type IUpdateProjectConfigMutationVariables = Exact<{
  params: IUpdateProjectConfigParams;
}>;

type IUpdateProjectConfigMutation = {
  __typename?: "Mutation";
  updated: boolean;
};

type IDeleteProjectConfigMutationVariables = Exact<{
  adapterType: IProjectAdapterType;
}>;

type IDeleteProjectConfigMutation = {
  __typename?: "Mutation";
  deleted: boolean;
};

type IGetProjectConfigsQueryVariables = Exact<{ [key: string]: never }>;

type IGetProjectConfigsQuery = {
  __typename?: "Query";
  user: {
    __typename?: "User";
    projectConfigs: Array<{
      __typename?: "ProjectConfig";
      apiToken: string;
      adapterType: IProjectAdapterType;
      host: string;
      email: string;
    }>;
  };
};

type IGetProjectBoardsQueryVariables = Exact<{
  adapterType: IProjectAdapterType;
}>;

type IGetProjectBoardsQuery = {
  __typename?: "Query";
  project: {
    __typename?: "Project";
    config: {
      __typename?: "ProjectConfig";
      adapterType: IProjectAdapterType;
      host: string;
      email: string;
    };
    boards: Array<{ __typename?: "ProjectBoard"; id: number; name: string }>;
  };
};

type IGetProjectBoardQueryVariables = Exact<{
  adapterType: IProjectAdapterType;
  boardId: Scalars["Int"]["input"];
}>;

type IGetProjectBoardQuery = {
  __typename?: "Query";
  project: {
    __typename?: "Project";
    config: {
      __typename?: "ProjectConfig";
      adapterType: IProjectAdapterType;
      host: string;
      email: string;
    };
    boards: Array<{ __typename?: "ProjectBoard"; id: number; name: string }>;
    sprints: Array<{
      __typename?: "ProjectSprint";
      id: number;
      name: string;
      state: string;
      start?: Date | undefined;
      end?: Date | undefined;
    }>;
  };
};

type IGetProjectSprintQueryVariables = Exact<{
  adapterType: IProjectAdapterType;
  boardId: Scalars["Int"]["input"];
  sprintId: Scalars["Int"]["input"];
}>;

type IGetProjectSprintQuery = {
  __typename?: "Query";
  project: {
    __typename?: "Project";
    config: {
      __typename?: "ProjectConfig";
      adapterType: IProjectAdapterType;
      host: string;
      email: string;
    };
    boards: Array<{ __typename?: "ProjectBoard"; id: number; name: string }>;
    sprints: Array<{
      __typename?: "ProjectSprint";
      id: number;
      name: string;
      state: string;
      start?: Date | undefined;
      end?: Date | undefined;
    }>;
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
        start?: Date | undefined;
        end?: Date | undefined;
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

type IProjectConfigFragment = {
  __typename?: "ProjectConfig";
  adapterType: IProjectAdapterType;
  host: string;
  email: string;
};

type IProjectBoardFragment = {
  __typename?: "ProjectBoard";
  id: number;
  name: string;
};

type IProjectSprintFragment = {
  __typename?: "ProjectSprint";
  id: number;
  name: string;
  state: string;
  start?: Date | undefined;
  end?: Date | undefined;
};

type IProjectIssueFragment = {
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
    start?: Date | undefined;
    end?: Date | undefined;
  }>;
  statusDurations: Array<{
    __typename?: "ProjectIssueStatusDuration";
    status: string;
    workingDays: number;
    workingDuration: number;
    fullDuration: number;
  }>;
};

type ICreateUserMutationVariables = Exact<{
  params: ICreateUserParams;
}>;

type ICreateUserMutation = {
  __typename?: "Mutation";
  created: { __typename?: "User"; id: string };
};

type IUpdateUserMutationVariables = Exact<{
  params: IUpdateUserParams;
}>;

type IUpdateUserMutation = { __typename?: "Mutation"; updated: boolean };

export const AuthTokenFragmentDoc = gql`
    fragment AuthToken on AuthToken {
  token
  user {
    id
    email
    username
    roles {
      id
      name
      permissions
    }
  }
}
    `;
export const BaseMediaItemFragmentDoc = gql`
    fragment BaseMediaItem on MediaItem {
  key
  type
  children {
    key
    type
  }
}
    `;
export const DeepMediaItemFragmentDoc = gql`
    fragment DeepMediaItem on MediaItem {
  key
  type
  children {
    key
    type
    children {
      key
      type
    }
  }
}
    `;
export const ProjectConfigFragmentDoc = gql`
    fragment ProjectConfig on ProjectConfig {
  adapterType
  host
  email
}
    `;
export const ProjectBoardFragmentDoc = gql`
    fragment ProjectBoard on ProjectBoard {
  id
  name
}
    `;
export const ProjectSprintFragmentDoc = gql`
    fragment ProjectSprint on ProjectSprint {
  id
  name
  state
  start
  end
}
    `;
export const ProjectIssueFragmentDoc = gql`
    fragment ProjectIssue on ProjectIssue {
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
    ...ProjectSprint
  }
  statusDurations {
    status
    workingDays
    workingDuration
    fullDuration
  }
}
    ${ProjectSprintFragmentDoc}`;
const GetAuthTokenDocument = gql`
    query getAuthToken($params: AuthTokenParams!) {
  authToken(params: $params) {
    ...AuthToken
  }
}
    ${AuthTokenFragmentDoc}`;

/**
 * __useGetAuthTokenQuery__
 *
 * To run a query within a React component, call `useGetAuthTokenQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAuthTokenQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAuthTokenQuery({
 *   variables: {
 *      params: // value for 'params'
 *   },
 * });
 */
export function useGetAuthTokenQuery(
  baseOptions: Apollo.QueryHookOptions<
    IGetAuthTokenQuery,
    IGetAuthTokenQueryVariables
  > &
    (
      | { variables: IGetAuthTokenQueryVariables; skip?: boolean }
      | { skip: boolean }
    ),
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<IGetAuthTokenQuery, IGetAuthTokenQueryVariables>(
    GetAuthTokenDocument,
    options,
  );
}
export function useGetAuthTokenLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    IGetAuthTokenQuery,
    IGetAuthTokenQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<IGetAuthTokenQuery, IGetAuthTokenQueryVariables>(
    GetAuthTokenDocument,
    options,
  );
}
export function useGetAuthTokenSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        IGetAuthTokenQuery,
        IGetAuthTokenQueryVariables
      >,
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    IGetAuthTokenQuery,
    IGetAuthTokenQueryVariables
  >(GetAuthTokenDocument, options);
}
export type GetAuthTokenQueryHookResult = ReturnType<
  typeof useGetAuthTokenQuery
>;
export type GetAuthTokenLazyQueryHookResult = ReturnType<
  typeof useGetAuthTokenLazyQuery
>;
export type GetAuthTokenSuspenseQueryHookResult = ReturnType<
  typeof useGetAuthTokenSuspenseQuery
>;
export type GetAuthTokenQueryResult = Apollo.QueryResult<
  IGetAuthTokenQuery,
  IGetAuthTokenQueryVariables
>;
const GetConfigDocument = gql`
    query getConfig {
  config {
    createAnonymousUsers
    mediaDataLimit
  }
}
    `;

/**
 * __useGetConfigQuery__
 *
 * To run a query within a React component, call `useGetConfigQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetConfigQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetConfigQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetConfigQuery(
  baseOptions?: Apollo.QueryHookOptions<
    IGetConfigQuery,
    IGetConfigQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<IGetConfigQuery, IGetConfigQueryVariables>(
    GetConfigDocument,
    options,
  );
}
export function useGetConfigLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    IGetConfigQuery,
    IGetConfigQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<IGetConfigQuery, IGetConfigQueryVariables>(
    GetConfigDocument,
    options,
  );
}
export function useGetConfigSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        IGetConfigQuery,
        IGetConfigQueryVariables
      >,
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<IGetConfigQuery, IGetConfigQueryVariables>(
    GetConfigDocument,
    options,
  );
}
export type GetConfigQueryHookResult = ReturnType<typeof useGetConfigQuery>;
export type GetConfigLazyQueryHookResult = ReturnType<
  typeof useGetConfigLazyQuery
>;
export type GetConfigSuspenseQueryHookResult = ReturnType<
  typeof useGetConfigSuspenseQuery
>;
export type GetConfigQueryResult = Apollo.QueryResult<
  IGetConfigQuery,
  IGetConfigQueryVariables
>;
const GetBaseMediaItemDocument = gql`
    query getBaseMediaItem($key: String!) {
  mediaItem(key: $key) {
    ...BaseMediaItem
  }
}
    ${BaseMediaItemFragmentDoc}`;

/**
 * __useGetBaseMediaItemQuery__
 *
 * To run a query within a React component, call `useGetBaseMediaItemQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBaseMediaItemQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBaseMediaItemQuery({
 *   variables: {
 *      key: // value for 'key'
 *   },
 * });
 */
export function useGetBaseMediaItemQuery(
  baseOptions: Apollo.QueryHookOptions<
    IGetBaseMediaItemQuery,
    IGetBaseMediaItemQueryVariables
  > &
    (
      | { variables: IGetBaseMediaItemQueryVariables; skip?: boolean }
      | { skip: boolean }
    ),
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    IGetBaseMediaItemQuery,
    IGetBaseMediaItemQueryVariables
  >(GetBaseMediaItemDocument, options);
}
export function useGetBaseMediaItemLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    IGetBaseMediaItemQuery,
    IGetBaseMediaItemQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    IGetBaseMediaItemQuery,
    IGetBaseMediaItemQueryVariables
  >(GetBaseMediaItemDocument, options);
}
export function useGetBaseMediaItemSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        IGetBaseMediaItemQuery,
        IGetBaseMediaItemQueryVariables
      >,
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    IGetBaseMediaItemQuery,
    IGetBaseMediaItemQueryVariables
  >(GetBaseMediaItemDocument, options);
}
export type GetBaseMediaItemQueryHookResult = ReturnType<
  typeof useGetBaseMediaItemQuery
>;
export type GetBaseMediaItemLazyQueryHookResult = ReturnType<
  typeof useGetBaseMediaItemLazyQuery
>;
export type GetBaseMediaItemSuspenseQueryHookResult = ReturnType<
  typeof useGetBaseMediaItemSuspenseQuery
>;
export type GetBaseMediaItemQueryResult = Apollo.QueryResult<
  IGetBaseMediaItemQuery,
  IGetBaseMediaItemQueryVariables
>;
const GetDeepMediaItemDocument = gql`
    query getDeepMediaItem($key: String!) {
  mediaItem(key: $key) {
    ...DeepMediaItem
  }
}
    ${DeepMediaItemFragmentDoc}`;

/**
 * __useGetDeepMediaItemQuery__
 *
 * To run a query within a React component, call `useGetDeepMediaItemQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetDeepMediaItemQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetDeepMediaItemQuery({
 *   variables: {
 *      key: // value for 'key'
 *   },
 * });
 */
export function useGetDeepMediaItemQuery(
  baseOptions: Apollo.QueryHookOptions<
    IGetDeepMediaItemQuery,
    IGetDeepMediaItemQueryVariables
  > &
    (
      | { variables: IGetDeepMediaItemQueryVariables; skip?: boolean }
      | { skip: boolean }
    ),
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    IGetDeepMediaItemQuery,
    IGetDeepMediaItemQueryVariables
  >(GetDeepMediaItemDocument, options);
}
export function useGetDeepMediaItemLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    IGetDeepMediaItemQuery,
    IGetDeepMediaItemQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    IGetDeepMediaItemQuery,
    IGetDeepMediaItemQueryVariables
  >(GetDeepMediaItemDocument, options);
}
export function useGetDeepMediaItemSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        IGetDeepMediaItemQuery,
        IGetDeepMediaItemQueryVariables
      >,
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    IGetDeepMediaItemQuery,
    IGetDeepMediaItemQueryVariables
  >(GetDeepMediaItemDocument, options);
}
export type GetDeepMediaItemQueryHookResult = ReturnType<
  typeof useGetDeepMediaItemQuery
>;
export type GetDeepMediaItemLazyQueryHookResult = ReturnType<
  typeof useGetDeepMediaItemLazyQuery
>;
export type GetDeepMediaItemSuspenseQueryHookResult = ReturnType<
  typeof useGetDeepMediaItemSuspenseQuery
>;
export type GetDeepMediaItemQueryResult = Apollo.QueryResult<
  IGetDeepMediaItemQuery,
  IGetDeepMediaItemQueryVariables
>;
const CreateMediaUploadDocument = gql`
    mutation createMediaUpload($key: String!) {
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
const DeleteMediaDocument = gql`
    mutation deleteMedia($key: String!) {
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
const AddMediaDownloadDocument = gql`
    mutation addMediaDownload($url: String!, $destinationKey: String!, $sync: Boolean!) {
  progress: addMediaDownload(
    url: $url
    destinationKey: $destinationKey
    sync: $sync
  ) {
    id
  }
}
    `;
export type IAddMediaDownloadMutationFn = Apollo.MutationFunction<
  IAddMediaDownloadMutation,
  IAddMediaDownloadMutationVariables
>;

/**
 * __useAddMediaDownloadMutation__
 *
 * To run a mutation, you first call `useAddMediaDownloadMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddMediaDownloadMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addMediaDownloadMutation, { data, loading, error }] = useAddMediaDownloadMutation({
 *   variables: {
 *      url: // value for 'url'
 *      destinationKey: // value for 'destinationKey'
 *      sync: // value for 'sync'
 *   },
 * });
 */
export function useAddMediaDownloadMutation(
  baseOptions?: Apollo.MutationHookOptions<
    IAddMediaDownloadMutation,
    IAddMediaDownloadMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    IAddMediaDownloadMutation,
    IAddMediaDownloadMutationVariables
  >(AddMediaDownloadDocument, options);
}
export type AddMediaDownloadMutationHookResult = ReturnType<
  typeof useAddMediaDownloadMutation
>;
export type AddMediaDownloadMutationResult =
  Apollo.MutationResult<IAddMediaDownloadMutation>;
export type AddMediaDownloadMutationOptions = Apollo.BaseMutationOptions<
  IAddMediaDownloadMutation,
  IAddMediaDownloadMutationVariables
>;
const CreateMediaDocument = gql`
    mutation createMedia($key: String!, $data: String!) {
  created: createMedia(key: $key, data: $data)
}
    `;
export type ICreateMediaMutationFn = Apollo.MutationFunction<
  ICreateMediaMutation,
  ICreateMediaMutationVariables
>;

/**
 * __useCreateMediaMutation__
 *
 * To run a mutation, you first call `useCreateMediaMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateMediaMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createMediaMutation, { data, loading, error }] = useCreateMediaMutation({
 *   variables: {
 *      key: // value for 'key'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateMediaMutation(
  baseOptions?: Apollo.MutationHookOptions<
    ICreateMediaMutation,
    ICreateMediaMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    ICreateMediaMutation,
    ICreateMediaMutationVariables
  >(CreateMediaDocument, options);
}
export type CreateMediaMutationHookResult = ReturnType<
  typeof useCreateMediaMutation
>;
export type CreateMediaMutationResult =
  Apollo.MutationResult<ICreateMediaMutation>;
export type CreateMediaMutationOptions = Apollo.BaseMutationOptions<
  ICreateMediaMutation,
  ICreateMediaMutationVariables
>;
const UpdateProjectConfigDocument = gql`
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
const DeleteProjectConfigDocument = gql`
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
const GetProjectConfigsDocument = gql`
    query getProjectConfigs {
  user {
    projectConfigs {
      ...ProjectConfig
      apiToken
    }
  }
}
    ${ProjectConfigFragmentDoc}`;

/**
 * __useGetProjectConfigsQuery__
 *
 * To run a query within a React component, call `useGetProjectConfigsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProjectConfigsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProjectConfigsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetProjectConfigsQuery(
  baseOptions?: Apollo.QueryHookOptions<
    IGetProjectConfigsQuery,
    IGetProjectConfigsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    IGetProjectConfigsQuery,
    IGetProjectConfigsQueryVariables
  >(GetProjectConfigsDocument, options);
}
export function useGetProjectConfigsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    IGetProjectConfigsQuery,
    IGetProjectConfigsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    IGetProjectConfigsQuery,
    IGetProjectConfigsQueryVariables
  >(GetProjectConfigsDocument, options);
}
export function useGetProjectConfigsSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        IGetProjectConfigsQuery,
        IGetProjectConfigsQueryVariables
      >,
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    IGetProjectConfigsQuery,
    IGetProjectConfigsQueryVariables
  >(GetProjectConfigsDocument, options);
}
export type GetProjectConfigsQueryHookResult = ReturnType<
  typeof useGetProjectConfigsQuery
>;
export type GetProjectConfigsLazyQueryHookResult = ReturnType<
  typeof useGetProjectConfigsLazyQuery
>;
export type GetProjectConfigsSuspenseQueryHookResult = ReturnType<
  typeof useGetProjectConfigsSuspenseQuery
>;
export type GetProjectConfigsQueryResult = Apollo.QueryResult<
  IGetProjectConfigsQuery,
  IGetProjectConfigsQueryVariables
>;
const GetProjectBoardsDocument = gql`
    query getProjectBoards($adapterType: ProjectAdapterType!) {
  project(adapterType: $adapterType) {
    config {
      ...ProjectConfig
    }
    boards {
      ...ProjectBoard
    }
  }
}
    ${ProjectConfigFragmentDoc}
${ProjectBoardFragmentDoc}`;

/**
 * __useGetProjectBoardsQuery__
 *
 * To run a query within a React component, call `useGetProjectBoardsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProjectBoardsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProjectBoardsQuery({
 *   variables: {
 *      adapterType: // value for 'adapterType'
 *   },
 * });
 */
export function useGetProjectBoardsQuery(
  baseOptions: Apollo.QueryHookOptions<
    IGetProjectBoardsQuery,
    IGetProjectBoardsQueryVariables
  > &
    (
      | { variables: IGetProjectBoardsQueryVariables; skip?: boolean }
      | { skip: boolean }
    ),
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    IGetProjectBoardsQuery,
    IGetProjectBoardsQueryVariables
  >(GetProjectBoardsDocument, options);
}
export function useGetProjectBoardsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    IGetProjectBoardsQuery,
    IGetProjectBoardsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    IGetProjectBoardsQuery,
    IGetProjectBoardsQueryVariables
  >(GetProjectBoardsDocument, options);
}
export function useGetProjectBoardsSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        IGetProjectBoardsQuery,
        IGetProjectBoardsQueryVariables
      >,
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    IGetProjectBoardsQuery,
    IGetProjectBoardsQueryVariables
  >(GetProjectBoardsDocument, options);
}
export type GetProjectBoardsQueryHookResult = ReturnType<
  typeof useGetProjectBoardsQuery
>;
export type GetProjectBoardsLazyQueryHookResult = ReturnType<
  typeof useGetProjectBoardsLazyQuery
>;
export type GetProjectBoardsSuspenseQueryHookResult = ReturnType<
  typeof useGetProjectBoardsSuspenseQuery
>;
export type GetProjectBoardsQueryResult = Apollo.QueryResult<
  IGetProjectBoardsQuery,
  IGetProjectBoardsQueryVariables
>;
const GetProjectBoardDocument = gql`
    query getProjectBoard($adapterType: ProjectAdapterType!, $boardId: Int!) {
  project(adapterType: $adapterType) {
    config {
      ...ProjectConfig
    }
    boards {
      ...ProjectBoard
    }
    sprints(boardId: $boardId) {
      ...ProjectSprint
    }
  }
}
    ${ProjectConfigFragmentDoc}
${ProjectBoardFragmentDoc}
${ProjectSprintFragmentDoc}`;

/**
 * __useGetProjectBoardQuery__
 *
 * To run a query within a React component, call `useGetProjectBoardQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProjectBoardQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProjectBoardQuery({
 *   variables: {
 *      adapterType: // value for 'adapterType'
 *      boardId: // value for 'boardId'
 *   },
 * });
 */
export function useGetProjectBoardQuery(
  baseOptions: Apollo.QueryHookOptions<
    IGetProjectBoardQuery,
    IGetProjectBoardQueryVariables
  > &
    (
      | { variables: IGetProjectBoardQueryVariables; skip?: boolean }
      | { skip: boolean }
    ),
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<IGetProjectBoardQuery, IGetProjectBoardQueryVariables>(
    GetProjectBoardDocument,
    options,
  );
}
export function useGetProjectBoardLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    IGetProjectBoardQuery,
    IGetProjectBoardQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    IGetProjectBoardQuery,
    IGetProjectBoardQueryVariables
  >(GetProjectBoardDocument, options);
}
export function useGetProjectBoardSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        IGetProjectBoardQuery,
        IGetProjectBoardQueryVariables
      >,
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    IGetProjectBoardQuery,
    IGetProjectBoardQueryVariables
  >(GetProjectBoardDocument, options);
}
export type GetProjectBoardQueryHookResult = ReturnType<
  typeof useGetProjectBoardQuery
>;
export type GetProjectBoardLazyQueryHookResult = ReturnType<
  typeof useGetProjectBoardLazyQuery
>;
export type GetProjectBoardSuspenseQueryHookResult = ReturnType<
  typeof useGetProjectBoardSuspenseQuery
>;
export type GetProjectBoardQueryResult = Apollo.QueryResult<
  IGetProjectBoardQuery,
  IGetProjectBoardQueryVariables
>;
const GetProjectSprintDocument = gql`
    query getProjectSprint($adapterType: ProjectAdapterType!, $boardId: Int!, $sprintId: Int!) {
  project(adapterType: $adapterType) {
    config {
      ...ProjectConfig
    }
    boards {
      ...ProjectBoard
    }
    sprints(boardId: $boardId) {
      ...ProjectSprint
    }
    issues(sprintId: $sprintId) {
      ...ProjectIssue
    }
  }
}
    ${ProjectConfigFragmentDoc}
${ProjectBoardFragmentDoc}
${ProjectSprintFragmentDoc}
${ProjectIssueFragmentDoc}`;

/**
 * __useGetProjectSprintQuery__
 *
 * To run a query within a React component, call `useGetProjectSprintQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProjectSprintQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProjectSprintQuery({
 *   variables: {
 *      adapterType: // value for 'adapterType'
 *      boardId: // value for 'boardId'
 *      sprintId: // value for 'sprintId'
 *   },
 * });
 */
export function useGetProjectSprintQuery(
  baseOptions: Apollo.QueryHookOptions<
    IGetProjectSprintQuery,
    IGetProjectSprintQueryVariables
  > &
    (
      | { variables: IGetProjectSprintQueryVariables; skip?: boolean }
      | { skip: boolean }
    ),
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    IGetProjectSprintQuery,
    IGetProjectSprintQueryVariables
  >(GetProjectSprintDocument, options);
}
export function useGetProjectSprintLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    IGetProjectSprintQuery,
    IGetProjectSprintQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    IGetProjectSprintQuery,
    IGetProjectSprintQueryVariables
  >(GetProjectSprintDocument, options);
}
export function useGetProjectSprintSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        IGetProjectSprintQuery,
        IGetProjectSprintQueryVariables
      >,
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    IGetProjectSprintQuery,
    IGetProjectSprintQueryVariables
  >(GetProjectSprintDocument, options);
}
export type GetProjectSprintQueryHookResult = ReturnType<
  typeof useGetProjectSprintQuery
>;
export type GetProjectSprintLazyQueryHookResult = ReturnType<
  typeof useGetProjectSprintLazyQuery
>;
export type GetProjectSprintSuspenseQueryHookResult = ReturnType<
  typeof useGetProjectSprintSuspenseQuery
>;
export type GetProjectSprintQueryResult = Apollo.QueryResult<
  IGetProjectSprintQuery,
  IGetProjectSprintQueryVariables
>;
const CreateUserDocument = gql`
    mutation createUser($params: CreateUserParams!) {
  created: createUser(params: $params) {
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
 *      params: // value for 'params'
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
const UpdateUserDocument = gql`
    mutation updateUser($params: UpdateUserParams!) {
  updated: updateUser(params: $params)
}
    `;
export type IUpdateUserMutationFn = Apollo.MutationFunction<
  IUpdateUserMutation,
  IUpdateUserMutationVariables
>;

/**
 * __useUpdateUserMutation__
 *
 * To run a mutation, you first call `useUpdateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserMutation, { data, loading, error }] = useUpdateUserMutation({
 *   variables: {
 *      params: // value for 'params'
 *   },
 * });
 */
export function useUpdateUserMutation(
  baseOptions?: Apollo.MutationHookOptions<
    IUpdateUserMutation,
    IUpdateUserMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<IUpdateUserMutation, IUpdateUserMutationVariables>(
    UpdateUserDocument,
    options,
  );
}
export type UpdateUserMutationHookResult = ReturnType<
  typeof useUpdateUserMutation
>;
export type UpdateUserMutationResult =
  Apollo.MutationResult<IUpdateUserMutation>;
export type UpdateUserMutationOptions = Apollo.BaseMutationOptions<
  IUpdateUserMutation,
  IUpdateUserMutationVariables
>;
