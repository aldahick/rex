import romans from "romans";

export interface FileTreeEntry {
  /** If undefined, this is the root entry. Does NOT start with "/" */
  path?: string;
  fetched: boolean;
  type: "file" | "directory" | "series";
  children: FileTreeEntry[];
}

/**
 * @param createDirs creates directory parents for path if none exist - otherwise, returns undefined
 */
export function getFileEntryAt(
  root: FileTreeEntry,
  fullDir: string,
  createDirs: true,
): FileTreeEntry;
export function getFileEntryAt(
  root: FileTreeEntry,
  fullDir: string,
  createDirs: false,
): FileTreeEntry | undefined;
export function getFileEntryAt(
  root: FileTreeEntry,
  fullDir: string,
  createDirs: boolean,
): FileTreeEntry | undefined {
  if (fullDir === "") {
    return root;
  }
  const parts = fullDir.split("/");
  let current = root;
  for (let i = 0; i < parts.length; i++) {
    const path = parts.slice(0, i + 1).join("/");
    let next = current.children.find((e) => e.path === path);
    if (!next) {
      if (!createDirs) {
        return undefined;
      }
      next = { type: "directory", children: [], fetched: false, path };
      current.children.push(next);
    }
    current = next;
  }
  return current;
}

const getPathIndex = (path: string): number => {
  const prefix = path.split("/").slice(-1)[0].split(".")[0];
  try {
    const deromanized = romans.deromanize(prefix);
    return deromanized;
  } catch {
    return Number.parseInt(prefix);
  }
};

const typeSorts = ["directory", "series", "file"] as const;
export const sortFileEntries = (a: FileTreeEntry, b: FileTreeEntry): number => {
  if (!a.path) {
    return -1;
  }
  if (!b.path) {
    return 1;
  }
  const aIndex = getPathIndex(a.path);
  const bIndex = getPathIndex(b.path);
  if (!Number.isNaN(aIndex)) {
    if (!Number.isNaN(bIndex)) {
      return aIndex - bIndex;
    }
    return -1;
  }
  const typeDiff = typeSorts.indexOf(a.type) - typeSorts.indexOf(b.type);
  if (typeDiff !== 0) {
    return typeDiff;
  }
  return a.path.localeCompare(b.path);
};
