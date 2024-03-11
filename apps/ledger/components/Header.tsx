'use client'

import { HeaderTitle, ThemeButton } from 'chora/components'
import { ThemeContext } from 'chora/contexts'
import { usePathname, useRouter } from 'next/navigation'
import { useContext } from 'react'

import SelectNetwork from './SelectNetwork'

import styles from './Header.module.css'

const Header = ({ title }: any) => {
  const currentPathname = usePathname()
  const router = useRouter()

  const { darkTheme, setDarkTheme } = useContext(ThemeContext)

  const toggleTheme = () => {
    if (darkTheme) {
      setDarkTheme(false)
    } else {
      setDarkTheme(true)
    }
  }

  let network: string

  if (process.env.NODE_ENV === 'development') {
    network = currentPathname.split('/')[1]
  } else {
    network = currentPathname.split('/')[2]
  }

  const handleSetNetwork = async (nextNetwork: string) => {
    await router.push(`/${nextNetwork}`)
  }

  return (
    <div className={styles.header}>
      <div style={{ display: 'none' }}>{darkTheme?.toString()}</div>
      <div style={{ display: 'none' }}>{network}</div>
      <div>
        <HeaderTitle darkTheme={darkTheme} title={title} />
        <div className={styles.menu}>
          <SelectNetwork
            label=" "
            network={network}
            setNetwork={handleSetNetwork}
          />
          <ThemeButton darkTheme={darkTheme} toggleTheme={toggleTheme} />
        </div>
      </div>
    </div>
  )
}

export default Header
