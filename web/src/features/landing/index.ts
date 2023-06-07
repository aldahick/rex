import { IFeature } from "../../IFeature";
import { LandingPage } from "./landing.page";

export const landingFeature: IFeature = {
  pages: [
    {
      route: "/",
      component: LandingPage
    }
  ]
};
