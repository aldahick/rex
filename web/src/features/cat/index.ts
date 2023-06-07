import { IFeature } from "../../IFeature";
import { CatPage } from "./cat.page";

export const catFeature: IFeature = {
  pages: [
    {
      route: "/cat",
      component: CatPage
    }
  ]
};
