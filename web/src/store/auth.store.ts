import { makeAutoObservable } from "mobx";

import { IAuthPermission, IRole } from "../graphql";

const TOKEN_KEY = "rex.auth.token/v2";
interface AuthTokenData {
  token: string;
  roles: Pick<IRole, "id" | "name" | "permissions">[];
}

export class AuthStore {
  private data?: AuthTokenData;

  constructor() {
    makeAutoObservable(this);
    const tokenJson = localStorage.getItem(TOKEN_KEY);

    if (tokenJson !== null) {
      const token: AuthTokenData = JSON.parse(tokenJson) ?? undefined;
      if (token) {
        this.setToken(token);
      }
    }
  }

  setToken(token: AuthTokenData): void {
    localStorage.setItem(TOKEN_KEY, JSON.stringify(token));
    this.data = token;
  }

  removeAuth(): void {
    localStorage.removeItem(TOKEN_KEY);
    this.data = undefined;
  }

  get token(): string | undefined {
    return this.data?.token;
  }

  get roles(): IRole[] | undefined {
    return this.data?.roles;
  }

  get isAuthenticated(): boolean {
    return !!this.data?.token;
  }

  isAuthorized(permission: IAuthPermission): boolean {
    return this.roles?.some((r) => r.permissions.includes(permission)) ?? false;
  }
}
