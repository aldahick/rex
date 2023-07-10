export type Maybe<T> = T | undefined;
export type InputMaybe<T> = T | undefined;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: Date; output: Date; }
};

export enum IAuthClientType {
  Mobile = 'MOBILE',
  Web = 'WEB'
}

export enum IAuthPermission {
  AdminMedia = 'ADMIN_MEDIA',
  AdminNotes = 'ADMIN_NOTES',
  AdminRoles = 'ADMIN_ROLES',
  AdminSteam = 'ADMIN_STEAM',
  AdminUsers = 'ADMIN_USERS',
  Media = 'MEDIA',
  Notes = 'NOTES',
  Transcriptions = 'TRANSCRIPTIONS'
}

export type IAuthToken = {
  __typename?: 'AuthToken';
  token: Scalars['String']['output'];
  user: IUser;
  userId: Scalars['ID']['output'];
};

export type IConfig = {
  __typename?: 'Config';
  createAnonymousUsers: Scalars['Boolean']['output'];
};

export type IMediaItem = {
  __typename?: 'MediaItem';
  key: Scalars['String']['output'];
  type: IMediaItemType;
};

export enum IMediaItemType {
  Directory = 'DIRECTORY',
  File = 'FILE',
  Series = 'SERIES'
}

export type IMutation = {
  __typename?: 'Mutation';
  addMediaDownload: IProgress;
  addRoleToUser: Scalars['Boolean']['output'];
  createAuthToken: IAuthToken;
  createAuthTokenGoogle: IAuthToken;
  createAuthTokenLocal: IAuthToken;
  createMedia: Scalars['Boolean']['output'];
  createMediaUpload: Scalars['String']['output'];
  createNote: INote;
  createRole: IRole;
  createUser: IUser;
  deleteRole: Scalars['Boolean']['output'];
  fetchSteamGames: IProgress;
  removeNote: Scalars['Boolean']['output'];
  setUserPassword: Scalars['Boolean']['output'];
  startTranscription: ITranscription;
  updateNoteBody: Scalars['Boolean']['output'];
  updateRole: Scalars['Boolean']['output'];
  updateRolePermissions: Scalars['Boolean']['output'];
};


export type IMutationAddMediaDownloadArgs = {
  destinationKey: Scalars['String']['input'];
  url: Scalars['String']['input'];
};


export type IMutationAddRoleToUserArgs = {
  roleId: Scalars['ID']['input'];
  userId: Scalars['ID']['input'];
};


export type IMutationCreateAuthTokenArgs = {
  userId: Scalars['String']['input'];
};


export type IMutationCreateAuthTokenGoogleArgs = {
  clientType: IAuthClientType;
  googleIdToken: Scalars['String']['input'];
};


export type IMutationCreateAuthTokenLocalArgs = {
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};


export type IMutationCreateMediaArgs = {
  data: Scalars['String']['input'];
  key: Scalars['String']['input'];
};


export type IMutationCreateMediaUploadArgs = {
  key: Scalars['String']['input'];
};


export type IMutationCreateNoteArgs = {
  title: Scalars['String']['input'];
};


export type IMutationCreateRoleArgs = {
  name: Scalars['String']['input'];
};


export type IMutationCreateUserArgs = {
  email: Scalars['String']['input'];
  password?: InputMaybe<Scalars['String']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
};


export type IMutationDeleteRoleArgs = {
  id: Scalars['ID']['input'];
};


export type IMutationRemoveNoteArgs = {
  id: Scalars['ID']['input'];
};


export type IMutationSetUserPasswordArgs = {
  password: Scalars['String']['input'];
  userId: Scalars['ID']['input'];
};


export type IMutationStartTranscriptionArgs = {
  mediaKey: Scalars['String']['input'];
};


export type IMutationUpdateNoteBodyArgs = {
  body: Scalars['String']['input'];
  id: Scalars['ID']['input'];
};


export type IMutationUpdateRoleArgs = {
  id: Scalars['ID']['input'];
  name: Scalars['String']['input'];
};


export type IMutationUpdateRolePermissionsArgs = {
  id: Scalars['ID']['input'];
  permissions: Array<IAuthPermission>;
};

export type INote = {
  __typename?: 'Note';
  body: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  title: Scalars['String']['output'];
};

export type IProgress = {
  __typename?: 'Progress';
  action: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  logs: Array<IProgressLog>;
  status: IProgressStatus;
};

export type IProgressLog = {
  __typename?: 'ProgressLog';
  createdAt: Scalars['DateTime']['output'];
  text: Scalars['String']['output'];
};

export enum IProgressStatus {
  Complete = 'COMPLETE',
  Created = 'CREATED',
  Errored = 'ERRORED',
  InProgress = 'IN_PROGRESS'
}

export type IQuery = {
  __typename?: 'Query';
  config: IConfig;
  mediaItems: Array<IMediaItem>;
  note: INote;
  notes: Array<INote>;
  progress: IProgress;
  progresses: Array<IProgress>;
  roles: Array<IRole>;
  steamGames: Array<ISteamGame>;
  steamPlayer: ISteamPlayer;
  steamPlayers: Array<ISteamPlayer>;
  transcriptions: Array<ITranscription>;
  user: IUser;
  users: Array<IUser>;
};


export type IQueryMediaItemsArgs = {
  dir: Scalars['String']['input'];
};


export type IQueryNoteArgs = {
  id: Scalars['ID']['input'];
};


export type IQueryProgressArgs = {
  id: Scalars['ID']['input'];
};


export type IQueryProgressesArgs = {
  ids: Array<Scalars['ID']['input']>;
};


export type IQuerySteamGamesArgs = {
  page: Scalars['Int']['input'];
  search: Scalars['String']['input'];
};


export type IQuerySteamPlayerArgs = {
  steamId64: Scalars['String']['input'];
};


export type IQuerySteamPlayersArgs = {
  steamIds64: Array<Scalars['String']['input']>;
};


export type IQueryUserArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type IRole = {
  __typename?: 'Role';
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  permissions: Array<IAuthPermission>;
};

export type ISteamGame = {
  __typename?: 'SteamGame';
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
};

export type ISteamPlayer = {
  __typename?: 'SteamPlayer';
  avatarUrl: Scalars['String']['output'];
  id: Scalars['String']['output'];
  nickname: Scalars['String']['output'];
  ownedGames: Array<ISteamGame>;
  playingGame?: Maybe<ISteamGame>;
  profileUrl: Scalars['String']['output'];
};

export type ITranscription = {
  __typename?: 'Transcription';
  filename: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  pdf?: Maybe<IMediaItem>;
  status: ITranscriptionStatus;
};

export enum ITranscriptionStatus {
  Complete = 'COMPLETE',
  Created = 'CREATED',
  Errored = 'ERRORED',
  Started = 'STARTED'
}

export type IUser = {
  __typename?: 'User';
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  permissions?: Maybe<Array<IAuthPermission>>;
  roles?: Maybe<Array<IRole>>;
  username?: Maybe<Scalars['String']['output']>;
};
