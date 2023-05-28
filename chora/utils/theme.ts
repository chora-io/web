export const cachedDarkKey = "chora-web-dark"

export const prefersDark = () => {
  let prefersDark: boolean

  if (typeof window !== "undefined") {
    prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
  }

  if (typeof localStorage !== "undefined" && localStorage.hasOwnProperty(cachedDarkKey)) {
    prefersDark = localStorage.getItem(cachedDarkKey) === "true"
  }

  return prefersDark
}
