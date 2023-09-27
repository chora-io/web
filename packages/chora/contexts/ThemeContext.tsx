import { createContext, useEffect, useState } from 'react'

export const cachedDarkKey = 'chora-web-dark'

const initDarkTheme = () => {
  let initDarkTheme = false

  if (
    typeof localStorage !== 'undefined' &&
    localStorage.hasOwnProperty(cachedDarkKey)
  ) {
    initDarkTheme = localStorage.getItem(cachedDarkKey) === 'true'
  } else if (typeof window !== 'undefined') {
    initDarkTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
  }

  return initDarkTheme
}

const ThemeContext = createContext<any>({})

const ThemeContextProvider = (props: any) => {
  const [darkTheme, setDarkTheme] = useState<boolean>(initDarkTheme())

  useEffect(() => {
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      const root = window.document.documentElement

      if (darkTheme) {
        root.classList.add('dark-theme')
        root.style.backgroundColor = '#111'
      } else {
        root.classList.remove('dark-theme')
        root.style.backgroundColor = '#FFF'
      }

      localStorage.setItem(cachedDarkKey, darkTheme ? 'true' : 'false')
    }
  }, [darkTheme])

  return (
    <ThemeContext.Provider
      value={{
        darkTheme,
        setDarkTheme,
      }}
    >
      {props.children}
    </ThemeContext.Provider>
  )
}

export { ThemeContext, ThemeContextProvider }
