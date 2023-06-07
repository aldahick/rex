import { AccessControl } from "accesscontrol";
import * as _ from "lodash";
import { action, computed, makeObservable, observable } from "mobx";
import { singleton } from "tsyringe";

import { IAuthPermission, IRole } from "../graphql";

const TOKEN_KEY = "rex.auth.token/v2";
interface AuthTokenData {
  token: string;
  roles: IRole[];
}

@singleton()
export class AuthStore {
  @observable private data?: AuthTokenData;

  constructor() {
    makeObservable(this);
    let token: AuthTokenData | undefined;
    const tokenJson = localStorage.getItem(TOKEN_KEY);

    if (tokenJson !== null) {
      token = JSON.parse(tokenJson) as AuthTokenData | null ?? undefined;
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
    return this.data !== undefined && !!this.accessControl;
  }

  isAuthorized(permission: IAuthPermission): boolean {
    if (!this.roles) {
      return false;
    }
    return this.roles.some(r =>
      this.accessControl?.can(r.name)[permission.action](permission.resource).granted
    ) || false;
  }

  private get accessControl() {
    if (!this.roles) {
      return;
    }
    return new AccessControl(_.flatten(
      this.roles.map(role => role.permissions.map(permission => ({
        role: role.name,
        resource: permission.resource,
        action: permission.action,
        attributes: "*",
      }))),
    ));
  }
}
