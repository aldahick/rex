import { IAuthAction } from "../../graphql";
import { IFeature } from "../../IFeature";
import { MediaPage } from "./media.page";

export const mediaFeature: IFeature = {
  pages: [
    {
      route: "/media",
      component: MediaPage,
      permissions: [{
        action: IAuthAction.ReadOwn,
        resource: "mediaItem"
      }],
      navbar: {
        title: "Media",
      },
    },
  ]
};
