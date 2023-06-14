import { action, makeObservable, observable } from "mobx";

import { IPageDefinition } from "../IFeature";

export class SidebarStore {
  @observable isOpen = false;

  @observable pages: IPageDefinition[] = [];

  constructor() {
    makeObservable(this);
  }

  @action.bound
  setOpen(isOpen: boolean): void {
    this.isOpen = isOpen;
  }
}
