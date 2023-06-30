import { makeAutoObservable } from "mobx";

export class SidebarStore {
  isOpen = false;

  constructor() {
    makeAutoObservable(this);
  }

  setOpen(isOpen: boolean): void {
    this.isOpen = isOpen;
  }
}
