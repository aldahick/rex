import { IAuthPermission } from "./graphql";

export interface IPageDefinition {
  component: React.ComponentType<unknown>;
  route: string;
  permissions?: IAuthPermission[];
  navbar?: {
    title: string;
  };
}

export interface IFeature {
  pages?: IPageDefinition[];
}
