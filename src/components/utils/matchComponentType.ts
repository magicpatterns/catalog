export const fuzzyMatchComponentType = (type: string, tags: string[]) => {
  return tags.some((tag) => tag.toLowerCase().includes(type.toLowerCase()))
}
