import { action, computed, makeObservable, observable } from "mobx";

import { IAuthPermission, IRole } from "../graphql";

const TOKEN_KEY = "rex.auth.token/v2";
interface AuthTokenData {
  token: string;
  roles: Pick<IRole, "name" | "permissions">[];
}

export class AuthStore {
  @observable private data?: AuthTokenData;

  constructor() {
    makeObservable(this);
    let token: AuthTokenData | undefined;
    const tokenJson = localStorage.getItem(TOKEN_KEY);

    if (tokenJson !== null) {
      token = (JSON.parse(tokenJson) as AuthTokenData | null) ?? undefined;
    }
    if (token) {
      this.setToken(token);
    }
  }

  @action.bound
  setToken(token: AuthTokenData): void {
    localStorage.setItem(TOKEN_KEY, JSON.stringify(token));
    this.data = token;
  }

  @action.bound
  removeAuth(): void {
    localStorage.removeItem(TOKEN_KEY);
    this.data = undefined;
  }

  @computed
  get token(): string | undefined {
    return this.data?.token;
  }

  @computed
  get roles(): IRole[] | undefined {
    return this.data?.roles;
  }

  @computed
  get isAuthenticated(): boolean {
    return !!this.data?.roles.length;
  }

  isAuthorized(permission: IAuthPermission): boolean {
    return this.roles?.some((r) => r.permissions.includes(permission)) ?? false;
  }
}
