export const cachedPrefersDark = "chora-prefers-dark"

export const prefersDark = () => {
  let prefersDark: boolean

  if (typeof window !== "undefined") {
    prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
  }

  if (typeof localStorage !== "undefined") {
    prefersDark = localStorage.getItem(cachedPrefersDark) === "true"
  }

  return prefersDark
}
