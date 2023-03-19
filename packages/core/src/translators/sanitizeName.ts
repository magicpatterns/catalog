export function sanitizeName(name: string | number) {
  return `${name}`.toLowerCase().split(' ').join('-')
}
