import { trimEnd, trimStart } from "./string";

export function combine(...path: string[]) {
  return path.reduce((left, right) => {
    left = left?.trim();
    if (!left) return right;
    right = right?.trim();
    if (!right) return left;
    return trimEnd(left, "/") + "/" + trimStart(right, "/");
  });
}

export function removeFragment(path: string, start: number) {
  const fragments = path.split("/");

  for (let i = 0; i < start; i++) {
    fragments.shift();
  }

  return fragments.join("/");
}

export function splitFolderEntry(path: string) {
  const breakIndex = path.lastIndexOf("/");
  if (breakIndex == -1) {
    return { folder: "", entry: path };
  } else {
    return {
      folder: path.substring(0, breakIndex),
      entry: path.substring(breakIndex + 1),
    };
  }
}
