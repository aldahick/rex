import { GraphQLClient, RequestOptions } from "graphql-request";
import { gql } from "graphql-request";
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
type GraphQLClientRequestHeaders = RequestOptions["requestHeaders"];
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  DateTime: { input: Date; output: Date };
};

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

export type IAuthTokenGoogleParams = {
  idToken: Scalars["String"]["input"];
};

export type IAuthTokenLocalParams = {
  password: Scalars["String"]["input"];
  username: Scalars["String"]["input"];
};

export type IAuthTokenParams = {
  google?: InputMaybe<IAuthTokenGoogleParams>;
  local?: InputMaybe<IAuthTokenLocalParams>;
  userId?: InputMaybe<Scalars["ID"]["input"]>;
};

export type IConfig = {
  __typename?: "Config";
  createAnonymousUsers: Scalars["Boolean"]["output"];
  mediaDataLimit?: Maybe<Scalars["Float"]["output"]>;
};

export type ICreateUserParams = {
  email: Scalars["String"]["input"];
  password?: InputMaybe<Scalars["String"]["input"]>;
  username?: InputMaybe<Scalars["String"]["input"]>;
};

export type IMediaItem = {
  __typename?: "MediaItem";
  children?: Maybe<IMediaItem[]>;
  /** Duration of this media in seconds. Only set for video and audio files. */
  duration?: Maybe<Scalars["Int"]["output"]>;
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

export type IMutationAddMediaDownloadArgs = {
  destinationKey: Scalars["String"]["input"];
  sync?: InputMaybe<Scalars["Boolean"]["input"]>;
  url: Scalars["String"]["input"];
};

export type IMutationCreateMediaArgs = {
  data: Scalars["String"]["input"];
  key: Scalars["String"]["input"];
};

export type IMutationCreateMediaUploadArgs = {
  key: Scalars["String"]["input"];
};

export type IMutationCreateRoleArgs = {
  name: Scalars["String"]["input"];
};

export type IMutationCreateUserArgs = {
  params: ICreateUserParams;
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

export type IMutationUpdateUserArgs = {
  params: IUpdateUserParams;
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

export type IQueryAuthTokenArgs = {
  params: IAuthTokenParams;
};

export type IQueryMediaItemArgs = {
  key: Scalars["String"]["input"];
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

export type IUpdateUserParams = {
  email?: InputMaybe<Scalars["String"]["input"]>;
  id: Scalars["ID"]["input"];
  password?: InputMaybe<Scalars["String"]["input"]>;
  roleIds?: InputMaybe<Scalars["ID"]["input"][]>;
  username?: InputMaybe<Scalars["String"]["input"]>;
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

export type IGetAuthTokenQueryVariables = Exact<{
  params: IAuthTokenParams;
}>;

export type IGetAuthTokenQuery = {
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

export type IAuthTokenFragment = {
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

export type IGetConfigQueryVariables = Exact<{ [key: string]: never }>;

export type IGetConfigQuery = {
  __typename?: "Query";
  config: {
    __typename?: "Config";
    createAnonymousUsers: boolean;
    mediaDataLimit?: number | undefined;
  };
};

export type IGetBaseMediaItemQueryVariables = Exact<{
  key: Scalars["String"]["input"];
}>;

export type IGetBaseMediaItemQuery = {
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
              duration?: number | undefined;
            }>
          | undefined;
      }
    | undefined;
};

export type IGetDeepMediaItemQueryVariables = Exact<{
  key: Scalars["String"]["input"];
}>;

export type IGetDeepMediaItemQuery = {
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

export type IAddMediaDownloadMutationVariables = Exact<{
  url: Scalars["String"]["input"];
  destinationKey: Scalars["String"]["input"];
  sync: Scalars["Boolean"]["input"];
}>;

export type IAddMediaDownloadMutation = {
  __typename?: "Mutation";
  progress: { __typename?: "Progress"; id: string };
};

export type ICreateMediaMutationVariables = Exact<{
  key: Scalars["String"]["input"];
  data: Scalars["String"]["input"];
}>;

export type ICreateMediaMutation = {
  __typename?: "Mutation";
  created: boolean;
};

export type IBaseMediaItemFragment = {
  __typename?: "MediaItem";
  key: string;
  type: IMediaItemType;
  children?:
    | Array<{
        __typename?: "MediaItem";
        key: string;
        type: IMediaItemType;
        duration?: number | undefined;
      }>
    | undefined;
};

export type IDeepMediaItemFragment = {
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

export type IGetProjectConfigsQueryVariables = Exact<{ [key: string]: never }>;

export type IGetProjectConfigsQuery = {
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

export type IGetProjectBoardsQueryVariables = Exact<{
  adapterType: IProjectAdapterType;
}>;

export type IGetProjectBoardsQuery = {
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

export type IGetProjectBoardQueryVariables = Exact<{
  adapterType: IProjectAdapterType;
  boardId: Scalars["Int"]["input"];
}>;

export type IGetProjectBoardQuery = {
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

export type IGetProjectSprintQueryVariables = Exact<{
  adapterType: IProjectAdapterType;
  boardId: Scalars["Int"]["input"];
  sprintId: Scalars["Int"]["input"];
}>;

export type IGetProjectSprintQuery = {
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

export type IProjectConfigFragment = {
  __typename?: "ProjectConfig";
  adapterType: IProjectAdapterType;
  host: string;
  email: string;
};

export type IProjectBoardFragment = {
  __typename?: "ProjectBoard";
  id: number;
  name: string;
};

export type IProjectSprintFragment = {
  __typename?: "ProjectSprint";
  id: number;
  name: string;
  state: string;
  start?: Date | undefined;
  end?: Date | undefined;
};

export type IProjectIssueFragment = {
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

export type ICreateUserMutationVariables = Exact<{
  params: ICreateUserParams;
}>;

export type ICreateUserMutation = {
  __typename?: "Mutation";
  created: { __typename?: "User"; id: string };
};

export type IUpdateUserMutationVariables = Exact<{
  params: IUpdateUserParams;
}>;

export type IUpdateUserMutation = { __typename?: "Mutation"; updated: boolean };

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
    duration
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
export const GetAuthTokenDocument = gql`
    query getAuthToken($params: AuthTokenParams!) {
  authToken(params: $params) {
    ...AuthToken
  }
}
    ${AuthTokenFragmentDoc}`;
export const GetConfigDocument = gql`
    query getConfig {
  config {
    createAnonymousUsers
    mediaDataLimit
  }
}
    `;
export const GetBaseMediaItemDocument = gql`
    query getBaseMediaItem($key: String!) {
  mediaItem(key: $key) {
    ...BaseMediaItem
  }
}
    ${BaseMediaItemFragmentDoc}`;
export const GetDeepMediaItemDocument = gql`
    query getDeepMediaItem($key: String!) {
  mediaItem(key: $key) {
    ...DeepMediaItem
  }
}
    ${DeepMediaItemFragmentDoc}`;
export const CreateMediaUploadDocument = gql`
    mutation createMediaUpload($key: String!) {
  uploadUrl: createMediaUpload(key: $key)
}
    `;
export const DeleteMediaDocument = gql`
    mutation deleteMedia($key: String!) {
  deleteMedia(key: $key)
}
    `;
export const AddMediaDownloadDocument = gql`
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
export const CreateMediaDocument = gql`
    mutation createMedia($key: String!, $data: String!) {
  created: createMedia(key: $key, data: $data)
}
    `;
export const UpdateProjectConfigDocument = gql`
    mutation updateProjectConfig($params: UpdateProjectConfigParams!) {
  updated: updateProjectConfig(params: $params)
}
    `;
export const DeleteProjectConfigDocument = gql`
    mutation deleteProjectConfig($adapterType: ProjectAdapterType!) {
  deleted: deleteProjectConfig(adapterType: $adapterType)
}
    `;
export const GetProjectConfigsDocument = gql`
    query getProjectConfigs {
  user {
    projectConfigs {
      ...ProjectConfig
      apiToken
    }
  }
}
    ${ProjectConfigFragmentDoc}`;
export const GetProjectBoardsDocument = gql`
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
export const GetProjectBoardDocument = gql`
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
export const GetProjectSprintDocument = gql`
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
export const CreateUserDocument = gql`
    mutation createUser($params: CreateUserParams!) {
  created: createUser(params: $params) {
    id
  }
}
    `;
export const UpdateUserDocument = gql`
    mutation updateUser($params: UpdateUserParams!) {
  updated: updateUser(params: $params)
}
    `;

export type SdkFunctionWrapper = <T>(
  action: (requestHeaders?: Record<string, string>) => Promise<T>,
  operationName: string,
  operationType?: string,
  variables?: any,
) => Promise<T>;

const defaultWrapper: SdkFunctionWrapper = (
  action,
  _operationName,
  _operationType,
  _variables,
) => action();

export function getSdk(
  client: GraphQLClient,
  withWrapper: SdkFunctionWrapper = defaultWrapper,
) {
  return {
    getAuthToken(
      variables: IGetAuthTokenQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<IGetAuthTokenQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<IGetAuthTokenQuery>(GetAuthTokenDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        "getAuthToken",
        "query",
        variables,
      );
    },
    getConfig(
      variables?: IGetConfigQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<IGetConfigQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<IGetConfigQuery>(GetConfigDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        "getConfig",
        "query",
        variables,
      );
    },
    getBaseMediaItem(
      variables: IGetBaseMediaItemQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<IGetBaseMediaItemQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<IGetBaseMediaItemQuery>(
            GetBaseMediaItemDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        "getBaseMediaItem",
        "query",
        variables,
      );
    },
    getDeepMediaItem(
      variables: IGetDeepMediaItemQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<IGetDeepMediaItemQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<IGetDeepMediaItemQuery>(
            GetDeepMediaItemDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        "getDeepMediaItem",
        "query",
        variables,
      );
    },
    createMediaUpload(
      variables: ICreateMediaUploadMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<ICreateMediaUploadMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<ICreateMediaUploadMutation>(
            CreateMediaUploadDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        "createMediaUpload",
        "mutation",
        variables,
      );
    },
    deleteMedia(
      variables: IDeleteMediaMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<IDeleteMediaMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<IDeleteMediaMutation>(DeleteMediaDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        "deleteMedia",
        "mutation",
        variables,
      );
    },
    addMediaDownload(
      variables: IAddMediaDownloadMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<IAddMediaDownloadMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<IAddMediaDownloadMutation>(
            AddMediaDownloadDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        "addMediaDownload",
        "mutation",
        variables,
      );
    },
    createMedia(
      variables: ICreateMediaMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<ICreateMediaMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<ICreateMediaMutation>(CreateMediaDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        "createMedia",
        "mutation",
        variables,
      );
    },
    updateProjectConfig(
      variables: IUpdateProjectConfigMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<IUpdateProjectConfigMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<IUpdateProjectConfigMutation>(
            UpdateProjectConfigDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        "updateProjectConfig",
        "mutation",
        variables,
      );
    },
    deleteProjectConfig(
      variables: IDeleteProjectConfigMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<IDeleteProjectConfigMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<IDeleteProjectConfigMutation>(
            DeleteProjectConfigDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        "deleteProjectConfig",
        "mutation",
        variables,
      );
    },
    getProjectConfigs(
      variables?: IGetProjectConfigsQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<IGetProjectConfigsQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<IGetProjectConfigsQuery>(
            GetProjectConfigsDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        "getProjectConfigs",
        "query",
        variables,
      );
    },
    getProjectBoards(
      variables: IGetProjectBoardsQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<IGetProjectBoardsQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<IGetProjectBoardsQuery>(
            GetProjectBoardsDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        "getProjectBoards",
        "query",
        variables,
      );
    },
    getProjectBoard(
      variables: IGetProjectBoardQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<IGetProjectBoardQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<IGetProjectBoardQuery>(
            GetProjectBoardDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        "getProjectBoard",
        "query",
        variables,
      );
    },
    getProjectSprint(
      variables: IGetProjectSprintQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<IGetProjectSprintQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<IGetProjectSprintQuery>(
            GetProjectSprintDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        "getProjectSprint",
        "query",
        variables,
      );
    },
    createUser(
      variables: ICreateUserMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<ICreateUserMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<ICreateUserMutation>(CreateUserDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        "createUser",
        "mutation",
        variables,
      );
    },
    updateUser(
      variables: IUpdateUserMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<IUpdateUserMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<IUpdateUserMutation>(UpdateUserDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        "updateUser",
        "mutation",
        variables,
      );
    },
  };
}
export type Sdk = ReturnType<typeof getSdk>;
