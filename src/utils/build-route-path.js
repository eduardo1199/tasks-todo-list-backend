export function buildRoutePath(path) {
  const routeParametersRegex = /:([a-zA-Z]+)/g //todo url que começa com : de letras com a-z e A-Z e que pode ser repetir varias vezes
  const pathWithParameters = path.replaceAll(routeParametersRegex, '(?<id>[a-z0-9\-_]+)')

  const pathRegex = new RegExp(`^${pathWithParameters}`)

  return pathRegex
}