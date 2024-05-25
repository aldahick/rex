import { GraphQLClient, RequestOptions } from "graphql-request";
import { gql } from "graphql-request";
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
type GraphQLClientRequestHeaders = RequestOptions["requestHeaders"];
/** All built-in and custom scalars, mapped to their actual values */
type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  DateTime: { input: Date; output: Date };
};

enum IAuthClientType {
  Mobile = "MOBILE",
  Web = "WEB",
}

enum IAuthPermission {
  AdminMedia = "ADMIN_MEDIA",
  AdminNotes = "ADMIN_NOTES",
  AdminRoles = "ADMIN_ROLES",
  AdminSteam = "ADMIN_STEAM",
  AdminUsers = "ADMIN_USERS",
  Media = "MEDIA",
  Notes = "NOTES",
  Transcriptions = "TRANSCRIPTIONS",
}

type IAuthToken = {
  __typename?: "AuthToken";
  token: Scalars["String"]["output"];
  user: IUser;
  userId: Scalars["ID"]["output"];
};

type IConfig = {
  __typename?: "Config";
  createAnonymousUsers: Scalars["Boolean"]["output"];
  mediaDataLimit?: Maybe<Scalars["Int"]["output"]>;
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

type IMutationAddMediaDownloadArgs = {
  destinationKey: Scalars["String"]["input"];
  sync?: InputMaybe<Scalars["Boolean"]["input"]>;
  url: Scalars["String"]["input"];
};

type IMutationAddRoleToUserArgs = {
  roleId: Scalars["ID"]["input"];
  userId: Scalars["ID"]["input"];
};

type IMutationCreateAuthTokenArgs = {
  userId: Scalars["String"]["input"];
};

type IMutationCreateAuthTokenGoogleArgs = {
  clientType: IAuthClientType;
  googleIdToken: Scalars["String"]["input"];
};

type IMutationCreateAuthTokenLocalArgs = {
  password: Scalars["String"]["input"];
  username: Scalars["String"]["input"];
};

type IMutationCreateMediaArgs = {
  data: Scalars["String"]["input"];
  key: Scalars["String"]["input"];
};

type IMutationCreateMediaUploadArgs = {
  key: Scalars["String"]["input"];
};

type IMutationCreateNoteArgs = {
  title: Scalars["String"]["input"];
};

type IMutationCreateRoleArgs = {
  name: Scalars["String"]["input"];
};

type IMutationCreateUserArgs = {
  email: Scalars["String"]["input"];
  password?: InputMaybe<Scalars["String"]["input"]>;
  username?: InputMaybe<Scalars["String"]["input"]>;
};

type IMutationDeleteMediaArgs = {
  key: Scalars["String"]["input"];
};

type IMutationDeleteRoleArgs = {
  id: Scalars["ID"]["input"];
};

type IMutationRemoveNoteArgs = {
  id: Scalars["ID"]["input"];
};

type IMutationSetUserPasswordArgs = {
  password: Scalars["String"]["input"];
  userId: Scalars["ID"]["input"];
};

type IMutationStartTranscriptionArgs = {
  mediaKey: Scalars["String"]["input"];
};

type IMutationUpdateNoteBodyArgs = {
  body: Scalars["String"]["input"];
  id: Scalars["ID"]["input"];
};

type IMutationUpdateRoleArgs = {
  id: Scalars["ID"]["input"];
  name: Scalars["String"]["input"];
};

type IMutationUpdateRolePermissionsArgs = {
  id: Scalars["ID"]["input"];
  permissions: IAuthPermission[];
};

type INote = {
  __typename?: "Note";
  body: Scalars["String"]["output"];
  createdAt: Scalars["DateTime"]["output"];
  id: Scalars["ID"]["output"];
  title: Scalars["String"]["output"];
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

type IQuery = {
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

type IQueryMediaItemArgs = {
  key: Scalars["String"]["input"];
};

type IQueryNoteArgs = {
  id: Scalars["ID"]["input"];
};

type IQueryProgressArgs = {
  id: Scalars["ID"]["input"];
};

type IQueryProgressesArgs = {
  ids: Scalars["ID"]["input"][];
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

type ITranscription = {
  __typename?: "Transcription";
  filename: Scalars["String"]["output"];
  id: Scalars["ID"]["output"];
  pdf?: Maybe<IMediaItem>;
  status: ITranscriptionStatus;
};

enum ITranscriptionStatus {
  Complete = "COMPLETE",
  Created = "CREATED",
  Errored = "ERRORED",
  Started = "STARTED",
}

type IUser = {
  __typename?: "User";
  email: Scalars["String"]["output"];
  id: Scalars["ID"]["output"];
  permissions?: Maybe<IAuthPermission[]>;
  roles?: Maybe<IRole[]>;
  username?: Maybe<Scalars["String"]["output"]>;
};

type IGetUsersQueryVariables = Exact<{ [key: string]: never }>;

type IGetUsersQuery = {
  __typename?: "Query";
  users: Array<{
    __typename?: "User";
    id: string;
    email: string;
    username?: string | undefined;
    permissions?: IAuthPermission[] | undefined;
    roles?:
      | Array<{
          __typename?: "Role";
          id: string;
          name: string;
          permissions: IAuthPermission[];
        }>
      | undefined;
  }>;
};

const GetUsersDocument = gql`
    query getUsers {
  users {
    id
    email
    username
    permissions
    roles {
      id
      name
      permissions
    }
  }
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
    getUsers(
      variables?: IGetUsersQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<IGetUsersQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<IGetUsersQuery>(GetUsersDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        "getUsers",
        "query",
        variables,
      );
    },
  };
}
export type Sdk = ReturnType<typeof getSdk>;
