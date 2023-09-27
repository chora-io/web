import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useContext } from 'react'

import { ThemeContext } from 'chora'
import { ThemeButton } from 'chora/components'

import SelectNetwork from './SelectNetwork'

import choraLogoDark from 'chora/assets/images/chora_dark_icon.png'
import choraLogoLight from 'chora/assets/images/chora_light_icon.png'

import styles from './Header.module.css'

const Header = () => {
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

  let local = false
  let network: string

  if (
    typeof window !== 'undefined' &&
    (window.location.hostname == '0.0.0.0' ||
      window.location.hostname == '127.0.0.1' ||
      window.location.hostname == 'localhost')
  ) {
    local = true
    network = currentPathname.split('/')[1]
  } else {
    network = currentPathname.split('/')[2]
  }

  const handleSetNetwork = async (nextNetwork: string) => {
    await router.push(`/${nextNetwork}`)
  }

  return (
    <div className={styles.header}>
      <div>
        <div className={styles.title}>
          <Link
            href={
              local
                ? 'http://' + window.location.hostname + ':8000'
                : 'https://chora.io'
            }
          >
            <Image
              alt="chora"
              src={darkTheme ? choraLogoDark : choraLogoLight}
            />
            <div>{'chora'}</div>
          </Link>
        </div>
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
