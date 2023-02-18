import fs from "fs";

export function makeDir(root: string, options = { recursive: true }) {
  return fs.promises.mkdir(root, options);
}
