import { makeAutoObservable } from "mobx";

export enum ThemeSetting {
  Light = "light",
  Dark = "dark",
}
export interface Settings {
  theme: ThemeSetting;
}

const SETTINGS_KEY = "rex.settings";
const DEFAULT_SETTINGS: Settings = {
  theme: ThemeSetting.Dark,
};

export class SettingsStore {
  private settings: Settings;

  constructor() {
    this.settings =
      (JSON.parse(
        localStorage.getItem(SETTINGS_KEY) ?? "null",
      ) as Settings | null) ?? DEFAULT_SETTINGS;
    makeAutoObservable(this);
  }

  setAll(settings: Settings): void {
    this.settings = settings;
    this.save();
  }

  set<Key extends keyof Settings>(key: Key, value: Settings[Key]): void {
    this.settings[key] = value;
    this.save();
  }

  get<Key extends keyof Settings>(key: Key): Settings[Key] {
    return this.settings[key];
  }

  save(): void {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(this.settings));
  }
}
