import { action, makeObservable, observable } from "mobx";
import { singleton } from "tsyringe";

import { IPageDefinition } from "../IFeature";

@singleton()
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
