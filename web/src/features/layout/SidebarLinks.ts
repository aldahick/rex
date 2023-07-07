import { IAuthPermission } from "../../graphql";

export interface SidebarLink {
  label: string;
  route: string;
  permissions?: IAuthPermission[];
}

export const sidebarLinks: SidebarLink[] = [
  {
    label: "Cat Game",
    route: "/cat",
  },
  {
    label: "Mzk Transcriptions",
    route: "/mzk",
    permissions: [IAuthPermission.Transcriptions],
  },
];
