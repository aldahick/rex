import { IFeature } from "../../IFeature";
import { LoginPage } from "./login.page";

export * from "./components";

export const authFeature: IFeature = {
  pages: [
    {
      route: "/login",
      component: LoginPage,
    },
  ]
};
