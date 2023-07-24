export interface FileTreeEntry {
  /** If undefined, this is the root entry. Does NOT start with "/" */
  path?: string;
  fetched: boolean;
  type: "file" | "directory";
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

export const sortFileEntries = (a: FileTreeEntry, b: FileTreeEntry): number => {
  if (!a.path) return -1;
  if (!b.path) return 1;
  if (a.type === b.type) {
    return a.path.localeCompare(b.path);
  }
  return a.type === "directory" ? -1 : 1;
};
