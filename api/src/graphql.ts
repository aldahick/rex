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
  authToken: IAuthToken;
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

export type IQueryAuthTokenArgs = {
  params: IAuthTokenParams;
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
