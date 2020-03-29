export const page = function (path) {
  return () => import(`~/pages/${path}`).then(m => m.default || m)
}
