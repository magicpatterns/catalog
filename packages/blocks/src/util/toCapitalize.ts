export function toCapitalize(str: string) {
  return str
    .split(' ')
    .map((word) => {
      return word[0].toUpperCase() + word.slice(1)
    })
    .join(' ')
}
