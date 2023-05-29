import { useEffect, useState } from "react"

export const cachedDarkKey = "chora-web-dark"

const darkThemeDefault = () => {
  let darkThemeDefault = false

  if (typeof window !== "undefined") {
    darkThemeDefault = window.matchMedia("(prefers-color-scheme: dark)").matches
  }

  if (typeof localStorage !== "undefined" && localStorage.hasOwnProperty(cachedDarkKey)) {
    darkThemeDefault = localStorage.getItem(cachedDarkKey) === "true"
  }

  return darkThemeDefault
}

export const useDarkTheme = () => {
  const [darkTheme, setDarkTheme] = useState(() => darkThemeDefault())

  useEffect(() => {
    localStorage.setItem(cachedDarkKey, darkTheme ? "true" : "false")
  }, [darkTheme])

  if (typeof document !== "undefined") {
    if (darkTheme) {
      document.body.style.backgroundColor = '#111'
    } else {
      document.body.style.backgroundColor = '#FFF'
    }
  }

  return [darkTheme, setDarkTheme]
}
