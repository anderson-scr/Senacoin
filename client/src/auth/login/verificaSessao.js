export const verificaSessao = () => {
  if ("accessToken" in localStorage) {
    return true
  } else {
    return false
  }
}